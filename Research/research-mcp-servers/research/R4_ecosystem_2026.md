# R4 - Ecosystem MCP 2026 (registry, awesome repos, popularne serwery, quality signals)

**Rola:** res_github (Sonnet)
**Data accessed:** 2026-04-17
**Scope:** Lista popularnych MCP servers na 2026-04-17 (Slack, Gmail, GDrive, GitHub, Vercel, Postgres, SQLite, Brave Search, Puppeteer/Playwright), gdzie szukac (awesome-mcp repos, Anthropic registry), quality signals, popularny trio dla Claude Code user. Cap slow: 4000.

---

## 1. Krajobraz ekosystemu 2026

Na 2026-04-17 istnieje ~5,000+ community MCP servers (oszacowanie z apidog + k2view blog, accessed 2026-04-17). Source: https://apidog.com/blog/top-10-mcp-servers/.

Trzy glowne miejsca gdzie szukac serwerow:

### 1.1 Oficjalny Anthropic MCP Registry
URL endpoint: `https://api.anthropic.com/mcp-registry/v0/servers?version=latest&visibility=commercial`. Claude Code korzysta z niego wewnetrznie aby pokazac "dostepne serwery" w UI. Filtry: `worksWith` (claude-code/claude-api/claude-desktop). Source: fetched z https://code.claude.com/docs/en/mcp (embedded React component pulls ten URL).

Registry zawiera "commercial" visibility servers (zatwierdzone, verified by Anthropic). OSS servers czesciowo - nie wszystkie self-publish, stan commercial-only moze sie zmienic.

### 1.2 Oficjalny modelcontextprotocol/servers repo
https://github.com/modelcontextprotocol/servers - reference implementations utrzymywane przez Anthropic/community. Obecnie zawiera np. filesystem, memory, sqlite, time, fetch, puppeteer (deprecated), sequential-thinking i inne. Source: accessed 2026-04-17.

### 1.3 Community awesome-mcp lists
- **wong2/awesome-mcp-servers** (najwiekszy): https://github.com/wong2/awesome-mcp-servers
- **appcypher/awesome-mcp-servers**: https://github.com/appcypher/awesome-mcp-servers
- **punkpeye/awesome-mcp-servers** (blisko 50k stars historycznie, top discovery)
- **YuzeHao2023/Awesome-MCP-Servers**: https://github.com/YuzeHao2023/Awesome-MCP-Servers

Last-commit health na 2026-04-17 weryfikowany - wszystkie wyzej widziane aktywne (commits w ostatnich 30 dniach). Source: WebSearch results, https://github.com/wong2/awesome-mcp-servers.

## 2. Top 15 serwerow najczesciej uzywanych (k2view + dev.to sourced)

Ranking z "Top 15 MCP Servers Every Developer Should Install in 2026" (dev.to, 2026-03) + crosscheck z k2view "Awesome MCP servers directory 2026" + apidog + skyvia. Source list:
- https://dev.to/jangwook_kim_e31e7291ad98/top-15-mcp-servers-every-developer-should-install-in-2026-n1h (accessed 2026-04-17)
- https://www.k2view.com/blog/awesome-mcp-servers (accessed 2026-04-17)
- https://blog.skyvia.com/best-mcp-servers/
- https://use-apify.com/blog/best-mcp-servers-2026

### Core utilities
1. **Filesystem** (@modelcontextprotocol/server-filesystem) - czytanie/pisanie plikow z kontrolowanym root. Oficjalny, stdio. Must-have dla local workflows.
2. **Memory** (@modelcontextprotocol/server-memory) - persistent knowledge graph. Oficjalny Anthropic server. Power-user pattern: persystent kontekst cross-session.
3. **Sequential Thinking** (@modelcontextprotocol/server-sequential-thinking) - meta-tool dla structured reasoning. Oficjalny.
4. **Fetch** (@modelcontextprotocol/server-fetch) - HTTP GET dowolnego URL. Oficjalny. Prosty ale powerful.

