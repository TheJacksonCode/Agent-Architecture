# R3: Analiza publicznych konfiguracji Claude Code i AI tools

**Delta vs istniejacy raport:** `analizy-md/GITHUB_RESEARCH_CLAUDE_PLUGINS_2026.md` (2026-04-07) pokrywal ekosystem pluginow. Ten raport fokusuje sie na wzorcach CLAUDE.md, commands, settings.json i porownaniu z innymi AI tools.

---

## 1. Znalezione repozytoria

### CLAUDE.md szablony
| Repo | Co zawiera |
|------|------------|
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | Referencyjny CLAUDE.md (125 linii), Command->Agent->Skill architektura |
| [abhishekray07/claude-md-templates](https://github.com/abhishekray07/claude-md-templates) | 3 szablony (Next.js, Python/FastAPI, Generic) |
| [centminmod/my-claude-code-setup](https://github.com/centminmod/my-claude-code-setup) | Memory bank: patterns.md, decisions.md, activeContext.md |
| [danielrosehill/Claude-Code-Repo-Managers-ClaudeMD](https://github.com/danielrosehill/Claude-Code-Repo-Managers-ClaudeMD) | Meta-repo z szablonami per typ repo |

### Custom commands
| Repo | Ilosc | Styl |
|------|-------|------|
| [wshobson/commands](https://github.com/wshobson/commands) | 57 | 15 workflows + 42 tools w 11 kategoriach |
| [qdhenry/Claude-Command-Suite](https://github.com/qdhenry/Claude-Command-Suite) | 216+ | 15+ namespaces, 54 agents, 12 skills |
| [vincenthopf/My-Claude-Code](https://github.com/vincenthopf/My-Claude-Code) | ~20 | 5-stage pipeline + 8 agentow |

### Multi-agent orchestration
| Repo | Mechanizm |
|------|-----------|
| [wshobson/agents](https://github.com/wshobson/agents) | 182 agents, 77 plugins, 4-tier model routing |
| [nwiizo/ccswarm](https://github.com/nwiizo/ccswarm) | Git worktree isolation, channel coordination |
| [jayminwest/overstory](https://github.com/jayminwest/overstory) | tmux workers, SQLite mail, 11 runtime adapters |
| [bobmatnyc/claude-mpm](https://github.com/bobmatnyc/claude-mpm) | 47+ agents, GitHub-first SDK |

### Top 5 konfiguracji
1. **ChrisWiles/claude-code-showcase** - KOMPLETNY: hooks, agents, commands, skills, rules, GitHub Actions
2. **wshobson/agents + commands** - NAJBARDZIEJ ROZBUDOWANY multi-agent (182 agentow)
3. **centminmod/my-claude-code-setup** - NAJLEPSZY memory bank pattern
4. **vincenthopf/My-Claude-Code** - NAJCIEKAWSZY workflow (5-stage + parallel review)
5. **feiskyer/claude-code-settings** - NAJLEPSZE settings.json presety (1.4k stars)

---

## 2. Wzorce i trendy

### [PEWNE] CLAUDE.md:
1. **Pod 200 linii** - konsensus
2. **Modularna hierarchia** - root + subdirectory (monorepo walk-up)
3. **@path imports** - linkowanie zamiast inline
4. **Memory bank pattern** - osobne pliki per concern
5. **Sekcje: WHAT / HOW / RULES / DEBUG**

### [PEWNE] Commands:
1. **Namespace prefixing** - /workflows:feature-dev, /tools:security-scan
2. **Workflows vs Tools split**
3. **5-stage pipeline** (vincenthopf)

### [PEWNE] Multi-agent:
1. **Tier-based model routing** - Opus/Sonnet/Haiku (jak u nas)
2. **Git worktree isolation** per agent
3. **Channel/mail coordination** - zero shared state

---

## 3. Porownanie z innymi narzediami

| Feature | Claude Code | Cursor | Copilot | Aider |
|---------|------------|--------|---------|-------|
| Config | CLAUDE.md + settings.json | .cursor/rules/*.mdc | .github/copilot-instructions.md | .aider.conf.yml |
| Hierarchy | Global->Project->Subdir | Global->Project->Glob-scoped | Repo-wide + per-path | Home->Root->CWD |
| Agents | .claude/agents/ | Brak | Copilot Agent (single) | Brak |
| Multi-agent | Native subagent spawning | Brak | Brak | Brak |
| Hooks | 12 lifecycle events | Brak | GitHub Actions | Brak |

### Co podpatrzyc:
- **Od Cursor:** Glob-scoped rules (.mdc z applyTo pattern)
- **Od Copilot:** Multiple .instructions.md per concern (security, testing, etc.)
- **Od Aider:** CONVENTIONS.md jako osobny plik conventions

---

## Rekomendacje

1. **CLAUDE.md za dlugi** - przenosimy changelog do VERSIONS.md, zostawiamy <200 linii
2. **Memory bank pattern** - juz robimy (v{N}/PROGRESS.md) - jestesmy ahead of curve
3. **Namespace commands** - nasz system 42 presetow jako slash commands to community standard
4. **Brakuje .claude/rules/** - glob-scoped rules moglyby poprawic adherencje
5. **Hooks integration** - walidacja wersji pliku HTML przed zapisem
6. **Cross-agent skills** - eksport presetow jako SKILL.md z YAML frontmatter
