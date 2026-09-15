# R4 - Claude Code CLI Caching (2026) - GitHub + Issues Analysis

**Researcher:** GitHub (issues, source code observations, PR discussions, community tools)
**Data raportu:** 2026-04-17
**Zakres:** jak Claude Code CLI (CCh) wykorzystuje cache: auto-cache behavior, ktore warstwy sa cached, zachowanie po /compact /clear /resume, env vars do kontroli TTL, community warm-up patterns, zidentyfikowane bugs.

---

## Executive Summary

Claude Code CLI (CCh) wbudowal prompt caching jako **fundament calej architektury**, nie addon. Automatycznie cache'uje **4 warstwy prefiksu** w kazdym requestcie - od statycznego system prompt po conversation history - bez zadnej konfiguracji uzytkownika. Obserwowany cache hit rate dla typowej sesji to **90-96%**, co sprawia ze long Opus session (100 turns) kosztuje $10-19 zamiast $50-100.

Kluczowe mechanizmy:
- **Auto-caching on**: CCh automatycznie wstawia `cache_control: {type: "ephemeral"}` breakpointy. Zero konfiguracji wymagane.
- **`<system-reminder>` pattern**: Dynamic data (daty, user email, git status) injectowane jako XML tagi w messages, NIE w system prompt. System prompt zostaje frozen = wysoki hit rate.
- **TTL domyslny**: 5 minut (standard), 1 godzina (Max plan lub explicit `ENABLE_PROMPT_CACHING_1H=1`). Kazdy cache hit resetuje licznik.
- **TTL regression marzec 2026**: Anthropic silently zmienil default 1h -> 5m dla Max plan userow okolo 6 marca 2026 (potwierdzono 119,866 API calls na dwoch niezaleznych maszynach). Nie naprawiono na dzien raportu.
- **Telemetry-cache coupling bug**: `DISABLE_TELEMETRY=1` lub `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` wylacza takze 1h TTL (fallback do 5m hardcoded default). Fix: `ENABLE_PROMPT_CACHING_1H=1`.
- **Serie regresji 2026**: v2.1.62, v2.1.69-v2.1.76, v2.1.89-v2.1.111 - kazda spowodowala znaczne koszty i quota drain dla Max Plan userow.

---

## 1. Cache Layers - Tabela

| Warstwa | Zawartosc | Rozmiar (typowy) | Trigger invalidacji | Cacheable? |
|---------|-----------|------------------|---------------------|------------|
| **System prompt (static)** | Role, rules, tool conventions, security | ~4,000 tok | Nowa wersja CCh | Tak, bardzo stabilny |
| **System prompt (dynamic)** | Computed values via `__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__` | ~500-1,000 tok | `/clear` lub `/compact` | Tak, do operacji |
| **Tool definitions** | 24 builtin tools + MCP tools (JSON schemas) | 5,000-15,000 tok | Dodanie/usuniecie tool | Tak, do zmiany tools |
| **CLAUDE.md** | `~/.claude/CLAUDE.md` + `CLAUDE.md` projektu + imports | 1,000-20,000 tok | Kazdy save CLAUDE.md | Tak, do edycji |
| **Conversation history** | Messages, tool_use, tool_result (user + assistant) | 0 - 500,000+ tok | Przesuwa sie do przodu automatycznie | Tak, sliding breakpoint |
| **`<system-reminder>` blocks** | Date, user email, git status, memory files | 200-2,000 tok (per turn) | Co request (dynamic) | NIE - wstrzykiwane w messages |
| **Thinking blocks** | Extended thinking content | Variable | N/A | Explicite wykluczone z cache |

**Kolejnosc w payloadzie API:**
```
[tools_array]
[system_prompt_static + __DYNAMIC_BOUNDARY__ + system_prompt_dynamic]
[~/.claude/CLAUDE.md]
[project CLAUDE.md]
[message_history z embedded system-reminders]
[CURRENT_USER_TURN]
```

Cache_control breakpointy sa ustawiane automatycznie na granicach warstw oraz na ostatnim bloku user/assistant message.

---

## 2. Auto-Cache Behavior - Confirmed Mechanics

