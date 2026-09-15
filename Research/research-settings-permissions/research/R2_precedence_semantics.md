---
id: R2
title: Precedence Semantics - 5-Layer Merge Model
author: Researcher R2 (Opus 4.7)
campaign: Claude Code Settings + Permissions 2026
date: 2026-04-17
target_length: 3000-4500 words
status: DRAFT
primary_sources:
  - "https://code.claude.com/docs/en/settings"
  - "https://code.claude.com/docs/en/permissions"
  - "https://code.claude.com/docs/en/hooks"
  - "https://code.claude.com/docs/en/mcp"
  - "https://code.claude.com/docs/en/authentication"
  - "https://github.com/anthropics/claude-code/issues/17017"
  - "https://github.com/anthropics/claude-code/issues/17299"
  - "https://github.com/anthropics/claude-code/issues/24657"
  - "https://github.com/anthropics/claude-code/issues/2835"
  - "https://blog.vincentqiao.com/en/posts/claude-code-settings-intro/"
  - "https://blog.vincentqiao.com/en/posts/claude-code-settings-permissions/"
citations_format: "R2.C<n>"
---

# R2: Precedence Semantics - 5-Layer Merge Model

## 1. Abstract

Claude Code ustawia konfiguracje w piecio-warstwowej hierarchii, gdzie kazda warstwa ma rozne prawa, rozne mechanizmy dostarczania i rozne miejsca przechowywania. W 2026 roku oficjalna dokumentacja (docs.claude.com/en/docs/claude-code/settings, sekcja "Settings precedence") definiuje porzadek od najwyzszego do najnizszego priorytetu: **Managed > Command-line arguments > Local project (`.claude/settings.local.json`) > Shared project (`.claude/settings.json`) > User (`~/.claude/settings.json`)**. Kluczowa zasada, powtarzana trzy razy w aktualnych docs: "If a tool is denied at any level, no other level can allow it" (R2.C1).

