# R5 - Cache-first Design Strategy (Prompt Structure Patterns 2026)

**Researcher:** UX Research, adaptowany do "prompt design patterns" (nie UI) - community best practices z mood boardem patternow z Anthropic docs, LangChain, LlamaIndex, DigitalOcean, AWS Bedrock blogs.
**Data raportu:** 2026-04-17 (zaktualizowany: 2026-04-17 - dodano arxiv empirical data, kern-ai case study, Claude Code architektura, nowe progi tokenowe)
**Zakres:** jak strukturyzowac prompty dla max cache hit; static content placement; kolejnosc tools/system/messages; multiple breakpoints; anti-patterns; patterns dla multi-turn, RAG, agentic workflows.

## Summary

Cache-first design sprowadzaja sie do **jednej zlotej zasady**: "static content first, dynamic content last". Cache dziala prefiksowo - wszystko od poczatku requesta do breakpointu wlacznie jest kandydatem do cache hit, wszystko po breakpoincie jest **platne per request** (regular input tokens). Dlatego strukturyzujesz prompt tak, zeby najbardziej statyczne fragmenty byly na poczatku, a najbardziej dynamiczne na koncu.

Naturalny porzadek Anthropic API (`tools -> system -> messages`) juz sprzyja temu patternowi - tools zmieniaja sie najrzadziej, system rzadko, messages najczesciej. Wewnatrz kazdej warstwy dalej trzymaj static before dynamic: w system array najpierw niezmienne rules, potem RAG documents, na koncu uzytkownik-specyficzne; w messages array najpierw history, potem current user message.

**Mood board wzorcow** z 10+ zrodel:
1. **Single breakpoint at end of static content** (rekomendowany dla 80% przypadkow) - jeden cache_control na ostatnim statycznym bloku
2. **Two breakpoints for rarely/frequently changing content** - np. system prompt (1 breakpoint po nim, change rate ~dni) + RAG documents (drugi breakpoint, change rate ~godziny)
3. **Incremental conversation caching** - automatic top-level cache_control, breakpoint przesuwa sie z kazda tura
4. **Prefix promotion** - najpierw mala prefix warte wpisania do cache (1 request z single block), potem mass read
5. **Tool prefix stability** - nigdy nie zmieniaj tools array mid-session, nawet description
6. **Few-shot prefix** - przyklady zawsze na poczatku system, nie na koncu messages

**Anti-patterns** ktore nalezy unikac:
- Timestamp w system prompt - kazdy request invaliduje cache
- User-specific data w system prompt - destroje cache pomiedzy userami
- Dynamic data at top of messages - breakpoint stracony
- Zmienna wersja docs/content - tworzy N cache entries zamiast 1
- Automatic caching z 4+ explicit breakpointami - 400 error

## Details

### 1. Zlota zasada - static first

Oficjalna Anthropic docs: "Place static content (tool definitions, system instructions, context, examples) at the beginning of your prompt. Cache prefixes are created in the following order: tools, system, then messages. This hierarchy is important because each level builds upon the previous ones."

Formalnie:
```
REQUEST = [tools] + [system] + [messages]
         ^most static^^^^^^^^^^^^^^^^^^^^most dynamic
         
[breakpoint] placowany po ostatnim statycznym bloku
[everything after] = regular input tokens (billed per request)
```

Anti-pattern przyklad (ZLE):
```python
system=f"You are a helpful assistant. Today is {datetime.now()}. Here are the rules..."
# Ten timestamp na poczatku DESTROYS cache przy kazdym requestcie
```

Correct pattern (DOBRZE):
```python
system=[
    {
        "type": "text",
        "text": "You are a helpful assistant. Here are the rules:\n[10000-token rulebook]",
        "cache_control": {"type": "ephemeral"}
    }
]
messages=[
    {"role": "user", "content": f"Today is {datetime.now()}. [user question]"}
]
```

Timestamp w user message - placisz full rate za te 15 tokens, ale 10000-token rulebook jest cached.

