# R1 - Researcher Docs: Claude Code Context Engineering 2026
**Kampania:** Claude Code Context Engineering 2026
**Rola:** Researcher Docs (primary sources)
**Data dostępu:** 2026-04-17
**Źródła:** platform.claude.com/docs, code.claude.com/docs, anthropic.com/engineering

---

## 1. Executive Summary (10 claims)

1. **Context window per model (2026-04-17):** Claude Opus 4.7 = 1M tokens, Claude Sonnet 4.6 = 1M tokens, Claude Haiku 4.5 = 200k tokens. Haiku nie ma 1M - pozostaje na 200k.
2. **1M context jest GA od marca 2026:** Dla Opus 4.6 i Sonnet 4.6 bez beta header od 2026-03-13. Dla Opus 4.7 od 2026-04-16.
3. **Auto-compact trigger (Claude Code CLI):** Domyślnie ~95% pojemności okna. Konfigurowalny przez `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` (1-100). Drugi env var `CLAUDE_CODE_AUTO_COMPACT_WINDOW` pozwala ustawić "wirtualne" okno.
4. **Compaction API (server-side, beta):** Trigger domyślnie na 150k tokenów wejścia (minimum 50k). Beta header: `compact-2026-01-12`. Dostępne dla Opus 4.7, 4.6 i Sonnet 4.6.
5. **Claude Code kompaktuje sekwencyjnie:** Najpierw czyści stare tool outputs, potem summaryzuje konwersację. Requests i key code snippets są zachowane; wczesne instrukcje mogą zginąć.
6. **Context awareness (Sonnet 4.6, Sonnet 4.5, Haiku 4.5):** Model otrzymuje XML budget na starcie (`<budget:token_budget>1000000</budget:token_budget>`) i update po każdym tool call (`<system_warning>Token usage: 35000/1000000; 965000 remaining</system_warning>`).
7. **Thinking blocks automatycznie stripowane:** Extended thinking blocks z poprzednich turnów NIE wchodzą do context window na kolejne turny - API robi to automatycznie.
8. **Haiku 4.5 nie ma kontekstu 1M:** Tylko Opus 4.7, Opus 4.6 i Sonnet 4.6 mają 1M. Haiku 4.5 = 200k, Haiku 4.5 max output = 64k.
9. **Pricing 1M jest standard bez surcharge (Opus 4.7, Opus 4.6, Sonnet 4.6):** 900k-tokenowe zapytanie rozliczane jest po tej samej stawce per-token co 9k-tokenowe. Wcześniej (przed 2026-03-13) był personal beta z surcharge.
10. **Starsze modele tracą 1M od 2026-04-30:** Sonnet 4.5 i Sonnet 4 tracą beta 1M context window (`context-1m-2025-08-07` header przestaje działać). Po tym requesty >200k zwracają błąd.

---

## 2. Sekcje per podtemat z cytatami

### 2.1 Rozmiar context window per model (stan na 2026-04-17)

#### Aktualny model lineup (GA)

**Źródło:** `https://platform.claude.com/docs/en/docs/about-claude/models` (data dostępu 2026-04-17)

| Model | Context Window | Max Output | Cena Input/Output |
|-------|---------------|-----------|-------------------|
| Claude Opus 4.7 | **1M tokens** | 128k tokens | $5/$25 per MTok |
| Claude Sonnet 4.6 | **1M tokens** | 64k tokens | $3/$15 per MTok |
| Claude Haiku 4.5 | **200k tokens** | 64k tokens | $1/$5 per MTok |

**Legacy models (jeszcze dostępne):**

| Model | Context Window | Status |
|-------|---------------|--------|
| Claude Opus 4.6 | 1M tokens | Legacy |
| Claude Sonnet 4.5 | 200k tokens | Legacy |
| Claude Opus 4.5 | 200k tokens | Legacy |
| Claude Opus 4.1 | 200k tokens | Legacy |
| Claude Sonnet 4 | 200k tokens | Deprecated - retire 2026-06-15 |
| Claude Opus 4 | 200k tokens | Deprecated - retire 2026-06-15 |

