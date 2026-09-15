---
title: Claude Code Settings + Permissions - Patterns
campaign: settings-permissions-2026
nblm_role: patterns
target_audience: dev_devops_configuring
word_target: 3000-4000
source: SYNTHESIS.md (Parts 3-5 + Appendix B)
date: 2026-04-17
---

# Claude Code Settings + Permissions - Wzorce praktyczne

Ten dokument zakłada, ze rozumiesz fundamenty z 00_FUNDAMENTALS.md (5-warstwowa hierarchia, F1/F2/F3). Zajmujemy sie tu praktyka: jak pisac permissions rules, jakie sa gotowe templates, jak deployowac managed tier przez MDM.

## 1. Permissions syntax - anatomia rule grammar

### 1.1 Trzy canonical forms (Tool / Tool(specifier) / mcp__*)

Permission rule ma trzy forms (per SYNTHESIS Part 3.1):

1. **Bare tool name**: `Bash`, `Read`, `Edit`, `WebFetch`, `Agent`
2. **Tool with specifier**: `Bash(npm run test *)`, `Read(./.env)`, `WebFetch(domain:github.com)`
3. **MCP hierarchical**: `mcp__server`, `mcp__server__*`, `mcp__server__tool`

Tool reference lista: Bash (shell commands), Read (file reads Claude-side), Edit (file edits), Write, WebFetch (URL fetches), Agent (subagent dispatch, renamed z Task w v2.1.63 - Task(...) nadal dziala jako alias), MCP tools (mcp__\*).

### 1.2 Evaluation order: deny -> ask -> allow (first match wins)

Kanoniczna teza docs (per SYNTHESIS Part 3.2): **Rules are evaluated in order: deny -> ask -> allow. First matching rule wins.** Deny ma absolutna precedence.

Wzmocnienia udokumentowane:

- Deny na dowolnym poziomie nie moze byc overridden zadna inna warstwa
- Managed deny nie moze byc overridden przez `--allowedTools` CLI flag
- `--disallowedTools` moze dodawac restrictions additively BEYOND managed
- Blocking PreToolUse hook (exit 2) ma precedence nad allow rules
- PreToolUse JSON output decision precedence: `deny > defer > ask > allow`

### 1.3 Bash matcher mechanics - wildcards, word boundary, compound commands

Najwieksze zrodlo pulapek (per SYNTHESIS Part 3.3):

**Wildcards:**
- `Bash(*)` equivalent do bare `Bash`
- `Tool(prefix:*)` = `Tool(prefix *)` tylko w end position
- Middle colon czytany literalnie: `Bash(git:* push)` NIE matchuje `git push origin main`
- Single `*` matchuje any sequence INCLUDING spaces

**Word boundary:**
- `Bash(ls *)` = `Bash(ls:*)` - wymagaja spacji lub end-of-string po "ls"
- `Bash(ls*)` (bez word boundary) matchuje `lsof -i :80` - to jest trap

**Compound commands:**
- Separatory rozpoznawane: `&&`, `||`, `;`, `|`, `|&`, `&`, newline
- Kazdy subcommand dopasowywany osobno
- `Bash(safe-cmd *)` nie da permissionu na `safe-cmd && other-cmd` - other-cmd musi miec wlasny match

**Fragility:**
- `Bash(curl http://github.com/ *)` zawodzi przy: options przed URL (`curl -X GET http://...`), different protocol (`curl https://...`), redirects (`curl -L http://bit.ly/xyz`), env var wrappers, flagi mid-command (`git -C /path status`)

**Process wrapper stripping allowlist** (per SYNTHESIS Part 3.4):
- Strippowane (fixed, non-configurable): `timeout`, `time`, `nice`, `nohup`, `stdbuf`, bare `xargs`
- NIE strippowane (deliberate): `direnv exec`, `devbox run`, `mise exec`, `npx`, `docker exec`

### 1.4 File path prefixes (//abs, ~/home, /project-root, ./cwd)

Najczesciej myloca semantyka (per SYNTHESIS Part 3.5):

| Prefix | Znaczenie | Przyklad |
|---|---|---|
| `//path` | Absolute filesystem root | `Read(//Users/alice/secrets/**)` |
| `~/path` | Home directory | `Read(~/.ssh/**)` |
| `/path` | **Project root** (NIE absolute!) | `Edit(/src/**/*.ts)` |
| `path` / `./path` | cwd-relative | `Read(./.env)` |

