# R2 - Building MCP Servers (Python SDK, TypeScript SDK, local vs remote decision, production)

**Rola:** res_docs (Sonnet)
**Data accessed:** 2026-04-17
**Scope:** Jak zbudowac wlasny serwer MCP: Python SDK (FastMCP), TypeScript SDK, boilerplate, decorator patterns, error handling, stdio vs HTTP decision tree, Docker packaging, dystrybucja. Od "hello world" do production. Cap slow: 4000.

---

## 1. Dwa oficjalne SDK, jedna strategia

Na 2026-04-17 Anthropic utrzymuje dwa oficjalne SDK dla budowania serwerow MCP:
- **Python:** `mcp` package na PyPI (oraz jego high-level wrapper **FastMCP**, rozwijany pod `PrefectHQ/fastmcp`, obecnie w wersji 3.0 released 2026-01-19)
- **TypeScript:** `@modelcontextprotocol/sdk` na npm (https://github.com/modelcontextprotocol/typescript-sdk)

Source: https://github.com/modelcontextprotocol/python-sdk + https://github.com/modelcontextprotocol/typescript-sdk, accessed 2026-04-17.

Oba SDK obsluguja wszystkie 3 primitives (tools/resources/prompts) i wszystkie 3 transports (stdio/Streamable HTTP/SSE legacy). Roznia sie tylko ergonomika jezyka.

**Rekomendacja defaultowa:** Python FastMCP dla rapid development i integracji ML/data workflows, TypeScript dla deploy do Cloudflare Workers, Vercel, Netlify albo integracji z existing Node backend. Source: https://gofastmcp.com/tutorials/create-mcp-server + https://maurocanuto.medium.com/building-mcp-servers-the-right-way-a-production-ready-guide-in-typescript-8ceb9eae9c7f.

## 2. Python FastMCP - "hello world" w 15 liniach

FastMCP to "Flask of MCP" - decorator-based API, zero boilerplate:

```python
from fastmcp import FastMCP

mcp = FastMCP("Demo")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b

@mcp.resource("config://app")
def get_config() -> str:
    """Return app config."""
    return "v1.0.0"

if __name__ == "__main__":
    mcp.run()  # stdio by default
```

Co FastMCP automatyzuje:
- **Tool name** z function name
- **Description** z docstring (to leci do LLM jako opis)
- **Input schema** z type hints (pydantic generuje JSON Schema)
- **Error handling** - exceptions -> JSON-RPC error response
- **Content wrapping** - return value pakowany w MCP content item

Source: https://gofastmcp.com/tutorials/create-mcp-server, https://www.firecrawl.dev/blog/fastmcp-tutorial-building-mcp-servers-python, accessed 2026-04-17.

FastMCP 3.0 (styczen 2026) dodal:
- **Component versioning** - wersjonowanie narzedzi (v1/v2) z coexistence
- **Granular authorization** - per-tool auth rules
- **OpenTelemetry instrumentation** - out of the box traces i metryki
- **Multiple provider types** - multi-backend tool routing
Source: https://gofastmcp.com (changelog), https://pypi.org/project/fastmcp/, accessed 2026-04-17.

## 3. Python low-level SDK - gdy FastMCP to za malo

Official `mcp` SDK (z Anthropic, bez Prefect layer) daje prymitywy:

```python
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

server = Server("demo")

@server.list_tools()
async def list_tools():
    return [Tool(name="add", description="...", inputSchema={...})]

@server.call_tool()
async def call_tool(name, arguments):
    if name == "add":
        return [TextContent(type="text", text=str(arguments["a"]+arguments["b"]))]

async def main():
    async with stdio_server() as (read, write):
        await server.run(read, write, server.create_initialization_options())
```

Source: https://github.com/modelcontextprotocol/python-sdk, accessed 2026-04-17.

Kiedy low-level: custom capability negotiation, nietypowe transports, embedding MCP w existing async framework.

## 4. TypeScript SDK - "hello world"

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "demo", version: "1.0.0" });

