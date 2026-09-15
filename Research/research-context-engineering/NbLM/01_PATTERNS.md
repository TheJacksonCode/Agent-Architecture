# 01 - Patterns + Antipatterns (Claude Code Context Engineering 2026)

**Stan na 2026-04-17. Plik samodzielny - mozna czytac bez pozostalych.**

Ten dokument kataloguje trzy kategorie:

1. **10 cache-first design patterns** (oszczednosc przez poprawne cache usage)
2. **10 anti-patterns** (co spala 10-20x tokenow niepotrzebnie)
3. **10 power-user patterns** (community-adopted Q1 2026)

Zrodlo: SYNTHESIS.md, cytowania w formacie R<N>.C<M>.

---

## Tabela top-level (quick reference)

### Cache-first patterns

| # | Pattern | Co rozwiazuje | Efekt |
|---|---------|---------------|-------|
| CP-1 | Stable prefix caching | Reprocessing tego samego systemu | 81% cost reduction [R2.C23] |
| CP-2 | 1h TTL dla >20min sesji | Rebuild po 5m idle | -86% vs no cache [R2.C19] |
| CP-3 | Unikanie model switching | Full cache invalidation | Zachowuje -90% reads |
| CP-4 | Atomic CLAUDE.md edits | Cache rebuild miedzy sesjami | Uniknij 10-20x spike |
| CP-5 | Breakpoint tylko na stable content | Timestamp/random = ciagla invalidation | Cache lookup hits |
| CP-6 | tools > system > messages order | 1h bloki musza byc przed 5m | Uniknij API error |
| CP-7 | Keep active session warm | Kazdy hit resetuje timer | Cache warm indefinitely |
| CP-8 | Batch API + cache stack | 0.5 * 0.1 = 0.05 cost | 95% savings [R2.C20] |
| CP-9 | Minimum token threshold check | Cache silently ignored <2-4K | Dont rely on sub-threshold |
| CP-10 | Monitor cache_read_input_tokens | Detect sentinel string bug | Early warning system |

### Anti-patterns

