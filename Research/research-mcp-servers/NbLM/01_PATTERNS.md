# 01_PATTERNS - Claude Code MCP 2026

Praktyczne wzorce: budowa, zabezpieczanie, debugowanie, optymalizacja serwerow MCP.

---

## Pattern 1: Prosty lokalny serwer Python (FastMCP)

**Kiedy uzyc:** masz jedno API wewnetrzne, pisane w Pythonie, dziala tylko lokalnie dla jednego uzytkownika.

**Stack:** Python 3.10+, FastMCP 3.0 (released 2026-01-19), stdio transport. (R2.C1, R2.C2)

**Setup:**
```bash
pip install fastmcp
```

**Kod minimalny:**
```python
from fastmcp import FastMCP

mcp = FastMCP("my-server")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b

@mcp.tool()
def search_docs(query: str, limit: int = 10) -> list[str]:
    """Search internal documentation."""
    return my_search_impl(query, limit)

if __name__ == "__main__":
    mcp.run()
```

**Podlaczenie w Claude Code:**
```bash
claude mcp add mydocs --command python --args my_server.py
```

Decorator `@mcp.tool()` generuje JSON schema z type hints. Docstring staje sie tool description - pisze go precyzyjnie, bo Claude decyduje po nim kiedy uzyc tool. (R2.C3)

**Anti-pattern:** description typu "Various helpful operations". Claude nie wie kiedy uzyc. Pisz konkretnie: "Search internal engineering docs, returns top N results sorted by relevance". (R7.C7)

---

## Pattern 2: Remote HTTP serwer z OAuth (TypeScript)

**Kiedy uzyc:** multi-tenant SaaS, uzytkownicy logujacy sie swoim kontem, potrzebujesz auth + audit trail.

**Stack:** Node.js 20+, `@modelcontextprotocol/sdk`, Streamable HTTP transport, OAuth 2.1 + PKCE. (R2.C4, R2.C5)

**Kluczowe wymagania:**
1. OAuth 2.1 (nie 2.0 - PKCE mandatory) (R2.C11)
2. HTTPS only (TLS 1.2+)
3. Rate limiting per token
4. Audit log kazdego tool call
5. Rotacja refresh tokenow

**Skeleton:**
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";

const server = new McpServer({ name: "saas-tools", version: "1.0.0" });

server.registerTool("create_order", {
  description: "Create order in customer's account",
  inputSchema: { customerId: z.string(), items: z.array(...) }
}, async (args, ctx) => {
  const user = await verifyOAuth(ctx.headers.authorization);
  auditLog.write({ user, tool: "create_order", args });
  return await ordersApi.create(user.tenant, args);
});