Semantyka merge nie jest jednolita. Dla **scalarow** (stringi, boole, liczby) wyzsza warstwa nadpisuje w calosci. Dla **obiektow** stosowany jest deep-merge, ale istnieja udokumentowane wyjatki ktore w praktyce dzialaja jak **replace** (np. `mcpServers` cross-scope - GitHub #17299, R2.C2). Dla **tablic** zasada oficjalna brzmi: "arrays are concatenated and deduplicated, not replaced" (R2.C3) - ale ta zasada nie obowiazuje jednakowo wszystkich tablic, co pokazuja dwa zamkniete issue GitHub (#17017 permissions, #17299 mcpServers) opisujace replace zamiast merge.

Warstwa Managed wprowadza siedem "managed-only" flag blokujacych (`allowManagedHooksOnly`, `allowManagedMcpServersOnly`, `allowManagedPermissionRulesOnly`, `sandbox.filesystem.allowManagedReadPathsOnly`, `sandbox.network.allowManagedDomainsOnly`, `forceRemoteSettingsRefresh`, `channelsEnabled` i inne) ktore przelaczaja zachowanie niektorych pol z "merge across scopes" na "tylko managed liczy" (R2.C4). Blad skladni JSON na jednej warstwie powoduje **ciche pominiecie** tej warstwy bez crashu calego CLI (GitHub #2835, R2.C5), co stanowi znaczace operacyjne ryzyko przy deploy. `settings.local.json` **nie jest deprecated** w kwietniu 2026 - zarowno aktualne docs jak i zglaszane issue (np. #41259 z 2026) potwierdzaja aktywny status tej warstwy.

W tym raporcie rozkladam semantyke warstwa po warstwie, podaje tabele porownawcza typow merge, rozwiazuje siedem scenariuszy konfliktu oraz mapuje niespojnosci miedzy oficjalnymi docs a zachowaniem zglaszanym przez spolecznosc.

---

## 2. Piec warstw w kolejnosci ladowania

Oficjalna dokumentacja (settings page, sekcja "Settings precedence") wylicza hierarchie **od najwyzszego do najnizszego priorytetu** dokladnie tak (R2.C1):

```
1. Managed settings          (server-managed / MDM / plik managed-settings.json / rejestr)
2. Command line arguments    (--settings, --allowedTools, --permission-mode, env overrides)
3. Local project settings    (.claude/settings.local.json)    [gitignored]
4. Shared project settings   (.claude/settings.json)           [committed]
5. User settings             (~/.claude/settings.json)         [global]
```

### 2.1 Warstwa Managed (najwyzsza)

Dokumentacja opisuje cztery tryby dostarczenia Managed, ale **tylko jeden z nich jest aktywny naraz** (R2.C6, sekcja "Settings precedence" -> "Within the managed tier"):

> "Within the managed tier, precedence is: server-managed > MDM/OS-level policies > file-based (`managed-settings.d/*.json` + `managed-settings.json`) > HKCU registry (Windows only). **Only one managed source is used; sources do not merge across tiers.** Within the file-based tier, drop-in files and the base file are merged together."

To **krytyczne** odkrycie: Managed nie jest "gigantyczna merged masa z wszystkich kanalow dostarczenia" - jest **pierwsza warstwa z jakiegokolwiek kanalu ktora istnieje**. Jesli organizacja ma server-managed settings (Claude.ai admin console), wszystkie MDM plist/rejestr/plik sa **ignorowane calkowicie**.

Wewnatrz warstwy file-based dziala drugi, niezalezny merge (konwencja systemd):

> "Following the systemd convention, `managed-settings.json` is merged first as the base, then all `*.json` files in the drop-in directory are sorted alphabetically and merged on top. Later files override earlier ones for scalar values; arrays are concatenated and de-duplicated; objects are deep-merged. Hidden files starting with `.` are ignored." (R2.C7)

Zaleta: dwa zespoly (security + telemetry) moga mietc niezalezne pliki `10-telemetry.json` i `20-security.json` bez konfliktu commitowego.

Lokalizacje pliku managed per OS (R2.C8):
- **macOS:** `/Library/Application Support/ClaudeCode/`
- **Linux/WSL:** `/etc/claude-code/`
- **Windows:** `C:\Program Files\ClaudeCode\` (UWAGA: legacy `C:\ProgramData\ClaudeCode\` **nie jest juz wspierany od v2.1.75**, wymagana migracja)

### 2.2 Warstwa CLI arguments (temporary overrides)

Druga w kolejnosci - CLI flags nadpisuja wszystko ponizej, ale **nie nadpisuja Managed**. Oficjalne sformulowanie (permissions doc, sekcja "Settings precedence", R2.C9):

> "Managed settings cannot be overridden by any other level, including command line arguments."

W praktyce oznacza to: jesli Managed ma `"permissions": { "deny": ["WebFetch"] }`, to `--allowedTools WebFetch` **nie odblokuje** WebFetch. Ale:

> "`--disallowedTools` can add restrictions beyond what managed settings define."

Czyli CLI dziala additively dla `deny`, ale nie moze osłabic `deny` z Managed.

Flagi env var (`ANTHROPIC_MODEL`, `ANTHROPIC_API_KEY`, `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS`) maja wlasna precedence "precedence chains" opisane w osobnych sekcjach docs (np. auth precedence, R2.C10) i **nie sa zlewaj­a­ne z settings precedence** w sposób prosty - to odrębny system ktory czasem ma własne hierarchie (np. `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` env var "takes precedence over" setting `includeGitInstructions`).

### 2.3 Warstwa Local project (`.claude/settings.local.json`)

Jest to plik per-project, **automatycznie dodawany do .gitignore** przy stworzeniu (R2.C11, sekcja "Settings files"):

> ".claude/settings.local.json for settings that are not checked in, useful for personal preferences and experimentation. Claude Code will configure git to ignore `.claude/settings.local.json` when it is created."

**Status deprecation w 2026:** NIE jest deprecated. Aktywne dowody:
- Docs z 2026 explicite opisuja Local jako warstwe nr 3 (R2.C1)
- Feature `autoMode` klasifikator czyta z `settings.local.json` explicitely (permissions doc, R2.C12): "The classifier reads `autoMode` from user settings, `.claude/settings.local.json`, and managed settings. It does not read from shared project settings in `.claude/settings.json`, because a checked-in repo could otherwise inject its own allow rules."
- Otwarte issue z 2026 (#41259 "Permissions in settings.local.json not respected after Edit tool modifies the file", #24657, #17017) implikuja aktywne uzycie, bo zgloszenia bugfixowe sa skladane pod aktywnym kodem

Lokalne ma jednak niespojnosci operacyjne: issue #16301 opisuje jak Claude Code zapisuje **invalid entries** do `settings.local.json` przy "Yes, dont ask again" (R2.C13), co powoduje silent skip calej warstwy przy nastepnym starcie.

### 2.4 Warstwa Shared project (`.claude/settings.json`)

Commit­owana, shared z zespołem. Wiele pol jest swiadomie **nieczytanych** z tej warstwy ze wzgledow bezpieczenstwa (R2.C14):

- `autoMemoryDirectory` - "Not accepted in project settings (`.claude/settings.json`) to prevent shared repos from redirecting memory writes to sensitive locations"
- `autoMode` - "Not read from shared project settings" (anti-injection)
- `skipDangerousModePermissionPrompt` - "Ignored when set in project settings (`.claude/settings.json`) to prevent untrusted repositories from auto-bypassing the prompt"
- `useAutoModeDuringPlan` - "Not read from shared project settings"

To **anti-TOCTOU pattern** (Time-Of-Check/Time-Of-Use): untrusted repo moglby zinjektowac zlosliwe ustawienie przy cloning. Autorzy Claude Code nie traktuja shared project jako trusted source dla pol bezpieczenstwa.

### 2.5 Warstwa User (`~/.claude/settings.json`)

Najnizsza, personalna warstwa globalna. Podstawa wszystkich preferencji, ktora jest nadpisywana przez wszystkie wyzsze.

Wazny niuans: osobny plik `~/.claude.json` **NIE jest** settings file - jest storage dla "other configuration" (R2.C15):

> "Other configuration is stored in `~/.claude.json`. This file contains your preferences (theme, notification settings, editor mode), OAuth session, MCP server configurations for user and local scopes, per-project state (allowed tools, trust settings), and various caches."

Oznacza to ze **niektore pola merge'owane nie przechodza przez settings.json w ogole** - np. subkonfiguracja MCP per-project siedzi w `~/.claude.json[projects][/path]` i nie podlega merge precedence. To jest zrodlo bug'a #24657 (`enabledMcpjsonServers` ignorowany z `settings.local.json`).

---

## 3. Algorytm merge per typ pola

Oficjalna zasada (settings page, sekcja "Settings precedence", Note block, R2.C3):

> "**Array settings merge across scopes.** When the same array-valued setting (such as `sandbox.filesystem.allowWrite` or `permissions.allow`) appears in multiple scopes, the arrays are **concatenated and deduplicated**, not replaced. This means lower-priority scopes can add entries without overriding those set by higher-priority scopes, and vice versa. For example, if managed settings set `allowWrite` to `["/opt/company-tools"]` and a user adds `["~/.kube"]`, both paths are included in the final configuration."

Dla managed-settings.d drop-in (R2.C7):

> "Later files override earlier ones for scalar values; arrays are concatenated and de-duplicated; objects are deep-merged."

Zlozenie tych dwoch cytatow + obserwowane zachowanie z issue #17017 i #17299 daje tabele:

### Tabela 3.1: Merge semantics per typ pola

| Typ pola | Oczekiwane zachowanie (docs) | Zachowanie rzeczywiste | Zrodlo |
|----------|------------------------------|------------------------|--------|
| **Scalar** (string, bool, number) | Wyzsza warstwa nadpisuje | Zgodne z docs | R2.C1 |
| **Object** (top-level, np. `permissions`) | Deep merge | **Zgodne dla pol primitive wewnatrz**, ale sub-obiekty zlozone (`mcpServers`) czasem REPLACE | R2.C2 (#17299) |
| **Object** (`env`, `spinnerVerbs`) | Deep merge (implikowane) | Deep merge - scalars merge per-klucz | R2.C7 |
| **Array** (`permissions.allow`, `hooks`) | Concat + dedup | **Zgodne dla `allowWrite`, ale #17017 opisuje project REPLACE dla `permissions.allow`** | R2.C3, R2.C16 |
| **Array** (`additionalDirectories`) | Concat | Concat potwierdzony w niezaleznym zrodle | R2.C17 (Vincent Qiao Part 2) |
| **Array** (`enabledMcpjsonServers`) | Concat (docs) | W praktyce **ignorowany** z settings.local.json, odczyt z `~/.claude.json` | R2.C18 (#24657) |
| **Tool deny (cross-scope)** | Deny wygrywa zawsze, additively | Zgodne (bardzo silnie udokumentowane) | R2.C19 |
| **Managed-only fields** | Nadpisuja warstwy nizsze, blokuja merge | Zgodne (co jest istota "locked") | R2.C4 |

### 3.2 Object deep merge - przyklad praktyczny

Dla pola `env` (top-level, znane zeby byc deep merge):

```json
// ~/.claude/settings.json (User)
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_SERVICE_NAME": "claude-user"
  }
}

