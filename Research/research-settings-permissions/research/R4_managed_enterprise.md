# R4: Managed Layer + Enterprise Deployment

Kampania: Claude Code Settings + Permissions 2026
Researcher: R4
Model: Opus 4.7
Data: 2026-04-17

---

## 1. Abstract

Managed settings to najwyzsza warstwa w hierarchii konfiguracji Claude Code - warstwa ktora z definicji "cannot be overridden by any other level, including command line arguments" [1]. W odroznieniu od `~/.claude/settings.json` (user) czy `.claude/settings.json` (project), warstwa Managed jest egzekwowana niezaleznie od tego co robi developer, i zostala zaprojektowana tak, zeby IT/Security moglo wymuszac polityki organizacyjne bez mozliwosci obejscia przez koncowego uzytkownika.

Rok 2026 przyniosl istotne przetasowanie w tej warstwie. Claude Code obslguje teraz **cztery rownolegle mechanizmy dostarczania** konfiguracji managed:

1. **Server-managed settings** - konfiguracja dostarczana z serwerow Anthropic, konfigurowana z Claude.ai admin console, wymaga planu Claude for Teams (v2.1.38+) lub Claude for Enterprise (v2.1.30+) [2].
2. **MDM/OS-level policies** - macOS managed preferences (`com.anthropic.claudecode`) lub Windows Registry (`HKLM\SOFTWARE\Policies\ClaudeCode`) dostarczane przez Jamf/Intune/GPO [1].
3. **File-based managed settings** - `managed-settings.json` w katalogach systemowych plus drop-in `managed-settings.d/*.json` [1].
4. **HKCU registry (Windows)** - user-level policy key o najnizszym priorytecie wewnatrz warstwy managed.

Wewnatrz warstwy managed obowiazuje jasna precedensja: server > MDM > file > HKCU, i - kluczowe - **"Only one managed source is used; sources do not merge across tiers"** [1]. To zmienia mentalny model z "wszystko sumuje sie do policy" na "pierwsze niepuste zrodlo wygrywa i zastepuje reszte". Administrator zespolu Teams/Enterprise moze scentralizowanie dostarczac polityke przez admin console bez dotykania urzadzen; firma z MDM moze woli twardsze enforcement na poziomie systemu operacyjnego. Obie sciezki wspoldziela dokladnie ten sam format JSON i ten sam zestaw managed-only keys (`allowManagedPermissionRulesOnly`, `allowManagedHooksOnly`, `allowManagedMcpServersOnly`, `forceRemoteSettingsRefresh`, `strictKnownMarketplaces` i dziewiec innych [3]).

Ten raport dokumentuje zweryfikowane sciezki plikow per OS (w tym istotna zmiane Windows w v2.1.75 gdzie `C:\ProgramData\ClaudeCode` przestal byc wspierany na rzecz `C:\Program Files\ClaudeCode`), pelna matryce managed-only settings, konkretne snippety deploymentu dla Jamf/Intune/GPO pochodzace bezposrednio z oficjalnego repo `anthropics/claude-code`, oraz profile branzowe (healthcare/finance/corporate) zbudowane na bazie udokumentowanych kluczy. Flaguje tez dwa obszary z rzeczywistymi lukami w dokumentacji: zachowanie przy invalid JSON i pelne integracje apiKeyHelper z zewnetrznymi secret stores.

---

## 2. Plik paths per OS (tabela z walidacja)

### 2.1 File-based managed settings (wspolny format JSON)

| OS | Sciezka `managed-settings.json` | Drop-in directory | Status |
| :--- | :--- | :--- | :--- |
| macOS | `/Library/Application Support/ClaudeCode/managed-settings.json` | `/Library/Application Support/ClaudeCode/managed-settings.d/*.json` | Potwierdzone [1] |
| Linux / WSL | `/etc/claude-code/managed-settings.json` | `/etc/claude-code/managed-settings.d/*.json` | Potwierdzone [1] |
| Windows (v2.1.75+) | `C:\Program Files\ClaudeCode\managed-settings.json` | `C:\Program Files\ClaudeCode\managed-settings.d\*.json` | Potwierdzone [1] |
| Windows (legacy <v2.1.75) | `C:\ProgramData\ClaudeCode\managed-settings.json` | - | **DEPRECATED** [1] |

Wazne: oficjalna dokumentacja zawiera explicite warning dotyczace Windows: *"The legacy Windows path `C:\ProgramData\ClaudeCode\managed-settings.json` is no longer supported as of v2.1.75. Administrators who deployed settings to that location must migrate files to `C:\Program Files\ClaudeCode\managed-settings.json`"* [1]. Oznacza to, ze scieżka podawana wczesniej w pierwotnym briefie (`C:\ProgramData\ClaudeCode\managed-settings.json`) jest **nieaktualna** od v2.1.75. Admin Intune Platform Script z oficjalnego repo Anthropic zapisuje plik do `$env:ProgramFiles\ClaudeCode`, czyli `C:\Program Files\ClaudeCode` [4]. Management config migration dla fleetu z klasycznymi GPO wymaga przesuniecia plikow - Claude Code nie czyta juz starego miejsca po upgrade.

### 2.2 Drop-in directory merge order

File-based managed settings obsluguja systemd-style drop-in. Mechanika [1]:

> *Following the systemd convention, managed-settings.json is merged first as the base, then all `*.json` files in the drop-in directory are sorted alphabetically and merged on top. Later files override earlier ones for scalar values; arrays are concatenated and de-duplicated; objects are deep-merged. Hidden files starting with `.` are ignored.*

To pozwala niezaleznym zespolom IT, SecOps i Compliance deployowac wlasne fragmenty polityki bez koordynacji jednego pliku. Konwencja z liczbowym prefiksem dla kontroli kolejnosci:

```
/etc/claude-code/
  managed-settings.json              # baza, minimalna
  managed-settings.d/
    10-telemetry.json                 # env vars, OTLP endpoint
    20-security.json                  # permissions.deny, disableBypassPermissionsMode
    30-compliance-hooks.json          # SessionStart audit hooks
    40-secrets.json                   # apiKeyHelper path
```

### 2.3 MDM/OS-level policy paths (alternatywa do plikow)

| OS | Mechanizm | Lokalizacja |
| :--- | :--- | :--- |
| macOS | Managed Preferences (plist) | Preference domain: `com.anthropic.claudecode` (deploy via Jamf/Kandji Configuration Profile) [1] |
| Windows (machine) | Registry REG_SZ/REG_EXPAND_SZ | `HKLM\SOFTWARE\Policies\ClaudeCode` z valueName `Settings` zawierajacym single-line JSON [1] |
| Windows (user) | Registry REG_SZ | `HKCU\SOFTWARE\Policies\ClaudeCode` - najnizszy priorytet managed, uzywany tylko jesli brak admin-level source [1] |

---

## 3. Precedensja: dlaczego Managed zawsze wygrywa

Oficjalna hierarchia settings precedence, od najwyzszego do najnizszego [1]:

1. **Managed settings** (server-managed, MDM/OS-level policies, managed settings files)
2. **Command line arguments**
3. **Local project settings** (`.claude/settings.local.json`)
4. **Shared project settings** (`.claude/settings.json`)
5. **User settings** (`~/.claude/settings.json`)

Dwa load-bearing cytaty:

> *"Managed settings: cannot be overridden by any other level, including command line arguments."* [1]

