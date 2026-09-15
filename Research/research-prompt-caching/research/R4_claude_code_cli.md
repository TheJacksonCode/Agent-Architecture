# R4 - Claude Code CLI Caching (2026)

**Researcher:** GitHub (issues, source code observations, PR discussions, Piebald-AI system prompts dump)
**Data raportu:** 2026-04-17
**Zakres:** jak Claude Code uzywa cache (system prompt, tools, CLAUDE.md), /compact behavior, /clear behavior, <system-reminder> mechanism, cache hit rates, inne bugs 2026, zachowanie --continue / --resume.

## Summary

Claude Code CLI (dalej CCh) wykorzystuje prompt caching **bardzo agresywnie** - automatycznie cache'uje **4 warstwy prefiksu** w kazdym requestcie: (1) system prompt (~4000 tokenow, identyczny dla wszystkich userow tej samej wersji), (2) tool definitions (~10+ builtin tools, plus dynamicznie zarejestrowane MCP), (3) CLAUDE.md (per-project, rzadko sie zmienia), (4) conversation history az do najnowszych wiadomosci. Dynamic boundary (marker `__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__`) rozdziela prompt na dwie czesci z roznym cache behavior.

Uzytkownik **NIE musi nic konfigurowac** - CCh automatycznie wstawia breakpointy i dziala on the fly. Obserwowane cache hit rate dla typowej sesji to **96%**, co tlumaczy dlaczego Claude Code Pro Plan za $20/miesiac jest ekonomicznie wykonalny (100-turn session kosztuje $10-19 zamiast $50-100).

Dynamiczne dane (currentDate, user email, git status) wplywane sa poprzez mechanizm `<system-reminder>` XML tagow w messages array - NIE w system promptcie. To pozwala keep system prompt frozen i cacheable, a update'y ida przez non-cacheable messages. Oznacza ze **zmiana CLAUDE.md inwaliduje cache** (bo jest w cacheable slot), ale zmiana daty nie (bo jest w system-reminder).

