# SYNTHESIS: Claude Code Context Engineering 2026

Campaign: Claude Code Context Engineering 2026
Date: 2026-04-17
Model corpus: 7 extractow (E1-E7) + CRITIC.md
Rozmiar: ~10,168 slow, 7 Parts + 3 Appendixy

---

## Executive Summary

**Claude Code Context Engineering w 2026 roku nie jest o "lepszej kompresji" - jest o dyscyplinie rozumienia ktora cyfra obowiazuje w ktorym miejscu, i unikaniu anti-patternow ktore potrafia spalic 10-20x budzet niepotrzebnie.** SYNTHESIS zbiera 7 rownoleglych raportow w spojny obraz state-of-the-world na 2026-04-17. Najwazniejszy wniosek: **wiekszosc "controversji" to terminologiczny chaos pod ktorym kryja sie rozne pojecia, nie sprzeczne fakty**.

### 10 top insights

1. **Auto-compact threshold to 4 rozne pojecia pod jedna nazwa** [K2 resolved]: nominal 95% (docs), effective 83.5% (po 33K buffer), quality-degradation 20-40% (context rot), proactive 60-80% (community recommendation). Wszystkie prawdziwe. Bez tej dyscypliny kazda rada dla uzytkownika jest sprzeczna.

2. **Quality degraduje przy 20-40% fill, NIE 80%** [R6.C4]. Miedzy 40% a 83.5% istnieje **43-punktowe okno gdzie model dziala w degradacji bez kompaktowania**. Kompakcja NIE jest "quality saver", jest "last resort anti-crash".

3. **Skill loading 61 tokens vs 50,000 tokens - OBIE WARTOSCI PRAWDZIWE** [K1]. Standalone skill (`~/.claude/skills/*.md`) = frontmatter-only 61 tokens dopoki nieuzywany. Plugin skill (claude-plugin package) = pelne body 3-6K od startu.

4. **Effective 1M context window to ~300-400K** dla complex tasks [R7.C12 Scortier n=6852]. Roznica architectural vs practical - API przyjmie 1M, ale attention rozmywa sie wczesniej.

