---
id: R3
title: "Permissions Deep Dive: Syntax, Semantics, and Edge Cases"
campaign: "Claude Code Settings + Permissions 2026"
researcher: "R3"
model: "claude-opus-4-7"
date: "2026-04-17"
word_target: "3500-5000"
primary_sources:
  - "https://code.claude.com/docs/en/permissions"
  - "https://code.claude.com/docs/en/settings"
  - "https://code.claude.com/docs/en/permission-modes"
  - "https://code.claude.com/docs/en/cli-reference"
  - "https://code.claude.com/docs/en/sub-agents"
  - "https://code.claude.com/docs/en/skills"
secondary_sources:
  - "https://dev.to/yurukusa/6-claude-code-permission-traps-i-found-answering-github-issues-this-week-3ja2"
status: "DRAFT v1"
---

# R3: Permissions Deep Dive

## 1. Abstract

Claude Code's permissions system is the **decision plane** that sits between Claude's tool calls and actual execution. It answers three questions for every tool invocation: is this tool allowed at all, does it match an approved pattern, and if it's denied, can anything override the denial? The answers come from a tiered evaluation that runs in a strictly enforced order: **deny -> ask -> allow**, with a first-match-wins resolver. Nothing - not a hook, not an allow rule, not a CLI flag, not even `bypassPermissions` mode - can override a matching deny rule from managed settings.

The rule grammar is compact but deceptively rich. A rule is either a bare tool name (`Bash`, `Read`, `WebFetch`) or a tool name with a parenthesised specifier (`Bash(npm run test *)`, `Read(//Users/alice/secrets/**)`, `WebFetch(domain:example.com)`, `mcp__puppeteer__*`). Specifier semantics differ per tool: Bash uses a wildcard pattern over the command string with process-wrapper stripping, Read/Edit/Write use **gitignore-style globs with a four-prefix path convention** (`//absolute`, `~/home`, `/project-root-relative`, `./cwd-relative`), WebFetch uses a domain matcher, MCP uses server+tool hierarchical names with `*` wildcards, and Agent uses subagent-type names.

Around the rules sit six **permission modes** (`default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`) that set the baseline of what auto-approves. Modes layer with rules - rules always take precedence over modes except in `bypassPermissions`, which skips the permission layer entirely apart from a hardcoded list of **protected paths** (`.git`, `.vscode`, `.idea`, `.husky`, parts of `.claude`, and sensitive config files like `.bashrc`).

The system has several known weak points. Bash patterns are fragile against compound commands, unexpected flags like `git -C`, environment variable wrappers, URL redirects, and CLI options whose argument order the pattern didn't anticipate. Permission rules only govern Claude's direct tool calls, not what Bash subprocesses do under the hood (so `Read(./.env)` deny still permits `cat .env`). On Windows, file-based Edit/Write rules can silently no-op. The production-grade answer for adversarial enforcement is either **sandboxing** (OS-level seccomp/sandbox-exec boundaries) or **PreToolUse hooks** that see the raw tool input before pattern matching happens.

This report dissects every field (`permissions.allow`, `permissions.ask`, `permissions.deny`, `permissions.additionalDirectories`, `permissions.defaultMode`, `permissions.disableBypassPermissionsMode`, `permissions.disableAutoMode`, `skipDangerousModePermissionPrompt`), every tool matcher, every mode, every CLI flag (`--allowedTools`, `--disallowedTools`, `--permission-mode`, `--dangerously-skip-permissions`, `--add-dir`, `--tools`), and every edge case documented in official docs plus community-reported traps.

## 2. Formal Syntax: `Tool`, `Tool(specifier)`, `mcp__server__tool`

Per `/en/permissions#permission-rule-syntax`:

> Permission rules follow the format `Tool` or `Tool(specifier)`.

Three canonical forms:

| Form | Meaning | Example |
| :--- | :--- | :--- |
| `Tool` | All uses of the tool | `Bash`, `WebFetch`, `Read` |
| `Tool(specifier)` | A pattern-matched subset | `Bash(npm run test *)`, `Read(./.env)` |
| `mcp__server__tool` | A specific MCP tool, or `mcp__server__*` / `mcp__server` for all tools on a server | `mcp__puppeteer__navigate`, `mcp__puppeteer__*`, `mcp__puppeteer` |

Two equivalences are worth memorising:

1. `Bash(*)` is documented as equivalent to `Bash`: both match **all** Bash commands.
2. The colon-star suffix `Tool(prefix:*)` is equivalent to `Tool(prefix *)` with a trailing space-wildcard - but **only at the very end of a pattern**. In a middle position, the colon is treated literally: `Bash(git:* push)` does NOT match `git push origin main`, because the colon is read as part of the command string, not as wildcard syntax.

The three-array shape of the `permissions` object in `settings.json`:

```json
{
  "permissions": {
    "allow":  ["Tool(spec)", "Tool2"],
    "ask":    ["Tool(spec)"],
    "deny":   ["Tool(spec)"],
    "additionalDirectories": ["../docs/"],
    "defaultMode": "default",
    "disableBypassPermissionsMode": "disable",
    "disableAutoMode": "disable",
    "skipDangerousModePermissionPrompt": true
  }
}
```

**Evaluation order** (verbatim from docs):

> Rules are evaluated in order: **deny -> ask -> allow**. The first matching rule wins, so deny rules always take precedence.

This is the single most important invariant. If a command matches both a deny rule and an allow rule, the deny rule wins, full stop.

## 3. Tool Reference Table (15+ Tools, With Matcher Examples)

Based on docs cross-referenced with `/en/tools-reference` (built-in tools) and `/en/sub-agents`:

| Tool | Bare rule | Specifier syntax | Example rule | Matches | Does NOT match |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Bash** | `Bash` | `Bash(cmd-pattern)` with `*` wildcards | `Bash(npm run test *)` | `npm run test foo`, `timeout 30 npm run test foo` | `npm run testfoo` (no space), `npm test` |
| **Read** | `Read` | `Read(gitignore-glob)` | `Read(./.env)` | `<cwd>/.env` | `<cwd>/.env.local`, `cat .env` via Bash |
| **Edit** | `Edit` | `Edit(gitignore-glob)` | `Edit(/src/**/*.ts)` | `<project-root>/src/**/*.ts` | Files outside project root |
| **Write** | `Write` | `Write(gitignore-glob)` | `Write(./output/*.log)` | `<cwd>/output/*.log` | Nested subdirs without `**` |
| **MultiEdit** | covered by `Edit` rules | same as Edit | `Edit(/src/**)` | Both Edit and MultiEdit calls | - |
| **WebFetch** | `WebFetch` | `WebFetch(domain:host)` | `WebFetch(domain:github.com)` | `https://github.com/...` | `https://raw.githubusercontent.com/...` (different host) |
| **WebSearch** | `WebSearch` | Not documented with specifier | `WebSearch` | All web searches | - |
| **Grep** | `Grep` | Best-effort Read rules apply | `Grep` | All grep calls | - |
| **Glob** | `Glob` | Best-effort Read rules apply | `Glob` | All glob calls | - |
| **Agent** (aka Task) | `Agent` | `Agent(subagent-name)` | `Agent(Explore)`, `Agent(my-custom-agent)` | Spawning that specific subagent | Other subagent types |
| **Skill** | `Skill` | `Skill(name)` or `Skill(name *)` | `Skill(commit)`, `Skill(review-pr *)` | Exact match or prefix match with args | Other skill names |
| **TodoWrite** | `TodoWrite` | Not typically restricted | `TodoWrite` | All todo writes | - |
| **NotebookEdit** | `NotebookEdit` | Treated like Edit | `NotebookEdit` | All notebook cell edits | - |
| **MCP (per server)** | `mcp__<server>` | - | `mcp__puppeteer` | All Puppeteer tools | - |
| **MCP (wildcard)** | `mcp__<server>__*` | - | `mcp__puppeteer__*` | All Puppeteer tools | - |
| **MCP (specific)** | `mcp__<server>__<tool>` | - | `mcp__puppeteer__puppeteer_navigate` | Exactly that tool | Other tools on same server |

Note on naming: `Agent` is the current name. Per `/en/sub-agents`: *"In version 2.1.63, the Task tool was renamed to Agent. Existing `Task(...)` references in settings and agent definitions still work as aliases."* Both names resolve to the same rule.

## 4. Bash Matcher Patterns (the Complex Scope)

Bash is the most expressive and the most error-prone tool matcher. Its full semantics per `/en/permissions#bash`:

### 4.1 Wildcard mechanics

A single `*` matches any sequence of characters **including spaces**. One wildcard can therefore span multiple arguments.

| Pattern | Matches | Does NOT match |
| :--- | :--- | :--- |
| `Bash(npm run build)` | `npm run build` (exact) | `npm run build --watch`, `npm run build:prod` |
| `Bash(npm run test *)` | `npm run test`, `npm run test foo`, `npm run test --watch` | `npm run testing` (no space after `test`) |
| `Bash(npm *)` | `npm install`, `npm run foo`, `npm ci` | `npmx install` (no space after `npm`) |
| `Bash(* install)` | `npm install`, `yarn install`, `apt install` | `npm install lodash` (trailing text) |
| `Bash(git * main)` | `git checkout main`, `git log --oneline main`, `git push origin main`, `git merge main` | `git main` (no middle segment) |
| `Bash(git:*)` | `git log --oneline --all`, `git status`, `git push` | - (broad catch-all for git) |

### 4.2 Word boundary from trailing space-star

The space before the trailing `*` enforces a **word boundary**:

| Pattern | `ls -la` | `lsof -i :80` |
| :--- | :--- | :--- |
| `Bash(ls *)` | matches | does NOT match |
| `Bash(ls*)` | matches | matches |

Rule: `Bash(ls *)` is equivalent to `Bash(ls:*)` (both require a space or end-of-string after `ls`). `Bash(ls*)` has no word-boundary constraint and matches any prefix extension.

### 4.3 Compound commands

Per docs:

> Claude Code is aware of shell operators, so a rule like `Bash(safe-cmd *)` won't give it permission to run the command `safe-cmd && other-cmd`. The recognized command separators are `&&`, `||`, `;`, `|`, `|&`, `&`, and newlines. A rule must match each subcommand independently.

When a user approves a compound command with "Yes, don't ask again", Claude Code stores **a separate rule per subcommand** (up to 5 rules per compound). So approving `git status && npm test` generates an `npm test` rule (and a `cd` rule if one was embedded).

### 4.4 Process wrapper stripping

A fixed, non-configurable allowlist of wrappers is stripped before matching:

| Stripped wrapper | Example | Effective match |
| :--- | :--- | :--- |
| `timeout` | `timeout 30 npm test` | `npm test` |
| `time` | `time curl foo` | `curl foo` |
| `nice` | `nice -n 10 build.sh` | `build.sh` |
| `nohup` | `nohup long-job` | `long-job` |
| `stdbuf` | `stdbuf -o0 tail -f log` | `tail -f log` |
| `xargs` (bare only) | `xargs grep pattern` | `grep pattern`; BUT `xargs -n1 grep` is NOT stripped because it has flags |