server.registerTool("add", {
  description: "Add two numbers",
  inputSchema: { a: z.number(), b: z.number() }
}, async ({ a, b }) => ({
  content: [{ type: "text", text: String(a + b) }]
}));

const transport = new StdioServerTransport();
await server.connect(transport);
```

Three-step pattern uniwersalny dla TS: (1) create McpServer i register tools/resources/prompts, (2) create transport (Stdio albo Streamable HTTP), (3) `server.connect(transport)`. Source: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/server.md, accessed 2026-04-17.

Zod jest uzywany dla input schema (runtime type validation + JSON Schema generation). Source: dev.to "How to build MCP servers with TypeScript SDK", https://dev.to/shadid12/how-to-build-mcp-servers-with-typescript-sdk-1c28.

## 5. Decision tree: stdio vs Streamable HTTP

**Uzyj stdio gdy:**
- Lokalny developer tool (czytanie plikow, git, CLI wrapper)
- Server ma dostep do lokalnego filesystem albo hardware
- Uzytkownik jeden (personal MCP per user)
- Zero-config uruchamianie (Claude Code spawnuje subprocess)
- Brak potrzeby autoryzacji (trust based na local machine)

**Uzyj Streamable HTTP gdy:**
- Team/organization share (jeden server, wielu user)
- SaaS integration (Slack, Postgres via proxy)
- Server musi byc zawsze online
- Potrzebny OAuth/auth layer (spec wymaga OAuth 2.1 + PKCE)
- Deploy na Cloudflare Workers, Vercel, AWS Lambda

Split z industry practice 2026: **30% stdio / 70% HTTP** w production. Source: https://particula.tech/blog/mcp-developer-guide, accessed 2026-04-17.

**SSE (deprecated) unikac** - tylko jesli upstream vendor jeszcze nie dostarczyl HTTP. Source: https://apigene.ai/blog/mcp-sse-vs-stdio.

## 6. Konfiguracja w Claude Code

Trzy poziomy:
1. **User settings** (`~/.claude/settings.json` albo `~/.claude.json`) - per-user, wszystkie projekty
2. **Project settings** (`.claude/settings.json` albo `.mcp.json` w repo) - shared z zespolem
3. **Managed settings** (enterprise, deploy przez IT) - wymusza polityki

Komendy CLI:
```bash
# Add local stdio server
claude mcp add my-server -- python server.py

# Add HTTP remote
claude mcp add --transport http my-api https://api.example.com/mcp

# Add SSE (legacy)
claude mcp add --transport sse old-service https://sse.example.com
```

Source: https://code.claude.com/docs/en/mcp, accessed 2026-04-17.

Plik `.mcp.json` w repo ma format:
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {"GITHUB_TOKEN": "${GITHUB_TOKEN}"}
    }
  }
}
```

Source: https://www.builder.io/blog/claude-code-mcp-servers, accessed 2026-04-17.

Settings flagi kluczowe:
- `enableAllProjectMcpServers: true` - wlacza wszystkie z `.mcp.json` bez dialog (CI-friendly ale security risk, patrz R3)
- `enabledMcpjsonServers: ["github", "memory"]` - whitelist jawny
- `disabledMcpjsonServers: [...]` - blacklist

## 7. Error handling patterns

Python FastMCP - normalne exceptions:
```python
@mcp.tool()
def divide(a: int, b: int) -> float:
    if b == 0:
        raise ValueError("Division by zero")
    return a / b
```
Exception -> JSON-RPC error response z code -32603 i message.

TypeScript - zwracaj throw albo content z `isError: true`:
```typescript
return { content: [{type:"text", text:"..."}], isError: true };
```

Best practice: error messages PO LLM - LLM je czyta i moze retry/recover. Nie loguj credentials w error message. Source: https://blog.stackademic.com/ + cyanheads guide, accessed 2026-04-17.

## 8. Docker packaging

