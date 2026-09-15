# R7 - Decision Framework: Global vs Project vs Local Settings

**Campaign:** Claude Code Hooks Best Practices 2026
**Researcher:** R7 (taxonomy / decision framework)
**Date:** 2026-04-17
**Scope:** Canonical settings file locations, precedence, merge semantics, and a decision framework for placing hooks, permissions, env vars, models, and status lines into the correct scope (global vs project vs local). Includes anti-patterns and migration workflows.

---

## 0. TL;DR (one-minute version)

Claude Code resolves configuration from five layers (highest to lowest): **Managed > CLI flags > `.claude/settings.local.json` > `.claude/settings.json` > `~/.claude/settings.json`**. Scalars follow precedence (higher layer wins), arrays (hooks, permissions, sandbox paths, URL allowlists) are **concatenated and deduplicated** across layers. This gives a simple placement rule:

- **Global** (`~/.claude/settings.json`) - anything that is "about you" (TTS, statusline, personal model, default language, telemetry env, notification hooks, post-compact context reminders).
- **Project** (`.claude/settings.json`, git-committed) - anything that is "about this codebase and should be identical for every teammate" (version-protecting hooks, team lint/test runners, project MCP allowlist, required plugins, path deny rules for secrets).
- **Local** (`.claude/settings.local.json`, gitignored) - anything that is "personal to this project on this machine" (experimental hooks being prototyped, personal API-key-bearing env, debug flags, per-developer allow overrides, machine-specific paths).
- **Managed** - org-wide mandatory policy pushed by IT; not reachable by end users.

> Official precedence quote:
> "Settings apply in order of precedence. From highest to lowest: 1. Managed settings ... 2. Command line arguments ... 3. Local project settings (`.claude/settings.local.json`) ... 4. Shared project settings (`.claude/settings.json`) ... 5. User settings (`~/.claude/settings.json`)." - code.claude.com/docs/en/settings

> Official merge semantics quote:
> "Array settings merge across scopes. When the same array-valued setting (such as `sandbox.filesystem.allowWrite` or `permissions.allow`) appears in multiple scopes, the arrays are concatenated and deduplicated, not replaced." - code.claude.com/docs/en/settings

> Official hook merge quote:
> "All matching hooks run in parallel, and identical handlers are deduplicated automatically. Command hooks are deduplicated by command string, and HTTP hooks are deduplicated by URL." - code.claude.com/docs/en/hooks

---

## 1. File Locations & Scope Table

### 1.1 Canonical location table

