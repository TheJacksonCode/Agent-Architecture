# 00 - Context Engineering Fundamentals (Claude Code 2026)

**Stan na 2026-04-17. Plik samodzielny - mozna czytac bez pozostalych.**

Ten dokument wprowadza osobe zaczynajaca z context engineering w Claude Code. Zero zalozen o znajomosci architektury; kazde pojecie zdefiniowane przy pierwszym uzyciu. Zrodlo: SYNTHESIS.md (10,168 slow), cytowania w formacie R<N>.C<M>.

---

## 1. Czym jest context engineering

**Context engineering = dyscyplina decydowania co trafia do okna kontekstowego modelu i w jakiej kolejnosci.**

Model Claude przetwarza tekst jako sekwencje tokenow (~4 znaki per token dla alfabetu lacinskiego). Wszystko co agent wie w danej chwili mieci sie w **oknie kontekstowym** - ograniczonym buforze z ktorego model generuje nastepna odpowiedz. Inzynieria kontekstu nie polega na "lepszej kompresji", tylko na **unikaniu anti-patternow ktore potrafia spalic 10-20x tokenow niepotrzebnie** [Executive Summary SYNTHESIS].

Trzy warstwy swiadomosci ktore musi miec power-user:

1. **Ile modelu wchodzi** (window size per-model, baseline startup overhead)
2. **Co sie tam juz znalazlo** (silent accumulators, cache state)
3. **Kiedy trzeba zresetowac** (compact, clear, handover)

---

## 2. Context window per-model (2026-04-17)

Rozmiar architektoniczny okna kontekstowego **nie rowna sie** praktycznemu oknu jakosci. To najczestszy blad poczatkujacych.

| Model | Architectural | Effective quality window | Uwaga |
|-------|--------------|-------------------------|-------|
| Claude Opus 4.7 | 1M tokens GA | ~300-400K [R7.C12] | Nowy tokenizer: +35% tokenow vs poprzednie modele [R1.C11] |
| Claude Opus 4.6 | 1M tokens GA | ~300-400K | GA od 2026-03-13 bez surcharge [R1.C2] |
| Claude Sonnet 4.6 | 1M tokens GA | ~300-400K | Dostaje context awareness XML [R1.C13] |
| Claude Sonnet 4.5 | 1M **beta only** | n/a | Beta header `context-1m-2025-08-07` **traci wsparcie 2026-04-30** [R1.C12] |
| Claude Sonnet 4 | 1M beta | n/a | Ten sam sunset 2026-04-30 [R1.C12] |
| Claude Haiku 4.5 | **200K tylko** | ~160K praktyczne | **Nigdy nie mial 1M** [R1.C3] |

**Krytyczne dla pipeline design:** jezeli Haiku 4.5 jest workerem ktoremu oddajesz przepakowany kontekst z Opus, przekroczenie 200K = hard error, **nie automatyczna kompakcja** [Part 1].

**Tokenizer Opus 4.7 +35%:** Opus 4.7 uzywa nowego tokenizera ktory "may use up to 35% more tokens for the same fixed text" [R1.C11]. Historyczne pomiary tokenow (np. "System prompt 14,328 tokens") byly snimane na starym tokenizerze i beda **od 1% do 35% wyzsze** na 4.7.

**Context awareness (XML injection):** Sonnet 4.6/4.5 i Haiku 4.5 dostaja aktywny feedback o budzecie: `<budget:token_budget>1000000</budget:token_budget>` + `<system_warning>Token usage: 35000/1000000</system_warning>` po kazdym tool call [R1.C13, R1.C14]. **Opus 4.7 tej sygnalizacji nie dostaje** - dlatego latwiej wpada w auto-compact thrashing na duzych zadaniach.

---

## 3. Token taksonomia - z czego skladaja sie tokeny w oknie

Zrozumienie skladnikow jest warunkiem koniecznym zanim zaczniesz optymalizowac. R1 docs-reported overhead:

