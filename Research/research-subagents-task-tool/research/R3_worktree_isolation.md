# R3 - Worktree Isolation: Git Mechanics + Windows Caveats

**Rola:** Researcher GitHub (code samples, issue threads, worktree PRs)
**Data:** 2026-04-17
**Pytanie:** Git worktree mechanics: co jest separate (files, branch), co jest shared (git config, remote), kiedy worktree auto-cleanup, manualny ExitWorktree, konflikty gdy worktree ma zmiany, Windows caveats.

## Summary

`isolation: worktree` tworzy `.claude/worktrees/<name>/` wewnatrz repo z nowa galezia `worktree-<name>` branchujaca z `origin/HEAD`. **Separate**: working directory plikow, branch, konfiguracja per-worktree. **Shared**: `.git/objects/` (git history), `.git/refs/remotes/`, git config (user.email etc), remote connections. Cleanup: **no changes** -> auto-remove; **changes/commits** -> prompt keep/remove, **ale prompt jest BUGGY** (issue #38287 open: silent delete committed work; #27753 closed not-planned: auto-delete committed work on no-uncommitted-changes case). Subagent worktrees orphaned sa czyszczone przy startupie jesli `cleanupPeriodDays` upłynelo (default 30) + brak uncommitted + brak untracked + brak unpushed - patrz caveat "unpushed". `ExitWorktree` i `EnterWorktree` to nazwane tools Claude Code dostepne dla glownego agenta; subagent (isolation: worktree) dostaje je automatycznie. Windows specyfika: Git for Windows **disables symlinks by default** - jesli repo uzywa symlinks, worktree moze renderowac je jako text blobs (1.3 lineup). NTFS junctions (np. od pnpm) wymagaja ostrożnosci - `rm -rf` moze podazac za junction i usunac dane poza worktree (pnpm issue #10707). Alternatywa manualna: `git worktree add ../feat -b feat && cd ../feat && claude`. Docker/VM: worktree tworzy nowa sciezke - musisz zainicjalizowac env (`npm install`, `.env`) w kazdym worktree osobno. `.worktreeinclude` w project root kopuje gitignored pliki (np. `.env`) do nowych worktrees.

## Details

### 1. Oficjalna semantyka worktree w Claude Code

Zrodlo: [code.claude.com/docs/en/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees](https://code.claude.com/docs/en/common-workflows).

Cytat dosl:
*"Worktrees are created at `<repo>/.claude/worktrees/<name>` and branch from the default remote branch, which is where `origin/HEAD` points. The worktree branch is named `worktree-<name>`."*

Struktura:
```
<repo>/
  .git/                       # shared git data
  .claude/
    worktrees/
      feature-auth/            # separate working directory
        .git                   # FILE (not directory!) pointing back to parent .git
        src/                   # full checkout
      bugfix-123/              # another separate working directory
```

Kazdy worktree dostaje:
- Nowy branch `worktree-<name>` branchujacy z `origin/HEAD` (base nie konfigurowalny flagą Claude Code, ale mozna przez WorktreeCreate hook)
- Wlasny working directory z pelnym checkout plikow
- `.git` to **plik** nie katalog - zawiera pointer do wspoldzielonego `.git/` repo glownego
- Collab z sahred `.git/objects/`, `.git/refs/remotes/`, git config user (imie/email)

### 2. Uruchomienie: flagi i inline requests

**Session-wide isolation:**
```bash
claude --worktree feature-auth           # nazwany worktree
claude -w feature-auth                    # shortcut
claude --worktree                         # auto-generated name (np. "bright-running-fox")
```

**Inline request:** mozna powiedziec w aktywnej sesji: *"work in a worktree"* albo *"start a worktree"* - Claude wywoluje `EnterWorktree` tool.

**Subagent-scoped isolation:** w frontmatter:
```yaml
---
name: feature-dev
description: Develops features in parallel
isolation: worktree
---
```

Lub ad-hoc: *"use worktrees for your agents"*.

### 3. EnterWorktree tool spec

Zrodlo: [Piebald-AI/claude-code-system-prompts](https://github.com/Piebald-AI/claude-code-system-prompts/blob/main/system-prompts/tool-description-enterworktree.md) (extracted Claude Code system prompts).

**Parametry:**
- `name` (optional): nazwa nowego worktree. Brak name + path = random name generated.
- `path` (optional): sciezka do istniejacego worktree dla REMOVE - entry. Mutually exclusive z name.

**Constraints:**
- *"Use this tool ONLY when explicitly instructed to work in a worktree - either by the user directly, or by project instructions (CLAUDE.md / memory)."*
- Must be in a git repo OR have WorktreeCreate/WorktreeRemove hooks in settings.json
- Must not already be in a worktree (nested entry prohibited)

**Behavior:** creates new worktree inside `.claude/worktrees/`, new branch based on HEAD, switches session cwd.

**ExitWorktree:** allows leaving mid-session with keep/remove decision. On session exit, if still in worktree, user prompted.

### 4. Auto-cleanup mechanika

Z docs:
> **No changes**: worktree and branch removed automatically
> **Changes or commits exist**: prompts to keep or remove. Keeping preserves dir + branch. Removing discards all.

Dla subagentow: *"Each subagent gets its own worktree that is automatically cleaned up when the subagent finishes without changes."*

Orphaned cleanup (startup sweep):
*"Subagent worktrees orphaned by a crash or an interrupted parallel run are removed automatically at startup once they are older than your `cleanupPeriodDays` setting, provided they have no uncommitted changes, no untracked files, and no unpushed commits."*

Worktree created via `--worktree` (session-level) **nigdy nie jest usuwany przez sweep** - tylko subagent worktrees.

### 5. BUGI w cleanup (krytyczne dla safety)

**Issue #38287 - Worktree cleanup silently deletes branches with unmerged commits** (open, labels: bug, data-loss, has-repro):

> "When a `claude -w` worktree session ends, Claude Code silently deletes the temporary worktree branch (e.g., `worktree-expressive-painting-starfish`) even if it contains unmerged or unpushed commits. The commits become dangling objects recoverable only via `git fsck`, resulting in data loss with no user warning."

Reprodukcja:
1. `claude -w` -> worktree session
2. Make changes + commit them
3. End session
4. Branch deleted + all commits lost
5. `git log --all` shows nothing

Workaround (community): PreToolUse hook na `ExitWorktree`:
```json
{
  "hooks": [{
    "command": "bash ~/.claude/hooks/worktree-exit-guard.sh",
    "type": "command"
  }],
  "matcher": "ExitWorktree"
}
```

Expected: before delete, check `git log master..HEAD` - if commits exist, block/warn/auto-push.

**Issue #27753 - Worktree auto-deleted on exit when work is committed** (closed, status: stale, not planned):

> "Worktrees are automatically deleted when: A Claude Code session exits, there are no uncommitted changes in the worktree, even if commits have been made to the worktree branch during the session"

Closed "not planned" z labelem "stale" - Anthropic nie zamierza naprawiac. Workaround: uzyc manualny `git worktree add ... -b ...` + `cd` + `claude` zamiast `--worktree` flag.

**Issue #37611 - WorktreeCreate hook disables worktree cleanup prompt on exit** - jesli skonfigurowany hook, Claude nie wyswietla promptu o kept/remove.

### 6. Manualna kontrola: git worktree add

Jesli chcesz miec pelna kontrole (np. ze wzgledu na bugi powyzej), uzywaj git native:
```bash
# Create worktree with new branch
git worktree add ../project-feature-a -b feature-a

# Create worktree with existing branch
git worktree add ../project-bugfix bugfix-123

# Start Claude w tym worktree
cd ../project-feature-a && claude

# Cleanup when done
git worktree list
git worktree remove ../project-feature-a
```

To pozwala:
- Umiescic worktree poza repo (moze byc wygodniej dla Docker volumes, np. `/workspaces/feature-a`)
- Checkout specific existing branch zamiast tworzyc nowy
- Decyzja remove jawna, nie silent delete

### 7. Windows-specific caveats

**Symlinks w Git for Windows:**
- Git for Windows **disables symbolic link support by default** (zrodlo: [gitforwindows.org/symbolic-links.html](https://gitforwindows.org/symbolic-links.html))
- Symlinks dzialaja tylko na **NTFS i ReFS** (nie na FAT/exFAT)
- Tworzenie symlinkow wymaga **SeCreateSymbolicLink** privilege - domyslnie tylko Administrator, mozna przyznac standard userowi przez **Developer Mode** w Win 10/11
- Gdy `core.symlinks=false`, symlinks sa checkout'owane jako **plain text files** zawierajace sciezke - nie funkcjonuja jako linki
- Worktree problem: setup scripts moga tworzyc symlinks pointujace do **main repo path**, nie do worktree path - wskaznik do non-existent files (dotfiles issue #305)

**Konsekwencja dla R3:** jesli projekt uzywa symlinks (common na Unix), worktree na Windows nie bedzie mial funkcjonalnych symlinkow, chyba ze Developer Mode + `git config core.symlinks true`.

**NTFS junction danger** (pnpm issue #10707, "catastrophic data loss"):
pnpm uzywa NTFS junctions w `node_modules`. Gdy usuwasz worktree z `Remove-Item -Recurse -Force` albo `rm -rf` na MSYS, moga **follow junctions and delete real targets** poza worktree. Realny incident report w issue.

**Workaround:** Uzywaj `git worktree remove <path>` (git handle junctions safely) zamiast `rm -rf`. Nie rob `Remove-Item -Recurse -Force` na worktree z node_modules.

**Path length:** Windows ma MAX_PATH 260 znakow (chyba ze LongPathsEnabled). Struktura `<repo>/.claude/worktrees/<worktree-name>/<deep-nested-path>` moze ten limit przekroczyc - common dla Java/React projektow.

**Windows 8191-char command line limit** (recap z R1): subagent z dlugim inline promptem + `isolation: worktree` moze failowac startup. Uzywaj `.claude/agents/` plik.

### 8. Co jest shared, co separate - finalny table

| Resource | Shared (cross-worktree) | Separate (per-worktree) |
|---|---|---|
| `.git/objects/` | YES | - |
| `.git/refs/remotes/` | YES (origin/main etc) | - |
| `.git/refs/heads/` | shared listing, osobny HEAD | per-worktree `HEAD` pointer |
| Remote connections (push/fetch) | YES | - |
| git config (user.email, user.name) | YES | - |
| Index (`.git/index`) | - | per-worktree |
| Working directory files | - | YES |
| `.env`, `.env.local` (gitignored) | - | copied from `.worktreeinclude` pattern |
| `node_modules/`, `venv/`, build artifacts | - | YES (need reinstall) |
| Branch | overlapping visible | `worktree-<name>` primary |
| Stash | YES (shared store) | - |

Kluczowa konsekwencja: `git stash pop` zrobiony w worktree A moze wyciagnac stash stworzony w worktree B. Stash scope to repo, nie worktree.

### 9. .worktreeinclude pattern

Dla env files i innych gitignored:
```
# .worktreeinclude (project root)
.env
.env.local
config/secrets.json
.vscode/
```

Uzywa `.gitignore` syntax. **Only files matching pattern AND also gitignored sa kopiowane** - tracked files nigdy nie duplikowane.

Aplikuje do:
- Worktrees przez `--worktree`
- Subagent worktrees
- Parallel sessions w desktop app

Nie aplikuje dla custom WorktreeCreate hooks (bo hook zastepuje calkowicie default) - copy manualnie w skrypcie hooks.

### 10. Non-git VCS: WorktreeCreate hook

Docs:
*"For other version control systems like SVN, Perforce, or Mercurial, configure WorktreeCreate and WorktreeRemove hooks to provide custom worktree creation and cleanup logic."*

Hook spec w `.claude/settings.json`:
```json
{
  "hooks": {
    "WorktreeCreate": [{
      "hooks": [{
        "type": "command",
        "command": "./scripts/create-worktree.sh"
      }]
    }],
    "WorktreeRemove": [{...}]
  }
}
```

### 11. Origin HEAD gotcha

Z docs:
*"If the repository's default branch later changes on GitHub or GitLab, your local `origin/HEAD` keeps pointing at the old one, and worktrees will branch from there."*

Fix: `git remote set-head origin -a` - uaktualnia local `.git/refs/remotes/origin/HEAD`. Nie zmienia nic na remote.

Implikacja: jesli projekt migrowal z `master` -> `main` rok temu, a ty sklonowales rok temu, worktrees bedzie branchowac z `master` nawet jesli remote ma `main` jako default.

### 12. Edge cases: konflikty i stash przeplyw

**Dwa worktrees modyfikujace ten sam plik:**
Subagent A w `worktree-A` edytuje `src/auth.ts`. Subagent B w `worktree-B` edytuje to samo. Oba committuja lokalnie. **Zero konfliktu** w runtime - oba maja osobne checkout. Merge ich branches = **konflikt git merge** jak normalny PR.

**Docs explicit:** *"With worktree isolation, each agent has the entire codebase to itself. Agent A can rewrite src/auth.ts while Agent B rewrites the same file with a different approach. You review both branches and pick the winner (or merge them)."*

**Konflikt mimo to:** operacje globalne (git config, creating new remote) wplywaja na wszystkie worktrees. Np. `git config user.email` w worktree A zmienia dla worktree B.

### 13. Performance

Worktrees sharuja `.git/objects/` - **to klucz do efektywnosci**. Dla repo 500MB ze 200MB kodu i 300MB git history:
- Nowy worktree = ~200MB (tylko working directory files)
- Nie 500MB (git history reused)

Stwierdzenie z search: *"Worktrees share the same .git object store, so you're only adding the size of the actual source files, not the entire history."*

Dla wiekszych repo typu monorepo (5GB git history), worktree = huge saving vs klonowania.

## Issues / Flags

- **CRITICAL BUG #38287** - silent commit data loss. Open, no fix. Flag dla Critic + NbLM decision guide.
- **BUG #27753** - closed "not planned" - Anthropic nie planuje auto-delete fix. Praktyk musi uzywac manualny `git worktree add`.
- **Windows symlinks** - niespojnosc platformowa. Projekt uzywajacy symlinks na Unix moze zachowywac sie inaczej w worktree na Windows.
- **NTFS junctions** - `rm -rf` niebezpieczny. Dla projektow pnpm/yarn workspaces workaround: zawsze `git worktree remove`.
- **Brak oficjalnego testu Windows worktree dla Claude Code specyfic** - docs nie wspomnina o Windows caveats. Community (thepromptshelf, verdent.ai) zaklada parity.
- **MAX_PATH limit Windows** - deep nested paths moga failowac. Fix: LongPathsEnabled regedit.
- **Origin HEAD stale** - po rebrandzie master->main, worktrees mylnie branchuja z master.
- **.gitignore dla .claude/worktrees/** - brak tego w default, trzeba rekomendowac.
- **Manualny `git worktree add` omija Claude Code bugs** - workaround z produktywny implikacjami: user musi `cd` manualnie.

## Recommendation

R3 kluczowy dla safety tier. **GO dla Fazy 2 (Extract)** - claim-table ma pokryc:
1. Auto-cleanup no-changes: auto-remove
2. Auto-cleanup with-changes: prompt (buggy)
3. BUG #38287 silent commit delete (data-loss)
4. BUG #27753 closed not-planned (committed work auto-delete)
5. `origin/HEAD` branching base (mozliwy stale)
6. Windows symlinks disabled by default
7. NTFS junctions `rm -rf` danger
8. `.worktreeinclude` for env copy
9. Manual `git worktree add` jako workaround
10. Separate vs shared table (13 resources)
11. EnterWorktree/ExitWorktree spec
12. Orphan sweep wymaga: no uncommitted + no untracked + no unpushed

Otwarte pytania dla Critic:
- Czy na Windows worktree z `isolation: worktree` realistycznie dziala w praktyce? (praktycy raportuja ze tak, z caveats symlinks/junctions)
- Jaki jest koszt setup worktree (wall-clock) dla duzego repo? (estymata: 5-30s dla 500MB)
- Czy `WorktreeCreate` hook moze uzywac Mercurial/SVN skutecznie - brak documented examples

**Licznik slow: ~2010.**

## Sources

- [Common workflows - Claude Code Docs (git worktrees section)](https://code.claude.com/docs/en/common-workflows)
- [EnterWorktree tool description - Piebald-AI/claude-code-system-prompts](https://github.com/Piebald-AI/claude-code-system-prompts/blob/main/system-prompts/tool-description-enterworktree.md)
- [Issue #38287 - Worktree cleanup silently deletes branches (open, data-loss)](https://github.com/anthropics/claude-code/issues/38287)
- [Issue #27753 - Worktree auto-deleted on exit when work is committed (closed, not planned)](https://github.com/anthropics/claude-code/issues/27753)
- [Issue #37611 - WorktreeCreate hook disables cleanup prompt](https://github.com/anthropics/claude-code/issues/37611)
- [Issue #31969 - Enter/resume existing worktrees feature request](https://github.com/anthropics/claude-code/issues/31969)
- [Git for Windows symbolic links](https://gitforwindows.org/symbolic-links.html)
- [pnpm issue #10707 - NTFS junctions cause catastrophic data loss on rm -rf](https://github.com/pnpm/pnpm/issues/10707)
- [Claude Code Git Worktree Guide - thepromptshelf.dev](https://thepromptshelf.dev/blog/claude-code-git-worktree-guide/)
- [Mastering Git Worktrees with Claude Code - Dogukan Uraz Tuna Medium](https://medium.com/@dtunai/mastering-git-worktrees-with-claude-code-for-parallel-development-workflow-41dc91e645fe)
- [Claude Code Worktrees parallel sessions - claudefa.st](https://claudefa.st/blog/guide/development/worktree-guide)
