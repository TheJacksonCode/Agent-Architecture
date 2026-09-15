# R5 - MCP vs Skill vs Command vs Hook - Decision Tree

**Rola:** res_ux (Sonnet)
**Data accessed:** 2026-04-17
**Scope:** Kiedy uzyc MCP (external integration), Skill (internal prompt/workflow), Command (orchestration), Hook (automation on event). Overlap zones, decision tree, token cost porownanie. User journey: "mam zadanie, co wybrac". Cap slow: 4000.

---

## 1. Cztery extension types Claude Code 2026

Claude Code ma 4 gl. mechanizmy rozszerzen, czesto mylone:

| Typ | Cel | Kiedy trigger | Kto kontroluje |
|-----|-----|--------------|----------------|
| **MCP Server** | Access do external tool/API/data | LLM decyduje (model-controlled) | Serwer eksponuje tools |
| **Skill** | Zmienic *jak* Claude mysli/pisze | Auto-invoke na keywords albo explicit | Claude wybiera na podstawie context |
| **Slash Command** | Reusable prompt shortcut | User triggers explicit `/name` | User-controlled |
| **Hook** | Automatic action on event | Event (PreToolUse, Stop, etc.) | Harness wywoluje |

Source: https://alexop.dev/posts/understanding-claude-code-full-stack/ + https://skiln.co/blog/claude-code-plugins-vs-skills-vs-mcp-decision-guide, accessed 2026-04-17.

## 2. Decision tree - quick version

> **Potrzebujesz dostepu do zewnetrznego systemu (API, baza, serwis)?** -> **MCP Server**
>
> **Chcesz zmienic *jak* Claude pracuje (workflow, ton, structured output, domain knowledge)?** -> **Skill**
>
> **Chcesz uruchomic powtarzalny prompt jako shortcut?** -> **Slash Command**
>
> **Chcesz zeby cos sie dzialo automatycznie na event (post-commit, pre-tool, po stopie)?** -> **Hook**

Source: https://www.morphllm.com/claude-code-skills-mcp-plugins, accessed 2026-04-17.

## 3. MCP - kiedy (shiny detail)

**Uzyj MCP gdy:**
- Claude musi pisac/czytac do systemu zewnetrznego (Slack message, GitHub PR, Postgres query)
- Dane sa live (API) i za ciezkie by trzymac w kontekscie (schemas DB, dokumentacje inventory)
- Potrzeba auth flow (OAuth, PAT) ktory chcesz hide od LLM
- Shared infrastructure (team MCP deploy, vs personal config)

**NIE uzywaj MCP gdy:**
- Mozesz to zalatwic wywolaniem Bash (np. `gh pr create` zamiast GitHub MCP dla prostych operacji) - oszczedza tokens
- Dane statyczne, mieszcza sie w pliku (uzyj Skill z `files/` folderem)
- Potrzeba pojawia sie raz na miesiac (koszt utrzymania serwera nie warty)

Source: https://alexop.dev/posts/understanding-claude-code-full-stack/ + https://skillsplayground.com/guides/claude-code-skills-vs-mcp/.

**Token cost MCP:** kazdy serwer doklada ~8-15k tokens definicji tools do KAZDEGO API call (do 2026 jest lazy-loading partial ale tool names i basic schemas ladowane). Source: https://www.mindstudio.ai/blog/claude-code-mcp-server-token-overhead, accessed 2026-04-17.

## 4. Skill - kiedy

**Skill = markdown file z YAML frontmatter + opcjonalnie `files/` subfolder**. Format Anthropic-style, przykład:
```markdown
---
name: code-reviewer
description: Review PRs z focus na security + perf. Auto-trigger: "review this PR", "audit code".
---
Gdy user prosi o code review, zastosuj ten plan:
1. Uruchom `git diff main...HEAD`
2. Dla kazdego zmienionego pliku, sprawdz:
   - Security: secrets, SQL injection, XSS
   - Performance: N+1, O(n^2)
3. Zwroc raport w formacie: ...
```

**Uzyj Skill gdy:**
- Chcesz uspojnic *jak* Claude dziala dla konkretnego typu zadania (code review, write tests, design doc)
- Potrzebujesz domain knowledge (company style guide, framework conventions)
- Workflow rozmija sie z defaultem Claude (custom steps, structured output)
- Auto-invocation based on keywords jest pozadana (user nie musi pamietac nazwy)