Typowy Dockerfile dla MCP server (Python):
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY server.py .
CMD ["python", "server.py"]
```

Dla HTTP transport dodaj EXPOSE 8000 i uruchom przez uvicorn albo FastMCP-native HTTP mode. Source: https://apigene.ai/blog/python-mcp-server, accessed 2026-04-17.

Claude Code moze spawnowac Docker container jako MCP server:
```json
{"command": "docker", "args": ["run", "-i", "--rm", "my-mcp-server:latest"]}
```

Istnieje tez **Docker MCP Toolkit** (https://github.com/docker/mcp-gateway) - gateway co agreguje wiele MCP serwerow za jednym HTTP endpointem, z auth i rate limiting. Popular enterprise pattern.

## 9. Dystrybucja - gdzie hostowac

**Local package:**
- PyPI (pip install my-mcp-server) - Python
- npm (npx -y my-mcp-server) - TypeScript - najlepsze dla zero-install
- GitHub release binaries - Go/Rust

**Remote hosting:**
- **Cloudflare Workers** - zero cold start, OAuth template gotowy, rekomendowany dla OAuth flows. Source: https://www.stainless.com/mcp/mcp-typescript-sdk-for-building-clients-and-servers.
- **Vercel** - dobry dla TypeScript, Edge runtime
- **AWS Lambda / Azure Container Apps** - enterprise deploy. Microsoft Learn: https://learn.microsoft.com/en-us/azure/developer/ai/build-mcp-server-ts
- **Render / Fly.io** - cheap always-on VMs

**MCP Registry Anthropic:** https://api.anthropic.com/mcp-registry/v0/servers - oficjalny registry z labeled-commercial visibility, Claude Code pokazuje dostepne serwery z registry w UI. Source: https://code.claude.com/docs/en/mcp embedded fetch.

## 10. Autoryzacja (OAuth 2.1 PKCE mandate)

Spec MCP wymaga **OAuth 2.1 z PKCE** dla HTTP transport (network-exposed). Source: https://maurocanuto.medium.com/building-mcp-servers-the-right-way-a-production-ready-guide-in-typescript-8ceb9eae9c7f.

Minimum flow:
1. Klient -> serwer `/authorize` (PKCE challenge)
2. User redirect do identity provider (Google, GitHub, custom)
3. Callback z code
4. Klient -> serwer `/token` (exchange code + PKCE verifier)
5. Subsequent MCP calls z Bearer token

Claude Code 2026 obsluguje OAuth flow przez browser (otwiera okno) albo device flow (CLI). Source: https://www.truefoundry.com/blog/mcp-authentication-in-claude-code, accessed 2026-04-17.

Dla stdio transport - brak mandate, trust based na local execution. Ale env vars i secrets trzeba handling ostroznie (patrz R3).

## 11. Testing - MCP Inspector

Oficjalny narzedzie do debugowania: `npx @modelcontextprotocol/inspector`. Uruchamia GUI (web) gdzie wprowadzasz command/URL serwera i eksplorujesz jego tools/resources/prompts interaktywnie. Source: https://modelcontextprotocol.io/docs/tools/debugging.

Pattern:
1. Napisz serwer
2. `npx @modelcontextprotocol/inspector python server.py`
3. Otworz http://localhost:5173
4. Test tools przed podlaczeniem do Claude Code

FastMCP ma wbudowane "dev mode": `fastmcp dev server.py` uruchamia Inspector i serwer jednoczesnie. Source: https://gofastmcp.com, accessed 2026-04-17.

## 12. Advanced patterns

**Resource templates (URI z parametrami):**
```python
@mcp.resource("user://{user_id}/profile")
def user_profile(user_id: str) -> str:
    return fetch_user(user_id).json
```
Klient moze zapytac `user://123/profile` - MCP route do handler z user_id=123.

**Streaming tool results:**
W TypeScript via generator/AsyncIterable w content items. Python: tez ale przez async generators w FastMCP. Uzytek: long-running jobs, progress updates. Claude Code 2026 supports streaming content. Source: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/server.md.