**Cytaty:**

> "[Claude Mythos Preview](https://anthropic.com/glasswing), Claude Opus 4.7, Claude Opus 4.6, and Claude Sonnet 4.6 have a 1M-token context window. Other Claude models, including Claude Sonnet 4.5 and Sonnet 4 (deprecated), have a 200k-token context window."
> - Źródło: platform.claude.com/docs/en/docs/build-with-claude/context-windows

> "Context window: 1M tokens (~555k words ~2.5M unicode characters (Opus 4.7 uses a new tokenizer))"
> - Źródło: platform.claude.com/docs/en/docs/about-claude/models (dla Opus 4.7)

**Uwaga o tokenizerze Opus 4.7:**

> "Opus 4.7 uses a new tokenizer compared to previous models, contributing to its improved performance on a wide range of tasks. This new tokenizer may use up to 35% more tokens for the same fixed text."
> - Źródło: platform.claude.com/docs/en/about-claude/pricing

**Praktyczne przeliczniki (z docs tooltipów):**
- 1M tokens Sonnet 4.6 = ~750k words = ~3.4M unicode characters
- 200k tokens Haiku 4.5 = ~150k words = ~680k unicode characters

**Obrazy i PDF:**
> "A single request can include up to 600 images or PDF pages (100 for models with a 200k-token context window)."
> - Źródło: platform.claude.com/docs/en/docs/build-with-claude/context-windows

---

### 2.2 Auto-compact trigger conditions (Claude Code CLI)

**Źródło:** `https://code.claude.com/docs/en/env-vars` + `https://code.claude.com/docs/en/how-claude-code-works` (data dostępu 2026-04-17)

#### Domyślny trigger

Z oficjalnej dokumentacji env vars (code.claude.com/docs/en/env-vars):

> "Default behavior: Auto-compaction triggers at approximately 95% capacity"

#### Konfiguracja przez env vars

| Zmienna | Opis | Domyślna | Zakres |
|---------|------|---------|--------|
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | Procent pojemności (1-100) przy którym uruchamia się auto-compact | ~95% | 1-100 |
| `CLAUDE_CODE_AUTO_COMPACT_WINDOW` | "Wirtualne" okno kontekstu w tokenach dla obliczeń auto-compact | Pełne okno modelu (200k lub 1M) | do faktycznego okna modelu |
| `CLAUDE_CODE_MAX_CONTEXT_TOKENS` | Override rozmiaru okna (tylko gdy `DISABLE_COMPACT` jest ustawione) | zależy od modelu | - |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | Max tokeny output; zmniejsza efektywne okno przed compact | zależy od modelu | - |
| `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS` | Override limitu tokenów dla odczytu pliku | domyślne zmienne | - |

**Detale `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`:**
> "Aligns with `context_window.used_percentage` field available in status line"
> "Values above the default threshold (95%) have no effect"
> "Applies to both main conversations and subagents"

**Detale `CLAUDE_CODE_AUTO_COMPACT_WINDOW`:**
> "On a 1M model, set to 500000 to treat the window as 500K for compaction purposes"
> "Setting this variable decouples the compaction threshold from the status line's used_percentage, which always uses the model's full context window"

#### Algorytm compact w Claude Code

**Źródło:** `https://code.claude.com/docs/en/how-claude-code-works` (data dostępu 2026-04-17)

> "Claude Code manages context automatically as you approach the limit. It clears older tool outputs first, then summarizes the conversation if needed. Your requests and key code snippets are preserved; detailed instructions from early in the conversation may be lost."

**Thrashing protection:**
> "If a single file or tool output is so large that context refills immediately after each summary, Claude Code stops auto-compacting after a few attempts and shows an error instead of looping."
> - Odpowiedni error: `"Autocompact is thrashing: the context refilled to the limit..."`

