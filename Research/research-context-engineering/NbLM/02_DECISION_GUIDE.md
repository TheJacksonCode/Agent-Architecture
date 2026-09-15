# 02 - Decision Guide (Claude Code Context Engineering 2026)

**Stan na 2026-04-17. Plik samodzielny - mozna czytac bez pozostalych.**

Ten dokument daje decision trees dla 6 typowych scenariuszy. Kazdy scenariusz: krotki opis sytuacji -> step-by-step -> red flags -> fallback. Zrodlo: SYNTHESIS.md, cytowania R<N>.C<M>.

---

## Scenariusz 1: Zaczynam nowa sesje - ile kontekstu alokowac?

**Sytuacja:** Odpalasz `claude` w katalogu projektu. Chcesz zaczac prace nad konkretnym zadaniem (feature, bug fix, research, refactor). Pytanie: jak ustawic setup zeby zaczac od peak performance zone (0-20% fill) i miec pole do 2-3h pracy?

### Step-by-step

**Krok 1: Zmierz baseline**

```bash
claude
# w sesji:
/context
```

Zapisz:
- System prompt: X tokens
- Tools: Y tokens
- CLAUDE.md (global + project): Z tokens
- MCP: M tokens
- **Total baseline:** X+Y+Z+M

**Tiers referencyjne** [R5.C27-C29]:
- Lean (no MCP): 20-25K (idealna sesja)
- Medium MCP (4 servers): 40-60K (acceptable)
- Heavy MCP (5+ servers): 66-86K+ (tight, consider Tool Search)

**Krok 2: Dobierz model**

| Zadanie | Model | Uzasadnienie |
|---------|-------|--------------|
| Complex multi-file reasoning, architecture | Opus 4.7 | 1M GA, nowy tokenizer (+35% kosztu) [R1.C1, R1.C11] |
| Standard coding, typical work | Sonnet 4.6 | 1M GA, standard pricing, context awareness XML [R1.C13] |
| High volume simple tasks, subagent workers | Haiku 4.5 | 200K only, 3x tanszy, ale hard limit |
| Ty i tak bedziesz mial mixed pipeline | Orchestrator Opus, workers Sonnet/Haiku | Watch 200K hard limit Haiku |

**Nie przelaczaj modelu mid-session** [R2.C13] - `/model` invaliduje caly cache.

**Krok 3: Ustaw env vars**

```bash
# Aggressive compact (proactive)
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=65

# Virtual context window (deterministyczny na 1M)
export CLAUDE_CODE_AUTO_COMPACT_WINDOW=500000

# Max reasoning (unless you want undocumented March 2026 regression)
export CLAUDE_CODE_EFFORT_LEVEL=max
```

**Krok 4: Zaladuj minimal context**

- `~/.claude/CLAUDE.md` automatic (<500 tokens cel [R5.C16])
- `./CLAUDE.md` automatic (<200 linii cel [R7.C21])
- **NIE wczytuj** `./docs/*.md` predefensive - lazy load on-demand
- **NIE robisz** "przeglada repo" `Read` calls bez celu - every tool output stays in context [R6.C9]

**Krok 5: Ustaw budget target**

Dla 1M modelu:
- Peak zone: 0-200K (20%)
- Warning zone: 200-400K (40%)
- Compact zone: 400-650K (65% aggressive trigger)
- Emergency: 650-835K (nominal auto-compact)

Dla 200K modelu (Haiku 4.5):
- Peak: 0-40K
- Warning: 40-80K
- Compact: 80-130K
- Emergency: 130-167K (effective auto-compact 83.5%)

### Red flags

- Baseline >100K na 1M modelu - bloated MCP lub CLAUDE.md, zrob audit
- Baseline >50K na 200K modelu - nie zmiescisz sie w 2h pracy, zredukuj
- `/context` pokazuje "Skills: 50,000+ tokens" = uzywasz plugin-installed skills, rozwaz standalone `~/.claude/skills/*.md` (61 tokens per skill) [K1]

### Fallback

Jezeli baseline juz >30% okna **przed** pierwszym promptem:
1. `/config` - wylacz nieuzywane MCP
2. Tool Search feature dla MCP >10K (85% redukcja) [R5.C12]
3. Split CLAUDE.md na policies.md/wot.md/queries.md, ladowane on-demand [R7.C19]
4. Rozwaz wyzszy model z 1M oknem zamiast Haiku 200K

