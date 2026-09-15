# R7 - MCP Debugging + Community Patterns (mcp__ prefix, connection failures, power-user patterns)

**Rola:** res_reddit (Sonnet)
**Data accessed:** 2026-04-17
**Scope:** Debugging: mcp__ prefix, tool dostepnosc po restart, connection issues. Reddit/GitHub issues. Community power-user patterns: personal MCP per projekt, MCP jako config vector. Cap slow: 4000.

---

## 1. Anatomia tool name: `mcp__<server>__<tool>`

Claude Code eksponuje MCP tools pod wzorcem:
```
mcp__<server-name>__<tool-name>
```

Przyklad:
- Server: `github`, tool: `create_issue` -> `mcp__github__create_issue`
- Server: `slack`, tool: `send_message` -> `mcp__slack__send_message`
- Server: `memory`, tool: `recall` -> `mcp__memory__recall`

Double underscore `__` jest literal - Claude Code uzywa tego do routing w permission engine. Source: https://code.claude.com/docs/en/mcp + https://www.arsturn.com/blog/the-complete-guide-to-debugging-mcp-connection-issues-in-claude-desktop, accessed 2026-04-17.

**Wynik:** permissions patterns uzywa tego prefixu:
```json
{"permissions": {"deny": ["mcp__untrusted__*"]}}
```

## 2. Symptomy "tool nie pojawia sie" - top 5

Z analizy GitHub issues anthropics/claude-code (2026-04-17):

### Symptom A: Server lista jako "connected" ale zero tools w `/mcp` menu
**Issue #11175** - BUG: MCP Tools Not Available to Claude Assistant Despite Being Loaded Successfully. Source: https://github.com/anthropics/claude-code/issues/11175.

Root causes:
- Server deklaruje `tools` capability ale `tools/list` zwraca pusta tablice
- Filtrowanie po server-side (server returns tools conditional na auth, ale auth nie poszedl)
- Claude Code cache z poprzedniej sesji wyswietla stary stan

Debug: `/mcp` w Claude Code pokazuje statusy per server. Restart sesji czesto resetuje.

### Symptom B: Connection fail, "server unavailable"
**Issue #1611** - BUG: MCP servers fail to connect in Claude Code despite correct configuration. Source: https://github.com/anthropics/claude-code/issues/1611.

Root causes:
- stdio server binary not in PATH (przyklad: `python server.py` ale Python nie na PATH)
- HTTP server SSL cert issue (self-signed, expired)
- Firewall blocks outgoing connection (enterprise env)
- Server crashed on startup, silent fail

### Symptom C: Tools dziala w Claude Desktop, nie dziala w Claude Code CLI
**Issue #72 / #12086** - External MCP Servers Not Loading in Claude Code (working in Desktop). Source: https://github.com/anthropics/claude-code/issues/72, https://github.com/anthropics/claude-code/issues/12086.

Root causes:
- Rozne config file paths (Desktop: `claude_desktop_config.json`, Code: `~/.claude/settings.json` albo `.mcp.json`)
- Rozny capability negotiation - Claude Code moze deklarowac inne client capabilities
- Version mismatch - Desktop moze miec nowszy MCP SDK

### Symptom D: Timeout przy wywolaniu ale server dziala
**Issue #20335, #3033, #44032** (patrz R6) - timeout config ignored.

Root causes: Claude Code nie respektuje custom timeout dla HTTP/SSE; Windows hardcoded 4-min; MCP SDK TS default 60s.

### Symptom E: Silent failure - nic sie nie dzieje
Brak error message, brak tool call, Claude po prostu "nie widzi" mozliwosci.

Root causes:
- Tool description za dlugie/za krotkie -> Claude nie wybiera
- Tool name collision z built-in (e.g., custom `read_file` konflikt z Read tool)
- Prompt injection w tool description (serwer instruuje Claude "don't use me")
- `permissions.deny` wygral nad `permissions.allow`

Source: https://www.arsturn.com/blog/why-is-claude-ignoring-your-mcp-prompts-a-troubleshooting-guide, accessed 2026-04-17.

## 3. Standard debug flow

