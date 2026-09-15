# R6 - MCP Performance + Context Budget (tool definitions, caching, response size, timeout)

**Rola:** res_forums (Sonnet)
**Data accessed:** 2026-04-17
**Scope:** Ile kontekstu zjada MCP: tool definitions (caching implications), tool results (response size control), timeout strategies, streaming vs batch. Empiryczne metryki z forow (StackOverflow, dev.to, Medium benchmarks). Cap slow: 4000.

---

## 1. Dwa koszty MCP w kontekscie: definitions + results

Kazdy MCP server konsumuje tokeny na **dwa sposoby**:

1. **Tool definitions (upfront cost)** - schema + description kazdego narzedzia ladowany na starcie sesji i przy kazdym API call. Stala oplata per call nawet jesli narzedzie nie jest uzywane.
2. **Tool results (per-use cost)** - content zwracany przez tool call. Zmienny, moze byc od kilkuset do dziesiatkow tysiecy tokens jesli response duzy.

Source: https://www.mindstudio.ai/blog/claude-code-mcp-server-token-overhead, accessed 2026-04-17.

## 2. Empiryczne metryki - ile zjada definicja toolow

**Benchmark community (MindStudio, Q1 2026):**
- 7 MCP servers active -> tool definitions **67,300 tokens** (33.7% budzetu 200k)
- Typowy multi-server setup (GitHub, Slack, Sentry, Grafana, Splunk) -> ~55k tokens definitions przed jakimkolwiek zapytaniem
- Pojedynczy middle-size server (np. Slack) ~8k tokens definitions
- Large servers (np. Apify Actors ze 2000+ scrapers) moga przekraczac 40k tokens sam jeden

Source: https://www.mindstudio.ai/blog/claude-code-mcp-server-token-overhead + https://scottspence.com/posts/optimising-mcp-server-context-usage-in-claude-code, accessed 2026-04-17.

**Per API call overhead:**
> "Each message is a fresh API request that includes the full conversation history plus the full tool schema. Meaning if your connected MCP servers have 50 tools between them, each with a moderately verbose description and parameter schema, you're paying that token cost every single time you send a message."

Source: https://www.mindstudio.ai/blog/claude-code-mcp-server-token-overhead, accessed 2026-04-17.

## 3. Tool Search Tool - Anthropic native optimization (2026)

Anthropic w Q1 2026 wprowadzil **Tool Search Tool** (meta-tool) - deferred loading tools definitions. Claude widzi tylko **nazwy toolow** upfront, pelne schemas ladowane on-demand gdy Claude wybierze konkretny tool.

**Benchmark:**
- Classical mode (wszystkie tool defs upfront): 51k tokens kontekstu zuzytego
- Tool Search Tool mode: 8.5k tokens
- **Redukcja: 46.9%** (z 51k do 8.5k)
- Tool Search Tool zachowuje **191,300 tokens** kontekstu vs 122,800 z traditional approach (**85% redukcja token usage** dla tool defs)

Source: https://medium.com/@joe.njenga/claude-code-just-cut-mcp-context-bloat-by-46-9-51k-tokens-down-to-8-5k-with-new-tool-search-ddf9e905f734, accessed 2026-04-17.
Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool.

Tool Search Tool dostepny w Claude Code 2026 (od wersji z Q1-Q2 2026). Aktywuje sie default w wielu setup, ale mozna override settings.

## 4. Lazy-load issue #11364 (historyczna walka z token bloat)

GitHub issue https://github.com/anthropics/claude-code/issues/11364 "Lazy-load MCP tool definitions to reduce context usage" byl formalna prosba community (open Q4 2025) o redukcje stałego obciążenia tool defs. Tool Search Tool (Q1 2026) to formalna odpowiedz Anthropic na ten pattern.

Na 2026-04-17 stan jest mieszany:
- Tool Search Tool dziala dla duzych zestawow tool (50+)
- Dla malych zestawow (<20 tools) Claude Code dalej laduje defs upfront (koszt marginal)
- Resources i Prompts maja nieco inne caching behaviors - resources deferred, prompts ladowane

Source: https://github.com/anthropics/claude-code/issues/11364, accessed 2026-04-17.

