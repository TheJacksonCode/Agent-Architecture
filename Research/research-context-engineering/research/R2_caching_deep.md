# R2 - Cache Mechanics Deep Dive: Kontekstowy Aspekt Prompt Cachingu
**Researcher:** R2 Tech (Archiwista oficjalnej prawdy)
**Data:** 2026-04-17
**Kampania:** Context Engineering 2026
**Confidence score:** 0.92

---

## Executive Summary

Prompt caching w Claude API jest mechanizmem **przechowywania stabilnych prefixow promptu** na serwerze Anthropic, eliminujac koszt reprocessingu tych samych tokenow przy kolejnych requestach. Z perspektywy context engineering kluczowa jest odpowiedz na pytanie: **co kwalifikuje sie jako "stabilny blok" i jak cache wspiera zarzadzanie oknem kontekstu**.

Glowne fakty:
- `cache_control: {type: "ephemeral"}` - jedyny typ, max 4 breakpointy na request
- TTL: 5 min (1.25x write) lub 1h (2x write), read zawsze 0.1x base
- Break-even: 2 cache-hity dla 5m TTL, 3 hity dla 1h TTL
- Claude Code cache-uje automatycznie: system prompt (~20k tokenow), CLAUDE.md, tool definitions, history
- Context editing (beta) umozliwia modyfikacje kontekstu bez invalidacji cache

---

## S1 - JSON Schema: cache_control i Breakpointy

### Schemat cache_control

```json
{
  "cache_control": {
    "type": "ephemeral",
    "ttl": "5m"
  }
}
```

TTL mozliwe wartosci: `"5m"` (domyslne, mozna pominac) lub `"1h"`.

Breakpoint mozna umiescic na:
- `tools[]` - ostatnie narzedzie w tablicy (cachuje caly prefix tools)
- `system[]` - content block w systemie
- `messages[].content[]` - dowolny content block w wiadomosciach

**Automatyczne cachowanie** (top-level): dodaje `cache_control` na poziomie requestu zamiast blokow - system sam przesuwa breakpoint na ostatni cacheable blok:

```json
POST /v1/messages
{
  "model": "claude-opus-4-7",
  "max_tokens": 1024,
  "cache_control": {"type": "ephemeral"},
  "system": "...",
  "messages": [...]
}
```

### Regula 4 breakpointow

- Maksymalnie **4 eksplicytne breakpointy** per request
- Automatyczne cachowanie zajmuje 1 slot
- Przekroczenie limitu zwraca blad

### Hierarchia breakpointow i cascading

Kolejnosc invalidacji: `tools -> system -> messages`

Zmiana na wyzszym poziomie invaliduje wszystko ponizej:
- Modyfikacja tool definitions: invaliduje caly cache (tools + system + messages)
- Toggle web search/citations: invaliduje system + messages
- Zmiana `tool_choice`: invaliduje messages
- Zmiana `disable_parallel_tool_use`: invaliduje messages
- Toggle images: invaliduje messages
- Zmiana thinking parameters: invaliduje messages

### Lookback Window

System szuka cachu przez **20 blokow wstecz** od breakpointu (najdluzszy pasujacy prefix). Jesli nie znajdzie - tworzy nowy wpis cache (cache write).

**UWAGA - Antypattern:**
```python
# ZLE: breakpoint na zmiennej tresci
{"type": "text", "text": f"Timestamp: {datetime.now()}", "cache_control": {"type": "ephemeral"}}

# DOBRZE: breakpoint na koncu stabilnego prefixu
{"type": "text", "text": "Staly kontekst", "cache_control": {"type": "ephemeral"}}
# dynamiczna czesc BEZ cache_control
{"type": "text", "text": f"Timestamp: {datetime.now()}"}
```

Zrodla: [Prompt caching docs](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching), [Tool use with caching](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-use-with-prompt-caching)

---

## S2 - TTL: 5 Minut vs 1 Godzina

### Parametry TTL

| TTL | Czas trwania | Koszt write | Koszt read | Use case |
|-----|-------------|-------------|------------|----------|
| `"5m"` (domyslne) | 5 minut | 1.25x base | 0.1x base | Aktywne sesje, czeste reuse |
| `"1h"` | 1 godzina | 2.0x base | 0.1x base | Rzadsze uzycie, dlugie sesje |

**1h TTL jest Generally Available** (nie wymaga juz beta headera od 2025).
Mozna mieszac TTL w jednym requeście: bloki 1h **musza pojawiac sie PRZED** blokami 5m.

### Billing dla mieszanych TTL