**Recovery po thrashing:**
> "1. Ask Claude to read the oversized file in smaller chunks [...] 2. Run /compact with a focus that drops the large output, for example /compact keep only the plan and the diff 3. Move the large-file work to a subagent [...] 4. Run /clear if the earlier conversation is no longer needed"
> - Źródło: code.claude.com/docs/en/troubleshooting

#### Instrukcje compact w CLAUDE.md

**Źródło:** code.claude.com/docs/en/how-claude-code-works

> "To control what's preserved during compaction, add a 'Compact Instructions' section to CLAUDE.md or run /compact with a focus (like /compact focus on the API changes)."

---

### 2.3 Compaction API (server-side, beta)

**Źródło:** `https://platform.claude.com/docs/en/build-with-claude/compaction` (data dostępu 2026-04-17)

To inny kontekst niż Claude Code CLI - dotyczy bezpośrednio Messages API.

#### Trigger conditions

```python
context_management={
    "edits": [
        {
            "type": "compact_20260112",
            "trigger": {
                "type": "input_tokens",
                "value": 150000  # Default: 150,000 tokens (minimum: 50,000)
            }
        }
    ]
}
```

**Parametry konfiguracyjne:**

| Parametr | Typ | Default | Opis |
|---------|-----|---------|------|
| `type` | string | wymagany | `"compact_20260112"` |
| `trigger.value` | int | 150,000 | Trigger na N tokenów wejścia (min: 50,000) |
| `pause_after_compaction` | boolean | false | Zatrzymaj po summary, zwróć `stop_reason: "compaction"` |
| `instructions` | string | null | Custom prompt do summaryzacji (całkowicie zastępuje domyślny) |

**Beta header wymagany:** `anthropic-beta: compact-2026-01-12`

**Modele obsługujące Compaction API:**
- Claude Mythos Preview
- Claude Opus 4.7
- Claude Opus 4.6
- Claude Sonnet 4.6

**Launch date:** 2026-02-05 (dla Opus 4.6), rozszerzono na Opus 4.7 i Sonnet 4.6 później.

#### Domyślna instrukcja summaryzacji

```
"You have written a partial transcript for the initial task above. 
Please write a summary of the transcript. The purpose of this summary 
is to provide continuity so you can continue to make progress towards 
solving the task in a future context, where the raw history above may 
not be accessible and will be replaced with this summary. Write down 
anything that would be helpful, including the state, next steps, 
learnings etc. You must wrap your summary in a <summary></summary> block."
```

#### Co jest zachowane vs usunięte

**Zachowane:**
- System prompts (szczególnie z `cache_control`)
- Recent messages po compaction blocku
- Compaction blocks z poprzednich iteracji
- Cache control breakpoints na system promptach

**Usunięte/summaryzowane:**
> "All messages before the compaction block are replaced with the summary"

#### Token billing

> "Top-level input_tokens/output_tokens reflect only the final message iteration. The total billed tokens = sum across all iterations entries."

```json
"usage": {
    "input_tokens": 23000,
    "output_tokens": 1000,
    "iterations": [
        {"type": "compaction", "input_tokens": 180000, "output_tokens": 3500},
        {"type": "message", "input_tokens": 23000, "output_tokens": 1000}
    ]
}
```

---

### 2.4 Context Awareness (Claude 4.5+ models)

**Źródło:** `https://platform.claude.com/docs/en/docs/build-with-claude/context-windows` (data dostępu 2026-04-17)

Funkcja dostępna dla: **Claude Sonnet 4.6, Claude Sonnet 4.5, Claude Haiku 4.5**

> "Claude Sonnet 4.6, Claude Sonnet 4.5, and Claude Haiku 4.5 feature context awareness. This capability lets these models track their remaining context window (i.e. 'token budget') throughout a conversation."

**Jak działa - mechanika:**

Na starcie konwersacji model dostaje:
```xml
<budget:token_budget>1000000</budget:token_budget>
```
(200k dla modeli z mniejszym oknem)

Po każdym tool call:
```xml
<system_warning>Token usage: 35000/1000000; 965000 remaining</system_warning>
```