Source: https://code.claude.com/docs/en/skills + https://www.mindstudio.ai/blog/claude-skills-vs-slash-commands, accessed 2026-04-17.

**Kluczowa roznica vs Commands:** Skill auto-invoke on context match. Command = explicit `/name` trigger. Source: https://www.mindstudio.ai/blog/claude-skills-vs-slash-commands.

**Token cost Skill:** Skill YAML + description (metadata) ladowany upfront (zwykle <500 tokens). Body tresc i `files/` ladowane on-demand gdy Claude wybierze skill do aktywacji. Source: architecture progressive disclosure.

## 5. Slash Command - kiedy

**Command = markdown file z frontmatter + prompt body** (bez auto-discovery). User trigger `/nazwa [args]`.

```markdown
---
argument-hint: <pr-number>
description: Review PR by number
---
Przejrzyj PR $ARGUMENTS z focus na:
- Breaking changes
- Test coverage
- Bundle size
```

**Uzyj Command gdy:**
- Chcesz mashup mechanism (np. `/deep-research` orchestruje 7 researcherow + critic + syntetyk)
- User woli explicit trigger (np. operational tasks jak `/deploy`, `/rollback`)
- Preset team (w systemie Maciej 42 team presets)
- Prostsze niz Skill (krotki prompt, brak domain knowledge)

Source: https://stevekinney.com/courses/ai-development/claude-code-permissions (lekcja o commands) + https://www.mindstudio.ai/blog/claude-skills-vs-slash-commands.

**Token cost Command:** zero do momentu invocation (komendy laduja sie on-demand z `~/.claude/commands/*.md`). Source: architecture Claude Code, opisane w https://code.claude.com/docs/en/slash-commands.

## 6. Hook - kiedy

**Hook = event-triggered shell command** w `.claude/settings.json`:
```json
{
  "hooks": {
    "PreToolUse": [{"matcher":"Bash", "hooks":[{"type":"command","command":"echo 'before bash'"}]}],
    "Stop": [{"hooks":[{"type":"command","command":"gh pr create"}]}]
  }
}
```

**Uzyj Hook gdy:**
- Cos musi sie dzialac *automatycznie* (bez udzialu LLM decision)
- Guardrail (zablokuj `rm -rf` przez PreToolUse)
- Post-task cleanup (uruchom linter po edycji pliku)
- Notification (wyslij sygnal po Claude Stop)

Source: https://code.claude.com/docs/en/hooks, accessed 2026-04-17.

**Warning:** hooks to attack surface (CVE-2025-59536 via hooks). Uzywac ostroznie, z audytem. Patrz R3.

**Token cost:** zero (hooks nie lapia się w kontekst LLM, sa transparency shell commands).

## 7. Porownawcza tabela + use cases

| Wymaganie | MCP | Skill | Command | Hook |
|-----------|-----|-------|---------|------|
| External API/DB | TAK | NIE | (przez Bash) | NIE |
| Change Claude's approach | NIE (tylko adds tools) | TAK | (partial) | NIE |
| Explicit user trigger | - | auto | TAK | NIE (event) |
| Automatic on event | NIE | NIE | NIE | TAK |
| Shareable easy | mid (requires run) | TAK (file) | TAK (file) | TAK (per project) |
| Auth/Secrets handling | TAK (OAuth) | NIE | NIE | via env |
| Token overhead high | TAK (~8-15k/server) | low (on-demand) | zero until use | zero |
| Model-controlled | TAK | partial (context match) | NIE (user) | NIE (event) |
| Best for | integracje | workflow patterns | preset shortcuts | guardrails/automation |

Source: https://skiln.co/blog/claude-code-plugins-vs-skills-vs-mcp-decision-guide (accessed 2026-04-17) + https://www.morphllm.com/claude-code-skills-mcp-plugins.

## 8. Overlap zone 1 - MCP vs Skill (czesty mylaczka)

**Scenariusz:** "Chce zeby Claude pisal Slack messages w moim stylu team."

Rozwiazanie A - MCP only: zainstaluj Slack MCP server, Claude samodzielnie pisze przez `mcp__slack__send_message`. Problem: ton i styl beda defaultowe Claude.

Rozwiazanie B - Skill only: napisz Skill "write-slack-style" z przykladami jak team pisze. Problem: nie posle wiadomosci, tylko drafty.