| Komponent | Tokens | Zrodlo |
|-----------|--------|--------|
| System prompt (core) | 4,200 | [R1.C16] |
| Auto memory (~/.claude/) | 680 | [R1.C16] |
| Environment info | 280 | [R1.C16] |
| MCP tools (baseline) | 120 | [R1.C16] |
| Skill descriptions (frontmatter only) | 450 | [R1.C16] |
| CLAUDE.md (global) | 320 | [R1.C16] |
| Project CLAUDE.md | 1,800 | [R1.C16] |
| **Razem startup (docs)** | **~7,850** | |

**Ale** empiryczne pomiary via `/context` pokazuja inny obraz bo mierza inna warstwe [R5.C1]:

- `/context` "System prompt" = core instructions only = **2,600-2,700 tokens** (user-observable)
- API cache_read block = core + all tool descriptions cached = **14,328 tokens** (warstwa API)
- Claude.ai webapp system prompt = **~24,000** (rozny produkt, nie Claude Code)

**SYNTHESIS canonical wybor:** uzywaj `/context` output jako user-facing metric. **Nie porownuj** cyfr z tabeli R1 z `/context` output - inna warstwa pomiaru.

### System tools (24 builtin, mandatory)

**Koszt: 16,800-17,600 tokens per session** [R5.C4]. **Nie mozna ich wylaczyc** - to "cost of entry" niezaleznie od tego co robisz [R5.C5]. Breakdown:

- Bash: 1,611 tokens [R5.C6]
- TodoWrite: 2,037 tokens [R5.C7]
- WebFetch: 297 tokens [R5.C8]
- Read, Edit, Write, Grep, Glob...: ~13K balance split

### Baseline total per config tier [R5.C27-C29]

| Config | Baseline |
|--------|----------|
| Lean (no MCP) | 20-25K tokens |
| Medium MCP (4 servers) | 40-60K tokens |
| Heavy MCP (5+ servers) | 66-86K+ tokens |
| 167-tool setup extreme | **191,300 tokens** PRZED pierwszym promptem [R6.C7] |

GitHub #11364: realny user trafil 86K baseline = **8.6% z 1M okna zanim pierwszy prompt**.

### MCP schema: ekstremalnie zmienny

| MCP Server | Tools | Tokens |
|-----------|-------|--------|
| SQLite | minimal | 385 |
| Gmail | 7 | ~2,640 |
| GitHub | 91 | ~46,000 |
| Docker | 135 | **125,964** [R5.C11] |

**Tool Search (deferred loading)** - feature dostepny gdy MCP tools > 10K: redukuje 77K -> 8.7K (**85% redukcja** [R5.C12]).

---

## 4. Skill vs Command - fundamentalna roznica kosztu

**K1 canonical rozstrzygniecie:** liczba tokenow na "skill" rozni sie **800x** w zaleznosci od konfiguracji.