---

## Scenariusz 2: Kiedy /compact vs /clear vs /resume vs /handover?

**Sytuacja:** Sesja rosnie. `/context` pokazuje 60%. Co teraz? Klasyczny punkt decyzyjny gdzie bledny wybor = gubisz context albo tracisz cost.

### Decision tree [SYNTHESIS Appendix A.2, rozszerzone]

```
Stan: potrzeba oswiezyc context
|
+- Kontynuacja tego samego taska?
|   |
|   +- TAK, same working set, <60% fill -> CONTINUE (dont compact yet)
|   |   Red flag: jezeli >20 turn bez checkpoint -> PROGRESS.md nawet jesli nie compact
|   |
|   +- TAK, context heavy (60-70%) -> /compact Z HINT
|   |   Przyklad: /compact focus on auth refactor, drop test debugging
|   |   NIGDY bare /compact [R7.C4]
|   |
|   +- TAK, context krytyczne (>80%) -> HANDOVER.md + /clear + paste
|   |   Powod: >85% ryzyko "Conversation too long" failure [R3.C15]
|   |
|   +- NIE (new topic) -> /clear (Kitchen Sink = #1 AP [R6.C30])
|
+- Wrong path ten sam task?
|   +- /rewind (Esc Esc) - limited help ale nie destrukcyjny
|   +- Jesli rewind niewystarczy -> PROGRESS.md current state + /clear + resume
|
+- Potrzebny context z session ktorej nie ma?
|   |
|   +- --resume na tej samej sesji?
|   |   -> UNSAFE 2026-04-17 [R6.C26, Issue #41930]
|   |   -> 652K phantom tokens risk
|   |
|   +- Byla HANDOVER.md? -> fresh session + paste HANDOVER
|   |
|   +- Brak HANDOVER? -> fresh session + /recap (v2.1.108) [R3.C25]
|   |   Uwaga: /recap NIE jest compaction undo, tylko session recap
```

### Unikaj

- **Bare `/compact`** (bez hint) - compaction uzywa default prompt, gubi priorities [R7.C4, R3.C10]
- **`--resume` / `--continue`** - Issue #41930 unfixed, 652K phantom [R6.C11, R6.C26]
- **`/compact` przy >85% fill** - risk "Conversation too long" failure, zero recovery [R3.C15]
- **`/compact` tam gdzie wystarczy `/clear`** - compact to $0.54 billable call [R3.C29], clear to $0

### Fallback hierarchy

Jezeli wszystko idzie zle:
1. `Esc Esc` rewind ostatnie turn
2. HANDOVER.md + `/clear` + fresh session
3. Jezeli sesja zatruta (np. Read 8.5MB binary [R6.C10]) - ALL sessions in project corrupted, potrzeba `claude --fork-session` zanim zaczniesz NIE PO

---

## Scenariusz 3: 5m vs 1h cache - kiedy ktore?

**Sytuacja:** Piszesz aplikacje Claude API (lub konfigurujesz cache w Claude Code). Decyzja na `ttl: "5m"` czy `ttl: "1h"` ma 50% vs 86% savings impact przy dluzszej sesji [R2.C19].

### Decision matrix

| Sesja typ | TTL | Uzasadnienie | Break-even |
|-----------|-----|--------------|------------|
| Krotka badawcza (5-15 min) | 5m | Sesja zmiesci sie przed idle expiry | 2 hity [R2.C4, R2.C17] |
| Active coding 1-3h bez przerw | 5m (auto-warm) | Kazdy hit resetuje timer [R2.C11] - warm indefinitely | 2 hity |
| Praca z przerwami (>5 min idle), sesja >1h | **1h** | Scenariusz 100-turn 60K: 1h=$2.38 vs 5m=$8.94 [R2.C19] | 3 hity |
| Batch processing | Batch + cache | 0.5x * 0.1x = **0.05x = 95% savings** [R2.C20] | N/A |
| Model switching mid-session | AVOID | `/model` invaliduje caly cache [R2.C13] | N/A |

### Bedrock gotcha