5. **Prompt caching = 81% redukcja kosztu** w realnym Claude Code workflow (LMCache empiric 92 LLM calls, ~2M tokens, prefix reuse 92%) [R2.C23]. 1h TTL jest GA od 2025, na Bedrock hardcoded 5m (Issue #32671).

6. **Baseline startup realistic:** lean 22.5K, medium MCP 50K, heavy MCP 76-86K [R5.C27-C29]. MCP Docker sam = 125,964 tokens [R5.C11], 167-tool setup = 191,300 tokens przed pierwszym promptem [R6.C7].

7. **Tool results = silent accumulator** [R5.C26]. Po godzinie aktywnego dev (Read/Grep/Bash) ~50-100K tokens kumuluja sie bez widocznej wizualizacji. Read 8.5MB file = permanent session corruption [R6.C10 Issue #6780].

8. **`.claudeignore` to soft-hint, nie security boundary** [K4]. Anthropic nie dokumentuje natywnie (R4.C2 PRIMARY SOURCE GAP). Do security: `permissions.deny` + sandboxing. Do token optimization: `.claudeignore` + pg-creative converter.

9. **PreCompact hook (v2.1.105) dziala na auto, BUG #13572 na manual /compact** [R3.C12]. Hook z matcher "*" nie odpala sie na manual - silent bypass hook infrastructure.

10. **v2.1.100 invisible inflation (+20K per request) + Issue #41930 resume drain (652K phantom tokens)** - live threats 2026-04-17. Oba unfixed. Workaround: unikaj `--resume`/`--continue`, downgrade jesli cost spike.

### 10 action items

1. **Zmierz swoj baseline** - uruchom `/context` w fresh session, zapisz snapshot. Nie estymuj, mierz.
2. **Split monolithic CLAUDE.md** na domain-specific files (policies.md, wot.md, queries.md) <200 linii core [R7.C19, R7.C21]. 5K token CLAUDE.md = 5K wasted every turn.
3. **Setup pg-creative/claudeignore converter** jesli chcesz redukcje context bloat - generuje native permissions.deny rules for Read/Grep/Glob.
4. **Ustaw `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=65`** + `CLAUDE_CODE_AUTO_COMPACT_WINDOW` jako secondary - native autoCompactAt w settings.json nadal missing [R7.C25].
5. **Adoptuj PROGRESS.md + HANDOVER.md** pattern [R7.C1, R7.C2]. Nie polegaj wylacznie na /compact.
6. **Session per task doctrine** - "new topic = new chat, no exceptions" [R7.C11]. $2.87 -> $0.94 empiric savings.
7. **PreCompact hook z async:true** dla full transcript backup [R3.C21 69K messages, 1.3K sessions, 0 loss].
8. **Tool Search dla MCP heavy setup** - 85% redukcja overhead [R5.C12]. Disable unused MCP servers.
9. **Zawsze /compact z hint** - "focus on X, drop Y" [R7.C4]. Bare /compact gubi unpredictably.
10. **`CLAUDE_CODE_EFFORT_LEVEL=max`** dla complex reasoning [R7.C27]. March 2026 default HIGH->MEDIUM bylo undocumented regression (73% reasoning depth decline).

### 3 safety notes 2026-04-17

- **UNIKAJ `--resume`/`--continue`** - Issue #41930 drains 652K phantom tokens
- **MONITORUJ** `usage.cache_read_input_tokens` w API response - drop do 0 = sentinel string cache break
- **NA 1M CONTEXT:** buffer scaling nieudokumentowany, monitor /context aktywnie, uzywaj CLAUDE_CODE_AUTO_COMPACT_WINDOW dla deterministic behavior

---

## Part 1 - Context Window Fundamentals (per-model 2026)

Stan na 2026-04-17 modele Claude roznia sie **architectonicznym rozmiarem okna kontekstowego** w sposob ktory laczy sie bezposrednio z rozpozerzeniami funkcjonalnymi (context awareness, 1M beta deprecation, tokenizer rewrite). Niezrozumienie ktora cyfra obowiazuje dla ktorego modelu prowadzi do zlych decyzji architektonicznych, szczegolnie gdy pipeline miesza modele (np. Opus orkiestrator + Haiku workers).

**Rozmiary okien kontekstowych per model:**

- Claude Opus 4.7 - **1M tokens** GA, uzywa nowego tokenizera [R1.C1]
- Claude Opus 4.6 - 1M tokens GA od 2026-03-13 bez surcharge [R1.C2, R1.C10]
- Claude Sonnet 4.6 - 1M tokens GA od 2026-03-13, standard pricing [R1.C2]
- Claude Sonnet 4.5 - 1M **beta only**, header `context-1m-2025-08-07` traci wsparcie 2026-04-30 [R1.C12]
- Claude Sonnet 4 - 1M beta, ten sam sunset 2026-04-30 [R1.C12]
- Claude Haiku 4.5 - **tylko 200K tokens**, nigdy nie mial 1M [R1.C3]

To ostatnie jest **krytyczne dla designu preset pipelines**: jesli Haiku 4.5 jest workerem ktoremu oddajesz przepakowany kontekst z Opus, przekroczenie 200K = hard error, nie automatyczna kompakcja. Auto-compact buffer 33K (patrz Part 2) scuttle useful working set do ~167K przed triggerem.

**Tokenizer Opus 4.7 +35%:** Opus 4.7 uzywa nowego tokenizera ktory "may use up to 35% more tokens for the same fixed text" wzgledem poprzednich modeli [R1.C11]. Praktyczne konsekwencje: (a) ten sam plik zrodlowy zuzyje inny budzet na Opus 4.7 vs Opus 4.6; (b) historyczne pomiary tokenow (np. "System prompt 14,328 tokens" [R5.C2]) mogly byc snimane na starym tokenizerze i beda **od 1% do 35% wyzsze** na 4.7; (c) break-even formulas cache (patrz Part 3) nie sa niezmienne miedzy modelami.

**Context awareness (XML injection per model):** Modele Sonnet 4.6, Sonnet 4.5 i Haiku 4.5 otrzymuja **aktywne feedback o budzecie tokenow** [R1.C13]. Na starcie konwersacji model dostaje `<budget:token_budget>1000000</budget:token_budget>` (lub 200000 dla Haiku), a po kazdym tool call dostaje `<system_warning>Token usage: 35000/1000000; 965000 remaining</system_warning>` [R1.C14]. To tlumaczy dlaczego Sonnet/Haiku **same proaktywnie skracaja** outputy gdy czuja limit - model widzi remaining, planuje oszczednie. Opus 4.7 tej sygnalizacji **nie dostaje** w standardowym setupie - co w polaczeniu z +35% tokenizerem znaczy ze Opus przy duzych zadaniach latwiej wpadnie w auto-compact thrashing niz Sonnet.

R1.C3, R1.C13 i R1.C14 rodza maly konflikt "Conflict_3" [E1]: docs pokazuja XML z 1000000 budget ale Haiku ma 200K. Rozstrzygniecie: Haiku dostaje analogiczny XML z 200000 jako budget, ale oficjalne docs nie daja konkretnego przykladu - to documentation gap, nie behavior gap.

**1M tier pricing + sunset:**

- Standard pricing <= 200K input tokens, tryb 1M od 2026-03-13 bez surcharge (dla Opus 4.7/4.6 i Sonnet 4.6) [R1.C10]
- Opus 4.6 wczesniej mial Long Context pricing $10/$37.50 per MTok dla requestow >200K przed GA - ta warstwa znika 2026-03-13 [R1.C10]
- **2026-04-30:** Sonnet 4.5 i Sonnet 4 traca beta 1M, `context-1m-2025-08-07` przestaje dzialac, requesty >200K zwracaja blad [R1.C12]
- Media limit wzrosl z 100 do 600 images/PDF per request dla modeli z 1M oknem (Opus/Sonnet 4.6+); 200K modele zostaja na 100 [R1.C18]

**Token counting API:** GA od 2024-12-17 - pozwala oszacowac tokeny PRZED wyslaniem [R1.C19]. Krytyczne dla budget planning w pipeline: zamiast ryzykowac overflow, pre-sprawdz caly blok tool result/CLAUDE.md/system prompt. W praktyce niewykorzystywane - R5 i R6 pokazuja ze wiekszosc projektow nie zna rozmiaru wlasnego kontekstu poki nie trafi w limit.

**Extended thinking i context:** Previous thinking blocks sa automatycznie usuwane z context window calculation w kolejnych turach [R1.C9]. To oznacza ze extended thinking nie inflatuje historii - Sonnet 4.6 moze myslec 50K tokenow, model tego w nastepnej turze nie widzi. **Ale:** billing widzi pelne tokeny thinking w chwili generacji, wiec to nie jest darmowe - tylko nie akumuluje sie w context window.

**Implikacja architektoniczna:** Prawdziwy uzyteczny context window per model (po buforach i anti-patterns):

| Model | Architectural | Compact buffer | Effective working set |
|-------|--------------|----------------|----------------------|
| Opus 4.7 | 1M | ~33K (prawdopodobnie, gap G5) | ~835K pre-compact (83.5% * 1M, ale brak potwierdzenia) |
| Sonnet 4.6 | 1M | ~33K | ~835K teoretyczne |
| Haiku 4.5 | 200K | ~33K (16.5%) | ~167K pre-compact [R3.C2] |

Wartosc 1M jest **architectural** - API przyjmie request tej wielkosci. Practical quality window degraduje znacznie wczesniej (patrz Part 6 K3 300-400K finding).

---

## Part 2 - Auto-compact Mechanics + Triggers

**Najwiekszy terminologiczny chaos w dzisiejszym Claude Code to "auto-compact threshold".** Cztery pojecia krazacych pod ta sama nazwa prowadza do sprzecznych rekomendacji. CRITIC (K2) rozstrzyga to explicitnie - SYNTHESIS ponizej przyjmuje ten podzial jako canonical.

### Cztery znaczenia "threshold" (K2 resolved)

1. **Nominal auto-compact trigger = ~95% capacity** [R1.C4]. To **oficjalna dokumentacja** (code.claude.com/docs env-vars verbatim): "Default behavior: Auto-compaction triggers at approximately 95% capacity". Dotyczy `used_percentage` pokazywanego w status line.
2. **Effective auto-compact trigger = ~83.5%** [R3.C2]. To **user-observable trigger** - kompakcja odpala sie kiedy zajetosc dochodzi do ~83-85%, bo `~33,000 tokens (16.5% of 200K) is always reserved for the compaction process itself - the 'compaction working space'`. Matematyka: 95% * (200000 - 33000) / 200000 = 83.5%. **R1 i R3 NIE sa w konflikcie** - 95% to nominalna cap (100% - output buffer), 83.5% to moment kiedy to sie dzieje z perspektywy `/context`.
3. **Quality degradation threshold = 20-40% context fill** [R6.C4, R6.C5]. To **moment w ktorym jakosc modelu zaczyna spadac**, nie kompakcja. "Peak performance 0-20% fill, quality begins slipping 20-40% fill, significant degradation 40%+" [R6.C5]. To zjawisko attention diffusion / context rot, nie threshold techniczny.
4. **Community proactive recommendation = 60-80% fill** [R7.C8, R3.C18]. To **user-recommended pre-emptive /compact** zanim system sam nie odpali. buildtolaunch: 60% aggressive, claudefa.st: 80% permissive [R7.C9]. To **manual** operation, nie auto.

**Konsekwencja:** Jezeli ktos pisze "compact threshold to 83.5%" - ma racje o efektywnym. Jezeli "to 95%" - o nominalnym. Jezeli "to 60-80%" - o proactive community. Bez tej dyscypliny terminologicznej kazda rekomendacja dla uzytkownika bedzie sprzeczna. SYNTHESIS uzywa tych czterech nazw konsekwentnie.

### Historia bufora (v2.1.21 change)

Buffer nie jest constant: **w v2.1.21 zredukowano go z 45K (22.5%) do 33K (16.5%)** [R3.C3], przez co effective trigger przeszedl z ~77% na ~83.5%. To oznacza ze starsze blogi (2025) cytujace "trigger 77%" NIE mialy bledu - to bylo poprawne dla v2.1.20 i wczesniej. Podobnie: **na 1M context window buffer scaling nie jest udokumentowany** [gap G5, R3 Issue #34363]. Issue #34363 udokumentowal ze po upgrade do v2.1.76 "bufor autocompact byl obliczany dla 1M okna ale aplikowany do 200k. Natychmiastowy loop po starcie sesji". SYNTHESIS flag: na Opus 4.7 1M **monitoruj /context** aktywnie, nie zakladaj deterministycznego triggera.

### Environment variables

- **`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=NN`** (1-100): Moze **tylko obnizyc** threshold [R1.C5, R3.C4]. Math.min clamp w source kodzie - wartosci powyzej default (~95%) nie dzialaja [R3.C4]. Stosuj np. `=70` do compact earlier at 70%. **Bug #18843, #36381:** env var jest czasem silently ignored - zaobserwowano sesje przekraczajace threshold bez triggera [R3.C26]. **Bug display:** `/context` command pokazuje default buffer (~33K) nawet gdy override jest aktywny [R3.C28] - UI myli.
- **`CLAUDE_CODE_AUTO_COMPACT_WINDOW=NNNNNN`**: ustawia **virtual context window** dla celow kompakcji [R1.C17]. Na 1M modelu ustaw `=500000` zeby traktowac okno jako 500K. Decouples compaction threshold od `used_percentage` status line. **To jedyny deterministyczny sposob na kontrole compact behavior na 1M** - patrz G5.
- **`DISABLE_COMPACT` vs `DISABLE_AUTO_COMPACT`:** E1 Conflict_2 oznacza inconsystency w docs - niejasne czy obie wersje dzialaja. Rekomendacja: uzywaj obu synonimicznie, sprawdzaj czy sesja nie kompaktuje.

### Server-side Compaction API (compact-2026-01-12)

Oddzielna warstwa od Claude Code CLI - **API level feature** [R1.C15, R3.C24]:

- Beta header wymagany: `anthropic-beta: compact-2026-01-12` [R1.C15]
- Type: `compact_20260112` (versioned API) [R3.C24]
- Trigger default: 150K input tokens, minimum 50K [R1.C6, R3.C24]
- `pause_after_compaction: true`: zatrzymuje po summary ze `stop_reason: compaction`, pozwala na manual intervention przed kontynuowaniem [R1.C20, R3.C24]
- Default summary prompt: "Write down anything that would be helpful, including the state, next steps, learnings etc. You must wrap your summary in a <summary></summary> block" [R1.C24, R3.C10]

**Billing impact:** Compaction to **osobny billable API call** [R3.C1]: additional sampling step = full conversation as input -> summary generation -> compaction block insert. Full-context compaction 180K tokens na Sonnet 4 (~$3/M) = ~$0.54 per compaction event [R3.C29]. User must sum all `iterations` entries dla total - top-level `input_tokens` w API response tylko nie-compaction iterations [R3.C30].

### PreCompact hook v2.1.105 + bug #13572

**v2.1.105 (2026-04-13) dodal PreCompact hook** [R3.C11]: hooks can block compaction przez exit code 2 albo `{"decision":"block"}` return. Trigger field: `auto` dla automatycznego, `manual` dla user-invoked /compact.

**KRYTYCZNY BUG #13572 (Dec 2025):** PreCompact hook z matcher `"*"` **nie odpala sie na manual /compact invocations** [R3.C12]. Manual /compact moze silently bypassowac hook infrastructure. Nawet w v2.1.105+ bug nie jest fixed (trigger field istnieje w spec, implementacja wadliwa).

**Workaround:** hook na `PostToolUse` z matcher `compact` do injection post-factum [R3.C13, R3.C22]. Brak oficjalnego `PostCompact` hook jako April 2026 - Issue #40492 closed jako "duplicate" [R3.C13]. Community implementuje:

```yaml
PostToolUse:
  matcher: "compact"
  command: "cat .claude/context-essentials.md"
```

context-essentials.md powinien byc **<50 linii** - tylko "rules that must survive", nie architecture docs [R3.C22].

### Edge case: "Conversation too long" failure

**Najbardziej krytyczny failure mode:** kontekst roznie tak szybko ze overshoots auto-compact threshold PRZED triggerem, potem **manual /compact tez sie wywraca** z "Conversation too long" [R3.C15]. Issues #10556, #10299, #9799, #9493, #18211, #28728 - wiekszosc closed as "not planned"/"duplicate" - Anthropic **nie planuje fix-a user-configurable** [R3.C16].

Recovery options [R3.C17]: `/clear` (destroys conversation), `Esc Esc` (limited help), `claude --fork-session` (proactive only, PRE failure). Zero backward recovery.

### Thrashing protection (v2.1.x)

Gdy tool output jest tak duzy ze context refills natychmiast po summary, **Claude Code zatrzymuje auto-compacting po few attempts i pokazuje error zamiast loopowac** [R1.C8, R6.C16]. Issues #2283, #34363, #9579, #42647 dokumentuja cases gdzie to nie dziala - autocompact wchodzi w loop przy zlych tool outputs (MCP, log files) [R6.C16, R6.C25]. Docs mowia "stops after a few attempts" bez podania liczby [gap R1.C23].

### Co auto-compact zachowuje vs gubi

**Preserved** [R3.C7]: generated summary (replaces old messages), messages sent AFTER compaction block, system prompt (cached separately, zawsze present), CLAUDE.md content (reloaded at every session start), MEMORY.md (first 200 lines / 25KB).

**Lost** [R3.C8]: specific error messages, stack traces, file paths, exact line numbers, multi-step debugging sequences, architectural decision rationale, exploratory dead ends, rejected approaches, tool call outputs, exact code snippets, project conventions, code style rules.

**Empiryk:** blind testing on 142-agent framework po kompakcji = **agent identification accuracy spada do 83%, fidelity score 3/5** [R3.C9]. Compaction **preserves what but loses who and why**.

### /recap (v2.1.108, 2026-04-14)

Nowy command ktory daje context przy powrocie do sesji [R3.C25]. **NIE jest compaction undo** - to session recap feature. Dostepny nawet z telemetria wylaczona (Bedrock, Vertex, Foundry). Opt out przez `/config` lub `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=0`.

---

## Part 3 - Prompt Caching jako instrument context engineeringu

Prompt caching to **najbardziej niedocenione narzedzie context engineering** - uzytkownicy dyskutuja `/compact` i `.claudeignore` godzinami, a w praktyce **81% redukcja kosztu** w realnym Claude Code workflow idzie z poprawnego cache setup'u [R2.C23]. Ta sekcja rozbija: mechanike breakpoints/TTL, hierarchie inwalidacji, ekonomie break-even, i realne liczby z production usage.

### Mechanika: `cache_control: {type: "ephemeral"}`

Tylko jeden typ cache: **ephemeral**, maksymalnie **4 breakpointy per request** [R2.C2]. Cache przechowuje stabilne prefixy promptu na serwerach Anthropic, eliminujac reprocessing na kolejnych requestach [R2.C1]. Breakpoint mozna umiescic na:

- `tools[]` - ostatnie narzedzie w tablicy, cachuje caly prefix tools [R2.C5]
- `system[]` - content block w systemie
- `messages[].content[]` - dowolny content block w wiadomosciach

**Hierarchia**: tools -> system -> messages (od stabilnego/rzadko zmienialnego do volatile) [R2.C7].

### TTL: 5m vs 1h

| TTL | Write cost | Read cost | Break-even |
|-----|-----------|-----------|------------|
| 5 min | 1.25x base | 0.1x base | 2 hits [R2.C4, R2.C17] |
| 1 hour | 2x base | 0.1x base | 3 hits [R2.C4] |

**Formula break-even 5m:** N_hits >= 1.25 / 0.9 = 1.39, czyli 2 hity minimum zeby sie oplacilo [R2.C17].

**1h TTL jest GA** od 2025 - nie wymaga beta headera ani enterprise planu [R2.C9]. To rozstrzyga K5 z CRITIC: starsze zrodla twierdzace "enterprise only" byly prawdziwe w 2024, ale **w kwietniu 2026 1h jest GA standard**. Mozna mieszac TTLs w jednym requescie, ale **bloki 1h MUSZA pojawic sie PRZED blokami 5m** [R2.C10] - naruszenie tej kolejnosci = API error.

**Na AWS Bedrock:** Claude Code **hardcoduje 5m** nawet gdy Bedrock wspiera 1h [R2.C12]. Istnieje nieudokumentowana `ENABLE_PROMPT_CACHING_1H_BEDROCK` ale nie jest default. Issue #32671 confirms CLI hardcoduje 5m na Bedrock - status: open, niefixed.

### Co invaliduje cache

Inwalidacja **kaskaduje hierarchicznie** - modyfikacja wyzszego poziomu invaliduje wszystko ponizej [R2.C7]:

- Modyfikacja `tools[]` definitions: invaliduje CALY cache (tools + system + messages) [R2.C7]
- Modyfikacja `system[]`: invaliduje system + messages
- Modyfikacja `messages[]`: invaliduje tylko messages od punktu zmiany

**Kluczowe triggery inwalidacji w Claude Code CLI** [R2.C13-C16]:

- **Przelaczenie modelu** (`/model` command): caly cache, kazdy model ma izolowany cache [R2.C13]
- **Edycja CLAUDE.md**: wymaga restartu sesji, **caly cache rebuild** [R2.C14]. To jest czesto niewidoczna lekcja - kazda edit CLAUDE.md miedzy sesjami = 10x-20x cost spike na nastepnej sesji dopoki cache sie nie odbuduje.
- **Nowy MCP server**: zmienia tool definitions (najwyzszy poziom) = caly cache lost przy nastepnym starcie [R2.C15]
- **Workspace boundary (od 2026-02-05):** cache izolowany per workspace, nie per organization [R2.C16]. Rozne workspace w tej samej org NIE dziela cache.
- **Dynamic content w cachowanym bloku**: timestamps, random IDs, datetime.now() = invalidacja przy kazdym requescie [R2.C6]. Anti-pattern "Lookback Window" - breakpoint na zmiennej tresci kills cache completely.

**Cache lookup:** system searches back **20 blokow** od breakpointu szukajac matching prefix; jesli nie znajdzie - tworzy nowy entry [R2.C8].

### Empiric: 81% cost savings (projectdiscovery)

Realny Claude Code task mierzony przez LMCache blog: 92 LLM calls, ~2M input tokens, **92% prefix reuse rate overall** [R2.C23]. Per phase breakdown:

- Explore subagents: 92.06% prefix reuse
- Plan phase: 93.23%
- Execution: 97.83%

**Koszt bez cache: $6.00. Koszt z cache: $1.152. Oszczednosc: 81% redukcja.**

Latency benefit: cache hit jest **3.3x szybszy** niz full recompute - 1.48s vs 4.89s dla 187K tokenow [R2.C24]. To nie jest tylko tanio, to **szybciej** - user-perceived responsiveness znaczaco lepszy.

### Scenariusz 100-turn coding session, 60K prefix

Klasyczny long coding session [R2.C19]:

- **Bez cache:** $18.00
- **5m cache:** ~20 rewrites * 60K * $6.25/M + 80 reads * 60K * $0.30/M = **$8.94** (-50%)
- **1h cache:** 1 write * 60K * $10/M + 99 reads * 60K * $0.30/M = **$2.38** (-86%)

5m vs 1h nie jest mala roznica - **86% vs 50% oszczednosci** w tej samej sesji. 1h ma sens kiedykolwiek sesja zajmie >20 minut (czyli prawie zawsze w production coding).

### Batch API + Cache stacking

Mnozniki sie **mnoza**: Batch (0.5x) * Cache read (0.1x) = 0.05x effective input cost, **95% savings** [R2.C20]. Uwaga: Batch API nie dotyczy sesji Managed Agents (stateful, interactive).

### Minimum token thresholds (model-zalezne)

| Model | Min tokens dla cache |
|-------|---------------------|
| Opus 4.7, 4.6, 4.5 | 4096 |
| Haiku 4.5 | 4096 |
| Sonnet 4.6, Haiku 3.5 | 2048 |

Ponizej progu - cache_control jest silently zignorowany, request leci jak bez cache [R2.C25]. Dlatego **male system prompts (<2-4K) nie moga korzystac z cache** - mimo ze sie powtarzaja.

### Architektura cache w Claude Code (auto-layered)

Claude Code **automatycznie** strukturyzuje cache w 3 warstwy [R2.C21]:

- **Layer 1 Global stable (~20K+ tokens):** system prompt core + 18 builtin tools, **identyczne dla wszystkich userow globally** [R2.C22]. Scope: "global" - potencjalnie wspoldzielone miedzy userami. Zmiana tool definitions = global invalidation.
- **Layer 2 Per-project:** CLAUDE.md project content, subproject context
- **Layer 3 Per-session:** conversation history, user messages, tool results

W Claude Code CLI (1P Anthropic) cache uzywa **5m TTL**, kazdy hit resetuje timer - aktywna sesja z wymiana co 1-2 minuty **trzyma cache warm indefinitely** [R2.C11]. Ale idle gap >5 min = cache expires = 10x cost multiplier on resume [R6.C19].

**Empiric 858-session study [R6.C20]:** 54% kolejek nastepowalo po idle gap >5 min. ~12.3 miliony tokenow zmarnowanych total w jednym zbiorze sesji przez cache miss po idle.

### TTL regression marzec 2026 (safety note!)

**Live threat 2026-04-17** [R6.C21, R6.C23]: Anthropic custom Bun fork robi string replacement na requestach API. Gdy historia konwersacji zawiera billing-related slowa, replacement trafia w zle miejsce i **psuje cache prefix** = pelny rebuild = **10-20x inflacja kosztow**. R6.C21 oznaczony confidence low (disputed), ale R6.C23 (buildtolaunch $1,600 incident) potwierdza symptomy. Status fix: nieznany. **SYNTHESIS workaround:** unikaj dyskusji billing/pricing w middle-session, jezeli to mozliwe rzuc fresh session gdy widzisz nieuzasadnione cost spike.

### Gaps (R2)

- Dokladna liczba tokenow w Claude Code system prompt - "20K+" ale brak precyzyjnego measurement w oficjalnej dokumentacji
- Context editing + caching dokladne metryki
- "Global scope" cachowania - HarrisonSec opisuje shared cache miedzy userami ale nie jest w oficjalnych docs
- **Subagents i cache isolation** - niejasne czy subagenty dziela cache z parentem [gap G2 CRITIC]

---

## Part 4 - Token Accounting w Praktyce

Token accounting w Claude Code to **czarna skrzynka po stronie usera** dopoki nie otworzy /context i nie zmierzy. Rozbieznosci miedzy pomiarami (system prompt 2,600 vs 14,328 vs 24,000; skills 61 vs 50,000+ tokens) nie sa wadami metodologii - to **rozne rzeczy mierzone w roznych miejscach**. Ta sekcja dekomponuje to canonicznie.

### Baseline startup overhead

R1 dostarcza oficjalna tabele overhead startupu [R1.C16]:

| Komponent | Tokens |
|-----------|--------|
| System prompt (core) | 4,200 |
| Auto memory (~/.claude/) | 680 |
| Environment info | 280 |
| MCP tools (baseline, bez pluginow) | 120 |
| Skill descriptions (frontmatter only) | 450 |
| CLAUDE.md (global) | 320 |
| Project CLAUDE.md | 1,800 |
| **RAZEM STARTUP** | **~7,850** |

**Uwaga:** to jest **docs-reported** overhead. Empiryczne pomiary via `/context` (R5) pokazuja istotnie inny obraz bo **"System prompt" w /context pokazuje tylko core (2,600-2,700 tokens)** podczas gdy **API-level cache_read obejmuje caly system block z tool descriptions (14,328 tokens)** [R5.C1, R5.C2]. To rozbieznosc z CRITIC C1 - obie wartosci prawdziwe, rozne definicje:

- `/context` "System prompt" = core instructions only (user-observable) = 2,600-2,700 [R5.C1]
- API cache_read block = core + all tool descriptions cached together = 14,328 [R5.C2]
- Claude.ai webapp system prompt = ~24,000 (rozne produkt) [R5.C3]

**SYNTHESIS canonical wybor:** uzywaj `/context` output jako user-facing metric. **Nie porownuj** cyfr z tabeli R1 z /context output - inna warstwa pomiaru.

### System tools (builtin 24, mandatory)

**System tools koszt: 16,800-17,600 tokens per session** [R5.C4]. **Nie mozna ich wylaczyc** - to "cost of entry" niezaleznie od tego co robisz [R5.C5]. Per-tool breakdown (Piebald-AI measurement v2.1.112):

| Tool | Tokens |
|------|--------|
| Bash | 1,611 [R5.C6] |
| TodoWrite | 2,037 [R5.C7] |
| WebFetch | 297 [R5.C8] |
| Read, Edit, Write, Grep, Glob... | balance (~13K split) |

Ten koszt + system prompt + CLAUDE.md lacznie **zanim napiszesz pierwszy user prompt**. Baseline Claude Code projektu bez MCP to realistycznie **~22,500 tokens** [R5.C27] (system tools 17,200 + system prompt core 2,650 + claude.md lean 300-500 + auto-memory ~680 + env 280).

### MCP schema: ekstremalnie zmienny

MCP server costs roznia sie **o 3 rzedy wielkosci** [R5.C9-C11]:

| MCP Server | Tools | Tokens |
|-----------|-------|--------|
| SQLite | minimal | 385 (minimum) |
| Gmail | 7 | ~2,640 |
| GitHub | 91 | ~46,000 |
| Docker | 135 | **125,964** |

**167-tool setup = 191,300 tokens overheadu PRZED pierwszym promptem** [R6.C7]. Docker + chrome-devtools (26 narzedzi, 17,512 tokenow) = **144,802 tokens tool definitions alone** [R6.C8]. Przypadek documented jako GitHub Issue #12241.

**Tool Search (deferred loading)** - feature dostepny gdy MCP tools > 10K tokens [R5.C12]:

- Redukcja overhead z ~77K do ~8.7K tokenow (**85% redukcja**)
- Sam Tool Search dodaje ~500 tokens overhead [R5.C13]
- Wariant R6 pomiar: 46.9% redukcja (51K -> 8.5K) [R6.C13] - R5 i R6 niekonsystencyjne w liczbie, ale kierunek ten sam: Tool Search znaczaco redukuje

**Total baseline per config tier** [R5.C27-C29]:

| Config | Baseline tokens |
|--------|----------------|
| Lean (no MCP) | 20,000-25,000 |
| Medium MCP (4 servers) | 40,000-60,000 |
| Heavy MCP (5+ servers) | 66,000-86,000+ |

GitHub #11364: real user hit 86K baseline = **8.6% z 1M okna zanim pierwszy prompt**.

### K1 rozstrzygniecie: skill loading (61 vs 50,000 tokens)

**Najwiekszy pojedynczy konflikt w pomiarach context.** Skala roznicy **800x**. CRITIC K1 daje rozstrzygniecie ktore SYNTHESIS przyjmuje:

**OBIE WARTOSCI SA PRAWDZIWE - dla roznych konfiguracji:**

- **Skill standalone (custom, w `~/.claude/skills/`):** progressive disclosure dziala. Frontmatter (name + description only) **~61-100 tokens per skill** [R5.C17] dopoki skill nie jest invoked. Przy invoke body laduje sie dopiero wtedy: 1,500-5,000 tokens [R5.C18].
- **Skill zainstalowany jako czesc pluginu (claude-plugin package):** pluginowy loader **laduje pelne body na starcie** - /context pokazuje 5.5K (Skill Dev), 4.6K (Command Dev), 3.9K (Hook Dev) per skill od pierwszego messagu [R5.C18]. Przy wielu pluginach: **50K+ tokens** [R5.C19, GitHub #14882].

**Mechanizm:** progressive disclosure intended design vs observed plugin-loader behavior. Issue #14882 byl zamkniety bez jasnej answer od Anthropic. Wmedia.es mierzyl standalone (61 tokens w /context bo skill jest w katalogu ale nieuzywany). GitHub #14882 mierzyl plugin setup (50K+ bo loader laduje.

**Praktyczna rekomendacja:** (a) dla own skills uzywaj `~/.claude/skills/*.md` (standalone) - zostaja frontmatter-only dopoki nie invoked; (b) unikaj zainstalowanych pluginow z duza skill library jesli nie uzywasz wszystkich - kazdy skill lapie 3-6K stale.

### Command files - zero baseline

**Command files (.claude/commands/*.md i ~/.claude/commands/*.md) maja zero kosztu baseline** [R5.C20]. Body pliku nie jest ladowany do kontekstu na starcie. Loading semantics:

- **Pierwsze wywolanie:** 500-1,500 tokens (body skill loads) [R5.C21]
- **Kolejne wywolania w tej sesji:** 2-3 tokens (cached) [R5.C22]

Ta architektura to **podstawa oszczednego preset system**: jezeli masz 42 presets (jak Agent_Architecture v32.16), koszt baseline to **0 tokens** - uzytkownik placi tylko za to co uzyje. Comparaison do Skills: Skills w pluginie placa stale 3-6K nawet nieuzyte; Commands placa 500-1500 tylko przy uzyciu.

**Gap G4:** R5.C20 jest architectonicznie poprawny ale unverified empirycznie via /context command screenshot. Spotka sie z empirycznym potwierdzeniem gdy uruchomisz fresh session z custom command i zmierzysz delta.

### Tool results: silent accumulator

**Najbardziej niedocenione zrodlo kosztow.** Read, Grep, Bash, Glob - wszystkie ich wyniki **permanentnie zostaja w kontekscie przez reszte sesji** [R6.C9]. Rule of thumb: 1 token ~= 4 znaki [R5.C23]:

- Read 100 lines = ~400-600 tokens [R5.C24]
- Linia kodu ~80 znakow = ~20 tokens
- Bash verbose output (git log 200 commits) = potencjalnie 10,000-50,000 tokens [R5.C25]

**"Silent accumulator" - po godzinie aktywnego developmentu (read, search, bash) mozna latwo dobrac 50,000-100,000 tokenow z samych tool results** [R5.C26]. Nikt tego nie mierzy na biezaco.

Worst case documented: **Read bez offset/limit na 10,000-line log = stays in context for every subsequent message**. Redundantne wczytanie tego samego pliku, worst case 33 wczytania = 561K tokens zmarnowanych [R6.C9]. Read 8.5MB image file (Issue #6780) = **session zostala zatruta i uploadowana do chmury Anthropic, WSZYSTKIE nowe sesje w projekcie dziedziczyly zatrute dane** [R6.C10].

### Autocompact buffer (33K reservation)

**33,000 tokens permanentnie zarezerwowanych** [R5.C30, R7.C10] jako buffer dla compaction working space. To nie jest negotiable w CLI - jedyny workaround to `CLAUDE_CODE_AUTO_COMPACT_WINDOW` (patrz Part 2).

### MCP token cost formula (nieprecyzyjna)

Przyblizenie z MindStudio: `tokens ≈ (tools × 200) + (chars ÷ 4)` [gap G7]. Tested on limited servers, variance suggests formula needs refinement. **SYNTHESIS uwaga:** nie uzywaj tej formuly jako canonical estimate - uruchom `/context` zamiast przewidywac.

### CLAUDE.md size tiers

**CLAUDE.md koszt per session turn** [R5.C14-C16]:

| Setup | Tokens |
|-------|--------|
| Lean (wmedia.es example) | 302 |
| Medium (GitHub #11364) | 1,700 |
| Typical bloated | 10,000+ |
| 40 KB official limit | ~40,000 [R6.C1] |

Community target: **<500 tokens global CLAUDE.md**, **<500 linii project CLAUDE.md (200 linii target)** [R5.C16, R7.C21]. Pamietaj: **5K token CLAUDE.md costs 5K tokens every single turn** [R7.C21].

**Tylko 7.4% CLAUDE.md content jest relewantny per sesja** [R6.C2]. 10K token CLAUDE.md = 5K zmarnowanych per turn przez duplicaty i stare zasady [R6.C3]. 93-99% startowych tokenow moze byc zmarnowanych bez `.claudeignore` [R6.C29] (patrz Part 5).

### Summary tabela: realistyczny total token footprint

| Config | Baseline | + 1h work tool results | Total usage |
|--------|---------|----------------------|-------------|
| Lean no MCP | 22,500 | +60K | ~82K (41% 200K) |
| Medium MCP | 50,000 | +60K | ~110K (55%) |
| Heavy MCP | 76,000 | +60K | ~136K (68%) |
| Heavy MCP + bloated CLAUDE | 86,000 | +60K | ~146K (73%) |

**Wniosek:** heavy setup 1h po starcie juz dotyka quality degradation zone 40-60% [R6.C5]. Lean setup ma realistyczny 2-3h sesje przed walka z kompakcja.

---

## Part 5 - .claudeignore + Context Boundaries

### PRIMARY SOURCE GAP (zasadnicza obserwacja R4)

**Anthropic nie dokumentuje `.claudeignore` natywnie.** Oficjalna dokumentacja na code.claude.com/docs **NIE MA dedykowanej strony dla .claudeignore** [R4.C2]. `.claude/` directory explorer lists 10+ config files, ale `.claudeignore` nie jest na liscie jako named file type. R1 i R5 nie wspominaja o `.claudeignore` w ogole - to cross-validation tej luki.

To ma **zasadnicze implikacje**: wiekszosc co "wiemy" o `.claudeignore` pochodzi z **community implementations, nie primary source**. R4 confidence 0.72 jest zgodne z rzeczywistoscia.

### K4 rozstrzygniecie: soft hint vs permissions.deny

**Dwa fundamentalnie rozne mechanizmy, czesto mylone jako "to samo":**

- **`.claudeignore` = community convention + model instruction.** Soft-ignore mechanizm ktory prevents automatic context loading ale NIE provides hard file access control [R4.C1]. To hint dla modelu, **nie system-level enforcement** [R4.C18].
- **`permissions.deny` = native hard-block**, best-effort dla Read/Grep/Glob, NIE obejmuje Bash [R4.C9, R4.C10].

**Dowody ze to rozne mechanizmy:**

1. Anthropic deprekowal `ignorePatterns` w settings.json (dawna twarda blokada) bez wprowadzenia oficjalnego `.claudeignore` (analogicznej twardej blokady) - jezeli by chcieli, wprowadziliby replacement
2. permissions.deny ma nativne wsparcie z gitignore-syntax [R4.C9, R4.C3]
3. The Register test (2026-01-28) pokazal ze `.claudeignore` **nie blokuje twardo** - Claude Code czyta .env files mimo reguly [R4.C17]. "Claude Code's permission system applies to tool calls from the model, but the model can be prompted to override its own context instructions" [R4.C18]

**Praktyczna konsekwencja dla uzytkownika:**

| Cel | Narzedzie |
|-----|-----------|
| Token optimization (context bloat) | `.claudeignore` + community converter tool |
| Security (nie czytaj .env, secrets) | `permissions.deny` + sandboxing |
| Ultimate enforcement | OS-level sandbox (blocks Bash tez) [R4.C21] |

Sandbox to najwyzszy poziom hierarchii [R4.C21]: **blocks everything including Bash**. permissions.deny blocks Read/Grep/Glob best-effort. `.claudeignore` blocks initial context loading only.

### Syntax: gitignore-compatible (z zastrzezeniami)

`.claudeignore` uzywa **gitignore specification syntax** [R4.C3]. "Read and Edit rules both follow the gitignore specification" - potwierdzone w permissions docs. Pattern syntax, hierarchiczny loading (`.claudeignore` files can exist in subdirectories, patterns apply to subtree) [R4.C6].

**Negation patterns (`!pattern`)** - tutaj jest konflikt [R4.C4]:

- gitignore spec supports them
- Community proposals describe support
- **Ale** `pg-creative/claudeignore` NPM tool jawnie twierdzi "Negation patterns unsupported"

**Implementation-dependent** - to co jest w gitignore spec nie musi byc zaimplementowane w kazdym community toolu. Uzytkownik ktory pisze `!public/` oczekujac zeby to nadpisalo wczesniejsza regule `src/**/*.json` moze zostac zaskoczony.

**Issue #2305:** deweloperzy chca zeby `.claudeignore` **override** `.gitignore` negatively (np. `!tasks/` do whitelistingu gitignored files). **NOT IMPLEMENTED as of April 2026** [R4.C28].

**Windows paths:** normalizowane do POSIX w permissions [R4.C13]. `C:\Users\alice` staje sie `/c/Users/alice`. Uzywaj `//c/**/.env` dla drive-absolute.

### ignorePatterns deprecated od ~v2.0.8 (Oct 2025)

**v2.0.8 (~Oct 2025) - ignorePatterns deprecated in .claude.json** [R4.C5]. Ta byla dawna twarda blokada w settings.json. Po deprekacji:

- CLI command still functional: `claude config add ignorePatterns node_modules` [R4.C19]
- Issue #620 "Make .claudeignore set ignorePatterns by default" **CLOSED AS NOT PLANNED** [R4.C20] - Anthropic nie chce tego zachowania
- Exact version/date of deprecation cited '**v2.0.8**' but unverified from primary source [R4.C22]

To potwierdza K4 thesis: Anthropic celowo oddala Claude Code od strict file access control jako core feature. **Rezultat state-of-the-world 2026-04-17:** brak oficjalnej twardej blokady replacement.

### Read/Grep/Glob NIE blokowane przez .claudeignore natywnie

**KRYTYCZNE ustalenie:** Files matching .claudeignore patterns sa excluded from **automatic context loading**, ale **Read/Grep/Glob tools nie sa blocked** natywnie [R4.C7, R4.C8]. Files **still exist on filesystem and remain discoverable**.

Per CodeSignal docs: "'.claudeignore' doesn't make files invisible to Claude's filesystem tools" [R4.C7].

Tool behavior table [R4.C8]:

| Tool | .claudeignore effect |
|------|---------------------|
| Grep | NOT blocked |
| Glob | NOT blocked |
| Read | NOT blocked (model can request and get file) |

**Odpowiedni problem z `.gitignore`:** patterns sa respected **tylko w initial context snapshot**, nie w tool-level calls [R4.C11]. Initial directory snapshot skips gitignore patterns - so gitignored files **don't appear in startup context**. But Read/Grep/Glob do NOT reliably respect .gitignore. Multiple GitHub issues confirming this inconsistency: #12102, #26286, #22429.

**Scenario A** [R4.C26]: File in .gitignore but NOT in .claudeignore -> **File NOT excluded from Read/Grep/Glob tool access, NOT in initial snapshot**. Ergo: gitignore nie chroni przed ad-hoc tool calls.

**Scenario D** [R4.C27]: File in permissions.deny but NOT in .claudeignore -> **Hard blocked from Read/Grep/Glob (best-effort), still visible in file listings**. Ergo: permissions.deny chroni przed Read ale nie przed "ls".

**node_modules:** NOT reliably auto-excluded by default [R4.C12]. Issues #166, #187 pokazuja ze w early versions nie bylo excluded; behavior **inconsistent** across versions. Prosta zasada "node_modules jest ignorowane" nie jest prawdziwa.

### 3 community tools (state-of-the-world 2026)

**li-zhixin/claude-ignore (PreToolUse hook)** [R4.C14, R4.C29 confidence 0.85]:

- Hard block na Read przez PreToolUse hook
- Grep/Glob NOT covered unless separately hooked
- Coverage gap: single tool hook, nie comprehensive

**pg-creative/claudeignore (Pattern Converter)** [R4.C15, R4.C29 confidence 0.85]:

- Converts .claudeignore patterns to permissions.deny rules in settings.json
- **Each pattern generates 3 deny rules: Read, Glob, Grep**
- To jest najbardziej comprehensive approach - wykorzystuje native permissions
- Negation patterns explicitly unsupported [R4.C4]

**yurekami/claude-agentignore (3-Tier Enforcement)** [R4.C16, R4.C29 confidence 0.80]:

- `@ban`: blocks read AND write, agent dostaje explicit "banned" message
- `@exclude`: blocks read AND write, agent dostaje "File not found" (stealth protection)
- Unique UX - rozroznienie explicit vs stealth block

**SYNTHESIS recommendation:** pg-creative/claudeignore jest najbezpieczniejszym defaultem bo generuje native permissions.deny rules (wykorzystuje mechanizm ktory Anthropic faktycznie wspiera). li-zhixin jest prostszy ale pokrywa tylko Read. yurekami dla zaawansowanych use cases wymagajacych stealth.

### Security concerns (The Register, Jan 2026)

"The Register reported in January 2026 that Claude Code ignore rules fail to protect secrets despite .claudeignore and .gitignore" [R4.C17]. Dokumentowane failures:

1. `.claudeignore` - Claude claimed it worked 'like .gitignore' but read .env files anyway
2. Model prompted to override its own context instructions
3. Bash tool bypass: `cat .env` via Bash tool not blocked [R4.C10] - separate deny rule needed

**`.claudeignore` to hint, nie security boundary** [R4.C18]. Root cause: permission system applies to tool calls from the model, **but the model can be prompted to override its own context instructions**.

### Gaps (pozostale)

- Native vs hook-based: niejasne czy `.claudeignore` ma native parser w Claude Code binary, czy tylko dziala przez community hooks [R4.C24]
- Subdirectory `.claudeignore` behavior untested [R4.C23] - claimed supported ale niedokumentowane
- Glob/Grep coverage: whether `.claudeignore` natively affects Glob/Grep jest undocumented [R4.C25]
- ignorePatterns deprecation exact version/date unverified primary source [R4.C22]

---

## Part 6 - Anti-patterns + Sesja Failures

Context engineering to **niemalze w 100% negative space discipline** - wiekszosc zysku pochodzi nie z robienia czegos dodatkowego, tylko z **niepopelniania anti-patternow ktore potrafia spalic 10-20x tokens niepotrzebnie**. R6 systematyzuje 10 glownych AP + 5 case studies. SYNTHESIS przedstawia hierarchie severity + live threats.

### Top 10 anti-patterns

**AP-01: Bloated CLAUDE.md** [R6.C1-C3]

- Official limit: 40 KB / ~40,000 znakow = warning o degradacji po przekroczeniu
- Typowy przegladany plik: 4,847+ linii, 10,847 tokens - **tylko 7.4% relewantne per sesja**
- 10,000-token CLAUDE.md = **5,000 tokens zmarnowanych per turn** (duplicaty, stare zasady)
- Remedium: split into domain-specific files (policies.md, wot.md, queries.md), <500 linii target

**AP-02: Recursive/Circular @imports** [R6.C6, R6.C22]

- Skill files importujace sie wzajemnie: loader wykrywa cykl ("currently loading" set) i rzuca "Circular dependency detected"
- Transitive bloat: lancuchy A -> B -> C -> D bez cyklu, kazdy wezel dodatkowe tokeny
- Remedium: flat skill architecture, depth <=2, explicit imports tylko na `@imports:` directive

**AP-03: MCP Response Size Bomb / Tool Schema Bomb** [R6.C7, R6.C8, R6.C12]

- 167 narzedzi MCP = **191,300 tokenow overheadu przed pierwszym promptem**
- MCP_DOCKER (135) + chrome-devtools (26) = 144,802 tokens tool definitions alone (GitHub #12241)
- 50-tool setup = 72,000 tokens schema overhead na starcie (PRZED userem promptem)
- Remedium: Tool Search (46.9% redukcja [R6.C13] / 85% [R5.C12]), disable unused MCP servers

**AP-04: Read bez offset/limit** [R6.C9]

- 10,000-line log file stays in context for **every** subsequent message in session
- Redundantne wczytanie: worst case 33 wczytania tego samego pliku = **561K tokenow zmarnowanych**
- Remedium: **zawsze** `head_limit` na Read, Grep z `head_limit`, target-fragment reading zamiast whole file

**AP-05: Niekontrolowany Bash Output** [R6.C14, R6.C28]

- `rg pattern .` bez `--max-count`, `find /` bez `-maxdepth`, `cat large_file`, `npm install` verbose, `docker logs container` full history
- Output przekracza 30,000 znakow = 7,500+ tokens w jednym call
- "Most agent token waste comes from uncontrolled discovery. Claude lists directories, opens files speculatively, greps vaguely, then repeats."
- Remedium: explicit limits, `head -50`, `tail -100`, `| head`, `--max-count=20`

**AP-06: Context Rot** [R6.C4, R6.C5, R6.C15]

- **KRYTYCZNE FINDING:** Claude's quality starts slipping at **20-40% of context capacity. Not at 100%. Not at 80%**
- Peak performance 0-20% fill, quality begins slipping 20-40% fill, significant degradation 40%+
- **Real-world benchmark:** Task ktory zajmuje 4.5 minuty przez manual Claude Chat - **18 minut w zdegradowanej dlugiej sesji Claude Code**. Sesja turn 50: 134,800 tokenow, **tylko 25,000 relewantnych (18.5%) - 81.5% to dead weight**
- K3 CRITIC resolution: to NIE jest sprzeczne z 1M context window - rozne warstwy (architectural vs practical quality)
- Remedium: /clear proactively, session per task, <40% fill for complex multi-file work

**AP-07: Autocompact Thrashing** [R6.C16, R6.C25]

- Claude Code wchodzi w petle: kompaktuje -> kontekst natychmiast przepelnia sie ponownie -> kompaktuje znow
- Documented cases: Issue #2283, #34363, #9579, #42647
- Autocompact jest **safe gdy tool outputs sa male, wpada w petle przy duzych (MCP, log files)**
- Remedium: eliminuj large tool outputs u zrodla, ogranicz Read/Bash output rozmiary

**AP-08: Invisible Token Inflation** [R6.C11, R6.C17, R6.C21, R6.C23]

**LIVE THREATS 2026-04-17** (multiple independent bugs):

1. **v2.1.100 (+20K per request, ~40% faster consumption)** [R6.C17]: HTTP proxy analysis, v2.1.98 = 49,726 tokenow, v2.1.100 = 69,922 tokenow. Delta ~40% faster. Status: confirmed przez R6 jako empirical multi-source (efficienist.com HTTP proxy + GitHub issue + buildtolaunch), **not yet confirmed fixed** in pozniejszych wersjach.
2. **GitHub Issue #41930 (`--resume`/`--continue` drain)** [R6.C11]: **652,069 phantom output tokenow** bez user prompts podczas session resume. Pojedynczy "morning" = 15% limitu Max 5x. >300 komentarzy March 2026. **Unsafe as of April 2026** [R6.C26]. Workaround: uzywaj /clear + fresh session + memory injection zamiast --resume.
3. **Billing sentinel string bug** [R6.C21]: Anthropic custom Bun fork robi string replacement na wszystkich requestach API. Billing-related slowa w historii = replacement trafia w zle miejsce = **psuje cache prefix = pelny rebuild = 10-20x inflacja kosztow**. Confidence low (R6 disputed) ale $1,600 incident [R6.C23] potwierdza symptomy. K6 CRITIC: **zgloszenie REAL** na podstawie 3 independent sources.

**SYNTHESIS safety note:** wszystkie 3 sa LIVE threats na 2026-04-17. Workaroundy:

- Unikaj `--resume`/`--continue` dla prac krytycznych kosztowo
- Downgrade do v2.1.99 lub starszej jesli podejrzany cost spike
- Fresh session przy cost spike zamiast kontynuowac

**AP-09: Kitchen Sink Session** [R6.C18, R6.C27, R6.C30]

- Jeden task ("dodaj feature X"), potem unrelated ("jak sie robi Y?"), powrot do X, debugowanie Z
- **Official Anthropic best-practices docs: Kitchen Sink Session to #1 common error** [R6.C30]. Remedium official: `/clear` miedzy niezwiazanymi zadaniami.
- Reddit anecdotal: "Claude Code is usable for ~45 minutes daily" before quota exhaustion w Kitchen Sink sessions [R6.C27]
- Remedium: **session per task doctrine** [R7.C11] - $2.87 -> $0.94 effective cost

**AP-10: Cache Expiry z Idle Gap** [R6.C19, R6.C20]

- Cache prompts expires after ~5 min idle
- Po powrocie usera: **pelny rebuild zamiast cache-read. Mnoznik kosztu: 10x**
- 858-session study: **54% kolejek po idle gap >5 min, ~12.3M tokens zmarnowanych total**
- Remedium: 1h TTL gdzie mozliwe, swiadomy resume vs fresh start decision

### Case studies

**CS-03: Read Tool Session Corruption** [R6.C10]

- User wczytal plik obrazu 8.5 MB via Read
- Sesja **zatruta i uploadowana do chmury Anthropic**
- **WSZYSTKIE nowe sesje w projekcie dziedziczyly zatrute dane**
- Issue #6780
- Lesson: Read tool nie jest przeznaczony do duzych binariow; NEVER read large unverified files

**CS-05: $1,600 Billing Incident** [R6.C23]

- Deweloper describes $1,600 bill od Claude Code API
- Przyczyny:
  1. Pelne wczytywanie repo bez `.claudeignore` (**93% tokens na nierelewantny kod**)
  2. Extended thinking bez ustawionego `MAX_THINKING_TOKENS`
  3. Caching bugs March 2026 z 10-20x inflation

### Context rot threshold conflict (R6.C24)

**R6 sam zglasza konflikt between sources:**

- bswen.com: degradacja przy **20-40%** kontekstu
- MindStudio: degradacja przy **70-75%** kontekstu
- Practical threshold: **147,000-152,000** tokenow

**SYNTHESIS interpretation (consistent z K3 CRITIC):** rozne zadania daja rozne thresholdy. 20-40% dotyczy attention-intensive tasks (complex multi-file reasoning). 70-75% moze byc prawdziwe dla prostego Q&A na dlugim transkrypcie. **Default conservative recommendation: traktuj 40% fill jako warning, 20% jako peak zone**.

### Sub-threshold management: konsekwencje cyfr

Jezeli **quality degraduje przy 20-40%** (R6) a **auto-compact odpala dopiero przy 83.5%** (R3):

- **Istnieje 43-63% okno gdzie model dziala w degradacji bez kompaktowania**
- Uzytkownik widzi "to jeszcze nie full" ale odpowiedzi sa juz slabsze
- Nie ma wizualnej sygnalizacji quality vs capacity
- Context awareness XML (Part 1) pomaga ale tylko na Sonnet/Haiku, nie Opus

**To najwazniejszy insight calej sekcji:** kompakcja NIE jest "quality saver", jest "last resort anti-crash". **Proactive manual /compact przy 60-70% fill** [R7.C8] NIE jest paranoja - to realizm o degradacji.

---

## Part 7 - Power-User Patterns 2026 (session doctrine)

R7 agreguje 10 patternow community-adopted w pierwszym kwartale 2026. Ta sekcja filtruje je przez CRITIC's trust-weights (R7 dostal REVISE - single-source metrics wymagaja asterysku, pattern descriptions sa OK).

### Pattern 1: PROGRESS.md pre-clear checkpoint (Tier 1)

**Najbardziej niezawodny workflow** [R7.C1]: przed osiagnieciem context limit, instruuj Claude zeby zpisal:

- Accomplishments
- Files modified with rationale
- Next 3 steps
- Decisions/constraints

Zapisz do `PROGRESS.md`, potem `/clear`, paste summary back do fresh session.

**Dlaczego dziala:** omija kompaktowanie (ktore gubi who/why [R3.C9]), zachowuje pelna strukture state. Plik przezywa bo jest na dysku, nie w context. Fresh session ma **peak 0-20% fill performance** [R6.C5] i prefix caching zaczyna budowac od nowa bez degraded attention.

### Pattern 2: /handover + HANDOVER.md (Zara Zhang viral)

**Custom slash command /handover** [R7.C2, R7.C23]: generuje HANDOVER.md na koncu sesji capturing:

- Decisions
- Pitfalls  
- Lessons
- Failed approaches (do not repeat)
- Key decisions with rationale
- Current state (working vs broken)
- Resume instructions with numbered steps

**Ekosystem validation** [R7.C3]: plugin repos na github.com/willseltzer/claude-handoff i mcpmarket.com/tools/skills/session-handover - **widely copied pattern**, multiple independent implementations.

**K3 CRITIC flag:** Zara Zhang status ID istnieje, ale exact virality (retweets/views) unmeasured przez Twitter paywall [G3]. **SYNTHESIS framing:** "community-adopted" zamiast "viral".

### Pattern 3: /compact z targeted hint

**Never run bare /compact** [R7.C4]. Always provide context hint:

```
/compact focus on auth refactor, drop test debugging
```

Tells Claude what to preserve vs discard, **prevents critical context loss**. Bez hint compact uzywa default prompt "Write down anything that would be helpful" [R3.C10, R1.C24] - bez user-specific priorities. Z hint model wie co zachowac.

### Pattern 3b: MindBranches session fast rules

**Decision tree dla session state** [R7.C5]:

| Sytuacja | Akcja |
|----------|-------|
| Related follow-up, same working set | Continue |
| New task (unrelated) | `/clear` |
| Wrong path, same task | `/rewind` (Esc Esc) |
| Same task, context getting heavy | `/compact [with hint]` |
| Need lessons from failed branch | `HANDOVER.md` first |

To jest prawdopodobnie najbardziej actionable decision framework w calej kampanii. **Wada (CRITIC):** R7.C5 confidence med, "viral" bez direct engagement metrics [R7 low_confidence_claims]. Ale **pattern sensowny niezaleznie od popularnosci zrodla**.

### Pattern 4: PreCompact hook - full transcript archive

**Hook fires RIGHT BEFORE compaction** [R7.C6], capturing full session transcript do JSON/markdown backup. Extracts:

- User messages
- File modifications (write/edit tool calls)
- Task events
- Sub-agent invocations
- Loaded skills
- MCP tool usage
- Build/test commands

**Implementation key** [R7.C7]: `{"async": true}` **required** - don't slow down compaction. Sync hook = lag on every compact.

**Production evidence** [R3.C21]: tested implementation archived 69,000+ messages across 1,300 sessions w **~1GB SQLite DB z 0 message loss**. To nie jest teoria, to running system.

**Pattern 5: /compact przy 60-70% proactive**

Community consensus: 60-75% jako safe autocompact trigger [R7.C8]. Native settings.json config NIE dostepne - multiple open GitHub issues: #11819, #15719, #25679, #28728, #34126, #46695. Workaround: `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=65`.

**Threshold conflict [R7.C9]:** buildtolaunch 60%, claudefa.st 80%. Rozne zadania roznia sie tolerancja. SYNTHESIS default: **65% aggressive, 75% permissive**. Monitoruj `/context` output.

**Key numbers** [R7.C10]: 33K tokens reserved by auto-compact buffer (non-negotiable). 20% context = quality degradation begin.

### Pattern 6: Session per task doctrine

**"New topic = new chat. No exceptions."** [R7.C11]. Effective session cost drops from **$2.87 to $0.94 average** when switching from long drag-on sessions to focused isolated sessions.

**Additional insight [R7.C12]:** 2-hour session = 2-3 compactions = compounding summary dilution. **Effective high-quality window ~400K of advertised 1M** (Scortier 6852-session study, single-source = flag per CRITIC K3).

**CRITIC flag:** Scortier numerical claims single-source. Direction of finding (degradation przed 100%) validated cross-source przez R6 bswen.com, ale exact "400K effective" single blog study.

### Pattern 7: Plan acceptance auto-clear (native ~2026-02)

**Native Claude Code feature shipped ~2026-02** [R7.C13]: accepting a plan **automatically clears context**, giving plan execution fresh context window.

Boris Cherny (creator): "We found this helps keep Claude on track longer, and significantly improves plan adherence."

To jest architektonicznie wazne: **feature zachca uzytkownika do planning-first approach**. Bez tego duzo userow skakalo od razu do execution z bloated context. Plan-accept-clear robi workflow zgodny z Part 6 AP-06 (context rot) advice bez manual discipline.

### Pattern 8: Tool inventory (automated memory)

**Tool A: claude-mem** [R7.C14, R7.C16]

- 5 lifecycle hooks: SessionStart -> UserPromptSubmit -> PostToolUse -> Summary -> SessionEnd
- SQLite3 DB at `~/.claude-mem/claude-mem.db`
- Worker on Express API port 37777
- **April 2026 backlog: 93 PRs merged into 138 tracking items** (aktywny rozwoj)

**Tool B: claude-memory-compiler** [R7.C15]

- Based on Karpathy LLM Knowledge Base architecture
- Hooks: SessionEnd + PreCompact -> `flush.py` -> daily/YYYY-MM-DD.md -> `compile.py`
- 6 PM auto-compilation
- **No RAG** (structured index outperforms vector at personal scale of 50-500 articles)
- SessionStart hook re-injects compiled index

**CRITIC gap G_benchmark:** No controlled comparison of manual PROGRESS.md vs automated claude-mem effectiveness [R7.C26]. Tool adoption unvalidated empirycznie.

### Pattern 9: Subagent isolation (context firewall)

**Mental test** [R7.C17]: "Will I need this tool output again, or just the conclusion?" If just the conclusion - use a subagent.

**Subagents get fresh 200K context windows; only 1K-2K token summaries return to parent session.** To jest **context firewalling** - tool outputs (silent accumulator [R5.C26]) zostaja w subagent i umieraja z nim.

**Rule of thumb** [R7.C18]: "Anything requiring reading more than 3-4 large files is a solid subagent candidate."

**CRITIC gap G2:** cache inheritance model niejasny. SYNTHESIS safe statement: "subagent isolation daje context window relief (confirmed); cache economics shared-parent-prefix vs cold start unverified (niejasne czy subagent dostaje cache hit na system prompt parenta)".

### Pattern 10: Hybrid manual context management

**Split monolithic CLAUDE.md** [R7.C19] into domain-specific files:

- `policies.md`
- `wot.md` (ways of thinking / ways of working)
- `queries.md`

Session starts with manual summary of "what matters today" before any file reads. **Opening context summary gets highest attention weight** [R7.C20] - "Earlier context is more reliably referenced than context buried in the middle".

**Key findings** [R7.C21]:

- Single research session consumes 100K+ tokens and costs $40-70 - **front-load research into reusable documents**
- Keep CLAUDE.md **under 500 lines (200 lines target)**
- 5K token CLAUDE.md = 5K tokens every single turn

### Default effort HIGH -> MEDIUM gotcha (2026-03-03)

**Underpublicized finding** [R7.C27]: Scortier/Stella Laurenzo study shows **73% reasoning depth decline (2200 -> 600 chars) Jan -> Mar 2026**. Cause: Anthropic silently changed default effort level.

**Power-user workaround:** `CLAUDE_CODE_EFFORT_LEVEL=max` dla complex tasks [R7.C27]. To jest **underpublicized ale important finding** - nie jest widely advertised w oficjalnych docs.

Dodatkowa env var [R7.C28]: `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` jako workaround dla zero-reasoning bug.

**CRITIC flag:** Scortier single-source. SYNTHESIS framing: "community-reported regression", uruchom wlasny A/B test dla krytycznych workflows.

### Ekosystem health

**awesome-claude-code-toolkit (rohitg00)** [R7.C29]: 135 agents + 176 plugins + 20 hooks - ACTIVE. To jest pojedyncze zrodlo prawdy dla community registry. Claude Code ma aktywny ekosystem podobny do Neovim/Emacs package managers - plugins, hooks, agents.

### Naming fragmentation (R7.C24)

**Trzy konkurencyjne konwencje dla pre-compaction saves:**

- `HANDOVER.md` (Zara Zhang, mcpmarket plugins)
- `SESSION-NOTES.md` (niezalezne convention)
- `PROGRESS.md` (Claude.md best practices blog)

**Brak canonical winner = community fragmentation** [R7.C24]. SYNTHESIS **wybiera canonical:** `PROGRESS.md` dla in-session checkpoints (mniejsza, krotsza), `HANDOVER.md` dla session-end (pelniejsza, dla next-session resume). Niektorzy uzywaja obu roznoczesnie.

### Syntetyczna session doctrine (canonical flow)

```
Session start
  -> load .claudeignore + minimal CLAUDE.md (policies.md + active query)
  -> /model sonnet-4.6 (lub opus-4.7 dla complex reasoning)
  -> 0-40% fill: pracuj normalnie
  -> 40-60% fill: zaczynaj myslec o PROGRESS.md
  -> 60-70% fill: /compact "focus on [current task], drop [noise]"
  -> 70-85% fill: napisz HANDOVER.md, /clear, resume w nowej sesji
  -> Nie polegaj na auto-compact (thrashing risk, quality loss)
  -> Po idle >5 min: fresh session zamiast --resume (R6.C26 unsafe)
```

**NIGDY:**
- `--resume` / `--continue` w tym okresie (phantom 652K tokenow)
- Bare `/compact` bez hint
- Read duzych binariow bez offset/limit
- Mixing unrelated tasks w jednej sesji (Kitchen Sink)

---

## Appendix A - Decision Guides

### A.1 Kiedy uzyc 5m vs 1h cache

**Scenariusz 1: Krotka sesja badawcza (5-15 min)**
- **Wybor:** 5m TTL
- **Uzasadnienie:** Break-even 2 hity [R2.C4], sesja zmiesci sie w 5m bez idle
- **Koszt:** write 1.25x base + 2-3 reads 0.1x kazdy = ~50-70% savings

**Scenariusz 2: Active coding 1-3h bez przerw**
- **Wybor:** 5m TTL (w praktyce warm przez Claude Code auto 5m)
- **Uzasadnienie:** Kazdy hit resetuje timer [R2.C11] - aktywna sesja trzyma cache indefinitely
- **Uwaga:** jezeli idle >5 min = 10x rebuild cost [R6.C19]

**Scenariusz 3: Praca z przerwami (email, meeting), sesja >1h**
- **Wybor:** 1h TTL (jezeli API direct, nie Bedrock)
- **Uzasadnienie:** Scenariusz 100-turn 60K prefix: 1h cache $2.38 vs 5m $8.94 vs no-cache $18 [R2.C19]
- **Blocker:** Bedrock hardcoduje 5m, workaround przez ENABLE_PROMPT_CACHING_1H_BEDROCK [R2.C12]

**Scenariusz 4: Batch processing**
- **Wybor:** Batch API + cache
- **Uzasadnienie:** mnozniki sie mnoza: 0.5x * 0.1x = 0.05x = 95% savings [R2.C20]
- **Wykluczenie:** nie dla Managed Agents (stateful)

**Scenariusz 5: Model switching mid-session**
- **Wybor:** unikaj
- **Uzasadnienie:** `/model` command invaliduje CALY cache [R2.C13], kazdy model ma izolowany cache

### A.2 Kiedy /compact vs /clear vs /resume

**Decision tree:**

```
Stan: potrzeba oswiezyc context
|
+- Kontynuacja tego samego taska?
|   |
|   +- TAK, same working set -> Continue (dont compact yet)
|   |
|   +- TAK, context heavy (60-70%) -> /compact z hint ("focus X, drop Y")
|   |
|   +- NIE (new topic) -> /clear (bo Kitchen Sink to #1 AP [R6.C30])
|
+- Wrong path ten sam task?
|   +- /rewind (Esc Esc)
|
+- Potrzebny context z session ktorej nie ma
|   |
|   +- Ta sama sesja? --resume [UNSAFE as of April 2026 - R6.C26]
|   |
|   +- Byla HANDOVER.md? -> fresh session + paste HANDOVER
|   |
|   +- Brak HANDOVER -> fresh session, manual retrieval z /recap [R3.C25]
```

**Unikaj:**
- Bare `/compact` (bez hint) [R7.C4]
- `--resume` / `--continue` na session co miala billing-related content [R6.C21, R6.C26]
- /compact przy >85% fill (conversation too long failure [R3.C15])

### A.3 Jak strukturyzowac CLAUDE.md per-tier

**Tier 1: Global `~/.claude/CLAUDE.md`**
- **Target:** <500 tokens [R5.C16]
- **Content:** user preferences (lang, no-em-dash, communication style), routing instruction do Preset Catalog (jak w Agent_Architecture), tool allowlists
- **Pamietaj:** ten plik laduje sie **KAZDA sesja** dla kazdego projektu = plac za niego w kazdej konwersacji
- **Przyklad dobry:** 320 tokens (R1 startup table)
- **Przyklad zly:** 10K tokens = 5K zmarnowanych per turn [R6.C3]

**Tier 2: Project `./CLAUDE.md`**
- **Target:** <200 linii (idealny), <500 linii (max), ~1800 tokens [R1.C16 project tier]
- **Content:** "What is this project" (1-2 zdania), "Current version" (wersja + link do spec), "File map" (3-5 kluczowych plikow), link do docs/
- **Zasada 7.4%:** jezeli wiecej niz 7.4% tego zawarsu okazuje sie irrelevant per typowa sesja [R6.C2], jest bloated
- **Remedium dla duzych projektow:** split na domain-specific files + lazy-load przez tool czytanie

**Tier 3: Subfolder `./subdir/CLAUDE.md`**
- **Content:** kontekst-specyficzne dla podfolderu (frontend/, backend/, tests/)
- **Auto-load:** tak, ale tylko dla plikow IN that subtree (TBC - gap R4.C23)
- **Uwaga:** hierarchical loading powoduje ze przy otworzeniu `frontend/App.tsx` system moze zaladowac project CLAUDE.md + frontend CLAUDE.md - sumuja sie

**Hybrid manual approach** [R7.C19]:

Zamiast monolithic CLAUDE.md:

```
~/.claude/CLAUDE.md           # <500 tokens: user-wide
./CLAUDE.md                   # <200 linii: project core
./docs/policies.md            # load on-demand: style, conventions
./docs/wot.md                 # load on-demand: ways of working
./docs/queries.md             # load on-demand: frequent questions
./docs/architecture.md        # load on-demand: deep arch
```

Session starts z `./CLAUDE.md` only. User lub agent explicitly ciagnie `docs/policies.md` gdy potrzebny. Reszta = lazy.

---

## Appendix B - Kontrowersje (z CRITIC)

### K1: Skill loading - 61 tokens vs 50,000 tokens (800x rozbieznosc)

**Strony:**
- R5/wmedia.es: /context pokazuje "Skills: 61 tokens" przy lean setupie (frontmatter-only)
- R5/GitHub #14882: user reportuje 50,000+ tokens przy pluginach, z per-skill 3,900-5,500 kazdy

**Rozstrzygniecie:** **OBIE WARTOSCI SA PRAWDZIWE, dla roznych konfiguracji.**

- Standalone skill w `~/.claude/skills/*.md`: **~61-100 tokens frontmatter** dopoki nie invoked (progressive disclosure intended design dziala poprawnie)
- Pluginowy skill (claude-plugin package): **3,000-6,000 tokens od razu** (plugin loader laduje pelne body na starcie, progressive disclosure NIE dziala tu)
- Przy wielu pluginach: linear sum = **50K+ tokens**

Issue #14882 zamkniete bez clear answer od Anthropic. SYNTHESIS: standalone = frontmatter-only; plugin = full body. **Confidence rozstrzygniecia:** medium (mechanizm wyjasniony, brak Anthropic confirmation).

### K2: Auto-compact threshold (4 znaczenia, nie konflikt)

**Strony:**
- R1 docs: "~95% capacity" (code.claude.com verbatim)
- R3 empiryk: ~83.5% effective (po odjeciu 33K hardcoded buffer)
- R6 community: 20-40% = quality degradation
- R7 community: 60-80% = proactive /compact recommendation

**Rozstrzygniecie:** **NIE JEST to prawdziwy konflikt - 4 rozne pojecia pod jednym nazwiskiem:**

1. **Nominal trigger = 95%** (R1 correct) - `used_percentage` status line reference
2. **Effective trigger = 83.5%** (R3 correct) - 95% * (200K - 33K) / 200K = 83.5%. Konsystentne z R1.
3. **Quality degradation = 20-40%** (R6 correct) - attention diffusion, NIE kompakcja
4. **Proactive recommendation = 60-80%** (R7 correct) - user-recommended manual /compact

Wszystkie cztery prawdziwe w swoich kontekstach. SYNTHESIS uzywa tych nazw konsekwentnie. **Confidence:** high (matematyka sie zgadza).

### K3: Effective 1M context window (theoretical vs practical)

**Strony:**
- R1 docs: 1M GA dla Opus 4.7, Opus 4.6, Sonnet 4.6 od 2026-03-13, standard pricing
- R7 Scortier study (6852-session): efektywne high-quality window ~300-400K
- R6 bswen.com: degradation begins 20-40% fill

**Rozstrzygniecie:** **BRAK PRAWDZIWEGO KONFLIKTU - rozne warstwy:**

- **Architectural context window** (R1): ile tokenow API bezbladnie przyjmie = 1M
- **Practical quality-preserving window** (R6/R7): ile tokenow model utrzymuje w attention skutecznie = ~300-400K dla complex tasks

Analogia: CPU 5 GHz ale nie kazda instrukcja w 1 cyklu. SYNTHESIS: "1M = max; praktyczny sweet spot 300-400K". **Confidence:** medium (Scortier n=6852 solidny ale jedyne primary empirical; bswen.com potwierdza z innej metodologii).

### K4: .claudeignore - soft-hint czy native Anthropic feature?

**Strony:**
- R4 jawny GAP: "Official Claude Code documentation does NOT have a dedicated .claudeignore page"
- R4 community implementations: 3 tools (li-zhixin, pg-creative, yurekami) - NIE native support, workaround
- R1, R5: nie wspominaja o `.claudeignore` (potwierdzenie gap)
- R6: zaklada ze dziala ("93-99% tokens zmarnowane bez .claudeignore")

**Rozstrzygniecie:** R4 MA RACJE co do GAP. **Model konceptualny soft-hint vs permissions.deny JEST prawdziwy:**

- `.claudeignore` = community convention + model instruction (soft-hint)
- `permissions.deny` = native hard-block (best-effort Read/Grep/Glob, NIE Bash)
- Sandbox = ultimate hierarchy level (blocks all)

**Rekomendacje rozdzielone:**
- **Token optimization:** `.claudeignore` + pg-creative converter (generuje permissions.deny rules)
- **Security:** permissions.deny + sandboxing

**Confidence:** high (R4 sam zglasza gap, cross-validated przez silence w R1/R5).

### K5: 1h cache TTL - enterprise-only czy GA?

**Strony:**
- R2 current: "1h TTL Generally Available, nie wymaga beta headera od 2025"
- R2 historical: starsze zrodla twierdzily enterprise/beta only
- R2 Bedrock: ENABLE_PROMPT_CACHING_1H_BEDROCK istnieje ale hardcoded 5m w CLI (Issue #32671 confirms)
- R2 Claude Code Max: potwierdzono 1h cache

**Rozstrzygniecie:** **1h TTL stalo sie GA. Historyczne zrodla byly prawdziwe w swoim czasie.**

Timeline rekonstruowany:
1. Wczesne 2024: 1h beta-only
2. 2025: GA dla API direct
3. 2026: GA dla Claude Code Max (confirmed)
4. Bedrock: nadal hardcoded 5m mimo backend support (undocumented env var workaround)

SYNTHESIS: 1h GA dla API i Claude Code Max; Bedrock workaround przez env var.

**Confidence:** medium-high (pricing page verbatim; exact GA date nieudokumentowany).

### K6: v2.1.100 invisible token inflation - realna czy pojedyncze?

**Strony:**
- R6 efficienist.com: +20K per request, HTTP proxy (v2.1.98 = 49,726 vs v2.1.100 = 69,922)
- R6 GitHub #41930: --resume 652,069 phantom tokens, >300 komentarzy March 2026
- R6 buildtolaunch: $1,600 billing incident, "10-20x inflation"
- R5 dev.to/slima4: "compaction summaries 11-19k" (related ale nie delta)
- R3: nie komentuje v2.1.100 bezposrednio
- R7: NIE wspomina v2.1.100 (zaskakujaca luka)

**Rozstrzygniecie:** **INFLACJA POTWIERDZONA przez 3 niezalezne zrodla.**

- Efficienist methodology (HTTP proxy diff) = reproducible
- Issue #41930 >300 komentarzy = community validation
- buildtolaunch $1,600 = one developer, weaker ale corroborates

R7 gap w podnoszeniu tego jest **luka R7** (viral finding March 2026 nie zauwazona przez community researcher). SYNTHESIS: zgloszenie **REAL**. Workaround = downgrade lub unikaj `--resume`/`--continue`. **Status fix: nieznany** - wymaga delta-research.

**Confidence:** medium-high (multi-source, brak Anthropic postmortem).

---

## Appendix C - Gaps + Safety Notes

### Gaps wymagajace delta research

**G1: Algorytm /compact selekcji "co zachowac"**

- **Severity:** HIGH
- **Status:** R1 i R3 zgadzaja ze to **black box**. Docs cytuje "requests i key code snippets preserved; detailed instructions from early may be lost" - brak formalnej specyfikacji.
- **CLI vs API prompt:** R3 dostarcza DEFAULT prompt template (API-level) ale sam zglasza ze **CLI moze uzywac innego wewnetrznego promptu**
- **Impact:** uniemozliwia doradzenie uzytkownikowi "co zrob zeby X przetrwalo kompakcje" poza prostym "dodaj Compact Instructions do CLAUDE.md"
- **Workaround:** CLAUDE.md + Compact Instructions section jako pierwsza defensywa; MEMORY.md/PROGRESS.md jako external persistence (survives kompakcji 100% bo to dysk)

**G2: Subagent cache inheritance model**

- **Severity:** MEDIUM
- **Status:** R2 explicit gap: "czy subagenty dziela cache z parentem - niejasne". R7 Pattern 9 mowi "fresh 200K context windows" ale nie wyjasnia czy cache parent prefix jest inherited. R5 gap #6: jak tokeny subagentow licza sie w /context i /cost parenta?
- **Impact:** Rekomendacje "deleguj do subagent dla context firewall" poprawne ogolnie, ale prawdziwa oszczednosc zalezy od cache model
- **SYNTHESIS statement:** "subagent isolation = context window relief (confirmed); cache economics niezweryfikowane - delta-research przed production rekomendacja"

**G3: X/Twitter engagement metrics (paywall)**

- **Severity:** MEDIUM-LOW
- **Status:** Direct fetch blocked (402). Metryki "790K views" (bcherny thread), viral claims (zarazhangrui /handover) - secondhand
- **Impact:** Twitter-first patterns (PROGRESS.md, /handover, /compact with hint) maja cross-validation via blogs/GitHub (OK), ale "viral" hype wymaga asterysku
- **SYNTHESIS framing:** "community-adopted" zamiast "viral"; cross-sources primary, Twitter secondary signal

**G4: Managed MCP vs regular MCP - pricing/cache ratio**

- **Severity:** LOW-MEDIUM
- **Status:** R1 cytuje "Context window is managed by the runtime" bez szczegolow dla Managed Agents. R5 nie mierzy. R2 omawia cache dla standard API ale nie Managed. **Nikt nie zadal tego pytania.**
- **Impact:** Jesli kampania dotyczy Managed Agents - delta-research. Jesli tylko standalone Claude Code + API - gap mniej krytyczny.
- **SYNTHESIS:** flag as out-of-scope for standalone Claude Code users

**G5: Dokladny compaction buffer na 1M context window**

- **Severity:** MEDIUM
- **Status:** R3 Issue #34126 "Per-model configurable autocompact threshold" OPEN dla 1M use case. Issue #34363: "v2.1.76 bufor dla 1M okna aplikowany do 200k = natychmiastowy loop po starcie". Jak 33K buffer scaluje na 1M? Liniowo (~165K) czy constant (33K, 3.3%)?
- **Impact:** Uzytkownicy Opus 4.7 / Sonnet 4.6 z 1M oknem nie maja deterministycznej odpowiedzi "kiedy zacznie sie compaction"
- **SYNTHESIS:** na 1M context - buffer scaling nieudokumentowany, monitoruj /context, uzywaj `CLAUDE_CODE_AUTO_COMPACT_WINDOW` dla deterministic behavior

### Live threats 2026-04-17 (safety notes)

**THREAT 1: v2.1.100 invisible token inflation (+20K per request)**

- **Source:** R6.C17 (efficienist.com HTTP proxy), corroborated by GitHub activity
- **Magnitude:** +20K tokens per request, ~40% faster consumption rate
- **Workaround:** downgrade to v2.1.99 lub earlier, monitoruj token usage via /cost
- **Status fix:** **nieznany** - delta research required

**THREAT 2: GitHub Issue #41930 resume/continue drain**

- **Source:** R6.C11 (GitHub Issue, >300 komentarzy)
- **Magnitude:** 652,069 phantom output tokens bez user prompts. Pojedynczy "morning" = 15% Max 5x limit
- **Workaround:** **unikaj `--resume` i `--continue`** - uzywaj fresh session + HANDOVER.md paste
- **Status fix:** **aktywne** jako 2026-04-17 per R6.C26

**THREAT 3: Billing sentinel string cache invalidation**

- **Source:** R6.C21 (single blog, confidence low), corroborated by R6.C23 ($1,600 incident)
- **Magnitude:** 10-20x cost inflation when billing-related strings appear w conversation history
- **Workaround:** unikaj billing/pricing discussions mid-session; fresh session przy nieuzasadnionym cost spike
- **Status fix:** disputed existence, ale zgloszeni users raportuja problem

**THREAT 4: TTL regression March 2026 (related to THREAT 3)**

- **Status:** powiazane z sentinel string bug; cache prefix break = 10x rebuild
- **Detection:** monitor `usage.cache_read_input_tokens` vs expected w API response - spadek do 0 = cache broken
- **Workaround:** fresh session, swiadomy monitoring

**THREAT 5: CLAUDE_AUTOCOMPACT_PCT_OVERRIDE silently ignored**

- **Source:** R3.C26, GitHub #18843, #36381
- **Magnitude:** sesje przekraczaja threshold bez triggerowania compactu
- **Workaround:** dodaj `CLAUDE_CODE_AUTO_COMPACT_WINDOW` jako secondary control
- **Status:** bug nie fixed

**THREAT 6: /context display wrong buffer info**

- **Source:** R3.C28
- **Magnitude:** `/context` pokazuje default buffer (~33K) nawet gdy override aktywny = misleading UI
- **Workaround:** nie polegaj na /context buffer display dla confirmation override took effect

### Priority priorytyzacja delta research (jesli budget pozwala)

- **HIGH:** G2 subagent cache inheritance - bezposredni wplyw na cost architecture
- **HIGH:** K6/THREAT 1 - czy v2.1.100 inflation jest fixed w pozniejszych wersjach
- **MEDIUM:** G1 /compact selection algorithm empirical test
- **LOW:** G4 Managed MCP (out-of-scope jesli tylko Claude Code CLI)

---

## Sources

- R1/E1 - docs_primary (Anthropic official docs)
- R2/E2 - caching_deep
- R3/E3 - compact_mechanics
- R4/E4 - claudeignore
- R5/E5 - token_accounting
- R6/E6 - antipatterns
- R7/E7 - community_patterns

---

END SYNTHESIS