| # | Antipattern | Severity | Zrodlo |
|---|-------------|----------|--------|
| AP-01 | Bloated CLAUDE.md | HIGH | [R6.C1-C3] |
| AP-02 | Recursive/circular @imports | MEDIUM | [R6.C6, R6.C22] |
| AP-03 | MCP Response Size Bomb | HIGH | [R6.C7, R6.C12] |
| AP-04 | Read bez offset/limit | HIGH | [R6.C9] |
| AP-05 | Niekontrolowany Bash output | HIGH | [R6.C14, R6.C28] |
| AP-06 | Context Rot (20-40% fill) | CRITICAL | [R6.C4, R6.C5] |
| AP-07 | Autocompact Thrashing | MEDIUM | [R6.C16, R6.C25] |
| AP-08 | Invisible Token Inflation (v2.1.100 + Issue #41930) | CRITICAL LIVE | [R6.C11, R6.C17] |
| AP-09 | Kitchen Sink Session | HIGH | [R6.C18, R6.C30] |
| AP-10 | Cache Expiry z Idle Gap | MEDIUM | [R6.C19, R6.C20] |

### Power-user patterns

| # | Pattern | Zrodlo | Tier |
|---|---------|--------|------|
| PU-1 | PROGRESS.md pre-clear checkpoint | [R7.C1] | Tier 1 (reliable) |
| PU-2 | /handover + HANDOVER.md | [R7.C2, R7.C23] | Tier 1 |
| PU-3 | /compact z targeted hint | [R7.C4] | Tier 1 |
| PU-4 | Session fast rules decision tree | [R7.C5] | Tier 1 |
| PU-5 | PreCompact hook transcript archive | [R7.C6, R3.C21] | Tier 2 |
| PU-6 | Proactive /compact 60-70% | [R7.C8, R3.C18] | Tier 2 |
| PU-7 | Session per task doctrine | [R7.C11] | Tier 1 |
| PU-8 | Plan acceptance auto-clear | [R7.C13] | Native |
| PU-9 | Subagent isolation (context firewall) | [R7.C17, R7.C18] | Tier 2 |
| PU-10 | Hybrid manual context (split CLAUDE.md) | [R7.C19, R7.C21] | Tier 1 |

---

## DEEP DIVE: Top 5 Cache-first patterns

### CP-1: Stable prefix caching (fundamental)

**Problem:** Bez cache kazdy turn reprocesses caly system prompt + tools + CLAUDE.md + historie. Przy 60K prefix i 100-turn sesji = $18 vs $2.38 z 1h cache (86% savings) [R2.C19].

**Implementacja:**
- `cache_control: {type: "ephemeral"}` na ostatnim tool w `tools[]` - cachuje caly prefix tools [R2.C5]
- Hierarchia: **tools -> system -> messages** [R2.C7]
- Maks 4 breakpointy per request [R2.C2]

**Empiric (LMCache 92 LLM calls, ~2M tokens):**
- Explore subagents: 92.06% prefix reuse
- Plan phase: 93.23%
- Execution: 97.83%
- **81% cost reduction overall** [R2.C23]

**Latency bonus:** cache hit jest **3.3x szybszy** - 1.48s vs 4.89s dla 187K tokenow [R2.C24].

### CP-2: 1h TTL dla sesji >20 min

**Problem:** 5m TTL dziala dla sesji ciaglych, ale **cache expires po 5 min idle** = 10x rebuild cost [R6.C19]. 858-session study: **54% kolejek po idle gap >5 min, ~12.3M tokens zmarnowanych total** [R6.C20].

**Implementacja:**
- `cache_control: {type: "ephemeral", ttl: "1h"}` [R2.C9]
- **Bloki 1h MUSZA pojawic sie PRZED blokami 5m** w requescie [R2.C10] - naruszenie = API error
- **NA BEDROCK:** hardcoded 5m mimo `ENABLE_PROMPT_CACHING_1H_BEDROCK` - Issue #32671 [R2.C12]

**Ekonomia 100-turn 60K prefix** [R2.C19]:
| TTL | Koszt | Oszczednosc |
|-----|-------|-------------|
| No cache | $18.00 | 0% |
| 5m | $8.94 | -50% |
| 1h | $2.38 | **-86%** |

**Kiedy 1h nie ma sensu:** sesje <5 min (2 hity break-even dla 5m, 3 hity dla 1h [R2.C4]).

### CP-3: Unikanie model switching mid-session

**Problem:** `/model` command **invaliduje caly cache** - kazdy model ma izolowany cache [R2.C13]. Switch Opus -> Sonnet w trakcie = rebuild 22-86K tokenow od zera.

**Implementacja:**
- Planuj model na START sesji (patrz 02_DECISION_GUIDE.md)
- Opus dla complex reasoning, Sonnet dla kodowania, Haiku dla prostych tasks
- Jezeli musisz switch - zrob to przed zaladowaniem duzego kontekstu (np. na poczatku)

**Dlaczego to kosztuje:** przy 50K baseline Medium MCP + model switch = 50K * ($10/M - $3/M) = efektywnie $0.35 zmarnowane w jednym wcisnieciu.

### CP-4: Atomic CLAUDE.md edits (nie in-session)

**Problem:** Edycja CLAUDE.md **wymaga restartu sesji** - powoduje **caly cache rebuild** przy nastepnym starcie [R2.C14]. Czesta iteracja CLAUDE.md miedzy sesjami = 10x-20x cost spike.

**Implementacja:**
- Edytuj CLAUDE.md **raz per multi-sesja sprint**, nie co sesja
- Jezeli test - test w osobnej sesji, produkcja zostaje stabilna
- Content <500 linii, <500 tokens dla global [R5.C16, R7.C21]
- Split na `policies.md`, `wot.md`, `queries.md` ladowane on-demand [R7.C19]

### CP-5: Breakpoint tylko na stable content

**Problem:** Anti-pattern "Lookback Window" - breakpoint na zmiennej tresci (timestamp, `datetime.now()`, random ID) = **invalidation przy kazdym requescie** [R2.C6]. Cache nigdy nie dziala.

**Implementacja:**
- Przed breakpoint: tylko static content (tools definitions, system prompt core, immutable instructions)
- Po breakpoint: dynamic content (messages, timestamps)
- **Cache lookup:** system searches back 20 blokow od breakpointu szukajac matching prefix [R2.C8] - jesli prefix sie zmienil, cache miss.

---

## DEEP DIVE: Top 5 Anti-patterns

### AP-06: Context Rot (CRITICAL - najczestszy blad)

**KRYTYCZNE FINDING:** Claude's quality starts slipping at **20-40% of context capacity. NOT at 100%. NOT at 80%** [R6.C4, R6.C5].

**Real-world benchmark:**
- Task ktory zajmuje 4.5 minuty przez manual Claude Chat
- **18 minut w zdegradowanej dlugiej sesji Claude Code**
- Sesja turn 50: 134,800 tokenow, **tylko 25,000 relewantnych (18.5%) - 81.5% to dead weight**

**Zones quality:**
- 0-20% fill: peak performance
- 20-40% fill: quality begins slipping
- 40%+ fill: significant degradation
- 40-83.5%: **43-punktowe okno gdzie model dziala w degradacji bez kompaktowania**

**Remedium:**
- `/clear` proactively przy <40% fill dla complex multi-file work
- Session per task doctrine
- Nie wierz "to jeszcze nie full" - kompakcja nie jest quality saver, jest last-resort anti-crash

**K3 resolution:** to NIE sprzeczne z 1M context window - architectural (1M) vs practical quality (300-400K).

### AP-08: Invisible Token Inflation (LIVE THREATS 2026-04-17)

**KRYTYCZNE: trzy bugi live active, wszystkie unfixed.**

**Threat 1: v2.1.100 (+20K per request, ~40% faster consumption)** [R6.C17]
- HTTP proxy analysis: v2.1.98 = 49,726 tokenow, v2.1.100 = 69,922 tokenow
- Status: confirmed przez multi-source (efficienist + GitHub + buildtolaunch)
- **Not yet confirmed fixed w pozniejszych wersjach**

**Threat 2: GitHub Issue #41930 - `--resume`/`--continue` drain** [R6.C11, R6.C26]
- **652,069 phantom output tokenow** bez user prompts podczas session resume
- Pojedynczy "morning" = 15% Max 5x limit
- >300 komentarzy March 2026
- **Unsafe as of April 2026**

**Threat 3: Billing sentinel string bug** [R6.C21, R6.C23, K6]
- Anthropic custom Bun fork robi string replacement na wszystkich requestach API
- Billing-related slowa w historii = replacement trafia w zle miejsce = cache prefix broken = **pelny rebuild = 10-20x inflacja kosztow**
- $1,600 incident dokumentowany
- Confidence low (disputed) ale symptomy real

**Remedium:**
- **Unikaj `--resume`/`--continue`** dla prac krytycznych kosztowo
- Downgrade do v2.1.99 lub starszej jezeli podejrzany cost spike
- Fresh session przy cost spike zamiast kontynuowac
- Monitor `usage.cache_read_input_tokens` w API response - spadek do 0 = cache broken
- Nie dyskutuj billing/pricing mid-session

### AP-01: Bloated CLAUDE.md

**Problem:**
- Official limit: 40 KB / ~40,000 znakow [R6.C1]
- Typowy przegladany plik: 4,847+ linii, 10,847 tokens - **tylko 7.4% relewantne per sesja** [R6.C2]
- 10,000-token CLAUDE.md = **5,000 tokens zmarnowanych per turn** (duplicaty, stare zasady) [R6.C3]
- 5K token CLAUDE.md = **5K tokens every single turn** [R7.C21]

**Remedium (hybrid manual approach [R7.C19]):**

```
~/.claude/CLAUDE.md           # <500 tokens: user-wide
./CLAUDE.md                   # <200 linii: project core
./docs/policies.md            # load on-demand: style, conventions
./docs/wot.md                 # load on-demand: ways of working
./docs/queries.md             # load on-demand: frequent questions
./docs/architecture.md        # load on-demand: deep arch
```

Session starts z `./CLAUDE.md` only. User lub agent explicitly ciagnie `docs/policies.md` gdy potrzebny. Reszta = lazy.

### AP-04: Read bez offset/limit

**Problem:**
- 10,000-line log file stays in context **for every subsequent message** [R6.C9]
- Redundantne wczytanie: worst case 33 wczytania = **561K tokenow zmarnowanych**
- Read 8.5MB image file (Issue #6780) = **session zatruta i uploadowana do chmury Anthropic, WSZYSTKIE nowe sesje w projekcie dziedziczyly zatrute dane** [R6.C10]

**Remedium:**
- **Zawsze** `head_limit` na Grep, `offset`/`limit` na Read
- Target-fragment reading zamiast whole file
- Nie czytaj binariow przez Read - ryzyko permanent session corruption
- `Read(..., limit=100, offset=5000)` dla targeted fragment

### AP-03: MCP Response Size Bomb / Tool Schema Bomb

**Problem:**
- 167 narzedzi MCP = **191,300 tokenow overheadu przed pierwszym promptem** [R6.C7]
- MCP_DOCKER (135) + chrome-devtools (26) = **144,802 tokens tool definitions alone** (GitHub #12241) [R6.C8]
- 50-tool setup = 72,000 tokens schema overhead na starcie
- "Most agent token waste comes from uncontrolled discovery. Claude lists directories, opens files speculatively, greps vaguely, then repeats." [R6.C14]

**Remedium:**
- **Tool Search** (deferred loading, dostepny gdy MCP tools > 10K): 85% redukcja [R5.C12] / 46.9% [R6.C13]
- Disable unused MCP servers
- Wybieraj minimal MCP setup
- Przed dodaniem nowego MCP sprawdz jego token cost (SQLite 385 vs Docker 125,964)

---

## DEEP DIVE: Top 5 Power-user patterns

### PU-1: PROGRESS.md pre-clear checkpoint (Tier 1 - najbardziej niezawodny)

**Najbardziej niezawodny workflow** [R7.C1]: przed osiagnieciem context limit, instruuj Claude zeby zpisal do `PROGRESS.md`:

- Accomplishments
- Files modified with rationale
- Next 3 steps
- Decisions/constraints

Potem `/clear`, paste summary back do fresh session.

**Dlaczego dziala:**
- Omija kompaktowanie (ktore gubi who/why [R3.C9])
- Zachowuje pelna strukture state
- Plik przezywa bo jest na dysku, nie w context
- Fresh session ma **peak 0-20% fill performance** [R6.C5]
- Prefix caching zaczyna budowac od nowa bez degraded attention

### PU-2: /handover + HANDOVER.md

**Custom slash command /handover** [R7.C2, R7.C23] generuje HANDOVER.md na koncu sesji capturing:

- Decisions
- Pitfalls
- Lessons
- Failed approaches (do not repeat)
- Key decisions with rationale
- Current state (working vs broken)
- Resume instructions with numbered steps

**Ekosystem validation** [R7.C3]: plugin repos na github.com/willseltzer/claude-handoff i mcpmarket.com/tools/skills/session-handover - widely copied pattern.

**Naming fragmentation warning** [R7.C24]: trzy konkurencyjne konwencje - HANDOVER.md, SESSION-NOTES.md, PROGRESS.md. **SYNTHESIS canonical:** `PROGRESS.md` dla in-session checkpoints, `HANDOVER.md` dla session-end.

### PU-3: /compact z targeted hint

**Never run bare /compact** [R7.C4]. Always provide context hint:

```
/compact focus on auth refactor, drop test debugging
```

**Dlaczego:**
- Bez hint uzywa default prompt "Write down anything that would be helpful" [R3.C10, R1.C24]
- Z hint model wie co zachowac vs co porzucic
- Prevents critical context loss

### PU-4: Session fast rules (MindBranches decision tree) [R7.C5]

| Sytuacja | Akcja |
|----------|-------|
| Related follow-up, same working set | Continue |
| New task (unrelated) | `/clear` |
| Wrong path, same task | `/rewind` (Esc Esc) |
| Same task, context getting heavy | `/compact [with hint]` |
| Need lessons from failed branch | `HANDOVER.md` first |

Prawdopodobnie najbardziej actionable decision framework w calej kampanii.

### PU-7: Session per task doctrine

**"New topic = new chat. No exceptions."** [R7.C11].

Empiric savings: **$2.87 -> $0.94 average** when switching from long drag-on sessions to focused isolated sessions.

**Additional insight** [R7.C12]:
- 2-hour session = 2-3 compactions = compounding summary dilution
- Effective high-quality window **~400K of advertised 1M** (Scortier 6852-session study)

**Decision heuristic:** jezeli kolejne pytanie nie jest kontynuacja poprzedniego working setu - `/clear` zanim zadasz.

---

## Quick reference: cala session doctrine w jednym bloku

```
Session start
  -> load .claudeignore + minimal CLAUDE.md (policies.md + active query)
  -> /model sonnet-4.6 (lub opus-4.7 dla complex reasoning)
  -> 0-40% fill: pracuj normalnie (peak performance)
  -> 40-60% fill: zaczynaj myslec o PROGRESS.md
  -> 60-70% fill: /compact "focus on [current task], drop [noise]"
  -> 70-85% fill: napisz HANDOVER.md, /clear, resume w nowej sesji
  -> Nie polegaj na auto-compact (thrashing risk, quality loss)
  -> Po idle >5 min: fresh session zamiast --resume (R6.C26 unsafe)
```

**NIGDY:**
- `--resume` / `--continue` w okresie Issue #41930 (phantom 652K tokenow)
- Bare `/compact` bez hint
- Read duzych binariow bez offset/limit
- Mixing unrelated tasks w jednej sesji (Kitchen Sink AP-09)
- Model switching mid-session (cache wipeout)
- Edycja CLAUDE.md miedzy sesjami (cache rebuild)
- Dyskusja billing/pricing mid-session (sentinel string bug)

---

## Antipatterns AP-02, AP-05, AP-07, AP-09, AP-10 (skrot)

**AP-02: Recursive/Circular @imports** [R6.C6, R6.C22]
- Skill files importujace sie wzajemnie: loader rzuca "Circular dependency detected"
- Transitive bloat: lancuchy A -> B -> C -> D kumuluja tokeny
- Remedium: flat skill architecture, depth <=2

**AP-05: Niekontrolowany Bash Output** [R6.C14, R6.C28]
- `rg pattern .` bez `--max-count`, `find /` bez `-maxdepth`, `docker logs container` full history
- 30,000+ znakow = 7,500+ tokens w jednym call
- Remedium: explicit limits, `head -50`, `| head`, `--max-count=20`

**AP-07: Autocompact Thrashing** [R6.C16, R6.C25]
- Claude Code kompaktuje -> kontekst natychmiast przepelnia sie -> kompaktuje znow
- Cases: Issue #2283, #34363, #9579, #42647
- Safe gdy tool outputs sa male, wpada w petle przy duzych (MCP, log files)
- Remedium: eliminuj large tool outputs u zrodla

**AP-09: Kitchen Sink Session** [R6.C18, R6.C30]
- Jeden task, potem unrelated Q, powrot, debug innego
- **Official Anthropic docs: #1 common error**
- Reddit anecdotal: "Claude Code usable for ~45 minutes daily" przed quota exhaustion
- Remedium: session per task doctrine ($2.87 -> $0.94)

**AP-10: Cache Expiry z Idle Gap** [R6.C19, R6.C20]
- Cache expires po ~5 min idle = pelny rebuild, 10x cost
- 858-session study: 54% kolejek po idle gap >5 min, ~12.3M tokens zmarnowanych
- Remedium: 1h TTL gdzie mozliwe, swiadomy resume vs fresh start decision

---

## Power-user patterns PU-5, PU-6, PU-8, PU-9, PU-10 (skrot)

**PU-5: PreCompact hook transcript archive** [R7.C6, R7.C7, R3.C21]
- Hook fires RIGHT BEFORE compaction, captures full session transcript do JSON/markdown
- `{"async": true}` **required** - sync = lag na kazdy compact
- Production evidence: **69,000+ messages across 1,300 sessions w ~1GB SQLite DB z 0 message loss**
- **BUG #13572:** PreCompact z matcher `"*"` NIE odpala sie na manual `/compact` [R3.C12]
- Workaround: PostToolUse z matcher `compact` [R3.C13]

**PU-6: Proactive /compact 60-70%** [R7.C8, R3.C18]
- Community consensus: 60-75% safe autocompact trigger
- Native settings.json config NIE dostepne (Issues #11819, #15719, #25679, #28728, #34126, #46695)
- Workaround: `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=65`
- Conflict: buildtolaunch 60% vs claudefa.st 80%. SYNTHESIS default: **65% aggressive, 75% permissive**

**PU-8: Plan acceptance auto-clear** [R7.C13] - native feature shipped ~2026-02
- Accepting a plan automatically clears context, giving plan execution fresh window
- Boris Cherny: "helps keep Claude on track longer, significantly improves plan adherence"
- Zacheca plan-first approach bez manual discipline

**PU-9: Subagent isolation (context firewall)** [R7.C17, R7.C18]
- **Mental test:** "Will I need this tool output again, or just the conclusion?" If conclusion - subagent
- Subagents get fresh 200K context windows; tylko 1K-2K summary returns to parent
- Rule of thumb: "Anything requiring reading more than 3-4 large files is a solid subagent candidate"
- **GAP G2:** cache inheritance niejasne - context window relief confirmed, cache economics unverified

**PU-10: Hybrid manual context** [R7.C19, R7.C20, R7.C21]
- Split monolithic CLAUDE.md na domain-specific files
- **Opening context summary gets highest attention weight** - "Earlier context is more reliably referenced than context buried in the middle"
- Single research session consumes 100K+ tokens, costs $40-70 - **front-load research into reusable documents**
- Keep CLAUDE.md under 500 linii (200 linii target)

---

## Cache-first patterns CP-6 do CP-10 (skrot)

**CP-6: Bloki TTL order (1h przed 5m)** [R2.C10]
- Mozna mieszac 5m i 1h w jednym requescie
- **1h MUSZA byc PRZED 5m** - naruszenie = API error
- Pipeline: tools (1h) -> system (1h) -> stabilna historia (1h) -> volatile messages (5m)

**CP-7: Active session warm** [R2.C11]
- W Claude Code CLI cache 5m TTL, **kazdy hit resetuje timer**
- Active session z wymiana co 1-2 minuty trzyma cache warm indefinitely
- Idle >5 min = expire = 10x rebuild

**CP-8: Batch + cache stacking** [R2.C20]
- Mnozniki sie mnoza: Batch (0.5x) * Cache read (0.1x) = **0.05x effective = 95% savings**
- Nie dla Managed Agents (stateful)

**CP-9: Minimum token threshold** [R2.C25]
- Cache silently ignored ponizej progu
- Opus/Haiku 4.5: 4096 tokens minimum
- Sonnet 4.6/Haiku 3.5: 2048 tokens minimum
- Male system prompts (<2-4K) **nie moga** korzystac z cache mimo powtarzania

**CP-10: Monitor cache_read_input_tokens** (safety measure)
- API response zawiera `usage.cache_read_input_tokens`
- Drop do 0 = sentinel string cache break (live threat 2026-04-17)
- Early warning system dla billing anomalii
- Workaround: fresh session gdy widzisz nieuzasadniony cost spike

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

**Nastepny krok:** `02_DECISION_GUIDE.md` dla decision trees per scenariusz, albo `03_MEDIA_PROMPTS.md` dla NotebookLM Video / Infographic prompts.