Z MCP official debugging guide (https://modelcontextprotocol.io/docs/tools/debugging) + community synthesis:

### Krok 1: Sprawdz status
```bash
claude mcp list        # Lista wszystkich serwerow + status
/mcp                    # w sesji: status + available tools
```

### Krok 2: Uruchom MCP Inspector
```bash
npx @modelcontextprotocol/inspector <command>
# np. npx @modelcontextprotocol/inspector npx -y @modelcontextprotocol/server-github
```
Otworz http://localhost:5173. Eksploruj serwer niezaleznie od Claude Code. Jesli Inspector widzi tools a Claude Code nie - problem w configuracji Claude Code.

### Krok 3: Sprawdz logi
- **Claude Desktop logs:** `~/Library/Logs/Claude/` (macOS), `%APPDATA%\Claude\logs\` (Windows), `~/.config/Claude/logs/` (Linux)
- **Claude Code logs:** `~/.claude/logs/` albo w `~/.cache/claude-code/`
- Szukaj linii z nazwa serwera, JSON-RPC errors, stdout/stderr z subprocess

### Krok 4: Restart sesji
Wiele MCP issues "rozwiazuje sie" po restart Claude Code. MCP server subprocess musi byc respawned, cache resetted.

### Krok 5: Minimal config test
Zmniejsz config do jednego serwera. Dodaj inne jeden po drugim. Izoluj problematyczny.

Source: https://modelcontextprotocol.io/docs/tools/debugging + https://www.arsturn.com/blog/the-complete-guide-to-debugging-mcp-connection-issues-in-claude-desktop, accessed 2026-04-17.

## 4. DevTools debugging - Claude Desktop pattern

Dla Claude Desktop (nie Claude Code):
- `Cmd-Opt-I` (macOS) / `Ctrl-Alt-I` (Windows) - otwiera DevTools
- Console panel pokazuje client-side errors
- Network panel ma wywolania API

W Claude Code CLI brak DevTools - debug przez logs + Inspector + `/mcp` status.

Source: https://modelcontextprotocol.io/docs/tools/debugging, accessed 2026-04-17.

## 5. Reddit r/ClaudeAI + r/ClaudeCode common patterns (2026 Q1)

Compilation z Reddit threads (accessed via search, 2026-04-17):

### Pattern: "MCP nie wczytuje sie po update"
Symptom: po `npm update -g @anthropic-ai/claude-code` serwery wczesniej dzialajace przestaja. Rozwiazanie: `claude mcp remove` + `claude mcp add` na nowo. Config schema moze sie zmienic miedzy versions.

### Pattern: "Czemu mcp__github dziala w jednym projekcie a w innym nie?"
Rozwiazanie: sprawdz czy project ma lokalne `.mcp.json` albo `.claude/settings.json` z `disabledMcpjsonServers: ["github"]`. Project-level override user-level.

### Pattern: "Czemu `/mcp` pokazuje server ale tools zero?"
Rozwiazanie: server capability-negotiation failed. Sprawdz `mcp --debug` (flag niezawsze dostepny). Tez: server moze wymagac auth (OAuth flow) - pierwsze `tools/list` zwraca [] dopoki auth complete.

### Pattern: "MCP dziala tylko pierwsze 5 minut, potem stops"
Rozwiazanie: Windows 4-min timeout (issue #44032). Upgrade Claude Code do latest; workaround - restart sesji co 3 min.

Source: Reddit threads - r/ClaudeAI, r/ClaudeCode (Q1 2026), referenced pattern descriptions.

## 6. Power-user patterns

### Pattern A: Personal MCP per project
Power-user tworzy custom MCP server per-projekt ktory exposuje domain context.

Przyklad: projekt ecommerce ma `shop-mcp` serwer z tools:
- `get_product_schema` - baza tabel produktow
- `get_recent_orders` - ostatnie zamowienia (read-only)
- `design_tokens` - color palette, typography

Korzysc: Claude zawsze ma dostep do project-specific context bez duping do `CLAUDE.md`.

Koszt: jeden wiecej subprocess per session; ~5-10k tokens tool defs.

Source: community patterns compiled od https://github.com/modelcontextprotocol/servers + Reddit discussions.

### Pattern B: MCP jako config vector (controversial)
Niektorzy uzywaja MCP do dynamicznego ladowania preferences, style guides, domain rules jako **resources**:
```
config://team/style-guide
config://team/code-review-checklist
```

Claude ladowac resource na start. Pros: live updates (team zmienia rules, wszyscy widza). Cons: 5-10k tokens za cos co Skill moglby dac za 2k tokens.

**Skill lepiej w 90% przypadkow** dla static prefs. MCP uzasadnione tylko jesli **live, external, dynamic**.

Source: https://alexop.dev/posts/understanding-claude-code-full-stack/ critique.

### Pattern C: MCP aggregator gateway
Zamiast 10 oddzielnych MCP servers, jeden gateway (docker/mcp-gateway, Rube, Zapier MCP) ktory agreguje wiele integracji za jednym HTTP endpointem.

Korzysc: jedna connection do zarzadzania, jeden auth, jedno rate limit. Claude Code widzi "jeden server" ale ma dostep do 500+ tools (przez Rube).

Koszt: depth of tools - moze przekroczyc token budget dla definitions. Aggregator powinien uzywac Tool Search Tool pattern. Source: https://rube.app + https://github.com/docker/mcp-gateway.

### Pattern D: MCP + CLAUDE.md + Skill combo (most adopted)
Najczestszy production pattern:
1. **CLAUDE.md** w repo - opisuje project (what, why, structure, conventions)
2. **MCP servers** - 2-3 active (GitHub, Postgres, Filesystem)
3. **Skills** (`~/.claude/skills/*.md`) - 5-10 workflow helpers
4. **Commands** (`~/.claude/commands/*.md`) - 5-20 shortcuts

Source: https://alexop.dev/posts/claude-code-customization-guide-claudemd-skills-subagents/, accessed 2026-04-17.

### Pattern E: Ephemeral MCP
Power-user spawnuje MCP server ad-hoc dla jednej sesji:
```bash
# one-off
claude mcp add --scope session temp-server -- python /tmp/quick_tool.py
```
Dodaje server tylko dla tej jednej sesji. Source: claim w community, exact flag name moze sie roznic, check `claude mcp --help`.

## 7. CI/CD debugging - GitHub Actions specific

**Issue #647** "I Keep getting permission denied for mcp servers using Claude Code GitHub Actions". Source: https://github.com/anthropics/claude-code-action/issues/647, accessed 2026-04-17.

Root cause: GitHub Actions env brak interactive trust dialog, MCP servers by default not trusted. Fix: set `enableAllProjectMcpServers: true` w managed config dla tego workflow (lub inline w action config).

**Osobny scenariusz bezpieczenstwa:** dla CI to jest "known trade-off" (akceptujemy trust ALL bo brak dialog). Mitigacja: pinnowac exact versions serwerow (`npx -y @modelcontextprotocol/server-github@1.2.3` zamiast `@latest`).

## 8. Debugging checklist - quick reference

```
[ ] claude mcp list - server on lista?
[ ] /mcp - server "connected" w sesji?
[ ] /mcp - sa tools widoczne?
[ ] MCP Inspector - server standalone dziala?
[ ] Logs - ostatnie 100 linii pokazuja problem?
[ ] Config file - `.mcp.json` / settings.json valid JSON?
[ ] env vars - secrets dostepne dla subprocess?
[ ] PATH - binary dostepny (`which python`, `which node`)?
[ ] Permissions - permissions.deny nie blokuje mcp__?
[ ] Version - Claude Code + server latest?
[ ] Restart - pomogl restart sesji?
[ ] Minimal config - z jednym serwerem dziala?
```

Source compilation: https://modelcontextprotocol.io/docs/tools/debugging + arsturn + community posts.

## 9. Tool availability dependent on auth

Paradoksalny issue: pierwsze `tools/list` na OAuth-secured server moze zwrocic [] dopoki user nie complete flow. Symptom: "widzialem narzedzia wczoraj, dzisiaj ich brak". Workaround: explicit re-auth (`claude mcp auth <server>`), restart sesji.

Source: https://www.truefoundry.com/blog/mcp-authentication-in-claude-code, accessed 2026-04-17.

## 10. Naming collisions - rzadki ale problematyczny

Gdy tool name MCP koliduje z built-in (np. custom MCP server expozes `Read` albo `Bash`):
- Built-in wygrywa w dispatching (Claude Code ma hardcoded handlers)
- MCP tool po prostu nie ma chance byc wybrany

Workaround: zmienic tool name w serwerze, uzyc prefix jak `<domain>_read`.

## 11. `--debug` flag dla Claude Code

Claude Code CLI obsluguje `--debug` flag (nie zawsze dostepny w GUI wersjach):
```bash
claude --debug
```
Pokazuje pelny log JSON-RPC traffic miedzy Claude a serwerami MCP. Bardzo pomocne dla diagnosis connection issues.

Source: https://code.claude.com/docs/en/cli-reference (if exists) + community posts.

## 12. Reddit wisdom - "anti-patterns"

1. **"Installing everything awesome-mcp"** - 10k tokens za kazdy server = budget killer
2. **"enabling all w .mcp.json w open source repo"** - security risk (patrz R3)
3. **"Nie restartuja po config change"** - `~/.claude/settings.json` requires restart, nie hot-reload
4. **"Mieszanie Desktop config vs Code config"** - dwie apki, dwa configi, czasem identyczne, czesciej rozne
5. **"Polaganie tylko na tool description"** - niedoprecyzowane descriptions = Claude nie wybiera

Source: compilation z r/ClaudeAI Reddit Q1 2026 discussions.

## 13. Advanced: debug MCP w GitHub Actions

Actions-specific:
```yaml
- uses: anthropics/claude-code-action@v1
  with:
    mcp-config: .claude/mcp.json
    debug: true
env:
  MCP_DEBUG: 1
```

`MCP_DEBUG` env ma efekt verbose logging. Artifacts pozwalaja retrieve logs post-run. Source: https://github.com/anthropics/claude-code-action, accessed 2026-04-17.

## 14. Community tools dla debug

- **mcpcat.io** - SaaS log aggregator i debugging dla MCP, paid tier
- **glama.ai** - directory + debugging helpers
- **mcp-inspector** - official, open-source
- **context-mode** (https://github.com/mksglu/context-mode) - sandbox wrapper dla MCP output

## 15. Known long-standing issues (2026-04-17)

Open bugs w anthropics/claude-code dotyczace MCP:
- #424 timeout configurable
- #11364 lazy-load tool definitions
- #20335 timeout config ignored HTTP
- #44032 Windows 4-min silent timeout
- #15945 no stuck detection
- #12086 external servers not loading

Niektore closed/fixed - sprawdzic status real-time. Zalecenie: follow https://github.com/anthropics/claude-code/issues?q=label%3Amcp dla latest.

## 16. Kluczowe zrodla

- **Official MCP debugging:** https://modelcontextprotocol.io/docs/tools/debugging (accessed 2026-04-17)
- **Arsturn debugging guide:** https://www.arsturn.com/blog/the-complete-guide-to-debugging-mcp-connection-issues-in-claude-desktop
- **Arsturn MCP prompts:** https://www.arsturn.com/blog/why-is-claude-ignoring-your-mcp-prompts-a-troubleshooting-guide
- **Issue #11175:** https://github.com/anthropics/claude-code/issues/11175
- **Issue #1611:** https://github.com/anthropics/claude-code/issues/1611
- **Issue #72:** https://github.com/anthropics/claude-code/issues/72
- **Issue #12086:** https://github.com/anthropics/claude-code/issues/12086
- **Issue #647 (GH Actions):** https://github.com/anthropics/claude-code-action/issues/647
- **Issue #20335 timeout:** https://github.com/anthropics/claude-code/issues/20335
- **Issue #44032 Windows:** https://github.com/anthropics/claude-code/issues/44032
- **Issue #15945 hang:** https://github.com/anthropics/claude-code/issues/15945
- **Alexop.dev customization:** https://alexop.dev/posts/claude-code-customization-guide-claudemd-skills-subagents/
- **TrueFoundry auth:** https://www.truefoundry.com/blog/mcp-authentication-in-claude-code
- **Docker MCP Gateway:** https://github.com/docker/mcp-gateway
- **MCPcat:** https://mcpcat.io

## 17. Gaps do delta-researchu

- Formalny debug CLI dla Claude Code MCP (poza `/mcp`) - dokumentacja skapa
- Long-running process cleanup (zombie handling) - community workaround but no official
- GitHub Actions MCP debug UX - bugs #647 poza tym nic extensive

## 18. Podsumowanie (1 paragraf)

Debug MCP w Claude Code 2026 opiera sie na 5 krokach: `claude mcp list` + `/mcp` status, test przez MCP Inspector standalone, sprawdz logs (`~/.claude/logs` albo `~/Library/Logs/Claude`), restart sesji, redukuj do minimum config i dodawaj stopniowo. Tool names wzorzec `mcp__<server>__<tool>`, kollizje z built-ins Claude Code wygrywaja. Top 5 symptomy: tools niewidoczne pomimo "connected" (#11175), connection fail (#1611), dziala w Desktop ale nie Code (#72), timeout mimo configuracji (#20335, #44032), silent no-action (description/permission). Power-user patterns: personal MCP per projekt (domain context), MCP aggregator gateway (Rube, docker/mcp-gateway), CLAUDE.md + MCP + Skill combo jako najpopularniejszy production setup, ephemeral MCP dla jednej sesji. CI/CD (GitHub Actions) wymaga `enableAllProjectMcpServers: true` bo brak interactive dialog - akceptowane trade-off dla sandbox env. Known bugs 2026-04-17: #424 (timeout), #11364 (lazy-load), #44032 (Windows 4-min). Community conseil: restart po config change (nie hot-reload), pinnuj server versions w CI, nie instaluj wszystkiego z awesome-mcp (budget tokens), `--debug` flag dla JSON-RPC traffic inspection, mcpcat.io jako SaaS log aggregator. Liczba slow: ~2040.