> *"If a tool is denied at any level, no other level can allow it. For example, a managed settings deny cannot be overridden by `--allowedTools`, and `--disallowedTools` can add restrictions beyond what managed settings define."* [5]

### 3.1 Wewnatrz warstwy managed

Wewnetrzna precedensja managed-tier (dostepna tylko od v2026 po wprowadzeniu server-managed) [1]:

> *"Within the managed tier, precedence is: server-managed > MDM/OS-level policies > file-based (managed-settings.d/*.json + managed-settings.json) > HKCU registry (Windows only). Only one managed source is used; sources do not merge across tiers. Within the file-based tier, drop-in files and the base file are merged together."*

To krytyczna roznica operacyjna. Jesli organizacja uruchomi server-managed przez admin console Claude.ai i jednoczesnie ma legacy plik `managed-settings.json` na maszynach, **plik zostanie zignorowany w calosci** - nie merge, nie fallback na brakujace klucze. Anthropic explicite ostrzega [2]:

> *"Within the managed tier, the first source that delivers a non-empty configuration wins. Server-managed settings are checked first, then endpoint-managed settings. Sources do not merge: if server-managed settings deliver any keys at all, endpoint-managed settings are ignored entirely. If server-managed settings deliver nothing, endpoint-managed settings apply."*

Implikacja dla admins: **migracja z file-based na server-managed musi byc flag-day** (wylaczenie lokalnych plikow po wdrozeniu server-managed) lub server-managed config musi duplikowac wszystkie klucze z plikow.

### 3.2 Array settings - wyjatek od "pierwsze wygrywa"

Settings o typie array zachowuja sie inaczej - laczone sa przez scopes [1]:

> *"Array settings merge across scopes. When the same array-valued setting (such as sandbox.filesystem.allowWrite or permissions.allow) appears in multiple scopes, the arrays are concatenated and deduplicated, not replaced. This means lower-priority scopes can add entries without overriding those set by higher-priority scopes, and vice versa."*

To oznacza, ze `permissions.deny` z managed settings **nie blokuje** dodawania przez user/project wlasnych deny rules - one sie SUMUJA. User moze tylko dodac, nigdy ujac. Wyjatek kontrolowany przez managed-only key: `allowManagedPermissionRulesOnly: true` powoduje, ze **zadne** permission rules z user/project nie sa respektowane [3].

---

## 4. Policy matrix: co mozna zablokowac

Ponizej matryca kluczowych kontroli z bezposrednimi cytatami, w kolejnosci malejacej wagi dla enterprise.

### 4.1 Managed-only settings (tylko w managed, nigdzie indziej nie dziala)

| Setting | Opis | Zrodlo |
| :--- | :--- | :--- |
| `allowManagedPermissionRulesOnly` | *"When true, prevents user and project settings from defining allow, ask, or deny permission rules. Only rules in managed settings apply"* | [3] |
| `allowManagedHooksOnly` | *"When true, only managed hooks, SDK hooks, and hooks from plugins force-enabled in managed settings `enabledPlugins` are loaded. User, project, and all other plugin hooks are blocked"* | [3] |
| `allowManagedMcpServersOnly` | *"When true, only `allowedMcpServers` from managed settings are respected. `deniedMcpServers` still merges from all sources"* | [3] |
| `sandbox.filesystem.allowManagedReadPathsOnly` | Tylko managed `filesystem.allowRead` paths dzialaja (denyRead nadal sie merguje) | [3] |
| `sandbox.network.allowManagedDomainsOnly` | *"When true, only `allowedDomains` and `WebFetch(domain:...)` allow rules from managed settings are respected. Non-allowed domains are blocked automatically without prompting the user"* | [3] |
| `forceRemoteSettingsRefresh` | *"When true, blocks CLI startup until remote managed settings are freshly fetched and exits if the fetch fails"* | [3] |
| `strictKnownMarketplaces` | Allowlist plugin marketplaces (empty array = lockdown) | [3] |
| `blockedMarketplaces` | Blocklist marketplace sources (sprawdzane przed pobraniem - nigdy nie dotykaja filesystem) | [3] |
| `allowedChannelPlugins` | Allowlist channel plugins | [3] |
| `channelsEnabled` | Odblokuj channels dla Team/Enterprise | [3] |
| `pluginTrustMessage` | Custom warning message przy plugin install | [3] |

### 4.2 Settings egzekwowalne z managed (dzialaja tez w user/project, ale z managed sa nie-do-obejscia)

| Kontrola | Setting | Dzialanie | Zrodlo |
| :--- | :--- | :--- | :--- |
| **Blokada bypass mode** | `permissions.disableBypassPermissionsMode: "disable"` | Wylacza `--dangerously-skip-permissions` globalnie | [5] |
| **Blokada auto mode** | `disableAutoMode: "disable"` | Usuwa auto z Shift+Tab, odrzuca `--permission-mode auto` | [1] |
| **Tool denies** | `permissions.deny: [...]` | Deny rules maja precedens nad allow na kazdym poziomie, managed deny = nie do ominiecia | [5] |
| **Force model** | `model: "claude-sonnet-4-6"` | Wymuszony model default | [1] |
| **Restrict models** | `availableModels: ["sonnet", "haiku"]` | Users nie moga wybrac Opus przez `/model` | [1] |
| **Min version** | `minimumVersion: "2.1.100"` | Blokuje downgrade | [1] |
| **Force login org** | `forceLoginOrgUUID: "..."` | *"When set in managed settings, login fails if the authenticated account does not belong to a listed organization"* | [1] |
| **Force login method** | `forceLoginMethod: "claudeai"` lub `"console"` | Restrict login type | [1] |
| **MCP disable** | `disabledMcpjsonServers: [...]` | Reject specific MCP servers from .mcp.json | [1] |
| **Hooks enforce** | `hooks: { ... }` + `allowManagedHooksOnly: true` | Tylko managed hooks sie ladauja | [3] |
| **apiKeyHelper** | `apiKeyHelper: "/path/to/script.sh"` | Custom script dla credentials | [1] |
| **Auto-updates channel** | `autoUpdatesChannel: "stable"` | Pin stable (~1 week old, skips regressions) | [1] |
| **Block deep links** | `disableDeepLinkRegistration: "disable"` | Nie rejestruj `claude-cli://` protocol | [1] |
| **Block shell in skills** | `disableSkillShellExecution: true` | Wylacza inline shell w user/project skills | [1] |
| **Env vars** | `env: {...}` | Ustawia per-session env vars (OTLP, proxy, itp.) | [1] |
| **Company announcements** | `companyAnnouncements: [...]` | Banner przy startup | [1] |
| **Sandbox hard gate** | `sandbox.enabled: true` + `sandbox.failIfUnavailable: true` | *"Exit with an error at startup if sandbox.enabled is true but the sandbox cannot start... Intended for managed settings deployments that require sandboxing as a hard gate"* | [1] |
| **Disable all hooks** | `disableAllHooks: true` | Nuclear option - zero hooks i statusline | [1] |
| **Session cleanup** | `cleanupPeriodDays: 14` | Retention sesji (min 1, nie moze byc 0) | [1] |

### 4.3 Telemetry/autoUpdate/logging