**Trap**: `/Users/alice/file` to NIE absolute path, to `<project-root>/Users/alice/file`. Dla absolute trzeba **dwoch ukosnikow**: `//Users/alice/file`.

**Windows**: Sciezki normalizowane do POSIX przed matchingiem. `C:\Users\alice` staje sie `/c/Users/alice`. Zeby matchowac `.env` anywhere na C:, uzyj `//c/**/.env`. Zeby matchowac across all drives: `//**/.env`.

### 1.5 WebFetch domain matching - exact vs sandbox wildcards

WebFetch permission spec (per SYNTHESIS Part 3.6): **exact matching**. `WebFetch(domain:example.com)` NIE obejmuje `api.example.com`. Dla broader coverage: (a) wymienic subdomains eksplicitnie albo (b) uzyc sandbox `sandbox.network.allowedDomains` ktory wspiera `*.example.com` wildcards.

Historyczny CVE-2026-24052 pokazal, ze starsza wersja uzywala `startsWith()` - `modelcontextprotocol.io.attacker.com` matchowal allowlist dla `modelcontextprotocol.io`. Patch 1.0.111 poprawil parsing URL. WebFetch exact-match jest dzisiaj bezpieczniejszy.

### 1.6 MCP granularity (server / server__* / server__tool)

Trzy poziomy granularnosci (per SYNTHESIS Part 3.9):

| Rule | Znaczenie |
|---|---|
| `mcp__puppeteer` | Any tool provided by puppeteer server |
| `mcp__puppeteer__*` | Wildcard form, equivalent to above |
| `mcp__puppeteer__puppeteer_navigate` | Tylko specific tool |

Server name to ten skonfigurowany w Claude Code (z `.mcp.json` lub user MCP config), **nie vendor package name**.

## 2. Starter templates - 5 gotowych konfiguracji

### 2.1 Template A: Solo developer minimalist (~/.claude/settings.json)

Uzytkownik: jeden dev, jedna maszyna, projekty hobby, brak enterprise constraints. Priorytet: niski friction, rozsadne defaulty (per SYNTHESIS Appendix B.1).

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "model": "claude-opus-4-7",
  "permissions": {
    "defaultMode": "ask",
    "allow": [
      "Read", "Write", "Edit", "Glob", "Grep",
      "Bash(git status)", "Bash(git diff:*)", "Bash(git log:*)",
      "Bash(npm test)", "Bash(npm run lint)",
      "Bash(ls:*)", "Bash(cat:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl:*| sh)",
      "Bash(curl:*| bash)",
      "Read(.env)", "Read(.env.*)",
      "Read(**/id_rsa)", "Read(**/.ssh/**)"
    ]
  },
  "env": {
    "DISABLE_TELEMETRY": "1"
  }
}
```

Uzasadnienie: `defaultMode: ask` zamiast `auto` (Minimalist archetype ~35% community), git read-only + npm test/lint auto-allowed, secrets deny, sudo + curl|sh deny.

### 2.2 Template B: Team project (.claude/settings.json committed)

Uzytkownik: zespol 5-20 devow, shared monorepo, CI integration. Priorytet: konsystencja, elastycznosc dla local overrides (per SYNTHESIS Appendix B.2).

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "defaultMode": "ask",
    "allow": [
      "Read", "Glob", "Grep",
      "Edit(src/**)", "Edit(tests/**)", "Edit(docs/**)",
      "Write(src/**)", "Write(tests/**)",
      "Bash(npm test:*)",
      "Bash(npm run build)",
      "Bash(npm run lint:*)",
      "Bash(git status)", "Bash(git diff:*)",
      "Bash(git log:*)", "Bash(git branch:*)"
    ],
    "ask": [
      "Write(src/core/**)",
      "Edit(src/core/**)",
      "Bash(git push:*)",
      "Bash(git rebase:*)"
    ],
    "deny": [
      "Read(.env)", "Read(.env.*)", "Read(secrets/**)",
      "Write(.github/workflows/**)",
      "Bash(rm -rf:*)",
      "Bash(npm publish:*)",
      "Bash(git push --force:*)",
      "Bash(git push -f:*)"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/bash-guard.sh",
            "timeout": 5000
          }
        ]
      }
    ]
  }
}
```

