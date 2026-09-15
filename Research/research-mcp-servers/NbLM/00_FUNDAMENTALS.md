# 00_FUNDAMENTALS - Claude Code MCP 2026

Przewodnik poczatkujacego. Co to jest MCP, z czego sie sklada, jak rozmawia z Claude.

---

## Co to jest MCP

Model Context Protocol (MCP) to otwarty standard komunikacji miedzy modelem LLM (np. Claude) a zewnetrznymi narzedziami, danymi i uslugami. Zostal ogloszony przez Anthropic w listopadzie 2024, a do 2026-04-17 stal sie de facto standardem w ekosystemie agentow AI - przyjety przez OpenAI, Google, Microsoft i setki niezaleznych projektow.

MCP nie jest jeszcze jednym SDK. To protokol - zestaw regul komunikacji - analogiczny do HTTP dla web albo LSP dla IDE. Gdy napiszesz serwer MCP raz, dziala on z kazdym klientem ktory mowi MCP: Claude Code CLI, Claude Desktop, Cursor, Zed, wtyczki VSCode, headless CI i tak dalej. (R1.C1, R1.C2)

Prosta analogia: **USB dla AI**. Tak jak kazda mysz USB dziala z kazdym komputerem, serwer MCP dziala z kazdym klientem MCP.

---

## Wersja specyfikacji i zarzadzanie

Najnowsza stabilna wersja spec na 2026-04-17: **2025-11-25**. Protokol jest wersjonowany data, a klient i serwer negocjuja wersje podczas handshake (capability negotiation). (R1.C3)

Spec zyje w repo: `github.com/modelcontextprotocol/modelcontextprotocol`. Rozwija sie w cyklu open-source z SEP-ami (Standard Enhancement Proposal), analogicznie do PEP Pythona. Changelog dokumentuje kazda zmiane breaking i non-breaking. (R1.C4)

---

## Trzy prymitywy MCP

Serwer MCP moze oferowac trzy rodzaje zasobow:

**1. Tools (narzedzia)**
Funkcje ktore Claude moze wywolac. Kazdy tool ma nazwe, opis, JSON schema parametrow i implementacje. Przyklady: `search_web`, `create_issue`, `send_email`, `query_database`. To najczesciej uzywany primitive - 95% wartosci MCP pochodzi z tools. (R1.C5)

**2. Resources (zasoby)**
Dane read-only ktore Claude moze pobrac - pliki, dokumenty, rekordy DB, wyniki API. Podobne do GET w HTTP. Przyklady: schema DB, aktualny stan zamowienia, content pliku. Claude Code 2026-04-17 wspiera resources w podstawowym zakresie (wrappers nad read), ale nie wszystkie klienty to implementuja. (R1.C6)

**3. Prompts (szablony promptow)**
Parametryzowane templates ktore uzytkownik moze wywolac jako slash commands. Przyklad: `/review-pr` z parametrem `pr_number`. Najmniej uzywany primitive w Claude Code, bo Skills i Commands pokrywaja wiekszosc use-case'ow. (R1.C7)

---

## Trzy transporty (jak serwer gada z klientem)

**stdio (standard input/output)**
Serwer odpala sie jako podproces klienta. Komunikacja przez stdin/stdout w formacie JSON-RPC. Najprostszy w uruchomieniu, zero network latency, zero auth (klient ufa procesowi ktorego sam uruchomil). 99% serwerow lokalnych uzywa stdio. (R1.C8, R2.C8)