- `autoUpdatesChannel`: user moze nadpisac w user settings chyba ze managed ustawia wartosc (wtedy managed wygrywa)
- `env.CLAUDE_CODE_ENABLE_TELEMETRY: "1"` + `OTEL_METRICS_EXPORTER: "otlp"` + `OTEL_EXPORTER_OTLP_ENDPOINT`: kompletna telemetria do SIEM mozliwa wylacznie przez managed env [1]
- `minimumVersion`: pozwala pin version - uzyteczne gdy CVE w konkretnej wersji

---

## 5. Deployment platforms

Wszystkie ponizsze templates pochodza bezposrednio z oficjalnego repo `anthropics/claude-code` w katalogu `examples/mdm/` [4][6][7][8][9].

### 5.1 Jamf Pro / Kandji (macOS)

Dwa typy deploymentu:

**A) Custom Settings Payload (preferowane)** - plist jako preference domain `com.anthropic.claudecode` [6]:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>permissions</key>
    <dict>
        <key>disableBypassPermissionsMode</key>
        <string>disable</string>
    </dict>
</dict>
</plist>
```

W Jamf: Computers > Configuration Profiles > New > Application & Custom Settings > Custom Settings > Preference Domain: `com.anthropic.claudecode`, Source: Upload PLIST. Kandji ma analogiczny flow pod "Custom Profile".

**B) Full mobileconfig profile (testing / niektore MDMs)** - kompletny configuration profile [7]:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadDisplayName</key>
    <string>Claude Code Managed Settings</string>
    <key>PayloadIdentifier</key>
    <string>com.anthropic.claudecode.profile</string>
    <key>PayloadOrganization</key>
    <string>Example Organization</string>
    <key>PayloadScope</key>
    <string>System</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>DC3CBC17-3330-4CDE-94AC-D2342E9C88A3</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>PayloadType</key>
            <string>com.apple.ManagedClient.preferences</string>
            <key>PayloadUUID</key>
            <string>BEFD5F54-71FC-4012-82B2-94399A1E220B</string>
            <key>PayloadContent</key>
            <dict>
                <key>com.anthropic.claudecode</key>
                <dict>
                    <key>Forced</key>
                    <array>
                        <dict>
                            <key>mcx_preference_settings</key>
                            <dict>
                                <key>permissions</key>
                                <dict>
                                    <key>disableBypassPermissionsMode</key>
                                    <string>disable</string>
                                </dict>
                            </dict>
                        </dict>
                    </array>
                </dict>
            </dict>
        </dict>
    </array>
</dict>
</plist>
```

Pre-deploy: wygeneruj nowe UUID-y (`uuidgen` na macOS), podmien `PayloadOrganization`, zwaliduj `plutil -lint profile.mobileconfig`. Po deploymencie na testowej maszynie: `claude` -> `/status` powinien pokazac *"Enterprise managed settings (plist)"* w Setting sources [4].

**Alternatywna sciezka - Jamf Composer z plikiem**: jesli chcemy file-based zamiast plist, mozna zbudowac pkg z `managed-settings.json` instalowanym do `/Library/Application Support/ClaudeCode/managed-settings.json` i deployowac jako Jamf Policy.

### 5.2 Microsoft Intune

Intune obsluguje trzy rozne mechanizmy, wszystkie udokumentowane przez Anthropic:

**A) Platform Scripts (Windows)** - oficjalny PowerShell script [4]:

```powershell
<#
Deploys Claude Code managed settings as a JSON file.

Intune: Devices > Scripts and remediations > Platform scripts > Add (Windows 10 and later).
  Run this script using the logged on credentials: No
  Run script in 64 bit PowerShell Host: Yes

Claude Code reads C:\Program Files\ClaudeCode\managed-settings.json at startup
and treats it as a managed policy source.
#>

$ErrorActionPreference = 'Stop'

$dir = Join-Path $env:ProgramFiles 'ClaudeCode'
New-Item -ItemType Directory -Path $dir -Force | Out-Null

$json = @'
{
  "permissions": {
    "disableBypassPermissionsMode": "disable"
  }
}
'@

$path = Join-Path $dir 'managed-settings.json'
[System.IO.File]::WriteAllText($path, $json, (New-Object System.Text.UTF8Encoding($false)))
Write-Output "Wrote $path"
```

Deployment: Intune admin center > Devices > Scripts and remediations > Platform scripts > Add > Windows 10/11 > upload ps1, ustaw "Run script in 64 bit PowerShell Host: Yes", "Run script using logged on credentials: No".

**B) ADMX Import (Group Policy)** - oficjalny ADMX z Anthropic [8]:

```xml
<?xml version="1.0" encoding="utf-8"?>
<policyDefinitions xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                   xmlns="http://schemas.microsoft.com/GroupPolicy/2006/07/PolicyDefinitions"
                   revision="1.0" schemaVersion="1.0">
  <policyNamespaces>
    <target prefix="claudecode" namespace="Anthropic.Policies.ClaudeCode" />
    <using prefix="windows" namespace="Microsoft.Policies.Windows" />
  </policyNamespaces>
  <categories>
    <category name="Cat_ClaudeCode" displayName="$(string.Cat_ClaudeCode)" />
  </categories>
  <policies>
    <policy name="ManagedSettings"
            class="Machine"
            displayName="$(string.ManagedSettings)"
            key="SOFTWARE\Policies\ClaudeCode">
      <parentCategory ref="Cat_ClaudeCode" />
      <supportedOn ref="windows:SUPPORTED_Windows_10_0" />
      <elements>
        <text id="SettingsJson" valueName="Settings" maxLength="1000000" required="true" />
      </elements>
    </policy>
  </policies>
</policyDefinitions>
```

Deployment Intune: Devices > Configuration profiles > Create > Windows 10+ > Templates > Imported Administrative Templates > Import ADMX (upload `ClaudeCode.admx` + `en-US/ClaudeCode.adml`) > skonfiguruj policy z JSON jako single-line string.

**C) Intune Configuration Profile / Custom OMA-URI** - dla macOS mozna wrzucic `.mobileconfig` z sekcji 5.1 jako macOS > Templates > Custom.

Weryfikacja post-deploy: u uzytkownika `claude` > `/status` > *"Enterprise managed settings (HKLM)"* dla ADMX/GPO, *"Enterprise managed settings (file)"* dla Platform Script [4].

### 5.3 Puppet / Chef / Ansible (Linux fleet)

Brak oficjalnych templates od Anthropic dla Linux config management, ale wzorzec jest prosty - file based managed settings to tylko plik JSON. Przyklad Ansible task:

```yaml
- name: Ensure Claude Code managed settings directory
  ansible.builtin.file:
    path: /etc/claude-code
    state: directory
    owner: root
    group: root
    mode: "0755"

- name: Deploy managed-settings.json
  ansible.builtin.copy:
    content: "{{ claudecode_managed_settings | to_nice_json }}"
    dest: /etc/claude-code/managed-settings.json
    owner: root
    group: root
    mode: "0644"
    validate: "python3 -m json.tool %s"
  notify: restart_claude_sessions
```

`validate:` daje nam pre-flight check - invalid JSON powoduje fail tasku i nie podmieni pliku. Kluczowe ze wzgledu na silent-failure behavior na runtime (patrz sekcja 9).

Analogiczne przyklady Puppet (`file { '/etc/claude-code/managed-settings.json': ... }`) i Chef (`file` resource z `content` i `verify`). Krytyczne: mode 0644 (owner root), drop-in directory `/etc/claude-code/managed-settings.d/` z mode 0755.