Dev-env runners like `direnv exec`, `devbox run`, `mise exec`, `npx`, `docker exec` are **NOT stripped**. That is deliberate - otherwise `Bash(devbox run *)` would implicitly grant execution of whatever the inner command turns out to be, including `devbox run rm -rf .`. Instead, write rules like `Bash(devbox run npm test)` per inner command.

### 4.5 Built-in read-only commands (no prompt, in every mode)

Non-configurable set: `ls`, `cat`, `head`, `tail`, `grep`, `find`, `wc`, `diff`, `stat`, `du`, `cd`, and read-only forms of `git`. These run without prompting regardless of mode. To require a prompt for one, add an `ask` or `deny` rule.

Unquoted globs are permitted for commands whose every flag is read-only (`ls *.ts`, `wc -l src/*.py`). But `find`, `sort`, `sed`, `git` still prompt when an unquoted glob appears, because the glob could expand into a write-capable flag like `-delete`.

A `cd` into your working directory or an additional directory is also read-only. `cd packages/api && ls` runs without prompt. Combining `cd` with `git` in a compound command always prompts, regardless of directory.

### 4.6 Fragility: documented anti-patterns

The Bash section ends with a pointed warning about argument-constraining patterns:

> Bash permission patterns that try to constrain command arguments are fragile. For example, `Bash(curl http://github.com/ *)` intends to restrict curl to GitHub URLs, but won't match variations like:
>
> - Options before URL: `curl -X GET http://github.com/...`
> - Different protocol: `curl https://github.com/...`
> - Redirects: `curl -L http://bit.ly/xyz` (redirects to github)
> - Variables: `URL=http://github.com && curl $URL`
> - Extra spaces: `curl  http://github.com`

Community-documented extensions of the same problem (from the dev.to traps article):

- **Trap 6 - flags Claude adds that your pattern didn't predict**: `Bash(git status:*)` breaks when Claude runs `git -C /path status`, because `-C /path` appears between `git` and `status`.
- **Trap 2 - trailing wildcards don't match zero arguments**: `Bash(ssh * uptime *)` requires at least one character after the wildcard, so plain `ssh host uptime` prompts.

For adversarial command filtering, docs recommend either deny rules on `curl`/`wget` + `WebFetch(domain:...)` for allowed outbound, or `PreToolUse` hooks that see the raw command.

## 5. WebFetch Domain Patterns

WebFetch has one documented specifier form: `WebFetch(domain:<hostname>)`. Per docs:

> `WebFetch(domain:example.com)` matches fetch requests to example.com.

| Pattern | Matches | Does NOT match |
| :--- | :--- | :--- |
| `WebFetch(domain:github.com)` | `https://github.com/anthropic/claude-code` | `https://raw.githubusercontent.com/...`, `https://api.github.com/...` (different subdomain) |
| `WebFetch` (bare) | all web fetches | - |
| `WebFetch` in deny | all web fetches blocked | - |

Important caveat: **WebFetch permissions govern only the WebFetch tool**, not the network. If Bash is allowed, Claude can bypass WebFetch entirely by running `curl` or `wget`. For true network containment you need the sandbox's `network.allowedDomains` (Linux/macOS), or a deny rule on `curl`/`wget`/`nc`/etc., or both.

Subdomain matching is exact: `WebFetch(domain:example.com)` does not cover `api.example.com`. For broader coverage, either list each subdomain explicitly or use the sandbox `allowedDomains` array, which supports `*.example.com` wildcards. Note that the sandbox domain syntax is **separate** from the permission rule syntax - sandbox wildcards do not work inside `WebFetch(...)` specifiers.

## 6. File-Based Tools (Read / Edit / Write): gitignore Glob with Four Prefixes

Read, Edit, and Write rules follow the gitignore specification **with a four-prefix path convention unique to Claude Code**. This is where most cross-platform bugs live.

### 6.1 The four path prefixes

| Prefix | Meaning | Example | Matches |
| :--- | :--- | :--- | :--- |
| `//path` | **Absolute** path from filesystem root | `Read(//Users/alice/secrets/**)` | `/Users/alice/secrets/**` |
| `~/path` | Path from **home** directory | `Read(~/Documents/*.pdf)` | `$HOME/Documents/*.pdf` |
| `/path` | Path **relative to project root** | `Edit(/src/**/*.ts)` | `<project-root>/src/**/*.ts` |
| `path` or `./path` | Path **relative to current directory** | `Read(*.env)` | `<cwd>/*.env` |

The docs flag the most common footgun in a Warning block:

> A pattern like `/Users/alice/file` is NOT an absolute path. It's relative to the project root. Use `//Users/alice/file` for absolute paths.

### 6.2 Windows path normalisation

Paths are normalised to POSIX form before matching:

- `C:\Users\alice` becomes `/c/Users/alice`.
- To match `.env` anywhere on `C:`, use `//c/**/.env`.
- To match `.env` across all drives, use `//**/.env`.

Community note (Trap 3 from dev.to): file-based Edit/Write rules have been reported to silently no-op on Windows in VS Code in some versions (`Edit(.claude/*)` had no effect), while Bash rules still worked. Test rules in the actual Windows environment before relying on them; when in doubt, back up Edit rules with sandbox `filesystem.denyWrite` paths.

### 6.3 Gitignore glob semantics

Standard gitignore rules:

- `*` matches a single path segment (no slashes crossed).
- `**` matches across directory boundaries.
- Directory-bounded patterns need explicit `**` for recursive descent.