| Scope | Location (canonical) | Who sees it | Committed to git? | Set by |
|---|---|---|---|---|
| Managed (server) | Anthropic admin console (server-managed) | All users in org | N/A (remote) | IT admin |
| Managed (MDM, macOS) | `com.anthropic.claudecode` managed preferences domain (Jamf/Kandji/Intune via configuration profile) | All users on device | N/A (plist) | IT admin |
| Managed (MDM, Windows) | `HKLM\SOFTWARE\Policies\ClaudeCode\Settings` (REG_SZ JSON via Group Policy/Intune); fallback `HKCU\SOFTWARE\Policies\ClaudeCode` | All users on machine (HKLM) or current user (HKCU) | N/A (registry) | IT admin |
| Managed (file, macOS) | `/Library/Application Support/ClaudeCode/managed-settings.json` + `managed-settings.d/*.json` drop-in | All users on machine | N/A (root-owned) | IT admin |
| Managed (file, Linux/WSL) | `/etc/claude-code/managed-settings.json` + `managed-settings.d/*.json` drop-in | All users on machine | N/A | IT admin |
| Managed (file, Windows) | `C:\Program Files\ClaudeCode\managed-settings.json` + `managed-settings.d\*.json` drop-in (as of v2.1.75; legacy `C:\ProgramData\ClaudeCode\` no longer supported) | All users on machine | N/A | IT admin |
| CLI flag | `--settings <path>` on `claude` invocation | Current session | No | User ad-hoc |
| Local project | `<repo>/.claude/settings.local.json` | You only, in this repo | **No** (auto-gitignored by Claude Code when created) | Individual developer |
| Shared project | `<repo>/.claude/settings.json` | Whole team | **Yes** (intentionally committed) | Team / repo maintainer |
| User (global) | `~/.claude/settings.json` | You, in every project | No (lives in home dir) | Individual developer |
| Misc personal | `~/.claude.json` (NOT a settings.json; stores OAuth, theme, editor mode, per-project trust, MCP user/local scope) | You | No | Claude Code runtime |
| Project MCP | `<repo>/.mcp.json` | Whole team | Yes | Team |

Source: code.claude.com/docs/en/settings, "Configuration scopes" and "Settings files" sections.

**Important nuance on the drop-in directory (file-based managed settings):** IT can ship `managed-settings.d/10-telemetry.json`, `20-security.json`, etc. They merge following systemd conventions: `managed-settings.json` is the base, drop-ins sorted alphabetically, later files override earlier ones for scalars, arrays concatenate+dedupe, objects deep-merge, hidden dotfiles ignored.

**Important nuance on managed tier internal precedence:** "Only one managed source is used; sources do not merge across tiers. Server-managed > MDM/OS-level policies > file-based > HKCU registry." - code.claude.com/docs/en/settings. Inside the file-based tier, drop-ins do merge.

### 1.2 What each layer is *physically* for

| Scope | Right mental model |
|---|---|
| Managed | "Hard law from IT. Cannot be weakened. Typically empty for solo devs." |
| CLI `--settings` | "Ephemeral lab experiment for exactly this `claude` run." |
| Local | "My personal tweaks on this repo that must not leak to teammates. Safe to break." |
| Project | "Contract for this codebase. If I commit it, every teammate runs it tomorrow." |
| User (global) | "Things that follow me across every project on this laptop." |

---

## 2. Precedence & Merge Rules

### 2.1 The precedence ladder (highest on top)

```
+-----------------------------------------+
|  Managed (server > MDM > file > HKCU)   |  <- cannot be overridden by anything below
+-----------------------------------------+
|  Command line: --settings, --model, ... |  <- session only
+-----------------------------------------+
|  .claude/settings.local.json            |  <- you, this repo
+-----------------------------------------+
|  .claude/settings.json                  |  <- team, this repo
+-----------------------------------------+
|  ~/.claude/settings.json                |  <- you, every repo
+-----------------------------------------+
```

Higher layer wins for scalar conflicts. Arrays merge.

### 2.2 Per-field merge semantics (hybrid model)

Claude Code uses a **hybrid merge**, not pure override. The rules:

| Field type | Behavior |
|---|---|
| Scalar (`model`, `language`, `defaultShell`, `outputStyle`, `statusLine`, `apiKeyHelper`, `effortLevel`, `cleanupPeriodDays`, `tui`) | Highest-precedence layer that defines the key wins. Lower layer is silently ignored. |
| Array (`permissions.allow`, `permissions.ask`, `permissions.deny`, `permissions.additionalDirectories`, `sandbox.filesystem.allowWrite/denyWrite/denyRead/allowRead`, `sandbox.excludedCommands`, `sandbox.network.allowedDomains`, `allowedHttpHookUrls`, `httpHookAllowedEnvVars`, `spinnerTipsOverride.tips`, `companyAnnouncements`) | **Concatenated and deduplicated** across all layers. No layer can "remove" an entry added by another layer via array semantics alone. |
| Object (`hooks`, `env`, `enabledPlugins`, `extraKnownMarketplaces`, `sandbox.network`, `attribution`) | **Deep-merged**. Keys not present in higher layer inherit from lower. Keys present in both follow scalar/array rules at the leaves. |
| Hooks specifically | All hook entries from all layers aggregate. Identical handlers are deduplicated by command string (for `type: "command"`) or by URL (for `type: "http"`). All matching hooks run in parallel for a given event. |

Sources: code.claude.com/docs/en/settings ("Note: Array settings merge across scopes..."); code.claude.com/docs/en/hooks ("All matching hooks run in parallel, and identical handlers are deduplicated automatically..."); managed drop-in merge rules ("later files override earlier ones for scalar values; arrays are concatenated and de-duplicated; objects are deep-merged").

### 2.3 Flow diagram: which value wins?

```
                                 lookup(key) on layer
  ?key in Managed? -----yes----> return Managed value (final)
       | no
       v
  ?key on CLI flag? ---yes----> return CLI value (final)
       | no
       v
  ?is this an array field?
       | yes --> concatenate across {Local, Project, User, Managed-passthrough}, dedupe, return
       | no
       v
  ?key in Local?  -----yes----> return Local value
       | no
       v
  ?key in Project? -----yes----> return Project value
       | no
       v
  ?key in User?   -----yes----> return User value
       | no
       v
  return built-in default
```

### 2.4 Concrete conflict example (scalar)

- `~/.claude/settings.json` -> `"model": "claude-opus-4-7"`
- `.claude/settings.json` -> `"model": "claude-sonnet-4-6"`
- `.claude/settings.local.json` -> (not set)

Result in this repo: **`claude-sonnet-4-6`** (project wins over user).

If the developer adds `"model": "claude-haiku-4-6"` to `settings.local.json`, they get Haiku in this repo only. Other repos keep Opus 4.7. No teammate is affected.

### 2.5 Concrete conflict example (array - permissions)

- Global: `"allow": ["Bash(npm run test *)", "Read(~/.zshrc)"]`
- Project: `"deny": ["Bash(curl *)", "Read(./.env)"]`
- Local: `"allow": ["Bash(docker *)"]`

Final effective set:
- `allow` = `["Bash(npm run test *)", "Read(~/.zshrc)", "Bash(docker *)"]` (concat+dedupe)
- `deny` = `["Bash(curl *)", "Read(./.env)"]`

**Critical rule:** "Rules are evaluated in order: deny rules first, then ask, then allow. The first matching rule wins." (docs/en/settings). So **a lower-layer `allow` cannot override a higher-layer `deny`** - the deny still fires first. This is the primary knob for enforcing safety from project or managed layers.

### 2.6 Concrete conflict example (hooks)

- Global `~/.claude/settings.json`:
  ```json
  { "hooks": { "Notification": [ { "hooks": [ { "type": "command", "command": "~/.claude/hooks/tts.sh" } ] } ] } }
  ```
- Project `.claude/settings.json`:
  ```json
  { "hooks": { "PreToolUse": [ { "matcher": "Bash", "hooks": [ { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/block-rm.sh" } ] } ] } }
  ```
- Local `.claude/settings.local.json`:
  ```json
  { "hooks": { "PreToolUse": [ { "matcher": "Bash", "hooks": [ { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/dev-logger.sh" } ] } ] } }
  ```

Result: on `PreToolUse(Bash)`, **both** `block-rm.sh` and `dev-logger.sh` fire in parallel. On `Notification`, the TTS hook from global fires. None of the three conflict; all three run. Deduplication applies only if two entries share the identical command string.

### 2.7 Can a lower layer disable a higher-layer hook?

**No, not via `hooks: []`.** Setting an empty `hooks` object in a lower layer does not remove the higher-layer hook - the merge is additive.

Ways to actually disable:
1. **`"disableAllHooks": true`** - nukes everything (except managed hooks if set by IT with managed precedence).
2. Edit the hook at its origin layer (remove it from `~/.claude/settings.json` if it is personal-global).
3. If the hook is managed and IT set `allowManagedHooksOnly: true`, **no user action** can disable it - that is the intended design.
4. For a specific tool, override via a **higher-precedence `permissions.deny`** that blocks the tool itself so the hook never has an event to fire on (crude but works for PreToolUse).

> "The `disableAllHooks` setting respects the managed settings hierarchy. If an administrator configured hooks through managed policy settings, `disableAllHooks` in user/project/local settings **cannot** disable those managed hooks." - code.claude.com/docs/en/hooks

### 2.8 The `allowManagedHooksOnly` lockdown switch

Only settable in managed. When `true`:
- Managed hooks and SDK hooks load.
- Plugin hooks from plugins that appear in the managed `enabledPlugins` load (trust is granted by full `plugin@marketplace` ID).
- **User, project, and all other plugin hooks are blocked entirely.**

This is the nuclear option for locked-down enterprise deployments. Individual devs cannot circumvent it.

---

## 3. Decision Framework (the CORE of this report)

For each hook/setting you consider adding, run it through this three-question triage:

1. **Does every teammate need the same behavior for this repo to work correctly?** If yes -> Project.
2. **Is this tied to my person (my voice, my model budget, my keyboard, my TTS)?** If yes -> Global.
3. **Is this secret, experimental, or a machine-specific path?** If yes -> Local.

If none of the three is a clear yes, default to **Local first, then promote later** (see Migration Patterns, section 5).

### 3.1 Global (`~/.claude/settings.json`) - ZAWSZE tutaj

Put here anything that is *about you as an operator*, not about any specific codebase. Rationale: it travels with you to every repo, and no teammate is impacted.

| Setting / Hook | Why global |
|---|---|
| **TTS / notification hooks** (e.g. `Notification`, `SessionEnd`, `Stop` firing `say`, `espeak`, `afplay`) | Personal preference. A colleague on mute must not be forced to hear your chimes. |
| **Post-compact context reminder** (`PreCompact` + `PostCompact` writing to `MEMORY.md` or printing a summary) | The need for context recovery after compaction is universal across projects. |
| **Personal statusline** (`statusLine` with cost/token/git-branch/time display) | How you like your terminal to look. |
| **Personal default model** (`model`) | Your personal Opus/Sonnet/Haiku budget balance. Easily overridden by project when a repo demands otherwise. |
| **Personal `language`** (e.g. `"polish"`, `"japanese"`) | Response language is a you-thing. Polish teammates will set theirs, English ones theirs. |
| **Personal editor mode, TUI, effortLevel** | Personal ergonomics (though `editorMode` lives in `~/.claude.json`, not settings.json). |
| **Personal `voiceEnabled`** | Voice dictation is per-user. |
| **Personal telemetry / OTEL headers** (`env`: `CLAUDE_CODE_ENABLE_TELEMETRY=1`) when you, specifically, want local observability | Turning on your own traces. |
| **Personal `apiKeyHelper`** | Your credential rotation script. Team cannot share a secret key anyway. |
| **Personal `awayuSummaryEnabled`, `spinnerTipsEnabled`, `prefersReducedMotion`** | Accessibility and preference. |
| **Personal always-on safety deny rules** (e.g. `Read(~/.ssh/**)`, `Read(~/.aws/credentials)`, `Bash(rm -rf /*)`, `Bash(sudo *)`) | A safety net that follows you into untrusted repos. Because arrays merge, projects can add more deny; they can never weaken these. |
| **Personal plugin preferences** (`enabledPlugins` for tools you always want, like a personal task tracker) | Does not pollute a repo where teammates do not want them. |
| **Personal attribution** (`attribution.commit`, `attribution.pr`) | Some devs want `Co-Authored-By`, some do not. Personal choice, global. |
| **Global cleanup cadence** (`cleanupPeriodDays`) | Storage hygiene for your machine. |

### 3.2 Project (`.claude/settings.json`) - ZAWSZE tutaj

Committed to git. Put here anything that is *about this codebase's correctness, safety, or team contract*.

| Setting / Hook | Why project |
|---|---|
| **Version-protection hooks** (`PreToolUse` + matcher `Edit|Write` blocking edits to `v32/`, `dist/`, generated/, migrations/ unless flag set) | The rule is intrinsic to this repo's versioning discipline and must be enforced for every committer, not only the most careful one. |
| **Build/test runners as hooks** (`PostToolUse` after `Edit` -> run `npm run lint --fix`, `pytest -x`) | Team-wide quality gate. Deterministic, same for everyone. |
| **Pre-commit linters as hooks** (`Stop` or `PostToolUse` running `eslint`, `ruff`, `prettier --check`) | Enforces style without relying on each dev's muscle memory. |
| **Secret deny rules for this repo** (`Read(./.env)`, `Read(./.env.*)`, `Read(./secrets/**)`, `Read(./config/credentials.json)`) | Repo-specific paths. Every teammate must have them or they leak. |
| **Project MCP allowlist/denylist** (`enabledMcpjsonServers`, `disabledMcpjsonServers`, `enableAllProjectMcpServers`) | Decides which `.mcp.json` servers the team actually trusts. |
| **Required plugins** (`enabledPlugins` with project-specific tools like a monorepo formatter) | Whole team gets the right toolchain on clone+trust. |
| **Project `extraKnownMarketplaces`** | Introduces the team's private plugin marketplace on trust. |
| **Project-wide `Bash` allowlist for non-interactive safe commands** (`Bash(npm run test *)`, `Bash(cargo test *)`, `Bash(pytest *)`) | Reduces permission-prompt friction team-wide. |
| **Project model override** (`model`) - *only* when the repo genuinely requires a specific model (e.g. Haiku for a cheap batch job, Opus for an audit repo) | Team contract. Easy for an individual to override via local if needed. |
| **`permissions.defaultMode`** - e.g. `"plan"` for a sensitive production repo, `"acceptEdits"` for a sandbox repo | Team choice. |
| **`worktree.symlinkDirectories` / `sparsePaths`** in monorepos | Repo-structure optimization - identical for everyone cloning. |
| **`sandbox` config** (`enabled`, `allowedDomains` for npm/PyPI/etc., `excludedCommands` for docker) | Network and filesystem posture for this codebase. |
| **`includeGitInstructions`, `attribution`** - when the team has a non-default commit policy | Team git contract. |
| **Project `env`** (e.g. `NODE_ENV=development`, `PYTHONDONTWRITEBYTECODE=1`) - **never secrets** | Deterministic build environment. |
| **Project `statusLine`** - only if the team agreed on a shared visual | Rare. Usually stays personal. |

### 3.3 Local (`.claude/settings.local.json`) - tutaj

Gitignored. Put here anything *personal to this repo on this machine*, experimental, or secret.

| Setting / Hook | Why local |
|---|---|
| **Personal API keys in `env`** (`MY_SERVICE_API_KEY`, `DATABASE_URL` pointing to your dev DB) | NEVER go to git. Local scope is gitignored by Claude Code automatically. |
| **Temporary experimental hooks you are prototyping** | Test in isolation. If they prove valuable, promote to project. |
| **Personal debug flags in `env`** (`DEBUG=myapp:*`, `VERBOSE=1`) | Yours only. |
| **Per-developer `allow` additions** (`Bash(my-personal-tool *)`) | Tools you have installed but no teammate does. |
| **Machine-specific paths** (`additionalDirectories: ["/Users/me/scratch"]`) | Absolute paths that will not exist on another machine. |
| **Override of project `model`** when you want to pay for Opus on a Sonnet repo | Personal budget decision. |
| **Override of project `defaultMode`** (e.g. flip `plan` to `acceptEdits` for a repo you know deeply) | Your risk tolerance. |
| **Ad-hoc larger `cleanupPeriodDays`** on this repo only | Personal. |
| **Local-only `hooks` used as a linter killswitch for this repo today** (e.g. to skip a flaky lint hook while you diagnose it) | Not the place for long-term fixes - for that, edit the project hook. But useful as a local short-term escape. |
| **Testing a new hook before proposing it to the team** | Classic use case. As eesel.ai guide notes: "If you want to test a hook before proposing it to the team, add it to .claude/settings.local.json." |

### 3.4 Edge cases (where the call is not obvious)

**Case A: "I use a huge monitor, I want the statusLine to be wider in this repo."**
-> Personal + project-scoped -> **Local**. Your monitor is not the team's. If later you want the same in every repo, promote to global.

**Case B: "I want a global hook, but it references a path that only exists in one kind of project (e.g. `./dist`)."**
-> Parametrize with `$CLAUDE_PROJECT_DIR` and a guard:
```bash
#!/usr/bin/env bash
[ -d "$CLAUDE_PROJECT_DIR/dist" ] || exit 0
# ... actual hook body
```
Then the hook is safe to live in global. If the path list grows repo-specific, move the hook to project.

**Case C: "A deny rule that I want always-on, but legacy projects need an exception."**
-> Deny goes to **global** (always enforced). Exception goes to the offending project as an **`allow`** rule - but remember deny rules fire first, so `allow` cannot override `deny`. This means the right shape is: put the deny only at project scope of projects that need it, not globally. The deny/allow asymmetry forces this.

**Case D: "A hook that depends on a specific OS."**
-> Guard inside the hook script (`[[ "$(uname)" == "Darwin" ]] || exit 0`) and put in **global**. Do not put OS-conditional hooks in project settings - Linux teammates will see spurious failures.

**Case E: "A secret needed by a project-wide hook."**
-> Hook definition in **project** (`settings.json`, committed). Secret env var in **local** (`settings.local.json`, gitignored). The hook picks up the env at runtime via process inheritance or via `httpHookAllowedEnvVars` allowlist. Clean separation.

**Case F: "My team uses one default model, but I want Opus."**
-> Project sets `"model": "claude-sonnet-4-6"`. You set `"model": "claude-opus-4-7"` in local. No teammate is affected; your preference is honored in this repo only.

**Case G: "A hook I want to run only in CI, not on local dev."**
-> Add a guard inside the hook script: `[ -n "$CI" ] || exit 0`. Keep the hook in **project** settings for auditability. CI inherits the same `.claude/settings.json` when running headless.

---

## 4. Examples (5 concrete settings.json pairs)

### Example 1 - Open-source TypeScript library (v32.16 Agent Architecture style)

**`~/.claude/settings.json` (global, Maciej)**
```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "model": "claude-opus-4-7",
  "language": "polish",
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh"
  },
  "permissions": {
    "deny": [
      "Read(~/.ssh/**)",
      "Read(~/.aws/credentials)",
      "Read(~/.config/gh/hosts.yml)",
      "Bash(rm -rf /*)",
      "Bash(sudo *)",
      "Bash(curl * | sh)"
    ]
  },
  "hooks": {
    "Notification": [
      { "hooks": [ { "type": "command", "command": "~/.claude/hooks/tts.sh" } ] }
    ],
    "PostCompact": [
      { "hooks": [ { "type": "command", "command": "~/.claude/hooks/context-reminder.sh" } ] }
    ]
  },
  "attribution": {
    "commit": "🤖 Generated with Claude Code",
    "pr": ""
  }
}
```

**`<repo>/.claude/settings.json` (project, committed)**
```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test *)",
      "Bash(node generate_skills.js)",
      "Bash(node generate_commands.js)"
    ],
    "deny": [
      "Edit(./v32/**)",
      "Edit(./v31/**)",
      "Edit(./index.html)",
      "Read(./.env)",
      "Read(./.env.*)"
    ],
    "defaultMode": "plan"
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-shipped-versions.sh" }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/lint-html.sh" }
        ]
      }
    ]
  },
  "env": {
    "NODE_OPTIONS": "--max-old-space-size=4096"
  }
}
```

**`<repo>/.claude/settings.local.json` (local, gitignored)**
```json
{
  "permissions": {
    "allow": [ "Bash(code .)", "Bash(gh pr view *)" ]
  },
  "env": {
    "DEBUG": "generate:*"
  }
}
```

### Example 2 - Enterprise backend Python service

**Global** (developer, same machine, no change): same as Example 1.

**Project `.claude/settings.json`:**
```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "model": "claude-sonnet-4-6",
  "permissions": {
    "allow": [
      "Bash(poetry run *)",
      "Bash(pytest *)",
      "Bash(ruff check *)",
      "Bash(mypy *)",
      "Bash(alembic upgrade head)",
      "Bash(alembic current)"
    ],
    "ask": [
      "Bash(alembic downgrade *)",
      "Bash(alembic revision *)"
    ],
    "deny": [
      "Bash(alembic stamp *)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./config/credentials.json)",
      "Edit(./alembic/versions/**)"
    ],
    "defaultMode": "plan"
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/ruff-fix.sh" },
          { "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/mypy-check.sh" }
        ]
      }
    ],
    "Stop": [
      { "hooks": [ { "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/pytest-quick.sh" } ] }
    ]
  },
  "sandbox": {
    "enabled": true,
    "network": {
      "allowedDomains": [ "pypi.org", "*.pypi.org", "files.pythonhosted.org", "github.com" ]
    }
  }
}
```

**Project local `settings.local.json`:**
```json
{
  "env": {
    "DATABASE_URL": "postgresql://localhost:5432/mydev",
    "REDIS_URL": "redis://localhost:6379",
    "STRIPE_SECRET_KEY": "sk_test_redacted_personal_key"
  }
}
```

### Example 3 - Solo experimental repo

**Project** `.claude/settings.json`: empty or absent. Everything lives in global + local for solo dev speed.

**Local** `.claude/settings.local.json`:
```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [ "Bash(*)" ]
  },
  "hooks": {
    "Stop": [
      { "hooks": [ { "type": "command", "command": "afplay /System/Library/Sounds/Glass.aiff" } ] }
    ]
  }
}
```
*(Anti-pattern note: `Bash(*)` is acceptable only in a throwaway local repo where you accept the risk. Never commit.)*

### Example 4 - Team frontend with strict design-system protection

**Project:**
```json
{
  "permissions": {
    "deny": [
      "Edit(./packages/design-system/tokens/**)",
      "Edit(./packages/design-system/compiled/**)"
    ],
    "ask": [
      "Edit(./packages/design-system/**)"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/require-design-review-tag.sh" }
        ]
      }
    ]
  }
}
```
The hook inspects the prompt for a `#design-approved` tag and blocks edits in the design-system area otherwise. Every teammate benefits.

### Example 5 - Enterprise managed baseline

**`/etc/claude-code/managed-settings.json`** (IT-deployed, Linux):
```json
{
  "allowManagedHooksOnly": false,
  "permissions": {
    "deny": [
      "Bash(curl *)",
      "WebFetch",
      "Read(~/.ssh/**)",
      "Read(**/credentials*)",
      "Read(**/*secret*)"
    ]
  },
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "network": {
      "allowedDomains": [ "*.internal.acme.com", "github.com", "*.github.com" ],
      "allowManagedDomainsOnly": true
    }
  },
  "availableModels": [ "sonnet", "haiku" ],
  "minimumVersion": "2.1.100",
  "forceLoginOrgUUID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "disableBypassPermissionsMode": "disable"
}
```
Employees cannot weaken these. They can add to `permissions.allow` or `permissions.deny` (arrays merge), but deny-first evaluation ensures the managed deny list always fires.

---

## 5. Migration Patterns

### 5.1 Local -> Project (promoting an experimental hook to team-wide)

1. Prove value in `settings.local.json` for 1-2 weeks.
2. Review: does it assume anything personal (your shell, your path, your OS)? Parametrize.
3. Move the hook block to `settings.json`, also commit the hook script into `.claude/hooks/` (make sure the script is executable: `chmod +x`).
4. Remove the entry from `settings.local.json`.
5. Announce in team chat + PR description: "Adding PostToolUse lint hook. Opt out via `disableAllHooks` in local if needed."
6. If any teammate has machine-specific issues, they can shadow-override with a no-op entry, or you accept a follow-up PR to guard the script better.

### 5.2 Global -> Project (team wants to adopt your personal hook)

1. Inspect the hook script for personal paths (`~/.something`, `/Users/me/...`) and replace with `$CLAUDE_PROJECT_DIR` or relative paths.
2. Copy the script into `.claude/hooks/<name>.sh` inside the repo.
3. Copy the hook entry from `~/.claude/settings.json` into `<repo>/.claude/settings.json`, updating `command` to use `"$CLAUDE_PROJECT_DIR"/.claude/hooks/<name>.sh`.
4. Keep the global copy only if you want it to also run on repos that do not opt in. Otherwise remove it from global to avoid double-firing via deduplication (identical command strings are deduped, but if the paths differ the hooks run twice).
5. PR the project change. Review focuses on: cross-OS compatibility, idempotence, failure behavior (non-zero exit codes block the tool call for PreToolUse).

### 5.3 Project -> Global (hook turned out to be personal after all)

1. Remove from `settings.json` PR (so teammates no longer get it).
2. Paste into `~/.claude/settings.json` with adjusted path.
3. If the script lives in the repo, move it to `~/.claude/hooks/` or keep it path-resolved with `$CLAUDE_PROJECT_DIR` + a guard so it quietly exits outside the repo.

### 5.4 Conflict resolution when team members have different global hooks

Global hooks are per-user by definition. They never conflict because each runs on their own machine. The only time a team conflict arises is when **two teammates independently propose conflicting *project* hooks** (e.g. one wants `ruff` on save, another wants `black`). Resolution: team discussion, pick one, put it in `.claude/settings.json`. Anyone who wants the other can keep it in their own global settings.

### 5.5 "A new hire cloned the repo and things do not work"

Typical causes (in order of frequency):
1. They never ran `claude /status` to verify the repo settings loaded. Tell them to trust the folder.
2. Their `~/.claude/settings.json` has `disableAllHooks: true`.
3. They have a managed policy (enterprise) that blocked the project hook via `allowManagedHooksOnly: true`.
4. Their script dependencies (`ruff`, `mypy`, etc.) are not installed on their machine - project should document this in README or make the hook no-op when tool absent.

---

## 6. Anti-Patterns

### 6.1 Secrets in `settings.json`
**Never put API keys, tokens, DB passwords, or any secret into `~/.claude/settings.json` or `.claude/settings.json`.** The former is in your home dir (leak risk on shared machines, backup tools), the latter is committed to git. Use `.claude/settings.local.json` (gitignored by Claude Code when auto-created) or a secret manager + `apiKeyHelper` script.

Real-world sighting: developers have pasted `ANTHROPIC_API_KEY` directly into `env` in shared project settings. This has then been force-pushed to public repos. Treat this as the `.env` committed-to-git equivalent.

### 6.2 `.claude/settings.local.json` accidentally committed
Claude Code *auto-adds* `.claude/settings.local.json` to `.gitignore` on first creation, but if the repo was not a git repo at that moment, or if the `.gitignore` was overwritten later, the file can slip in. Defense: add an explicit line to `.gitignore`:
```
# Claude Code
.claude/settings.local.json
```
As recommended by the DEV.to guide: "Add to `.gitignore`: `.claude/*` and `!.claude/*.example*`" - this pattern ignores everything in `.claude/` except example files, which is even stricter and lets you ship `settings.example.json` as a template.

### 6.3 Hard-coded personal paths in project settings
`command: "/Users/maciej/bin/myscript.sh"` in `.claude/settings.json` will break for every teammate. Always use `$CLAUDE_PROJECT_DIR` for in-repo scripts or rely on a team-installed tool on `$PATH`.

### 6.4 Global hook that assumes a project structure
A global hook that does `cat $CLAUDE_PROJECT_DIR/package.json | jq ...` will fail in Python repos, Rust repos, docs repos, etc. Always guard:
```bash
[ -f "$CLAUDE_PROJECT_DIR/package.json" ] || exit 0
```
Exit code 0 means "I skipped, no objection" - Claude Code continues normally.

### 6.5 Duplicating the same hook at global and project scope
Deduplication is by command string. If your global hook runs `~/.claude/hooks/lint.sh` and your project hook runs `"$CLAUDE_PROJECT_DIR"/.claude/hooks/lint.sh`, these are **different command strings** and both fire. Choose one layer.

### 6.6 Relying on `permissions.deny` for security without defense in depth
Community reports (eesel.ai) note: "'deny' rules are often ignored" in edge cases, particularly for `Bash` patterns that shell-expand in unexpected ways. Reinforce with sandboxing (`sandbox.enabled: true`, `network.allowedDomains`, `filesystem.denyWrite`) and server-managed policy for high-risk environments.

### 6.7 Committing `enabledPlugins` for a plugin nobody on the team has installed locally
If the plugin is not in `extraKnownMarketplaces` or in an already-trusted marketplace, teammates will be prompted at trust time. That is fine but noisy. Always pair `enabledPlugins` in project settings with the matching `extraKnownMarketplaces` entry so teammates can install the plugin in one click.

### 6.8 Using `settings.json` for `autoConnectIde`, `editorMode`, etc.
These specific keys live in `~/.claude.json`, not `settings.json`. Placing them in `settings.json` triggers a schema validation error. Check the "Global config settings" table in the docs before adding unusual keys.

### 6.9 `disableAllHooks: true` at project scope
This nukes *all* hooks including safety ones installed by the user globally, *except* managed-scope hooks. Rarely what you want. If you need to skip one hook for a session, consider `--settings /tmp/clean-settings.json` with a minimal file. If you need to skip permanently, remove the offending hook at its own layer.

### 6.10 Mixing concerns in one hook script
A hook script that does lint + test + notify + log is hard to debug, hard to disable partially, and makes `PreToolUse` latency awful. Split into small hook scripts, wire them up in `settings.json` as separate entries under the same event/matcher. Parallelism is free: "All matching hooks run in parallel."

### 6.11 Putting `autoMemoryDirectory` in project settings
The docs explicitly forbid this field in `.claude/settings.json`: "Not accepted in project settings (`.claude/settings.json`) to prevent shared repos from redirecting memory writes to sensitive locations." Place in user, local, or managed only.

---

## 7. Quick Reference: "Where do I put X?"

| You want to... | Put in |
|---|---|
| Play a TTS sound on notifications | Global |
| Run `ruff check` after every edit on this project | Project |
| Try a new hook out before showing teammates | Local |
| Block edits to `./dist/` and `./v32/` on this repo | Project |
| Set a `DATABASE_URL` for your dev Postgres | Local |
| Deny `Bash(sudo *)` always and forever | Global |
| Pin a specific Claude model for a sensitive audit repo | Project |
| Use Opus on a repo where team defaults to Sonnet | Local |
| Allow `Bash(poetry run *)` for a Python repo | Project |
| Turn on OTEL telemetry on your machine | Global |
| Add a personal tool to the allow list | Local |
| Enforce org-wide minimum CLI version | Managed |
| Block `curl *` org-wide | Managed |
| Set a custom statusline that shows tokens and cost | Global |
| Ship a trigger that complains when legacy files are touched | Project |
| Let only certain teams add plugins | Managed (`strictKnownMarketplaces`) |
| Disable all hooks for this repo right now while debugging | Local (`disableAllHooks: true`, remember to remove) |

---

## 8. Verifying your layout

Run `claude /status` inside Claude Code. The output lists each configuration layer and its origin. Sources are labeled explicitly, e.g.:
- `Enterprise managed settings (remote)` - server-managed
- `Enterprise managed settings (plist)` - macOS MDM
- `Enterprise managed settings (HKLM)` - Windows Group Policy
- `Enterprise managed settings (file)` - `/etc/claude-code/...`
- User, Project, Local are shown with their paths

> "If a settings file contains errors, `/status` reports the issue so you can fix it." - code.claude.com/docs/en/settings

This is the single most valuable debugging command for "why is my hook not firing / why is this permission blocking me".

---

## 9. Sources Cited

1. **Claude Code settings** - code.claude.com/docs/en/settings (canonical file locations, precedence ladder, array merge note, hook allowlists, managed deployment paths, drop-in directory semantics, `/status` verification).
2. **Claude Code hooks** - code.claude.com/docs/en/hooks (hook configuration locations, deduplication by command string and URL, parallel execution, `disableAllHooks` managed interaction, `allowManagedHooksOnly` lockdown, 25+ hook events list, matcher patterns).
3. **Claude Code permissions** - code.claude.com/docs/en/permissions (deny/ask/allow evaluation order, managed-only settings, `allowManagedPermissionRulesOnly`).
4. **eesel.ai "Claude Code settings.json: Complete config guide (2026)"** - eesel.ai/blog/settings-json-claude-code (community anti-pattern observations: deny rules sometimes bypassed, test hooks in local before shared, merge-not-replace mental model).
5. **DEV.to "Claude Code Configuration Blueprint: The Complete Guide for Production Teams"** - dev.to/mir_mursalin_ankur/claude-code-configuration-blueprint-... (global deny list for SSH/AWS/Keychain, `.gitignore: .claude/* + !.claude/*.example*` pattern, hooks vs CLAUDE.md cost argument).
6. **shanraisshan/claude-code-best-practice** - github.com/shanraisshan/claude-code-best-practice/blob/main/best-practice/claude-settings.md (observed practitioner patterns for per-scope separation).
7. **disler/claude-code-hooks-mastery** - github.com/disler/claude-code-hooks-mastery (real repo layout: hooks kept in project `.claude/settings.json`, scripts under `.claude/hooks/`, paths referenced via `$CLAUDE_PROJECT_DIR`; demonstrates observed pattern of project-centric hook organization).
8. **builder.io "8 Claude Code Settings to Customize in Minutes"** - builder.io/blog/claude-code-settings (scope examples for permissions and hooks).
9. **claudelog.com / claudefa.st / claudelab.net** - secondary references for settings taxonomy (consulted as observed-pattern confirmation, not primary authority).
10. **Anthropic engineering docs (server-managed settings, MCP configuration, permission modes)** - code.claude.com/docs/en/server-managed-settings, code.claude.com/docs/en/mcp, code.claude.com/docs/en/permission-modes (cited via cross-reference from the settings page).

All direct quotes in sections 0, 2, 3, and 6 are from the Anthropic canonical docs (sources 1-3). Practitioner observations in section 3 edge cases and section 5 migration patterns are marked as **observed patterns** drawn from community references (sources 4-7) where no explicit Anthropic guidance exists.

---

**Word count:** ~3,400 words. Scope covered: file locations (section 1), precedence and merge semantics with diagram and conflict examples (section 2), the core decision framework with global/project/local tables plus seven edge cases (section 3), five concrete paired settings.json examples (section 4), migration patterns including local->project promotion and team adoption (section 5), eleven anti-patterns (section 6), quick lookup table (section 7), verification command (section 8), and cited sources (section 9).