> "This awareness helps Claude determine how much capacity remains for work and enables more effective execution on long-running tasks. Image tokens are included in these budgets."

---

### 2.5 Extended Thinking - Token Accounting

**Źródło:** `https://platform.claude.com/docs/en/docs/build-with-claude/context-windows` (data dostępu 2026-04-17)

**Kluczowe zasady:**
> "The thinking budget tokens are a subset of your max_tokens parameter, are billed as output tokens, and count towards rate limits."

**Automatic stripping - ważne dla context management:**
> "Previous thinking blocks are automatically stripped from the context window calculation by the Claude API and are not part of the conversation history that the model 'sees' for subsequent turns, preserving token capacity for actual conversation content."

**Formuła context window z extended thinking:**
> "The effective context window calculation becomes: context_window = (input_tokens - previous_thinking_tokens) + current_turn_tokens."

**Nie musisz ręcznie stripować:**
> "You do not need to strip the thinking blocks yourself. The Claude API automatically does this for you if you pass them back."

---

### 2.6 Context Editing (Fine-grained strategies)

**Źródło:** `https://platform.claude.com/docs/en/build-with-claude/context-editing` (data dostępu 2026-04-17)

Trzy strategie (używane gdy potrzeba więcej kontroli niż daje Compaction API):

| Strategia | Zastosowanie | Jak działa |
|-----------|-------------|-----------|
| **Tool result clearing** | Agentic workflows z heavy tool use | Czyści stare tool results po przetworzeniu |
| **Thinking block clearing** | Extended thinking | Zarządza thinking blocks, opcja zachowania ostatnich |
| **Client-side SDK compaction** | Alternatywa server-side | SDK-based summarization, mniej rekomendowana |

> "For most use cases, server-side compaction is the primary strategy for managing context in long-running conversations."

**Performance metrics (z announce blog):**
- Context editing alone: **29% improvement** over baseline
- Combined with memory tool: **39% improvement** over baseline
- In 100-turn web search evaluation: context editing reduced token consumption by **84%**

**Launch:** Launched 2025-09-29 w beta, thinking block clearing dodane 2025-10-28.

---

### 2.7 Co ładuje się do context window przy starcie (Claude Code)

**Źródło:** `https://code.claude.com/docs/en/context-window` - interactive simulation (data dostępu 2026-04-17)

Z kodu symulatora (MAX = 200000 jako baza):

| Element | Tokeny (przykład) | Widoczność dla użytkownika |
|---------|------------------|--------------------------|
| System prompt | 4,200 | Niewidoczny |
| Auto memory (MEMORY.md) | 680 | Niewidoczny |
| Environment info | 280 | Niewidoczny |
| MCP tools (deferred - tylko nazwy) | 120 | Niewidoczny |
| Skill descriptions | 450 | Niewidoczny |
| ~/.claude/CLAUDE.md | 320 | Niewidoczny |
| Project CLAUDE.md | 1,800 | Niewidoczny |
| **Razem startup overhead** | **~7,850** | - |

> "MEMORY.md: The first 200 lines or 25KB, whichever comes first, are loaded into the conversation context."

**Typowe koszty podczas sesji:**
- Odczyt pliku 2400 linii: ~2,400 tokenów
- grep wyniki: ~600 tokenów
- Rule (path-scoped): ~380 tokenów
- npm test output: ~1,200 tokenów
- Subagent zwraca tylko summary: ~420 tokenów (vs 6,100 tokenów plików przez niego przeczytanych)

---

### 2.8 Hardcoded vs Configurable

**Hardcoded (nie konfigurowalny):**
- Rozmiar context window per model (200k lub 1M) - determinowany przez model API
- Domyślna instrukcja summaryzacji w Compaction API
- Automatyczne stripping thinking blocks (API-level)
- Context awareness XML injection (wbudowane w modele 4.5+)
- Thrashing detection i zatrzymanie po kilku próbach