| Pattern | Matches | Does NOT match |
| :--- | :--- | :--- |
| `Read(src/*)` | `<cwd>/src/foo.ts` | `<cwd>/src/components/Button.tsx` (needs `**`) |
| `Read(src/**)` | `<cwd>/src/` and all descendants | - |
| `Edit(/docs/**)` | `<project>/docs/**` | `/docs/` (absolute), `<project>/.claude/docs/` (wrong ancestor) |
| `Read(~/.zshrc)` | exactly `~/.zshrc` | `~/.zsh_history` |
| `Edit(//tmp/scratch.txt)` | exactly `/tmp/scratch.txt` | `/tmp/scratch.md` |
| `Read(*.env)` | `<cwd>/*.env` | nested files in subdirs |

### 6.4 Read rules apply "best-effort" to related tools

Docs say:

> `Edit` rules apply to all built-in tools that edit files. Claude makes a best-effort attempt to apply `Read` rules to all built-in tools that read files like Grep and Glob.

"Best-effort" is the key phrase - don't rely on `Read(./.env)` to hide `.env` from Grep with 100% reliability. Use a deny rule, ideally at the managed level.

### 6.5 Read/Edit rules do not bind Bash subprocesses

This is in a Warning block:

> Read and Edit deny rules apply to Claude's built-in file tools, not to Bash subprocesses. A `Read(./.env)` deny rule blocks the Read tool but does not prevent `cat .env` in Bash. For OS-level enforcement that blocks all processes from accessing a path, [enable the sandbox](/en/sandboxing).

This is the most important operational implication of the permission system: **permissions govern Claude's tool calls, not the OS**. Sandboxing is the layer that enforces filesystem/network boundaries on subprocesses.

### 6.6 Symlink semantics (asymmetric allow vs deny)

When Claude accesses a symlink, permission rules check **two paths**: the symlink and its resolution target. Allow and deny treat the pair asymmetrically:

- **Allow rules**: apply only when **both** symlink path and target match. A symlink inside an allowed directory that points outside still prompts.
- **Deny rules**: apply when **either** symlink path or target matches.

Example: with `Read(./project/**)` allowed and `Read(~/.ssh/**)` denied, a symlink at `./project/key` -> `~/.ssh/id_rsa` is blocked - the target fails allow, and matches deny.

## 7. MCP Permissions

MCP tool names follow the format `mcp__<server-name>__<tool-name>`. Three levels of granularity per `/en/permissions#mcp`:

| Rule | Matches |
| :--- | :--- |
| `mcp__puppeteer` | any tool provided by the `puppeteer` server |
| `mcp__puppeteer__*` | wildcard form - equivalent to above |
| `mcp__puppeteer__puppeteer_navigate` | only the `puppeteer_navigate` tool |

The server name is the name configured in Claude Code (typically in `.mcp.json` or from plugin MCP registration), not the vendor's package name.

Related managed-only controls beyond permissions:

- `allowedMcpServers` (managed settings): allowlist of MCP servers users can configure.
- `deniedMcpServers` (managed settings): denylist.
- `allowManagedMcpServersOnly` (managed settings): when `true`, only managed-defined servers are respected; users can still add servers but only the admin list applies.
- `enabledMcpjsonServers` / `disabledMcpjsonServers`: allow/reject specific servers from `.mcp.json` files.
- `enableAllProjectMcpServers: true`: auto-approve all MCP servers in `.mcp.json`.

These sit next to `permissions.allow/deny` and operate on MCP server identity rather than per-tool patterns.

## 8. Priority: Allow vs Deny Logic

### 8.1 The canonical evaluation order

> Rules are evaluated in order: deny -> ask -> allow. The first matching rule wins, so deny rules always take precedence.

Combined with the **settings precedence** (next section), this produces a two-dimensional matrix where every tool call asks:

1. Which scopes contributed rules? (managed, CLI args, local project, project, user)
2. Within those contributions, does any deny match? If yes, block.
3. If no deny, does any ask match? If yes, prompt.
4. If no ask, does any allow match? If yes, auto-approve.
5. If nothing matches, fall back to the active permission mode's default behaviour.

### 8.2 Conflict resolution table

Five practical scenarios:

| Scenario | Rules | User action | Outcome |
| :--- | :--- | :--- | :--- |
| 1. User allows, project denies | User: `allow: ["Bash(npm run *)"]`. Project: `deny: ["Bash(npm run *)"]` | Claude tries `npm run build` | **Blocked** - project setting takes precedence over user |
| 2. Managed denies, --allowedTools tries to allow | Managed: `deny: ["Bash(rm *)"]`. CLI: `--allowedTools "Bash(rm *)"` | Claude tries `rm -rf foo` | **Blocked** - managed deny cannot be overridden by any flag |
| 3. Allow and ask both match | `allow: ["Bash(git:*)"]`, `ask: ["Bash(git push *)"]` | Claude tries `git push origin main` | **Auto-approved** per dev.to Trap 1: "`allow` cancels `ask`; everything auto-approves." Deny -> ask -> allow is the literal order but first-match-wins means allow triggers in the final pass and ask is skipped |
| 4. Deny and allow both match | `allow: ["Bash(curl *)"]`, `deny: ["Bash(curl * internal.example.com *)"]` | Claude tries `curl https://internal.example.com/secrets` | **Blocked** - deny wins |
| 5. `bypassPermissions` active + deny rule exists | Any scope: `deny: ["Edit(/src/main.ts)"]`. Mode: `bypassPermissions` | Claude tries to edit `src/main.ts` | **Blocked** - `bypassPermissions` doesn't skip deny rules from any scope; and protected paths still prompt |

Important nuance on scenario 3: the docs claim "deny -> ask -> allow" resolves as a priority order, but community reporting (dev.to Trap 1) says that when `allow` and `ask` both match, `allow` wins silently. The two statements reconcile if you read "first matching rule wins" as operating within each array but `allow` matching short-circuits the overall evaluation. The practical rule: **never rely on `ask` to add friction on top of an `allow`; if you want the prompt, remove the allow or tighten its specifier.**