### 5.4 GPO (Windows) - direct deployment

Oficjalna metoda Group Policy uzywa ADMX z 5.2B: skopiuj `ClaudeCode.admx` do `C:\Windows\PolicyDefinitions\` (i ADML do `C:\Windows\PolicyDefinitions\en-US\`) na DC, otworz gpmc.msc, utworz GPO, nawyguj do Computer Configuration > Policies > Administrative Templates > Claude Code > Managed Settings, wprowadz JSON jako single-line string. Writes do `HKLM\SOFTWARE\Policies\ClaudeCode\Settings` REG_SZ.

Alternatywa dla organizacji bez ADMX pipeline: GPO Preferences > Files > deploy `managed-settings.json` do `C:\Program Files\ClaudeCode\`. Mniej eleganckie (nie jest technicznie "policy") ale dziala.

### 5.5 Manual push (POC, single machine, break-glass)

macOS:
```bash
sudo mkdir -p "/Library/Application Support/ClaudeCode"
sudo tee "/Library/Application Support/ClaudeCode/managed-settings.json" > /dev/null <<'EOF'
{ "permissions": { "disableBypassPermissionsMode": "disable" } }
EOF
sudo chmod 644 "/Library/Application Support/ClaudeCode/managed-settings.json"
```

Linux:
```bash
sudo mkdir -p /etc/claude-code
sudo tee /etc/claude-code/managed-settings.json > /dev/null <<'EOF'
{ "permissions": { "disableBypassPermissionsMode": "disable" } }
EOF
sudo chmod 644 /etc/claude-code/managed-settings.json
python3 -m json.tool /etc/claude-code/managed-settings.json > /dev/null && echo OK
```

Windows (elevated PowerShell):
```powershell
New-Item -Path "C:\Program Files\ClaudeCode" -ItemType Directory -Force
@'
{ "permissions": { "disableBypassPermissionsMode": "disable" } }
'@ | Out-File -Encoding UTF8 -NoNewline "C:\Program Files\ClaudeCode\managed-settings.json"
```

### 5.6 Server-managed (Claude.ai admin console) - bez MDM

Dla organizacji Claude for Teams/Enterprise najmniej inwazyjna sciezka - zero MDM, zero filesystem touch [2]:

1. Claude.ai > Admin Settings > Claude Code > Managed settings
2. Paste JSON config
3. Save

Claude Code klienci odbieraja config przy nastepnym startupie lub po hourly poll. Anthropic podsumowuje trade-off [2]:

> *"If your devices are enrolled in an MDM or endpoint management solution, endpoint-managed settings provide stronger security guarantees because the settings file can be protected from user modification at the OS level."*

Innymi slowy: server-managed jest wygodniejszy i rekomendowany dla BYOD / rozproszonych zespolow, ale user z root/admin lokalnie moze modyfikowac Claude Code binary lub cached settings file. Dla hard-regulated industries: file-based + MDM z file permissions 0644 root:root.

---

## 6. Example managed-settings.json per branza

Kazdy profil zbudowany z udokumentowanych kluczy; komentarze nie sa czescia JSON (nie sa wspierane) i pokazane sa jedynie dla czytelnosci.

### 6.1 Corporate baseline (L1 - deny bypass, safe defaults)

Minimalny baseline dla kazdej organizacji - blokuje dangerous bypass, wylacza credentials theft, wymusza stable channel [10]:

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "disableBypassPermissionsMode": "disable",
    "disableAutoMode": "disable",
    "deny": [
      "Bash(curl *)",
      "Bash(wget *)",
      "Bash(rm -rf /*)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(~/.ssh/**)",
      "Read(~/.aws/credentials)",
      "Read(~/.gnupg/**)"
    ]
  },
  "disableDeepLinkRegistration": "disable",
  "autoUpdatesChannel": "stable",
  "minimumVersion": "2.1.100",
  "companyAnnouncements": [
    "Reminder: code reviews required for all PRs. See intranet/secure-coding."
  ]
}
```

### 6.2 Corporate hardened (L2 - allowlist only, managed-only rules)

Tighter profile dla srodowisk z formalnymi security req (ISO27001, SOC2) - uzytkownik nie moze dodac wlasnych rules [10]:

```json
{
  "permissions": {
    "disableBypassPermissionsMode": "disable",
    "allow": [
      "Bash(npm run *)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Bash(git log *)",
      "Bash(git add *)",
      "Bash(git commit *)"
    ],
    "ask": [
      "Bash(git push *)",
      "Bash(docker *)"
    ],
    "deny": [
      "Bash(curl *)",
      "Bash(wget *)",
      "Read(./.env*)",
      "Read(./secrets/**)",
      "Read(~/.ssh/**)",
      "Read(~/.aws/**)",
      "WebFetch"
    ]
  },
  "allowManagedPermissionRulesOnly": true,
  "allowManagedHooksOnly": true,
  "availableModels": ["sonnet", "haiku"],
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "allowUnsandboxedCommands": false,
    "network": {
      "allowedDomains": ["github.com", "*.npmjs.org", "registry.yarnpkg.com"],
      "allowManagedDomainsOnly": true
    },
    "filesystem": {
      "denyRead": ["~/.aws/credentials", "~/.ssh/id_*", "~/.gnupg/"]
    }
  },
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "https://otel.corp.example.com:4317"
  }
}
```

### 6.3 Healthcare / HIPAA (PHI protection, external fetch blackout)

Profil zaprojektowany pod HIPAA - blok external WebFetch, blok read PHI paths, mandatory SessionStart logging. Anthropic nie publikuje oficjalnej kombinacji HIPAA; profil ponizej bazuje na kluczach z docs [1][3][5] plus wzorce z TrueFoundry governance guide [10]:

```json
{
  "permissions": {
    "disableBypassPermissionsMode": "disable",
    "disableAutoMode": "disable",
    "deny": [
      "WebFetch",
      "WebSearch",
      "Bash(curl *)",
      "Bash(wget *)",
      "Read(./phi/**)",
      "Read(./patient-data/**)",
      "Read(./ehr/**)",
      "Read(**/*.dcm)",
      "Read(**/*.hl7)"
    ],
    "ask": [
      "Bash(git push *)"
    ]
  },
  "allowManagedPermissionRulesOnly": true,
  "allowManagedHooksOnly": true,
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "network": {
      "allowedDomains": [
        "github.corp-health.example.com",
        "artifacts.corp-health.example.com"
      ],
      "allowManagedDomainsOnly": true
    }
  },
  "hooks": {
    "SessionStart": [
      { "matcher": "*", "hooks": [
        { "type": "command", "command": "/usr/local/bin/hipaa-session-audit.sh" }
      ]}
    ],
    "PreToolUse": [
      { "matcher": "Bash|Edit|Write", "hooks": [
        { "type": "command", "command": "/usr/local/bin/hipaa-preaction-log.sh" }
      ]}
    ],
    "SessionEnd": [
      { "matcher": "*", "hooks": [
        { "type": "command", "command": "/usr/local/bin/hipaa-session-close.sh" }
      ]}
    ]
  },
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "https://siem.corp-health.example.com:4317",
    "OTEL_RESOURCE_ATTRIBUTES": "compliance=hipaa,environment=production"
  },
  "disableSkillShellExecution": true,
  "forceLoginOrgUUID": "11111111-2222-3333-4444-555555555555"
}
```