## 5. Prompt caching - jak pomaga MCP

Claude API (cross product z Claude Code) ma **prompt caching** - repeat content w system prompt/tools cache'owane i oplacane 10% stawki zamiast 100%. Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching.

Dla MCP to znaczy:
- Tool definitions cache'owane miedzy calls w tej samej sesji -> redukcja efektywnego kosztu finansowego (nie kontekstu!)
- Context budget w tokens liczy sie tak samo (caching nie zwraca tokens do budgetu, tylko obniza rachunek $)

**Kluczowe rozroznienie:**
- **Cache HIT** = 10% ceny, ale te tokens WCIAZ zajmuja 200k kontekstu
- **Cache MISS** = 100% ceny, tokens tez zajmuja

Wniosek: caching pomaga kosztowo ($), nie pomaga pojemnosciowo (budget). Source: https://code.claude.com/docs/en/costs, accessed 2026-04-17.

## 6. Tool result size - drugi duzy koszt

Tool results (return value z tool call) wracaja do kontekstu i tam zostaja. Niebezpieczne patterny:

**Patologie:**
- Database query zwraca 10k rekordow -> ~500k tokens (wieksze niz budget). Result truncated by Claude Code albo error.
- `fetch` tool na duzej stronie HTML -> 50k+ tokens. Nie przydatne - Claude potrzebuje summary, nie raw.
- `git diff` na monorepo change -> 100k+ tokens.

**Mitigacja (po stronie serwera MCP):**
- Pre-summarize w serwerze (LLM call albo heurystyka)
- Pagination (zwroc `first 100 rows + row count + next_cursor`)
- Selection (zwroc tylko fields ktore Claude pyta)
- Size caps (truncate do 10k tokens z warning)