### 8.3 Hooks and the priority layer

From `/en/permissions#extend-permissions-with-hooks`:

> Hook decisions do not bypass permission rules. Deny and ask rules are evaluated regardless of what a PreToolUse hook returns, so a matching deny rule blocks the call and a matching ask rule still prompts even when the hook returned `"allow"` or `"ask"`.

BUT:

> A blocking hook also takes precedence over allow rules. A hook that exits with code 2 stops the tool call before permission rules are evaluated, so the block applies even when an allow rule would otherwise let the call proceed.

So the full pipeline is:

1. PreToolUse hook with exit 2 -> hard block (even over allow).
2. Deny rule (any scope) -> block.
3. Ask rule -> prompt.
4. Allow rule or hook "allow" -> auto-approve.
5. Mode default -> handles unmatched cases.

### 8.4 Settings precedence (the macro axis)

From `/en/settings#settings-precedence`:

> Permission rules follow the same settings precedence as all other Claude Code settings:
>
> 1. Managed settings (server, MDM, file-based): cannot be overridden by any other level, including command line arguments.
> 2. Command line arguments.
> 3. Local project settings (`.claude/settings.local.json`).
> 4. Shared project settings (`.claude/settings.json`).
> 5. User settings (`~/.claude/settings.json`).

Plus a critical note:

> **Array settings merge across scopes.** When the same array-valued setting (such as `sandbox.filesystem.allowWrite` or `permissions.allow`) appears in multiple scopes, the arrays are concatenated and deduplicated, not replaced.

So `permissions.allow` in managed + user + project are **unioned**, not overridden. The same applies to `deny` and `ask`. This is important because it means: adding an entry to user settings can never remove a managed entry, but it can add to the allow list in ways that managed deny still overrides (since deny wins in evaluation order).

Managed-only controls that tighten this further:

- `allowManagedPermissionRulesOnly: true` - when set in managed settings, **user and project permission rules are ignored entirely**. Only managed rules apply.

## 9. `additionalDirectories` vs `--add-dir` vs Working Directories

By default, Claude has access to files in the directory where it was launched. Three mechanisms to extend access:

| Mechanism | Scope | Persistence |
| :--- | :--- | :--- |
| `--add-dir <path>` CLI flag | this session only | ephemeral |
| `/add-dir <path>` slash command | this session only | ephemeral |
| `permissions.additionalDirectories: ["../docs/"]` in settings.json | every session in this scope | persistent |

**The three are operationally equivalent** once the session starts: files in additional directories follow the same permission rules as the original working directory. They become readable without prompts; editing follows the active permission mode.

### 9.1 What is NOT loaded from additional directories

From `/en/permissions#additional-directories-grant-file-access-not-configuration`:

> Adding a directory extends where Claude can read and edit files. It does not make that directory a full configuration root.

What IS loaded from `--add-dir` directories:

| Configuration | Loaded? |
| :--- | :--- |
| Skills in `.claude/skills/` | Yes, with live reload |
| Plugin settings in `.claude/settings.json` (only `enabledPlugins` and `extraKnownMarketplaces`) | Partial |
| CLAUDE.md / `.claude/rules/` / CLAUDE.local.md | Only when `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` env var is set |

What is NOT loaded from additional directories: **subagents, commands, output styles, hooks, and most other settings**. To share those across projects, put them in user-level `~/.claude/` or distribute via a plugin.

### 9.2 `additionalDirectories` lives inside `permissions`

Structure:

```json
{
  "permissions": {
    "additionalDirectories": ["../docs/", "/opt/shared-configs/"]
  }
}
```

Not a top-level setting.

## 10. Permission Modes (default / acceptEdits / plan / auto / dontAsk / bypassPermissions)

Six modes from `/en/permission-modes`. Each has different behaviour for unmatched calls (calls not covered by any allow/ask/deny rule):

| Mode | What runs without asking | Best for |
| :--- | :--- | :--- |
| `default` | Reads only | Sensitive work, getting started |
| `acceptEdits` | Reads + file edits + common filesystem Bash (`mkdir`, `touch`, `rm`, `rmdir`, `mv`, `cp`, `sed`), all within working dir or additionalDirectories | Iterating on code you're reviewing |
| `plan` | Reads only; file edits and shell commands denied | Exploring a codebase before changing it |
| `auto` | Everything, with a classifier model reviewing each action | Long tasks, reducing prompt fatigue |
| `dontAsk` | Only pre-approved allow rules and built-in read-only commands | Locked-down CI, scripts |
| `bypassPermissions` | Everything except protected paths | Isolated containers/VMs only |

### 10.1 Setting `defaultMode`

```json
{
  "permissions": {
    "defaultMode": "acceptEdits"
  }
}
```

Accepted values: `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`. The `--permission-mode` CLI flag overrides this for a single session.

### 10.2 How modes interact with rules

From docs: "Modes set the baseline. Layer permission rules on top to pre-approve or block specific tools in any mode **except `bypassPermissions`**, which skips the permission layer entirely."

So:

- `default` + `allow: [Bash(npm *)]` -> npm commands auto-approve, everything else prompts.
- `acceptEdits` + `deny: [Edit(/infra/prod/**)]` -> edits auto-approve except for prod infra.
- `bypassPermissions` + `deny: [Bash(rm -rf /)]` -> still blocks because deny runs even in bypass mode for managed deny rules, but docs are ambiguous on whether bypass ignores non-managed deny. Safe reading: managed deny always applies; other denies may be bypassed. The Warning on `bypassPermissions` explicitly says writes to protected paths still prompt.