Rozwiazanie C (zalecane) - **MCP + Skill**: Slack MCP do wysylania, Skill do formulowania. Skill wywoluje mcp__slack__send_message z content przygotowanym wedlug style guide.

Source: community pattern, https://alexop.dev/posts/understanding-claude-code-full-stack/.

## 9. Overlap zone 2 - Skill vs Command

**Scenariusz:** "Chce uspojnic code review w team."

Skill approach: `code-reviewer` skill auto-invoke gdy ktos mowi "review this". Elastyczny, no need pamietac nazwe.

Command approach: `/review <pr-number>` explicit. Operacyjne, reproducible.

Rozstrzygniecie:
- **Skill** gdy trigger jest semantyczny i rozmyty ("zrecznie sformulowana prosba") i chcesz auto-discovery
- **Command** gdy trigger jest operational i repeat-heavy ("zawsze /review przed merge")

Mozna **jedno i drugie** - powszechny pattern jest skill + slash command ktory explicit invokuje skill. Source: https://www.mindstudio.ai/blog/claude-skills-vs-slash-commands.

## 10. Overlap zone 3 - MCP vs Bash

**Scenariusz:** GitHub operations - MCP GitHub server czy `gh` CLI przez Bash?

- **Bash (`gh pr create`)** - prostsze, mniej tokens (brak tool definitions overhead), dziala out of box jesli `gh` zainstalowany.
- **MCP GitHub** - wiecej tools (issue comments, search code), structured responses, ale 10-15k tokens overhead w kazdym call.

Ekonomika: jesli rzadko uzywasz GitHub w sesji -> Bash. Jesli ciezko polegasz (projekt research PR triage) -> MCP to bedzie sie oplacac funkcjonalnie.

Source: community discussions, https://alexop.dev/posts/understanding-claude-code-full-stack/.

## 11. Token cost porownanie (empirical)

Scenariusz "user pyta 'review PR #123'":

**MCP-heavy approach (5 serwerow: GitHub, Slack, Postgres, Filesystem, Memory):**
- Tool definitions upfront: ~50-60k tokens
- Per API call: +3-5k dla tool schemas recap
- Effective context: 200k - 60k - 3k = ~137k

**Skill approach (skill z /review command):**
- Skill YAML header: ~200 tokens (background awareness)
- Skill body loaded on trigger: ~2000 tokens
- Effective context: 200k - 2k = ~198k

**Hybrid (Skill + 2 MCP servers):**
- 2 MCP: ~18k tokens
- Skill + body: ~2k
- Effective context: ~180k

Source empirical: https://medium.com/@joe.njenga/claude-code-just-cut-mcp-context-bloat-by-46-9-51k-tokens-down-to-8-5k-with-new-tool-search-ddf9e905f734, accessed 2026-04-17. Empiryczny benchmark: Tool Search Tool (Anthropic native feature) redukuje z 51k -> 8.5k dla tool definitions, 46.9% redukcja.

## 12. Decision framework rozszerzony

Pelna decyzyjna siatka:

```
Start: Mam zadanie/pomysl na extension.

1. Czy Claude potrzebuje EXECUTE action w external systemie?
   TAK -> MCP (OR Bash if gh/aws/kubectl CLI exists and used rarely)
   NIE -> idz dalej

2. Czy to workflow/sposob myslenia/domain knowledge?
   TAK -> Skill
   NIE -> idz dalej

3. Czy to prosty prompt shortcut uzywany czesto?
   TAK -> Command
   NIE -> idz dalej

4. Czy cos ma dziac sie automatycznie na event (bez LLM decision)?
   TAK -> Hook
   NIE -> sprawdz czy problem faktycznie wymaga customization
```

Rozszerzenia:
- **Skill + MCP** czesto razem (MCP dla executor, Skill dla mind-model)
- **Command + Skill** razem (command jako explicit gateway do skill)
- **Hook + MCP** rzadziej (hook jako post-processing tool call)

Source: https://www.morphllm.com/claude-code-skills-mcp-plugins synthesis + author's analysis.

## 13. Most teams - mieszana topologia

Z community observations (Reddit r/ClaudeCode, Twitter/X posts 2026 Q1):

> "Most developers need: 2-3 MCP servers (GitHub, Filesystem, one domain-specific) + a few custom Skills for their workflow."