**Konfigurowalny przez env vars:**
- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` - próg procentowy (1-100, domyślnie ~95%)
- `CLAUDE_CODE_AUTO_COMPACT_WINDOW` - "wirtualne" okno dla obliczeń
- `CLAUDE_CODE_MAX_CONTEXT_TOKENS` - override rozmiaru okna (tylko z DISABLE_COMPACT)
- `CLAUDE_CODE_MAX_OUTPUT_TOKENS` - max output tokens
- `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS` - limit tokenów dla odczytu pliku

**Konfigurowalny przez settings.json (env block):**
```json
{
  "env": {
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "75",
    "DISABLE_AUTO_COMPACT": "1"
  }
}
```

**Konfigurowalny przez CLAUDE.md:**
- Sekcja "Compact Instructions" - co preservować podczas compact
- Treść auto memory (model pisze do MEMORY.md, 200 linii/25KB limit)

**Konfigurowalny przez Compaction API (server-side):**
- Trigger threshold (50k-1M tokenów)
- Custom instructions do summaryzacji
- `pause_after_compaction` flaga

---

### 2.9 Token Counting API

**Źródło:** platform.claude.com/docs/en/build-with-claude/token-counting (launch 2024-12-17 jako GA)

> "Use the token counting API to estimate token usage before sending messages to Claude. This helps you plan and stay within context window limits."
> - Źródło: platform.claude.com/docs/en/docs/build-with-claude/context-windows

**Nowy stop reason (od 2025-09-29):**
> "We've introduced a new stop reason model_context_window_exceeded that allows you to request the maximum possible tokens without calculating input size."

---

### 2.10 Długi context pricing

**Źródło:** `https://platform.claude.com/docs/en/about-claude/pricing` (data dostępu 2026-04-17)

> "Claude Mythos Preview, Opus 4.7, Opus 4.6, and Sonnet 4.6 include the full 1M token context window at standard pricing. (A 900k-token request is billed at the same per-token rate as a 9k-token request.)"

**Historyczny surcharge (do 2026-02-05):** Dla Opus 4.6 przy requestach >200k tokenów był "Long context pricing" ($10/$37.50 per MTok). Od 2026-03-13 (GA 1M dla Opus 4.6 i Sonnet 4.6) - standard pricing bez surcharge.

---

## 3. Timeline - Co się zmieniło w 2026

| Data | Zmiana |
|------|--------|
| **2026-02-05** | Compaction API beta launch (Opus 4.6). 1M context beta dla Opus 4.6. Long context pricing obowiązuje dla >200k. |
| **2026-02-17** | Sonnet 4.6 launch z 1M context beta i extended thinking. |
| **2026-03-13** | 1M context GA dla Opus 4.6 i Sonnet 4.6 (bez beta header). Standard pricing (bez surcharge). Media limit wzrósł z 100 do 600 images/PDF per request. |
| **2026-03-30** | Ogłoszenie: Sonnet 4.5 i Sonnet 4 tracą 1M beta od 2026-04-30. Requesty >200k zwrócą błąd. |
| **2026-04-16** | Opus 4.7 launch. 1M context z nowym tokenizerem (do 35% więcej tokenów dla tego samego tekstu). |

---

## 4. Conflicts (Sprzeczności między docs)

### Conflict 1: Procent triggera auto-compact w Claude Code

**Oficjalne docs** (code.claude.com/docs/en/env-vars): "Default behavior: Auto-compaction triggers at approximately **95% capacity**"

**Trzeciostronne źródła (niecytowane w tym raporcie, ale obecne w community):** Różne wartości - 83.5%, 77%, etc. Nie ma oficjalnego potwierdzenia tych liczb.

**Verdict:** Oficjalne docs mówią 95%. Wartości niższe (83.5%, 77%) mogą być outdated lub dotyczą starszych wersji. Używamy 95% jako source of truth.

### Conflict 2: `CLAUDE_CODE_MAX_CONTEXT_TOKENS` condition

**Docs env vars:** "Only takes effect when `DISABLE_COMPACT` is also set"