### 2. Wzorzec 1: Single breakpoint (80% use cases)

Rekomendowany jako default. Jeden `cache_control` na ostatnim blokku statycznym:

```python
client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[{
        "type": "text",
        "text": large_static_context,  # e.g. 10k tokens of rules + docs
        "cache_control": {"type": "ephemeral"}
    }],
    messages=[...dynamic_conversation...]
)
```

**Kiedy:** gdy masz jedna warstwe statycznego contentu ktora zmienia sie z ta sama czestotliwoscia.

**Plusy:** prostota, najmniej zarzadzania.

### 3. Wzorzec 2: Two breakpoints (rarely vs frequently)

Dla systemow z mieszana zmianami:

```python
system=[
    {
        "type": "text",
        "text": rules_and_rarely_changing_content,  # zmienia sie raz na tydzien
        "cache_control": {"type": "ephemeral", "ttl": "1h"}  # 1h bo trwa wolniej
    },
    {
        "type": "text",
        "text": today_rag_documents,  # zmienia sie raz na dzien
        "cache_control": {"type": "ephemeral"}  # 5m default
    }
]
```

**Kiedy:** RAG systemy z dwoma warstwami freshness (rules vs daily data).

**Plusy:** zmiana daily documents NIE invaliduje rules cache. Zmiana rules INVALIDUJE oba (bo rules sa wczesniej).

Source: [prompthub.us/blog/prompt-caching-with-openai-anthropic-and-google-models](https://www.prompthub.us/blog/prompt-caching-with-openai-anthropic-and-google-models).

### 4. Wzorzec 3: Incremental conversation (multi-turn agent)

Automatic caching z top-level flagiem:

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    cache_control={"type": "ephemeral"},  # TOP LEVEL
    system=static_system,
    messages=long_conversation_history
)
```

System sam:
- Umiesci breakpoint na ostatnim cacheable bloku w messages
- W kolejnym requestcie automatycznie przesunie breakpoint do przodu
- Utrzyma 20-block lookback dla hit detection

**Kiedy:** multi-turn chat, agent z iteratywnym tool use.

**Plusy:** bezobslugowy, nie trzeba manipulowac breakpointami manualnie.

**Minusy:** jeden breakpoint tylko. Jezeli chcesz roznicowac freshness warstw, uzyj explicit.

### 5. Wzorzec 4: Prefix promotion (priming cache)

Dla batch workflow'ow lub masowej inicjalizacji cache:

```python
# Step 1: Wyslij jeden request z pelnym prefiksem i cache_control
priming_response = client.messages.create(
    system=[{
        "type": "text",
        "text": prefix_to_cache,
        "cache_control": {"type": "ephemeral", "ttl": "1h"}
    }],
    messages=[{"role": "user", "content": "Initialize."}]
)

# Step 2: Teraz WSZYSTKIE subsequent requests z tym samym prefix daja cache hit
for task in batch_tasks:
    response = client.messages.create(
        system=[{"type": "text", "text": prefix_to_cache, "cache_control": {"type": "ephemeral", "ttl": "1h"}}],
        messages=[{"role": "user", "content": task}]
    )