### 10.3 `auto` mode classifier details

Auto mode routes every action to a classifier model that decides based on:

- The working directory and configured git remotes = trusted by default.
- Everything else = external until declared via `autoMode.environment`.
- On entering auto mode, broad allow rules like `Bash(*)`, `Bash(python*)`, package-manager run commands, and `Agent` allow rules are **dropped**. Narrow rules like `Bash(npm test)` carry over. They're restored when leaving auto mode.
- Repeated blocks (3 consecutive or 20 total) pause auto mode and fall back to prompting.

Auto mode has hard requirements: Max/Team/Enterprise/API plan, Sonnet 4.6 / Opus 4.6 / Opus 4.7 model (Opus 4.7 only on Max), Anthropic API provider (not Bedrock/Vertex/Foundry).

### 10.4 `dontAsk` mode for CI

> `dontAsk` mode auto-denies every tool call that would otherwise prompt. Only actions matching your `permissions.allow` rules and read-only Bash commands can execute; explicit `ask` rules are denied rather than prompting.

Set via `--permission-mode dontAsk`. Never appears in the `Shift+Tab` cycle.

### 10.5 `bypassPermissions` and protected paths

> Writes to `.git`, `.claude`, `.vscode`, `.idea`, and `.husky` directories still prompt for confirmation to prevent accidental corruption of repository state, editor configuration, and git hooks. Writes to `.claude/commands`, `.claude/agents`, and `.claude/skills` are exempt and do not prompt.

Full protected list:

**Directories:**
- `.git`
- `.vscode`
- `.idea`
- `.husky`
- `.claude` (except `.claude/commands`, `.claude/agents`, `.claude/skills`, `.claude/worktrees`)

**Files:**
- `.gitconfig`, `.gitmodules`
- `.bashrc`, `.bash_profile`, `.zshrc`, `.zprofile`, `.profile`
- `.ripgreprc`
- `.mcp.json`, `.claude.json`

Community note (Trap 4): this set is intentional as of v2.1.78 but under-documented. Some users expected `--dangerously-skip-permissions` to be truly unconstrained; it isn't.

### 10.6 Disabling modes

| Setting | Effect |
| :--- | :--- |
| `permissions.disableBypassPermissionsMode: "disable"` | Prevents `bypassPermissions` from being activated; disables `--dangerously-skip-permissions` |
| `permissions.disableAutoMode: "disable"` | Prevents `auto` from being activated; rejects `--permission-mode auto` |

Both work from any scope but are typically set in managed settings. A user can set `disableBypassPermissionsMode` in their own settings to lock themselves out.

### 10.7 `skipDangerousModePermissionPrompt`

```json
{
  "permissions": {
    "skipDangerousModePermissionPrompt": true
  }
}
```

Skips the confirmation prompt shown before entering bypass mode via `--dangerously-skip-permissions` or `defaultMode: "bypassPermissions"`. **Ignored in project settings** (`.claude/settings.json`) to prevent untrusted repos from auto-bypassing the prompt. Valid in user, local, and managed settings.

## 11. `allowedTools` vs `permissions.allow` Across Contexts

The `allowedTools` concept appears in four places with related but distinct semantics. This is a common source of confusion.

### 11.1 `--allowedTools` CLI flag

From `/en/cli-reference`:

> `--allowedTools`: Tools that execute without prompting for permission. See permission rule syntax for pattern matching. To restrict which tools are available, use `--tools` instead.

Example: `claude --allowedTools "Bash(git log *)" "Bash(git diff *)" "Read"`

Accepts the same rule syntax as `permissions.allow`. The flag merges into the effective allow set for the session. Rules survive only for that session.

### 11.2 `--disallowedTools` CLI flag

From `/en/cli-reference`:

> `--disallowedTools`: Tools that are removed from the model's context and cannot be used.

Example: `claude --disallowedTools "Bash(git log *)" "Edit"`

Semantics differ from `--allowedTools`: disallowed tools are **removed from the model's tool list entirely** - Claude doesn't see they exist, so it can't call them. This is stricter than a deny rule, which still lets the model try before being blocked.

### 11.3 `allowed-tools` in skill / command frontmatter

From `/en/skills#pre-approve-tools-for-a-skill`:

> The `allowed-tools` field grants permission for the listed tools while the skill is active, so Claude can use them without prompting you for approval. It does not restrict which tools are available: every tool remains callable, and your permission settings still govern tools that are not listed.

YAML example (note the kebab-case for skills):

```yaml
---
name: commit
description: Stage and commit the current changes
disable-model-invocation: true
allowed-tools: Bash(git add *) Bash(git commit *) Bash(git status *)
---
```