**Nie jest jasne** czy `DISABLE_COMPACT` i `DISABLE_AUTO_COMPACT` to ta sama zmienna. Changelog wspomina `DISABLE_COMPACT`, env vars page mówi o `DISABLE_AUTO_COMPACT`. Możliwe że obie nazwy działają lub jest jedna właściwa.

### Conflict 3: 1M dla Haiku

Haiku 4.5 jest na **200k** - żaden doc nie przyznaje mu 1M. Ale wcześniejszy search snippet mówił "Opus 4.7, 4.6 i Sonnet 4.6 mają 1M, inne modele w tym Sonnet 4.5 mają 200k" - to potwierdza Haiku = 200k.

---

## 5. Gaps (Czego Anthropic nie dokumentuje)

1. **Dokładny algorytm "co preservować":** Docs mówią "requests i key code snippets są zachowane" ale nie dają żadnej specyfikacji algorytmu selekcji. Czarny box.

2. **Ile tokenów rezerwuje system na output buffer:** Docs nie podają ile tokenów jest "zarezerwowane" dla odpowiedzi przed triggerem compact. Third-party sources mówią o buffer 33k-45k tokenów ale brak oficjalnego potwierdzenia.

3. **Dokładny algorytm "ile razy thrashing przed error":** Docs mówią "stops after a few attempts" bez podania liczby.

4. **Czas życia kompaktowanego summary:** Ile razy można go ponownie użyć bez kosztu? Docs mówią "Re-applying a previous compaction block incurs no additional cost" ale bez ograniczeń.

5. **Context window dla Claude Managed Agents:** Pricing page mówi "Context window is managed by the runtime" bez szczegółów technicznych (który model, jaki rozmiar, czy compact jest automatyczny).

6. **Interakcja multi-compact:** Czy compaction bloki z poprzednich rund są summaryzowane ponownie czy pozostają jako-is?

7. **CLAUDE_CODE_AUTO_COMPACT_WINDOW vs status line:** Docs ostrzegają że ustawienie tej zmiennej "decouples the compaction threshold from the status line's used_percentage" ale nie wyjaśniają jak wtedy interpretować status line.

8. **Czy CLAUDE_AUTOCOMPACT_PCT_OVERRIDE działa powyżej 95%:** Docs mówią "Values above the default threshold (95%) have no effect" - więc nie można ustawić trigger na np. 98%. Hardcoded cap.

9. **Haiku 4.5 context awareness vs context window size:** Haiku 4.5 ma context awareness (200k) ale docs pokazują XML jako `<budget:token_budget>1000000</budget:token_budget>` - co się dzieje dla Haiku (200k)? Docs mówią "(200k for models with a smaller context window)" ale konkretny XML nie jest pokazany.

10. **Model używany do summaryzacji w Compaction API:** Docs potwierdzają "Same model used for both conversation and summarization (no cheaper model option for summaries)" - jest to wymienione jako "current limitation".

---

## 6. Citations List

### Primary Sources (Oficjalne Docs)

1. **Context windows** - platform.claude.com/docs/en/docs/build-with-claude/context-windows
   Data dostępu: 2026-04-17

2. **Models overview** - platform.claude.com/docs/en/docs/about-claude/models
   Data dostępu: 2026-04-17

3. **Compaction API** - platform.claude.com/docs/en/build-with-claude/compaction
   Data dostępu: 2026-04-17

4. **Context editing** - platform.claude.com/docs/en/build-with-claude/context-editing
   Data dostępu: 2026-04-17

5. **Release notes (Platform)** - platform.claude.com/docs/en/release-notes/overview
   Data dostępu: 2026-04-17

6. **Pricing** - platform.claude.com/docs/en/about-claude/pricing
   Data dostępu: 2026-04-17

7. **How Claude Code works** - code.claude.com/docs/en/how-claude-code-works
   Data dostępu: 2026-04-17

8. **Environment variables (Claude Code)** - code.claude.com/docs/en/env-vars
   Data dostępu: 2026-04-17

9. **Settings (Claude Code)** - code.claude.com/docs/en/settings
   Data dostępu: 2026-04-17