Operacje ktore BREAK cache:
- `/compact` - semantic break, prefiks pre-compaction guaranteed stale (dokumentacja v2.1.62 regression)
- `/resume` lub `--continue` - bug w niektorych wersjach powoduje pelny rebuild 400-500k tokens (Issue #42338)
- Dodanie/usuniecie MCP tool w sesji (kasuje tools layer)
- Zmiana modelu mid-session (Opus -> Sonnet = pelny rebuild)
- Plik edit ktory zmienia CLAUDE.md (uniewaznia CLAUDE.md layer i nizej)

Obserwacje community z marca-kwietnia 2026 wskazuja na serie regresji cache behavior (v2.1.62, v2.1.89, v2.1.100, v2.1.89+), ktore spowodowaly znaczne skargi Max Plan userow o wyczerpanie quota w 70 minut zamiast 8 godzin.

## Details

### 1. Architektura cache w Claude Code - 4 warstwy

Piebald-AI reverse-engineered Claude Code system prompts ([github.com/Piebald-AI/claude-code-system-prompts](https://github.com/Piebald-AI/claude-code-system-prompts)) i udokumentowal nastepujaca strukture:

**Layer 1: System prompt (~4000 tokenow)**
- Identyczny dla wszystkich userow tej samej wersji CCh
- Zawiera: role definition, tool use rules, security rules, git workflow rules, komunikacyjne zasady
- Dzielony na dwie polowki przez `__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__`:
  - **Static half:** rules, tool conventions, general guidance - cacheowane stabilnie
  - **Dynamic half:** Uses a registry of computed values. Cached do `/clear` lub `/compact`

**Layer 2: Tool definitions**
- 24 builtin tools (Read, Write, Edit, Bash, Grep, Glob, WebSearch, WebFetch, Task, TodoWrite, NotebookEdit, itd.)
- MCP tools dodane przez user config (`.claude/mcp.json`, `~/.claude.json`)
- Kazdy tool to ~100-500 tokenow definicji (description + JSON schema)
- Sumarycznie: 5000-15000 tokenow tools payload
- **Invalidation trigger:** dodanie lub usuniecie tool, zmiana description - pelny rebuild

**Layer 3: CLAUDE.md (user + project combined)**
- `~/.claude/CLAUDE.md` (global user memory)
- `<project_root>/CLAUDE.md` (project-specific)
- Imported plikow przez `@path/to/file.md` dyrektywe
- Rozmiar: 1000-10000 tokenow typowo (5000 "czesta"). Zlozone projekty: 20000+.
- **Invalidation trigger:** kazda zmiana pliku CLAUDE.md, kazdy save

**Layer 4: Conversation history**
- Historia messages (user turns + assistant turns + tool_use + tool_result)
- Najdluzsza warstwa w dlugiej sesji - moze przekroczyc 500k tokenow
- Cache breakpoint porusza sie do przodu z kazda tura (automatic caching)

Przed requestem tworzony jest payload:
```
[tools_array]
[system_prompt_static_half + __DYNAMIC_BOUNDARY__ + system_prompt_dynamic_half]
[user_CLAUDE_md + project_CLAUDE_md]
[message_history_with_system_reminders]
[CURRENT_USER_INPUT]
```

Cache_control ustawiony automatycznie z przesuwajacym sie breakpointem.

### 2. Zachowanie cache - 96% hit rate

Observed empirically: "Real Claude Code sessions achieve 96% cache hit rates through aggressive multi-layer caching. A 100-turn session costs approximately '$10-19' instead of '$50-100' without caching."

Interpretacja:
- Turn 1: pelny write. Wszystko (system + tools + CLAUDE.md + first message) napisane.
- Turn 2: 96% cache read (prefiks utrzymany), 4% write (nowa wiadomosc user + odpowiedz assistant bedzie breakpoint forward)
- Turn 100: wciaz 96% cache read. Wszystko pre-CURRENT_INPUT jest cache hit.

**Warunek zachowania 96%:**
- Sesja continuous, requesty co <5min (5m TTL nie wygasa dzieki refresh on use)
- Brak MCP tool changes
- Brak file edit w CLAUDE.md
- Brak model switch
- Brak /compact ani /clear

W praktyce te warunki sa czesto lamane (developer edituje CLAUDE.md, dodaje plugin), dlatego REAL cache hit rate waha sie 70-96%.

### 3. `<system-reminder>` mechanism

Magia CCh: dynamic context bez lamania cache.

Zamiast wstawiac daty, nazwiska uzytkownika, git status do system prompta (co bylo by invalidatorem cache), CCh injectuje je jako XML tagi w messages array. Przyklad z reverse-engineering:

```
<system-reminder>
# currentDate
Today's date is 2026-04-17.
# userEmail
The user's email address is user@example.com.
# gitStatus
Current branch: master
...
</system-reminder>
```

Ten blok pojawia sie W WIADOMOSCI USER, nie w system. System promp zostaje staly (cacheable), a dynamic info jest w messages (nowa kazdego requestu, stopniowo cacheowana razem z reszta konwersacji).

Model traktuje `<system-reminder>` jako high-priority context ("These instructions OVERRIDE any default behavior"), ale technicznie jest to regular message content.

To sprytny pattern ktorego mozesz uzyc we wlasnej aplikacji: wszelkie dynamic context (user info, timestamp, feature flags) wrzucaj jako messages content, nie do system prompt.

### 4. `/compact` behavior i bug history

`/compact` to komenda CCh ktora redukuje conversation history do summary, zachowujac system + tools + CLAUDE.md. Intencja: pozwolic kontynuowac dluga sesje bez context window overflow.

**Intended behavior:**
- Kompaktuj messages history do summary
- Zachowaj cache dla system + tools + CLAUDE.md (18k tokenow)
- Zwolnij ~80% context window

**Actual behavior pre-v2.1.62:**
- Cache breakpoint po compaction przesuwa sie do nowego miejsca
- Stare conversation messages (pre-summary) wyrzucone, ale cache kluczy je wciaz hit jesli przybysz ze starym prefiksem
- **Regression (Issue #29230):** v2.1.62 wprowadzil server-side KV cache invalidation bug - model dostawal stale context. Fixed w kolejnej wersji, ale nauka: cache w CCh jest NIE pewny po compaction.

**Official guidance post-fix:**
"Context compaction replaces conversation history with a summary - a hard semantic break. Any prefix cached before compaction is guaranteed stale after it."

Czyli po /compact **nie liczysz na cache** starych wiadomosci. Ale system + tools + CLAUDE.md prefix JEST zachowany (18k tokenow cache hit, co stanowi duza oszczednosc mimo ze conversation history musi sie od nowa pisac).

### 5. `/clear` behavior

`/clear` to "new session" - czysci conversation history ale zachowuje CLAUDE.md i settings.

**Cache impact:**
- Conversation history cleared -> cache dla messages layer invalidated
- System prompt + tools + CLAUDE.md layer ZACHOWANE przez TTL (5m lub 1h jesli explicitly set)
- Jezeli nastepny request w tym samym 5m TTL okienku, trafi na cache (18k tokens bezplatnie)
- Po 5m TTL, caly cache expires

**Praktyka:** `/clear` dobre dla rotacji tematow w ramach sesji bez placenia za full rebuild. Jezeli nastepny temat jest w ciagu 5m, zaoszczedzasz pewna kwote.

### 6. `/resume` i `--continue` - KRYTYCZNY BUG 2026

Issue #42338 ("Session resume (--continue) invalidates entire prompt cache") udokumentowal ze resume sesji w CCh:
- Wymaga pelnego cache_creation (czesto 400-500k tokenow) za kazdym razem
- Nawet jezeli resume jest w ciagu sekundy po zamkniecu
- Wynikiem: "silently burning through rate limits"

Dotkniete wersje: v2.1.89+. Fix: cnighswonger/claude-code-cache-fix repo (community-maintained).

**Workaround dla affected wersji:**
- Uzywaj `/clear` + nowa sesja zamiast `--continue` jezeli masz dluga historie
- Alternatywa: downgrade do v2.1.88 lub wczesniej
- Monitor cache_read_input_tokens vs cache_creation_input_tokens - jezeli creation dominuje, bug aktywny

### 7. Wersje 2026 - chronologia cache regressions

Dla memoriam community i zeby zespoly wiedzialy czego unikac:

- **v2.1.62 (Feb 2026?):** Server-side KV cache stale context (Issue #29230). Model pracuje na nieaktualnym kontekscie po compaction. P1 severity.
- **v2.1.89 (early Feb 2026):** Session resume wypadaja z cache. Issue #42338.
- **v2.1.90 (Feb 2026):** Kontynuacja bug, resumowanie sesji z v2.1.89 w v2.1.90 duzo toknow bez caching. Issue #42749.
- **v2.1.100+ (Mar 2026):** Cache creation inflates ~20K tokens vs v2.1.98. Issue #46917.
- **Mar 6, 2026:** Silent TTL default change 1h -> 5m na poziomie API (zobacz R2).

Rekomendacja: freeze CCh version w zespole na v2.1.88 lub >=v2.1.105 (po fixach). Max Plan users z marca 2026 odnotowali rate limit exhaustion w 70 minut vs normalnie 8 godzin.

### 8. Cache interaction z MCP tools

CCh obsluguje MCP (Model Context Protocol) tools dodawane dynamicznie. Dodanie nowego MCP tool poprzez `/mcp add` mid-session:
- Invalidates tools layer (bo tools array sie zmienia)
- Cascade: invalidates system + CLAUDE.md + messages (caly prefix)
- Nastepny request placi full cache write

Workaround: zaladuj wszystkie MCP tools na poczatku sesji (w config), NIE dynamicznie.

Issue #27048 opisuje dodatkowy bug: Tool-use content nie jest cacheable w niektorych wersjach, a plugin state changes powoduja full user content rewrite.

### 9. CLAUDE.md economics

Obserwacja z Claude Code Camp i Branch8 blog:
- Typowa CLAUDE.md: 5000 tokenow
- Loadowana PRZED czytaniem kodu, z KAZDYM promptem, z KAZDA sesja
- Bez cache: 5000 tokens * $5 (Opus) = $0.025 per turn. 100 turn = $2.50 tylko za CLAUDE.md.
- Z cache: $0.025 * 0.04 (hit rate write penalty) + $0.025 * 0.96 * 0.1 (read) = $0.001 + $0.0024 = $0.0034 per turn. 100 turn = $0.34.

**CLAUDE.md staje sie drogi TYLKO jesli sie zmienia czesto.** Typowy dev rzadko modyfikuje CLAUDE.md (raz na dzien, raz na tydzien), wiec cache hit rate jest wysoki (>95%).

### 10. Dynamic boundary marker - szczegol

Piebald analysis: "The marker __SYSTEM_PROMPT_DYNAMIC_BOUNDARY__ splits the prompt into two halves with different caching behavior. Dynamic sections use a registry that caches computed values until /clear or /compact."

Interpretacja: Anthropic wewnetrznie ma mechanizm **partial cache invalidation** - dynamic part (uzywajacy computed values) moze byc invalidated samodzielnie bez pelnego rebuild static part. To sophisticated optimization ktora nie jest exposed w public API.

### 11. Observed cache metrics - dashboard

Developerzy community udostepniaja dashboardy monitorujace:
- `cache_read_input_tokens` per response
- `cache_creation_input_tokens` per response
- `input_tokens` (non-cached, po breakpoincie)
- Ratio: cache_read / (cache_read + cache_creation + input)

Zdrowa sesja CCh: >85% cache_read ratio przez cala sesje.

Tool: bokonon23/clawdbot-cost-monitor (deepwiki: [The Prompt Caching Problem](https://deepwiki.com/bokonon23/clawdbot-cost-monitor/1.2-the-prompt-caching-problem)) monitoruje real-time.

Alternative: Luong Nguyen's debug post "How I Debugged Claude Code's 9% Cache Spike in One Prompt" (Medium, April 2026) pokazuje metodologie detekcji pojedynczej regresji.

## Issues / Flags

### Konflikty zrodel
- **Konflikt 8:** Anthropic (The Register 13 April) twierdzi ze marcowy quota drain "not caused by cache tweaks". Community (GitHub Issue #46829, Dev.to) twierdzi przeciwnie. Rozstrzygniecie: oba moga byc prawdziwe - cache zmiana byla real ale byla jedna z wielu przyczyn. Ostateczna odpowiedzialnosc nie ustalona.
- **Konflikt 9:** Piebald pisze o `__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__` ale nie ma tego w oficjalnej dokumentacji Anthropic. Community reverse-engineering, niepotwierdzone oficjalnie. Ufa sie Piebald bo reverse-engineer na realnych binarkach.
- **Konflikt 10:** Niektore blogi mowia o "auto-caching CLAUDE.md" as separate feature. Technicznie to po prostu aplication of regular cache mechanism przez CCh. Nie ma specjalnego "CLAUDE.md cache" - to tylko one warstwa w hierachii.

### Gaps
- **Gap 11:** Brak oficjalnego Anthropic changelog dla cache-related zmian w CCh. Trzeba polegac na community GitHub issues.
- **Gap 12:** Niejasne jak CCh collaboruje z Anthropic Managed Agents (nowa feature 2026). Managed Agents NIE majza Batch discount ale maja pricing na session runtime. Cache multiplier sie aplikuje - ale nie ma case study z CCh + Managed Agents.
- **Gap 13:** Brak publicznego spec dla `/compact` - jak dokladnie dzieli summary, co zachowuje, jakie tokeny wlicza.
- **Gap 14:** Nie ma oficjalnego sposobu na wymuszenie cache hit. Jezeli hit rate spada, uzytkownik ma tylko diagnostyke post-hoc.

### Warnings
- **Uwaga 9:** Freeze CCh version w zespole - regression history jest znaczna.
- **Uwaga 10:** Jezeli edytujesz CLAUDE.md, zrob to RAZ per sesja (nie w ping-pong), inaczej co edycja = full rebuild.
- **Uwaga 11:** NIE dodawaj MCP toolow mid-session. Wlaczaj wszystkie na starcie.
- **Uwaga 12:** Dla debugging add `/status` - pokazuje cache stats (w nowszych wersjach).

## Recommendation

1. **Domyslne uzycie:** CCh cache dziala out of the box. Nie musisz nic konfigurowac. 96% hit rate przy dobrym hygiene.
2. **Hygiene rules:**
   - Nie dodawaj MCP mid-session
   - Nie edytuj CLAUDE.md podczas aktywnej konwersacji
   - Nie przelaczaj modelu
   - Dodawaj daty/timestampy do messages lub via `<system-reminder>`, nie do system
3. **`/compact` vs `/clear`:**
   - `/compact` gdy chcesz kontynuowac temat ale context overflow. Tracisz cache messages ale zachowujesz 18k cache system+tools+CLAUDE.md.
   - `/clear` gdy nowy temat. Cache prefix moze byc re-used przez TTL jezeli wrocisz w 5min.
4. **`--continue` / `--resume`:** Uzywaj ostroznie na v2.1.89-v2.1.104. Lepiej nowa sesja + rehydrate kontekst manualnie.
5. **Monitoring:** enable `/status` w nowszych wersjach. Alerty jezeli cache hit rate <70%.
6. **Version pinning:** freeze CCh version dla zespolu. Test 2 tygodnie na small team przed upgrade do cala organizacja.

GO z ostroznoscia. CCh ma najlepszy out-of-box cache experience na rynku (96% hit rate zero config), ale 2026 pokazal serie regresji. Monitoring + version discipline chronia.

## Source links

- [GitHub Issue #29230 - v2.1.62 Server-Side KV Cache Stale Context](https://github.com/anthropics/claude-code/issues/29230)
- [GitHub Issue #42338 - Session resume invalidates cache](https://github.com/anthropics/claude-code/issues/42338)
- [GitHub Issue #42749 - Resuming from v2.1.89 excessive tokens](https://github.com/anthropics/claude-code/issues/42749)
- [GitHub Issue #46917 - v2.1.100+ cache_creation inflation](https://github.com/anthropics/claude-code/issues/46917)
- [GitHub Issue #27048 - Prompt Cache Invalidation on Session Resume](https://github.com/anthropics/claude-code/issues/27048)
- [GitHub Issue #24147 - Cache read tokens 99.93% quota](https://github.com/anthropics/claude-code/issues/24147)
- [GitHub Issue #41788 - Max 20 plan rate limit exhaust 70 min](https://github.com/anthropics/claude-code/issues/41788)
- [Piebald-AI claude-code-system-prompts](https://github.com/Piebald-AI/claude-code-system-prompts)
- [Piebald CHANGELOG](https://github.com/Piebald-AI/claude-code-system-prompts/blob/main/CHANGELOG.md)
- [Claude Code Camp - How Prompt Caching Actually Works](https://www.claudecodecamp.com/p/how-prompt-caching-actually-works-in-claude-code)
- [Claude Code Camp - Inside Claude Code's System Prompt](https://www.claudecodecamp.com/p/inside-claude-code-s-system-prompt)
- [Helmcode - System Prompt Internals](https://claude-code-explain.helmcode.com/system-prompt/)
- [cnighswonger/claude-code-cache-fix](https://github.com/cnighswonger/claude-code-cache-fix)
- [Branch8 - Cut Claude Code Costs 70%](https://branch8.com/posts/claude-code-token-limits-cost-optimization-apac-teams)
- [Luong Nguyen - Debugged Claude Code's 9% Cache Spike](https://medium.com/@luongnv89/how-i-debugged-claude-codes-9-cache-spike-in-one-prompt-9ec4e6932d6e)
- [Dev.to - Mastering Cache Hits in Claude Code](https://dev.to/kitaekatt/mastering-cache-hits-in-claude-code-5648)
- [bokonon23/clawdbot-cost-monitor](https://deepwiki.com/bokonon23/clawdbot-cost-monitor/1.2-the-prompt-caching-problem)