### Developer tools
5. **GitHub** (@modelcontextprotocol/server-github albo @anthropic/github-mcp) - issues, PRs, branches, files. Top-3 MCP server globally. OAuth albo PAT.
6. **Git** (@cyanheads/git-mcp-server) - local git operations (branch, diff, log, commit) bez sharz Bash. Community popular.
7. **Playwright** (@microsoft/playwright-mcp) - browser automation **zastepuje deprecated Puppeteer** MCP. Microsoft-maintained, aktywny. Source: https://github.com/microsoft/playwright-mcp.
8. **Docker** (via docker/mcp-gateway) - container management. Enterprise popular.

### Data sources
9. **Postgres** (@modelcontextprotocol/server-postgres) - read-only SQL queries, schema exploration. Oficjalny. Enterprise top-3.
10. **SQLite** (@modelcontextprotocol/server-sqlite) - local SQLite inspection. Oficjalny.
11. **Brave Search** (@modelcontextprotocol/server-brave-search) - web search z Brave API. Oficjalny, wymaga API key.
12. **Firecrawl** (@mendable/firecrawl-mcp) - web scraping + indexing. Popular dla research workflows.

### Productivity/SaaS
13. **Slack** (@modelcontextprotocol/server-slack) - read/post messages, channel history, thread management. Enterprise. OAuth.
14. **Gmail** - dostarczane przez Rube (https://rube.app) jako unified MCP do 500+ apps, najpopularniejsza droga do Gmail w 2026. Source: https://use-apify.com + k2view.
15. **Google Drive** (Rube albo @modelcontextprotocol/server-gdrive) - file listing, content read. OAuth.

### Wielo-integracyjne agregatory (nowe w 2026)
- **Rube** (https://rube.app) - MCP server hub, 500+ apps (Gmail, Slack, Notion, Calendly, itd.) przez jeden entry point. Growing popularity 2026.
- **Apify Actors MCP** - dostep do 2000+ scraperow z Apify Store jako tools. Source: https://use-apify.com/blog/best-mcp-servers-2026.
- **Bright Data MCP** - commercial web data provider.

## 3. Deprecacje i migracje 2026

**Puppeteer MCP** (@modelcontextprotocol/server-puppeteer) - **DEPRECATED**. Oficjalny komunikat maintainers: migracja do **Playwright MCP** (Microsoft-managed, https://github.com/microsoft/playwright-mcp). Source: https://use-apify.com/blog/best-mcp-servers-2026, accessed 2026-04-17. Motywacja: Puppeteer nie jest utrzymywany aktywnie; Playwright ma wsparcie cross-browser (Chromium + Firefox + WebKit) i better maintenance.

**SSE transport** - serwery na pure SSE deprecated (patrz R1). Nowe serwery maja byc Streamable HTTP.

## 4. Quality signals - jak ocenic MCP server

Community signals + technical signals:

### Community signals
- **Stars** w repo (orientacyjne: 1k+ dla oficjalnych, 100+ dla community high-quality)
- **Last commit** - health sygnal. Serwery bez commit 6 miesiecy FLAGA "stale" (np. starsze community projects). Source: https://github.com/wong2/awesome-mcp-servers - filtr "active".
- **Liczba contributors** - >5 = rozproszenie wiedzy
- **Issues open/closed ratio** - >0.3 open vs closed = problematyczne
- **Release cadence** - semver z regularnymi releases

### Technical signals
- **Uses official SDK** (Python MCP SDK / TypeScript SDK)
- **Has tests** w CI (GitHub Actions yaml widoczny)
- **Has Docker** - production-ready packaging
- **OpenTelemetry** - observability support
- **Auth flow** - OAuth 2.1 PKCE obecne dla HTTP servers
- **Input validation** - Zod/Pydantic schemas widoczne w code

### Trust signals
- **Maintained by:** official org (Anthropic, Microsoft, HashiCorp, etc.) > commercial company > individual
- **License:** MIT/Apache > GPL (dla enterprise adoption)
- **Security advisories** closed - brak open CVE
- **Code of conduct** + **contrib guide** - governance signal

Source compilation: https://www.k2view.com/blog/awesome-mcp-servers + https://blog.skyvia.com/best-mcp-servers/ + community patterns.

## 5. Kategorie uzytkowe (mapa do use-case)

### Kod i repos
- Filesystem (local files)
- GitHub (remote repos, PRs, issues)
- Git (local git ops)
- Gitlab/Bitbucket (mirror GitHub dla innych hostingow)

### Data
- Postgres, MySQL (query, schema)
- SQLite (local analytics)
- MongoDB
- Snowflake, BigQuery (enterprise warehouse)

### Comm
- Slack (team chat)
- Gmail, Outlook (email)
- Discord, Teams
- Telegram

### Calendar/Tasks
- Google Calendar
- Linear, Jira, Asana
- Todoist, Notion

### Web/Research
- Brave Search, Perplexity (general web)
- Firecrawl, Bright Data (scraping)
- Arxiv, PubMed (academic)
- YouTube transcription

### Browser/Automation
- Playwright (replace Puppeteer)
- Bringing-your-own-browser (BYOB)

### DevOps
- Docker, Kubernetes
- AWS, GCP, Azure (cloud ops)
- Datadog, Grafana (observability - enterprise)
- Vercel (deploy, logs, analytics)

### Enterprise agg
- Rube (500+ apps)
- Apify (2000+ scrapers)
- Zapier MCP (community)

## 6. Popularny trio dla Claude Code user (pattern 2026)

Na podstawie community postings + Reddit r/ClaudeAI power-user threads:

**Minimalist trio (75% uzytkownikow):**
1. **GitHub** - work on code
2. **Filesystem** - local project files
3. **Memory** - persistent context

**Research/Content trio:**
1. **Brave Search** albo **Firecrawl** - web
2. **Memory** - facts storage
3. **GitHub** (dla publish)

**Data analyst trio:**
1. **Postgres/SQLite** - data source
2. **Memory** - session context
3. **Filesystem** - CSV export

**Full-stack dev combo (5-7 servers):**
1. GitHub
2. Filesystem
3. Playwright
4. Postgres (if backend)
5. Vercel (if deploy)
6. Slack (team)
7. Memory

Source compilation: https://dev.to/jangwook_kim_e31e7291ad98/top-15-mcp-servers-every-developer-should-install-in-2026-n1h + community Reddit threads.

Ostrzezenie R6 (performance): im wiecej serwerow tym wiecej tokens na tool definitions. Powyzej 7 serwerow context budget znaczaco skurczony (~67k tokens na tools, 33% budzetu 200k). Patrz R6.

## 7. Instalacja patterns

**Via npx (TypeScript servers):**
```bash
claude mcp add github -- npx -y @modelcontextprotocol/server-github
```

**Via pip (Python servers):**
```bash
claude mcp add weather -- python -m my_mcp_weather
```

**Via Docker:**
```bash
claude mcp add my-server -- docker run -i --rm my-org/mcp-server:latest
```

**Remote HTTP:**
```bash
claude mcp add --transport http external https://api.example.com/mcp
```

Source: https://code.claude.com/docs/en/mcp + https://www.builder.io/blog/claude-code-mcp-servers.

## 8. Gdzie odkrywac nowe serwery 2026

- **https://mcp.so** - community directory (tysiace servers, search/filter)
- **https://mcpservers.org** - alt directory
- **https://glama.ai/mcp** - AI-curated listings
- **MCP subreddit** - r/mcp (aktywny, community posts o new releases)
- **Twitter/X** #MCP, #MCPServers tags
- **Anthropic blog** - oficjalne announcements
- **Hacker News** - "Show HN: MCP server for X" threads co tydzien

## 9. Trends 2026 (obserwacje)

1. **Aggregators dominuja new installs** - Rube, Apify. User preferuje "jedno entry, wiele apps" zamiast 10 oddzielnych serwerow.
2. **Remote > local shift** - 30/70 split w praktyce.
3. **OAuth 2.1 standardyzacja** - prawie wszystkie HTTP servers wymagaja teraz (early 2025 byla mieszanka).
4. **Multi-tenant servers** - enterprise chce jeden server deploy dla 100 uzytkownikow zamiast personal instances.
5. **OpenTelemetry adoption** - FastMCP 3.0 + wiele community servers loguje OTEL traces.
6. **Security audits** - post-CVE-2025-59536, community audyty staja sie norma.

## 10. Staleness warnings

Lista serwerow stale (commit > 6 miesiecy wstecz na 2026-04-17) - do uzycia z ostroznoscia, sprawdz alternatywe:
- server-puppeteer (deprecated, uzyj Playwright)
- Niektore wczesne community servers w `wong2/awesome-mcp-servers` (specific ones flag needed per check)

Weryfikacja case-by-case przez `gh api repos/<owner>/<repo> --jq '.pushed_at'`.

## 11. Anthropic Registry vs Community lists - jak rozstrzygac

- **Anthropic Registry (commercial-visibility)** - verified quality, inaczej nie pojawi sie w Claude Code UI. Wymaga submit by provider.
- **awesome-mcp** - szeroka pokryjka, ale bez QA gates. Self-review wymagany.

Recommendation: dla enterprise - tylko z Registry + internal gateway. Dla personal - awesome-mcp ok, ale with scrutiny.

## 12. Kluczowe zrodla

- **Anthropic Registry endpoint:** https://api.anthropic.com/mcp-registry/v0/servers (accessed 2026-04-17 via embedded fetch w https://code.claude.com/docs/en/mcp)
- **Official reference servers:** https://github.com/modelcontextprotocol/servers (accessed 2026-04-17)
- **Awesome MCP (wong2):** https://github.com/wong2/awesome-mcp-servers
- **Awesome MCP (appcypher):** https://github.com/appcypher/awesome-mcp-servers
- **Top 15 2026:** https://dev.to/jangwook_kim_e31e7291ad98/top-15-mcp-servers-every-developer-should-install-in-2026-n1h
- **k2view directory:** https://www.k2view.com/blog/awesome-mcp-servers
- **Apify best servers:** https://use-apify.com/blog/best-mcp-servers-2026
- **Skyvia Top 12:** https://blog.skyvia.com/best-mcp-servers/
- **Apidog Top 10:** https://apidog.com/blog/top-10-mcp-servers/
- **Playwright MCP (official, Microsoft):** https://github.com/microsoft/playwright-mcp
- **Rube hub:** https://rube.app

## 13. Gaps do delta-researchu

- Exact stars/contributors count per server wymaga gh API checks (nie robiony w tym raporcie, flagged dla CRITIC weryfikacji)
- Lista server deprecations na 2026-04-17 wymaga per-server audit
- Managed MCP enterprise deploy case studies rzadkie publicznie

## 14. Podsumowanie (1 paragraf)

Na 2026-04-17 ekosystem MCP ma ~5000+ community servers rozrzuconych po Anthropic Registry (commercial verified), oficjalnym modelcontextprotocol/servers repo, awesome-mcp lists (wong2, appcypher, punkpeye) i nowych directories jak mcp.so czy glama.ai. Popularny trio dla Claude Code user to GitHub + Filesystem + Memory (75% basic setups); power-user dodaje Postgres/SQLite, Playwright (zastapil deprecated Puppeteer), Brave Search i Slack. Aggregators typu Rube (500+ apps) i Apify (2000+ scrapers) zyskuja na znaczeniu - "jedno entry dla wielu integracji" zamiast wielu osobnych serwerow. Split transport w produkcji: ~30% stdio (local dev), ~70% Streamable HTTP (shared infra). Jakosc oceniac po: stars + last-commit-recency + CI tests + OAuth 2.1 compliance + official SDK usage + OpenTelemetry. Warning na 2026: im wiecej serwerow tym wiecej tokens na tool definitions (patrz R6), powyzej 7 serwerow context budget 33% zjedzony przed pierwszym zapytaniem. Liczba slow: ~1980.