**CLI hardcoduje 5m na Bedrock** nawet jesli Bedrock wspiera 1h [R2.C12, Issue #32671].

- Env var `ENABLE_PROMPT_CACHING_1H_BEDROCK` istnieje ale nie dziala defaultowo
- Issue #32671: open, unfixed
- **Implikacja:** jesli uzywasz Bedrock + dluzsze sesje - zmigruj na API direct dla cache economics

### Red flags

- Cache break miedzy requestami mimo stabilnego prefiksu:
  - Sprawdz czy nie masz `datetime.now()` / random ID w cachowanym bloku [R2.C6]
  - Sprawdz czy nie edytowales CLAUDE.md od ostatniej sesji [R2.C14]
  - Sprawdz czy model sie nie zmienil [R2.C13]
- Miksowanie TTLs: **bloki 1h MUSZA pojawic sie PRZED blokami 5m** [R2.C10] - naruszenie = API error
- Cache silently ignored jezeli <2048 (Sonnet/Haiku 3.5) lub <4096 (Opus/Haiku 4.5) tokens [R2.C25]

### Fallback

Jezeli cache nie dziala mimo konfiguracji:
1. Monitor `usage.cache_read_input_tokens` w kazdym response
2. Spadek do 0 = cache broken (sentinel string bug [R6.C21] lub invalidation)
3. Fresh request z debug logging cache content
4. Sprawdz ze breakpoint jest na stable prefix, nie volatile content

---

## Scenariusz 4: Bloated session - jak uratowac?

**Sytuacja:** `/context` pokazuje 85%+. Pierwsze `/compact` crashuje z "Conversation too long". Model odpowiada z degradacja (forget wczesniejsze rules, powtarza bledy). Jak ratowac pracy bez utraty?

### Step-by-step recovery

**Krok 1: Nie panikuj - nie rob `/clear` natychmiast**

`/clear` **niszczy** konwersacje bezpowrotnie. Najpierw zabezpiecz stan.

**Krok 2: Manual PROGRESS.md przez Claude**

Zamiast `/compact`, zadaj Claude:

```
Prosze zapisz do PROGRESS.md aktualny stan pracy:
- Co zostalo zrobione (lista plikow zmodyfikowanych + rationale)
- Co jest work-in-progress (ktory plik, ktora funkcja)
- Co zostalo do zrobienia (3 nastepne kroki)
- Jakie decyzje techniczne zostaly podjete
- Jakie podejscia nie zadzialaly (failed approaches - do not repeat)
- Jak resume w fresh sesji (numbered steps)
```

Claude zapisze to na dysk. Plik przezywa kompakcje i `/clear`.

**Krok 3: HANDOVER.md (pelniejszy context-end save)**

Dla pelniejszej archiwizacji:

```
/handover
```

Lub manual prompt [R7.C2, R7.C23]:

```
Generuj HANDOVER.md capturing:
- Decisions with rationale
- Pitfalls encountered
- Lessons learned
- Failed approaches (do not repeat in next session)
- Current state (what works, what is broken)
- Resume instructions (numbered steps for next session)
```

**Krok 4: `/clear` i fresh session**

- Claude Code zamyka konwersacje
- Cache zostaje invalidated ale PROGRESS.md i HANDOVER.md sa na dysku
- Fresh session ma peak performance 0-20% fill [R6.C5]

**Krok 5: Resume z kontekstem**

```bash
# fresh session
claude
# w sesji:
# 1. Claude auto-czyta PROGRESS.md przy opening prompt
# 2. Paste HANDOVER content jako pierwszy message
# 3. Zaczynamy od konkretnego next step (nie od zero)
```

### NIGDY

- **`--resume` / `--continue`** - Issue #41930 unfixed, 652K phantom [R6.C11, R6.C26]
- **Bare `/compact` przy >85% fill** - "Conversation too long" failure [R3.C15], zero recovery - issues #10556, #10299, #9799, #9493, #18211, #28728 closed as "not planned"
- **Read 8.5MB files przez Read** - permanent session corruption [R6.C10, Issue #6780]

### Fallback jezeli wszystko zawodzi

`claude --fork-session` - **proactive only, PRE failure** [R3.C17]. Jezeli przeoczyles moment, single option to:
1. Kopiuj manualnie ostatnie istotne messages do markdown
2. `/clear`
3. Fresh session + manual paste

Recovery options (limited) [R3.C17]:
- `/clear` (destroys conversation)
- `Esc Esc` (limited help)
- `claude --fork-session` (proactive only)
- **Zero backward recovery** po "Conversation too long"

---

## Scenariusz 5: Debugging wysokich kosztow

**Sytuacja:** Miesieczny bill od Claude wzrosl 3x bez proporcjonalnego wzrostu pracy. Gdzie szukac?

### Diagnostic flow

**Step 1: Sprawdz uzywane wersje CLI**

```bash
claude --version
```

**Live threats by version [Part 6 SYNTHESIS]:**

- **v2.1.100:** +20K per request, ~40% faster consumption [R6.C17, K6]
- **Any version post-v2.1.105:** PreCompact hook bug #13572 [R3.C12]
- **Anything z billing sentinel string bug:** psuje cache prefix = 10-20x inflacja [R6.C21, R6.C23]

**Workaround:** downgrade do v2.1.99 jezeli podejrzenie v2.1.100 inflation [R6.C17].

**Step 2: Sprawdz usage patterns**

| Symptom | Przyczyna | Fix |
|---------|-----------|-----|
| Duzo `--resume` w historii | Issue #41930 drain (652K phantom) | Przesiadka na HANDOVER.md pattern [R6.C26] |
| Wiele modeli switched per sesja | `/model` invaliduje caly cache [R2.C13] | Wybor modelu na START, nie mid-session |
| Edycja CLAUDE.md przed kazda sesja | Cache rebuild za kazdym razem [R2.C14] | Atomic edits raz per sprint |
| Heavy MCP (>5 servers) | 66-86K+ baseline [R5.C29] | Tool Search (85% redukcja [R5.C12]) |
| Read bez offset/limit | 561K worst case [R6.C9] | Zawsze offset/limit |
| Read binariow | Permanent session corruption [R6.C10] | Nigdy nie read binariow przez Read tool |
| "Billing" lub "pricing" w historii | Sentinel string bug - 10-20x inflation [R6.C21] | Unikaj billing discussions mid-session |
| Idle gaps >5 min czesto | Cache expire = 10x rebuild [R6.C19] | 1h TTL gdzie mozliwe, fresh session po idle |

**Step 3: Analiza API response**

Monitor w kazdym request:

```json
"usage": {
  "input_tokens": X,
  "output_tokens": Y,
  "cache_creation_input_tokens": A,
  "cache_read_input_tokens": B
}
```

- **Healthy cache:** `cache_read_input_tokens` >> `cache_creation_input_tokens`
- **Broken cache:** `cache_read_input_tokens` = 0 w kolejnych requestach = rebuild every time
- **Silent inflation:** `input_tokens` grows disproportionately to user prompt length = Issue #41930 drain

**Step 4: Compute per-session cost**

Top-level `input_tokens` NIE obejmuje compaction [R3.C30]. User musi SAM sumowac `iterations` entries dla total.

Formula:
- Cost per compaction: 180K tokens na Sonnet 4 = ~$0.54 per event [R3.C29]
- 2-hour session z 3 compactions = ~$1.62 sama kompakcja + base cost
- Dodaj cost streamu i output generation

### Red flags (investigate immediately)

- Cost spike >2x od tygodniowej sredniej bez nowego zadania
- `cache_read_input_tokens` = 0 dla sekwencji requestow (cache broken)
- `input_tokens` rosnie w kolejnych requestach mimo tej samej historii (drain)
- `/context` pokazuje inne baseline niz wczoraj (invalidation via edit)

### Fallback

1. **Fresh session** natychmiast gdy widzisz anomalie
2. **Nie debuguj cost w tej samej sesji ktora ma problem** - debug w czystej sesji
3. **Downgrade CLI** do v2.1.99 jako test wariantu (is it v2.1.100 inflation?)
4. **Disable auto-resume** calkowicie az do fixa Issue #41930

---

## Scenariusz 6: Migracja ze Sonnet 4.5 (1M GA sunset 2026-04-30)

**Sytuacja:** Uzywasz Sonnet 4.5 z beta header `context-1m-2025-08-07`. Sunset za 13 dni (od 2026-04-17). Po 30 kwietnia requesty >200K zwrocia blad [R1.C12]. Co robic?

### Decision tree

```
Aktualne uzycie Sonnet 4.5 beta 1M
|
+- Wymagasz >200K window?
|   |
|   +- TAK
|   |   -> Migracja na Sonnet 4.6 (1M GA bez surcharge [R1.C2])
|   |   LUB
|   |   -> Migracja na Opus 4.7 (1M GA, nowy tokenizer +35% [R1.C11])
|   |
|   +- NIE, zwykle <200K
|   |   -> Migracja na Sonnet 4.6 (ten sam price bucket)
|   |   -> Usun beta header z kodu
|
+- Uzywasz Sonnet 4?
    -> Ten sam sunset 2026-04-30 [R1.C12]
    -> Migracja jak wyzej
```

### Step-by-step migration

**Krok 1: Audyt uzycia beta headera**

```bash
grep -r "context-1m-2025-08-07" .
grep -r "claude-sonnet-4" . # version 4, nie 4.5 lub 4.6
```

**Krok 2: Test swap na Sonnet 4.6**

- Ten sam standard pricing <= 200K input tokens [R1.C10]
- 1M mode od 2026-03-13 bez surcharge dla Opus 4.7/4.6 i Sonnet 4.6 [R1.C10]
- **BEZ zmiany kodu poza model ID + usuniecie beta headera**

**Krok 3: Uwaga na tokenizer change**

Jesli migrujesz na **Opus 4.7** z cokolwiek starszego:
- Nowy tokenizer moze uzyc **do +35% tokenow dla tego samego tekstu** [R1.C11]
- Historyczne pomiary beda **1-35% wyzsze** na Opus 4.7
- Re-estimate budget przed migracja

Jesli migrujesz na **Sonnet 4.6** z Sonnet 4.5:
- Brak tokenizer change (zakladam podobny)
- Pricing identyczny dla <200K

**Krok 4: Test migration w dev sesji**

- Uruchom tych samych 3-5 typowych requestow na nowym modelu
- Porownaj:
  - `usage.input_tokens` delta (tokenizer impact)
  - Quality outputu (attention may vary)
  - Cost per request

**Krok 5: Context awareness XML check**

Sonnet 4.6, Sonnet 4.5, Haiku 4.5 dostaja `<budget:token_budget>` XML [R1.C13] - jesli twoj kod testowal ten feature, zaktualizuj bedzie Opus 4.7 **nie dostanie** tego signal.

### Red flags

- Kod hardcoded `claude-sonnet-4-...-2025-...` ID - wymaga updatu nawet jesli pricing sie nie zmienia
- Promptu zalezny od "model signals 965000 remaining tokens" - Opus 4.7 nie generuje tego signal
- Requesty >200K w production bez migration testu - **po 30 kwietnia hard error**

### Fallback

- Jezeli migracja nie gotowa przed 2026-04-30:
  - Ograniczaj requesty <200K (auto-fallback behavior API)
  - Ustaw alerts on request size >200K
  - Przyspiesz migration na production
- **Nie bylo** extension oczekiwanej dla Sonnet 4.5 beta - przyjmij sunset jako hard deadline

---

## Appendix: Quick reference session doctrine

**Canonical flow** [Part 7 SYNTHESIS]:

```
Session start
  -> minimal CLAUDE.md
  -> /model (wybor jednokrotnie)
  -> 0-40% fill: pracuj (peak performance)
  -> 40-60% fill: myslic o PROGRESS.md
  -> 60-70% fill: /compact Z HINT
  -> 70-85% fill: HANDOVER.md + /clear + fresh
  -> >85% fill: emergency PROGRESS.md + /clear (NIE /compact)
  -> Idle >5 min: fresh session zamiast --resume
```

**Environment vars konfiguracja**:

```bash
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=65
export CLAUDE_CODE_AUTO_COMPACT_WINDOW=500000  # dla 1M modeli
export CLAUDE_CODE_EFFORT_LEVEL=max
```

**NIGDY**:
- `--resume` / `--continue` (Issue #41930)
- Bare `/compact` (no hint = unpredictable)
- Read binariow (session corruption)
- Model switch mid-session (cache wipe)
- Mixing unrelated tasks (Kitchen Sink AP-09)
- Edycja CLAUDE.md mid-sprint (cache rebuild next session)

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
- Live threats 2026-04-17 w Appendix C SYNTHESIS

Pelen corpus: `plans/SYNTHESIS.md` (10,168 slow, 7 Parts + 3 Appendixy).

---

**Nastepny krok:** `03_MEDIA_PROMPTS.md` dla NotebookLM Video i Infographic Studio prompts (z rubryka quality 9.5/10).