Osobno `.claude/settings.local.json` (gitignored) dla personalizacji per-dev:

```json
{
  "permissions": {
    "allow": ["Bash(gh pr:*)", "Bash(docker:*)"]
  }
}
```

Uzasadnienie: Scoped Write/Edit, `src/core/**` w ask (sensitive modules), force push + npm publish w deny, `.github/workflows` deny (ochrona CI przed prompt injection), PreToolUse hook dla dodatkowej bash walidacji.

### 2.3 Template C: Enterprise managed-settings.json (hardened)

Uzytkownik: korporacja 500+ seatow, compliance (SOC2, HIPAA), SSO mandatory. Priorytet: policy enforcement, audyt, zero dev override (per SYNTHESIS Appendix B.3 + Part 6.9).

```json
{
  "$schema": "https://json.schemastore.org/claude-code-managed-settings.json",
  "minimumVersion": "2.1.53",
  "forceLoginOrgUUID": "your-org-uuid",
  "availableModels": ["claude-sonnet-4-5", "claude-haiku-4-5"],
  "model": "claude-sonnet-4-5",
  "apiKeyHelper": "/opt/corp/get-api-key.sh",
  "permissions": {
    "defaultMode": "ask",
    "disableBypassPermissionsMode": "disable",
    "allow": [
      "Read", "Glob", "Grep",
      "Edit(src/**)", "Edit(tests/**)",
      "Bash(npm test)", "Bash(npm run lint)",
      "Bash(git status)", "Bash(git diff:*)"
    ],
    "deny": [
      "Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)",
      "Read(~/.ssh/**)", "Read(~/.aws/**)", "Read(~/.gnupg/**)",
      "Read(~/.azure/**)", "Read(~/.kube/**)",
      "Read(**/*.pem)", "Read(**/*.key)", "Read(**/id_rsa)",
      "Read(**/credentials)",
      "Bash(sudo *)", "Bash(rm -rf /*)", "Bash(dd if=*)", "Bash(mkfs.*)",
      "Bash(chmod 777 *)",
      "Bash(git push --force *)", "Bash(git push -f *)",
      "Bash(curl * | sh)", "Bash(wget * | sh)"
    ],
    "skipDangerousModePermissionPrompt": false
  },
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "allowUnsandboxedCommands": false,
    "filesystem": {
      "allowManagedReadPathsOnly": true,
      "allowRead": ["./"],
      "denyRead": ["./.env*", "./secrets/**"]
    },
    "network": {
      "allowManagedDomainsOnly": true,
      "allowedDomains": ["*.anthropic.com", "*.your-company.com"]
    }
  },
  "allowManagedPermissionRulesOnly": true,
  "allowManagedHooksOnly": true,
  "allowManagedMcpServersOnly": true,
  "forceRemoteSettingsRefresh": true,
  "strictKnownMarketplaces": [],
  "enableAllProjectMcpServers": false,
  "env": {
    "CLAUDE_CODE_SUBPROCESS_ENV_SCRUB": "1",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "OTEL_LOG_USER_PROMPTS": "false"
  },
  "disableAutoMode": "disable",
  "disableAllHooks": false,
  "hooks": [
    { "event": "PreToolUse", "matcher": "Bash", "type": "command",
      "command": "/opt/corp/hooks/pre-bash-guard.sh" },
    { "event": "PostToolUse", "matcher": ".*", "type": "command",
      "command": "/opt/corp/hooks/telemetry-ship.sh" }
  ]
}
```

12 hardening items (per SYNTHESIS Part 6.9): pin minimumVersion, tenant pinning, model restriction, disable bypass, secret denylist, sandbox hard gate, managed-only permissions, managed-only hooks, managed-only MCP, force remote refresh, strict marketplaces, env scrub + essential traffic only.

### 2.4 Template D: CI/CD non-interactive runner

Uzytkownik: GitHub Actions / Jenkins / GitLab CI. Priorytet: deterministic behavior, no prompts, time-bounded (per SYNTHESIS Appendix B.4).