// .claude/settings.json (Project)
{
  "env": {
    "OTEL_SERVICE_NAME": "claude-project-acme",
    "NODE_ENV": "development"
  }
}

// Merged (wynik efektywny):
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_SERVICE_NAME": "claude-project-acme",  // project scalar wygral
    "NODE_ENV": "development"                     // dodane z project
  }
}
```

Kazdy **klucz wewnatrz `env`** jest traktowany osobno: jesli oba scopes definiuja ten sam klucz, wyzszy scope nadpisuje tylko ten klucz, pozostawiajac pozostale z nizszego scope.

### 3.3 Array concat + dedup - przyklad praktyczny

```json
// Managed: { "permissions": { "allow": ["Bash(ls *)", "Bash(cat *)"] } }
// User:    { "permissions": { "allow": ["Read(~/.zshrc)", "Bash(ls *)"] } }
// Project: { "permissions": { "allow": ["Bash(npm run *)"] } }

// Efektywna lista (concat + dedup):
[
  "Bash(ls *)",       // z Managed i User - jedno entry po dedup
  "Bash(cat *)",      // z Managed
  "Read(~/.zshrc)",   // z User
  "Bash(npm run *)"   // z Project
]
```

Dedup dziala na poziomie **string equality**, co oznacza ze `Bash(ls *)` i `Bash(ls:*)` beda traktowane jako **rozne entries**, mimo ze wg dokumentacji wzorce sa ekwiwalentne (R2.C20): "The `:*` suffix is an equivalent way to write a trailing wildcard, so `Bash(ls:*)` matches the same commands as `Bash(ls *)`." To nie powoduje buga (oba matchuja te same komendy), ale tworzy redundancje w debug output `/permissions`.

### 3.4 Non-mergeable fields

Pola ktore **nie sa mergowane - zawsze wygrywa najwyzszy scope calosciowym replace**:

- Managed-only fields (patrz sekcja 4)
- Fields z explicit "Not read from shared project settings" (`autoMode`, `autoMemoryDirectory`, `useAutoModeDuringPlan`, `skipDangerousModePermissionPrompt`) - te pola sa **pomijane** na shared project i czytane tylko z User / Local / Managed
- `includeCoAuthoredBy` - oficjalnie deprecated na rzecz `attribution` (R2.C21)
- `mcpServers` (top-level, top-of-config) - `.mcp.json` project overrides `~/.claude.json` user WHEN defined (issue #17299 - replace, nie merge)

---

## 4. Locked fields (Managed override scenarios)

Docs w sekcji "Managed-only settings" (permissions page, R2.C4) wylicza **11 pol ktore sa czytane wylacznie z Managed**:

### Tabela 4.1: Managed-only settings

| Setting | Behavior gdy set w non-managed | Efekt w Managed |
|---------|-------------------------------|-----------------|
| `allowedChannelPlugins` | Ignorowane | Replaces Anthropic allowlist; `[]` = block all |
| `allowManagedHooksOnly` | Ignorowane | Blokuje user/project/plugin hooks (patrz sekcja 7) |
| `allowManagedMcpServersOnly` | Ignorowane | Tylko managed `allowedMcpServers` liczy; `deniedMcpServers` nadal merge |
| `allowManagedPermissionRulesOnly` | Ignorowane | User/project `allow/ask/deny` **caly ignorowane**; tylko Managed rules apply |
| `blockedMarketplaces` | Ignorowane | Blocklist plugin marketplaces (przed downloadem) |
| `channelsEnabled` | Ignorowane | Wymagane =`true` dla channel messaging |
| `forceRemoteSettingsRefresh` | Ignorowane | Blokuje startup do freshly fetched settings |
| `pluginTrustMessage` | Ignorowane | Dodaje msg do plugin trust warning |
| `sandbox.filesystem.allowManagedReadPathsOnly` | Ignorowane | Tylko managed `allowRead` paths liczy; `denyRead` merge |
| `sandbox.network.allowManagedDomainsOnly` | Ignorowane | Tylko managed `allowedDomains` i `WebFetch(domain:...)` allow liczy |
| `strictKnownMarketplaces` | Ignorowane | Allowlist plugin marketplaces; `[]` = lockdown |

### 4.1 Asymetria "allowManagedXOnly" flagi

Zauwaz wzorzec dla trzech "managed-only-X-only" flag (hooks, mcpServers, permissions, read paths, domains): **tylko ALLOW side jest zamykana, DENY side zawsze merguje z wszystkich warstw**. Cytat z `allowManagedMcpServersOnly` (R2.C22):

> "When `true`, only `allowedMcpServers` from managed settings are respected. `deniedMcpServers` still merges from all sources."

Dlaczego? Bo deny-side to "mniej mocy" - user/project moze sobie dodac wiecej restrykcji, nie mniej. IT admin ktory zamknie allowlist nie chce blokowac user'a przed dodaniem wlasnych deny'ow.

### 4.2 disableBypassPermissionsMode - quirky hybryda

Pole to **nie jest managed-only** wg tabeli (R2.C23):

> "`disableBypassPermissionsMode` is typically placed in managed settings to enforce organizational policy, but it works from any scope. A user can set it in their own settings to lock themselves out of bypass mode."

Czyli mozna uzyc go jako self-imposed ograniczenie, nie tylko jako IT policy.

### 4.3 Co sie dzieje gdy Managed blokuje pole a User ma jego wersje

**Scenariusz A: Managed ma `disableBypassPermissionsMode: "disable"`, User ustawia `permissions.defaultMode: "bypassPermissions"`.**
- Startup: Claude Code odczytuje Managed najpierw. Flaga mowi `disable`.
- Startup: przetwarza User. Widzi `bypassPermissions` jako default mode.
- Walidacja: Managed flag rejects `--dangerously-skip-permissions` i `defaultMode: "bypassPermissions"` at startup (R2.C24 z setting description).
- Efekt: User dostaje error przy probie bypass, pozostaje przy default mode.

**Scenariusz B: Managed ma `allowManagedPermissionRulesOnly: true` z pustym `allow: []` i `deny: []`, User ma w settings `allow: [Bash]`.**
- User'a rules sa **silently ignored** (R2.C25): "prevent user and project settings from defining allow, ask, or deny permission rules. Only rules in managed settings apply".
- Efekt: kazde Bash command dostaje default permission prompt (bo Managed nie zdefiniowala zadnego allow). Efektywnie "allow-only nothing" - sesja nieuzywalna dla Bash.

Ten drugi scenariusz stanowi **foot-gun dla IT admin**: ustawiajac `allowManagedPermissionRulesOnly: true` trzeba zdefiniowac KOMPLETNY zestaw `allow`/`ask`/`deny` w Managed, bo user'a zadna nie bedzie moc nadpisac.

---

## 5. Przyklady konfliktow i rozwiazan

### Konflikt #1: Project deny vs User allow (klasyk)

**Setup:**
```json
// ~/.claude/settings.json
{ "permissions": { "allow": ["Bash(npm run *)"] } }