Source: https://www.mindstudio.ai/blog/claude-skills-vs-slash-commands, accessed 2026-04-17.

Typowa topologia:
- **3 MCPs**: GitHub, Filesystem, Memory (albo domain like Postgres)
- **5-10 Skills**: code-reviewer, test-writer, docs-writer, debug-helper, design-doc, company-style
- **10-20 Commands**: /deploy, /rollback, /review, /plan, team preset
- **3-5 Hooks**: PreToolUse-guardrail, Stop-notify, PostToolUse-lint

## 14. MCP as config vector - power-user pattern

Power-user pattern zlowieszcy (wspominany w briefie R7): MCP jako "config vector". Personal MCP server per projekt ktory injektuje kontekst, documentation, preferences. Przyklad: serwer ktory exposuje "my_code_style://rules" resource ktory Claude wczytuje na start.

To jest uzyteczny pattern, ale moze tez byc nadzuyty (dokladny powtorka co moze dac Skill ale ze wieksza cena tokens). Rekomendacja: uzyj Skill zamiast, chyba ze masz live-updated source.

## 15. Plugins - warstwa nadrzedna (nowosc 2026)

Claude Code 2026 dodal koncepcje **Plugins** - opakowanie 1+ extensions (MCP + Skill + Command + Hook) w jeden distributable package. Instalacja `/plugin install`. Source: https://www.openaitoolshub.org/en/blog/claude-code-skills-vs-plugins + Claude Code 2.0 docs.

Plugin = organizational unit dla "sell complete feature set" (np. "SRE plugin" = Datadog MCP + on-call skill + /runbook command + hooks dla incident automation).

W decision tree: plugin to poziom wyzej, "kiedy chcesz zshipowac komplet ekstensji w jednym package".

## 16. Gaps do delta-researchu

- Exact bytes overhead Tool Search Tool vs classical in Claude Code 2026 (liczby ze empirical benchmark single-source, would benefit cross-check)
- Czy Plugins maja wlasny ecosystem adoption (stars, usage) - za wczesnie na 2026-04-17
- Hook security patterns post-CVE - ewolucja rekomendacji community

## 17. Kluczowe zrodla

- **Claude Code Skills docs:** https://code.claude.com/docs/en/skills (accessed 2026-04-17)
- **Claude Code Hooks docs:** https://code.claude.com/docs/en/hooks
- **Alexop.dev full-stack:** https://alexop.dev/posts/understanding-claude-code-full-stack/
- **MindStudio Skills vs Slash:** https://www.mindstudio.ai/blog/claude-skills-vs-slash-commands
- **MorphLLM Skills vs MCP vs Plugins:** https://www.morphllm.com/claude-code-skills-mcp-plugins
- **Skiln decision guide:** https://skiln.co/blog/claude-code-plugins-vs-skills-vs-mcp-decision-guide
- **SkillsPlayground Skills vs MCP:** https://skillsplayground.com/guides/claude-code-skills-vs-mcp/
- **Token overhead benchmark:** https://medium.com/@joe.njenga/claude-code-just-cut-mcp-context-bloat-by-46-9-51k-tokens-down-to-8-5k-with-new-tool-search-ddf9e905f734

## 18. Podsumowanie (1 paragraf)

Claude Code 2026 ma 4 gl. extension types - MCP (dla external system access, model-controlled), Skill (zmiana *jak* Claude dziala, auto-trigger na context match), Slash Command (user-triggered prompt shortcut z explicit `/name`), Hook (automatic action on event, zero LLM decision). Decision tree: czy potrzebny external action -> MCP (albo Bash jesli rzadko); czy chcesz zmienic podejscie Claude -> Skill; czy reusable shortcut -> Command; czy automat na event -> Hook. Token economy rozstrzygajaca dla wyboru: MCP kazdy server to 8-15k tokens upfront, Skills ladowane on-demand, Commands zero-cost do use, Hooks zero LLM footprint. Overlap zones rozstrzygaj hybrydowo: Skill+MCP (Skill mysli, MCP executuje), Skill+Command (command jako gateway do skill), MCP+Bash (Bash dla rzadkich, MCP dla czestych). Typowa topologia team-user: 3 MCP + 5-10 Skills + 10-20 Commands + 3-5 Hooks. Plugins (nowosc 2026) to wrapper nadrzedny dla distribucji komplet 1+ extension jako jeden package. Liczba slow: ~1960.
