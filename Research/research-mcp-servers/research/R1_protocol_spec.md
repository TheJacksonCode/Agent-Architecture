# R1 - MCP Protocol Spec (JSON-RPC 2.0, primitives, lifecycle, transport)

**Rola:** res_tech (Sonnet)
**Data accessed:** 2026-04-17
**Scope:** Oficjalna specyfikacja Model Context Protocol (MCP) wedlug modelcontextprotocol.io + modelcontextprotocol repo na GitHub. Skupienie na JSON-RPC 2.0 framing, trzy primitives (tools/resources/prompts), handshake, transport layers, capability negotiation. Cap slow: 4000.

---

## 1. Co to jest MCP i co rozwiazuje

Model Context Protocol (MCP) to otwarty protokol ogloszony przez Anthropic w listopadzie 2024 jako standaryzacja "pluggabilnosci" miedzy aplikacjami LLM (hosty) a zewnetrznymi zrodlami danych i narzedziami. Na 2026-04-17 aktualna wersja specyfikacji to **2025-11-25** (najnowsza opublikowana wersja schematu, dostepna pod URL https://modelcontextprotocol.io/specification/2025-11-25, accessed 2026-04-17).

Metafora oficjalna: "MCP jest dla AI tym czym Language Server Protocol jest dla IDE". LSP standaryzuje jak IDE laczy sie z jezykami programowania (TypeScript, Python, Rust) przez jeden kontrakt zamiast 50 integracji. MCP robi to samo dla AI: jeden kontrakt miedzy hostem (Claude Code, Cursor, VS Code z Copilot, Claude Desktop) a dowolnym zewnetrznym systemem (GitHub, Slack, Postgres, custom tool). Source: https://modelcontextprotocol.io/specification/2025-11-25.

Spec explicit identyfikuje trzy role:
- **Host** - aplikacja LLM ktora inicjuje polaczenia (np. Claude Code)
- **Client** - konnektor wewnatrz hosta (Claude Code ma jedna instancje klienta per serwer MCP)
- **Server** - serwis dostarczajacy kontekst i capability (np. serwer GitHub, Postgres, custom)

## 2. JSON-RPC 2.0 jako base protocol

Wszystkie wiadomosci MUSZA byc zgodne z JSON-RPC 2.0 (RFC-style mandate, spec uzywa MUST/MUST NOT/SHOULD language z BCP 14). Source: https://modelcontextprotocol.io/specification/2025-11-25, accessed 2026-04-17.

**Dlaczego JSON-RPC a nie REST**: protokol musi wspierac bidirectional calls (serwer moze pytac klienta o sampling, klient pyta serwera o tool), statefulness (capability negotiation trwa przez sesje), notifications (one-way bez odpowiedzi jak "tools/list_changed"). REST tego nie daje out of the box. Source: Daniel Avila "Why Model Context Protocol uses JSON-RPC", https://medium.com/@dan.avila7/why-model-context-protocol-uses-json-rpc-64d466112338.

Trzy typy wiadomosci:
1. **Request** - klient lub serwer inicjuje akcje: `{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}`
2. **Response** - odpowiedz na Request (success albo error): `{"jsonrpc":"2.0","id":1,"result":{...}}`
3. **Notification** - one-way bez id: `{"jsonrpc":"2.0","method":"notifications/tools/list_changed"}`

Error codes: standardowe JSON-RPC (`-32700` parse error, `-32600` invalid request, `-32601` method not found, `-32602` invalid params, `-32603` internal error) plus custom MCP-specific (np. `-32001` request timeout widoczne w Claude Desktop, source: https://github.com/anthropics/claude-code/issues/44032).

## 3. Trzy primitives po stronie serwera

Serwer oferuje (kazdy opcjonalny, deklarowany przez capability):

### 3.1 Tools - funkcje ktore model moze wywolac

Tools to "model-controlled" akcje. Claude decyduje (na podstawie opisu i kontekstu czatu) czy wywolac. Metoda `tools/list` zwraca tablice narzedzi z name, description i inputSchema (JSON Schema). Metoda `tools/call` wywoluje konkretne narzedzie z argumentami. Source: https://modelcontextprotocol.io/specification/2025-11-25 -> Server Features.

Przyklad schema narzedzia:
```json
{
  "name": "get_weather",
  "description": "Get current weather for a location",
  "inputSchema": {
    "type": "object",
    "properties": {"location": {"type":"string"}},
    "required": ["location"]
  }
}
```

Wynik `tools/call` to tablica content items (text, image, resource reference). Source: spec 2025-11-25 server/tools section.

### 3.2 Resources - dane dla kontekstu

Resources to "application-controlled" dane - serwer eksponuje np. plik z bazy kodu, rekord bazy, wynik zapytania. Klient (host) decyduje czy wlaczyc je do kontekstu. Metody: `resources/list`, `resources/read`, `resources/subscribe` (dla zmian). Source: https://modelcontextprotocol.io/specification/2025-11-25.

Identyfikowane przez URI (np. `file:///path/to/file.md`, `postgres://db/table/row`). Serwer moze obslugiwac templates: `file:///{path}` z parametrami. Source: cyanheads/model-context-protocol-resources guide, https://github.com/cyanheads/model-context-protocol-resources/blob/main/guides/mcp-server-development-guide.md.

**Waga dla Claude Code 2026:** Claude Code historycznie ma niepelne wsparcie resources. Na 2026-04-17 Claude Code konsumuje tools pierwszoklasowo; resources i prompts sa dostepne ale rzadziej uzywane przez workflow. Potwierdzenie w Anthropic docs https://code.claude.com/docs/en/mcp, accessed 2026-04-17.

### 3.3 Prompts - szablony interakcji

Prompts to "user-controlled" wzorce promptow, ktore user triggeruje (np. przez slash menu). Metoda `prompts/list`, `prompts/get`. W Claude Desktop pojawiaja sie w menu "Attach from MCP". W Claude Code sa osiagalne przez `/mcp__<server>__<prompt>` ale realistycznie malo uzywane (issue pokrycia potwierdzony w community: https://alexop.dev/posts/understanding-claude-code-full-stack/).

Prompts moga miec arguments (wymagane lub opcjonalne). Result to array messages z rola (user/assistant) i content.

## 4. Trzy primitives po stronie klienta (rzadziej uzywane)

Host moze oferowac serwerowi:
- **Sampling** - serwer prosi hosta "przeprowadz interakcje LLM w moim imieniu" (rzadkie, wymaga explicit user approval per spec Security section)
- **Roots** - serwer pyta o URI/filesystem boundaries (np. "gdzie jest root projektu")
- **Elicitation** - serwer prosi user o dodatkowe info (np. uzupelnienie formularza)

Source: https://modelcontextprotocol.io/specification/2025-11-25 -> Client Features.

Claude Code 2026 raportuje wsparcie elicitation (server can request additional user input) ale sampling jest opt-in per-server.

## 5. Lifecycle - initialization -> operation -> shutdown

Spec definiuje 3 fazy zycia sesji:

### Faza 1: Initialization (MUST byc pierwsza interakcja)
1. Klient -> serwer: `initialize` request z protocolVersion, capabilities klienta, clientInfo
2. Serwer -> klient: response z wybrana protocolVersion, capabilities serwera, serverInfo, optional instructions
3. Klient -> serwer: `notifications/initialized` (one-way, koniec handshake)

Version negotiation: klient i serwer deklaruja jaka wersje obsluguja. Jesli niezgodne, serwer zwraca najnowsza ktora obsluguje, klient decyduje czy akceptuje. Brak zgody = disconnect. Source: https://spec.modelcontextprotocol.io/specification/basic/lifecycle/.

Capabilities: obiekt z flagami. Przyklad klienta: `{"sampling":{},"elicitation":{}}`. Przyklad serwera: `{"tools":{"listChanged":true},"resources":{"subscribe":true},"prompts":{}}`. Flaga `listChanged:true` mowi "serwer moze wysylac notifications o zmianach listy". Source: Stainless MCP Portal, https://www.stainless.com/mcp/mcp-specification, accessed 2026-04-17.

### Faza 2: Operation
Normalna wymiana requestow i notifications. Obie strony moga wywolywac metody zgodnie z zadeklarowanymi capabilities. Notifications (np. `notifications/progress`, `notifications/cancelled`, `notifications/tools/list_changed`) sa asynchroniczne.

### Faza 3: Shutdown
Transport close (stdio: EOF, HTTP: close). Spec nie ma osobnego "shutdown" RPC call - wszystko jest graceful transport-level.

## 6. Transport layers (stdio vs Streamable HTTP vs legacy SSE)

Spec na 2026-04-17 definiuje oficjalnie dwa transports. Trzeci (SSE) jest deprecated:

### 6.1 stdio
Server uruchamiany jako sub-proces hosta. Wymiana przez stdin/stdout w formacie "JSON per line" (newline-delimited). Ideal dla local dev, local tools, skrypty CLI. Najnizszy overhead, brak sieci. Source: https://apigene.ai/blog/mcp-sse-vs-stdio, accessed 2026-04-17.

W Claude Code: `claude mcp add --transport stdio <name> -- <command> [args...]`. Source: https://code.claude.com/docs/en/mcp.

### 6.2 Streamable HTTP (zalecane dla remote)
Pojedynczy HTTP endpoint obsluguje bidirectional streaming - klient POST wysyla request, serwer odpowiada przez tenze sam response stream z chunked encoding. Zastepuje starszy SSE model dwoch endpointow.

Claude Code: `claude mcp add --transport http <name> <url>`. Zalecane dla shared infra, production. Mandate OAuth 2.1 z PKCE dla autoryzacji (spec wymaga dla HTTP transport). Source: https://maurocanuto.medium.com/building-mcp-servers-the-right-way-a-production-ready-guide-in-typescript-8ceb9eae9c7f, accessed 2026-04-17.

### 6.3 SSE (deprecated)
Server-Sent Events na dwoch endpointach (jeden GET dla streamu, jeden POST dla klient->serwer). Byl pierwszym remote transport. Od poczatku 2026 deprecated w favor of Streamable HTTP. Istniejace serwery SSE dalej dzialaja, nowe powinny uzywac HTTP. Claude Code traktuje SSE jako legacy. Source: https://github.com/orgs/modelcontextprotocol/discussions/16 + https://apigene.ai/blog/mcp-sse-vs-stdio.

Praktyczne split 2026: ok 30% stdio (developer tools, local workflows), 70% Streamable HTTP (shared infra, production agents). SSE tylko tam gdzie vendor nie wyslal jeszcze HTTP. Source: Particula.tech MCP Developer Guide 2026, https://particula.tech/blog/mcp-developer-guide.

## 7. Capability negotiation w praktyce

**Server declares:**
- `tools: {listChanged: bool}` - czy wspiera tools i czy notyfikuje o zmianach
- `resources: {subscribe: bool, listChanged: bool}` - resource support + subscribe + change notifs
- `prompts: {listChanged: bool}` - prompt support + change notifs
- `logging: {}` - czy serwer wysyla log messages

**Client declares:**
- `sampling: {}` - czy klient moze wykonac LLM calls na prosbe serwera
- `roots: {listChanged: bool}` - workspace roots info
- `elicitation: {}` - czy klient moze zapytac user

Obie strony MUSZA respektowac co druga strona nie zadeklarowala. Np. jesli serwer nie zadeklarowal `tools`, klient nie moze wolac `tools/list`.

Schema formalna w TypeScript: https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/schema/2025-11-25/schema.ts. Dostepna tez jako JSON Schema derivate dla non-TS implementacji.

## 8. Additional utilities (progress, cancellation, error, logging)

Spec standardyzuje tez:
- **Progress tracking** - `notifications/progress` dla long-running calls (z progressToken)
- **Cancellation** - `notifications/cancelled` (klient moze anulowac, serwer powinien zaprzestac pracy)
- **Error reporting** - przez standard JSON-RPC error object albo log messages
- **Logging** - `notifications/message` (debug/info/warning/error/critical)
- **Configuration** - opcjonalne serwer-side config przez `configuration/get` i `configuration/set`

Source: https://modelcontextprotocol.info/specification/, accessed 2026-04-17.

## 9. Security & trust - wymagania spec

Sama spec nie moze wymusic security na poziomie protokolu, ale MUSI wymagac od implementatorow hostow:
1. User consent i control - explicit zgoda na data access i tool call
2. Data privacy - hosty nie transmituja danych bez zgody
3. Tool safety - opisy narzedzi (annotations) sa "untrusted" o ile nie z trusted servera
4. LLM sampling controls - user explicit approval per sampling request

Spec section "Security and Trust & Safety" explicit instruuje hosty aby budowaly "robust consent and authorization flows". To jest klucz dla R3 - Claude Code 2026 ma znane luki tu (CVE-2025-59536 family). Source: https://modelcontextprotocol.io/specification/2025-11-25 -> Security section.

## 10. Co MCP NIE jest (czesto mylone)

- NIE jest to inny model LLM - MCP nie ma wlasnego modelu
- NIE jest to cloud service - MCP to protokol, serwery moga byc lokalne albo remote
- NIE jest to jezyk programowania - to JSON over JSON-RPC 2.0
- NIE jest to zamiennik dla REST/GraphQL - to complement dla LLM use case (stateful, bidirectional, capability-negotiated)

Source: Stytch blog "MCP: A comprehensive introduction for developers", https://stytch.com/blog/model-context-protocol-introduction/, accessed 2026-04-17.

## 11. Ecosystem specification'ow - wersje do tej pory

- **2024-11-05** - pierwsza publiczna wersja (launch)
- **2025-03-26** - early iterations, HTTP transport refinement
- **2025-06-18** - auth improvements, Streamable HTTP stabilization
- **2025-11-25** - aktualna GA wersja na 2026-04-17, consolidation

Schema w kazdym katalogu https://github.com/modelcontextprotocol/modelcontextprotocol/tree/main/schema/<version>. Source: github.com/modelcontextprotocol/modelcontextprotocol, accessed 2026-04-17.

## 12. Kluczowe zrodla (primary)

- **Spec canonical:** https://modelcontextprotocol.io/specification/2025-11-25 (accessed 2026-04-17)
- **Schema TS:** https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/schema/2025-11-25/schema.ts
- **Architecture overview:** https://modelcontextprotocol.io/docs/learn/architecture
- **Lifecycle:** https://spec.modelcontextprotocol.io/specification/basic/lifecycle/
- **Claude Code MCP docs:** https://code.claude.com/docs/en/mcp (accessed 2026-04-17)
- **JSON-RPC rationale:** https://medium.com/@dan.avila7/why-model-context-protocol-uses-json-rpc-64d466112338

## 13. Gaps zidentyfikowane w R1 do delta-researchu

- Exact set of capabilities faktycznie deklarowany przez Claude Code 2026 (czy `sampling: {}` jest wlaczone?) - potrzebny test real-world
- Version negotiation fallback: co robi Claude Code jesli serwer deklaruje tylko 2024-11-05? (backwards compat)
- Czy Claude Code eksponuje MCP logging notifications user-side (w UI)? Brak explicit docs

## 14. Podsumowanie (1 paragraf)

MCP spec v2025-11-25 standaryzuje integracje LLM host <-> external system przez JSON-RPC 2.0 z trzema primitives (tools dla akcji model-controlled, resources dla kontekstu application-controlled, prompts dla szablonow user-controlled), capability negotiation w fazie initialization i trzema transport layers (stdio dla local, Streamable HTTP dla remote, SSE deprecated). Spec wymaga explicit user consent dla tool calls i data access ale nie moze wymusic go protocol-side - odpowiedzialnosc na hostach. Dla Claude Code 2026 to oznacza ze zgodnosc z MCP spec nie wystarczy, pelne bezpieczenstwo zalezy od implementacji hosta (patrz R3 - CVE-2025-59536). Liczba slow: ~1980.