// .claude/settings.json (project)
{ "permissions": { "deny": ["Bash(npm run *)"] } }
```

**Rozwiazanie:** Project `deny` wygrywa. Oficjalne sformulowanie (R2.C26): "If a permission is allowed in user settings but denied in project settings, the project setting takes precedence and the permission is blocked." Pod spodem dziala dwojaka zasada: (1) Project > User w precedence, (2) `deny > ask > allow` w rule evaluation.

**Efekt:** `npm run *` zawsze blokowane w tym projekcie.

### Konflikt #2: Managed allow vs Project deny

**Setup:**
```json
// managed-settings.json
{ "permissions": { "allow": ["Bash(kubectl *)"] } }

// .claude/settings.json
{ "permissions": { "deny": ["Bash(kubectl *)"] } }
```

**Rozwiazanie:** Managed `allow` zostaje w merged allow list, Project `deny` zostaje w merged deny list. **Deny wygrywa** zgodnie z rule evaluation order (`deny > ask > allow`). Cytat (R2.C27): "If a tool is denied at any level, no other level can allow it."

**Efekt:** Mimo ze admin myslal ze whitelistuje kubectl, project moze sobie blokowac. Jesli IT chce zapewnic, ze kubectl **musi** byc dostepny - musi uzyc `allowManagedPermissionRulesOnly: true`.

### Konflikt #3: User env var vs Project env var (deep merge)

**Setup:**
```json
// ~/.claude/settings.json
{ "env": { "FOO": "user_value", "BAR": "from_user" } }