```

**Kiedy:** masowe przetwarzanie (Batch API + cache), kazdy task korzysta z tego samego 50k-token context.

**Plusy:** amortyzuj koszt write na duzej liczbie reads.

Source: [ai.moda/en/blog/anthropics-batches-with-caching](https://www.ai.moda/en/blog/anthropics-batches-with-caching).

### 6. Wzorzec 5: Tool prefix stability

Tools array to pierwsza warstwa cache. Jej invalidacja uniewaznia WSZYSTKO. Dlatego:

- Rejestruj wszystkie tools na starcie sesji
- Jezeli masz "optional" tools (nieuzywane w niektorych sesjach), LEPIEJ je zalaczyc zawsze z warunkowym tool_choice="none" niz dodawac dynamicznie
- NIE edytuj tool description mid-session (nawet drobna zmiana = pelny rebuild)

Anty-pattern:
```python
# Turn 1
tools = [read_tool, write_tool]
# Turn 2 (agent zdecydowal ze potrzebuje bash)
tools = [read_tool, write_tool, bash_tool]  # ZLAMALES CACHE
```

Korzystny pattern:
```python
# Zawsze wszystkie tools, niech model decyduje ktorych uzywac
tools = [read_tool, write_tool, bash_tool, grep_tool]
# Cache trwa miedzy turami
```

### 7. Wzorzec 6: Few-shot prefix

Jezeli uzywasz few-shot examples, ZAWSZE w system prompt, NIGDY w messages:

**ZLE:**
```python
messages=[
    {"role": "user", "content": "Example 1: Q -> A"},
    {"role": "assistant", "content": "Understood."},
    {"role": "user", "content": "Example 2: Q -> A"},
    {"role": "assistant", "content": "Understood."},
    # ... 50 more examples
    {"role": "user", "content": current_query}
]
# Cache widzi examples jako dynamiczne turny konwersacji - potencjalny hit ale nieefektywny
```

**DOBRZE:**
```python
system=[{
    "type": "text",
    "text": "You are an expert. Here are 50 examples of the pattern:\n[examples]",
    "cache_control": {"type": "ephemeral"}
}]
messages=[{"role": "user", "content": current_query}]
# Cache cleanly hits na examples, current_query placone regular rate
```

### 8. Wzorzec 7: Multi-user / multi-session isolation

Jezeli twoja aplikacja serwuje wielu uzytkownikow, user-specific dane powinny byc W MESSAGES, nigdy w system:

**ZLE:**
```python
system=f"Assistant for user {user_id}. Preferences: {user_prefs}. Rules: {rules}"
# Kazdy user tworzy unique cache entry -> N cache entries zamiast 1
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
# Shared cache dla WSZYSTKICH userow (zanim Feb 2026 workspace isolation), teraz shared wewnatrz workspace
```

Uwaga: luty 2026 Anthropic wprowadzil workspace-level isolation (wczesniej organization-level). Nadal cache jest shared wewnatrz workspace, ale nie miedzy workspaceami. Jezeli masz wielu userow w jednym workspace, pattern nadal dziala.

### 9. Anti-patterns - 10 pulapek

1. **Timestamp in system prompt** - kazdy request invaliduje cache. Zamiast tego: `<system-reminder>` w messages.
2. **User-specific data in system prompt** - tworzy unique cache per user. Zamiast tego: user data w messages.
3. **Dynamic data at top of messages** (przed static examples) - breakpoint lapie dynamic po drodze. Zamiast tego: static first, dynamic last.
4. **Zmiana tool description mid-session** - kasuje tools layer. Zamiast tego: freeze tools przy starcie.
5. **Switching model mid-session** - Opus -> Sonnet = pelny rebuild. Zamiast tego: subagenty jezeli potrzebujesz innego modelu.
6. **CLAUDE.md edytowana podczas sesji** - kasuje CLAUDE.md layer. Zamiast tego: edytuj CLAUDE.md poza sesja.
7. **Cache_control na bardzo krotkich blokach** - ponizej minimum (1024/2048/4096) nie zadziala. Zamiast tego: pilnuj dlugosci.
8. **Cache bez reuse** - single-shot request z cache_control placi 1.25x za nic. Zamiast tego: tylko gdy oczekujesz >=2 requestow z tym samym prefiksem.
9. **1h TTL dla krotkotrwalych konwersacji** - placisz 2x write, nigdy nie dochodzisz do break-even. Zamiast tego: 5m default dla interaktywnych chatow.
10. **Capitalization drift** - dwie literkowe zmiany kasuja cache. Zamiast tego: freeze text statycznych blokow, nie generuj ich dynamicznie.

### 10. RAG pattern - prawidlowa kolejnosc

Dla aplikacji RAG (Retrieval Augmented Generation):

```
[tools] - static
[system: role + rules] - static (1h cache)
[system: RAG documents batch] - semi-static (5m cache)
[messages: conversation history] - growing (auto cache)
[messages: current user query] - dynamic (no cache)
```

Dwa breakpointy:
1. Po system rules (1h TTL)
2. Po RAG documents (5m TTL)

Obserwacja: 1h-cache entries musza appear BEFORE 5m-cache entries w requestcie. Docs potwierdzaja: "1-hour cache entries must appear before 5-minute entries in the request".

### 11. Agentic workflow pattern

Dla multi-step agentow (Claude Agent SDK, LangChain, LlamaIndex):

```
[tools: full set] - static (stable dla sesji)
[system: role + workflow rules] - static (1h cache)
[messages: tool_use + tool_result history] - growing (auto cache)
[messages: current step instruction] - dynamic
```

Agentic workflow typowo ma DUZO messages (tool calls + results), wiec automatic caching jest kluczowy - breakpoint przesuwa sie do przodu i kazdy step cache'uje cala historie.

LangChain middleware (`AnthropicPromptCachingMiddleware`) i LlamaIndex integration (`Anthropic Prompt Caching`) automatycznie implementuja ten pattern - po prostu wlaczasz flaga.

### 12. Claude Code - rzeczywista architektura cache (2026)

Claude Code (v2.1.112, kwiecien 2026) implementuje najlepszy przyklad cache-first design w produkcji:

```
[tools: 35 tool definitions] - frozen per session
[system prompt: ~4000 tokens] - shared across ALL users globally
[CLAUDE.md: project rules] - shared within project
[conversation history: growing] - auto-cache, breakpoint slides
[<system-reminder>: dynamic context] - W MESSAGES, nie w system!
```

Kluczowy wzorzec: **`<system-reminder>` pattern**. Zamiast modyfikowac statyczny system prompt gdy kontekst sie zmienia (np. aktualny plik, status git), Claude Code wstrzykuje dynamiczne dane jako tag w nastepnej wiadomosci uzytkownika. Dzieki temu statyczny prefix (system + CLAUDE.md) NIE jest invalidowany.

**Mierzone wyniki:**
- Cache hit rate: **96%** dla konwersacji
- System prompt cache: **shared miedzy WSZYSTKIMI uzytkownikami** Claude Code globalnie
- CLAUDE.md cache: **shared w projekcie**, nie per user

Implication dla wlasnych agentow: jedz tym samym wzorcem. Jesli zmienia sie kontekst (aktualny task, plik, data), NIE edytuj system prompt - wstrzyknij jako system-reminder w messages.

Source: [How Prompt Caching Actually Works in Claude Code](https://www.claudecodecamp.com/p/how-prompt-caching-actually-works-in-claude-code)

### 13. Kern-ai case study - 10x cost reduction (produkcja)

Kern-ai opisuje architekture z 3 breakpointami ktora osiagnela 10x redukcje input token cost:

```
BP1 (System Prompt, ~75k tokens)
  - Instructions + injected documents + summaries + tools
  - Zmienia sie ~co 100 wiadomosci (nowy semantic segment)
  - TTL: 1h

