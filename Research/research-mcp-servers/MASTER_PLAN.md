# MASTER_PLAN - Claude Code MCP Servers Deep Dive 2026

**Kampania:** Tier 2 #4 z Research Roadmap 2026
**Data przygotowania:** 2026-04-17 (gotowe do odpalenia)
**Preset:** `/deep-research-v2` (17 agentow, map-reduce + Extractor phase)
**Model routing:** STANDARD (Orch/Critic/Syntetyk Opus, Researchers Sonnet, Extractors Haiku)
**Target output:** SYNTHESIS.md 8-10k slow + 3 pliki NbLM + 03_MEDIA_PROMPTS.md 9.5/10

## Zadanie

Deep Research v2 dla tematu "Claude Code MCP Servers 2026". MCP (Model Context Protocol) jako plug-in point dla integracji z zewnetrznymi systemami.

## Scope kampanii

1. MCP protocol fundamentals: JSON-RPC 2.0, tools/resources/prompts primitives, transport (stdio/HTTP/SSE)
2. Jak budowac swoje MCP server: Python SDK, TypeScript SDK, decision tree local vs remote
3. Security model: trust boundary, permissions interaction, enableAllProjectMcpServers bypass
4. Ecosystem 2026: popularne MCP servers (Slack, Gmail, Gdrive, GitHub, Vercel, DB), gdzie szukac
5. MCP vs Skill vs Command: kiedy uzyc czego, decision tree
6. Performance: MCP response size -> context budget, caching, timeout strategies
7. Debugging: mcp__ prefix, tool dostepnosc po restart, connection issues

## 7 pytan badawczych

**R1 (MCP Protocol Spec)** - Oficjalna specyfikacja MCP (modelcontextprotocol.io + Anthropic docs): JSON-RPC 2.0 structure, primitives (tools/resources/prompts), handshake, transport layers (stdio/HTTP/SSE), capability negotiation.

**R2 (Building MCP Servers)** - Oficjalne SDK (Python/TypeScript): boilerplate, decorator patterns, error handling, stdio vs HTTP decision, Docker packaging, distribution. Przyklady "hello world" -> "produkcyjny server".

**R3 (Security Model)** - Jak Claude Code traktuje MCP: trust dialog, permissions interaction (deny can't stop MCP per bug #17017 family?), enableAllProjectMcpServers global escape hatch, CVE 2025-59536 family, data exfiltration risks.

**R4 (Ecosystem 2026)** - Lista najczesciej uzywanych MCP servers (Slack, Gmail, Gdrive, GitHub, Vercel, Postgres, SQLite, Brave Search, Puppeteer), gdzie szukac (awesome-mcp repos), quality signals, popularny trio.

**R5 (MCP vs Skill vs Command)** - Decision tree: kiedy MCP (external integration), kiedy Skill (internal prompt), kiedy Command (orchestration). Overlap zone i jak rozstrzygnac. Token cost porownanie.

**R6 (Performance + Context Cost)** - Ile kontekstu zjada MCP: tool definitions (caching implications), tool results (response size control), timeout strategies, streaming vs batch. Empiryczne metryki.

**R7 (Debugging + Community Patterns)** - mcp__ prefix, missing tool symptoms, restart requirements, connection failures. Reddit/GitHub issues. Patterns power-userow: personal MCP server per projekt, MCP jako config vector.

## Struktura output

```
Research/research-mcp-servers/
  MASTER_PLAN.md
  MANIFEST.md
  PROGRESS.md
  research/ + extracts/ + plans/ + NbLM/ (analogicznie)
```

## Fazy i agenci

| Faza | Agenci | Model |
|------|--------|-------|
| 0 STRATEGIA | 1 | Opus |
| 1 RESEARCH | 7 | Sonnet |
| 2 EXTRACT | 7 | Haiku |
| 3 CRITIQUE | 1 | Opus |
| 4 SYNTEZA | 1 | Opus |
| 5 NbLM | 1 | Opus |

## Known risks

- R1 (MCP spec) moze byc obszerny - researcher musi byc karny
- R4 (ecosystem) szybko sie zmienia - nakaz cytowac daty last-update repos
- R3 (security) to sensitive area - szczegolnie CVE traceability

## Open questions do CRITIQUE

- Czy Claude Code obsluguje wszystkie 3 MCP primitives (tools, resources, prompts) w 2026?
- Managed MCP - czy to jest osobne pole Managed settings?
- enableAllProjectMcpServers precedence vs permissions deny?
- Cache MCP tool definitions - czy jest cache-friendly jak reszta system prompt?