Uzasadnienie per klucz: deny WebFetch/WebSearch = zero exfiltration via LLM tool; ask git push = human review mandatory; allowManagedPermissionRulesOnly = user nie moze dodac `allow WebFetch`; hooks SessionStart/PreToolUse/SessionEnd = tamper-evident chain dla compliance audit; OTLP do SIEM = realtime logging; forceLoginOrgUUID = nikt spoza organizacji nie moze uzywac tej maszyny.

Disclaimer: **HIPAA compliance nie jest osiagany przez jeden plik config** - to tylko jeden z wielu technical safeguards. Skonsultuj z compliance team.

### 6.4 Finance / PII / PCI-DSS (strict deny, mandatory audit)

Profil pod finansowe regulacje - SOX, PCI-DSS, GDPR PII. Kluczowe: deny read credentials, mandatory hooks z audit, model pinning, autoMode zmrozony:

```json
{
  "permissions": {
    "disableBypassPermissionsMode": "disable",
    "disableAutoMode": "disable",
    "deny": [
      "Bash(curl *)",
      "Bash(wget *)",
      "Bash(nc *)",
      "Bash(ncat *)",
      "Read(./customer-pii/**)",
      "Read(./kyc/**)",
      "Read(./card-data/**)",
      "Read(**/*.pem)",
      "Read(**/*.key)",
      "Read(~/.ssh/**)",
      "Read(~/.aws/**)",
      "Read(~/.azure/**)",
      "Read(~/.gcp/**)",
      "WebFetch",
      "WebSearch"
    ]
  },
  "allowManagedPermissionRulesOnly": true,
  "allowManagedHooksOnly": true,
  "model": "claude-sonnet-4-6",
  "availableModels": ["sonnet"],
  "minimumVersion": "2.1.100",
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "allowUnsandboxedCommands": false,
    "network": {
      "allowManagedDomainsOnly": true,
      "allowedDomains": [
        "gitlab.corp-finance.example.com",
        "artifactory.corp-finance.example.com"
      ]
    },
    "filesystem": {
      "allowManagedReadPathsOnly": true,
      "denyRead": [
        "~/.aws/credentials",
        "~/.ssh/id_*",
        "~/.gnupg/",
        "/etc/passwd",
        "/etc/shadow"
      ]
    }
  },
  "hooks": {
    "SessionStart": [
      { "matcher": "*", "hooks": [
        { "type": "command", "command": "/opt/corp/bin/pci-session-start.sh" }
      ]}
    ],
    "PreToolUse": [
      { "matcher": "Bash|Edit|Write|WebFetch", "hooks": [
        { "type": "command", "command": "/opt/corp/bin/pci-audit-log.sh" }
      ]}
    ],
    "ConfigChange": [
      { "matcher": "*", "hooks": [
        { "type": "command", "command": "/opt/corp/bin/pci-config-alert.sh" }
      ]}
    ]
  },
  "apiKeyHelper": "/opt/corp/bin/fetch-anthropic-key-from-vault.sh",
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "https://siem.corp-finance.example.com:4317",
    "OTEL_RESOURCE_ATTRIBUTES": "compliance=pci-dss-v4,sox=true"
  },
  "cleanupPeriodDays": 90,
  "strictKnownMarketplaces": [],
  "companyAnnouncements": [
    "PCI-DSS environment: all tool calls are logged. Do not paste customer data into prompts."
  ]
}
```

### 6.5 Drop-in modular pattern (rozdzielenie odpowiedzialnosci)

Dla organizacji gdzie rozne zespoly wlada rozne obszary polityki, drop-in directory pozwala rozdzielic bez konfliktow:

```
/etc/claude-code/
  managed-settings.json                     # baza od IT: model, version, autoUpdates
  managed-settings.d/
    10-security-deny.json                   # od SecOps: permissions.deny + allowManagedPermissionRulesOnly
    20-sandbox.json                         # od SecOps: sandbox.*
    30-audit-hooks.json                     # od Compliance: hooks.* + allowManagedHooksOnly
    40-telemetry.json                       # od Observability: env.OTEL_*
    50-vault-apikey.json                    # od IAM: apiKeyHelper
```

Merge zasady z sekcji 2.2: arrays (permissions.deny, allowedDomains) sa concatenated/deduped, scalars ostatni wygrywa alphabetical. W praktyce `50-...` moze nadpisac `10-...`.

---

## 7. apiKeyHelper via enterprise secrets

Oficjalny opis `apiKeyHelper` [1]:

> *"Custom script, to be executed in /bin/sh, to generate an auth value. This value will be sent as X-Api-Key and Authorization: Bearer headers for model requests."*

Szczegoly runtime [11]:
- Script wywolywany na startup i potem co 5 minut lub na HTTP 401
- TTL customizable przez `CLAUDE_CODE_API_KEY_HELPER_TTL_MS`
- Slow helper (>10s) wyswietla warning w prompt bar z elapsed time
- `apiKeyHelper`, `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN` dzialaja tylko w terminal CLI (Claude Desktop/remote uzywaja OAuth)
- Authentication precedence: cloud provider creds > ANTHROPIC_AUTH_TOKEN > ANTHROPIC_API_KEY > **apiKeyHelper** > CLAUDE_CODE_OAUTH_TOKEN > subscription OAuth

Managed-deployed apiKeyHelper zapewnia:
- Secrets nie znajduja sie na dysku (tylko path do scriptu jest w settings)
- Credentials moga sie rotowac bez edytowania settings
- Kazdy user uzywa wlasnych short-lived credentials z vault

### 7.1 AWS Secrets Manager

```bash
#!/bin/sh
# /opt/corp/bin/fetch-anthropic-key-aws.sh
# Deployed via Ansible do kazdej maszyny, 0755 root:root.
set -e
SECRET_ID="prod/claude-code/anthropic-key"
REGION="us-east-1"
aws secretsmanager get-secret-value \
  --secret-id "$SECRET_ID" \
  --region "$REGION" \
  --query SecretString \
  --output text
```

Wymaga IAM role z `secretsmanager:GetSecretValue` attachowanej do instance profile / session. Z managed `env.AWS_REGION` mozemy unifikowac region bez zmiany scriptu.

### 7.2 HashiCorp Vault

```bash
#!/bin/sh
# /opt/corp/bin/fetch-anthropic-key-vault.sh
set -e
VAULT_ADDR="https://vault.corp.example.com:8200"
SECRET_PATH="secret/data/claude-code/anthropic-key"

# Auth via AWS IAM / Kubernetes ServiceAccount / AppRole
VAULT_TOKEN=$(vault write -field=token auth/aws/login role=claude-code-role)
curl -sS -H "X-Vault-Token: $VAULT_TOKEN" \
  "$VAULT_ADDR/v1/$SECRET_PATH" \
  | jq -r '.data.data.api_key'
```

Dla short-lived tokens z Vault dynamic secrets: `CLAUDE_CODE_API_KEY_HELPER_TTL_MS=240000` (4 min) zeby odnowic przed 5 min TTL Vault lease.

### 7.3 Azure Key Vault

```bash
#!/bin/sh
# /opt/corp/bin/fetch-anthropic-key-azure.sh
set -e
VAULT_NAME="corp-claude-kv"
SECRET_NAME="anthropic-api-key"

# Managed Identity auth
az keyvault secret show \
  --vault-name "$VAULT_NAME" \
  --name "$SECRET_NAME" \
  --query value \
  --output tsv
```