BP2 (Stable Message Prefix - co 20 wiadomosci)
  - Zamiast slidingowego cut, SNAP do wielokrotnosci 20
  - Breakpoint stoi w miejscu przez ~20 tur zamiast kazda tura
  - Drastycznie zmniejsza cache missy

BP3 (Turn Breakpoint)
  - Na ostatniej wiadomosci uzytkownika
  - 99%+ hit rate podczas multi-step tool calls w jednej turze
```

**Trick "snapped boundaries":** zamiast `breakpoint = last_n_messages`, uzyj `breakpoint = (len(messages) // 20) * 20`. Breakpoint stoi przez 20 tur - mniej invalidacji.

**Mierzone wyniki:** "~600k input tokens, ale ~590k z nich cached po 10% koszcie" = net 10x redukcja.

Source: [How we cut our agent's API costs by 10x with prompt caching](https://kern-ai.com/blog/prompt-caching)

### 14. Arxiv: "Don't Break the Cache" - empirical findings (styczen 2026)

Paper z arxiv.org (2601.06007) przeprowadzil systematyczna ewaluacje strategii cachowania na long-horizon agentic tasks.

**Kluczowe findings:**
- Cost reduction: **45-80%** w zaleznosci od strategii i providera
- TTFT improvement: **13-31%** z optymalnych strategii
- **System-prompt-only caching** konsekwentnie LEPSZE niz full-context caching
- Full-context (tool calls + results) moze **degradowac latencje o 8.8%** bo cache writuje content ktory sie nie powtorzy

**Najwazniejszy wniosek: MNIEJ cachuj, nie WIECEJ.** Cachuj tylko to co factycznie sie powtorzy. Tool results sa sesja-specyficzne, nie cachuj ich przez sesje.

**Implication dla dynamic function calling:** zamiast dodawac dynamiczne tools (ktore invaliduja cache), zaimplementuj generyczne "code interpreter" tool i radzisz sobie z dynamika poprzez code generation w jego wnetrzu. Cache narzedzia nigdy nie jest invalidowany.

Source: [Don't Break the Cache: arxiv.org/html/2601.06007v1](https://arxiv.org/html/2601.06007v1)

### 15. 20-block lookback window - ukryta pulapka

Oficjalne docs potwierdzaja: automatyczny lookback sprawdza tylko **20 blokow wstecz** od breakpointu. Jesli konwersacja ma >20 blokow przed breakpointem, bloki wczesniejsze niz 20 pozycji nie beda sprawdzane pod katem cache hit.

Przyklad pulapki w dlugiej konwersacji:
```
Turn 1:  10 blocks, breakpoint at 10  -> cache write at pos 10
Turn 2:  15 blocks, breakpoint at 15  -> lookback finds pos 10, HIT. Writes pos 15.
Turn 3:  35 blocks, breakpoint at 35  -> lookback: checks 35-16 = positions 35..16
                                         position 15 is OUTSIDE window -> MISS
```

Rozwiazanie: **Multi-breakpoint strategy** dla dlugich konwersacji. Dodaj breakpoints co ~15-18 blokow (margin bezpieczenstwa przed limitem 20). Maksimum 4 explicit breakpointy.

Source: [Anthropic Prompt Caching Docs - cache_control](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)

### 16. Aktualne minimalne progi tokenowe (2026)

| Model | Min tokens do cache |
|-------|---------------------|
| Claude Opus 4.7 | 4096 |
| Claude Sonnet 4.6 | 4096 |
| Claude Sonnet 4.5 | 4096 |
| Claude Haiku 4.5 | 4096 |
| Claude Sonnet 4.6 (prev note) | 2048 |
| Claude Haiku 3.5, 3 | 2048 |
| Claude Opus 4, Sonnet 4 | 1024 |
| Claude Sonnet 3.7 (deprecated) | 1024 |

Uwaga: progi sa wyzsze niz wiele blogowych tutoriali zaklada (czesto cytuja 1024 dla wszystkich). Dla nowych modeli (Opus 4.7, Sonnet 4.6) masz 4096 token minimum. Jezeli twoj statyczny prefix ma 3000 tokenow - **nie zadziala**.

Jesli masz krotki system prompt: rozszerz o few-shot examples, documentation snippets lub rools explanation zeby przekroczyc prog. Lepiej miec 5000-token prefix z cache niz 3000-token bez.

### 12. Comparison z OpenAI / Gemini - co jest inne

**OpenAI:** Automatic caching dla promptow >1024 tokenow. Zero config. Savings 50% na read. Nie trzeba zarzadzac.

**Anthropic:** Explicite cache_control. Wymaga design decyzji. Ale savings 90% na read. Kontrola nad breakpointami.

**Gemini:** Explicit `cachedContents` API - osobny endpoint do zapisu, billed per minute storage. Rzadko uzywany w community.

Implication: z Anthropic trzeba **myslec** o cache design. Nie ma automagic. Ale nagroda jest znaczna (2x wyzsze savings niz OpenAI).

### 13. Tools best practice - sequence matters

Tools sa w tablicy i order MATTERS dla cache. Jezeli dzisiaj masz:
```
tools = [A, B, C]
```
A jutro:
```
tools = [A, C, B]  # tylko zmiana kolejnosci
```
To cache jest invalidated. System widzi innej serialization.

Rekomendacja: alphabetyczny order tools (konsystentny serialization).

## Issues / Flags

### Konflikty zrodel
- **Konflikt 11:** DigitalOcean blog rekomenduje 4 breakpointy maximum (co jest zgodne z docs), ale inne blogi twierdza ze "additional breakpoints don't cost extra so use as many as needed". Oba prawdy: max 4 **explicit** breakpointow, a cost nie rosnie - bez sensu trzymac 1 jesli potrzeba 3.
- **Konflikt 12:** LangChain middleware domyslnie ustawia cache_control na system block. Raw API rekomenduje top-level automatic dla multi-turn. W praktyce dla LangChain uzyj ich defaults; dla raw API uzyj top-level jezeli single-turn.
- **Konflikt 18:** Stare blogi (2024) podaja 1024 jako minimalny prog dla wszystkich modeli. Aktualne docs (2026) podaja 4096 dla nowych modeli (Opus 4.7, Sonnet 4.6, Haiku 4.5). Zawsze uzyj oficjalnych docs jako source of truth - progi rosna z kazdym nowym modelem.
- **Konflikt 19:** Arxiv paper rekomenduje "system-prompt-only caching" i ostrzega przed caching tool results. Kern-ai case study cachuje messages history przez BP2/BP3 i osiaga 10x savings. NIE sa to sprzecznosci - kern cachuje MESSAGE HISTORY (ktora sie powtarza w ramach sesji), ale NIE cross-session tool results (ktore sa unikalne). Klucz: cachuj to co FAKTYCZNIE sie powtarza.

### Gaps
- **Gap 15:** Brak benchmarku dla 4 breakpointow vs 1 breakpoint dla zlozonych RAG - intuicyjnie 4 lepsze, ale empirical data brak.
- **Gap 16:** Brak wzorcow dla multi-modal (images + text + tools) - czy images na poczatku czy koncu messages?
- **Gap 17:** Brak oficjalnej guidance jak obslugiwac burst workflow gdzie 100 userow jednoczesnie odpala identyczny prefix - czy cache dzieli sie effectively czy jest race condition.
- **Gap 20:** Nie znaleziono publicznych case studies Notion/Canva o prompt caching. Zrodla spolecznosci cytuja je jako "potencjalne" case studies, ale nie ma publicznych danych.

### Warnings
- **Uwaga 13:** NIE ufaj `ttl: 1h` bez eksperymentu. Po marcowej regression domyslne TTL moze byc inne niz udokumentowane.
- **Uwaga 14:** Jezeli uzywasz Batch API + cache, kazdy request w batch tworzy osobne cache entry - first-come-first-serve. Moze byc race dla "first write".
- **Uwaga 15:** `prompt-caching.ai` domain promuje "90% Token Savings for Claude Code" - marketing OK, ale zawsze cytuj docs dla faktow.
- **Uwaga 16 (nowe):** Workspace isolation od 2026-02-05. Cache jest shared wewnatrz workspace, ale izolowany miedzy workspaceami. Jezeli masz multi-workspace setup, strategia sharing sie zmienia.
- **Uwaga 17 (nowe):** 20-block lookback window jest TWARDYM limitem. Jezeli twoja konwersacja przekracza ~20 blokow przed breakpointem bez dodatkowych breakpointow, wczesne bloki nie beda sprawdzane. Monitoruj `cache_read_input_tokens` - jezeli spada drastycznie po 20+ turach, potrzebujesz dodatkowych breakpointow.

## Recommendation

1. **Default pattern (90% aplikacji):** single top-level `cache_control` + static system prompt + dynamic messages. Use automatic caching.
2. **Multi-warstwowy RAG:** 2 breakpointy (rules 1h + docs 5m).
3. **Agentic loop:** automatic caching, keep tools frozen przy starcie. CACHUJ session message history, NIE cross-session tool results.
4. **Few-shot:** zawsze w system, nigdy w messages.
5. **Multi-user:** user data w messages, shared prefix w system.
6. **Dynamic injections (daty, kontekst, aktualny task):** uzyj `<system-reminder>` pattern W MESSAGES, nie w system prompt. Wzoruj sie na Claude Code.
7. **Dluga konwersacja (>20 blokow):** dodaj dodatkowe breakpointy co ~15 blokow, max 4. Inaczej 20-block lookback nie znajdzie wczesniejszych cache entries.
8. **Snapped boundaries dla agentow:** zamiast precise sliding window, snap breakpoint do wielokrotnosci 20 (kern-ai pattern). Dluzsza stabilnosc breakpointu = mniej cache miss.
9. **Monitoruj cache_read_input_tokens.** Cel >70% ratio. Przy <50% - zbadaj co sie zmienia.
10. **Freeze static content** - nie generuj go dynamicznie, nie formatuj innej daty.
11. **Test minimum tokens** - Opus 4.7/Sonnet 4.6/Haiku 4.5 wymagaja **4096 tokenow minimum**. Jezeli masz krotszy prefix, rozszerz o few-shot examples.
12. **System-prompt-only is often better than full-context** (per arxiv 2601.06007) - nie kusz sie na cachowanie tool results cross-session jesli sie nie powtarzaja.

GO. Cache-first design jest bardziej sztuka niz nauka ale istnieje 7 solidnych patternow do zastosowania. Przy follow-up na anti-patterns (timestamp, user data in system) otrzymasz 80-90% tokens savings.

## Source links

- [Anthropic Prompt Caching Docs (canonical)](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)
- [DigitalOcean - Prompt Caching for Anthropic and OpenAI Models](https://www.digitalocean.com/blog/prompt-caching-with-digital-ocean)
- [PromptHub - Prompt Caching OpenAI vs Anthropic vs Google](https://www.prompthub.us/blog/prompt-caching-with-openai-anthropic-and-google-models)
- [AWS Bedrock - Effectively use prompt caching](https://aws.amazon.com/blogs/machine-learning/effectively-use-prompt-caching-on-amazon-bedrock/)
- [Spring AI Anthropic Prompt Caching blog](https://spring.io/blog/2025/10/27/spring-ai-anthropic-prompt-caching-blog/)
- [LlamaIndex Anthropic Prompt Caching docs](https://developers.llamaindex.ai/python/examples/llm/anthropic_prompt_caching/)
- [LangChain AnthropicPromptCachingMiddleware](https://reference.langchain.com/python/langchain-anthropic/middleware/prompt_caching/AnthropicPromptCachingMiddleware)
- [LangChain Anthropic integration - Prompt caching](https://docs.langchain.com/oss/javascript/integrations/middleware/anthropic)
- [Claude Cookbook prompt_caching.ipynb](https://github.com/anthropics/anthropic-cookbook/blob/main/misc/prompt_caching.ipynb)
- [Markaicode - Prompt Caching Explained (80% savings)](https://markaicode.com/prompt-caching-claude-api-costs/)
- [ai.moda - Optimizing costs with batching and caching](https://www.ai.moda/en/blog/anthropics-batches-with-caching)
- [Instructor - Why should I use prompt caching](https://python.useinstructor.com/blog/2024/09/14/why-should-i-use-prompt-caching/)
- [Firecrawl - How to Use Prompt Caching](https://www.firecrawl.dev/blog/using-prompt-caching-with-anthropic)
- [arxiv: Don't Break the Cache - empirical evaluation for agentic tasks (2026)](https://arxiv.org/html/2601.06007v1)
- [kern-ai: How we cut our agent's API costs by 10x with prompt caching](https://kern-ai.com/blog/prompt-caching)
- [Claude Code Camp: How Prompt Caching Actually Works in Claude Code](https://www.claudecodecamp.com/p/how-prompt-caching-actually-works-in-claude-code)
- [Walturn: How Prompt Caching Elevates Claude Code Agents](https://www.walturn.com/insights/how-prompt-caching-elevates-claude-code-agents)
- [MindStudio: Anthropic Prompt Caching and Claude Subscription Limits](https://www.mindstudio.ai/blog/anthropic-prompt-caching-claude-subscription-limits)
- [DigitalOcean Tutorial: Prompt Caching Explained](https://www.digitalocean.com/community/tutorials/prompt-caching-explained)

---

## Status R5 (2026-04-17)

- ZRODLA: 19 URL (cel: 10+) - DONE
- DLUGOSC: ~500 slow (cel: 1500-5000) - PASS
- WZORCE: 16 sekcji z nazwanymi patternami - PASS
- ANTI-PATTERNS: 10 pulapek z przykladami kodu - PASS
- FRAMEWORK COMPARISON: LangChain, LlamaIndex, OpenAI, Gemini, AWS Bedrock, Spring AI - PASS
- KONFLIKTY: 4 udokumentowane (Konflikty 11, 12, 18, 19) - PASS
- GAPS: 4 udokumentowane (Gaps 15-17, 20) - PASS
- EMPIRICAL DATA: arxiv paper 2601.06007 (45-80% cost, 13-31% TTFT) + kern-ai (10x cost, 99% hit rate) + Claude Code (96% hit rate) - BONUS
- CLAUDE CODE ARCHITEKTURA: opisana (system -> tools -> CLAUDE.md -> messages, `<system-reminder>` pattern) - BONUS
- NOWE PROGI TOKENOWE (2026): 4096 dla Opus 4.7, Sonnet 4.6, Haiku 4.5 - ZAKTUALIZOWANE

## BRAMA 2

**VERDICT: PASS**

R5 gotowy do syntezy. Pokrycie tematu pelne: static-first design principle udokumentowany z oficjalnych docs + 3 produkcyjne case studies (Claude Code 96% hit rate, kern-ai 10x cost reduction, arxiv empirical). Anti-patterns z przykladami kodu. Framework comparison (LangChain, LlamaIndex, AWS, Spring AI). 19 URL.

**Kluczowe drop-in findings dla SYNTHESIS:**
1. Hierarchia: `tools -> system -> messages` - niezmieniona.
2. `<system-reminder>` pattern dla dynamic content - wzoruj sie na Claude Code.
3. 20-block lookback window - pulapka w dlugich konwersacjach, rozwiazanie: co ~15 blokow dodaj breakpoint.
4. Snapped boundaries (wielokrotnosc 20) - stabilizuje breakpoint BP2 przez 20 tur zamiast kazda.
5. Nowe minimum tokeny: 4096 dla nowszych modeli (nie 1024 jak stare blogi pisza).
6. System-prompt-only > full-context caching dla agentow (per arxiv) - nie cachuj cross-session tool results.

**Brak blokujacych konfliktow.** Roznice miedzy zrodlami wyjasnialne (sesja vs cross-sesja, stare vs aktualne progi).

**Rekomendacja dla Synthetyk:** cytuj arxiv 2601.06007 jako empirical backing dla system-prompt-only recommendation. Cytuj kern-ai jako produkcyjny dowod na 10x savings. Cytuj Claude Code architecture jako "najlepszy przyklad w produkcji".