```yaml
# .github/workflows/claude-review.yml
- name: Claude Code review
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
    CLAUDE_CODE_SUBPROCESS_ENV_SCRUB: "1"
    CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1"
    CLAUDE_CODE_MAX_TURNS: "10"
    CLAUDE_CODE_TIMEOUT_MS: "600000"
  run: |
    claude \
      --permission-mode auto \
      --allowed-tools "Read,Glob,Grep" \
      --disallowed-tools "Bash,Write,Edit,WebFetch" \
      --output-format json \
      --max-tokens 50000 \
      -p "Review PR diff at ./pr.diff and output findings as JSON"
```

Towarzyszacy `.claude/settings.json` w repo:

```json
{
  "permissions": {
    "defaultMode": "auto",
    "allow": ["Read", "Glob", "Grep"],
    "deny": ["Bash", "Write", "Edit", "WebFetch", "WebSearch"]
  }
}
```

Uzasadnienie: hard deny na wszystko co pisze/executes (read-only CI review), env scrub zawsze, MAX_TURNS + TIMEOUT_MS cost/time bounded, output JSON parsable. **Anti-pattern check**: NIE uzywac `--dangerously-skip-permissions` w CI, nawet ephemeral.

### 2.5 Template E: Security-paranoid (Trail of Bits inspired)

Uzytkownik: security researcher, red-teamer, krytyczny system. Priorytet: defense-in-depth, sandbox OS-level, assume-breach mindset (per SYNTHESIS Appendix B.5).

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "defaultMode": "ask",
    "allow": [
      "Read(./src/**)", "Read(./tests/**)",
      "Glob(./src/**)", "Glob(./tests/**)",
      "Grep"
    ],
    "deny": [
      "Write", "Edit", "MultiEdit",
      "Bash",
      "WebFetch", "WebSearch",
      "NotebookEdit",
      "Read(~/**)", "Read(/**)",
      "Read(.env)", "Read(.env.*)",
      "Read(**/.ssh/**)", "Read(**/.aws/**)", "Read(**/.gnupg/**)",
      "Read(**/id_rsa)", "Read(**/id_ed25519)",
      "Read(**/credentials)", "Read(**/secrets/**)"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": ".*",
        "hooks": [{ "type": "command", "command": "~/.claude/hooks/paranoid-audit.sh", "timeout": 3000 }]
      }
    ]
  },
  "env": {
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "DISABLE_TELEMETRY": "1",
    "DISABLE_ERROR_REPORTING": "1",
    "CLAUDE_CODE_MAX_TURNS": "20"
  }
}
```

Sandbox wrapper Linux (bubblewrap):

```bash
#!/bin/bash
# ~/.claude/paranoid-wrap.sh
bwrap \
  --ro-bind /usr /usr \
  --ro-bind /etc /etc \
  --ro-bind "$PWD" /workdir \
  --bind "$HOME/.claude" /claude-config \
  --tmpfs /tmp \
  --unshare-net \
  --unshare-pid \
  --die-with-parent \
  claude "$@"
```

Uzasadnienie: hard deny Write/Edit/Bash (read-only analiza), scoped Read tylko do `./src`/`./tests`, bubblewrap wrapper jako OS-level enforcement, `--unshare-net` defeats WebFetch prompt injection. Trade-off: znacznie wolniejsze - ale to jest celem.

## 3. Managed layer deployment patterns

### 3.1 macOS - Jamf Pro / Kandji plist

Jamf Pro (per SYNTHESIS Part 4.7): Computers > Configuration Profiles > New > Application & Custom Settings > Custom Settings. Preference Domain: `com.anthropic.claudecode`. Source: Upload PLIST. Kandji ma analogiczny "Custom Profile" flow.

Przyklad plist entries (konwertowane z managed-settings.json przez `plutil -convert xml1`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
  <key>minimumVersion</key>
  <string>2.1.53</string>
  <key>forceLoginOrgUUID</key>
  <string>your-uuid</string>
  <key>permissions</key>
  <dict>
    <key>disableBypassPermissionsMode</key>
    <string>disable</string>
  </dict>
</dict>
</plist>
```

Path na klient: `/Library/Application Support/ClaudeCode/managed-settings.json` (po konwersji Jamf deployuje jako plist, CLI czyta oba formaty).