Przyklad config:
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}
```

**Streamable HTTP**
Serwer to dlugo zyjacy proces HTTP. Klient laczy sie przez POST z JSON-RPC payload, moze uzywac Server-Sent Events dla streamingu. Wymagany dla remote MCP - cloud-hosted, multi-user, enterprise. Wymaga OAuth 2.1 + PKCE dla auth. (R1.C9, R1.C10, R2.C9)

**SSE (deprecated)**
Stary transport oparty o Server-Sent Events w kazda strone. Oznaczony jako deprecated w spec 2025-03-26. Nowe serwery powinny uzywac Streamable HTTP. Istniejace SSE dzialaja ale nie sa rozwijane. (R1.C11)

**Decyzja stdio vs HTTP w skrocie:**
- Lokalny tool, jeden uzytkownik -> stdio
- Cloud service, multi-tenant, auth -> Streamable HTTP
- Legacy projekt istniejacy -> SSE (migruj do HTTP gdy mozesz) (R2.C10)

---

## Lifecycle: handshake, praca, zamkniecie

Kazda sesja MCP przechodzi przez 3 fazy:

**Faza 1: Initialize (handshake)**
Klient wysyla `initialize` z wersja protokolu i listą capabilities ktore chce uzywac (tools, resources, prompts, roots, sampling). Serwer odpowiada wlasnymi capabilities. Nastepuje negocjacja - tylko przeciecie obu list dziala w sesji. (R1.C12)

**Faza 2: Operation**
Klient moze wolac `tools/list`, `tools/call`, `resources/list`, `resources/read`, `prompts/list`, `prompts/get`. Serwer odpowiada synchronously (Request-Response) lub streamuje (Streamable HTTP). (R1.C13)

**Faza 3: Shutdown**
Klient konczy sesje przez zamkniecie transportu (stdio: SIGTERM do procesu; HTTP: close connection). Graceful shutdown pozwala serwerowi zamknac zasoby (DB connections, file handles). (R1.C14)

---

## JSON-RPC 2.0 pod spodem

MCP uzywa JSON-RPC 2.0 jako format wiadomosci. Wszystko co leci przez transport to albo Request (z `id`), albo Response (z `id` + `result` lub `error`), albo Notification (bez `id`). (R1.C15)

Przyklad `tools/call` request:
```json
{
  "jsonrpc": "2.0",
  "id": 42,
  "method": "tools/call",
  "params": {
    "name": "search_web",
    "arguments": {"query": "MCP protocol spec"}
  }
}
```

Response:
```json
{
  "jsonrpc": "2.0",
  "id": 42,
  "result": {
    "content": [{"type": "text", "text": "..."}],
    "isError": false
  }
}
```

Error codes sa standardowe JSON-RPC (-32700 Parse Error, -32600 Invalid Request, -32601 Method Not Found, -32602 Invalid Params, -32603 Internal Error) plus MCP-specific (np. -32001 Request Timeout). (R1.C16, R6.C17)

---

## Jak Claude Code podlacza serwer

W Claude Code CLI:
```bash
claude mcp add github --command "npx" --args "-y" "@modelcontextprotocol/server-github"
claude mcp list                  # widzisz podlaczone serwery
claude mcp remove github         # odlaczenie
```

Konfig lezy w `~/.claude/settings.json` (globalny) lub `.claude/settings.json` w projekcie (lokalny). Project-scope ma prece nad global. (R7.C1)

Po podlaczeniu tools pojawiaja sie pod wzorcem nazwy `mcp__<server-name>__<tool-name>` (double underscore literal). Przyklad: `mcp__github__create_issue`. (R7.C1)

Permissions control przez:
```json
{
  "permissions": {
    "allow": ["mcp__github__*"],
    "deny": ["mcp__untrusted__*"]
  }
}
```

---

## Ekosystem 2026 w liczbach

Registry Anthropic (`registry.modelcontextprotocol.io`, GA Q1 2026) ma >600 serwerow. Katalog community `awesome-mcp-servers` przekroczyl 1000. (R4.C1, R4.C2)

Top 15 serverow wg adopcji (R4.C5):
1. GitHub (official Anthropic)
2. Filesystem (official)
3. Playwright (zastapil deprecated Puppeteer 2025-10)
4. Slack (official)
5. Fetch (official, web scraping)
6. Memory (official, persistent context)
7. Postgres / SQLite (official)
8. Sentry (official, error tracking)
9. Google Drive (official)
10. Notion (community)
11. Linear (community)
12. Obsidian (community)
13. Sequential Thinking (official)
14. Time (official)
15. Rube (aggregator, 500+ tools via one connection)

---

## Security model - trzy warstwy

MCP security opiera sie na "user-first" zaufaniu - to uzytkownik decyduje ktorym serwerom ufa. Ale kazda warstwa ma wlasne pulapki:

**Warstwa 1: Config-as-attack-surface**
Malicious repo moze podrzucic `.claude/settings.json` z serwerem ktory exfiltruje dane. Historyczny przypadek CVE-2025-59536: hook w settings wykonywal shell command podczas session start (RCE, CVSS 8.8, reported 2025-07-21, fixed 2025-08-26). Mitigation: code review config plikow, enterprise policy-managed settings. (R3.C1, R3.C2)

**Warstwa 2: Tool description injection**
Serwer moze w description tool'a ukryc prompt injection instruuajacy Claude do niepozadanych akcji. Mitigation: review tools przed enable, nie uzywac `enableAllProjectMcpServers: true` na untrusted repos. (R3.C3)

**Warstwa 3: Runtime egress**
Serwer HTTP moze wysylac dane do C2. CVE-2026-21852 (published 2026-01-21): server exfiltrowal API keys przez tool result. Mitigation: network egress firewall, audit logs, principle of least privilege. (R3.C4)

---

## Koszt kontekstowy (token economy)

Kazdy podlaczony serwer kosztuje tokeny w oknie kontekstu, nawet gdy go nie uzywasz. Tool definitions laduja sie upfront i zostaja w kontekscie az do konca sesji. (R6.C1, R6.C5)

Przyblizony budzet (Claude Code, 200k tokens total):
- 0 serwerow: 0% budzetu
- 1-2 male serwery: 2-5%
- 3-5 typowych: 7-15%
- 6-8 power-user: 20-30%
- 10+ heavy: 35-50%+
(R6.C19)

Benchmark: 7 serverow aktywnych = 67,300 tokens tool definitions (33.7% budzetu). Tool Search Tool (Q1 2026) redukuje to do 8,500 tokens (46.9% redukcja). (R6.C2, R6.C7)

**Zasada kciuka:** nie przekraczaj 5-7 serwerow naraz. Uzywaj `/mcp disable` aby wylaczac w biezacej sesji. (R6.C20)

---

## Co MCP nie jest

- **MCP to nie Skill.** Skill to prompt + tools bundled w markdown, dziala tylko w Claude Code. MCP to zewnetrzny serwer, dziala z dowolnym klientem.
- **MCP to nie Command.** Command to slash shortcut dla prepared promptu. Zero integracji zewnetrznej.
- **MCP to nie Hook.** Hook to event trigger (pre-tool, post-tool, session-start) ktory moze uruchomic shell command. Inny koncept, inny poziom.
- **MCP to nie Agent Framework.** MCP to protokol warstwy narzedzi. Framework (LangGraph, CrewAI) to orkiestracja agentow. Komplementarne.

(R5.C1, R5.C2, R5.C3)

---

## Ready-to-use mental model

Gdy myslisz o MCP, trzymaj w glowie:

1. **Protokol, nie framework** - napiszesz raz, dziala wszedzie.
2. **3 primitives** - tools (95% wartosci), resources, prompts.
3. **2 transporty** - stdio local, Streamable HTTP remote (SSE deprecated).
4. **JSON-RPC 2.0** - kazda wiadomosc, kazdy error.
5. **Capability negotiation** - handshake decyduje co dziala w sesji.
6. **Tokens cost** - kazdy serwer zjada kontekst, limit 5-7 aktywnych.
7. **Security layered** - config, description, runtime.

---

## Dalej

- Chcesz zbudowac wlasny serwer? -> `01_PATTERNS.md`
- Nie wiesz czy MCP czy Skill? -> `02_DECISION_GUIDE.md`
- Chcesz media content o MCP? -> `03_MEDIA_PROMPTS.md`
- Pelna synteza z trust-taggingiem? -> `../plans/SYNTHESIS.md`

---

*Zrodlo claimow: E1-E7 extracts, R1-R7 raporty, CRITIC.md walidacja.*
*Citation format: R<numer raportu>.C<numer claimu>. Data snapshot: 2026-04-17.*
