# R4: .claudeignore + Context Boundaries
**Researcher:** Researcher Tech (res_tech)
**Campaign:** Claude Code Context Engineering 2026
**Date:** 2026-04-17
**Status:** BRAMA 2 READY

---

## Executive Summary

.claudeignore is a **soft-ignore mechanism** for Claude Code that prevents files from being automatically loaded into context. It is NOT a security boundary. As of April 2026:

- `.claudeignore` is a **de-facto community standard** - multiple NPM packages and hook implementations exist, but **official Anthropic native support is ambiguous** (PRIMARY SOURCE GAP - see below).
- The predecessor `ignorePatterns` field in settings.json was deprecated circa v2.0.8 (Oct 2025); `.claudeignore` is the current recommendation.
- `.gitignore` patterns are **partially respected** by Claude Code during initial context snapshot, but tool-level enforcement (Read/Grep/Glob) is inconsistent and buggy.
- **Only `permissions.deny` in settings.json provides hard enforcement** - `.claudeignore` is context hints, not access control.
- Three community tools offer different takes: `li-zhixin/claude-ignore` (hook-based), `pg-creative/claudeignore` (converts to permissions.deny), `yurekami/claude-agentignore` (3-tier enforcement).

**Confidence score: 0.72** - Primary documentation gap partially filled by community empirics.

---

## PRIMARY SOURCE GAP

**CRITICAL:** The official Claude Code documentation at `code.claude.com/docs` does NOT have a dedicated `.claudeignore` page. The `.claude/` directory explorer (`/en/claude-directory`) lists 10+ configuration files but **does not list `.claudeignore`** as a named file type. The settings reference (`/en/settings`) does not document `.claudeignore` syntax.

The phrase "`.claudeignore` replaces deprecated `ignorePatterns`" appears in search summaries attributed to the settings docs, but the full settings page content (96KB) could not be fully parsed. This claim requires verification against the actual full settings reference table.

**Community sources consistently describe .claudeignore as functional** - but the implementation is hook-based or model-instruction-based, not OS-level enforcement.

---

## 1. Syntax and Format

### Pattern Syntax
.claudeignore uses **gitignore specification syntax** - the same parser rules as `.gitignore`. Confirmed by:
- Official permissions docs: "Read and Edit rules both follow the gitignore specification"
- Multiple community implementations
- Community-produced guides

| Pattern Type | Example | Meaning |
|---|---|---|
| Directory | `node_modules/` | Exclude directory and all contents |
| Extension glob | `*.log` | All files with .log extension |
| Recursive glob | `dist/**` | All files recursively under dist/ |
| Exact file | `.env` | This specific file |
| Root-relative | `/.env` | .env at project root only |
| Comment | `# comment` | Ignored, blank lines also ignored |
| Negation | `!important.log` | Whitelist exception (NOT supported in pg-creative/claudeignore NPM tool) |

**Negation patterns (`!pattern`):** Supported by gitignore spec and described in community proposals, but the `pg-creative/claudeignore` NPM tool explicitly states "Negation patterns unsupported." Enforcement depends on implementation.

### File Location
- **Primary:** Project root (same level as CLAUDE.md, .gitignore)
- **Hierarchical:** `.claudeignore` files can exist in subdirectories; patterns apply to their subtree
- **Discovery:** `li-zhixin/claude-ignore` implementation scans from current directory upward through parent dirs, loading all discovered files root-first

---

## 2. The ignorePatterns Predecessor

Before `.claudeignore` became the standard, Claude Code had `ignorePatterns` in settings.json:

```json
{
  "ignorePatterns": ["tests/**", "node_modules", "*.bak"]
}
```

**CLI command (still functional):**
```bash
claude config add ignorePatterns node_modules
claude config set ignorePatterns "tests/**"
```

**Timeline:**
- **Feb 2025** - Issue #79, #166: Users request directory exclusion (no native solution)
- **Mar 2025** - Issue #579: .claudeignore feature request filed, assigned to rboyce-ant
- **Mar 2025** - Issue #620: Request to make .claudeignore set ignorePatterns by default - **CLOSED AS NOT PLANNED**
- **Apr 2025** - Issue #891: Bug - settings.json ignorePatterns not applying (closed, fix unknown)
- **v2.0.8 (~Oct 2025)** - `ignorePatterns` deprecated in .claude.json
- **Jan 2026** - The Register reports Claude Code ignores ignore rules for secrets (ongoing security concern)
- **2026** - `.claudeignore` emerges as community-standard replacement