- **Skill standalone (`~/.claude/skills/*.md`):** progressive disclosure dziala. Frontmatter only = **61-100 tokens per skill** dopoki nie invoked. Body laduje sie na invoke: 1,500-5,000 tokens [R5.C17, R5.C18].
- **Skill w pluginie (claude-plugin package):** plugin loader **laduje pelne body na starcie** = 3,900-5,500 tokens per skill od pierwszego message. Przy wielu pluginach: **50K+ tokens** [R5.C19, GitHub #14882].

**Command files (.claude/commands/*.md):** **zero kosztu baseline** [R5.C20]. Loading semantics:
- Pierwsze wywolanie: 500-1,500 tokens [R5.C21]
- Kolejne w sesji: **2-3 tokens (cached)** [R5.C22]

**Praktyczna implikacja:** jezeli masz 42 presetow (Agent_Architecture v32.16), baseline = **0 tokens**. Placisz za to co uzyjesz. To jest fundament "efficient preset system".

---

## 5. Lifecycle sesji - od start do resume

Sesja Claude Code przechodzi przez fazy ktore roznia sie kosztem i ryzykiem:

### Faza 1: Session start (0-5% fill)

- Loader czyta `~/.claude/CLAUDE.md` (global) + `./CLAUDE.md` (project)
- System prompt + 24 builtin tools juz zajmuja 20-25K (lean) do 86K (heavy MCP)
- Cache jest pusty - pierwsza wiadomosc to write 1.25x-2x base price

### Faza 2: Praca (20-60% fill)

- **Peak performance 0-20% fill, quality begins slipping 20-40% fill** [R6.C5]
- Tool results akumuluja sie: Read 100 lines = ~400-600 tokens [R5.C24], git log 200 commits = 10-50K [R5.C25]
- Cache hits redukuja koszt input o 90% gdy prefix reuse dziala

### Faza 3: Zbliza sie limit (60-85% fill)

- **60-70% = proactive `/compact` z hint** [R7.C8]
- **83.5% = effective auto-compact trigger** [R3.C2] (95% * (200K - 33K) / 200K)
- 33K zarezerwowane dla "compaction working space" - nie do uzycia [R5.C30, R7.C10]

### Faza 4: `/compact` lub `/clear`

- `/compact` wywoluje osobny billable API call (summary generation ~$0.54 dla 180K Sonnet 4) [R3.C29]
- Preserved: summary, system prompt, CLAUDE.md, MEMORY.md first 200 lines [R3.C7]
- **Lost: error messages, stack traces, file paths, line numbers, debugging sequences, architectural rationale, tool outputs, code snippets** [R3.C8]

**Empiric after-compact:** 142-agent framework testing - **agent identification accuracy spada do 83%, fidelity score 3/5** [R3.C9]. Compaction **preserves what but loses who and why**.

### Faza 5: Resume (lub NIE resume)

**LIVE THREAT 2026-04-17:** `--resume`/`--continue` drenowa **652,069 phantom output tokens** bez user prompts [R6.C11, Issue #41930, >300 komentarzy March 2026]. Pojedynczy "morning" = 15% Max 5x limit.

**Workaround:** unikaj `--resume`, uzywaj fresh session + `HANDOVER.md` paste [R6.C26].

---

## 6. Cache layers - hierarchia i koszty

Prompt caching to **najbardziej niedocenione narzedzie context engineering** - **81% redukcji kosztu** w realnym Claude Code workflow [R2.C23].

### Mechanika: `cache_control: {type: "ephemeral"}`

- Maksymalnie **4 breakpointy per request** [R2.C2]
- Typ: tylko `ephemeral` [R2.C1]
- Hierarchia od stabilnego do volatile: **tools -> system -> messages** [R2.C7]

### TTL: 5m vs 1h

| TTL | Write cost | Read cost | Break-even |
|-----|-----------|-----------|------------|
| 5 min | 1.25x base | 0.1x base | **2 hits** [R2.C4] |
| 1 hour | 2x base | 0.1x base | **3 hits** [R2.C4] |

**1h TTL jest GA od 2025** - nie wymaga beta headera ani enterprise planu [R2.C9]. Ale: **na AWS Bedrock hardcoded 5m** (Issue #32671 open) [R2.C12].

### Claude Code auto-layered cache (3 warstwy)

Claude Code **automatycznie** strukturyzuje cache [R2.C21]:

- **Layer 1 Global stable (~20K+ tokens):** system prompt core + 18 builtin tools, identyczne globally [R2.C22]
- **Layer 2 Per-project:** CLAUDE.md project content
- **Layer 3 Per-session:** conversation history, user messages, tool results

### Co invaliduje cache (kaskada)

Modyfikacja wyzszej warstwy invaliduje wszystko ponizej [R2.C7]:

- **Przelaczenie modelu (`/model`):** caly cache, kazdy model ma izolowany cache [R2.C13]
- **Edycja CLAUDE.md:** wymaga restartu sesji, **caly cache rebuild** [R2.C14]
- **Nowy MCP server:** caly cache lost przy nastepnym starcie [R2.C15]
- **Workspace boundary:** od 2026-02-05 cache izolowany per workspace [R2.C16]
- **Dynamic content w cachowanym bloku:** timestamps, random IDs = invalidation kazdy request [R2.C6]

**Kluczowa lekcja:** kazda edit CLAUDE.md miedzy sesjami = 10x-20x cost spike na nastepnej sesji dopoki cache sie nie odbuduje.

### Scenariusz 100-turn coding session, 60K prefix [R2.C19]

- **Bez cache:** $18.00
- **5m cache:** ~$8.94 (-50%)
- **1h cache:** ~$2.38 (-86%)

1h ma sens kiedykolwiek sesja zajmie >20 minut.

### Minimum token thresholds (model-zalezne) [R2.C25]

| Model | Min tokens dla cache |
|-------|---------------------|
| Opus 4.7, 4.6, 4.5, Haiku 4.5 | 4096 |
| Sonnet 4.6, Haiku 3.5 | 2048 |

Ponizej progu `cache_control` jest silently ignored.

---

## 7. Environment variables - kluczowe

### Context sizing i compact

- **`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=NN`** (1-100): obniza threshold (tylko). Math.min clamp - wartosci powyzej domyslnego ~95% nie dzialaja [R1.C5, R3.C4]. Przyklad: `=65` dla compact at 65%. **Bug #18843, #36381:** czasem silently ignored [R3.C26].
- **`CLAUDE_CODE_AUTO_COMPACT_WINDOW=NNNNNN`**: ustawia virtual context window dla celow kompakcji [R1.C17]. Na 1M modelu `=500000` zeby traktowac okno jako 500K. **Jedyny deterministyczny sposob na kontrole compact behavior na 1M.**
- **`DISABLE_COMPACT` vs `DISABLE_AUTO_COMPACT`:** docs niekonsystencyjne - uzywaj obu synonimicznie, sprawdzaj efekt.

### Cache

- **`ENABLE_PROMPT_CACHING_1H_BEDROCK`** (undocumented): probuje wlaczyc 1h cache na Bedrock, **ale CLI hardcoduje 5m** [R2.C12, Issue #32671]. Nie jest reliable.

### Reasoning

- **`CLAUDE_CODE_EFFORT_LEVEL=max`** [R7.C27]: dla complex reasoning. Mar 2026 default HIGH->MEDIUM bylo **undocumented regression** - 73% reasoning depth decline (2200 -> 600 chars).
- **`CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1`** [R7.C28]: workaround dla zero-reasoning bug.

### Telemetry

- **`CLAUDE_CODE_ENABLE_AWAY_SUMMARY=0`**: opt out z `/recap` (v2.1.108) [R3.C25].

---

## 8. Silent accumulators - miejsca gdzie tokeny znikaja

**Najbardziej niedocenione zrodlo kosztow.** Wyniki tool calls **permanentnie zostaja w kontekscie** do konca sesji [R6.C9].

### Rule of thumb: 1 token ~= 4 znaki [R5.C23]

- Read 100 lines = **400-600 tokens** [R5.C24]
- Linia kodu ~80 znakow = **20 tokens**
- Bash verbose output (git log 200 commits) = **10-50K tokens** [R5.C25]
- Godzina aktywnego dev (Read/Grep/Bash) = **50-100K tokenow z samych tool results** [R5.C26]

### Worst case dokumentowane

- **Read bez offset/limit na 10,000-line log:** stays in context for every subsequent message. Worst case 33 wczytania = **561K tokens zmarnowanych** [R6.C9]
- **Read 8.5MB image file (Issue #6780):** sesja **zatruta i uploadowana do chmury Anthropic**, WSZYSTKIE nowe sesje w projekcie dziedziczyly zatrute dane [R6.C10]
- **Uncontrolled bash:** `rg pattern .` bez `--max-count`, `find /` bez `-maxdepth`, `npm install` verbose = 30,000+ znakow = **7,500+ tokens w jednym call** [R6.C14]

### Bloated CLAUDE.md

**Tylko 7.4% CLAUDE.md content jest relewantny per sesja** [R6.C2]. 10K token CLAUDE.md = **5K zmarnowanych per turn** [R6.C3]. Community target: **<500 tokens global**, **<200 linii project** [R5.C16, R7.C21].

### 33K hardcoded reservation

**33,000 tokens permanentnie zarezerwowane** dla compaction working space [R5.C30, R7.C10]. Nie do uzycia, jedyny workaround to `CLAUDE_CODE_AUTO_COMPACT_WINDOW`.

---

## 9. `.claudeignore` - NIE jest security boundary

**Anthropic nie dokumentuje `.claudeignore` natywnie** [R4.C2, K4]. Oficjalna dokumentacja code.claude.com/docs **NIE MA dedykowanej strony**.

**Dwa fundamentalnie rozne mechanizmy:**

| Cel | Narzedzie |
|-----|-----------|
| Token optimization (context bloat) | `.claudeignore` + community converter (pg-creative) |
| Security (nie czytaj .env, secrets) | `permissions.deny` + sandboxing |
| Ultimate enforcement (blokuje Bash tez) | OS-level sandbox |

- **`.claudeignore` = community convention + model instruction.** Soft-ignore. NIE hard file access control [R4.C1, R4.C18]
- **`permissions.deny` = native hard-block**, best-effort dla Read/Grep/Glob, **NIE obejmuje Bash** [R4.C9, R4.C10]. `cat .env` przez Bash = nie blokowane bez osobnej reguly.

**The Register (2026-01-28):** test pokazal ze `.claudeignore` **nie blokuje twardo** - Claude Code czyta .env files mimo reguly [R4.C17]. Root cause: "Claude Code's permission system applies to tool calls from the model, but the model can be prompted to override its own context instructions" [R4.C18].

---

## 10. Gdzie tokeny realnie znikaja - summary tabela

Realistyczny total token footprint [Part 4 SYNTHESIS]:

| Config | Baseline | + 1h work tool results | Total usage |
|--------|---------|----------------------|-------------|
| Lean no MCP | 22,500 | +60K | ~82K (41% z 200K) |
| Medium MCP | 50,000 | +60K | ~110K (55%) |
| Heavy MCP | 76,000 | +60K | ~136K (68%) |
| Heavy MCP + bloated CLAUDE | 86,000 | +60K | ~146K (73%) |

**Wniosek:** heavy setup 1h po starcie **juz dotyka quality degradation zone 40-60%** [R6.C5]. Lean setup ma realistyczny **2-3h sesje** przed walka z kompakcja.

---

## 11. Pojecia do zapamietania

- **Token:** jednostka ~4 znaki dla alfabetu lacinskiego
- **Context window:** buffer z ktorego model generuje odpowiedz (architectural size)
- **Effective quality window:** ile tokenow model utrzymuje w attention skutecznie (~300-400K dla 1M modeli)
- **Context rot:** degradacja jakosci przy 20-40% fill, nie 80% (najczestszy blad) [R6.C4]
- **Auto-compact threshold:** 4 rozne pojecia:
  - Nominal 95% (docs)
  - Effective 83.5% (user-observable)
  - Quality degradation 20-40% (attention diffusion)
  - Proactive 60-80% (community recommendation)
- **Silent accumulator:** tool results permanentnie w kontekscie do konca sesji
- **Cache breakpoint:** miejsce w requescie gdzie cache_control jest ustawiony, max 4 per request
- **TTL:** time-to-live cache - 5m lub 1h
- **Compaction:** osobny billable API call ktory generuje summary i zastepuje historie

---

## 12. Minimum do dzialania (checklist poczatkujacego)

1. Uruchom `/context` w fresh session - zapisz swoj baseline
2. Zmierz CLAUDE.md wielkosc - cel: <500 tokens global, <200 linii project
3. Ustaw `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=65` + `CLAUDE_CODE_AUTO_COMPACT_WINDOW`
4. **Unikaj `--resume`/`--continue`** do czasu fix Issue #41930
5. **Session per task doctrine** - new topic = new chat [R7.C11] ($2.87 -> $0.94 empiric)
6. Zawsze `/compact` z hint - "focus on X, drop Y" [R7.C4]
7. Read zawsze z offset/limit
8. Monitor `usage.cache_read_input_tokens` w API response - drop do 0 = cache broken

---

## Sources (SYNTHESIS reference)

- R1/E1 - docs_primary (Anthropic official docs)
- R2/E2 - caching_deep
- R3/E3 - compact_mechanics
- R4/E4 - claudeignore
- R5/E5 - token_accounting
- R6/E6 - antipatterns
- R7/E7 - community_patterns
- K1-K6 - CRITIC resolved conflicts

Pelen corpus: `plans/SYNTHESIS.md` (10,168 slow, 7 Parts + 3 Appendixy).

---

**Nastepny krok:** przeczytaj `01_PATTERNS.md` dla top patternow + antipatternow, albo `02_DECISION_GUIDE.md` dla decision trees per scenariusz.
