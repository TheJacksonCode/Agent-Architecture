# 01 PATTERNS - 7 design patternow + 10 anti-patternow

**Cel:** praktyczny cookbook dla developera/architekta. 7 patternow pokrywa 95% use cases, 10 anti-patternow to czarna lista.

**Prerequisite:** przeczytaj `00_FUNDAMENTALS.md` jezeli nie znasz podstaw.

**Poziom:** developer budujacy aplikacje z Claude API, intermediate-advanced.

## Zasada nadrzedna: static first, dynamic last

Zanim przejdziesz do patternow, zapamietaj jeden fundament: **cache dziala prefiksowo**. Wszystko od poczatku requesta do cache breakpointu to kandydat do cache hit. Wszystko po breakpoincie jest placone per request.

Dlatego strukturyzuj prompt tak, zeby **najbardziej statyczne fragmenty byly na poczatku, a najbardziej dynamiczne na koncu**.

Naturalny porzadek API (`tools -> system -> messages`) juz sprzyja temu:
- tools zmieniaja sie najrzadziej (rejestrujesz na starcie)
- system rzadko (rules, examples)
- messages najczesciej (kazdy turn)

Wewnatrz kazdej warstwy dalej stosuj static-first:
- W system array: rules, potem docs, potem user preferences
- W messages: history najpierw, current query na koncu

## Pattern 1: Single breakpoint (80% use cases)

**Kiedy uzyc:** masz jedna warstwe statycznego content zmieniajaca sie z ta sama czestotliwoscia. Prosta aplikacja, chatbot, single-user query.

**Jak uzyc:**

```python
client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[{
        "type": "text",
        "text": large_static_context,  # 10k tokens rules + docs
        "cache_control": {"type": "ephemeral"}  # 5m default
    }],
    messages=[...dynamic_conversation...]
)
```

**Plus:** prostota, najmniej zarzadzania, zero frameworkowy koszt.

**Kiedy NIE:** masz wieloszczeblowa zmiennosc (rules miesiacami, docs dziennie). Wtedy Pattern 2.

## Pattern 2: Two breakpoints (RAG, mixed freshness)

**Kiedy uzyc:** systemy z dwoma warstwami freshness - rules plus daily-changing RAG documents.

**Jak uzyc:**

```python
system=[
    {
        "type": "text",
        "text": rules_and_rarely_changing,  # miesiacami stable
        "cache_control": {"type": "ephemeral", "ttl": "1h"}  # 1h dla rzadziej zmiennych
    },
    {
        "type": "text",
        "text": today_rag_documents,  # dziennie changing
        "cache_control": {"type": "ephemeral"}  # 5m default
    }
]
```

**Plus:** zmiana daily documents NIE invaliduje rules cache. Zmiana rules invaliduje oba (bo rules sa wczesniej).

**Ograniczenie krytyczne:** 1h entries MUSZA pojawic sie PRZED 5m w fizycznym ukladzie requestu (API constraint).

**Break-even:** dla rules (1h) - po 2 hitach w godzinie. Dla docs (5m) - po 1 hicie w 5 minut. Oba trywialnie osiagalne w aktywnej aplikacji.

## Pattern 3: Automatic caching top-level (multi-turn agents)

**Kiedy uzyc:** multi-turn chat, agent z iteratywnym tool use, kazda aplikacja gdzie messages szybko rosna (10+ bloków per turn).

**Jak uzyc:**

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    cache_control={"type": "ephemeral"},  # TOP-LEVEL flaga
    system=static_system,
    messages=long_conversation_history
)
```

System sam:
- Umiesci breakpoint na ostatnim cacheable bloku w messages
- W kolejnym requescie automatycznie przesunie breakpoint do przodu
- Utrzyma 20-block lookback window dla hit detection

**Plus:** bezobslugowy, nie trzeba manipulowac breakpointami manualnie.

**Minus:** jeden breakpoint tylko. Dla multi-layer freshness uzyj Pattern 2.

**Najbardziej uzyteczny dla:** Claude Code CLI (robi dokladnie to), agent frameworks (LangChain AnthropicPromptCachingMiddleware implementuje to automatycznie).

## Pattern 4: Prefix promotion (priming cache)

**Kiedy uzyc:** masowe przetwarzanie (Batch API + cache), kazdy task korzysta z tego samego 50k-token context.

**Jak uzyc:**

```python
# Step 1: Prime cache single request
shared_prefix = [{
    "type": "text",
    "text": large_static_content,  # 50k tokens context
    "cache_control": {"type": "ephemeral", "ttl": "1h"}  # KLUCZOWE: 1h
}]

priming = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=100,
    system=shared_prefix,
    messages=[{"role": "user", "content": "ready?"}]
)
assert priming.usage.cache_creation_input_tokens > 0  # Confirmed written