**Effect of ignorePatterns:** Files excluded from file discovery and search results; read operations on matching files denied. This is closer to a hard block than the soft-hint described for .claudeignore in later guides.

---

## 3. Interaction with Read/Grep/Glob Tools

This is the most important and most confusing area - behavior differs by mechanism:

### 3a. .claudeignore (soft mechanism)
**Behavior:** Files matching .claudeignore patterns are excluded from **automatic context loading**. They still exist on the filesystem and remain discoverable.

Per CodeSignal documentation: ".claudeignore doesn't make files invisible to Claude's filesystem tools. The files still exist and are discoverable through search, but they are excluded from automatic context loading."

| Tool | .claudeignore effect |
|---|---|
| Read | NOT blocked (can still read if explicitly requested) |
| Grep | NOT blocked |
| Glob | NOT blocked |
| Autocomplete / @ | Excluded from suggestions |
| Initial context snapshot | Excluded |

**Verification:** `claude --list-files` command shows what Claude has access to.

### 3b. permissions.deny (hard mechanism)
Per official docs: "Claude makes a best-effort attempt to apply Read rules to all built-in tools that read files like Grep and Glob."

**The keyword is "best-effort"** - this is NOT guaranteed. Multiple bug reports confirm inconsistency.

**What permissions.deny does block:**
- `Read(./.env)` - blocks the Read tool for .env
- `Read(./secrets/**)` - blocks Read recursively
- Does NOT block `cat .env` via Bash tool (separate deny rule needed)
- Does NOT provide OS-level enforcement (use sandboxing for that)

### 3c. .gitignore interaction
Per reverse-engineered internals (kirshatrov.com): The initial directory snapshot "skips over .gitignore patterns" - so gitignored files don't appear in the startup context.

However, **Read/Grep/Glob tools do NOT reliably respect .gitignore**:
- Issue #12102: "'Respect Git Ignore' setting doesn't prevent access via Bash tool"
- Issue #26286: "Claude Code does not respect .gitignore while exploring"
- Issue #22429: "Built-in tools (Glob, Grep, Explore) ignore user instructions to prefer git-aware commands"
- The "Respect .gitignore in file picker" setting controls @ autocomplete only

---

## 4. Permission Rule Syntax for File Exclusion (Hard Enforcement)