### 7.4 Bedrock / Vertex credentials

Dla klientow na AWS Bedrock / Google Vertex AI apiKeyHelper nie jest wlasciwym toolem. Uzyj:
- `awsAuthRefresh` - skrypt modyfikujacy `.aws` directory (np. `aws sso login --profile myprofile`) [1]
- `awsCredentialExport` - skrypt wypluwajacy JSON z AWS credentials [1]
- `env.CLAUDE_CODE_USE_BEDROCK=1`, `env.CLAUDE_CODE_USE_VERTEX=1`, `env.CLAUDE_CODE_USE_FOUNDRY=1` w managed settings

### 7.5 Caveat: slow helper warning

Source [11]:
> *"If apiKeyHelper takes longer than 10 seconds to return a key, Claude Code displays a warning notice in the prompt bar showing the elapsed time."*

Praktyka: cache tokenu lokalnie ze sensownym TTL zamiast hit vault co 5 min. Przyklad z file-based cache:

```bash
#!/bin/sh
CACHE=/var/tmp/claude-key.cache
CACHE_TTL=270 # seconds
if [ -f "$CACHE" ] && [ $(($(date +%s) - $(stat -c %Y "$CACHE"))) -lt $CACHE_TTL ]; then
  cat "$CACHE"
  exit 0
fi
KEY=$(vault kv get -field=api_key secret/claude-code/anthropic-key)
printf '%s' "$KEY" | tee "$CACHE"
chmod 600 "$CACHE"
```

---

## 8. Mandatory hooks (audit / compliance)

Managed settings moga deployowac hooks, i z `allowManagedHooksOnly: true` tylko te hooks sa ladowane [3]. To pozwala wymusic audit logging ktorego user nie moze wylaczyc.

Oficjalny przyklad server-managed z docs [2]:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "/usr/local/bin/audit-edit.sh" }
        ]
      }
    ]
  }
}
```

### 8.1 Dostepne hook events dla compliance

Z oficjalnej dokumentacji hooks (potwierdzone keys) [12]:
- `SessionStart` - na start sesji lub restore. *"Extremely useful for injecting environment variables or initial context"* [12].
- `SessionEnd` - na koniec sesji. Idealne do flushowania audit log do SIEM.
- `PreToolUse` - przed kazdym tool call. Moze blokowac (exit code 2).
- `PostToolUse` - po kazdym tool call. Uzywane przez oficjalny przyklad Anthropic [2].
- `ConfigChange` - *"fires when an external process or editor modifies a configuration file, so you can log changes for compliance or block unauthorized modifications"* [12].
- `PermissionDenied` - przy denied tool call (gdy auto mode blokuje).

### 8.2 Przyklad audit hook dla SIEM

`/usr/local/bin/audit-edit.sh`:

```bash
#!/bin/sh
# Input z stdin: JSON z tool call details
# Envs: CLAUDE_PROJECT_DIR, USER, HOSTNAME
exec 3>>/var/log/claude-audit.log
flock 3
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
INPUT=$(cat)
printf '%s\t%s\t%s\t%s\t%s\n' \
  "$TIMESTAMP" \
  "${USER:-unknown}" \
  "${HOSTNAME:-unknown}" \
  "${CLAUDE_PROJECT_DIR:-unknown}" \
  "$INPUT" >&3