// .claude/settings.json
{ "env": { "FOO": "project_value", "BAZ": "from_project" } }
```

**Rozwiazanie:** Deep merge kluczy wewnatrz `env`:
```json
{
  "env": {
    "FOO": "project_value",   // project wins for this key
    "BAR": "from_user",        // only in user, kept
    "BAZ": "from_project"      // only in project, added
  }
}
```

### Konflikt #4: mcpServers project REPLACE (BUG #17299)

**Setup:**
```json
// ~/.claude/settings.json
{ "mcpServers": { "cloudflare-dns": { "command": "npx", "args": [...] } } }

// .claude/settings.json
{ "mcpServers": { "project-server": { "command": "uv", "args": [...] } } }
```

**Oczekiwanie (na bazie zasady deep merge object):**
Merged: `{ "cloudflare-dns": {...}, "project-server": {...} }`

**Rzeczywistosc (R2.C2 issue #17299):**
Merged: `{ "project-server": {...} }` - `cloudflare-dns` zniknal.

**Rozwiazanie:** Issue zamkniete jako duplicate (nie naprawione). Workaround: duplikowac globalne MCP servers w kazdym projekcie.

**Uwaga:** Mozliwe ze `mcpServers` w settings.json jest odczytywany innym path-em niz standardowy deep-merge kod. Docs wskazuja ze MCP user-scope configs siedza w `~/.claude.json`, a project-scope w `.mcp.json` - czyli top-level `mcpServers` w settings.json moze byc historycznym relics ktore dziala "replace-style" bo nie przeszedl migracji na nowy merge engine.

### Konflikt #5: allowManagedMcpServersOnly + user tries deny

**Setup:**
```json
// managed-settings.json
{
  "allowManagedMcpServersOnly": true,
  "allowedMcpServers": [{ "serverName": "github" }]
}

// ~/.claude/settings.json
{ "deniedMcpServers": [{ "serverName": "github" }] }
```

**Rozwiazanie:** User's `deniedMcpServers` **merguje z managed**, bo cytat (R2.C22): "deniedMcpServers still merges from all sources". Denylist takes absolute precedence (R2.C28 z MCP doc): "If a server matches a denylist entry (by name, command, or URL), it will be blocked even if it's on the allowlist."

**Efekt:** `github` jest zablokowany pomimo managed-only-allow. User moze dodawac deny nawet przy managed lockdown.

### Konflikt #6: additionalDirectories additive merge

**Setup:**
```json
// ~/.claude/settings.json
{ "permissions": { "additionalDirectories": ["~/work/lib"] } }

// .claude/settings.json
{ "permissions": { "additionalDirectories": ["../docs"] } }

// managed-settings.json
{ "permissions": { "additionalDirectories": ["/opt/shared-tools"] } }
```

**Rozwiazanie:** Concat + dedup (R2.C17, Vincent Qiao Part 2):
```json
["~/work/lib", "../docs", "/opt/shared-tools"]
```

Wszystkie trzy katalogi sa dostepne. Additive, nie replace - to zgodne z zasada "lower-priority scopes can add entries without overriding" (R2.C3).

### Konflikt #7: Hook conflict z allowManagedHooksOnly

**Setup:**
```json
// managed-settings.json
{
  "allowManagedHooksOnly": true,
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash(rm *)",
      "hooks": [{ "type": "command", "command": "/opt/guard/block-rm.sh" }]
    }]
  }
}

// ~/.claude/settings.json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{ "type": "command", "command": "~/my-pre-bash.sh" }]
    }]
  }
}
```

**Rozwiazanie:** `allowManagedHooksOnly: true` oznacza ze tylko managed hooks + SDK hooks + hooks z plugin'ow force-enabled w managed `enabledPlugins` sa ladowane (R2.C29). User hook jest **silent skip** (zablokowany, brak komunikatu).

**Efekt:** Przed kazda komenda `rm` uruchamia sie `/opt/guard/block-rm.sh`, ale user's `~/my-pre-bash.sh` jest ignorowane.

**Wyjatek do dedup:** docs wspominaja (R2.C30): "All matching hooks run in parallel, and identical handlers are deduplicated automatically. Command hooks are deduplicated by command string, and HTTP hooks are deduplicated by URL." Czyli jesli user ma `command: "/opt/guard/block-rm.sh"` (ten sam co managed), dedup usuwa jeden egzemplarz.

---

## 6. Edge cases

### 6.1 Invalid JSON na warstwie

GitHub issue #2835 (zamkniete jako duplicate, R2.C5) opisuje najbardziej niepokojaca wlasciwosc: **silent skip malformed layer**.

Co sie dzieje:
1. Claude Code probuje parsowac warstwe X.
2. JSON.parse rzuca wyjatek (dangling comma, missing brace, non-UTF8).
3. Claude Code **nie wywala stack trace'u**, nie ma warnu z `--debug`.
4. Layer X jest **pominiete calosciowo**, jakby plik nie istnial.
5. Setup dziala z pozostalymi warstwami.

Konsekwencja operacyjna: **IT admin nie zauwaza ze jego managed settings nie sa aplikowane** dopoki nie uruchomi `/doctor` (ktore wg issue #5563 pokazuje tylko generyczne "Invalid or malformed JSON" bez konkretnej linii).

Dokument "Verify active settings" (settings page, R2.C31) potwierdza: "If a settings file contains errors, `/status` reports the issue so you can fix it." - Czyli dopiero `/status` (nie startup) powie o bladzie. Oznacza to ze script'y CI (non-interactive `-p`) **nie zglosza bledu** i beda dzialaly z niezaaplikowanymi settingami.

**Workaround:** Zawsze walidowac settings.json przed commitem przez JSON schema (oficjalne: `https://json.schemastore.org/claude-code-settings.json` - R2.C32) lub pre-commit hook `jq empty settings.json`.