10. **Troubleshooting (Claude Code)** - code.claude.com/docs/en/troubleshooting
    Data dostępu: 2026-04-17

11. **Best practices (Claude Code)** - code.claude.com/docs/en/best-practices
    Data dostępu: 2026-04-17

12. **Context window explorer (Claude Code)** - code.claude.com/docs/en/context-window
    Data dostępu: 2026-04-17

### Engineering Blog

13. **Effective context engineering for AI agents** - anthropic.com/engineering/effective-context-engineering-for-ai-agents
    Data dostępu: 2026-04-17

14. **Effective harnesses for long-running agents** - anthropic.com/engineering/effective-harnesses-for-long-running-agents
    Data dostępu: 2026-04-17

### News / Announcements

15. **Context management (announcement)** - claude.com/blog/context-management
    Data dostępu: 2026-04-17

16. **Claude Sonnet 4 now supports 1M tokens** - anthropic.com/news/1m-context
    Data dostępu: 2026-04-17

17. **Introducing Claude Opus 4.6** - anthropic.com/news/claude-opus-4-6
    Data dostępu: 2026-04-17

18. **Introducing Claude Opus 4.7** - anthropic.com/news/claude-opus-4-7
    Data dostępu: 2026-04-17

---

## 7. Appendix: Ważne cytaty z engineering blogs

### Engineering blog: Effective Context Engineering

> "Context is treated as a finite resource with diminishing marginal returns. The document emphasizes finding 'the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome.'"

> "Context rot - a phenomenon where 'as the number of tokens in the context window increases, the model's ability to accurately recall information from that context decreases.' This stems from the transformer architecture's n^2 pairwise token relationships, which become strained as sequences grow longer."

> "Claude Code implements a hybrid strategy: CLAUDE.md files load upfront, while tools like glob and grep enable just-in-time file retrieval. After compaction, it continues with 'the five most recently accessed files.'"

**Uwaga:** Engineering blog NIE podaje konkretnych % thresholdów - to czarny box algorytmu.

### Claude Code best practices

> "Most best practices are based on one constraint: Claude's context window fills up fast, and performance degrades as it fills. [...] A single debugging session or codebase exploration might generate and consume tens of thousands of tokens."

> "This matters since LLM performance degrades as context fills. When the context window is getting full, Claude may start 'forgetting' earlier instructions or making more mistakes. The context window is the most important resource to manage."

---

## 8. Summary dla Orchestratora

**Status: PASS - BRAMA 2 SPEŁNIONA**

- Liczba słów: ~3,200+ (przekracza minimum 1,500)
- Liczba URL sources: 18 (przekracza minimum 10-15)
- Pokrycie podtematów: 100%
  - [x] Rozmiar context window per model (2026)
  - [x] Auto-compact trigger conditions (% full, settings)
  - [x] Jak Anthropic dokumentuje context management
  - [x] Hardcoded vs configurable
  - [x] Primary sources: docs.anthropic.com + code.claude.com

**Key findings:**
1. Haiku 4.5 = 200k (TYLKO Opus 4.7, Opus 4.6, Sonnet 4.6 mają 1M)
2. Auto-compact trigger = **~95%** oficjalnie (nie 83% jak community sugeruje)
3. Configurowalny przez `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` (1-100)
4. Compaction API = osobna feature (server-side), trigger domyślnie na 150k tokenów INPUT
5. Context awareness (Sonnet 4.6/4.5, Haiku 4.5) = model dostaje XML z tokenami
6. Thinking blocks automatycznie stripowane przez API (zero manual work)
7. 1M jest GA od 2026-03-13 dla Opus 4.6 i Sonnet 4.6, standard pricing bez surcharge
8. Opus 4.7 nowy tokenizer = do 35% więcej tokenów dla tego samego tekstu
9. Gaps: algorytm "co preservować" jest czarnym boxem, brak dokumentacji output buffer

**Conflicts identified:** 2 (trigger % różni się od community sources; `DISABLE_COMPACT` vs `DISABLE_AUTO_COMPACT` nazwa)