Accepts a **space-separated string** or a YAML list. Applies only while the skill is active. There is NO documented `disallowed-tools` field at the skill/command frontmatter level - to block something inside a skill, add to `permissions.deny` in settings. Per `/en/commands`, `.claude/commands/` markdown files accept the same frontmatter as skills (they've been merged into the skills system).

### 11.4 `tools` and `disallowedTools` in subagent frontmatter

From `/en/sub-agents#available-tools`:

- `tools`: allowlist. If set, the subagent can only use these tools. If omitted, inherits all tools.
- `disallowedTools`: denylist. Tools removed from the inherited or specified list.

If both are set: `disallowedTools` applies first, then `tools` resolves against the remaining pool. A tool in both is removed.

Example:

```yaml
---
name: no-writes
description: Inherits every tool except file writes
disallowedTools: Write, Edit
---
```

Subagents ALSO have `permissionMode` (`default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, `plan`) to override the session's mode. But: if the parent uses `bypassPermissions` or `acceptEdits`, the parent takes precedence. If the parent uses `auto`, the subagent inherits auto and its `permissionMode` is ignored.

### 11.5 Summary matrix

| Context | Field name | Syntax | Scope |
| :--- | :--- | :--- | :--- |
| settings.json | `permissions.allow` | JSON array of rule strings | entire session + scope-based precedence |
| settings.json | `permissions.deny` | JSON array | entire session |
| settings.json | `permissions.ask` | JSON array | entire session |
| CLI | `--allowedTools` | space-separated args | session only |
| CLI | `--disallowedTools` | space-separated args | session only |
| CLI | `--tools` | comma-separated tool names; `""`=disable all, `"default"`=all | session only |
| Skill frontmatter | `allowed-tools` | space-separated string or YAML list | while skill active |
| Command frontmatter | `allowed-tools` | same as skill | while command active |
| Subagent frontmatter | `tools` | comma-separated string or YAML list | for the subagent's runtime |
| Subagent frontmatter | `disallowedTools` | same as `tools` | for the subagent's runtime |
| Subagent `--agents` JSON | `tools`, `disallowedTools` | JSON arrays | session only |

The `/permissions` slash command (alias `/allowed-tools`) opens an interactive dialog to manage all of the above across scopes.

## 12. Edge Cases

### 12.1 Empty permissions object

What happens with `"permissions": {}` in settings.json? No allow/ask/deny arrays, no additionalDirectories, no defaultMode. Effectively: default mode behaviour applies (reads are free, bash and edits prompt), no pre-approved tools, no denied tools. Same as omitting the `permissions` key entirely.

Minimum valid object: any of the allow/ask/deny/additionalDirectories/defaultMode/disable* keys. Unknown keys trigger a JSON schema warning but don't fail the config.

### 12.2 `allow` cancels `ask`

Covered in 8.2 scenario 3: when both match, allow wins and the prompt is suppressed. Fix: remove the overlapping allow, or tighten its specifier.

### 12.3 Trailing wildcards requiring at least one char

Covered in 4.6: `Bash(ssh * uptime *)` requires at least one character after the trailing `*`. Plain `ssh host uptime` prompts. Fix: use two rules, `Bash(ssh * uptime)` AND `Bash(ssh * uptime *)`.

### 12.4 Compound commands skirting prefix rules

`Bash(safe-cmd *)` does NOT permit `safe-cmd && other-cmd` - each subcommand is matched independently. This is correct behaviour; the trap is that users expect chaining to "inherit" permission. It doesn't.

### 12.5 Claude inserting unexpected flags

Trap 6: `Bash(git status:*)` breaks when Claude runs `git -C /path status`. Mitigation: write patterns that accept optional flags between tokens, e.g. `Bash(git *status:*)`, or use PreToolUse hooks.

### 12.6 Windows file-rule silence

Trap 3: Edit/Write rules may silently no-op on Windows in VS Code. Mitigation: duplicate rules as sandbox `filesystem.denyWrite` paths, and test with `claude --tools` explicitly.

### 12.7 Symlink denial traverses both paths

Covered in 6.6: a symlink inside an allowed directory pointing to a denied target is blocked. This is defensive; it means `Read(./project/**)` alone is insufficient when `./project/` contains symlinks to sensitive files. Pair allows with explicit denies.

### 12.8 `Read(./.env)` deny doesn't stop `cat .env`

Covered in 6.5: permission rules govern Claude's tools, not Bash subprocesses. Add `Bash(cat .env)` and `Bash(cat * .env *)` denies, or enable sandboxing.

### 12.9 `xargs` with flags breaks wrapper stripping

`Bash(grep *)` matches `xargs grep pattern` (bare `xargs` stripped) but NOT `xargs -n1 grep pattern` (flags prevent stripping; matched as an `xargs` command). Write explicit `Bash(xargs *)` rules if you need xargs.

### 12.10 `/path` is project-relative, not absolute

Trap: `Read(/Users/alice/secret)` reads from `<project-root>/Users/alice/secret`, not `/Users/alice/secret`. Use `//Users/alice/secret` for true absolute.

### 12.11 `bypassPermissions` cycle only after starting with it

You cannot enter `bypassPermissions` from a session that was started without `--permission-mode bypassPermissions`, `--dangerously-skip-permissions`, or `--allow-dangerously-skip-permissions`. Restart with one of those flags to enable it. `--allow-` variant adds it to the cycle without activating.

### 12.12 `auto` mode drops broad allow rules

On entering auto mode, `Bash(*)`, `Bash(python*)`, package-manager run wildcards, and `Agent` allow rules are dropped. They return when leaving auto mode. Consequence: don't rely on broad allow rules for CI-like "just do it" semantics when auto might be active; use narrow rules.

### 12.13 Boundaries in conversation decay after context compaction

Auto mode respects boundaries you state in chat ("don't push to main") as block signals. But these boundaries are re-read from the transcript on each classifier check - context compaction can remove the message that stated them. For a hard guarantee, add a `permissions.deny` rule.

### 12.14 Protected files cover ~ shell dotfiles

Protected files (`.bashrc`, `.zshrc`, etc.) are protected **everywhere they appear**, not only in the project root. So `bypassPermissions` won't let Claude modify your home `~/.bashrc` without a prompt.

## 13. Niejasne (CRITIC)

Claims in this report that I flag as ambiguous and worth user verification:

1. **Allow vs ask precedence (Section 8.2 scenario 3)**: official docs say "deny -> ask -> allow" is the evaluation order with first-match-wins, but the community report (dev.to Trap 1) shows allow short-circuits ask. The reconciliation I gave (allow wins within its array when first-match-wins is evaluated per-array) is plausible but not explicitly documented. A direct test or official clarification would help.

2. **Windows Edit/Write silence (Trap 3)**: community-reported but not acknowledged in the official docs. Unclear if it affects current CLI versions or only specific v2.x branches. Users on Windows should verify in their environment.

3. **Deny bypass under `bypassPermissions`**: docs are clear that managed deny rules always apply, and that protected paths always prompt. But they're less clear whether a non-managed deny rule (user/project/local) still fires when `bypassPermissions` is active outside of protected paths. The dev.to traps article implies non-managed denies may be bypassed. Needs confirmation.

4. **`Task` -> `Agent` rename backward compatibility**: docs say existing `Task(...)` references still work as aliases. Unclear whether this applies only to frontmatter or also to `permissions.allow` entries like `Task(Explore)`. Assume it does, but test.

5. **MCP server name semantics**: docs use "the name configured in Claude Code" for MCP servers. The exact rules for servers registered via plugins with namespacing (`plugin:server@marketplace`) versus `.mcp.json` entries versus inline `mcpServers` in subagent frontmatter aren't stated in one place. Edge cases with namespaced server names in permission rules are underspecified.

6. **`additionalDirectories` path semantics**: docs give `["../docs/"]` as example but don't state which of the four path prefixes apply here. Empirically assume shell-relative-to-cwd, but the rule syntax for file tools is different from this setting.

7. **Interaction between `allowManagedPermissionRulesOnly` and array merging**: if managed settings set this flag to `true`, do user/project allow arrays get dropped entirely, or are they evaluated but can never grant what managed didn't? Docs say "only rules in managed settings apply" which implies the former, but merging semantics elsewhere imply the latter.

8. **`--tools ""` vs omitting**: docs say `--tools ""` disables all tools. Whether this also disables read-only bash commands (which normally bypass permission prompts) is not specified.

## 14. Bibliografia

Official documentation (primary):

1. **Configure permissions** - `https://code.claude.com/docs/en/permissions` - the single most comprehensive source; contains the rule syntax reference, tool-specific matchers, modes overview, managed settings, sandbox interaction, auto-mode classifier, settings precedence. All major sections of this report cite from here.
2. **Claude Code settings** - `https://code.claude.com/docs/en/settings` - permissions table (allow/ask/deny/additionalDirectories/defaultMode/disableBypassPermissionsMode/skipDangerousModePermissionPrompt), sandbox settings block, settings precedence, array merging note.
3. **Choose a permission mode** - `https://code.claude.com/docs/en/permission-modes` - six-mode table, mode-switching mechanics (Shift+Tab, CLI flags, VS Code UI mapping), auto mode full requirements and classifier behaviour, protected paths list, bypassPermissions constraints.
4. **CLI reference** - `https://code.claude.com/docs/en/cli-reference` - `--allowedTools`, `--disallowedTools`, `--tools`, `--permission-mode`, `--dangerously-skip-permissions`, `--allow-dangerously-skip-permissions`, `--add-dir`, `--permission-prompt-tool` flags.
5. **Create custom subagents** - `https://code.claude.com/docs/en/sub-agents` - `tools`, `disallowedTools`, `permissionMode`, `Agent(subagent)` matcher, `--agents` JSON, permission mode inheritance rules.
6. **Extend Claude with skills** - `https://code.claude.com/docs/en/skills` - `allowed-tools` frontmatter field, `Skill(name)` permission syntax, skill-command unification.
7. **Commands reference** - `https://code.claude.com/docs/en/commands` - `/permissions` (alias `/allowed-tools`), `/add-dir` slash command.

Community sources (secondary):

8. **6 Claude Code Permission Traps I Found Answering GitHub Issues This Week** - `https://dev.to/yurukusa/6-claude-code-permission-traps-i-found-answering-github-issues-this-week-3ja2` - Yurukusa, 2026 - six edge cases: allow cancels ask, trailing wildcards and zero args, Windows file-rule silence, protected dirs ignore bypass, /model delay, Claude inserting `-C` flags.
9. **Stop Fighting Claude Code's Permission Prompts - Here's How the System Actually Works** - `https://medium.com/@tonimaxx/stop-fighting-claude-codes-permission-prompts-here-s-how-the-system-actually-works-ae594e59fb13` - Toni Maxx, Mar 2026 - overview of the permission flow and mode selection logic.
10. **How to Fix Claude Code's Broken Permissions (With Hooks)** - `https://dev.to/boucle2026/how-to-fix-claude-codes-broken-permissions-with-hooks-23gl` - Boucle, 2026 - argues for PreToolUse hooks as the production-grade enforcement layer because the built-in matcher misses compound commands, pipes, and subshells.
11. **Claude Code Will Do Anything You Let It** - `https://medium.com/@ayeshamughal21/claude-code-will-do-anything-you-let-it-heres-how-to-control-what-that-is-f2037ff9f704` - Ayesha Mughal, Mar 2026 - practical deny-list patterns for secrets and infrastructure.

Related official pages referenced but not deeply quoted:

12. **Sandboxing** - `https://code.claude.com/docs/en/sandboxing` - OS-level filesystem and network isolation that complements permissions for Bash subprocesses.
13. **Hooks** - `https://code.claude.com/docs/en/hooks-guide` - PreToolUse hooks as the runtime enforcement extension to permission rules; exit code 2 blocks before rules evaluate.
14. **Server-managed settings** - `https://code.claude.com/docs/en/server-managed-settings` - fail-closed enforcement via `forceRemoteSettingsRefresh`.
15. **Anthropic Claude Code GitHub repo** - `https://github.com/anthropics/claude-code/tree/main/examples/settings` - starter settings configurations for common deployment scenarios.

All URLs accessed 2026-04-17.