**Mitigacja (po stronie Claude Code):**
- Auto-compaction - gdy kontekst sie zapelnia, Claude Code automatycznie summuje historyczne wiadomosci. Source: https://code.claude.com/docs/en/costs.
- Manual `/compact` - user moze triggnac explicit.
- Context-mode sandboxing - tools like context-mode (https://github.com/mksglu/context-mode) sandbox MCP output w plikach, Claude czyta tylko summary. Source: community project, accessed 2026-04-17, claim: 98% reduction.

## 7. Timeout issues - empiryczne dane community

MCP tool calls wplywaja na performance czesto przez timeouts. Znane issues (GitHub anthropics/claude-code):

### Issue #20335 "MCP Server Timeout Configuration Ignored in Streamable SSE HTTP Connections"
MCP timeout w settings.json NIE jest respektowany dla HTTP transport. Default (~60s) uzywany zamiast configured value. Source: https://github.com/anthropics/claude-code/issues/20335, accessed 2026-04-17.

### Issue #3033 "MCP Server Timeout Configuration Ignored in SSE Connections"
Analogicznie dla SSE (deprecated, nadal w uzyciu). Impact: long-running tool calls cut mid-stream. Source: https://github.com/anthropics/claude-code/issues/3033.

### Issue #44032 "Claude Desktop MCP tool calls silently timeout after 4min on Windows"
Windows-specific 4-minute hard timeout. Dotyka WSZYSTKICH transports (stdio, HTTP, SSE). UI state corrupts after timeout. Source: https://github.com/anthropics/claude-code/issues/44032.

### Issue #15945 "[CRITICAL] MCP Server Causes 16+ Hour Hang - No Timeout or Stuck Detection"
Odwrotny problem: brak timeout jesli serwer silently hanging. System-wide unresponsiveness, 70+ zombie processes. Source: https://github.com/anthropics/claude-code/issues/15945.

### Issue #424 "[BUG] MCP Timeout needs to be configurable"
Pierwotny ticket z Q4 2024, nadal open z workarounds. Source: https://github.com/anthropics/claude-code/issues/424.

## 8. Timeout - empirical defaults (2026-04-17)

- **stdio transport**: default ~30s, konfigurowalny przez `MCP_TIMEOUT` env (jesli respektowany, vide issue #20335)
- **Streamable HTTP**: ~60s client-side w MCP TypeScript SDK
- **Claude Desktop Windows hardcoded**: 4 minut - nie override-owalny
- **Error code**: `-32001: Request timeout` (jsonrpc error)

Source: https://mcpcat.io/guides/fixing-mcp-error-32001-request-timeout/, accessed 2026-04-17.

**Mitigacja dla long-running MCP tools:**
1. Split dlugi call na multiple short (batch pattern)
2. Uzyj progress notifications zeby klient wiedzial ze serwer pracuje (zapobiega "silently stuck")
3. Stream partial results zamiast final blob
4. Server-side async - zwroc jobID, potem poll przez drugi call

## 9. Streaming vs batch - spec + implementacja

Spec MCP wspiera **streaming tool results** przez content items zwracane progresywnie. W Claude Code 2026 obsluga streaming jest **partial**:
- Content type `text` - progresywnie akumulowany
- Content type `image` - batch only (one-shot)
- Content type `resource` - reference do resource, leniwe

Streaming pomaga UX (user widzi progress) ale nie zmienia total tokens. Dla bardzo duzych results streaming + progressive summarization po stronie klienta byloby cure (nie zaimplementowane 100% w 2026-04-17).

Source: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/server.md + community discussions.

## 10. Context budget dla MCP - praktyczne wskazniki

Z observations community (Reddit r/ClaudeCode, scott Spence blog):

| Liczba serwerow | Typowe tool defs | % budzetu (200k) |
|-----------------|------------------|------------------|
| 0 | 0 | 0% |
| 1-2 small | 5-10k | 2-5% |
| 3-5 typical | 15-30k | 7-15% |
| 6-8 power-user | 40-60k | 20-30% |
| 10+ heavy | 70-100k+ | 35-50% |
| 15+ extreme | 100k+ | 50%+ (dangerous) |

Source: https://scottspence.com/posts/optimising-mcp-server-context-usage-in-claude-code + https://buildtolaunch.substack.com/p/claude-code-token-optimization, accessed 2026-04-17.

**Recommendation:** nie przekraczac 5-7 servers naraz. Enable/disable per task. Claude Code 2026 pozwala `/mcp disable <name>` i `/mcp enable <name>` w sesji.

## 11. Optimization strategies - pelna lista

### Na poziomie user (konfiguracja):
- Wlaczaj tylko serwery potrzebne do aktualnego task
- Uzyj `enabledMcpjsonServers` explicit lista (zamiast enableAll)
- Compact regularnie (`/compact`) dla dlugich sesji
- Tool Search Tool wlaczone (check settings)

### Na poziomie serwera (developer):
- Krotkie, precyzyjne tool descriptions (1-2 zdania)
- Input schema bez zbednych pol
- Response size cap (truncate duze wyniki)
- Pagination dla list results
- Progress notifications dla long calls

### Na poziomie architektury:
- Jeden gateway serwer zamiast wiele (docker/mcp-gateway pattern)
- Lazy-load per-tool (server only loads heavy schemas gdy tool wybrany)
- Resource-first approach (uzyj resources zamiast tool dla static data)

Source compilation: https://buildtolaunch.substack.com/p/claude-code-token-optimization + Scott Spence blog.

## 12. Model routing dla MCP calls - Q5 z MANIFEST

Q5: "Czy Claude wybiera model per MCP tool?"

Na 2026-04-17 stan:
- Claude Code domyslnie uzywa jednego modelu na sesje (Opus 4.x, Sonnet 4.x, czy inny configured)
- MCP calls NIE triggeruja zmiany modelu - cala sesja na tym samym modelu
- Exception: subagents (Task tool) moga byc configured z innym modelem przez skill frontmatter. Ale to dotyczy subagenta, nie MCP per se.
- **Nie ma "per-tool model selection"** w 2026-04-17.

Source: https://code.claude.com/docs/en/ + community clarification threads.

## 13. Response size - hard limits i recommendations

- **200k context window** (Sonnet/Opus) - total hard limit dla whole sesji
- **Max tool result**: nie ma explicit hard limit spec, ale praktycznie >50k tokens rozwala UX (Claude "zapomina" co bylo wczesniej)
- **Zalecane target**: tool result <5k tokens per call
- **Auto-compaction trigger**: Claude Code zaczyna kompresowac historia gdy zbliza sie do 80% budgetu

Source: https://platform.claude.com/docs/en/build-with-claude/context-windows.

## 14. Empirical benchmarks do cytowania

Z community testow (2026-04-17 vintage):
- **5k rows SQL query** -> ~40-50k tokens tool result (z JSON overhead)
- **1 Slack message send** -> ~200 tokens tool result
- **`git diff HEAD~10..HEAD` large PR** -> 20-100k tokens (brutal)
- **Fetch URL (typical HTML page)** -> 10-30k tokens raw, 2-3k after summarization
- **Postgres schema (10 tables)** -> 3-5k tokens

Source: community dev.to + Medium articles + Reddit benchmarks, accessed 2026-04-17.

## 15. Anti-patterns (observed)

1. **"Install everything awesome-mcp"** - 20 serwerow = 100k+ tokens od startu, 50% budzetu spalone
2. **Verbose tool descriptions** ("This tool lets you do X, Y, Z, blah blah blah...") - oplacasz w kazdym call
3. **No response limits** w server - user dostaje `result too large` fail po 2 pytaniach
4. **Long-poll tool calls bez progress** - 4 min timeout + nothing happens = bad UX
5. **No disable/enable per task** - keeping 10 servers active "just in case" = zmarnowany budget

## 16. Gaps do delta-researchu

- Exact caching hit rate dla MCP tool defs w Claude Code (nie opublikowane metryki officjalne)
- Czy Tool Search Tool dziala dla resources i prompts tez, czy tylko tools - unclear
- Benchmark streaming vs batch exact overhead

## 17. Kluczowe zrodla

- **MindStudio token overhead:** https://www.mindstudio.ai/blog/claude-code-mcp-server-token-overhead (accessed 2026-04-17)
- **Scott Spence optim:** https://scottspence.com/posts/optimising-mcp-server-context-usage-in-claude-code
- **Tool Search Tool:** https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool
- **Tool Search Tool benchmark:** https://medium.com/@joe.njenga/claude-code-just-cut-mcp-context-bloat-by-46-9-51k-tokens-down-to-8-5k-with-new-tool-search-ddf9e905f734
- **Issue #11364 lazy load:** https://github.com/anthropics/claude-code/issues/11364
- **Issue #20335 timeout:** https://github.com/anthropics/claude-code/issues/20335
- **Issue #15945 hang:** https://github.com/anthropics/claude-code/issues/15945
- **Issue #44032 Windows 4min:** https://github.com/anthropics/claude-code/issues/44032
- **MCPcat timeout guide:** https://mcpcat.io/guides/fixing-mcp-error-32001-request-timeout/
- **Claude Code costs:** https://code.claude.com/docs/en/costs
- **BuildtoLaunch token guide:** https://buildtolaunch.substack.com/p/claude-code-token-optimization
- **Context windows:** https://platform.claude.com/docs/en/build-with-claude/context-windows
- **Context mode sandbox:** https://github.com/mksglu/context-mode

## 18. Podsumowanie (1 paragraf)

MCP konsumuje kontekst Claude Code na dwa sposoby: tool definitions upfront (8-15k tokens per server, do 67k przy 7 serverach = 33% budzetu 200k) i tool results per call (zmienne, patologiczne cases 50k+ tokens). Tool Search Tool (Anthropic native Q1 2026) redukuje definitions o 46.9% (51k -> 8.5k) przez deferred loading tylko nazw upfront, pelne schemas on-demand. Prompt caching obniza **koszt finansowy** (10% za cache hit) ale NIE zwalnia tokens z context budget. Timeout issues sa znane - HTTP default 60s nie respektuje user configuration (#20335), Windows hardcoded 4-minut (#44032), brak detection silent hang (#15945). Optimization: 3-5 servers max naraz, krotkie tool descriptions, response size limits w serverze (pagination, truncation), progress notifications dla long calls, Tool Search Tool wlaczony, `/compact` po duzych tool results. Typical enterprise trio (GitHub + Filesystem + Postgres) zjada ~25k tokens. Power-user setup (7+ servers) zaczyna degradowac UX po drugim duzym tool result. Model routing per-tool NIE istnieje w 2026-04-17 - cala sesja w jednym modelu. Liczba slow: ~2020.