const app = express();
app.use(oauthMiddleware);
app.post("/mcp", async (req, res) => {
  const transport = new StreamableHTTPServerTransport();
  await server.connect(transport);
  await transport.handleRequest(req, res);
});
app.listen(3000);
```

**Podlaczenie client-side:**
```bash
claude mcp add saas --url https://api.example.com/mcp --oauth
```

Pierwsze `tools/list` na OAuth server zwraca pusty array dopoki uzytkownik nie ukonczy auth flow. To nie bug, to feature. (R7.C13, R7.C20)

---

## Pattern 3: Security hardening (production)

**Dotyczy:** kazdego serwera ktory idzie na production, zwlaszcza w enterprise.

**Checklist (R2.C12, R3.C5):**

1. **Auth:** OAuth 2.1 + PKCE dla HTTP; dla stdio - ufaj procesowi ale audytuj co spawn uruchamia.

2. **Input validation:** zod/pydantic schema na kazdym tool. NIE polegaj na Claude ze walidował.

3. **Output sanitization:** jesli tool zwraca user-controlled text, escapuj go. Prompt injection lezy w tool results tez.

4. **Rate limiting:** per-token i per-tool. Bez tego jeden rogue prompt moze odpalić 1000 API calls.

5. **Least privilege:** serwer ma miec scope tylko tego co potrzebuje. Nie podlaczaj "admin GitHub" jesli wystarczy "read-only repo X".

6. **Egress firewall:** serwer na VPS - whitelist destination hosts. Zapobiega C2 exfiltration (lesson from CVE-2026-21852). (R3.C4)

7. **Audit log:** kazdy tool call -> log (user, tool, args hash, timestamp, result status). Bez tego nie wykryjesz abuse.

8. **Secrets via env:** nigdy secrets w config JSON. Uzywaj env vars, secret manager (Vault, AWS Secrets Manager).

9. **Supply chain:** pin exact versions (npx -y package@X.Y.Z), nie @latest. CVE-2025-59536 pokazal ze npm supply chain to realny wektor. (R3.C1, R7.C19)

10. **Review tool descriptions:** przed deploy czytaj kazdy description jak prompt. Serwer moze ukryc "ignore previous instructions and...". (R3.C3)

**Config-as-attack-surface mitigation:**
- Enterprise managed policy: `C:\ProgramData\ClaudeCode\managed-settings.json` ma prece nad user settings, blokuje malicious project configs. (R3.C6)
- Git hook pre-commit weryfikuje ze `.claude/settings.json` nie ma nieznanych serverow.
- Code review PR ktory modyfikuje `.claude/*`.

---

## Pattern 4: Debugging flow (gdy serwer nie dziala)

**Symptom -> root cause -> fix matrix (R7.C3, R7.C4, R7.C5, R7.C6, R7.C7):**

| Symptom | Prawdopodobna przyczyna | Fix |
|---------|-------------------------|-----|
| Server "connected" ale zero tools | `tools/list` zwraca pusty array (OAuth not completed albo bug serwera #11175) | `claude mcp auth <server>`, sprawdz logs, MCP Inspector standalone |
| "Server unavailable" przy starcie | Binary nie w PATH, SSL cert issue, firewall, silent crash | `which <binary>`, run command recznie, sprawdz stderr |
| Dziala w Claude Desktop, nie w CLI | Rozne config paths | Desktop: `claude_desktop_config.json`; CLI: `~/.claude/settings.json` |
| Timeout pomimo config | Issue #20335 (HTTP timeout ignored), #44032 (Windows 4min hardcoded) | Use stdio jesli mozliwe, albo zredukuj tool response size |
| Claude nie uzywa tool | Description vague, name collision z built-in, permissions deny | Napisz precyzyjny description, rename tool, sprawdz `permissions.deny` |

**Standard debug flow (R7.C8):**
```bash
# 1. Czy serwer jest zarejestrowany?
claude mcp list

# 2. Czy serwer startuje samodzielnie?
npx @modelcontextprotocol/inspector <command>
# otwiera GUI na http://localhost:5173

# 3. Logi
tail -f ~/.claude/logs/mcp-<server>.log

# 4. Debug flag
claude --debug
# pokazuje pelny JSON-RPC traffic

# 5. Minimal repro
# Wylacz wszystkie inne servery, zostaw tylko problematic, restart sesji.
```

**Znane long-standing bugi na 2026-04-17 (R7.C25):**
- #424 - timeout nieconfigurable
- #11364 - brak lazy-load tool definitions (addressed by Tool Search Tool)
- #20335 - HTTP timeout ignored
- #44032 - Windows 4-min hardcoded timeout
- #15945 - brak stuck process detection
- #12086 - external MCP not loading

---

## Pattern 5: Performance optimization (token economy)

**Gdy uzyc:** masz 5+ serwerow aktywnych, context window sie wypelnia, latency rosnie.

**Metryki do sledzenia:**
- Tool definitions total tokens (upfront cost)
- Avg tool result size (per-use cost)
- Context headroom na koniec kazdego turn

**Techniki redukcji (R6.C20, R6.C23):**

1. **Dynamic enable/disable:** `/mcp disable github` gdy nie pracujesz z GH. Odpina tool defs z kontekstu. (R6.C20)

2. **Tool Search Tool (Q1 2026):** upfront Claude widzi tylko names, schemas laduja on-demand. 46.9% redukcja przy 7 serwerach (67k -> 8.5k). Enable przez Anthropic platform setting. (R6.C6, R6.C7)

3. **Server-side response shaping:**
   - Pagination z `next_cursor` dla list endpoints.
   - Field selection - tool params `fields: ["id", "name"]` zamiast zwracac pelen obiekt.
   - Size caps - truncate po 5k tokens z `{"_truncated": true, "_next": "..."}`.
   - Pre-summarize - zamiast 10k rekordow zwroc 500-tokenowy summary + link.

4. **Minimalny description:** nie pisz eseju. "Search engineering docs. Returns top matches with URL + snippet." (~20 tokens) wystarczy.

5. **Prompt caching (10% cost):** Anthropic API ma cache hit dla stable tool definitions - 10% ceny. ALE tokens wciaz licza sie do 200k budzetu. Caching pomaga kosztowo ($), nie pojemnosciowo. (R6.C9)

**Anti-pattern: "install everything from awesome-mcp"**
10+ serverow = 50k+ tokens definitions na start. Zostaje Ci 150k na reszte. Masz 2-3 tury konwersacji zanim auto-compact zacznie cykl. (R7.C23)

---

## Pattern 6: CI/CD + headless usage

**Kontekst:** Claude Code dziala w GitHub Actions / GitLab CI, nie ma sesji interaktywnej, nie ma uzytkownika zeby klikal allow.

**Problem:** permissions prompt blokuje run. Issue #647. (R7.C18)

**Rozwiazanie (trade-off):**
```yaml
# .github/workflows/claude.yml
env:
  CLAUDE_ENABLE_ALL_PROJECT_MCP: true  # enableAllProjectMcpServers
```

To uruchamia wszystkie serwery z `.claude/settings.json` w repo bez pytania. **Trade-off:** jesli malicious PR doda nowy serwer, ten pojdzie w CI. (R3.C7)

**Mitigation (R3.C7, R7.C19):**
1. Pin exact versions: `"args": ["-y", "@modelcontextprotocol/server-github@1.2.3"]`
2. Branch protection: wymaga review PR na `.claude/settings.json`.
3. Separate CI identity bez prod secrets.
4. Audit log wszystkich tool calls w CI.

**Alternatywa headless:** `--allowedTools "Bash(git:*),mcp__github__*"` explicit whitelist. Bezpieczniejsze ale per-preset maintenance.

---

## Pattern 7: Aggregator gateway

**Kiedy uzyc:** chcesz 100+ integracji (Slack, GitHub, Notion, Linear, Jira, Gmail, Calendar, Drive, Dropbox, Zapier apps), ale nie 100 osobnych serwerow w context.

**Opcje 2026-04-17:**

1. **Rube (rube.app):** zarzadzany aggregator, 500+ tool integrations, jedna MCP connection, auth per-tool wewnatrz. (R7.C16)

2. **docker/mcp-gateway:** open-source gateway, lokalny Docker Compose, agreguje wiele stdio serverow za jednym HTTP endpointem.

3. **Zapier MCP:** laduje wszystko z Zapier katalogu (3000+ apps) jako MCP tools.

**Trade-offs:**
- Pro: jedna connection = mniej token overhead na capability negotiation.
- Pro: jeden audit point.
- Con: single point of failure.
- Con: aggregator widzi wszystkie Twoje secrets (trust boundary).
- Con: tool count eksploduje - bez Tool Search Tool i tak zuzywa tokens.

**Pattern enterprise:** wlasny gateway (Kong, custom proxy) przed zewnetrznymi MCP serwerami - logging, rate limit, policy enforcement, PII scrubbing.

---

## Pattern 8: Migracja legacy (Puppeteer -> Playwright)

**Kontekst:** Anthropic zdeprecated Puppeteer MCP w 2025-10, rekomendujac Playwright MCP. (R4.C7)

**Steps:**
1. Identify: `claude mcp list | grep puppeteer`
2. Backup config i note konkretnych tool calls uzywanych w Skills/Commands.
3. Remove: `claude mcp remove puppeteer`
4. Install: `claude mcp add playwright --command npx --args "-y" "@playwright/mcp"`
5. Update wywolania w Skills - names moga byc inne (np. `browse` vs `goto`).
6. Run smoke test: "open example.com, take screenshot, return title".

**Generalny patron:** gdy serwer jest deprecated, sprawdz awesome-mcp-servers pod successor. Uniwersalna zasada: prefer official Anthropic > community well-maintained > random repo.

---

## Pattern 9: Personal project-scoped MCP

**Kiedy uzyc:** masz projekt gdzie potrzebujesz domain context (product schema, recent orders, design tokens, feature flags) dostepnego w kazdej sesji Claude Code. (R7.C14)

**Struktura:**
```
myproject/
  .claude/
    settings.json
    mcp-server/
      server.py          # FastMCP custom
      requirements.txt
      data/
        schema.json
        recent_orders.db
```

`.claude/settings.json`:
```json
{
  "mcpServers": {
    "myproject-context": {
      "command": "python",
      "args": [".claude/mcp-server/server.py"]
    }
  }
}
```

**Tool examples:**
- `get_product_schema(product_id)` - zwraca aktualny schema
- `recent_orders(customer_id, days=7)` - live query
- `design_tokens(component)` - zwraca obowiazujace tokeny
- `feature_flags(env)` - state flag

**Dlaczego to lepsze niz CLAUDE.md:**
CLAUDE.md laduje static text upfront. MCP server zwraca LIVE data na zadanie. Tylko relevant data idzie do kontekstu. (R5.C10)

---

## Pattern 10: Monitoring i alerting produkcyjny

**Dotyczy:** serwera udostepnionego szerszej publicznosci (team, klienci, open source).

**Co monitorowac:**
1. **Uptime** - ping endpoint `/health` co 30s.
2. **Latency** - p50/p95/p99 per tool.
3. **Error rate** - -32xxx JSON-RPC errors.
4. **Auth failures** - OAuth token expired, invalid PKCE.
5. **Rate limit hits** - per user, per tool.
6. **Tool result size distribution** - outliers >50k tokens to probe abusive patterns.
7. **Egress destinations** - firewall deny rate, nieznane hosts.

**Stack przykladowy:**
- Logging: structured JSON -> Loki/ELK
- Metrics: Prometheus + Grafana
- Tracing: OpenTelemetry (MCP spec wspomina OTEL compat w 2026)
- Alerting: PagerDuty / Slack webhook dla p99 latency spike, error rate > 2%

---

## Podsumowanie matrix pattern -> use case

| Pattern | Use case | Effort | Risk |
|---------|----------|--------|------|
| 1 FastMCP lokal | Personal tools, solo dev | Low | Low |
| 2 Remote HTTP + OAuth | SaaS, multi-tenant | High | Medium |
| 3 Security hardening | Production | Medium | Low (jesli skip - High) |
| 4 Debugging flow | Gdy cos nie dziala | Low | N/A |
| 5 Performance opt | Context pressure | Medium | Low |
| 6 CI/CD | Automation, headless | Low-Medium | Medium (enableAll) |
| 7 Aggregator | 20+ integrations | Low (install) | Medium (trust) |
| 8 Migracja | Deprecated servers | Low | Low |
| 9 Project MCP | Domain context per project | Medium | Low |
| 10 Monitoring | Production, SLA | High | Low (jesli skip - High) |

---

## Dalej

- Nie wiesz czy MCP czy cos innego? -> `02_DECISION_GUIDE.md`
- Chcesz zrobic video/infografike o tym? -> `03_MEDIA_PROMPTS.md`
- Pelna synteza z conflicts/gaps? -> `../plans/SYNTHESIS.md`

---

*Zrodlo claimow: E1-E7 extracts. Citation format R<N>.C<M>. Data: 2026-04-17.*