# Step 2: Teraz 1000 batch requests z tym samym prefix -> wszystkie cache hit
batch_requests = []
for task in tasks_1000:
    batch_requests.append({
        "custom_id": task.id,
        "params": {
            "model": "claude-sonnet-4-6",
            "max_tokens": 1024,
            "system": shared_prefix,  # IDENTYCZNY bajt-za-bajtem
            "messages": [{"role": "user", "content": task.content}]
        }
    })

batch = client.messages.batches.create(requests=batch_requests)
```

**Plus:** amortyzacja write cost na 1000 reads = 94.8% savings (np. $150 -> $7.79).

**Krytyczne warunki:**
- Czekaj na response priming przed batch (async cache creation)
- Shared_prefix bajt-za-bajtem identyczny (no whitespace/capitalization drift)
- 1h TTL (batch moze trwac do 24h, 5m nie wystarczy)

## Pattern 5: Tool prefix stability (MCP + agent)

**Kiedy uzyc:** agentic systems, Claude Code, MCP-enabled apps. Tools to pierwsza warstwa cache - ich invalidacja kasuje WSZYSTKO.

**Zasady:**

1. **Rejestruj wszystkie tools na starcie sesji** - bez "lazy loading"
2. "Optional" tools lepiej zalaczyc zawsze z warunkowym `tool_choice="none"`
3. **NIE edytuj tool description mid-session** (nawet drobna zmiana = pelny rebuild)
4. **Alphabetic order tools w array** - consistent serialization miedzy runs

**Anti-pattern:**
```python
# Turn 1: tools = [read_tool, write_tool]
# Turn 2 (agent zdecydowal ze potrzebuje bash): tools += [bash_tool]  # ZLAMALES CACHE
```

**Korzystny pattern:**
```python
tools = sorted([read_tool, write_tool, bash_tool, grep_tool], key=lambda t: t.name)  # alphabetic
# Cache trwa miedzy turami
```

**Dla Claude Code:** zawsze dodaj wszystkie MCP servers na start sesji. Dodanie mid-session = kosztowna utrata cache (18k+ tokens rebuild).

## Pattern 6: Few-shot prefix

**Kiedy uzyc:** uzywasz few-shot examples dla instrukcyjnego tuningu.

**Zasada:** examples ZAWSZE w system prompt, NIGDY w messages.

**ZLE:**
```python
messages=[
    {"role": "user", "content": "Example 1: Q -> A"},
    {"role": "assistant", "content": "Understood."},
    # ... 50 more examples
    {"role": "user", "content": current_query}
]
# Cache widzi examples jako dynamic turns - inefficient
```

**DOBRZE:**
```python
system=[{
    "type": "text",
    "text": "You are an expert. Here are 50 examples:\n[examples]",
    "cache_control": {"type": "ephemeral"}
}]
messages=[{"role": "user", "content": current_query}]
# Cache cleanly hits examples, current_query = regular rate
```

**Plus:** czysty cache hit na 50 examples, current_query placony osobno.

## Pattern 7: Multi-user isolation

**Kiedy uzyc:** aplikacja serwujaca wielu uzytkownikow z shared system rules ale per-user data.

**Zasada:** user-specific dane w messages, shared prefix w system.

**ZLE:**
```python
system=f"Assistant for user {user_id}. Preferences: {user_prefs}. Rules: {rules}"
# Kazdy user = unique cache entry -> N entries zamiast 1
```

**DOBRZE:**
```python
system=[{
    "type": "text",
    "text": "Assistant. Rules: [shared rules for all users]",
    "cache_control": {"type": "ephemeral"}
}]
messages=[
    {"role": "user", "content": f"My preferences: {user_prefs}. {current_question}"}
]
# Shared cache dla wszystkich userow w workspace
```

**Po Feb 2026:** cache workspace-isolated. Multi-tenant aplikacja moze dzielic cache TYLKO w ramach jednego workspace. Multi-workspace nie dzieli.

## Claude Code system-reminder pattern (bonus)

Claude Code uzywa genialnego mechanizmu dla dynamic context bez lamania cache. Zamiast wstawiac dynamic info do system prompt (classic anti-pattern), wstrzykuje jako `<system-reminder>` XML tag w user message:

```xml
<system-reminder>
Current date: 2026-04-17
User timezone: Europe/Warsaw
Git branch: master
</system-reminder>
```

**Zastosuj ten pattern we wlasnej aplikacji:** wszystko co ma timestamp, user state, session info - do system-reminder w messages, NIE w system prompt.

## 10 Anti-patternow - czarna lista

### #1 Timestamp w system prompt

```python
# ZLE
system=f"Today is {datetime.now()}. You are assistant..."
# Kazdy request invaliduje cache
```

**Fix:** system-reminder w messages.

### #2 User-specific data w system prompt

```python
# ZLE
system=f"Assistant for user {user_id}. Preferences: {user_prefs}..."
# N userow = N cache entries
```

**Fix:** user data w messages.

### #3 Dynamic data at top of messages

```python
# ZLE
messages=[
    {"role": "user", "content": dynamic_current_query},  # dynamic
    {"role": "user", "content": static_examples}  # static
]
# Breakpoint lapie dynamic
```

**Fix:** static first, dynamic last.

### #4 Zmiana tool description mid-session

```python
# Turn 1
tools[0].description = "Read file"
# Turn 2 (jakis agent zdecydowal poprawic)
tools[0].description = "Read file content"  # KASUJE CACHE
```

**Fix:** freeze tools przy starcie.

### #5 Model switch mid-session

```python
# Turn 1
model = "claude-opus-4-7"
# Turn 2
model = "claude-sonnet-4-6"  # FULL REBUILD
```

**Fix:** uzyj subagent jezeli potrzebujesz innego modelu dla konkretnego step.

### #6 CLAUDE.md edit podczas sesji Claude Code

```bash
# W trakcie aktywnej sesji CCh
$ vim CLAUDE.md  # ZAPIS KASUJE LAYER
```

**Fix:** wyjdz z sesji, zedytuj, wroc (nowa sesja).

### #7 Cache_control ponizej minimum

```python
# Sonnet 4.6, minimum 2048 tokens
system=[{"type": "text", "text": "1500 tokens content", "cache_control": {...}}]
# Fails silently - cache nie aktywny
```

**Fix:** pilnuj dlugosci, check `response.usage.cache_creation_input_tokens > 0`.

### #8 Cache bez reuse (single-shot)

```python
# Jednorazowy request z cache_control
# 1 write at 1.25x, 0 reads = 25% ekstra za nic
```

**Fix:** nie uzywaj cache dla <2 requestow.

### #9 1h TTL dla krotkotrwalego chatu

```python
# Chat user zadaje 3 pytania przez 2 minuty potem wychodzi
"cache_control": {"type": "ephemeral", "ttl": "1h"}  # 2x write, nigdy nie break-even
```

**Fix:** 5m default dla interaktywnych chatow.

### #10 Capitalization / whitespace drift

```python
# Dzien 1
system="You are assistant. Follow the rules."
# Dzien 2 (ktos poprawil)
system="You Are Assistant. Follow The Rules."  # KASUJE 2727-token cache
```

**Fix:** freeze static content, nie generuj dynamicznie.

## Decision tree dla wyboru patternu

```
Czy >=2 requestow z tym samym prefix w oknie TTL?
|
NO -> NIE UZYWAJ CACHE
|
YES -> Czy prefix > minimum tokens (1024/2048/4096)?
       |
       NO -> NIE UZYWAJ CACHE (fails silently)
       |
       YES -> Multi-layer freshness?
              |
              NO (single layer) -> Pattern 1: Single breakpoint
              |
              YES (rules + docs) -> Pattern 2: Two breakpoints
       |
       Multi-turn agent heavy -> Pattern 3: Automatic top-level
       |
       Bulk offline workload -> Pattern 4: Priming + Batch
       |
       MCP / tool-heavy -> Pattern 5: Tool prefix stability
       |
       Few-shot learning -> Pattern 6: System prefix examples
       |
       Multi-user -> Pattern 7: User data in messages