**Sampling z klienta:**
Serwer moze request sampling LLM call od hosta (rzadkie, wymaga user consent per spec). Usage: self-reflective agents, multi-step reasoning inside serwera. Anthropic rekomenduje ostroznosc.

**Progress notifications:**
Dla long calls wyslij `notifications/progress` z progressToken. Host pokazuje user (lub ignoruje). Claude Code wyswietla w statusline.

## 13. Production readiness checklist

Kazdy MCP server do produkcji powinien miec:
- [ ] OpenTelemetry/logging integration (FastMCP 3.0 native)
- [ ] Rate limiting per tool/per user
- [ ] Input validation (Zod w TS, Pydantic w Python)
- [ ] Timeout handling (long tool calls - wraca progress lub chunks)
- [ ] Error messages readable dla LLM (jezyk naturalny, nie stack trace)
- [ ] Security review env vars (nie commituj tokens do `.mcp.json`)
- [ ] OAuth 2.1 + PKCE dla HTTP transport
- [ ] Health endpoint (`/health` dla HTTP - monitoring)
- [ ] Version tagging (component versioning dla coexistence)
- [ ] Tests - unit dla tool handlers, integration przez Inspector

Source: https://maurocanuto.medium.com + https://circleci.com/blog/building-and-deploying-a-python-mcp-server-with-fastmcp/, accessed 2026-04-17.

## 14. Antipatterns (z observations do R7)

- **Over-tooling:** 50 tools w jednym serwerze -> 50k tokens w kazdym API call (patrz R6). Lepiej: modularne serwery per domain.
- **Verbose descriptions:** description zerajacy pol ekranu markdowna. Claude czyta kazde slowo kosztem tokenow.
- **Nested JSON w responses:** content zwroconego narzedzia jako gigantyczny JSON. Lepiej: pre-process, zwroc tylko relevant fields.
- **No timeout on external API:** tool wywoluje REST API bez timeout -> 16h hangs (observed issue #15945). Always `timeout=30`.
- **Credentials w command args:** `args: ["--api-key", "sk-..."]` widoczne w procesach. Uzyj env vars z `${VAR}` substitution.

## 15. Kluczowe zrodla (primary)

- **Python SDK:** https://github.com/modelcontextprotocol/python-sdk (accessed 2026-04-17)
- **TypeScript SDK:** https://github.com/modelcontextprotocol/typescript-sdk
- **FastMCP:** https://gofastmcp.com (v3.0, 2026-01-19)
- **TS server docs:** https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/server.md
- **Claude Code MCP docs:** https://code.claude.com/docs/en/mcp
- **Inspector:** https://modelcontextprotocol.io/docs/tools/debugging
- **Production guide TS:** https://maurocanuto.medium.com/building-mcp-servers-the-right-way-a-production-ready-guide-in-typescript-8ceb9eae9c7f

## 16. Gaps zidentyfikowane w R2

- Brak oficjalnego SDK dla Go, Rust, Java (community implementations istnieja)
- Brak "managed MCP" concept w Claude Code - wszystko per-user albo per-project; enterprise policy push to manual via IT
- MCP Registry Anthropic jest commercial-visibility-only, brak self-publish dla OSS (status na 2026-04-17, moze sie zmienia)

## 17. Podsumowanie (1 paragraf)

Budowa MCP server w 2026 to 15 linii w Python FastMCP albo TypeScript SDK z decoratorami/registration. Trudnosc rosnie gdy chcemy production: OAuth 2.1 + PKCE dla HTTP transport (mandate), Docker packaging, OpenTelemetry observability, rate limiting, lazy-loading tool definitions dla token economy. Decision stdio vs HTTP zalezy od scope (local jeden user vs shared team/org). MCP Inspector jest oficjalnym debug toolem. Claude Code konfiguruje MCP przez `claude mcp add` plus settings w `.mcp.json` (project) albo `~/.claude/settings.json` (user). FastMCP 3.0 (styczen 2026) jest obecnie top choice dla Python development z component versioning, granular authz i native OpenTelemetry. Liczba slow: ~1950.