### 3.2 Windows - Intune PowerShell + ADMX/GPO

Intune (per SYNTHESIS Part 4.7): trzy mechanizmy - Platform Scripts (PowerShell), ADMX import, Custom Configuration Profiles.

**Platform Scripts:** Intune admin center > Devices > Scripts and remediations > Platform scripts > Add > Windows 10/11. PowerShell pisze JSON do `C:\Program Files\ClaudeCode\managed-settings.json`. Settings: "Run script in 64 bit PowerShell Host: Yes", "Run script using logged on credentials: No".

```powershell
$managedPath = "C:\Program Files\ClaudeCode\managed-settings.json"
$config = @{
  minimumVersion = "2.1.53"
  forceLoginOrgUUID = "your-uuid"
  permissions = @{
    disableBypassPermissionsMode = "disable"
  }
} | ConvertTo-Json -Depth 10
New-Item -Path (Split-Path $managedPath) -ItemType Directory -Force
Set-Content -Path $managedPath -Value $config -Force
```

**ADMX/GPO**: Policy writes single-line JSON do `HKLM\SOFTWARE\Policies\ClaudeCode\Settings` REG_SZ z `maxLength=1000000` (1MB). Template ADMX jest community-constructed (nie oficjalny Anthropic).

### 3.3 Linux - Ansible/Puppet/Chef (community-derived)

**Brak oficjalnych Anthropic templates** (per SYNTHESIS Part 4.7 + CRITIC). Wzorzec community-derived - Ansible template module deployujacy JSON do `/etc/claude-code/managed-settings.json` z perms 0644 root:root, plus drop-in fragments do `/etc/claude-code/managed-settings.d/`.

```yaml
# Ansible playbook fragment
- name: Deploy Claude Code managed settings
  copy:
    content: "{{ managed_settings | to_nice_json }}"
    dest: /etc/claude-code/managed-settings.json
    owner: root
    group: root
    mode: '0644'
  vars:
    managed_settings:
      minimumVersion: "2.1.53"
      allowManagedPermissionRulesOnly: true
      permissions:
        disableBypassPermissionsMode: "disable"
```

Limitation Linux: brak first-party support od fleet-management tools (Jumpcloud, Fleet) - CRITIC flaguje jako confidence-reducing dla Linux sekcji.

### 3.4 HKLM vs HKCU registry - Windows fallback tier

Windows HKLM (system-wide) vs HKCU (per user). HKLM jest domyslnie wyzszy priorytet gdy oba obecne - ale **to nie jest explicit udokumentowane** (znane-nieznane z Appendix C.3 SYNTHESIS).

Rekomendacja: uzywac tylko HKLM dla enterprise enforcement. HKCU daje userowi mozliwosc override (wlasciwie anti-feature dla enforcement).

### 3.5 Drop-in directory managed-settings.d/*.json convention

Systemd-style convention (per SYNTHESIS Part 4.3). Struktura rekomendowana:

```
/etc/claude-code/
  managed-settings.json          # baseline
  managed-settings.d/
    10-telemetry.json            # IT security: telemetry endpoint
    20-security.json             # SecOps: hardening fields
    30-permissions.json          # Compliance: managed rules
```

Kazdy plik z `managed-settings.d/` merguje sie na baze (scalars last-wins, arrays concat+dedup, objects deep-merge). Modularny deployment bez potrzeby koordynacji jednego wielkiego pliku.

**Security caveat**: ustaw ACL `root:root 0644` dla directory + plikow (macOS `root:wheel`, Windows Administrators only). Lax ACL = user-writable drop-in = potential policy override przez user-level pliki w tej lokacji.

## 4. Array merge semantics - co faktycznie robi Claude Code

### 4.1 Tabela merge per typ pola

Krytyczna tabela (per SYNTHESIS Part 1.6):