```

## Framework support - ktory framework co implementuje

**LangChain:** `AnthropicPromptCachingMiddleware` - Pattern 3 (automatic) domyslnie. Pattern 1-2 wymaga manualnego config.

**LlamaIndex:** Anthropic Prompt Caching integration - per-request flaga, wspiera Pattern 1-4.

**Spring AI:** Anthropic module - wspiera podstawy, mniej dojrzale niz LangChain/LlamaIndex.

**AWS Bedrock:** Prompt caching support od 2026-Q1, integruje z Bedrock Batch Inference.

## Porownanie z konkurencja

- **OpenAI:** automatic cache, zero config, 50% savings, write FREE. Najlatwiejsze ale najmniejsze savings.
- **Anthropic:** explicit, wymaga design, 90% savings, write 1.25x/2x. Najwyzsze savings dla heavy-read.
- **Google Gemini:** explicit `cachedContents` API, 75% savings, write FREE, billed per minute storage.

**Kiedy Anthropic wygrywa ekonomicznie:**
- Heavy-read workflows (break-even 1-2 hit)
- Bulk processing z priming pattern
- Multi-turn agents z stable context

**Kiedy OpenAI tanszy:**
- Single-shot requests
- Unpredictable prefix matching

## Czego NIE uzywaj

- **Nie mieszaj patternow 1 i 2 bez powodu** - jezeli masz jednorodny freshness, Pattern 1 wystarczy
- **Nie uzywaj automatic caching jezeli masz multi-tier TTL** - Pattern 2 explicit daje wiecej kontroli
- **Nie priming pattern dla <100 requestow batch** - overhead nie oplaca sie dla malych batchy

---

**Nastepny krok:** `02_DECISION_GUIDE.md` - kiedy uzyc czego w konkretnym scenariuszu + case studies.