### 6.2 settings.local.json deprecated?

**Status 2026: AKTYWNY, nie deprecated.** Dowody:

- Aktualny docs (R2.C11): "`.claude/settings.local.json` for settings that are not checked in, useful for personal preferences and experimentation."
- autoMode explicitely czytany z settings.local.json (R2.C12)
- Permission precedence lista nadal wymienia Local jako layer 3 (R2.C1)
- Aktywne issue 2026 (#41259, #24657, #16301) - code sciezki nadal istnieja

**Quirk:** Issue #41259 zglasza ze **Edit tool modyfikujacy settings.local.json w trakcie sesji powoduje pomijanie tego pliku do konca sesji**. To re-read-after-write bug, a nie deprecation.

### 6.3 settings.local.json silent invalid entries

Issue #16301 (R2.C13) opisuje: gdy user klika "Yes, don't ask again" dla Bash command, Claude Code **pisze do `settings.local.json`** entry w formacie ktory czasem jest syntactically ok ale semantically invalid. Przyklad: zapisuje regex-style patterns ktore nie sa w format permission rule'a. Pozniejsze sesje skipuja ta regule przy walidacji (docs "Invalid permission rules don't invalidate the whole file" - R2.C33) ale user nie wie ze jego "don't ask again" nie zadziala.

### 6.4 Non-mergeable nested fields

Pole `mcpServers.<name>.env` - czy jest deep merge czy replace? Docs nie odpowiadaja explicitely, ale logika struktury sugeruje: **replace** (bo caly server config zostaje replaced przy konflikcie cross-scope, wg #17299).

**Eksperyment community** (R2.C34 via search results): "For the `env` field within mcpServers, environment variables merge with your shell environment, with settings.json values taking precedence over inherited variables." To mowi o merge **shell env** z **settings env**, nie o cross-scope merge. Czyli: w ramach jednej warstwy `env` jest aplied przez deep-merge-over-shell, ale cross-scope `mcpServers.X.env` podlega replace semantyce calego servera.

### 6.5 Order dependency w managed-settings.d

Jesli dwa drop-in files maja konflikujace scalars, **alphabetical order + "later wins"** decyduje (R2.C7). Problem: firma `acme` i zespol `security` moga rywalizowac o kolejnosc prefixow.

**Best practice:** Uzyc prefixów `10-`, `20-`, `30-` podobnie jak systemd. Zespol security niech trzyma `50-security-hardening.json`, telemetry `10-telemetry.json`, compliance `90-compliance-lockdown.json` - zeby compliance nadpisala wszystko.

### 6.6 Deduplication scope boundary

Dedup dla arrays dziala **cross-scope** (R2.C3): "arrays are concatenated and deduplicated" obejmuje wszystkie warstwy. To znaczy ze jesli Managed i User oba dodaja `Bash(ls *)`, final array ma tylko jedno entry.

**Ale:** dedup nie dziala **intra-file** w sposob glebszy niz string equality. `Bash(ls *)` i `Bash(ls:*)` to dwa rozne entries mimo semantycznej ekwiwalencji (R2.C20).

---

## 7. Precedence vs hooks specifically

Hooks sa specjalnym przypadkiem bo maja strukture 3-poziomowa (event -> matcher -> handler), ktora komplikuje merge.

### 7.1 Struktura hooks

Z docs (R2.C35):
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "if": "Bash(rm *)", "command": "..." }
        ]
      }
    ]
  }
}
```

Trzy poziomy:
1. **Event key** (`PreToolUse`, `PostToolUse`, `Stop`, `PermissionDenied`, etc.)
2. **Matcher array** - wpisy z `matcher` pattern i `hooks` sub-array
3. **Hook handler array** - wpisy z `type` (command/http/prompt/agent)

### 7.2 Hooks merge - zasada oficjalna vs praktyczna

Official docs (R2.C3) mowia "arrays merge across scopes" dla `hooks` array. W praktyce oznacza to:

- **Top-level**: `hooks.PreToolUse` z User + Project + Managed -> concat (wszystkie matchery z wszystkich warstw)
- **Drugi poziom** (matcher array): nie merge per matcher - kazdy wpis matcher idzie do concatowanej listy
- **Dedup** (R2.C30): "identical handlers are deduplicated automatically. Command hooks are deduplicated by command string, and HTTP hooks are deduplicated by URL"

Efekt: jesli User i Project oba maja `PreToolUse` matcher `Bash` z roznymi commandami, oba odpala sie parallel. Dedup kasuje tylko duplikaty command stringami.

### 7.3 Execution order

Docs explicitely mowia (R2.C30): "All matching hooks run in parallel". Nie ma deterministycznego ordering - wszystko leci rownolegle.

Precedence dotyczy **decyzji** (decision outcome), nie kolejnosci odpalenia. Dla PreToolUse: `deny > defer > ask > allow` (R2.C36 z docs.hooks).

### 7.4 allowManagedHooksOnly - special override

Gdy Managed ma `allowManagedHooksOnly: true`, zwykly merge NIE dziala. Zamiast tego:
- Managed hooks: ladowane
- SDK hooks: ladowane
- Plugin hooks z `enabledPlugins` force-enabled w Managed: ladowane (identyfikowane pelnym `plugin@marketplace` ID)
- User + Project + innemu plugin hooks: **silent skip**

Plus szczegolna zasada dla `disableAllHooks` (R2.C37): "The `disableAllHooks` setting respects the managed settings hierarchy. If an administrator has configured hooks through managed policy settings, `disableAllHooks` set in user, project, or local settings cannot disable those managed hooks. **Only `disableAllHooks` set at the managed settings level can disable managed hooks.**"

Czyli `disableAllHooks` jest **scope-aware**: user's `true` wylacza user's hooks, ale managed hooks kontynuuja dzialanie.

---

## 8. Niezidentyfikowane / niejasne (dla CRITIC)

Spis kwestii ktore raport nie moze jednoznacznie rozstrzygnac z dostepnych zrodel i wymagaja empiric testing lub glebszego issue scraping:

### 8.1 mcpServers top-level vs per-scope

Niespojnosc: docs "Settings files" table pokazuje MCP servers location jako `~/.claude.json` (user) + `.mcp.json` (project) + `~/.claude.json` per-project (local), ale settings page pokazuje `mcpServers` jako valid top-level key w `settings.json`. **Ktore jest kanoniczne?** Issue #17299 sugeruje ze `mcpServers` w `settings.json` dziala "replace-style" - ale nie wiadomo czy to bug czy deliberate legacy pass-through.

**Propozycja dla CRITIC:** Zweryfikowac czy `mcpServers` w `settings.json` jest deprecated path czy aktywny.

### 8.2 `env` top-level deep merge - nie udokumentowane

Docs nigdzie wprost nie mowia ze `env` jest deep merge'owany. Wyciagnalem to z:
- Analogicznej zasady dla managed-settings.d ("objects are deep-merged")
- Community cytatu o env merge z shell environment
- Logiki UI (settings env ma byc rozszerzony o project-specific)

**Propozycja dla CRITIC:** Zamowic empirical test - ustawic `env.FOO` w User i `env.BAR` w Project, sprawdzic czy oba widoczne w spawned subprocess.

### 8.3 permissions.allow merge - #17017 vs docs

Issue #17017 zglasza REPLACE zamiast MERGE dla `permissions.allow`. Docs (R2.C3) i Vincent Qiao explicite mowia MERGE. Issue jest **otwarte** (nie closed). **Czy to bug Claude Code vs docs, czy user mial niewlasciwy file path (settings.local.json vs settings.json)?**

**Propozycja dla CRITIC:** Sprawdzic czy #17017 dotyczy `.claude/settings.local.json` (ktory ma bug #41259 post-Edit) czy `.claude/settings.json`. Moze roznica jest tam.

### 8.4 `--settings <path or JSON>` jako 5. kanał CLI

Vincent Qiao Part 1 wymienia `--settings` jako CLI flag nadpisujacy wszystko (R2.C38), i umieszcza go miedzy CLI args a Managed. Official docs **nie wymieniaja** `--settings` explicite w "Settings precedence". **Czy to oddzielna warstwa czy subset CLI args?**

**Propozycja dla CRITIC:** Zweryfikowac istnienie `--settings` flag (gh cli --help / release notes).

### 8.5 Wielo-CLAUDE.md merge

Nie dotyczy settings.json, ale pytanie pokrewne: jak merguja sie `~/.claude/CLAUDE.md`, `<project>/CLAUDE.md`, `CLAUDE.local.md`, `.claude/rules/*.md`? Docs (R2.C39) pokazuja tabele "What uses scopes" z lokalizacjami ale nie opisuja semantyki merge. To **out-of-scope dla R2** ale moze byc tematem dla innego researcher'a (R3/R4).

### 8.6 Hook execution z roznych scope - czy identyfikuja source?

Docs wspominaja `/hooks` menu z labelami `User | Project | Local | Plugin | Session | Built-in` (R2.C40), ale nie czy command executed w hook knows ktory scope je zarejestrowal. Czy env var w hook script ma info "$CLAUDE_HOOK_SOURCE" czy cos podobnego? **Niejasne**.

---

## 9. Bibliografia

### Primary sources (Anthropic docs)

- **R2.C1** - Settings precedence list, `https://code.claude.com/docs/en/settings#settings-precedence`
- **R2.C3** - "Array settings merge across scopes" Note block, `https://code.claude.com/docs/en/settings#settings-precedence`
- **R2.C6** - Managed tier precedence, `https://code.claude.com/docs/en/settings#settings-precedence` ("Within the managed tier")
- **R2.C7** - managed-settings.d systemd convention, `https://code.claude.com/docs/en/settings#settings-files`
- **R2.C8** - Managed settings paths per OS, `https://code.claude.com/docs/en/settings#settings-files`
- **R2.C9** - Managed cannot be overridden by CLI, `https://code.claude.com/docs/en/permissions#settings-precedence`
- **R2.C10** - Authentication precedence chain, `https://code.claude.com/docs/en/authentication#authentication-precedence`
- **R2.C11** - settings.local.json automatic .gitignore, `https://code.claude.com/docs/en/settings#settings-files`
- **R2.C12** - autoMode read-sources (user/local/managed, not shared project), `https://code.claude.com/docs/en/permissions#configure-the-auto-mode-classifier`
- **R2.C14** - "Not accepted in project settings" (autoMemoryDirectory, autoMode, etc.), `https://code.claude.com/docs/en/settings#available-settings`
- **R2.C15** - `~/.claude.json` other config location, `https://code.claude.com/docs/en/settings#settings-files`
- **R2.C19** - "If a tool is denied at any level, no other level can allow it", `https://code.claude.com/docs/en/permissions#settings-precedence`
- **R2.C20** - `Bash(ls *)` vs `Bash(ls:*)` equivalence, `https://code.claude.com/docs/en/permissions#wildcard-patterns`
- **R2.C21** - includeCoAuthoredBy deprecated, `https://code.claude.com/docs/en/settings#available-settings`
- **R2.C22** - allowManagedMcpServersOnly + deniedMcpServers merges, `https://code.claude.com/docs/en/permissions#managed-only-settings`
- **R2.C23** - disableBypassPermissionsMode works from any scope, `https://code.claude.com/docs/en/permissions#managed-only-settings` (note po tabeli)
- **R2.C24** - disableBypassPermissionsMode rejects flag at startup, `https://code.claude.com/docs/en/settings#available-settings`
- **R2.C25** - allowManagedPermissionRulesOnly behavior, `https://code.claude.com/docs/en/permissions#managed-only-settings`
- **R2.C26** - "User allow vs Project deny - project wins", `https://code.claude.com/docs/en/settings#settings-precedence`
- **R2.C27** - "Deny at any level blocks", `https://code.claude.com/docs/en/permissions#settings-precedence`
- **R2.C28** - Denylist absolute precedence over allowlist, `https://code.claude.com/docs/en/mcp#managed-mcp-configuration`
- **R2.C29** - allowManagedHooksOnly behavior, `https://code.claude.com/docs/en/settings#hook-configuration`
- **R2.C30** - Hook parallel execution + dedup, `https://code.claude.com/docs/en/hooks`
- **R2.C31** - `/status` reports settings errors, `https://code.claude.com/docs/en/settings#verify-active-settings`
- **R2.C32** - JSON schema URL, `https://code.claude.com/docs/en/settings#settings-files`
- **R2.C33** - "Invalid permission rules don't invalidate whole file" (Vincent Qiao Part 1)
- **R2.C35** - Hook structure example, `https://code.claude.com/docs/en/hooks`
- **R2.C36** - PreToolUse decision priority deny>defer>ask>allow, `https://code.claude.com/docs/en/hooks`
- **R2.C37** - disableAllHooks scope-aware, `https://code.claude.com/docs/en/settings#hook-configuration`
- **R2.C39** - "What uses scopes" table, `https://code.claude.com/docs/en/settings#what-uses-scopes`
- **R2.C40** - `/hooks` menu source labels, `https://code.claude.com/docs/en/hooks`

### GitHub issues (community observations)

- **R2.C2** - Issue #17299 "mcpServers in project settings should merge with global settings, not replace", opened 2026-01-10, closed duplicate, `https://github.com/anthropics/claude-code/issues/17299`
- **R2.C5** - Issue #2835 "Silent Failure on Malformed JSON `.claude/settings.json` Files", opened 2025-07-01, closed duplicate, `https://github.com/anthropics/claude-code/issues/2835`
- **R2.C13** - Issue #16301 "Invalid entries written to settings.local.json when allowing Bash commands", `https://github.com/anthropics/claude-code/issues/16301`
- **R2.C16** - Issue #17017 "Project-level permissions replace global permissions instead of merging", opened 2026-01-09, OPEN, `https://github.com/anthropics/claude-code/issues/17017`
- **R2.C18** - Issue #24657 "enabledMcpjsonServers in .claude/settings.local.json is ignored", opened 2026-02-10, closed duplicate, `https://github.com/anthropics/claude-code/issues/24657`

### Community (blogs, third-party guides)

- **R2.C17** - Vincent Qiao, "Claude Code settings.json Deep Dive (2): Permissions", `https://blog.vincentqiao.com/en/posts/claude-code-settings-permissions/`
- **R2.C34** - Morph LLM "Claude Code settings.json Complete Reference", `https://www.morphllm.com/claude-code-settings-json`
- **R2.C38** - Vincent Qiao "Part 1: Where Config Files Live and Who Wins", `https://blog.vincentqiao.com/en/posts/claude-code-settings-intro/` (wymienia `--settings <path>` jako CLI flag)
- Eesel AI "Claude Code settings.json: Complete config guide (2026)", `https://www.eesel.ai/blog/settings-json-claude-code`
- Claudefast "Claude Code Settings Reference", `https://claudefa.st/blog/guide/settings-reference`
- DeepWiki "Settings and Permissions Files", `https://deepwiki.com/FlorianBruniaux/claude-code-ultimate-guide/4.2-settings-and-permissions-files`

### Sekcje dokumentacji cytowane bezposrednio

- `docs.claude.com/en/docs/claude-code/settings` -> `code.claude.com/docs/en/settings` (sections: Configuration scopes, Settings files, Available settings, Permission settings, Settings precedence, Verify active settings)
- `code.claude.com/docs/en/permissions` (sections: Manage permissions, Permission modes, Permission rule syntax, Extend permissions with hooks, Working directories, Managed settings, Managed-only settings, Settings precedence)
- `code.claude.com/docs/en/hooks` (sections: Hook configuration, dedup, parallel execution)
- `code.claude.com/docs/en/mcp` (sections: Managed MCP configuration, Option 1/Option 2, Denylist precedence)
- `code.claude.com/docs/en/authentication` (sections: Authentication precedence)

---

**Koniec R2.** Raport pokrywa wszystkie 9 wymaganych tematow z zakresu. Otwarte rozbieznosci zostaly jawnie wyartykulowane w sekcji 8 dla CRITIC'a. Recommendation dla R3/ekstraktora: zmapowac `env` deep-merge empirycznie, bo doc coverage tego pola jest niedostateczny.