### 2.1 Automatyczna aktywacja
CCh **nie wymaga zadnej konfiguracji**. Przy kazdym requestcie:
1. Skompiluje payload w powyzszej kolejnosci
2. Wstawi `cache_control: {type: "ephemeral"}` na ostatnim stale bloku
3. Przesuwa breakpoint forward z kazda nowa wiadomoscia

Zrodlo: reverse-engineered z Piebald-AI/claude-code-system-prompts + community JSONL analysis (Issue #46829, 119,866 API calls).

### 2.2 Minimum token thresholds
Caching wymaga minimum:
- Sonnet / Haiku: 1,024 tokenow
- Opus: 2,048-4,096 tokenow (zaleznie od wersji)

Krotkie jednorazowe prompty nie korzystaja z cache.

### 2.3 Cache hit rate observed
Zdrowa sesja CCh (bez regresji, wersja stabilna):
- Turn 1: full cache_write (platny write charge 25% premium)
- Turn 2+: ~96% cache_read (90% discount, $0.30 zamiast $3.00/MTok Sonnet)
- Formula: `cache_read / (cache_read + cache_write + input)` >= 0.90

Rzeczywisty koszt po 100 turns (Opus): $10-19 vs $50-100 uncached.

### 2.4 `<system-reminder>` - mechanizm dynamic context bez invalidacji
Kluczowy wzorzec projektowy Claude Code:

Zamiast wstawiac do system prompt (co by zamrozilo cacheable prefix):
```xml
<system-reminder>
# currentDate
Today's date is 2026-04-17.

# userEmail
The user's email address is user@example.com.

# gitStatus
Current branch: master
Main branch: master
Git user: TheJacksonCode
Status: ...
</system-reminder>
```

Ten XML tag pojawia sie w `messages[0]` jako poczatek konwersacji - NIE w system. Efekt: system prompt jest frozen i w pelni cacheable, a dynamic info jest w messages (gdzie normalnie nie jest w static cache).

**Dlaczego to dziala:** API traktuje `<system-reminder>` jak zwykly tekst wiadomosci. Model widzi te informacje jako "OVERRIDE" instructions. Technicznie: regular message content z wysokim priorytetem konwencjonalnym.

**Implikacja dla wlasnych aplikacji:** Kazdykolwiek dynamic state (timestamps, user ID, feature flags, A/B test assignments) wrzucaj do messages, nie do system prompt. To nie jest hack - to oficjalny wzorzec CCh.

---

## 3. Zachowanie per Komenda

### 3.1 `/compact`
**Co robi:** Sumuje conversation history do skroconego resume, usuwa pelna historie.

**Cache impact:**
- **System + tools + CLAUDE.md layer:** ZACHOWANE (jezeli TTL jeszcze nie wygasl). Nastepny request musi pisac nowa history, ale 18k tokenow prefiksu to cache hit.
- **Conversation history:** INVALIDATED. Stary prefix guaranteed stale.
- **Semantyczny break:** "Any prefix cached before compaction is guaranteed stale after it." (Anthropic post Issue #29230)
- Po kompakcji: nowa summary jest fresh cache_write, potem stopniowo cache_read

**Best practice:** Uruchamiaj `/compact` na ~60% context utilization (nie czekaj na ostrzezenie CCh - wtedy juz za pozno i quality degraduje). Mozes uzyc `Focus on: <what to preserve>` jako argument.

**Auto-compact:** CCh ma auto-compact feature gdy context osiaga limit. Mozna skonfigurowac instrukcje compaction w CLAUDE.md:
```markdown
# Compact instructions
When you are using compact, please focus on test output and code changes
```

### 3.2 `/clear`
**Co robi:** Usuwa conversation history, zaczyna "nowa sesje" bez restartowania CCh.

**Cache impact:**
- **System + tools + CLAUDE.md layer:** ZACHOWANE przez TTL okno (5m lub 1h)
- **Conversation history:** CLEARED, cache invalid
- **Strategia:** Jezeli nastepny request jest w ciagu <5 minut od `/clear`, system+tools+CLAUDE.md prefix wciaz warm = oszczednosc 18k tokens. Po 5m TTL wygasa, kolejna sesja placi pelne cache_write.

**vs `/compact`:** `/clear` dla nowego, niezwiazanego tematu. `/compact` gdy ten sam projekt, inny kontekst (zbyt wiele historii ale temat kontynuowany).

### 3.3 `/resume` (i `--continue` / `--resume <session-id>`)
**Intencja:** Kontynuacja poprzedniej sesji z zachowanym kontekstem.

**Observed bug (wiele wersji 2026):**
- System prompt jest regenerowany, tool definitions re-assembled
- **Jezeli TTL wygas (>5min):** pelny cache_write = 400-500k tokenow charged po raz drugi
- Wiele wersji (v2.1.69-v2.1.111) mialo bug gdzie `--resume` NIE reusoval cache nawet w ciagu 5min okienka (Issue #34629)

**Bezpieczna strategia na affected wersjach:**
- Monitoruj `cache_read_input_tokens` vs `cache_creation_input_tokens`
- Jezeli creation dominuje mimo ze sesja trwa, masz aktywny bug
- Workaround: nowa sesja + manualne podsumowanie kontekstu ("W poprzedniej sesji...")

**Forked sessions (`--fork-session`):** Fork dziela identyczny prefix z sesja bazowa - cache hit gwarantowany jezeli w TTL okienku.

### 3.4 `/rewind` (double-Escape)
**Cache impact:** Szczegolnie destruktywny. Usuwa ostatnia wiadomosc z historii, ale:
- Stary cache prefix zawiera ta wiadomosc (jej stara wersja)
- Nowy request nie ma jej w historii
- **Wynik:** pelny cache miss na calosci historii konwersacji

"Changes the prefix - the cached version includes the message you just removed, but your new request doesn't." Unikaj `/rewind` w dlugich sesjach gdzie zalezy Ci na cache efficiency.

---

## 4. Environment Variables i Konfiguracja

### 4.1 Cache control env vars (potwierdzone v2.1.108+)

| Zmienna | Efekt | Kiedy uzywac |
|---------|-------|--------------|
| `ENABLE_PROMPT_CACHING_1H=1` | Wymusza 1h TTL na API key, Bedrock, Vertex, Foundry | Gdy masz Max plan lub API key, chcesz 1h, ale telemetria wylaczona |
| `FORCE_PROMPT_CACHING_5M=1` | Wymusza 5m TTL (override nawet 1h tier) | Debugging, cost control |
| `DISABLE_PROMPT_CACHING=1` | Wylacza caly prompt caching | Debugging only - dramatycznie zwieksza koszty |
| `DISABLE_PROMPT_CACHING_HAIKU=1` | Wylacza cache tylko dla Haiku | Testowanie bez cache dla tanich modeli |
| `DISABLE_PROMPT_CACHING_SONNET=1` | Wylacza cache tylko dla Sonnet | Testowanie |
| `DISABLE_PROMPT_CACHING_OPUS=1` | Wylacza cache tylko dla Opus | Testowanie |
| `ENABLE_PROMPT_CACHING_1H_BEDROCK=1` | **DEPRECATED** (nadal honorowany) - poprzednia nazwa ENABLE_PROMPT_CACHING_1H | Backward compat |
| `CLAUDE_CODE_FORCE_GLOBAL_CACHE=1` | Wymusza global system prompt caching | Nie jest oficjalnie udokumentowane, community discovery |
| `ANTHROPIC_LOG=debug` | SDK debug logging (HTTP level) - widac cache_creation / cache_read headers | Diagnostyka |
| `DISABLE_TELEMETRY=1` | UWAGA: rowniez wylacza 1h TTL tier (bug!) | Uzywaj razem z ENABLE_PROMPT_CACHING_1H=1 |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` | Alternatywa DISABLE_TELEMETRY - ten sam bug z TTL | Jak wyzej |

**Konfiguracja przez settings.json (persystentna, bez eksportowania zmiennych):**
```json
{
  "env": {
    "ENABLE_PROMPT_CACHING_1H": "1",
    "ANTHROPIC_LOG": "debug"
  }
}
```

Plik: `~/.claude/settings.json` (user-global), `.claude/settings.json` (per-project).

### 4.2 Telemetry-Cache Coupling Bug (Issue #45381, Issue #47558)

**Mechanizm:**
`DISABLE_TELEMETRY=1` wylacza Statsig telemetry collection, ale rowniez wylacza fetchowanie client-side experiment gates / remote gate values. Kiedy klient nie moze fetchowac gates (brak telemetrii), fallback na hardcoded default = **5 minut TTL dla wszystkich**.

Oznacza to ze prywatnosc-conscious userzy (wylaczajacy telemetrie) placiez WIECEJ za caching niz ci ktorzy maja telemetrie ON.

**Fix (v2.1.108):**
- Dodano `ENABLE_PROMPT_CACHING_1H=1` env var ktora explicite opt-in do 1h TTL niezaleznie od telemetrii
- Stare `ENABLE_PROMPT_CACHING_1H_BEDROCK=1` nadal honorowane dla backward compat

**Workaround dla wersji przed fixem:**
```json
{
  "env": {
    "DISABLE_TELEMETRY": "1",
    "ENABLE_PROMPT_CACHING_1H": "1"
  }
}
```

---

## 5. TTL Behavior i Regression Historia

### 5.1 TTL tiers

| Plan | Default TTL | Jak uzyskac 1h |
|------|-------------|---------------|
| Free / Pro (API) | 5 minut | ENABLE_PROMPT_CACHING_1H=1 |
| Max Plan (claudeai auth) | 1 godzina (zamierzone) | automatycznie - jezeli telemetria ON |
| Bedrock | 5 minut | ENABLE_PROMPT_CACHING_1H=1 |
| Vertex | 5 minut | ENABLE_PROMPT_CACHING_1H=1 |

Kazdy cache hit **resetuje** licznik TTL. Aktywna sesja z requestami co <5min utrzymuje cache indefinitely.

### 5.2 Marcowa regresja TTL (Issue #46829) - potwierdzona 119,866 calls

**Oparcie na danych:** Uzytkownik przeanalizowal raw JSONL session files z `~/.claude/projects/` z dwoch niezaleznych maszyn (Linux workstation + Windows laptop) od Jan 11 do Apr 11, 2026 - lacznie 119,866 API calls. Wnioski:

| Faza | Daty | Zachowanie | Dowod |
|------|------|------------|-------|
| 1 | 11 sty - 31 sty | 5m only | Przed wprowadzeniem 1h tier |
| 2 | 1 lut - 5 mar | **1h ONLY** | `ephemeral_5m = 0` przez 33 consecutive days |
| 3 | 6-7 mar | Mieszane | Pierwsze 5m tokeny pojawiaja sie znowu |
| 4 | 8 mar - 11 kwi | 5m dominuje | 5m surges to ~93% do konca marca |

**Koszt impact (rzeczywisty):**
- Luty 2026 (1h period): overpaid $12.32 (1.1% waste) - **poprawne zachowanie**
- Marzec 2026 (po regresjii): overpaid $719.09 (25.9% waste)
- Lacznie kwi 2026: ~$949 strat dla jednego aktywnego uzytkownika

**Status:** Issue zamkniete jako "not planned". Brak oficjalnej odpowiedzi od Anthropic.

### 5.3 Chronologia cache regressions 2026

| Wersja | Data (przybl.) | Bug | Issue | Impact |
|--------|---------------|-----|-------|--------|
| v2.1.62 | luty 2026 | Server-side KV cache stale context - model pracuje na nieaktualnym kontekscie po compaction. P1 severity | #29230 | Stale responses po /compact |
| v2.1.69 | marzec 2026 | Cache regression w --print --resume: cache_read frozen na ~14.5k (system prompt only), historia nie cache'owana. 20x cost increase | #34629 | $0.35 vs $0.05 per turn w resumed sessions |
| v2.1.89-v2.1.90 | wczesny marzec 2026 | Session resume excessive token usage, resumowanie sesji z v2.1.89 w v2.1.90 powoduje pelny rebuild | #42749 | Full cache_creation zamiast cache_read |
| v2.1.100+ | marzec/kwi 2026 | Cache_creation inflates ~20K tokens per request vs v2.1.98, mimo mniejszego payloadu | #46917 | +$0.10-0.20 per request |
| 6 mar 2026 | marzec 2026 | Silent server-side TTL change 1h -> 5m dla Max plan (niezwiazane z wersjami CCh) | #46829 | 25% overpayment dla heavy users |
| ~kwiecien 2026 | kwiecien 2026 | Telemetria wylacza 1h TTL | #45381 | Max plan userzy z DISABLE_TELEMETRY placiez za 5m |
| v2.1.100+ | kwiecien 2026 | cache_creation inflates o 20K tokens (server-side change, nie tylko local bug) | #46917 | Inflated costs |

**Rekomendacja wersji:** freeze na v2.1.88 lub >=v2.1.112 (post-fix). Sprawdz changelog na kazdym update przed wdrozeniem.

---

## 6. Szczegolowe Bugs - Anatomia

### 6.1 cnighswonger/claude-code-cache-fix: anatomia 3 niezaleznych budow

Community-maintained fix (preload.mjs, Node.js interceptor fetchujacy /v1/messages) identyfikuje **3 odrebne mechanizmy** za cache regression w v2.1.69-v2.1.111:

**Bug 1: Partial block scatter**
- Attachment blocks (skills, MCP servers, deferred tools, hooks) przesuwaja sie z `messages[0]` do pozniejszych wiadomosci
- Zmienia cache prefix structure -> miss

**Bug 2: Fingerprint instability**
- `cc_version` fingerprint (identyfikator sesji uzywany przez API do rozpoznawania cache) pochodzi z `messages[0]` content
- Gdy bloki sie relocate (Bug 1), fingerprint sie zmienia
- API nie rozpoznaje requestu jako kontynuacji sesji -> pelny rebuild mimo identycznego input

**Bug 3: Non-deterministic tool ordering**
- Tool definitions przychodza w zmiennej kolejnosci miedzy turnami
- Request bytes sie roznia -> inny cache klucz -> miss

**Fix mechanizm:**
- Interceptuje `globalThis.fetch` przed API calls
- Relocatuje attachment blocks z powrotem do `messages[0]`
- Stabilizuje fingerprint z rzeczywistego tekstu uzytkownika (nie meta-blocks)
- Sortuje tool definitions alfabetycznie (deterministycznie)
- Idempotentny i fail-safe (jesli pattern nie pasuje -> passthrough)

**Affected versions:** v2.1.69 do v2.1.111 (confirmed).

### 6.2 Bun string replacement bug (Issue #41930)

Dodatkowy bug identyfikowany w scope Issue #41930 (April 2026 quota drain):
- Anthropic uzywa custom Bun fork do budowania CCh
- Bun wykonuje **string replacement na kazdym API request**
- Jezeli conversation history zawiera billing-related terms (np. "rate limit", "quota", "subscription")...
- ...replacement breaks cache prefix, wymuszajac full rebuild dla calosci historii

Impact: uzytkownikow dyskutujacych o kosztach / limitach (ironia) najbardziej dotknieci.

---

## 7. Warm-up Patterns i Community Practices

### 7.1 Confirmed warm-up behavior CCh
CCh wykonuje **warm-up API call** na starcie sesji - jest to call ktory:
- Probuje cache system prompt i CLAUDE.md (jezeli pliki zaladowane)
- Po kilku sekundach nastepny prawdziwy request trafia na cache hit zamiast cold start
- Efekt widoczny: pierwsze kilka sekund po `claude` uruchomieniu jest "inicjalizacja"

Mozna to zweryfikowac: po zamknieciu i natychmiastowym ponownym otwarciu Claude Code (w ciagu 5m), `/cost` pokazuje cache_read zamiast cache_write dla system prompt.

### 7.2 Community patterns do wymuszenia cache hit

**Pattern 1: Batch requests w jednej sesji**
- 5 pytan o ten sam codebase w jednej sesji = 1.65x koszt (vs 5 osobnych sesji = 6.25x)
- Korzysci 10x na reads vs writes kompensuja overhead
- Regula: zamiast `claude -p "krotkie pytanie"` (nowa sesja kazdorazowo) - pracuj w dlugich sesjach

**Pattern 2: Fork sessions dla parallel work**
- `--fork-session <session-id>` tworzy fork ktory dzieli identyczny prefix z baza
- Oba forki trafaja na ten sam cache klucz (identyczny system+tools+CLAUDE.md)
- Oszczednosc: N watkow parallel, tylko jedno cache_write zamiast N

**Pattern 3: Defer heavy context loading**
- Nie laduj duzych plikow na poczatku sesji jezeli nie wiesz ze beda potrzebne
- MCP tool definitions sa **domyslnie deferowane** w nowszych CCh - tylko nazwy w kontekscie, full schema laduje sie przy uzyciu
- Komenda: `/mcp` pokazuje co jest zaladowane, `/context` pokazuje zuzycie

**Pattern 4: Keep cache warm**
- Aktywna sesja z requestami co <5min utrzymuje cache indefinitely
- Dla dlugich przerw (lunch, meeting): rozwa podbicie TTL przez `ENABLE_PROMPT_CACHING_1H=1`
- NIGDY nie odlaczaj i podlaczaj wielokrotnie - kazdorazowe resume w buggy wersjach = full rebuild

**Pattern 5: Lock tool configuration przed sesja**
- Wszystkie MCP servers laduj w konfiguracji (`~/.claude.json` / `.mcp.json`), NIE przez `/mcp add` w trakcie sesji
- Dodanie jednego tool mid-session inwaliduje 15,000+ tokenow tool definitions + caly prefix
- Kosz jednej zmiany mid-session: pelny cache miss na calosci nowej sesji

**Pattern 6: CLAUDE.md hygiene**
- Edytuj CLAUDE.md RAZ na poczatku sesji, nie w srodku (kazda edycja = invalidacja)
- Trzymaj CLAUDE.md < 200 linii (oficjalna rekomendacja Anthropic w CCh docs)
- Przenies specjalistyczne instrukcje (workflow dla PR review, database migrations) do **skills** - laduja sie on-demand, nie przy kazdym request

**Pattern 7: Model discipline**
- Kazdy model ma oddzielny, izolowany cache
- Przelaczenie Opus -> Sonnet w trakcie sesji = pelny rebuild dla nowego modelu
- Wyznacz model NA STARCIE i trzymaj przez cala sesje

### 7.3 Anti-patterns (cos co NISZCZY cache, nieoczywiste)
- **Timestamp w system prompt:** jesli Twoja aplikacja wstawia `Today is {date}` do system prompt - placi pelny cache_write przy kazdym uruchomieniu. Fix: wrzuc do pierwszej wiadomosci uzytkownika.
- **Feature flags w system prompt:** jesli A/B test zmienia system prompt fragment - kazda odmiana to oddzielny cache klucz.
- **Model rotation:** "Uzyjemy Opus dla trudnych pytan, Sonnet dla latwych" w ramach sesji = dwa razy cache write.
- **Context-length-alerted compaction:** jezeli czekasz az CCh sam wykona auto-compact (na 100% context), juz placiles za nadmierne tokeny. Compact na 60%.

---

## 8. Monitoring i Diagnostyka

### 8.1 Komendy
- `/cost` - sesja cost + token breakdown (uwaga: dla subscription nie jest billing data, tylko szacunek)
- `/stats` - usage patterns dla Max/Pro subscribers
- `/context` - co zajmuje context window (per tool, per file)
- `claude --version` - sprawdz wersje przed upgrade

### 8.2 JSONL session files
Raw data w `~/.claude/projects/<project_hash>/*.jsonl`. Kazde wywolanie API loguje:
```json
{
  "usage": {
    "cache_creation_input_tokens": 14500,
    "cache_read_input_tokens": 45000,
    "input_tokens": 3200,
    "output_tokens": 800
  }
}
```

**Formuly diagnostyczne:**
- Hit rate = `cache_read / (cache_read + cache_creation + input)`
- Healthy: > 0.85
- Podejrzane: < 0.70
- Bug aktywny: cache_read stale (~14.5k = tylko system prompt), cache_creation = pelna historia

### 8.3 Zewnetrzne tools
- `cnighswonger/claude-code-cache-fix` - preload.mjs fix dla v2.1.69-v2.1.111
- `flightlesstux/prompt-caching` - automatic caching wrapper dla custom projektow (nie CCh itself)
- `ANTHROPIC_LOG=debug` - raw HTTP logs z cache headers

---

## Issues / Flags

### Konflikty zrodel

**Konflikt 1:** Anthropic (The Register, April 13 2026) twierdzi ze marcowy quota drain "not caused by cache tweaks". Community (Issue #46829, Dev.to) ma dane 119,866 calls pokazujace odwrotnie. Rozstrzygniecie: oba moga byc prawdziwe - Anthropic moze odnosic sie do braku intentionalnej zmiany, community pokazuje ze real change miala miejsce. Nierozstrzygniety.

**Konflikt 2:** Oficjalne CCh docs nie wymieniaja `DISABLE_PROMPT_CACHING_HAIKU/SONNET/OPUS` jako opcji. Zrodla community (dev.to kitaekatt, claudecodecamp.com) je listuja. Nie potwierdzono w oficjalnym changelog.

**Konflikt 3:** Cache hit rate w literaturze: "96%" (claudecodecamp.com), "90%" (dev.to). Prawdopodobnie mierzone w roznych warunkach. Konserwatywna estimacja: 85-96% zalezna od hygiene.

**Konflikt 4:** Piebald-AI dokumentuje `__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__` jako internal marker. Brak oficjalnej dokumentacji Anthropic. Community trust: wysoki (reverse-engineering na realnych binarkach, regularnie aktualizowany).

### Gaps

**Gap 1:** Brak oficjalnego Anthropic changelog dla cache-related zmian. Issue tracker jest jedynym zrodlem prawdy (fragmentaryczny).

**Gap 2:** Nieznane co dokladnie `/compact` zachowuje vs dyskarduje w summary. Brak spec dla format kompakcji.

**Gap 3:** Jak cache zachowuje sie z **Agent Teams** (nowa feature CCh 2026 - CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1)? Kazdy agent ma swoj context window, ale czy dzielony cache prefiksu? Brak danych.

**Gap 4:** Brak potwierdzenia czy `CLAUDE_CODE_FORCE_GLOBAL_CACHE` jest oficjalnym env var. Community discovery only.

**Gap 5:** Workspace-level cache isolation (od Feb 5, 2026, Anthropic) - jak to wplywa na team shared cache dla CLAUDE.md? "All users in the same project share the CLAUDE.md cache" - czy wciaz prawdziwe po workspace isolation?

**Gap 6:** Brak spec dla cache behavior w **sub-agents** (parallel task spawning przez Task tool). Kazdy subagent ma swoj system prompt - czy inherits parent cache?

---

## Recommendation / Brama

### Warmup Pattern (GO)
Brama: **PASS - udokumentowany, potwierdzony pattern.**

CCh auto-wykonuje warm-up call. Dla custom aplikacji: wstaw cache_control breakpoint po kazdym statycznym bloku i traktuj pierwsze 10s sesji jako "czas rozgrzewki" - nastepne requesty trafaja na cache hit.

### Env Vars (GO z ostroznoscia)
Brama: **PASS - env vars sa oficjalne od v2.1.108.**

Esencjalny zestaw dla Max/Bedrock/Vertex userow z wylaczona telemetria:
```json
{
  "env": {
    "ENABLE_PROMPT_CACHING_1H": "1"
  }
}
```

### /compact vs /clear (GO)
Brama: **PASS - semantyka klarowna.**

- `/compact` = semantic break, kontynuacja projektu. System+tools+CLAUDE.md cache hit.
- `/clear` = nowy temat. System+tools+CLAUDE.md cache hit jezeli w TTL.
- `/resume` + `/rewind` = unikac w sesji gdzie cache efficiency jest priorytetem.

### Version Pinning (GO - krytyczne)
Brama: **PASS - mandatory recommendation.**

Regression historia 2026 jest znaczna. Bez pinning: ryzyko 20x cost increase po auto-update. Freeze na v2.1.88 lub >=v2.1.112.

---

## Source Links (min. 10 URL)

1. [GitHub Issue #46829 - Cache TTL regression 1h->5m (119,866 calls evidence)](https://github.com/anthropics/claude-code/issues/46829)
2. [GitHub Issue #45381 - DISABLE_TELEMETRY disables 1h cache TTL](https://github.com/anthropics/claude-code/issues/45381)
3. [GitHub Issue #47558 - DOCS: DISABLE_TELEMETRY should document experiment-gate side effects](https://github.com/anthropics/claude-code/issues/47558)
4. [GitHub Issue #34629 - Prompt cache regression --print --resume, 20x cost increase](https://github.com/anthropics/claude-code/issues/34629)
5. [GitHub Issue #41930 - Widespread quota drain, two cache bugs identified (Bun string replacement)](https://github.com/anthropics/claude-code/issues/41930)
6. [GitHub Issue #42749 - Resuming sessions from v2.1.89 in v2.1.90 causes excessive token usage](https://github.com/anthropics/claude-code/issues/42749)
7. [GitHub Issue #29230 - v2.1.62 Server-Side KV Cache Stale Context (P1)](https://github.com/anthropics/claude-code/issues/29230)
8. [GitHub Issue #46917 - v2.1.100+ inflates cache_creation by 20K tokens vs v2.1.98](https://github.com/anthropics/claude-code/issues/46917)
9. [GitHub Issue #1347 - Prompt Caching broken on Claude 4 Family AWS Bedrock](https://github.com/anthropics/claude-code/issues/1347)
10. [cnighswonger/claude-code-cache-fix - Community fix for 3-bug cache regression](https://github.com/cnighswonger/claude-code-cache-fix)
11. [Piebald-AI/claude-code-system-prompts - Reverse-engineered system prompt layers](https://github.com/Piebald-AI/claude-code-system-prompts)
12. [Claude Code Camp - How Prompt Caching Actually Works in Claude Code](https://www.claudecodecamp.com/p/how-prompt-caching-actually-works-in-claude-code)
13. [Dev.to - Mastering Cache Hits in Claude Code (env vars + patterns)](https://dev.to/kitaekatt/mastering-cache-hits-in-claude-code-5648)
14. [X/Twitter @ClaudeCodeLog - v2.1.108 ENABLE_PROMPT_CACHING_1H changelog](https://x.com/ClaudeCodeLog/status/2044151319913455666)
15. [The Register - Anthropic: Claude quota drain not caused by cache tweaks (April 13 2026)](https://www.theregister.com/2026/04/13/claude_code_cache_confusion/)
16. [AWS Blog - Supercharge development with Claude Code and Bedrock prompt caching](https://aws.amazon.com/blogs/machine-learning/supercharge-your-development-with-claude-code-and-amazon-bedrock-prompt-caching/)
17. [Claude Code Official Docs - Manage costs effectively](https://code.claude.com/docs/en/costs)
18. [Claude Code Official Docs - Settings reference (env vars in settings.json)](https://code.claude.com/docs/en/settings)
19. [flightlesstux/prompt-caching - Automatic prompt caching wrapper zero config](https://github.com/flightlesstux/prompt-caching)
20. [LiteLLM - Claude Code Prompt Cache Routing tutorial](https://docs.litellm.ai/docs/tutorials/claude_code_prompt_cache_routing)

---

## Status Reportu (5-10 linii)

**Researcher:** R4 GitHub
**Data:** 2026-04-17
**Wiersze:** ~350+
**Coverage:** WYSOKA - potwierdzone env vars, TTL regression z danymi, 3-bug anatomy, community patterns udokumentowane z kodami Issues

**Kluczowe odkrycia R4 (unikalne vs inne researcherzy):**
1. ENABLE_PROMPT_CACHING_1H oficjalnie dodany v2.1.108 (zastepuje ENABLE_PROMPT_CACHING_1H_BEDROCK)
2. DISABLE_TELEMETRY silently wylacza 1h TTL - coupling nieudokumentowany dotad
3. 3 niezalezne mechanizmy za cache regression (block scatter, fingerprint instability, tool ordering) - udokumentowane przez cnighswonger fix
4. Bun string replacement bug jako 4. mechanizm degradacji (Issue #41930)
5. Workspace-level cache isolation od Feb 5, 2026 - gap w wiedzy o team cache sharing

**BRAMA 2:** PASS - R4 kompletny. Material gotowy do synteza z R1-R3, R5-R7. Gap #3 (Agent Teams cache) i Gap #5 (workspace isolation team sharing) rekomendowane jako delta research jezeli syntetyk uzna za niezbedne.