exit 0
```

Kombinacja z `fluent-bit` / `vector` / native `rsyslog` forward do SIEM (Splunk, Elastic, Datadog, CloudWatch). Od strony compliance-friendly: exit code 0 = allow, 2 = block, flock zapobiega race conditions wielu rownoczesnych tool calls.

### 8.3 Tamper-evident chain

Pro tip z community [10][13]: hook ktory podpisuje kazdy wpis z sekwencyjnym nonce + HMAC, tworzac hash chain. Dzieki temu usuniete linie sa wykrywalne przy audit. Wymaga zachowania tajnego klucza HMAC (np. z Vault przez separate helper) - przy deploymencie przez managed settings klucz nie jest w configu, tylko path do scriptu ktory go pobiera.

### 8.4 Security approval dialog

Dla server-managed settings: hooks wymagaja explicit user approval przy pierwszym startupie [2]:

> *"Because hooks execute shell commands, users see a security approval dialog before they're applied."*

Oznacza to, ze w full lockdown profile z server-managed - user najpierw musi kliknac "approve" dla hooks. W file-based/MDM tier brak dialogu - hooks ladauja sie silent. **Dla maksymalnego enforcement prefer MDM + file-based.**

### 8.5 HTTP hooks - dodatkowe kontrole

Jesli audit jest realizowany przez webhook a nie lokalny script, managed settings maja dwa klucze [1]:

```json
{
  "allowedHttpHookUrls": ["https://audit.corp.example.com/claude/*"],
  "httpHookAllowedEnvVars": ["AUDIT_TOKEN", "SIEM_KEY"]
}
```

`allowedHttpHookUrls` merguje sie przez scopes (array), wiec managed-deployed allowlist + user-added nie pozwala na exfiltration na inne domeny tylko dodaje kolejne.

---

## 9. Edge cases

### 9.1 Invalid JSON w managed-settings.json

**Udokumentowane zachowanie:** Claude Code w oficjalnych docs mowi tylko [1]:

> *"If a settings file contains errors, /status reports the issue so you can fix it."*

**Zaobserwowane community issues (multiple GitHub issues):**

- Issue #1506: *"When there is a syntax error in settings.json (something like a missing comma), Claude Code displays unhelpful crashing errors on launch then after each user input, it just displays 'Interaction interrupted by User' and does nothing"* [14]
- Issue #2835 / #24823: *"settings.json fails silently if malformed... any small problem with the JSON will cause Claude Code to silently ignore the settings"* [15][16]
- Issue #5563: *"Feature Request: Enhance /doctor to show specific JSON parsing errors in settings files"* - sugestia zeby pokazywac precise line/column [17]
- Issue #18809: `cowork` error *"CLI output was not valid JSON. This may indicate an error during startup. Output: Invalid configuration in /etc/srt-settings.json:"* - konkretny case gdzie invalid /etc plik lamal cowork [18]

**Praktyczna implikacja:** Na dzien 2026-04 zachowanie Claude Code dla invalid JSON jest **niesolidne** - czasem silently ignoruje settings, czasem crashuje interaktywne sesje, nie zawsze pokazuje precyzyjny blad. **Nalezy walidowac JSON pre-deployment** (patrz Ansible `validate:` z sekcji 5.3, `python3 -m json.tool`, `jq empty`, JSON schema z `$schema` linki [1]).

**Fallback behavior dla managed tier:** ponieważ precedensja wewnatrz managed to "pierwsze niepuste wygrywa", jesli server-managed jest skonfigurowane ale klient nie moze sie polaczyc, fallback idzie na endpoint-managed (MDM > file > HKCU). Jesli `forceRemoteSettingsRefresh: true`, CLI exit-uje zamiast fallback [19]. Jesli nie ma zadnego managed source (server down + file invalid + brak MDM), Claude Code ruszy z user/project/local settings - czyli bez enforcement.

**Tip dla admins:** dla krytycznych regul zawsze duplikuj deny rules na poziomie sandbox (`sandbox.filesystem.denyRead`, `sandbox.network.allowedDomains`) - te sa OS-level i pozostaja nawet jesli managed zostaly pominiete.

### 9.2 Conflict User vs Managed na tym samym kluczu

**Przyklad:** User ma `"model": "opus"` w `~/.claude/settings.json`, Managed ma `"model": "sonnet"`.

Rezultat: **Managed wygrywa**. `model` jest scalar, precedensja z sekcji 3: managed > CLI > local > project > user. User moze robic `/model opus` runtime ale managed setting winieszy przy kazdym restart. Jesli managed ma tez `availableModels: ["sonnet", "haiku"]`, `/model opus` zostanie odrzucony [1].

### 9.3 Permission allow w User, deny w Managed

Managed `deny: ["Bash(curl *)"]`, User `allow: ["Bash(curl *)"]`.

Rezultat: **deny wins** - zawsze. *"If a tool is denied at any level, no other level can allow it"* [5]. Deny > ask > allow evaluation order plus precedensja: managed deny jest nie do zdjecia.

### 9.4 allowManagedPermissionRulesOnly: true + user ma allow/ask/deny

Rezultat: **user permission rules sa odrzucone cicho**. Tylko managed rules wywieraja efekt [3]. User nie dostaje warninga ze jego `.claude/settings.json` ma nieaktywne klucze.

### 9.5 forceRemoteSettingsRefresh: true + network down

Rezultat: **CLI exit przy startupie** [19]:
> *"When this setting is active, the CLI blocks at startup until remote settings are freshly fetched. If the fetch fails, the CLI exits rather than proceeding without the policy. This setting self-perpetuates: once delivered from the server, it is also cached locally so that subsequent startups enforce the same behavior even before the first successful fetch of a new session."*

Antidote to "brief unenforced window" przy pierwszym uruchomieniu. Ale trade-off: jesli api.anthropic.com jest unreachable, nikt nie moze uruchomic Claude Code. Wymaga zeby network policies pozwalaly na `api.anthropic.com`.

### 9.6 Server-managed clear + cached file persists

Edge case na ktory explicite ostrzega Anthropic [2]:

> *"If you clear your server-managed configuration in the admin console with the intent of falling back to an endpoint-managed plist or registry policy, be aware that cached settings persist on client machines until the next successful fetch."*

Dlatego migracja odwrotna (server -> endpoint) tez musi byc flag-day albo wymuszona przez `/status` check u kazdego usera.

### 9.7 User z sudo na unmanaged device

Oficjalny limit [2]:
> *"Server-managed settings provide centralized policy enforcement, but they operate as a client-side control. On unmanaged devices, users with admin or sudo access can modify the Claude Code binary, filesystem, or network configuration."*

Tabela scenariuszy z docs pokazuje, ze tampering jest wykrywany przez nastepny fetch (tamper rollback), ale w oknie miedzy fetch-ami policy moze byc obchodzona. Dla hardcore enforcement - MDM + sandbox.

### 9.8 Non-interactive mode (-p) skipuje security approval

Important [2]:
> *"In non-interactive mode with the -p flag, Claude Code skips security dialogs and applies settings without user approval."*

To oznacza, ze CI runnery (z `-p`) beda applyowac settings bez interakcji - good dla automation, ale zaloga uniemozliwia "accept hooks" flow interactive. Planujac server-managed z hooks: rzadko kazdy user bedzie musial raz zatwierdzic.

---

## 10. Discovery by user

### 10.1 /status (primary)

Jedyny oficjalnie udokumentowany mechanizm [1]:

> *"Run /status inside Claude Code to see which settings sources are active and where they come from. The output shows each configuration layer (managed, user, project) along with its origin, such as Enterprise managed settings (remote), Enterprise managed settings (plist), Enterprise managed settings (HKLM), or Enterprise managed settings (file). If a settings file contains errors, /status reports the issue so you can fix it."*

Expected output per source type:
- `Enterprise managed settings (remote)` - server-managed z api.anthropic.com
- `Enterprise managed settings (plist)` - macOS managed preferences
- `Enterprise managed settings (HKLM)` - Windows Registry (machine-level)
- `Enterprise managed settings (HKCU)` - Windows Registry (user-level, najnizszy)
- `Enterprise managed settings (file)` - managed-settings.json

### 10.2 /permissions (do weryfikacji rules)

W docs [20]:
> *"You can also verify that managed permission rules are active by having a user run /permissions to view their effective permission rules."*

Pokazuje wszystkie permission rules i source settings.json file.

### 10.3 /doctor (partial)

Feature request #5563 [17] wskazuje, ze `/doctor` (obecnie istnieje w CLI ale jeszcze bez pelnego JSON error reporting) jest planowane do rozszerzenia. Na dzien dzisiejszy `/doctor` pokazuje health checks ale nie robi diff-u managed vs effective.

### 10.4 claude doctor (CLI, poza sesja)

Brak oficjalnej udokumentowanej komendy `claude doctor` stricte dla managed settings inspection (inaczej niz `/doctor` w interactive session). User opisany flow: `claude` uruchom interactive > `/status` > patrz "Setting sources".

### 10.5 Filesystem inspection (SRE / support)

```bash
# macOS
ls -la "/Library/Application Support/ClaudeCode/"
defaults read com.anthropic.claudecode 2>/dev/null
profiles list | grep -i claudecode

# Linux
ls -la /etc/claude-code/
test -f /etc/claude-code/managed-settings.json && cat /etc/claude-code/managed-settings.json