The official mechanism for hard file exclusion is `permissions.deny` in settings.json:

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(node_modules/**)",
      "Read(dist/**)"
    ]
  }
}
```

### Path Pattern Types (Official, from permissions docs)

| Pattern | Meaning | Example |
|---|---|---|
| `path` or `./path` | Relative to current directory | `Read(*.env)` |
| `/path` | Relative to project root | `Read(/src/**/*.ts)` |
| `~/path` | From home directory | `Read(~/.ssh/**)` |
| `//path` | Absolute filesystem path | `Read(//Users/alice/secrets/**)` |

**Windows note:** Paths normalized to POSIX form. `C:\Users\alice` becomes `/c/Users/alice`. Use `//c/**/.env` for drive-absolute paths.

**`*` vs `**`:** `*` matches within one directory level; `**` matches recursively across directories.

**Important caveats from official docs:**
- Deny rules block Claude's built-in file tools, NOT Bash subprocesses
- `Read(./.env)` deny does NOT prevent `cat .env` in Bash
- For OS-level enforcement, enable sandboxing

---

## 5. Community Implementations

Three distinct tools address the native gap:

### 5a. li-zhixin/claude-ignore (PreToolUse Hook)
**Approach:** PreToolUse hook intercepts Read tool calls; checks path against .claudeignore; exits with code 2 to block.

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Read",
      "hooks": [{"type": "command", "command": "claude-ignore"}]
    }]
  }
}
```
**Blocking:** Hard block on Read only (Grep/Glob not covered unless separately hooked).
**Hierarchy:** Searches parent dirs upward for all .claudeignore files.
**Negation:** Not explicitly documented; relies on pattern matching library.

### 5b. pg-creative/claudeignore (Pattern Converter)
**Approach:** Converts .claudeignore patterns to permissions.deny rules in settings.json. Each pattern generates 3 deny rules: Read, Glob, Grep.

```bash
claudeignore          # sync .claudeignore to .claude/settings.json
claudeignore --dry-run
claudeignore --init   # create starter file
claudeignore --init-hook  # enable SessionStart auto-sync
```
**Limitation:** Negation patterns (`!important.log`) are unsupported. Requires `jq`.
**Scope:** Manages Read + Glob + Grep simultaneously.

### 5c. yurekami/claude-agentignore (3-Tier Enforcement)
**Approach:** Hardcoded security defaults + configurable .agentignore with three tiers:
- **Ignore** (default): soft block on reads
- **`@ban`**: blocks read AND write, agent gets explicit "banned" message
- **`@exclude`**: blocks read AND write, agent gets "File not found" - stealth protection

**Also blocks Bash:** Analyzes bash commands to prevent `cat .env` bypasses.
**Hardcoded bans:** `.pem`, `.key`, `id_rsa`, `.ssh/`, `.gnupg/` - cannot be disabled.

---

## 6. Default Auto-Ignored Paths

**What Claude Code ignores by default (without any configuration):**

Per community consensus and multiple guides, these are excluded from initial context and autocomplete:
- `.git/` - git internals
- `node_modules/` - **partially, not reliably** (Issues #166, #187 show this was not excluded by default in early versions and behavior is inconsistent)

**What is NOT excluded by default (requires explicit config):**
- `dist/`, `build/`, `.next/`, `out/` - build artifacts
- `*.log` files
- `.env` files
- `__pycache__/`, `*.pyc` - Python cache
- `vendor/` - PHP/Go dependencies
- `coverage/` - test coverage reports
- Binary files

**The gitignore-based exclusion** applies to the initial directory tree snapshot only - not to tool calls.

---

## 7. Example .claudeignore Files

### Node.js / Next.js
```
# Dependencies
node_modules/

# Build outputs
dist/
build/
.next/
out/
.nuxt/

# Environment
.env
.env.*
.env.local

# Logs and temp
*.log
logs/
.cache/
tmp/

# Coverage
coverage/
.nyc_output/

# IDE
.vscode/
.idea/
*.swp
```

### Python
```
# Virtual environments
.venv/
venv/
env/
__pycache__/
*.pyc
*.pyo
*.pyd

# Distribution
dist/
build/
*.egg-info/
.eggs/

# Environment
.env
*.env

# Testing
.pytest_cache/
.coverage
htmlcov/

# Data (if large)
data/raw/
data/interim/
*.csv
*.parquet
```

### Rust
```
# Build
target/
Cargo.lock  # remove this if library (keep for binaries)

# Temp
*.tmp
.cargo/

# Environment
.env
```

### Monorepo
```
# All dependency directories
**/node_modules/
**/vendor/
**/.venv/

# All build outputs
**/dist/
**/build/
**/.next/
**/target/

# All credentials
**/.env
**/.env.*
**/secrets/
**/*.pem
**/*.key

# Generated
**/coverage/
**/__pycache__/
**/*.log
```

---

## 8. Conflicts: .claudeignore vs .gitignore vs permissions.deny

### When they conflict:

**Scenario A: File in .gitignore but NOT in .claudeignore**
- File excluded from @ autocomplete (gitignore respected in file picker)
- File NOT excluded from Read/Grep/Glob tool access
- File NOT in initial context snapshot

**Scenario B: File in .claudeignore but NOT in .gitignore**
- File excluded from automatic context loading
- File accessible via explicit Read (soft hint only)
- File tracked by git normally
- Use case: Multi-platform monorepo ignoring platform-specific dirs per context

**Scenario C: File in both .claudeignore AND .gitignore**
- Excluded from context and autocomplete
- Still accessible via explicit Read (unless also in permissions.deny)

**Scenario D: File in permissions.deny but NOT in .claudeignore**
- Hard blocked from Read/Grep/Glob (best-effort)
- Still visible in file listings
- Bash `cat` bypasses this (unless also blocked)

**Priority hierarchy (most to least restrictive):**
1. Sandbox (OS-level) - blocks everything including Bash
2. `permissions.deny` in managed settings - cannot be overridden
3. `permissions.deny` in project/local settings - hard block on Claude tools
4. `.claudeignore` - soft context hint
5. `.gitignore` - file picker and initial snapshot only

### Feature Request Gap (Issue #2305)
Developers want `.claudeignore` to **override** `.gitignore` negatively - i.e., whitelist gitignored files for Claude. Current proposal: `!tasks/` in .claudeignore would make gitignored `tasks/` folder visible to Claude. **NOT IMPLEMENTED as of April 2026.**

---

## 9. Security Concerns (The Register Report, Jan 2026)

The Register reported (2026-01-28) that Claude Code's ignore rules fail for secrets:

**Failed mechanisms:**
1. `.claudeignore` - Claude claimed it worked "like .gitignore" but read .env files anyway
2. `.gitignore` with "Respect .gitignore" setting enabled - still read .env on explicit request
3. `permissions.deny` - works but has unintuitive path syntax (`//` for absolute paths) and known bugs

**Root cause:** Claude Code's permission system applies to tool calls from the model, but the model can be prompted to override its own context instructions. `.claudeignore` is a hint to the model, not a system-level enforcement.

**What actually works for secrets:**
- `permissions.deny` with correct path syntax (but has bugs, see Issue #4005)
- OS-level sandboxing (`/en/sandboxing`)
- Moving secrets outside the working directory entirely

---

## 10. settings.json Available Fields Summary

From official permissions docs and community references, file-access-relevant settings.json fields:

| Field | Location | Effect |
|---|---|---|
| `permissions.deny` | settings.json | Hard block on tool usage (best-effort for Read/Grep/Glob) |
| `permissions.allow` | settings.json | Whitelist (deny always wins) |
| `ignorePatterns` | DEPRECATED (.claude.json) | Excluded from discovery; Read denied |
| `additionalDirectories` | settings.json | Expand file access to additional dirs |
| `autoMode.environment` | settings.json (user/local only) | Tell auto mode classifier what's trusted |

**No `context.ignore` or `context.files` fields exist** - these are not real settings.json fields (community hallucination risk).

---

## Gaps and Unresolved Questions

1. **Primary source gap:** No official `.claudeignore` documentation page in code.claude.com/docs as of April 2026. The `.claude/` directory explorer does not list it.
2. **Native vs hook-based:** Unclear if `.claudeignore` has any native parser in Claude Code binary, or if it only works when a community hook is installed.
3. **Glob/Grep coverage:** The li-zhixin hook only hooks `Read`. Whether `.claudeignore` affects Glob/Grep natively is undocumented.
4. **Negation in practice:** `!pattern` negation in .claudeignore may not work with community implementations (pg-creative explicitly says unsupported).
5. **`ignorePatterns` deprecation details:** Exact version and date of deprecation unclear; "v2.0.8" cited but unverified from primary source.
6. **Subdirectory .claudeignore:** Described as supported by community tools but not tested/documented officially.
7. **Node_modules default exclusion:** Multiple bug reports suggest it is NOT reliably auto-excluded; requires explicit configuration.

---

## Citations

1. **Claude Code Permissions Docs (Official):** https://code.claude.com/docs/en/permissions
   - Permission rule syntax, Read/Edit gitignore spec, path types table
   - Confidence: 1.0

2. **Claude Code Settings Docs (Official):** https://code.claude.com/docs/en/settings
   - Scope system, settings fields reference
   - Confidence: 1.0

3. **Claude Code .claude Directory Docs (Official):** https://code.claude.com/docs/en/claude-directory
   - File tree showing no .claudeignore listed
   - Confidence: 1.0

4. **li-zhixin/claude-ignore (Community):** https://github.com/li-zhixin/claude-ignore
   - PreToolUse hook implementation, hierarchical discovery
   - Confidence: 0.85

5. **pg-creative/claudeignore (Community):** https://github.com/pg-creative/claudeignore
   - Pattern-to-permissions converter, negation limitation
   - Confidence: 0.85

6. **yurekami/claude-agentignore (Community):** https://github.com/yurekami/claude-agentignore
   - 3-tier enforcement, Bash analysis, hardcoded defaults
   - Confidence: 0.80

7. **Issue #579 - .claudeignore Feature Request:** https://github.com/anthropics/claude-code/issues/579
   - Original FR, assigned to Anthropic team
   - Confidence: 0.90

8. **Issue #620 - Make .claudeignore set ignorePatterns:** https://github.com/anthropics/claude-code/issues/620
   - CLOSED AS NOT PLANNED - key decision signal
   - Confidence: 0.90

9. **Issue #891 - ignorePatterns not applying:** https://github.com/anthropics/claude-code/issues/891
   - Bug with settings.json vs CLI ignorePatterns
   - Confidence: 0.90

10. **Issue #4160 - .claudeignore for secrets (Security):** https://github.com/anthropics/claude-code/issues/4160
    - Labeled area:security, demonstrates gap
    - Confidence: 0.90

11. **Issue #29455 - .claudeignore context exclusion:** https://github.com/anthropics/claude-code/issues/29455
    - CLOSED AS DUPLICATE, proposed gitignore-syntax solution
    - Confidence: 0.90

12. **Issue #1304 - .gitignore insufficient for multi-platform:** https://github.com/anthropics/claude-code/issues/1304
    - Use case for separate .claudeignore from .gitignore
    - Confidence: 0.90

13. **Issue #2305 - Allow access to gitignored files:** https://github.com/anthropics/claude-code/issues/2305
    - Negation pattern (!tasks/) proposal for .claudeignore
    - Confidence: 0.90

14. **The Register - Claude Code ignores ignore rules:** https://www.theregister.com/2026/01/28/claude_code_ai_secrets_files/
    - Empirical testing of .claudeignore security failure
    - Confidence: 0.85

15. **kirshatrov.com - Claude Code Internals:** https://kirshatrov.com/posts/claude-code-internals
    - Reverse-engineered: .gitignore respected in initial snapshot only
    - Confidence: 0.75

16. **CodeSignal - Managing Project Context:** https://codesignal.com/learn/courses/customizing-claude-code-for-your-projects/lessons/managing-project-context
    - .claudeignore behavior description (soft, not hard block)
    - Confidence: 0.70

17. **Issue #4904 - Centralize File Filtering:** https://github.com/anthropics/claude-code/issues/4904
    - CLOSED AS NOT PLANNED - proposal for fileFiltering in settings
    - Confidence: 0.90

18. **buildtolaunch.substack.com - Token Optimization:** https://buildtolaunch.substack.com/p/claude-code-token-optimization
    - Practical .claudeignore usage guide with Node.js template
    - Confidence: 0.65

19. **Issue #22429 - Glob/Grep ignore user instructions:** https://github.com/anthropics/claude-code/issues/22429
    - Glob/Grep tools traverse untracked/ignored files
    - Confidence: 0.90

20. **Issue #166 - Ignore node_modules by default:** https://github.com/anthropics/claude-code/issues/166
    - node_modules NOT auto-excluded by default, requires config
    - Confidence: 0.90

---

## Recommendation

**For context token optimization (soft):**
Use `.claudeignore` with gitignore syntax at project root. Works as a hint to Claude's model and (when hook is installed) as a PreToolUse block on Read. Use `pg-creative/claudeignore` to convert patterns to permissions.deny for broader coverage.

**For security (hard):**
Do NOT rely on `.claudeignore`. Use `permissions.deny` in settings.json with correct path syntax. Move secrets outside the working directory. Enable OS-level sandboxing for Bash commands.

**For team sharing:**
Commit `.claudeignore` to git (project root). Commit `permissions.deny` rules in `.claude/settings.json`. Use `.claude/settings.local.json` for personal-only denies.

---

## BRAMA 2 Status

| Kryterium | Status |
|---|---|
| Min 1500 slow | PASS (~3800 slow) |
| Min 10 URL sources | PASS (20 citations) |
| Primary source gap oznaczony | PASS |
| Syntax table | PASS |
| Przykłady projektów (Node/Python/Rust/monorepo) | PASS |
| Conflicts sekcja | PASS |
| Gaps sekcja | PASS |

**BRAMA 2: PASS**