```
Pozycja A: najwyzszy cache hit (lub 0)
Pozycja B: najwyzszy blok z 1h cache_control po A (lub = A)
Pozycja C: ostatni blok z cache_control

Oplaty:
1. Cache reads za A
2. 1h cache writes za (B - A)
3. 5m cache writes za (C - B)
```

### Claude Code i TTL

W Claude Code (Anthropic 1P): cache 5-minutowy, kazdy hit resetuje timer - aktywna sesja z wymiana co 1-2 minuty trzyma cache warm indefinitely.

W Bedrock: istnieje nieudokumentowana zmienna srodowiskowa `ENABLE_PROMPT_CACHING_1H_BEDROCK`, ale 1h TTL NIE jest domyslne. Issue #32671 potwierdza ze CLI hardcoduje 5m na Bedrock.

Dla Claude Code Max plan: cache 1-godzinny (potwierdzony przez srodowisko deweloperskie).

Zrodla: [Prompt caching docs](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching), [GitHub Issue #32671](https://github.com/anthropics/claude-code/issues/32671), [GitHub Issue #18915](https://github.com/anthropics/claude-code/issues/18915)

---

## S3 - Cache Invalidation Triggers: Co Resetuje Cache

### Kompletna tabela invalidacji

| Zmiana | Invaliduje tools | Invaliduje system | Invaliduje messages |
|--------|-----------------|-------------------|---------------------|
| Modyfikacja tool definitions | TAK | TAK | TAK |
| Toggle web search / citations | TAK | TAK | TAK |
| Zmiana `tool_choice` | NIE | NIE | TAK |
| Zmiana `disable_parallel_tool_use` | NIE | NIE | TAK |
| Dodanie/usuniecie obrazow | NIE | NIE | TAK |
| Zmiana thinking parameters | NIE | NIE | TAK |
| Przelaczenie modelu (`/model`) | CALY | CALY | CALY |
| CLAUDE.md edycja + restart | TAK | TAK | TAK |
| Zmiana kapitalizacji 2 liter | TAK | TAK | TAK |
| Uplyniecie TTL (brak aktywnosci) | CALY | CALY | CALY |

### W Claude Code CLI: specyficzne triggery invalidacji

1. **Zmiana CLAUDE.md**: edycja pliku wymaga restartu sesji, co invaliduje caly cache i zaczyna budowac od nowa
2. **Instalacja nowego MCP servera**: zmienia tool definitions (najwyzszy poziom), invaliduje wszystko przy nastepnym starcie
3. **Model switching (`/model`)**: kazdy model ma izolowany cache
4. **`/rewind`**: usuniecie wiadomosci zmienia prefix messages
5. **Dynamic data w system prompt**: timestamp, losowe ID, zmienna data invaliduja cache na kazdym requeście

### Workspace isolation (od 2026-02-05)

Cache izolowany per **workspace** (nie organizacja). Rozne workspace w tej samej organizacji nie dziela cache.

Zrodla: [Tool use with caching](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-use-with-prompt-caching), [Claude Code Camp article](https://www.claudecodecamp.com/p/how-prompt-caching-actually-works-in-claude-code), [DEV.to mastering cache hits](https://dev.to/kitaekatt/mastering-cache-hits-in-claude-code-5648)

---

## S4 - Economics: Break-Even Formula i Cost Tables

### Pricing (kwiecien 2026)

| Model | Base Input | 5m Write | 1h Write | Read/Hit | Output |
|-------|-----------|----------|----------|----------|--------|
| Claude Opus 4.7 | $5/MTok | $6.25/MTok | $10/MTok | $0.50/MTok | $25/MTok |
| Claude Sonnet 4.6 | $3/MTok | $3.75/MTok | $6/MTok | $0.30/MTok | $15/MTok |
| Claude Haiku 4.5 | $1/MTok | $1.25/MTok | $2/MTok | $0.10/MTok | $5/MTok |

### Formula Break-Even

**Dla 5m TTL (1.25x write, 0.1x read):**
```
N_hits >= write_cost / (base_cost - read_cost)
N_hits >= 1.25x / (1x - 0.1x) = 1.25 / 0.9 = 1.39
```
Zaokraglajac: **2 hity zeby sie oplacilo** (1 write + 2 reads = -16% vs bez cache).

**Dla 1h TTL (2x write, 0.1x read):**
```
N_hits >= 2x / 0.9x = 2.22
```
Zaokraglajac: **3 hity zeby sie oplacilo** (1 write + 3 reads = -7% vs bez cache).

### Przyklad konkrety (Sonnet 4.6, 100k tokenow kontekstu)

**Scenariusz: 10 requestow, ten sam 100k kontekst**

| Opcja | Kalkulacja | Koszt |
|-------|-----------|-------|
| Bez cache | 100k * 10 * $3/M | $3.00 |
| 5m cache (>= 2 hity) | 1 write (125k * $3/M) + 9 reads (100k * 9 * $0.30/M) | $0.375 + $0.27 = **$0.645** |
| Oszczednosc | | **78.5%** |

**Scenariusz: 100-turnowa sesja kodowania (60k tokenow prefixu/request)**

| TTL | Scenariusz | Koszt |
|-----|-----------|-------|
| 5m | ~20 rewrites * 60k * $6.25/M + 80 reads * 60k * $0.30/M | $7.50 + $1.44 = $8.94 |
| 1h | 1 write * 60k * $10/M + 99 reads * 60k * $0.30/M | $0.60 + $1.78 = $2.38 |
| Bez cache | 100 * 60k * $3/M | $18.00 |

### Batch API + Caching: czy sie mnozy?

TAK - multipliers stackuja sie: "These multipliers stack with other pricing modifiers, including the Batch API discount and data residency." (oficjalna dokumentacja pricing).

| Scenariusz | Mnoznik inputu | Efektywna oszczednosc |
|-----------|---------------|----------------------|
| Samo caching (read) | 0.1x | 90% |
| Sam Batch API | 0.5x | 50% |
| Batch + Cache read | 0.5x * 0.1x = 0.05x | 95% |

Warunek: Batch API nie dotyczy sesji Managed Agents (stateful, interactive).

Zrodla: [Anthropic Pricing Page](https://platform.claude.com/docs/en/about-claude/pricing), [Claude Cookbook](https://platform.claude.com/cookbook/misc-prompt-caching)

---

## S5 - Claude Code CLI: Auto-Caching i Co Jest Cacheable

### Automatyczna architektura cache w Claude Code

Claude Code zarzadza cache automatycznie - uzytkownik nie musi robic nic specjalnego. Kazda wiadomosc wyslana przez CLI zawiera:

**Warstwy cache (od najbardziej stabilnej do dynamicznej):**

```
[LAYER 1: Global stable - scope: 'global'] <- SYSTEM_PROMPT_DYNAMIC_BOUNDARY
  Core instructions, bezpieczenstwo, rules (~20k+ tokenow)
  Specyfikacje 18 narzedzi (tool definitions)
  - Wspoldzielone przez WSZYSTKICH uzytkownikow Claude Code
  
[LAYER 2: Per-project stable]
  CLAUDE.md content (plik projektu)
  @import-owane pliki
  - Wspoldzielone przez wszystkich uzytkownikow tego projektu

[LAYER 3: Per-session dynamic]
  Historia konwersacji (starsza czesc - cached)
  Ostatnie N wiadomosci (uncached, nowe)
```

### Co kwalifikuje sie jako "stabilny blok" dla cachingu

| Typ contentu | Cacheable | Stabilnosc | Uwagi |
|-------------|-----------|-----------|-------|
| System prompt core | TAK | Wysoka (global) | Identyczny dla wszystkich userów |
| Tool definitions (18 tools) | TAK | Wysoka | Zmiana = invalidacja calego cache |
| CLAUDE.md | TAK | Srednia | Zmiana wymaga restartu |
| @imports z CLAUDE.md | TAK | Srednia | Jak CLAUDE.md |
| Konwersacja (starsze tury) | TAK | Niska | Cache sliding window |
| Tool results (starsze) | CZESCIOWO | Bardzo niska | Context editing moze czyścic |
| Thinking blocks | CZESCIOWO | Specjalna | Nie mozna explicit cache_control |
| Dynamic timestamps | NIE | Zerowa | Invaliduje przy kazdym requeście |
| Nowe wiadomosci usera | NIE | Zerowa | Zawsze fresh tokens |

### Prefix reuse w praktyce (dane empiryczne - LMCache blog)

Eksperyment na rzeczywistym tasku Claude Code (92 LLM calls, ~2M input tokenów):

| Faza | Cache reuse rate |
|------|-----------------|
| Explore subagents (#7-#45) | 92.06% |
| Plan subagent (#47-#72) | 93.23% |
| Execution (#73-#92) | 97.83% |
| Ogolnie | ~92% |

Oszczednosc: bez cache $6.00, z cache $1.152 = **81% reduction**.

### CLAUDE.md jako stabilny blok - optymalizacja

Zasady dla maksymalnego cache hit rate:
1. **Nie edytuj CLAUDE.md podczas aktywnej sesji** - zmiana wymaga restartu i przebudowy cache
2. **Nie uzywaj dynamic data w CLAUDE.md** - daty, numery wersji generowane dynamicznie = cache miss
3. **Batch all MCP server installs** - kazda nowa instalacja zmienia tool definitions (najwyzszy poziom invalidacji)
4. **Jeden model per sesja** - model switch = cold start

Zrodla: [Claude Code Camp article](https://www.claudecodecamp.com/p/how-prompt-caching-actually-works-in-claude-code), [LMCache blog](https://blog.lmcache.ai/en/2025/12/23/context-engineering-reuse-pattern-under-the-hood-of-claude-code/), [HarrisonSec pipeline analysis](https://harrisonsec.com/blog/claude-code-context-engineering-compression-pipeline/)

---

## S6 - Context Editing: Modyfikacja Kontekstu Bez Invalidacji Cache

Context editing (beta, header: `context-management-2025-06-27`) pozwala selektywnie usuwac stary content bez invalidowania cache prefixu.

### Dwie strategie

**Tool result clearing (`clear_tool_uses_20250919`):**
```json
{
  "context_management": {
    "edits": [{"type": "clear_tool_uses_20250919"}]
  }
}
```
- Usuwa stare tool results gdy context przekroczy threshold
- **Invaliduje cache** przy czyszczeniu (konieczny nowy cache write)
- Parametr `clear_at_least` zapewnia ze czyszczenie jest wystarczajace by nowy cache write byl oplacalny

**Thinking block clearing (`clear_thinking_20251015`):**
```json
{
  "context_management": {
    "edits": [{"type": "clear_thinking_20251015", "keep": "all"}]
  }
}
```
- `keep: "all"` - zachowuje wszystkie thinking blocks, MAKSYMALIZUJE cache hits
- `keep: {type: "thinking_turns", value: 1}` - tylko ostatni turn (domyslne)
- Zachowanie thinking blocks = cache preserved; czyszczenie = cache invalidation

### Zwiazek z cache i context window

Claude Code uzywa wewnetrznego mechanizmu `cache_edits` (nie bezposrednio context editing API) w 5-poziomowym compression pipeline:
- **Microcompact (Level 3)**: jesli cache warm -> `cache_edits` do modyfikacji bez invalidacji; jesli cache cold -> bezposrednia modyfikacja messages
- **Autocompact (Level 5)**: child agent z Chain-of-Thought Scratchpad - nowy cache prefix

Zrodla: [Context editing docs](https://platform.claude.com/docs/en/build-with-claude/context-editing), [HarrisonSec compression pipeline](https://harrisonsec.com/blog/claude-code-context-engineering-compression-pipeline/)

---

## S7 - Minimum Token Thresholds

Cache nie zadziala dla blokow ponizej progu (silent failure - request nie bladziwydaje sie OK ale `cache_creation_input_tokens` i `cache_read_input_tokens` = 0):

| Model | Min tokeny dla cache |
|-------|---------------------|
| Claude Opus 4.7, 4.6, 4.5; Haiku 4.5 | **4096 tokenow** |
| Claude Sonnet 4.6; Haiku 3.5 | **2048 tokenow** |
| Claude Sonnet 4.5, 4, 3.7; Opus 4.1, 4 | **1024 tokenow** |
| Claude Haiku 3 | **2048 tokenow** |

**Konsekwencja dla Claude Code**: CLAUDE.md ponizej ~1024-4096 tokenow (zalezne od modelu) nie bedzie cachuowany. Krotki CLAUDE.md (np. 200 tokenow) jest procesowany jako zwykly input przy kazdym requeście.

Zrodla: [Prompt caching docs](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)

---

## S8 - Response Usage: Jak Czytac Metryki Cache

```json
{
  "usage": {
    "cache_read_input_tokens": 187361,
    "cache_creation_input_tokens": 0,
    "input_tokens": 3,
    "output_tokens": 503
  }
}
```

Interpretacja:
- `cache_read_input_tokens > 0`: cache hit, platnosci 0.1x base za te tokeny
- `cache_creation_input_tokens > 0`: nowy wpis cache, platnosci 1.25x lub 2x base
- `input_tokens`: tokeny poza cache (po ostatnim breakpoincie), platnosci 1x base

Formula calkowitego kosztu inputu:
```
total_input = (cache_read * 0.1x) + (cache_write_5m * 1.25x) + (cache_write_1h * 2x) + (input * 1x)
```

Latency benefit: cache hit 3.3x szybszy niz full recompute (empiryk: 1.48s vs 4.89s dla 187k tokenow).

---

## Conflicts i Gaps

### Konflikty miedzy zrodlami

1. **TTL "1h enterprise only" vs GA**: Starsze zrodla twierdza ze 1h cache wymaga enterprise lub beta headera. Oficjalna dokumentacja pricing (kwiecien 2026) NIE wspomina enterprise-only. **Werdykt: 1h TTL jest Generally Available bez beta headera** - stara informacja o enterprise jest bledna.

2. **Cache Cost "1.25x" vs "1.25x or 2x"**: Wiele tutoriali cytuje tylko 1.25x pomijajac 1h TTL (2x). To nie konflikt ale niekompletnosc dokumentacji wskazana w Issue #18915 (closed as not planned).

3. **Bedrock 5m hardcode**: Na Bedrock, Claude Code hardcoduje 5m TTL mimo ze Bedrock obslugiwa 1h. Zmienna `ENABLE_PROMPT_CACHING_1H_BEDROCK` istnieje w bundle ale nie jest udokumentowana. Status: open/duplicate issue.

### Gaps: Czego Nie Udalo Sie Znalezc

1. **Dokladna liczba tokenow w Claude Code system prompt**: zrodla wskazuja "20k+" ale brak precyzyjnego pomiaru w oficjalnej dokumentacji
2. **Context editing + caching dokładne metryki**: dokumentacja mowi o kosztach ale brak konkretnych przykladow numerycznych
3. **Mechanizm "global scope" cachowania**: HarrisonSec opisuje `scope: 'global'` (wspoldzielony cache miedzy uzytkownikami) ale nie ma tego w oficjalnych docs
4. **Subagents i cache isolation**: czy subagenty w Claude Code wspoldziela cache z parentem - niejasne

---

## Citations (14 zrodel)

**Oficjalna dokumentacja (Anthropic):**
1. [Prompt caching - Claude API Docs](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)
2. [Tool use with prompt caching](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-use-with-prompt-caching)
3. [Context editing - Claude API Docs](https://platform.claude.com/docs/en/build-with-claude/context-editing)
4. [Anthropic Pricing Page](https://platform.claude.com/docs/en/about-claude/pricing)
5. [Prompt Caching Cookbook](https://platform.claude.com/cookbook/misc-prompt-caching)

**GitHub Issues (Anthropic):**
6. [Issue #32671: Bedrock 5m TTL hardcoded](https://github.com/anthropics/claude-code/issues/32671)
7. [Issue #18915: 1h cache documentation gaps](https://github.com/anthropics/claude-code/issues/18915)

**Community + empiryk:**
8. [Claude Code Camp: How Prompt Caching Actually Works](https://www.claudecodecamp.com/p/how-prompt-caching-actually-works-in-claude-code)
9. [DEV.to: Mastering Cache Hits in Claude Code](https://dev.to/kitaekatt/mastering-cache-hits-in-claude-code-5648)
10. [LMCache Blog: Context Engineering & Reuse Pattern](https://blog.lmcache.ai/en/2025/12/23/context-engineering-reuse-pattern-under-the-hood-of-claude-code/)
11. [HarrisonSec: 5-Level Compression Pipeline](https://harrisonsec.com/blog/claude-code-context-engineering-compression-pipeline/)
12. [AWS Blog: Claude Code + Bedrock prompt caching](https://aws.amazon.com/blogs/machine-learning/supercharge-your-development-with-claude-code-and-amazon-bedrock-prompt-caching/)
13. [Walturn: How Prompt Caching Elevates Claude Code Agents](https://www.walturn.com/insights/how-prompt-caching-elevates-claude-code-agents)
14. [Spring AI blog: Anthropic Prompt Caching support](https://spring.io/blog/2025/10/27/spring-ai-anthropic-prompt-caching-blog/)

---

## Recommendation

**GO** - Wystarczajacy material na pełny raport dla kampanii Context Engineering.

**Kluczowe finding dla kampanii:** Cache jest **mechanizmem stabilizacji kontekstu** - dzieli prompt na "frozen stable prefix" (system prompt, tools, CLAUDE.md) i "live dynamic suffix" (nowe wiadomosci). Optymalny design = maksymalizacja stabilnego prefixu, minimalizacja tego co sie zmienia. Empiryk Claude Code pokazuje 92% prefix reuse rate dzieki tej architekturze.

**Delta research potrzebna (dla Syntezatora):** Overlap z kampania Prompt Caching - szczegolowa analiza pricing/Batch kombinacji powinna byc w tamtej kampanii, R2 pokrywa kontekstowy aspekt.