# Windows
Get-ChildItem "C:\Program Files\ClaudeCode" -ErrorAction SilentlyContinue
Get-ItemProperty HKLM:\SOFTWARE\Policies\ClaudeCode -ErrorAction SilentlyContinue
Get-ItemProperty HKCU:\SOFTWARE\Policies\ClaudeCode -ErrorAction SilentlyContinue
```

### 10.6 Verification post-deployment (oficjalny)

Z README MDM examples [4]:
> *"Before deploying to your fleet, test on a single machine and confirm /status lists the source under Setting sources - e.g. Enterprise managed settings (plist) on macOS or Enterprise managed settings (HKLM) on Windows."*

Standard QA loop:
1. Deploy to test machine
2. Restart Claude Code
3. `/status` -> weryfikuj source + brak errors
4. `/permissions` -> sprawdz effective rules
5. Dopiero potem broader rollout

---

## 11. Niejasne / gaps

Obszary gdzie oficjalna dokumentacja ma luki lub gdzie moje zrodla sa niepelne:

### 11.1 Invalid JSON behavior - niesolidny
Community issues [14][15][16][17][18] wskazuja na silent failure / crash variability. Oficjalne docs mowia tylko *"/status reports the issue"* [1] bez pelnej specyfikacji co sie dzieje gdy managed file jest invalid:
- Czy Claude Code startuje bez managed? (prawdopodobnie tak, bo other issues mowia o silent ignore)
- Czy user dostaje warning? (nie zawsze)
- Czy dzialaja drop-in files jesli base jest invalid? (nieudokumentowane)
- Jakie konkretnie error messages w /status? (nieudokumentowane)

**Flaguje jako research gap**. Zalecam pre-flight validation zamiast polegania na runtime error handling.

### 11.2 Kolejnosc drop-in files przy invalid file w srodku
Nieudokumentowane. Jesli `/etc/claude-code/managed-settings.d/20-security.json` jest invalid ale `10-...` i `30-...` sa OK - merging continues czy stopowane? Zrodla nie precyzuja.

### 11.3 Max size dla managed-settings.json
ADMX schema [8] podaje `maxLength="1000000"` (1MB) dla single-line JSON w Registry. Brak udokumentowanego limitu dla file-based. Teoretycznie moze byc duzy, ale dla server-managed wysylanego hourly wiecej = wieksza latencja.

### 11.4 Kolejnosc MDM w Windows (HKLM vs HKCU)
Docs mowia *"HKCU registry (Windows only) - najnizszy policy priority, only used when no admin-level source exists"* [1]. Ale co jesli admin-level source jest present ale pusty / invalid? Fallback na HKCU czy nie? Nieudokumentowane.

### 11.5 Rekomendowana rotacja dla apiKeyHelper
Docs pokazuje TTL 5 min default [11]. Brak oficjalnej rekomendacji dla compliance (Vault best practice to dynamic secrets z TTL 1h+). `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` pozwala dostroic, ale brak benchmarku kosztu network dla short TTL.

### 11.6 Brak oficjalnych templates dla Linux MDM
`examples/mdm/` zawiera macOS (plist/mobileconfig) i Windows (PowerShell/ADMX). Brak Linux templates. Puppet/Chef/Ansible snippet w sekcji 5.3 jest community-derived wzorzec, nie oficjalny od Anthropic.

### 11.7 Dokladna lista ktore settings sa "scalar" a ktore "array"
Docs wspominaja tylko przyklady (`allow`, `allowWrite`, `permissions.*`). Brak pelnej listy co jest mergowane a co nadpisywane. Moglo by byc uzyteczne do planowania drop-in structure.

### 11.8 Healthcare / Finance profiles
Zadne z przeszukanych zrodel (howtoharden.com, truefoundry.com, managed-settings.com, Reddit r/Jamf, r/Intune) **nie opublikowalo oficjalnych profili branzowych**. Profile w sekcji 6.3-6.4 to **konstrukcja R4** na podstawie udokumentowanych kluczy. Nie sa zvalidowane przez Anthropic, compliance team, ani audytora HIPAA/PCI. Treat as starting point, not compliant configuration.

### 11.9 Podpisy cyfrowe managed-settings.json
Brak mechanizmu. User z sudo moze edytowac `/etc/claude-code/managed-settings.json` - jedyny realny defense to OS-level file permissions (root:root 0644) + MDM tamper rollback. Dla audit-grade enforcement wymagana kombinacja MDM + `forceRemoteSettingsRefresh` + SELinux/AppArmor policy blockujaca modyfikacje.

### 11.10 Jamf-specyficzne community content
Reddit r/Jamf / r/Intune na 2026-04 nie ma szerokiej dyskusji wokol Claude Code specifically (jedyne deployment material to oficjalny Anthropic repo). Brak "production war stories" od innych admins - temat jest mlody.

### 11.11 Retencja cache po wylogowaniu / unenroll
Jesli user sie wyloguje z Claude for Enterprise, ile trwa invalidacja cached server-managed settings? Docs implikuja "next successful fetch" [2] ale konkretny scenariusz offboardingu (user odpala Claude Code bez zalogowania) - nieudokumentowany.

---

## 12. Bibliografia

- [1] Claude Code Settings (oficjalne docs), https://code.claude.com/docs/en/settings - sekcje "Settings files", "Available settings", "Settings precedence", "Verify active settings", "Permission settings", "Sandbox settings", "Hook configuration"
- [2] Configure server-managed settings (oficjalne docs), https://code.claude.com/docs/en/server-managed-settings - sekcje "Settings delivery", "Fetch and caching behavior", "Enforce fail-closed startup", "Security approval dialogs", "Security considerations", "Managed-only settings"
- [3] Configure permissions, Managed-only settings section, https://code.claude.com/docs/en/permissions#managed-only-settings - tabela wszystkich managed-only keys
- [4] anthropics/claude-code/examples/mdm/README.md, https://github.com/anthropics/claude-code/tree/main/examples/mdm - oficjalne README z tabela templates dla Jamf/Kandji/Intune/GPO
- [5] Configure permissions (oficjalne docs), https://code.claude.com/docs/en/permissions - sekcje "Settings precedence", "Permission rule syntax", "Bash permission limitations", "Managed settings"
- [6] anthropics/claude-code - macos/com.anthropic.claudecode.plist, https://github.com/anthropics/claude-code/blob/main/examples/mdm/macos/com.anthropic.claudecode.plist
- [7] anthropics/claude-code - macos/com.anthropic.claudecode.mobileconfig, https://github.com/anthropics/claude-code/blob/main/examples/mdm/macos/com.anthropic.claudecode.mobileconfig
- [8] anthropics/claude-code - windows/ClaudeCode.admx, https://github.com/anthropics/claude-code/blob/main/examples/mdm/windows/ClaudeCode.admx
- [9] anthropics/claude-code - windows/Set-ClaudeCodePolicy.ps1, https://github.com/anthropics/claude-code/blob/main/examples/mdm/windows/Set-ClaudeCodePolicy.ps1
- [10] TrueFoundry - Claude Code Governance: Building an Enterprise Usage Policy from Scratch, https://www.truefoundry.com/blog/claude-code-governance-building-an-enterprise-usage-policy-from-scratch - baseline managed-settings.json examples
- [11] Claude Code Authentication (oficjalne docs), https://code.claude.com/docs/en/authentication - sekcja "Credential management", "Authentication precedence", apiKeyHelper behavior
- [12] Automate workflows with hooks (oficjalne docs), https://code.claude.com/docs/en/hooks-guide - SessionStart, SessionEnd, PreToolUse, PostToolUse, ConfigChange hook events
- [13] Claude Code Hooks Implementation Guide: Audit System, Rick Hightower / Medium, https://medium.com/@richardhightower/claude-code-hooks-implementation-guide-audit-system-03763748700f
- [14] GitHub anthropics/claude-code #1506 - Invalid JSON Configuration Causing Startup Crash, https://github.com/anthropics/claude-code/issues/1506
- [15] GitHub anthropics/claude-code #2835 - Silent Failure on Malformed JSON .claude/settings.json, https://github.com/anthropics/claude-code/issues/2835
- [16] GitHub anthropics/claude-code #24823 - [FEATURE] settings.json fails silently if malformed, https://github.com/anthropics/claude-code/issues/24823
- [17] GitHub anthropics/claude-code #5563 - Feature Request: Enhance /doctor to show specific JSON parsing errors, https://github.com/anthropics/claude-code/issues/5563
- [18] GitHub anthropics/claude-code #18809 - [BUG] cowork error "CLI output was not valid JSON", https://github.com/anthropics/claude-code/issues/18809
- [19] Server-managed settings - Enforce fail-closed startup section, https://code.claude.com/docs/en/server-managed-settings#enforce-fail-closed-startup
- [20] Configure server-managed settings - Verify settings delivery section, https://code.claude.com/docs/en/server-managed-settings
- Howtoharden - Anthropic Claude Hardening Guide, https://howtoharden.com/guides/anthropic-claude/ - L1/L2/L3 hardening profiles, deny rule baselines
- Managed-settings.com - Claude Code managed-settings.json Ultimate Guide, https://managed-settings.com/ - community file paths reference (note: podaje deprecated `C:\ProgramData\ClaudeCode` path)
- Claude Help Center - Enterprise configuration, https://support.claude.com/en/articles/12622667-enterprise-configuration