| Typ pola | Merge cross-scope | Status |
|---|---|---|
| Scalar (string/bool/number) | Higher scope override | Stable |
| Object top-level | Deep merge | Stable (mcpServers caveat) |
| Array general (allowWrite, allowRead) | Concat + dedup | Stable |
| `permissions.allow` | Concat + dedup per docs, **REPLACE w praktyce per #17017** | Bug OPEN 2026 |
| `permissions.deny` | Concat + dedup per docs, **replacement risk** per #17017 | Bug OPEN |
| `permissions.additionalDirectories` | Concat + dedup | Stable |
| `sandbox.filesystem.allowWrite/Read` | Concat + dedup | Stable |
| `hooks` array | Deep merge by event key | Undocumented explicit, gap G4 |
| `env` object | Deep merge (wyprowadzone z analogii) | Nie explicit |
| `mcpServers` object | Deep merge per docs, **REPLACE w praktyce per #17299** | #17299 closed dup |
| `autoMode.allow`, `autoMode.soft_deny` | **REPLACE (by design)** | Stable, udokumentowane |

### 4.2 Bug #17017 workaround - duplikuj deny w kazdej warstwie

Issue #17017 (OPEN od 2026-01-09) dokumentuje, ze permissions tablice zachowuja sie jak REPLACE cross-scope (per SYNTHESIS Part 1.5 F3 deep). Docs mowia concat+dedup. Do czasu zamkniecia issue:

**Workaround**: duplikuj deny rules we wszystkich relewantnych warstwach (user + project + managed). Nie polegaj na merge.

**Lepsze rozwiazanie dla enterprise**: uzyj managed tier z `allowManagedPermissionRulesOnly: true`. To eliminuje cala niepewnosc merge semantic dla permissions - user i project allow/deny sa po prostu odrzucane, tylko managed rules sa stosowane.

### 4.3 Issue #17299 mcpServers replace - zamknięty jako dup, nie naprawiony

Issue #17299 (CLOSED as duplicate, NIE naprawione) pokazuje identyczne zachowanie REPLACE dla `mcpServers` (per SYNTHESIS Part 1.6). Close-as-dup sugeruje, ze Anthropic team traktuje #17017 jako kanoniczny - fix dla #17017 powinien rozwiazac oba.

### 4.4 autoMode.allow/soft_deny REPLACE (by design, udokumentowane)

autoMode jest jedyna sekcja gdzie REPLACE jest CELOWE i udokumentowane (per SYNTHESIS Part 2.9). Jesli ustawisz `autoMode.allow` lub `autoMode.soft_deny`, nadpisujesz pelna default list, nie dodajesz do niej.

**Procedura bezpieczna**: uruchom `claude auto-mode defaults` najpierw, skopiuj pelna liste, DOPIERO wtedy modyfikuj. `autoMode.environment` sie merguje (nie replace).

## 5. additionalDirectories vs --add-dir - identyczna mechanika

### 5.1 Kiedy persistent, kiedy per-session

Obie robia to samo - daja access do plikow w dodatkowych katalogach (per SYNTHESIS Part 5.3):

- `permissions.additionalDirectories: ["../docs/"]` w settings = persistent
- `--add-dir ../docs/` = per-session

Concat+dedup cross-scope.

### 5.2 Ograniczenie: nie laduje .claude/ ani CLAUDE.md z dodatkowych katalogow

Kluczowe zabezpieczenie (per SYNTHESIS Part 2.3): additionalDirectories NIE laduje `.claude/` ani `CLAUDE.md` z tych katalogow domyslnie. Chyba ze ustawisz `CLAUDE_CODE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1`.

To jest swiadoma decyzja Anthropic, zeby add-dir nie sluzylo jako sleeper vector do doladowania hookow z nieznanego katalogu.

## 6. Hooks patterns - community prevalence

### 6.1 PreToolUse block destructive commands (70%+)

Najczestszy pattern (per SYNTHESIS Part 7.6). Hook blokuje rm -rf, force push, sudo zanim Bash je wywola:

```bash
#!/bin/bash
# .claude/hooks/bash-guard.sh - PreToolUse hook
if echo "$CLAUDE_HOOK_COMMAND" | grep -qE "(rm -rf /|sudo rm|git push.*--force)"; then
  echo "BLOCKED: destructive command" >&2
  exit 2
fi
exit 0
```

Exit 2 = blocking, precedence nad allow rules.

### 6.2 PostToolUse auto-format (50%+)

Auto-format pliku po Edit:

```json
{
  "event": "PostToolUse",
  "matcher": "Edit",
  "type": "command",
  "command": "npx prettier --write $CLAUDE_EDIT_PATH"
}
```

### 6.3 SessionStart memory-bank load (15%+)

Pattern z centminmod / Power User archetype - ladowanie memory.md na start:

```json
{
  "event": "SessionStart",
  "type": "command",
  "command": "cat $CLAUDE_PROJECT_DIR/MEMORY.md 2>/dev/null || true"
}
```

### 6.4 Trail of Bits warning: hooks nie sa security boundary

Explicit (per SYNTHESIS Part 7.6): **hooki nie sa security boundary**. Sa "structured prompt injection at opportune times". Prompt injection moze je obejsc. Sluza UX i automation, NIE enforcement.

Dla realnego enforcement: managed tier + sandbox + OS-level controls. Hook to jedynie layer UX.

## 7. Env vars patterns - community consensus

### 7.1 Bash timeout overrides (BASH_DEFAULT_TIMEOUT_MS / BASH_MAX_TIMEOUT_MS)

Ubiquitous (per SYNTHESIS Part 7.7 + Part 5.12):

- `BASH_DEFAULT_TIMEOUT_MS=420000` (7 min) - docs default za krotki
- `BASH_MAX_TIMEOUT_MS=7200000` (2h) - dla CI / long tests

W shell profile:
```bash
export BASH_DEFAULT_TIMEOUT_MS=420000
export BASH_MAX_TIMEOUT_MS=7200000
```

### 7.2 Privacy: DISABLE_TELEMETRY + DISABLE_ERROR_REPORTING

Community consensus dla privacy:

```bash
export DISABLE_TELEMETRY=1
export DISABLE_ERROR_REPORTING=1
export CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY=1
```

Uwaga: Trail of Bits sugeruje, ze `DISABLE_TELEMETRY=1` NIE wylacza wszystkich egress (known-unknown z Appendix C.3). Dla prawdziwie air-gapped uzyj tez `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1`.

### 7.3 CI/CD: CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1

Krytyczna ochrona dla CI (per SYNTHESIS Part 5.9). Filtruje credential patterns (ANTHROPIC_API_KEY, AWS_\*, GITHUB_TOKEN) z env subprocesow - hooki i plugins nie widza tych env.

Zawsze ustawione w managed env block dla enterprise fleet.

### 7.4 Air-gapped: CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1

Per SYNTHESIS Part 5.11. Wylacza wszystkie non-essential HTTP: analytics, updater, error reporting, feedback surveys. Rekomendowane dla air-gapped / isolated environments.

Komplementarnie: `CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY=1` (noise reduction), `DISABLE_TELEMETRY=1`, `DISABLE_ERROR_REPORTING=1`.

## 8. Community repos worth studying

### 8.1 trailofbits/claude-code-config - gold standard security

1.9k stars. Security-paranoid archetype z pelnym publicznym rationale (per SYNTHESIS Part 7.3). Deny list obejmuje SSH/GPG/AWS/Azure/Kube/Docker creds, npmrc/pypirc/gem credentials, git-credentials, shell rc files, macOS Keychains, crypto wallets (metamask, electrum, exodus, phantom, solflare).

Plus explicit `enableAllProjectMcpServers: false` jako critical setting przeciw compromised repos.

### 8.2 davila7/claude-code-templates - archetypow examples

24.7k stars. Templates library z przykladami dla roznych archetypow (per SYNTHESIS Part 7.3). Dobry starter dla nowych uzytkownikow.

### 8.3 obra/superpowers - plugin system alternative

156k stars (CRITIC uwaga: weryfikacja last-activity potrzebna). Jesse Vincent's plugin-system bypasses settings.json w calosci na rzecz skill-based plugin config (per SYNTHESIS Part 7.11). Eksperyment ktory moze wygrac dla individual workflows, ale enterprise wciaz potrzebuje settings.json z managed tier.

### 8.4 letsur-dev/ccperm - audit TUI dla settings files

HN 47167242 (per SYNTHESIS Part 3.11). TUI skanuje home directory dla wszystkich settings files, pokazuje accumulated permissions across projects. Cytat z autora: "I use Claude Code across ~10 projects and had no idea what I'd been allowing over time".

Uzycie: audit periodyczny settings.local.json, wykrywanie "Yes don't ask again" drift i invalid entries (#16301).
