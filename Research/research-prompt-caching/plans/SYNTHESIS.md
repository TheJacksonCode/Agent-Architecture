# SYNTHESIS - Prompt Caching w Claude Code i API (2026)

**Autor:** Syntetyk Lean (Opus) - Phase 4 Deep Research v2
**Data:** 2026-04-17
**Input:** 7 raportow (R1-R7) + 7 extractow (E1-E7, 136 claimow) + CRITIC.md (7/7 PASS)
**Target:** 7000-9000 slow
**Audience:** developer/architect budujacy produkcyjne aplikacje z Claude API + uzytkownik Claude Code CLI

## Executive Summary

Prompt caching w Claude API i Claude Code to nie "feature tech" ale **strukturalny component business model Anthropic** - umozliwia 80-96% redukcje kosztow input tokens, przez ktore Pro Plan ($20/m) jest w ogole ekonomicznie wykonalny. Ta synteza konsoliduje 7 raportow researchu (18,871 slow raw, 136 claimow w extractach) pokrywajacych: API spec, TTL/invalidacja, pricing, Claude Code CLI, design patterns, Batch stacking, monitoring community.

**Kluczowe liczby:**
- **Multipliers:** 1.25x write (5m), 2x write (1h), **0.1x read (90% savings)**
- **Break-even:** po 1 hit (5m) albo 2 hit (1h)
- **Claude Code:** 96% hit rate, 18k token static prefix, $50-100/session -> $10-19 (80% savings)
- **Du'An Lightfoot case:** 81k system prompt, **$720/m -> $72/m** (90% savings)
- **Batch + Cache stacking:** 50% * 10% = **95% total discount** vs baseline
- **Haiku 4.5 + Batch + Cache:** do **98.3% savings** vs Sonnet baseline

**Cache hierarchia:** `tools -> system -> messages`, zmiana w warstwie wyzszej kasuje wszystkie ponizsze. Naturalny porzadek API sprzyja cache-first design.

**7 patternow dla 95% use cases:** single breakpoint (80% prosty), two breakpoints (RAG), automatic top-level (multi-turn agents), priming (batch), tool prefix stability (MCP), few-shot w system, multi-user isolation (user data w messages).

**Anti-patterns krytyczne:** timestamp w system prompt (auto-invalidator), user data w system (unique cache per user), cache poniżej minimum (silent fail 1024/2048/4096 per model), model switch mid-session, capitalization drift, tool order change.

**Controversy marzec 2026:** Anthropic cicho zmienil default TTL z 1h na 5m. Max Plan userzy doznali 100% quota exhaustion w 70 minut zamiast 8 godzin. Anthropic oficjalnie zaprzeczył ze cache regression spowodowala drain (The Register 13 Apr 2026). Prawda prawdopodobnie gdzies posrodku - **multi-cause incident** obejmujacy TTL regression + resume bug (v2.1.89) + cache inflation (v2.1.100+). Rekomendacja: freeze CCh version na v2.1.88 lub >=v2.1.105, uzywaj `/clear` zamiast `--continue`.

**Workspace isolation (Feb 2026):** cache przeszedl z organization-level na workspace-level. Multi-team aplikacje musza restructurowac aby dzielic cache.

**Monitoring essentials:** cache_hit_ratio jako core SLO (zdrowa >80% multi-turn), cost formula z 4 pol response.usage, alert < 50% przez 3+ requestow. Anthropic **nie oferuje oficjalnego dashboardu** - community wypelnia luke (bokonon23/clawdbot, cnighswonger/cache-fix).

**Decision tree (upraszczone):**
- Prefix >= minimum AND >=2 planned requests in TTL window -> **uzyj cache**
- Gap < 5 min -> 5m TTL; 5-60 min -> 1h TTL; > 60 min -> nie uzywaj
- Bulk offline -> **Batch + Cache + priming** (95% savings)
- Multi-turn agent -> automatic top-level cache_control

**Key trade-off vs konkurencja:** Anthropic ma najwyzsze savings na read (90%) ale jako jedyny wymaga pay-for-write upfront. OpenAI daje 50% zero config. Gemini 75% z storage-per-minute billing. Anthropic wygrywa dla heavy-read workflows (break-even 1-2 hity), OpenAI tanszy dla single-shot.

**Critic werdykt (Phase 3 pipeline):** 7/7 PASS, avg 9.2/10, brak REVISE. Triangulacja 18 claimow w 2+ raportach potwierdza spojnosc. Wszystkie konflikty (7) rozstrzygniete z uzasadnieniem.

Ta synteza stanowi fundament dla Phase 5 NbLM - 4 plikow dla podrecznika dla developerow/architektow: 00_FUNDAMENTALS (API basics), 01_PATTERNS (7 design patterns + anti-patterns), 02_DECISION_GUIDE (decision tree + case studies), 03_MEDIA_PROMPTS (Video Overview + Infographic Studio ze self-score >=9.5/10).

## Part 1 - Spec API i cache_control (R1 core)

### 1.1 Mechanika parametru cache_control

Prompt caching w Claude API jest jawna, opt-in funkcja. Aby uzyc cache, wstawiasz obiekt `cache_control` w kazdym blokku content ktory chcesz oznaczyc jako koniec cacheable prefiksu. Pelna anatomia (R1.C1):

```json
{
  "cache_control": {
    "type": "ephemeral",
    "ttl": "5m"
  }
}
```

Pole `type` przyjmuje wylacznie wartosc `"ephemeral"` - zadnych permanent cache entries, wszystko wygasa (R1.C1). Pole `ttl` jest opcjonalne i przyjmuje "5m" (domyslne) lub "1h" (rozszerzone). Nic wiecej - zadnych custom durations, zadnych persistent modes.

Kazdy cache_control oznacza jeden "breakpoint" - punkt w requescie gdzie cache jest zapisywany i potem odczytywany. Request moze miec maksimum **4 explicit breakpointow** (R1.C2). Jezeli dodasz wiecej, API zwroci 400 error. Jezeli dodasz dokladnie 4, to limit wlasnie uzyles.

Do tego **dodatkowy 5-ty slot na automatic caching** uruchamiany flaga top-level `cache_control` w requescie (R1.C12). System sam przesuwa ten breakpoint w przod wraz z rosnaca konwersacja, uzywajac 20-block lookback window do detekcji hitow.

**Praktyczna implikacja:** w agentic workflow gdzie konwersacja rosnie o 10+ tool_use/tool_result blokow na turn, automatic caching jest absolutnie niezbedny. Manualny pattern (edytuj breakpoint co turn) jest niewykonalny.

### 1.2 Minimum token thresholds (dzielone na 3 grupy)

Cache nie jest darmowy dla malych blokow. Kazdy model ma minimum tokens ktore prefix musi osiagnac zanim cache aktywuje sie (R1.C3):

| Grupa modeli | Minimum tokens |
|--------------|----------------|
| Opus 4.7 / 4.6 / 4.5 | 4096 |
| Haiku 4.5 | 4096 |
| Sonnet 4.6 | 2048 |
| Sonnet 4.5 / 4, Haiku 3.5 / 3 | 1024 |

**Anti-pattern krytyczny:** ponizej progu cache "fails silently" (R1.C4). API NIE zwraca bledu. Response przychodzi normalnie, ale `usage.cache_creation_input_tokens = 0`. Deweloperzy nieznajacy tego faktu moga tygodniami placic regular rate myslac, ze cache dziala.

**Remediacja:** zawsze sprawdzaj `response.usage.cache_creation_input_tokens > 0` po pierwszym requescie w sesji. Jezeli 0 a powinno byc wiecej niz minimum, to znaczy ze prefiks jest za krotki lub drift.

### 1.3 Hierarchia cacheowania: tools -> system -> messages

Cache prefix jest budowany liniowo od poczatku requesta do pierwszego breakpointu. Porzadek jest sztywny (R1.C5, R5.C2):

```
[tools array] -> [system array] -> [messages array]
     ^najmniej zmienny                    najbardziej zmienny^
```

Zmiana w warstwie wyzszej kasuje cache dla tej warstwy I wszystkich ponizszych. Konkretnie (R2.C7, R2.C8):

- **Tools array change** (dodanie/usuniecie tool, zmiana name/description/input_schema) -> invaliduje tools + system + messages (caly prefix)
- **tool_choice change** -> tools + system invalidated (messages zostaja)
- **Images added/removed** w messages -> tools + system invalidated
- **System prompt change** -> system + messages invalidated (tools pozostaje)
- **Messages append** (nowa wiadomosc na koncu) -> poprzedni prefiks zachowany, nowa jest "po breakpoincie" i placona regular rate (R2.C10)

Ta hierarchia jest fundamentalna dla wszystkich design patternow ktore omawiamy w Part 5. Placowanie static content na poczatku i dynamic na koncu pozwala wykorzystac kaskade.

### 1.4 Cacheable content types - co mozesz cache'owac

Anthropic pozwala cache'owac praktycznie wszystko co wchodzi do requestu (R1.C8):

1. **Tools array** - pelna definicja wszystkich narzedzi
2. **System blocks** - wszystkie elementy system array (text, cache_control)
3. **Messages content blocks** - text, user i assistant turns
4. **tool_use / tool_result blocks** - w tym uwage dla agentic workflows
5. **Images** (tylko w user turns) - base64 lub URL references
6. **Documents** (tylko w user turns) - PDF, text files

Specjalny przypadek: **thinking blocks** (extended thinking). Nie mozesz ustawic cache_control BEZPOSREDNIO na thinking block (R1.C9). Ale thinking bloki z poprzednich assistant turns SA cacheowane automatycznie JEZELI w kolejnym requescie pojawiaja sie tool_result blocks. To subtelnosc zrozumiala tylko w extended thinking + agentic flows.

**Konflikt rozstrzygniety (CRITIC Konflikt 4):** LangChain docs upraszczaja do "thinking blocks nigdy nie sa cached". Platform.claude.com docs maja wyjatek dla agentic scenarios z tool_result. Cytuj docs explicitnie, nie middleware.

### 1.5 Response.usage - 4 pola do monitorowania

Kazdy response zwraca `usage` obiekt z 4 polami istotnymi dla cache (R1.C10, R7.C3):

```json
"usage": {
    "input_tokens": 50,
    "cache_read_input_tokens": 100000,
    "cache_creation_input_tokens": 248,
    "output_tokens": 503,
    "cache_creation": {
        "ephemeral_5m_input_tokens": 456,
        "ephemeral_1h_input_tokens": 100
    }
}
```

**Semantyka:**
- `input_tokens` - tokeny PO ostatnim breakpoincie (NIE cache'owalne, placone full rate)
- `cache_read_input_tokens` - tokeny odczytane z istniejacego cache (0.1x base rate - 90% zniżki)
- `cache_creation_input_tokens` - tokeny nowo zapisane do cache (1.25x lub 2x, zalezy od TTL)
- `cache_creation.ephemeral_5m_input_tokens` - ile z write poszlo na 5m slot
- `cache_creation.ephemeral_1h_input_tokens` - ile na 1h slot

**Total input formula** (R1.C11):
```
total_input = input_tokens + cache_read_input_tokens + cache_creation_input_tokens
```

**Ten formulk to podstawa monitoringu** - szczegoly w Part 7.

### 1.6 Mixing 5m i 1h TTL w jednym requescie

Mozesz mieszac oba TTL w jednym requescie, ale pod jednym warunkiem: 1h entries MUSZA pojawic sie PRZED 5m entries w fizycznym ukladzie requesta (R1.C14, R5.C13). Typowy uklad:

```
[tools]                                              # static
[system: rules + examples with cache_control 1h]    # rzadko zmienne
[system: today's RAG docs with cache_control 5m]    # semi-static
[messages: conversation history]                     # growing
[messages: current user query]                       # dynamic, no cache_control
```

Billing przy mieszanym TTL (R1.C20):
- Pozycja **A** = najwiekszy cache hit token count (odczyt z istniejacego cache)
- Pozycja **B** = najwiekszy 1h cache_control block po A
- Pozycja **C** = ostatni cache_control block (5m lub end-of-static)

**Oplaty:**
- Cache read tokens dla A (po 0.1x)
- 1h write tokens dla (B-A) (po 2x)
- 5m write tokens dla (C-B) (po 1.25x)

### 1.7 Wspierane modele i workspace isolation (Feb 2026)

**Wszystkie aktywne Claude modele wspieraja prompt caching** (R1.C15):
- Opus 4.7, 4.6, 4.5, 4.1, 4
- Sonnet 4.6, 4.5, 4, 3.7
- Haiku 4.5, 3.5, 3
- Claude Mythos Preview

**Zmiana architektoniczna od 5 lutego 2026** (R1.C16): cache uzywa **workspace-level isolation** zamiast poprzedniego organization-level. Implikacja: ten sam prefiks wpisany przez zespol A i zespol B w roznych workspacach **NIE dzieli cache entry**. Zmusza to do restructurowania multi-team workloads - jezeli liczysz na shared cache, musisz byc w tym samym workspacie.

Dla standardowego developera (jeden workspace per aplikacja) to zmiana transparentna.

### 1.8 Caveat krytyczny: Opus 4.7 tokenizer

Opus 4.7 uzywa nowego tokenizera ktory **moze wygenerowac do 35% wiecej tokenow dla tego samego tekstu** (R1.C17, R3.C14). Implikacje:

1. Twoje budget pricing zalozony na Opus 4.5/4.6 moze byc niedoszacowany o 35%.
2. Liczba tokenow w system prompt moze przekroczyc minimum 4096 dla Opusa gdzie wczesniej byla akurat.
3. Cache hit ratio moze wygladac identyczne, ale total costs wyzsze bo wiecej tokenow per hit.

**Rekomendacja:** zaloz 35% bufor w token budget jezeli migrujesz z Opus 4.5/4.6 do 4.7.

### 1.9 Async cache creation - burst scenario ostrzezenie

Cache entries sa tworzone asynchronicznie (R1.C18). W burst scenariuszach (np. 100 parallel requestow w tej samej sekundzie z tym samym prefiksem) drugi i kolejne requesty moga jeszcze nie widziec cache pierwszego. Trzeba **poczekac na response pierwszego** przed wypalaniem reszty.

Ten fakt jest fundamentem priming pattern w Part 6 - zawsze 1 priming request przed batch, z oczekiwaniem na response.

### 1.10 Lookback ma ograniczenia

Automatic caching ma 20-block lookback window dla detekcji hitow (R1.C12). Ale ta funkcja dziala **TYLKO dla entries ktore wczesniejsze requesty juz zapisaly** (R1.C19). Nie znajdzie "stable content behind the breakpoint" w pierwszym requescie - sama nie zdecyduje "aha, to bedzie cached w przyszlosci".

**Praktyczna konsekwencja:** pierwszy request w sesji ZAWSZE placi full write cost. Dopiero od drugiego pojawia sie benefit. Break-even analiza w Part 3 bierze to pod uwage.

## Part 2 - TTL, invalidacja i marzec 2026 (R2 core, konflikt Anthropic)

### 2.1 Dwie wartosci TTL: 5m (default) vs 1h (extended)

Anthropic oferuje dwie dlugosci cache (R2.C1): 5 minut (default) i 1 godzina (extended). Roznica finansowa (R2.C2):

| TTL | Koszt write | Break-even |
|-----|-------------|------------|
| 5m (default) | 1.25x base input | po 1 odczycie |
| 1h (extended) | 2x base input | po 2 odczytach |

**5m default** to racjonalny wybor dla interaktywnych konwersacji - chat, agent w petli, IDE assistant. Wspolczynnik 1.25x znaczy, ze placisz 25% ekstra za to ze cache jest zapisywany. Break-even po 1 hit: jezeli masz **przynajmniej 1 follow-up request** w ciagu 5 minut, cache jest oplacalny.

**1h extended** dla workflow gdzie request comes less frequently (np. Batch processing, nocny pipeline, agent dzialajacy raz na 20 minut). 2x write cost wymaga 2 hitow zanim sie zwroci.

### 2.2 TTL resetuje sie przy kazdym cache hit

Jeden z najwazniejszych, a malo oczywistych faktow (R2.C3): **TTL resetuje sie przy kazdym cache hit**. Nie countdown od write, tylko od ostatniego use.

Implikacja: aktywna sesja multi-turn z requestami co 2-3 minuty moze utrzymac 5m cache przez **godziny** bez placenia za 1h. Dopoki jest regularny traffic, 5m jest wystarczajacy.

**Wybor 1h ma sens gdy:**
- Gap miedzy requestami > 5 minut (ale < 1 godziny)
- Bulk workflow z batchem ktory trwa kilka godzin
- Scenariusze z predictable "thinking time" (uzytkownik zastanawia sie 10 minut nad response)

**Wybor 5m ma sens gdy:**
- Interaktywny chat
- Agent z szybka petla tool-use
- Sesja Claude Code z aktywnym codingiem

### 2.3 Incydent marzec 2026 - kontrowersja cache TTL

**6 marca 2026** wydarzyla sie jedna z najbardziej spornych zmian w historii Claude API: Anthropic cicho zmienil default cache TTL z 1h na 5m (R2.C4). Zmiana **nie byla ogloszona w changelogu**, nie pojawila sie w dokumentacji przez ~tydzien.

**Skutki community (R2.C5, R4.C11, R7.C12):**
- Max Plan uzytkownicy Claude Code doznawali 100% quota exhaustion w **70 minut** zamiast normalnych 8 godzin
- Wielu developerow API raportowalo drastyczne zwiekszenie cache_creation_input_tokens w logs
- Alex Volkov (@altryne) opublikowal PSA post na X z MITM dumpem pokazujacym zmiane

**Anthropic odpowiedz (R2.C6):** 13 kwietnia 2026 The Register opublikowal artykul "Anthropic: Claude quota drain not caused by cache tweaks" - oficjalne stanowisko ze quota drain mial inne przyczyny.

**Rozstrzygniecie konfliktu (CRITIC Konflikt 1):** prawda prawdopodobnie gdzies posrodku. To byl **multi-cause incident**:
1. TTL regression (R2.C4) - udokumentowana w logach, niezaprzeczalna
2. Session resume bug (R4.C9 / R2.C12) - v2.1.89+ /resume lub --continue forced full cache rebuild
3. Cache creation inflation (R4.C10 / R2.C14) - v2.1.100+ inflates ~20K tokens vs v2.1.98

Wszystkie trzy kumulatywnie spowodowaly percepcje quota drain. Anthropic zaprzecza "TTL" jako jedynej przyczynie - i to prawda. Ale community widzi ze byly bugi cache. Konkluzja: **uczciwa synteza przedstawia oba side'y**.

### 2.4 Absolute invalidators - co kasuje WSZYSTKO

Nastepujace zmiany inwaliduja caly prefiks cache (tools + system + messages) (R2.C7, R1.C5-C6):

1. **Zmiana definicji tools** - dodanie/usuniecie narzedzia, zmiana name/description/input_schema
2. **Zmiana modelu** (nawet patch version - Opus 4.5 -> 4.6 to rebuild)
3. **Context compaction** (R2.C18) - /compact replaces history with summary = hard semantic break
4. **Zmiana workspace** (Feb 2026 change)

To sa **niezalezne od twojej kontroli** w niektorych sytuacjach (Anthropic wypuszcza nowy patch model), wiec monitoruj hit ratio po upgradach.

### 2.5 Layer invalidators - kasuja polowe

Partial invalidacja (R2.C8):
- **tool_choice change** - tools + system invalidated, messages nie
- **Images added/removed w messages** - tools + system invalidated
- **System prompt edit** - system + messages invalidated, tools pozostaje

### 2.6 Subtle invalidators - trudne do wykrycia

Ta kategoria jest najbardziej pulapkowa (R2.C9, R5.C10, R5.C18):

1. **Timestamp w system prompt** - kazdy timestamp to auto-invalidator bo rozni sie request-to-request. Classic anti-pattern: `"You are assistant. Today is {date}. Rules..."`
2. **User-specific data w system prompt** - tworzy unique cache per user zamiast jeden shared. N userow = N cache entries.
3. **Capitalization drift** - dwie literkowe zmiany kasuja cache. Udokumentowany test: 2727 tokens cache invalidated przez capitalization dwoch liter.
4. **Whitespace drift** - trailing spaces, different newline styles.
5. **Tool order w arrays** - `[A, B, C]` vs `[A, C, B]` daje rozne serialization = different prefix = cache miss (R5.C15). Rekomendacja: alphabetic order konsystentnie.

### 2.7 Edge case: dodanie 1 message vs 1 tool

Fundamentalna roznica dla planowania sesji (R2.C10, R2.C11):

**Dodanie jednej wiadomosci (user lub assistant) na koncu messages:**
- POPRZEDNI prefiks NIE jest inwalidowany
- Nowa wiadomosc jest "po breakpoincie" i placona regular rate
- Multi-turn conversation dziala idealnie z pattern automatic caching

**Dodanie jednego tool (nawet MCP add mid-session):**
- CALY cache jest kasowany (tools + system + messages)
- Nastepny request placi full rate za rebuild calego prefiksu
- Kosztowna operacja na dluzszych sesjach (18k+ CLAUDE.md + tools + history)

**Rekomendacja (R5.C7):** rejestruj wszystkie potencjalnie potrzebne tools na starcie sesji. Nie dodawaj dynamicznie. Nawet "optional" tools lepiej zalaczyc z warunkowym tool_choice="none" niz dynamicznie.

### 2.8 Claude Code specific regressions (2026)

Oprocz marzec 2026 incidentu, trzy konkretne bugi ktore zmaterialnie wplynely na uzytkownikow (R2.C12-C14, R4.C8-C10):

1. **v2.1.62 (Feb 2026):** Server-side KV cache stale context (Issue #29230). Model pracuje na nieaktualnym kontekscie po compaction. P1 severity.

2. **v2.1.89+ resume bug (Issue #42338):** `--continue` lub `/resume` completely invalidates the prompt cache, even when re-entering within seconds. Forces full cache_creation of **400-500k tokens** each time. Na dlugiej sesji z duzym prompt to dziesiatki dolarow za kazdy powrot.

3. **v2.1.100+ (Mar 2026) cache inflation (Issue #46917):** cache_creation inflates **~20K tokens** vs v2.1.98 dla tej samej payload. Issue #24147 dodatkowo raportuje cache read tokens konsumujace **99.93% quota** przez CLAUDE.md re-reads - architecturalne scaling issue.

**Workaround (R4.C18):** uzywaj `/clear` + nowa sesja zamiast `--continue` jezeli masz dluga historie. Alternatywa: downgrade do v2.1.88 lub >=v2.1.105 (po fixach). Rekomendacja zespolowa (R2.C20): **freeze CCh version** w zespole, wait 2 tygodnie po release zanim upgradujesz.

### 2.9 Plugin state change - ukryty invalidator

Subtelnosc dla zaawansowanych uzytkownikow Claude Code (R2.C19): jezeli plugin Claude Code zmienia swoje state (np. plugin docycza CLAUDE.md), cala user content jest rewritten - Issue #27048. To plugin API rather than user-space, ale pokazuje ze **state management w rozszerzeniach wplywa na cache**.

### 2.10 Kosztowe konsekwencje failed cache

Gdy cache pada, koszt rosnie **10-20x dla tej tury** (R2.C16, R7.C16). To bo bez cache placisz base input rate (Opus 4.5+: $5/MTok) zamiast cache read rate (0.1x = $0.50/MTok = 10x tanszy).

Dla sesji Claude Code z 18k token prefix, pojedyncze failed cache event = ~$0.09 ekstra. Pomnoz przez 100 turns regression (typowy dzien developera) i masz $9 ekstra dziennie = ~$200/miesiac dla jednego developera. To ciecie zysku w Pro Plan $20/m dla Anthropic.

**Nalezy monitorowac cache_hit_ratio jako core SLO metric.** Rekomendacja progu w Part 7.

## Part 3 - Ekonomika i pricing (R3 core)

### 3.1 Base pricing tabela (kwiecien 2026)

Aktualne ceny Anthropic API per milion tokenow (R3.C2):

| Model | Input ($/MTok) | Output ($/MTok) |
|-------|----------------|------------------|
| Opus 4.7 / 4.6 / 4.5 | $5 | $25 |
| Opus 4.1 / 4 | $15 (deprecated) | $75 |
| Sonnet 4.6 / 4.5 / 4 | $3 | $15 |
| Sonnet 3.7 | $3 | $15 |
| Haiku 4.5 | $1 | $5 |
| Haiku 3.5 | $0.80 | $4 |
| Haiku 3 | $0.25 | $1.25 |

**Wazna obserwacja (R3.C3):** Opus 4.5 zmniejszyl sie 3x vs Opus 4/4.1 (z $15 na $5). To sam w sobie znacznie wieksza nowina dla zespolow heavy-Opus niz sam cache.

### 3.2 Cache multipliers (uniwersalne miedzy modelami)

Mnozniki cache aplikuja sie identycznie do kazdego modelu (R3.C1):

| Operacja | Mnoznik | Koszt relative |
|----------|---------|----------------|
| 5m cache write | 1.25x base | 25% drozej |
| 1h cache write | 2x base | 100% drozej |
| Cache read (hit) | 0.1x base | 90% taniej |

**Konkretne liczby dla Sonnet 4.6** ($3 base input):
- 5m write: $3.75/MTok
- 1h write: $6.00/MTok
- Cache read: $0.30/MTok

**Dla Opus 4.7** ($5 base):
- 5m write: $6.25/MTok
- 1h write: $10.00/MTok
- Cache read: $0.50/MTok

### 3.3 Break-even analiza

Matematyka break-even dla 5m cache (R3.C4):
- Koszt write = 1.25x = **2500 extra tokens** za 10000 tokens (vs regular)
- Oszczednosc per read = 10000 * 0.9 = **9000 saved tokens**
- 2500 < 9000, wiec **po 1 hit juz oplacalne**

Dla 1h cache (R3.C5):
- Koszt write = 2x = **10000 extra tokens** za 10000
- 2 hits * 9000 saved = 18000 > 10000 extra
- **Break-even po 2 hitach**

**Praktyczna regula:**
- 5m cache: uzyj ZAWSZE jezeli oczekujesz >=2 requestow w ciagu 5 minut z tym samym prefixem
- 1h cache: uzyj ZAWSZE jezeli oczekujesz >=3 requestow w ciagu godziny (dla marginesu)

### 3.4 Du'An Lightfoot case study - $720 -> $72 (90% savings)

Najbardziej cytowany case study w community (R3.C6, R2.C15, R7.C6):

**Setup:**
- YouTube analytics bot
- System prompt: **81,251 tokenow** video metadata JSON
- 100 requests per dzien
- Model: Sonnet (base $3/MTok)

**Pre-cache ekonomika:**
- 81251 tokens * $3/MTok = $0.244 per request
- 100 req/day * $0.244 = **$24.40/dzien**
- Miesiecznie: **$720/miesiac**

**Post-cache (5m TTL) ekonomika:**
- Pierwszy request = 1 * $0.305 (write at 1.25x) = $0.305
- Kolejne 99 requesty = 99 * $0.0244 (read at 0.1x) = $2.42
- Razem dziennie: $2.72
- Miesiecznie: **$72/miesiac**

**Oszczednosc: $648/miesiac, 90% redukcja.** Break-even po 2. requescie tego samego dnia.

Lekcja: duze static prefix (>50k tokens) daje **ekstremalne savings**. System prompt powyzej 10k tokens to natural fit dla caching.

### 3.5 Claude Code economics - 80% savings, 96% hit rate

Typowa Claude Code dev session (R3.C7, R7.C7):

**Setup:**
- System prompt + tools + CLAUDE.md: **~18k tokens stable prefix**
- 100 turns per sesja
- Model: Opus 4.5/4.7 ($5 base)

**Pre-cache:**
- 9k input tokens * $5/MTok per turn = $0.045
- Plus output costs ~$0.50 per turn
- 100 turns: **$50-100 per sesja**

**Post-cache (96% hit rate):**
- Input tokens z cache: 1.3k input * $5 + cached 18k * $0.50 = $0.0156
- Plus output (nie cache'owane): ~$0.10-0.19 per turn
- 100 turns: **$10-19 per sesja**

**Oszczednosc: 80% (~$40-81 per sesja).** Przy heavy use: **viability Pro Plan $20/m zalezy od cache** (R4.C14) - bez cache Anthropic by tracil na kazdym userze.

### 3.6 Pricing modifier stacking

Mnozniki cache sie **stackuja** z innymi modifier (R3.C8):

**Batch API (50% off):**
- Batch + Cache Read: 0.5 * 0.1 = **5% of base = 95% discount**
- Dla Sonnet 4.6: $0.15/MTok zamiast $3 regular

**Data residency US-only (1.1x multiplier):**
- Aplikuje sie do WSZYSTKICH kategorii (input, output, cache write, read) (R3.C9)
- Opus 4.7 + US-only: $5.50 base, $0.55 cache read

**Fast mode (Opus 4.6 only, 6x premium):**
- Fast + 5m cache read = $30 * 0.1 = $3/MTok (10% of fast mode base) (R3.C10)
- Niekompatybilne z Batch

**Przyklad stackingu maksymalnego:**
- Haiku 4.5 ($1 base) + Batch (0.5x) + 5m cache read (0.1x) = $0.05/MTok
- **95% off Haiku baseline = 98.3% off Sonnet baseline**

### 3.7 Long context (1M tokens) at standard pricing

Opus 4.7, 4.6 i Sonnet 4.6 maja **full 1M token context window AT STANDARD PRICING** (R3.C11). Implikacja: cache stays valuable nawet w 1M-token context. Prior generations mialy premium pricing za >200k context - teraz to eliminowane.

Dla RAG aplikacji z 500k token context documents, cache jest absolutnie niezbedny - bez niego koszt kazdego requesta to $1.50 dla Sonnet. Z cache read: $0.15.

### 3.8 Porownanie z konkurencja (2026)

Pozycjonowanie Anthropic vs OpenAI vs Google (R3.C12, R3.C13):

| Provider | Mechanizm | Savings na read | Write cost | Minimum |
|----------|-----------|-----------------|------------|---------|
| Anthropic | Explicit cache_control | 90% (0.1x) | 1.25x/2x | 1024-4096 tok |
| OpenAI | Automatic (zero config) | 50% (0.5x) | Free (0x) | >1024 tok |
| Google Gemini | Explicit cachedContents | 75% (0.25x) | Free (0x) | billed storage/minute |

**Anthropic unique trade-off (R3.C13):**
- Highest savings na read (90% vs OpenAI 50%, Gemini 75%)
- Tylko Anthropic wymaga PAY FOR WRITE upfront
- Zamiana "automagic free cache" na "control + 2x wyzsze savings"

Dla heavy-read workflows Anthropic wygrywa ekonomicznie (break-even po 1 hit). Dla single-shot workflows OpenAI jest tanszy (0 write cost).

### 3.9 Opus 4.7 tokenizer caveat

Opus 4.7 ma nowy tokenizer uzywajacy do **35% wiecej tokenow dla tego samego tekstu** (R3.C14, R1.C17). Implikacja: migrating z Opus 4.6 do 4.7:
- Ten sam system prompt moze kosztowac 35% wiecej
- Cache hit w pelni dziala, ale total token count rosnie
- Budgeting: dodaj 35% bufor

**Rekomendacja:** jezeli performance Opus 4.7 nie jest krytyczna, zostan na 4.6 dopoki migracja jest niezbedna. 35% extra cost za te same savings ratio to policzalne.

### 3.10 Kiedy cache KOSZTUJE WIECEJ (anti-patterns)

Cache nie jest zawsze oszczednoscia. Scenariusze gdzie placisz wiecej (R3.C15):

1. **Single-shot request** - 1 write at 1.25x, zero reads. Czyste 25% ekstra za nic.
2. **Prefiks ponizej minimum** - 2000 tokens dla Sonnet 4.6 (minimum = 2048). Cache fails silently, placisz full rate.
3. **Wysoki churn rate** - prefix zmienia sie co request. Kazdy request = write + invalidation.
4. **Session lifetime < 5m z requestami > 5 minut apart** - TTL wygasa przed kolejnym hit.
5. **1h TTL dla krotkotrwalych chatow** - 2x write cost bez hope of 2 hits.

### 3.11 Output tokens NIE sa cache'owane - wazny ograniczenie

Ciesznie zaskakujaca fakt: **cache dziala TYLKO na input tokens** (R3.C16). Output tokens placisz zawsze full rate.

Implikacja: jezeli twoja aplikacja generuje **dlugie outputy** (np. 10k token code generation), cache na 50k input zrobi ci 90% savings na input, ale output pozostaje dominantny cost.

**Przyklad:** Opus 4.7, 50k input + 5k output:
- Input ze cache read: 50000 * $0.50/MTok = $0.025
- Output regular: 5000 * $25/MTok = $0.125
- Output to 83% total cost

**Strategia:** minimuj output length (request brief responses, use structured output), jezeli input-heavy scenariusz.

### 3.12 Effective cost formula (monitoring)

Per request effective cost (R3.C17, R7.C4):

```python
def effective_cost_input(usage, base_rate):
    return (
        usage.input_tokens * base_rate +
        usage.cache_read_input_tokens * base_rate * 0.1 +
        usage.cache_creation.ephemeral_5m_input_tokens * base_rate * 1.25 +
        usage.cache_creation.ephemeral_1h_input_tokens * base_rate * 2.0
    ) / 1_000_000
```

Ten snippet to fundament monitoring w Part 7. Kazdy production deployment powinien to logowac per request.

## Part 4 - Claude Code CLI caching (R4 core)

### 4.1 4-warstwowy cache CCh

Claude Code CLI uzywa prompt caching **bardzo agresywnie** - automatycznie cache'uje 4 warstwy prefiksu (R4.C1):

1. **System prompt** (~4000 tokenow) - stale rules, tool conventions, security, git workflow
2. **Tool definitions** (~5000-15000 tokenow) - 10+ built-in tools + dynamicznie zarejestrowane MCP
3. **CLAUDE.md** (1-20k tokenow) - user i project-level instructions
4. **Conversation history** - rosnie z sesja, auto-cached z 20-block lookback

Wszystkie 4 warstwy formuja prefix, za ktorym pojawia sie dynamic current user message.

### 4.2 96% cache hit rate jako oficjalny benchmark

**Real Claude Code sessions achieve 96% cache hit rates** through aggressive multi-layer caching (R4.C2). Ta liczba pojawia sie w Anthropic blog i internal metrics.

Warunki zachowania 96% (R4.C15):
- Sesja continuous, requesty co **<5 minut** (dla 5m TTL refresh)
- Brak MCP tool changes mid-session
- Brak file edit w CLAUDE.md (jakakolwiek edycja = invalidation)
- Brak model switch
- Brak `/compact` ani `/clear`

W praktyce te warunki sa czesto lamane (developer edituje CLAUDE.md, dodaje plugin, sesja trwa godziny), dlatego **REAL cache hit rate waha sie 70-96%** (R4.C16).

### 4.3 System-reminder mechanism - magia dynamicznego kontekstu

Jedna z najciekawszych inzynierskich decyzji CCh (R4.C3). **Problem:** jak dodac dynamic context (timestamp, git status, user name) bez lamania cache?

**Rozwiazanie Anthropic:** zamiast wstawiac date do system prompta (co bylo by invalidatorem), CCh injectuje je jako **XML tagi w messages array**:

```xml
<system-reminder>
SessionStart:compact hook success: PRZYPOMNIENIE PO KOMPAKCJI:
- Kazda nowa wersja = OSOBNY PLIK
- Najnowsza wersja: v32.16
- Jezyk interfejsu: polski
</system-reminder>
```

To jest genialny pattern dla kazdej aplikacji ktora chce dynamic context z zachowaniem cache:

1. System prompt pozostaje static (cacheable)
2. Dynamic info leci jako `<system-reminder>` XML tag na poczatku user message
3. Model "widzi" aktualny kontekst ale cache nie cierpi

**Rekomendacja:** uzyj tego patternu w swoich aplikacjach. Wszystko co ma timestamp, user state, session info - do system-reminder w messages, nie w system prompt.

### 4.4 System prompt dynamic boundary (reverse-engineered)

**Uwaga confidence:med** (R4.C4): na podstawie reverse-engineering (Piebald-AI project), system prompt CCh zawiera marker `__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__` dzielacy prompt na dwie polowki:

- **Static half** (rules, tool conventions, security) - cacheowane stabilnie przez dlugi czas
- **Dynamic half** (computed values) - cacheowane tylko do `/clear` lub `/compact`

To NIE jest oficjalnie udokumentowany w Anthropic docs - to jest reverse-engineered z binarkow. Piebald-AI (github.com/Piebald-AI/claude-code-system-prompts) udostepnil dumpy system promptow per CCh version (R4.C17).

**Implikacja:** system prompt CCh jest identyczny dla wszystkich userow tej samej wersji (R4.C5) - shared cache prefix. To podstawa ekonomii Pro Plan.

### 4.5 Behawior /compact i /clear - subtelnosci

Dwie komendy fundamentalnie rozne w wplywie na cache (R4.C6, R4.C7):

**`/compact`:**
- Kompaktuje messages history do summary
- **Zachowuje** cache dla system + tools + CLAUDE.md (~18k tokenow)
- Zwalnia ~80% context window
- Cache **STARYCH wiadomosci** (przed compaction) jest **guaranteed stale** (R2.C18)
- Nie mozesz polegac na cache tego co bylo przed /compact

**`/clear`:**
- Conversation history cleared -> cache dla messages layer invalidated
- System prompt + tools + CLAUDE.md layer **ZACHOWANE** przez TTL (5m lub 1h)
- Nastepny request placi za nowy messages prefix ale nie za tools/system
- Tansza opcja jezeli potrzebujesz "reset conversation"

**Kiedy uzyc:**
- `/compact` - context window jest pelny, chcesz kontynuowac ale nie tracic historii
- `/clear` - zaczynasz nowy, nieswiazany temat, chcesz czyste messages

### 4.6 MCP tools mid-session = katastrofa cache

Dodanie MCP tool mid-session to najbardziej kosztowna operacja na cache (R4.C12, R2.C11):

```
Dodajesz MCP tool -> tools array sie zmienia
-> invalidates tools layer
-> cascade: invalidates system + CLAUDE.md + messages (caly prefix)
-> nastepny request placi full rate za 18k+ tokens rebuild
```

Dla developera z 18k CLAUDE.md, pojedyncze MCP add mid-session = **~$0.09 ekstra** (Opus). Pomnoz przez 10-20 takich operacji dziennie = $1-2 ekstra.

**Rekomendacja:** rejestruj wszystkie MCP servers na starcie sesji. Jezeli nie uzywasz MCP w tej sesji, nie dodawaj - ale jezeli jest szansa, dodaj od razu.

### 4.7 CLAUDE.md economics - 87% savings

Prosty worked example (R4.C13):

**CLAUDE.md z 5000 tokenow, 100 turn session, Opus ($5 base):**

Bez cache:
- 5000 * $5/MTok per turn = $0.025
- 100 turns = **$2.50 samej CLAUDE.md**

Z cache (96% hit):
- Pierwszy turn: 5000 * $6.25/MTok (write) = $0.0313
- 99 nastepnych: 5000 * $0.50/MTok (read) = $0.0025 each = $0.2475
- Razem: **$0.28**

Savings: $2.50 -> $0.28 = **87% reduction**. 

To tylko CLAUDE.md. Dodaj tools (~10k) i system prompt (~4k) i skala rosnie.

### 4.8 Pro Plan viability zalezy od cache

Claude Code Pro Plan za $20/miesiac jest **ekonomicznie viable TYLKO dzieki cache'owi** (R4.C14). Typowy user robi 1000+ requests/miesiac. Bez cache, koszt byl by:

- 1000 turns * 18k tokens * $5/MTok = $90/miesiac tylko za static prefix per user

Anthropic by tracil $70+ na kazdym Pro Plan uzytkowniku. Z 96% cache hit rate, koszt static prefix per user spada do ~$4-5 miesiecznie, co mozna amortyzowac przez $20 subscription plus output tokens.

**Impilkacja dla biznesu:** cache NIE jest feature - to fundamentalny component business model Anthropic. Dlatego regressions (marzec 2026) byly tak bolesne - to rwalo strukturalnie rentownosc.

### 4.9 Chronologia wersji 2026 - co kiedy psulo

Timeline bugow Claude Code 2026 (R4.C8-C10, R2.C13-C14):

- **v2.1.62 (Feb 2026)** - Server-side KV cache stale context (Issue #29230). Model pracuje na nieaktualnym kontekscie po compaction. **P1**.
- **v2.1.89+ (~Feb-Mar 2026)** - `--continue` / `/resume` completely invalidates prompt cache (Issue #42338). 400-500k tokens cache_creation przy kazdym resume.
- **v2.1.100+ (Mar 2026)** - cache_creation inflation (Issue #46917). Ta sama payload inflates ~20K tokens vs v2.1.98.
- **6 marca 2026** - TTL default silently changed z 1h na 5m.
- **13 kwietnia 2026** - The Register publikuje Anthropic denial.

Community tools (R7 cnighswonger/claude-code-cache-fix) wypelniaja luke z patches dla affected wersji.

### 4.10 Rekomendacje dla Claude Code uzytkownikow

Praktyczne hygiene rules z research (R4.C15, R4.C18, R2.C20):

1. **Freeze CCh version w zespole** na v2.1.88 lub >=v2.1.105 (po fixach). Nie upgraduj w dniu release - wait 2 tygodnie.
2. **Uzywaj /clear zamiast --continue** dla dluzszych sesji jezeli masz duzy context.
3. **Nie edytuj CLAUDE.md w trakcie sesji** - wyjdz, zedytuj, wroc.
4. **Rejestruj wszystkie MCP servers na start** - nie dodawaj dynamicznie.
5. **Monitor cache_hit_ratio przez /status** - ponizej 70% to sygnal problemu.
6. **Zuzywaj `/status` regularnie** - cache metrics sa widoczne.

### 4.11 Community tools wypelniajace luki

Anthropic nie wypuscil oficjalnego dashboardu dla CCh cache metrics. Community tools:

- **bokonon23/clawdbot-cost-monitor** (deepwiki) - live dashboard Slack alerts
- **sstklen/claude-api-cost-optimization** - code examples patterns
- **Sagargupta16/claude-cost-optimizer** - guide collection (`08-prompt-caching.md`)
- **cnighswonger/claude-code-cache-fix** - fix patches dla CCh regression (Mar 2026+)
- **Luong Nguyen Medium** - methodology "How I Debugged Claude Code's 9% Cache Spike" (bisekcja CLAUDE.md)

Piebald-AI `github.com/Piebald-AI/claude-code-system-prompts` reverse-engineered wszystkie wersje system prompt - cenny resource dla understanding co sie zmienia per release.

## Part 5 - Design patterns i anti-patterns (R5 core)

### 5.1 Zlota zasada: static first, dynamic last

Cache dziala prefiksowo. Wszystko od poczatku requesta do breakpointu jest kandydatem do cache hit, wszystko po breakpoincie jest placone per request (R5.C1). Dlatego jedna zlota zasada:

**Strukturyzuj prompt tak, zeby najbardziej statyczne fragmenty byly na poczatku, a najbardziej dynamiczne na koncu.**

Naturalny porzadek Anthropic API juz sprzyja temu patternowi (R5.C2):

```
[tools]   - static (rzadko zmienne)
[system]  - semi-static
[messages] - dynamic (rosna z konwersacja)
```

Wewnatrz kazdej warstwy dalej trzymaj static before dynamic: w system array najpierw niezmienne rules, potem RAG documents, na koncu uzytkownik-specyficzne; w messages array najpierw history, potem current user message.

### 5.2 Wzorzec 1: Single breakpoint (80% use cases)

Rekomendowany jako default (R5.C3). Jeden `cache_control` na ostatnim blokku statycznym:

```python
client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[{
        "type": "text",
        "text": large_static_context,  # 10k tokens rules + docs
        "cache_control": {"type": "ephemeral"}
    }],
    messages=[...dynamic_conversation...]
)
```

**Kiedy:** masz jedna warstwe statycznego contentu ktora zmienia sie z ta sama czestotliwoscia.
**Plusy:** prostota, najmniej zarzadzania.
**Kiedy NIE:** wieloszczeblowa zmiennosc (rules miesiacami, docs dziennie).

### 5.3 Wzorzec 2: Two breakpoints (rarely vs frequently)

Dla systemow z mieszana zmianami (R5.C4):

```python
system=[
    {
        "type": "text",
        "text": rules_and_rarely_changing,  # miesiacami
        "cache_control": {"type": "ephemeral", "ttl": "1h"}  # 1h bo trwa wolniej
    },
    {
        "type": "text",
        "text": today_rag_documents,  # dziennie
        "cache_control": {"type": "ephemeral"}  # 5m default
    }
]
```

**Kiedy:** RAG systemy z dwoma warstwami freshness.
**Plus:** zmiana daily documents **nie invaliduje rules cache**. Zmiana rules invaliduje oba (bo rules sa wczesniej).
**Ograniczenie:** 1h entries MUSZA appear BEFORE 5m w requescie (R5.C13, R1.C14).

### 5.4 Wzorzec 3: Incremental conversation (multi-turn agent)

Automatic caching z top-level flagiem (R5.C5):

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
- W kolejnym requescie automatycznie przesunie breakpoint do przodu
- Utrzyma 20-block lookback dla hit detection

**Kiedy:** multi-turn chat, agent z iteracyjnym tool use, kazda aplikacja gdzie messages szybko rosna.
**Plus:** bezobslugowy, nie trzeba manipulowac breakpointami.
**Minus:** jeden breakpoint tylko. Dla multi-layer freshness uzyj explicit.

### 5.5 Wzorzec 4: Prefix promotion (priming cache)

Dla batch workflow (R5.C6, R6.C4):

```python
# Step 1: Wyslij 1 request z pelnym prefiksem + cache_control
priming = client.messages.create(
    system=[{
        "type": "text",
        "text": prefix_to_cache,  # 50k tokens
        "cache_control": {"type": "ephemeral", "ttl": "1h"}
    }],
    messages=[{"role": "user", "content": "Initialize."}]
)

# Step 2: Teraz wszystkie subsequent requesty z tym samym prefix daja hit
for task in batch_tasks:
    response = client.messages.create(
        system=[{"type": "text", "text": prefix_to_cache, "cache_control": {"type": "ephemeral", "ttl": "1h"}}],
        messages=[{"role": "user", "content": task}]
    )
```

**Kiedy:** masowe przetwarzanie (Batch API + cache), kazdy task korzysta z tego samego 50k context.
**Plus:** amortyzuj koszt write na duzej liczbie reads.
**Krytyczne:** czekaj na response priming przed batch (R1.C18 - cache creation async).

### 5.6 Wzorzec 5: Tool prefix stability

Tools to pierwsza warstwa cache - jej invalidacja kasuje WSZYSTKO (R5.C7, R4.C12). Dlatego:

- **Rejestruj wszystkie tools na starcie sesji**
- "Optional" tools LEPIEJ zalaczyc zawsze z warunkowym `tool_choice="none"` niz dodawac dynamicznie
- **NIE edytuj tool description mid-session** (nawet drobna zmiana = pelny rebuild)
- **Alphabetic order tools w array** (R5.C15) - consistent serialization

Anty-pattern:
```python
# Turn 1: tools = [read_tool, write_tool]
# Turn 2: tools = [read_tool, write_tool, bash_tool]  # ZLAMALES CACHE
```

Korzystny pattern:
```python
# Zawsze wszystkie tools, niech model decyduje
tools = [read_tool, write_tool, bash_tool, grep_tool]
```

### 5.7 Wzorzec 6: Few-shot prefix

Few-shot examples ZAWSZE w system, NIGDY w messages (R5.C8):

**ZLE:**
```python
messages=[
    {"role": "user", "content": "Example 1: Q -> A"},
    {"role": "assistant", "content": "Understood."},
    # ... 50 more examples
    {"role": "user", "content": current_query}
]
```

Cache widzi examples jako dynamiczne turny - potencjalny hit ale nieefektywny.

**DOBRZE:**
```python
system=[{
    "type": "text",
    "text": "You are an expert. Here are 50 examples:\n[examples]",
    "cache_control": {"type": "ephemeral"}
}]
messages=[{"role": "user", "content": current_query}]
```

Cache cleanly hits na examples, current_query placone regular rate.

### 5.8 Wzorzec 7: Multi-user isolation

Multi-user aplikacja - user data w messages, shared prefix w system (R5.C9):

**ZLE:**
```python
system=f"Assistant for user {user_id}. Preferences: {user_prefs}. Rules: {rules}"
# Kazdy user tworzy unique cache -> N entries zamiast 1
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
```

Shared cache dla wszystkich userow w workspace. Po Feb 2026 workspace-level isolation, NIE dzieli sie miedzy workspace'ami.

### 5.9 10 anti-patternow - czego unikac

Lista rekomendacji (R5.C10-C12, R5.C18):

1. **Timestamp w system prompt** - kazdy request invaliduje. Zamiast: `<system-reminder>` w messages (Part 4.3).
2. **User-specific data w system prompt** - unique cache per user. Zamiast: user data w messages.
3. **Dynamic data at top of messages** (przed static examples) - breakpoint lapie dynamic. Zamiast: static first.
4. **Zmiana tool description mid-session** - kasuje tools layer. Zamiast: freeze tools.
5. **Model switch mid-session** - Opus -> Sonnet = pelny rebuild. Zamiast: subagenty.
6. **CLAUDE.md edytowana podczas sesji CCh** - kasuje layer. Zamiast: edytuj poza sesja.
7. **Cache_control na blokach ponizej minimum** - fails silently, no savings. Zamiast: pilnuj dlugosci.
8. **Cache bez reuse** - single-shot z cache_control placi 1.25x za nic. Zamiast: tylko gdy >=2 requesty planowane.
9. **1h TTL dla krotkotrwalych konwersacji** - 2x write, nigdy nie break-even. Zamiast: 5m default.
10. **Capitalization drift** - 2 literkowe zmiany kasuja cache. Zamiast: freeze text static.

### 5.10 RAG pattern - prawidlowa kolejnosc

Dla aplikacji RAG kompletna struktura (R5.C13):

```
[tools] - static
[system: role + rules] - static (1h cache_control)
[system: RAG documents batch] - semi-static (5m cache_control)
[messages: conversation history] - growing (auto cache)
[messages: current user query] - dynamic (no cache_control)
```

Dwa breakpointy:
1. Po system rules (1h TTL)
2. Po RAG documents (5m TTL)

Ordering constraint: 1h entries MUST appear before 5m.

### 5.11 Agentic workflow pattern

Dla multi-step agentow (Claude Agent SDK, LangChain, LlamaIndex) (R5.C14):

```
[tools: full set] - static (stable dla sesji)
[system: role + workflow rules] - static (1h cache)
[messages: tool_use + tool_result history] - growing (auto cache)
[messages: current step instruction] - dynamic
```

Agentic workflow typowo ma DUZO messages (tool calls + results), wiec automatic caching jest kluczowy - breakpoint przesuwa sie do przodu i kazdy step cache'uje cala historie.

**Framework support (R5.C17):**
- **LangChain:** `AnthropicPromptCachingMiddleware` - auto-implementuje pattern
- **LlamaIndex:** Anthropic Prompt Caching integration - per-request flaga
- **Spring AI:** Anthropic module wspiera - mniej dojrzale

### 5.12 Tools array order matters

Zmiana tylko kolejnosci `[A, B, C]` -> `[A, C, B]` kasuje cache - inny serialization (R5.C15). **Rekomendacja: alphabetic order tools.**

To community practice, nie oficjalna spec. Ale consistent across frameworks.

### 5.13 Nie ufaj defaults po marcowej regression

Praktyczna uwaga bezpieczenstwa (R5.C19): po marcu 2026 **NIE ufaj domyslnemu TTL bez eksperymentu**. Zawsze ustawiaj `ttl` explicite jezeli zalezy ci na konkretnej dlugosci:

```python
"cache_control": {"type": "ephemeral", "ttl": "5m"}  # explicite
# zamiast
"cache_control": {"type": "ephemeral"}  # moze dac 5m albo 1h zaleznie od wersji
```

### 5.14 Porownanie z OpenAI / Gemini

Trade-offs miedzy providerami (R5.C16):

- **OpenAI:** Automatic caching >1024 tokenow. Zero config. 50% savings. Nie trzeba myslec.
- **Anthropic:** Explicite cache_control. Wymaga design. 90% savings. Kontrola nad breakpointami.
- **Gemini:** Explicite cachedContents API - osobny endpoint, billed per minute storage.

Dla Anthropic **trzeba myslec** o cache design. Nie ma automagic. Ale nagroda (2x wyzsze savings niz OpenAI) to kompensuje dla heavy-read workflows.

### 5.15 7 patternow - universal coverage

Podsumowanie 7 patternow (R5.C20):

1. **Single breakpoint** - 80% use cases, prostota
2. **Two breakpoints** - RAG, mixed freshness
3. **Incremental (automatic)** - multi-turn, agents
4. **Priming** - batch workflows
5. **Tool prefix stability** - agentic systems
6. **Few-shot prefix** - instruction tuning via examples
7. **Multi-user isolation** - shared prefix + per-user messages

Kombinujac z anti-patterns (timestamp w system, user data w system), otrzymujesz **80-90% tokens savings** w typowych scenariuszach.

## Part 6 - Batch API + caching stacking (R6 core)

### 6.1 Batch API podstawy

Anthropic Batch API wydany **pazdziernik 2024** oferuje 50% discount na BOTH input and output tokens w zamian za async processing z SLA do 24 godzin (R6.C1). Mechanika:

1. Composujesz batch_file z lista requestow
2. Wysylasz do Batch endpoint
3. Anthropic processuje asynchronicznie w queue (typical: <1h, max 24h)
4. Pobierasz results file

**Idealne use cases:**
- Offline RAG reindexing
- Document classification w bulk (10k+ dokumentow)
- Code review na tysiacach PR
- Bulk translation
- Evaluation / benchmarking (testy na 1000+ examples)

### 6.2 Stacking 95% total discount

Z Anthropic docs: "These multipliers stack with other pricing modifiers, including the Batch API discount and data residency" (R6.C2).

Compound math dla Sonnet 4.6 cache read:
- Regular: $3 / MTok
- Batch: $3 * 0.5 = $1.50
- Cache read: $3 * 0.1 = $0.30
- **Batch + Cache read: $3 * 0.5 * 0.1 = $0.15 / MTok**
- **Effective discount: 95% vs baseline**

Tabela compound pricing Sonnet 4.6 (R6.C6):

| Mode | Input ($/MTok) | Output ($/MTok) |
|------|----------------|------------------|
| Regular | $3 | $15 |
| 5m cache write | $3.75 | - |
| 1h cache write | $6 | - |
| Cache read | $0.30 | - |
| Batch regular | $1.50 | $7.50 |
| Batch + 5m write | $1.875 | $7.50 |
| Batch + 1h write | $3 (same as regular input!) | $7.50 |
| Batch + cache read | **$0.15** | $7.50 |

**Obserwacja (R6.C11):** Batch + 1h write jest *tyle samo* co regular input - nie drozszy. Ale daje prawo do 1h tanich reads dla kolejnych batches. To optymalny jednorazowy write koszt dla workflow z nightly batch w ciagu 1h.

### 6.3 Best-effort cache hits w batch

Cache hits w batch sa "best-effort" (R6.C3) - concurrent processing w any order. Obserwowane hit rates 30-98% zaleznie od traffic pattern:

**Scenario A (30% hit rate):** Batch 1000 requests z cache_control na shared prefix bez pre-existing cache. System processuje concurrently, niektore wpadaja na cache write (pierwszy w queue), reszta - w zaleznosci od kolejnosci execution - moze trafic na hit albo napisac ponownie.

**Scenario B (95-98% hit rate):** Priming pattern (nastepny punkt).

**Scenario C (70% mieszany):** Batch rozlany w wielu partiach bez priming. Pierwsze requesty placa write, reszta hit.

### 6.4 Priming pattern - krok po kroku (recipe 95%+ savings)

Najbardziej efektywny pattern (R6.C4, R5.C6):

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
assert priming.usage.cache_creation_input_tokens > 0  # Cache napisany

# Step 2: Batch 1000 requests z tym samym prefix - wszystkie hit
batch_requests = []
for task in tasks_1000:
    batch_requests.append({
        "custom_id": task.id,
        "params": {
            "model": "claude-sonnet-4-6",
            "max_tokens": 1024,
            "system": shared_prefix,  # IDENTYCZNY z priming
            "messages": [{"role": "user", "content": task.content}]
        }
    })

batch = client.messages.batches.create(requests=batch_requests)
```

Batch processuje sie w 1h window - wszystkie trafia na cache hit.

### 6.5 Worked example: $150 -> $7.79 (94.8% savings)

Konkretne liczby dla 50k-token prefix + 1000 requests + Sonnet 4.6 (R6.C7):

**Baseline (no optimization):**
- 1000 * 50000 * $3/M = **$150**

**Batch only (50% off):**
- 1000 * 50000 * $1.5/M = **$75** (50% savings)

**Cache only (priming + 999 reads):**
- 1 * 50000 * $6/M (1h write) + 999 * 50000 * $0.30/M (read)
- = $0.30 + $14.99 = **$15.29** (90% savings)

**Cache + batch (priming + 999 batch reads):**
- 1 * 50000 * $6/M + 999 * 50000 * $0.15/M (batch read)
- = $0.30 + $7.49 = **$7.79** (94.8% savings)

**Konflikt framework (CRITIC Konflikt 3):** LLMindset marketing "95% discount" to od baseline, NIE od batch. Cache + batch = 5% of base input price = 95% total discount vs regular. Precyzyjne framowanie krytyczne.

### 6.6 Haiku 4.5 + Batch + Cache = 98.3% optimum

Dla offline bulk work gdzie task pozwala na Haiku (R6.C8):

Comparison table 1000 tasks 50k prefix:
| Strategy | Total cost | Savings vs Sonnet baseline |
|----------|-----------|----------------------------|
| Sonnet baseline | $150 | 0% |
| Sonnet + Batch + Cache | $7.79 | 94.8% |
| Haiku 4.5 baseline | $50 | 67% |
| Haiku 4.5 + Batch + Cache | **$2.55** | **98.3%** |

Dla workflow gdzie zadanie nie wymaga Opus/Sonnet precision (document classification, bulk extraction, translation), Haiku 4.5 + Batch + Cache to niezwykle skaleczenie kosztow.

### 6.7 Batch incompatibility list

Batch NIE dziala z (R6.C5):
- **Fast mode** (Opus 4.6 only) - eksplicit opt-out
- **Claude Managed Agents** - stateful sessions
- **Real-time use cases** - async SLA
- **Streaming responses** - batch non-streaming
- **Synchronous UI integration** - blokuje UX

Co **dziala mimo Batch** (R6.C12):
- Tool use + tool_result bloki (cache'uja sie normalnie)
- Multi-turn conversations w kazdym batch request (self-contained)
- Images + text mix
- System + tools + messages caching (pelna hierarchia)

### 6.8 1h TTL dla Batch jest obowiazkowy

Batch moze trwac do 24h - dla duzych batch uzywaj `ttl: "1h"`, NIE 5m (R6.C9).

```python
# ZLE dla 1000+ task batch
"cache_control": {"type": "ephemeral"}  # 5m default - wygasnie przed batch zakonczy

# DOBRZE
"cache_control": {"type": "ephemeral", "ttl": "1h"}
```

Uwaga: jezeli batch trwa >1h (np. 5000 tasks w queue), cache wygasa dla pozniejszych requestow - placisz rewrite. Dla bardzo duzych batchy rozwaz podzial na chunki <= 1000.

### 6.9 Concurrent batches - race condition

Scenariusz (R6.C10):
- Team A submits batch_A z shared prefix X at 10:00
- Team B submits batch_B z shared prefix X at 10:05

Czy batch_B dostaje cache hit z batch_A write? **Tak, jezeli:**
- W tym samym workspace (po Feb 2026)
- Prefix jest bajt-za-bajtem identyczny
- batch_A napisal cache entry przed batch_B czyta

**Ale race condition:** jezeli oba submittuja w tej samej sekundzie, kazdy batch moze napisac wlasny entry - 2 redundant writes. Efektywny hit rate dla batch_B ~50%.

**Mitygacja:** koordynacja zespolow jezeli wspolny prefix, lub akceptacja race jako acceptable overhead.

### 6.10 Chronologia launchow i community signaling

Timeline Batch + Cache evolution (R6.C13):

- **Pazdz 2024** - Batch API launch z 50% discount
- **Lato 2024** - Prompt caching general availability
- **Czer 2025** - 1h extended TTL launch: "reduces costs by up to 90%, latency by up to 85%"
- **2025** - Spring AI, LangChain, LlamaIndex integration
- **Feb 2026** - workspace isolation
- **Q1 2026** - AWS Bedrock adds 1h caching (R6.C15)
- **Mar 2026** - TTL regression incident
- **Apr 2026** - The Register artykul

Anthropic X announcements implicitly promuja "extended agent workflows" przez 1h cache - batch patterns sa sugerowane w marketing nawet nie wprost.

### 6.11 Framework support dla Batch + Cache

Status 2026-Q2 (R6.C14-C15):

- **LangChain** - `AnthropicPromptCachingMiddleware` dziala dla Batch endpointu, wymaga explicite ustawienia `ttl="1h"` w middleware config
- **LlamaIndex** - Anthropic Prompt Caching integration wspiera batch z `.batch_create()` method, cache params per request
- **AWS Bedrock** - Batch + cache od 2026-Q1, wymaga Bedrock Batch Inference feature
- **Spring AI** - wspiera combo, mniej dojrzale niz LangChain/LlamaIndex

### 6.12 Byte-exact matching wymagany

Priming pattern wymaga **bajt-za-bajtem matching** shared prefix (R6.C17). Jakakolwiek zmiana - whitespace, capitalization, different JSON serialization order - kasuje dopasowanie.

Praktyczna porada:
- Zapisz shared_prefix jako constant w kodzie, nie generuj dynamicznie
- Jezeli musisz generowac, uzyj fixed serialization (sort keys w JSON)
- Log prefix hash (md5) w logs priming i batch - compare zeby potwierdzic match

### 6.13 Monitoring Batch + Cache health

Alert thresholds (R6.C18, R6.C19):

- **cache_read_ratio < 50%** w batch response = problem z prefix drift lub timing
- **cache_read_ratio < 60%** dluzszy okres = zbadaj drift (capitalization, whitespace, tool order)
- **2+ redundant cache_creation_input_tokens** w batch = race condition, koordynuj z innymi teams

Log per batch:
- `batch_id`
- `batch_size`
- `prefix_hash` (md5 of shared prefix)
- `hit_ratio` (sum of cache_read / total input)
- `start_time`, `end_time` (batch duration vs TTL)

### 6.14 Batch + Cache jako underutilized money-saver

R6.C20 stwierdza: Batch + Cache stacking to **najbardziej niewykorzystywany money-saver w Anthropic stack**. Dla offline bulk 95%+ discount rutynowo osiagalne - ale malo firm tego uzywa bo:

1. Wymaga refactor aplikacji do async workflow
2. Wymaga zmiany myslenia o "real-time" vs "batch"
3. Framework support jest nowy (2025+)
4. Brak oficjalnych benchmarkow marketingujacych to

**Rekomendacja biznesowa:** audit swoje workflow i identify wszystko co moze byc batch (offline RAG reindexing, nightly evals, bulk classification). Migracja przyniesie 95% savings na tych workloadach.

## Part 7 - Monitoring, dashboardy, community (R7 core)

### 7.1 Kluczowa metryka: cache_hit_ratio

Metryka zdrowia cache'u (R7.C1):

```
cache_hit_ratio = cache_read_input_tokens / (cache_read + cache_creation + input)
```

Benchmarki per context (R7.C5):

| Context | Expected hit ratio |
|---------|---------------------|
| Pierwszy request w sesji | 0% (wszystko to cache_creation) |
| Drugi request | 80-95% |
| Multi-turn conversation (normal) | 85-95% |
| Claude Code session | 96% |
| Batch API + priming | 95-98% |
| Batch API bez priming | 30-70% |
| Po /compact | 50-80% (tylko tools+system+CLAUDE.md hit) |
| Po model switch | 0% |
| Po MCP tool add | 0% |

**Alert threshold** (R7.C2): ratio <50% przez 3+ consecutive requests w aktywnej sesji = prawdopodobny invalidation trigger.

### 7.2 Cost formula (effective cost per request)

Per request effective cost input (R7.C4):

```python
def effective_cost_input(usage, base_rate):
    """
    Returns effective input cost for a request.
    base_rate in $/MTok (e.g. 5 for Opus 4.7)
    """
    return (
        usage.input_tokens * base_rate +
        usage.cache_read_input_tokens * base_rate * 0.1 +
        usage.cache_creation.get('ephemeral_5m_input_tokens', 0) * base_rate * 1.25 +
        usage.cache_creation.get('ephemeral_1h_input_tokens', 0) * base_rate * 2.0
    ) / 1_000_000
```

Ten snippet to fundament dashboarding - kazdy production deployment powinien logowac per request.

### 7.3 Response.usage anatomy

Szczegoly 4 kluczowych pol (R7.C3):

```json
{
  "usage": {
    "input_tokens": 50,
    "cache_read_input_tokens": 100000,
    "cache_creation_input_tokens": 248,
    "output_tokens": 503,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 148,
      "ephemeral_1h_input_tokens": 100
    }
  }
}
```

- `input_tokens` - po ostatnim breakpoincie, platne full rate
- `cache_read_input_tokens` - odczytane z cache, 0.1x base
- `cache_creation_input_tokens` - nowo zapisane, sum of 5m + 1h breakdown
- `cache_creation.ephemeral_5m_input_tokens` - 1.25x base
- `cache_creation.ephemeral_1h_input_tokens` - 2x base

### 7.4 Case studies - 4 konkretne przyklady

**Case 1: Du'An Lightfoot** (R7.C6) - szczegoly w Part 3.4. 81251 tokens video metadata, 100 req/day, **$720 -> $72 = 90% savings**.

**Case 2: Claude Code dev session** (R7.C7) - szczegoly w Part 3.5. ~18k tokens static + 100 turns, **$50-100 -> $10-19 = 80% savings** dzieki 96% hit rate.

**Case 3: Support ticket processing** (R7.C8) - Anthropic example:
- 10,000 tickets
- Haiku 4.5
- Average conversation 3700 tokens
- Koszt: **$37 per 10,000 tickets** = $0.0037 per ticket

**Case 4: Alex Volkov Max Plan case** (negative) - 100% quota exhaustion w 70 min vs 8 hours normalnie. Po reverse-engineering 2 bugi cache invalidation. Lekcja: gdy cache zawodzi, placisz **10-20x drozej** (R7.C16).

### 7.5 Monitoring patterns - 4 poziomy zaawansowania

**Pattern A: Simple ratio check** (MVP):
```python
if usage.cache_read_input_tokens / total_input < 0.5:
    alert("Low cache hit - investigate")
```

**Pattern B: Historical tracking** - log per session:
- session_id, turn_number
- cache_hit_ratio
- invalidation_event (if ratio dropped >20%)

**Pattern C: Cost-based alerting** (R7.C15):
```python
effective_cost = effective_cost_input(usage, base_rate)
if effective_cost > base_rate * 0.3:  # more than 30% of base
    alert(f"Cache not effective, cost spike: {effective_cost}")
```

**Pattern D: Dashboard z Grafana/Datadog** - export time-series:
- `claude.cache.read_tokens`
- `claude.cache.creation_tokens`
- `claude.cache.hit_ratio`
- `claude.cache.invalidation_events`

Panel:
- Line chart: hit_ratio over time
- Bar chart: invalidation events per day
- Counter: total savings $ since deployment

### 7.6 Invalidation event taxonomy (debugging checklist)

Gdy ratio spada, szukaj jednej z tych przyczyn (R7.C11):

| Event | Gdzie znajdziesz |
|-------|------------------|
| Model switch | config change, model parameter mid-session |
| MCP tool add/remove | MCP config change |
| CLAUDE.md edit | file mtime change |
| System prompt change | app deployment / config reload |
| Timestamp w static | code review - find `datetime.now()` |
| Capitalization drift | git diff w static files |
| TTL expired | gap miedzy requesty > 5m (albo 1h) |
| Compact / clear | user command trace |

### 7.7 Luong Nguyen bisection methodology

Klasyczna debugging metodologia (R7.C9). Luong Nguyen napisal Medium article "How I Debugged Claude Code's 9% Cache Spike in One Prompt":

1. Run session z `/status` sprawdza cache metrics
2. Hipoteza: zmiana w system powoduje spike
3. **Bisekcja:** usuwamy polowe CLAUDE.md, testujemy; potem druga polowe
4. Zidentyfikuje single trigger
5. Root cause: pojedyncza linia w CLAUDE.md powodowala 9% cache invalidation spike
6. Fix: przenies linie poza cacheable block

**Zastosowanie:** Uniwersalne dla cache issues. Scala bezbledne od debug codu - jezeli nie wiesz co psuje cache, dziel i testuj.

### 7.8 Community tools ekosystem

Status Apr 2026 (R7.C10):

| Tool | Use case | Status |
|------|----------|--------|
| bokonon23/clawdbot-cost-monitor | Live dashboard, Slack alerts | Active |
| sstklen/claude-api-cost-optimization | Code examples, patterns | Active |
| sagargupta16/claude-cost-optimizer | Guide collection | Active |
| cnighswonger/claude-code-cache-fix | Fix patches dla CCh regression | Active (Mar 2026+) |
| Piebald-AI/claude-code-system-prompts | RE system prompts per wersja | Active |
| prompt-caching.ai | Marketing / promo | Not a tool |
| LangChain middleware | Framework integration | Production-ready |
| LlamaIndex integration | Framework integration | Production-ready |

### 7.9 Sentiment community - ewolucja marca-kwietnia 2026

**Pozytywne sentyment 2025 (R7.C13):**
- "90% savings is insane, why didn't I use this sooner"
- 1h TTL announcement dobrze przyjety
- Claude Code 96% hit rate chwalony
- Claude Code Pro $20 viable dzieki cache

**Negatywne sentyment marzec 2026 (R7.C12):**
- Max Plan quota exhaustion narrative (70 min vs 8h)
- "Silent TTL change" - brak transparentnosci
- Alex Volkov PSA post (patched w media coverage)
- The Register artykul zarzuca Anthropic defensive stance

**Neutralne obserwacje:**
- Spring AI, LangChain, LlamaIndex dodaja wsparcie - community recognizes feature
- AWS Bedrock 1h cache announcement (stycz 2026) - enterprise adoption
- GitHub issue velocity (tygodnie stale do apr 2026) = aktywna debata

### 7.10 Reddit opinion patterns

Direct r/ClaudeAI search zablokowany, ale via pośredniki (R7.C17):

- r/ClaudeAI: aktywne dyskusje Max Plan costs, prompt caching configs
- r/LocalLLaMA: porownywania Anthropic 90% vs OpenAI 50% - Anthropic bardziej ceniony
- r/MachineLearning: dyskusje techniczne KV cache architecture

Typowe opinie:
- "90% savings is insane"
- "Burned hard by March TTL change"
- "Claude Code worth $20 thanks to cache"
- **"Cache invalidation is a minefield, tread carefully"**

### 7.11 Advanced dashboarding metrics

Minimalistyczny set (R7.C14):
1. `cache_hit_ratio` (rolling 10-turn average)
2. `cost_per_turn` (calculated)
3. `invalidation_events_per_hour` (licznik)
4. `tokens_saved_vs_baseline` (kumulowana oszczednosc)

Advanced:
5. `cache_creation_breakdown` (5m vs 1h)
6. `per_user_cache_efficiency` (multi-user app)
7. `prefix_reuse_rate` (unique prefixes vs reused)
8. `ttl_effectiveness` (% cache wygasa przed reuse)

### 7.12 Factcheck: 100x vs 10x myth

Ngrok i niektore blogi podaja "100x cheaper" (R7.C18) - to **exaggeration**. Faktycznie multiplier to 0.1x = **10x cheaper** (90% savings). Nie 100x.

Waznosc: dla enterprise budget planning, uzyj correct multiplier. 100x planowanie prowadzi do niedoszacowania kosztow.

### 7.13 Brak oficjalnego Anthropic dashboardu

Istotna luka (R7.C19, CRITIC Gap 2): **Anthropic nie oferuje oficjalnego dashboardu cache metrics dla klientow API.** Musisz budowac wlasny.

**Brak oficjalnej integracji z:**
- Datadog
- New Relic
- PagerDuty
- Splunk

Community projekty (bokonon23/clawdbot, cnighswonger/cache-fix) wypelniaja luke, ale nie sa enterprise-grade.

### 7.14 Brak SLA dla cache availability

Krytyczna uwaga prawna (R7.C20): **Brak SLA dla cache availability**. Jezeli cache system Anthropic spadnie (rare), API nadal dziala ale placisz full rate - oczywista degradacja kosztowa bez oficjalnego incident response.

**Dla enterprise compliance:** zaznacz w contract / SLA jakie sa fallback procedures gdy cache jest nieavailable. Anthropic nie zobowiazuje sie do cache uptime.

### 7.15 Rekomendacje monitoring dla zespolow

Minimalny monitoring (wdrozenie w ciagu dnia):
1. Log `usage.cache_read_input_tokens` i `usage.cache_creation_input_tokens` per request
2. Oblicz cache_hit_ratio per session (rolling average)
3. Alert < 50% przez 3+ requestow w rzad

Production monitoring (tydzien pracy):
1. Export metrics do Grafana/Datadog
2. Track invalidation events jako discrete wydarzenia
3. Trend per tydzien - regression detection
4. Cost reports weekly - demonstruje ROI zespolom

Debugowanie cache drops (godziny-dni):
1. Uzyj bisection (Luong Nguyen method)
2. Identify single trigger
3. Fix (przenies dynamic content do messages, freeze static)

Tool recommendation: zacznij z `bokonon23/clawdbot-cost-monitor`, dostosuj do swojego stack.

## Part 8 - Synteza rekomendacji (decision tree)

### 8.1 Decision tree: czy uzyc cache?

Pytania w kolejnosci:

**Q1: Czy oczekujesz >=2 requestow z tym samym prefixem w okienku TTL?**
- NO -> **Nie uzywaj cache**. Single-shot z cache_control placi 1.25x za nic.
- YES -> Continue Q2

**Q2: Jaka dlugosc prefiksu?**
- < minimum (1024/2048/4096 per model) -> **Nie uzywaj cache**, fails silently
- >= minimum -> Continue Q3

**Q3: Czy prefiks sie zmienia miedzy requestami?**
- Czesto (co request) -> **Nie uzywaj cache**, wysoki churn
- Rzadko lub nigdy -> Continue Q4

**Q4: Jaki czas miedzy requestami?**
- <5 minut -> **Uzyj 5m TTL** (default)
- 5-60 minut -> **Uzyj 1h TTL** (jezeli >=3 requests)
- >60 minut -> **Nie uzywaj cache**, TTL wygasnie

**Q5: Czy robisz bulk offline workload?**
- YES -> **Batch API + Cache + priming** (95% savings)
- NO -> Continue Q6

**Q6: Czy masz multi-layer freshness?**
- Single layer -> **Single breakpoint pattern**
- Two layers (rules + docs) -> **Two breakpoints pattern** (RAG)
- Complex agentic -> **Automatic caching top-level**

### 8.2 Wybor modelu vs cache trade-off

Strategia modelowa (kwiecien 2026):

| Priorytet | Rekomendacja |
|-----------|--------------|
| Max accuracy | Opus 4.7 + cache (pamietaj 35% tokenizer inflation) |
| Balanced performance/cost | Sonnet 4.6 + cache |
| Max savings offline | Haiku 4.5 + Batch + Cache (98.3% vs Sonnet baseline) |
| Real-time chat | Sonnet 4.6 + 5m cache |
| Agent heavy tool-use | Sonnet 4.6 + auto cache |
| Bulk classification | Haiku 4.5 + Batch + 1h Cache |

**Cost comparison 1000 requests, 50k prefix:**
- Opus 4.7 baseline: $250
- Opus 4.7 + cache: ~$30
- Sonnet 4.6 + cache: ~$15
- Sonnet 4.6 + Batch + Cache: ~$8
- Haiku 4.5 + Batch + Cache: ~$2.55

### 8.3 Anti-pattern blacklist

**Zawsze unikaj:**
1. Timestamp w system prompt (anti-pattern #1)
2. User-specific data w system prompt (N cache entries)
3. Cache_control na blokach <minimum (silent fail)
4. Tool description edit mid-session (kasuje cache)
5. Model switch mid-session (full rebuild)
6. 1h TTL dla chatu krotkotrwalego (2x koszt bez break-even)
7. Single-shot request z cache_control (25% ekstra za nic)
8. Capitalization drift w static content (2 literki = invalidation)
9. Tool order zmiana [A,B,C] -> [A,C,B] (different serialization)
10. CLAUDE.md edit w trakcie CCh sesji (kasuje layer)

### 8.4 Obsluga incydentu marzec 2026 - balansowana postawa

Jak podejsc do incydentu (CRITIC Konflikt 1 rozwiazanie):

**Co jest pewne:**
- TTL regression 6 marca 2026 - udokumentowana w logach
- Max Plan quota drain - raportowane przez community
- v2.1.89+ resume bug - Issue #42338
- v2.1.100+ cache inflation - Issue #46917

**Co jest sporne:**
- Czy TTL regression byla przyczyna quota drain, czy jedna z wielu przyczyn
- Czy Anthropic wie o tym i robi intentional change (community hipoteza) vs bug (oficjalna wersja)

**Rekomendacja:**
- Freeze CCh version (v2.1.88 lub >=v2.1.105)
- Monitor cache_hit_ratio po kazdym upgrade
- Wait 2 tygodnie po release zanim pojdziesz na nowa wersje
- Log explicite `ttl` parameter, nie polegaj na defaults
- Bez uprzedzen ale z zdrowym sceptycyzmem

### 8.5 Roadmap adoption caching w nowym projekcie

**Sprint 1 (2 dni):**
1. Dodaj single cache_control na ostatni static block system
2. Log `usage.cache_read_input_tokens` + `cache_creation_input_tokens`
3. Potwierdz w pierwszych 5 requestach ze cache dziala (cache_creation > 0 w pierwszym, cache_read > 0 w kolejnych)

**Sprint 2 (1 tydzien):**
4. Implementuj cost formula
5. Alert na hit_ratio < 50%
6. Dashboard w Grafana/Datadog (prosty)

**Sprint 3 (2 tygodnie):**
7. Refactor do cache-first design (static first, dynamic last)
8. Identify bulk workload candidates dla Batch
9. Priming pattern dla repeated prefix scenarios

**Sprint 4 (miesiac):**
10. Dashboards enterprise-grade
11. Weekly cost reports z savings breakdown
12. Team training na anti-patterns

### 8.6 Kiedy cache NIE jest odpowiedzia

Cache to potezne narzedzie ale nie panacea. Sytuacje gdzie **nie jest rozwiazaniem**:

- **Output-heavy workflow** - cache dziala tylko na input. Dlugie outputy zawsze pelna cena.
- **Unique requests** - kazdy user ma unikalne pytanie, brak shared prefix.
- **Rapidly evolving prompt** - A/B testing system prompts, dynamic templates.
- **Multi-model routing** - jezeli routujesz miedzy Opus/Sonnet/Haiku, kazdy switch = rebuild.
- **Compliance requirements** - jezeli cache nie dozwolone (regulatory, audit), nie uzywaj.

W tych przypadkach optymalizuj gdzie indziej: output length, model tier choice, batch timing.

### 8.7 Final recommendation dla readera

**Jezeli jestes developerem:**
1. Dodaj cache_control do kazdego request z prefixem >minimum i >=2 reuses
2. Uzyj 5m default, 1h tylko gdy gap miedzy requests 5-60 min
3. Static first, dynamic last
4. Timestamp/user data ZAWSZE w messages, nigdy w system
5. Monitor hit ratio, alert <50%

**Jezeli jestes architektem:**
1. Design dla cache-first od poczatku (system+tools+messages hierarchy)
2. Zidentyfikuj bulk workloads dla Batch+Cache (95% savings)
3. Zbuduj dashboards (Anthropic nie dostarczy)
4. Document patterny dla zespolu (single, two-tier, priming)
5. Workspace isolation (Feb 2026) uwzglednij w multi-tenant

**Jezeli jestes biznesem:**
1. Cache to strukturalna rentownosc (Pro Plan $20/m viable dzieki 96% hit rate)
2. Audit workflow dla batch opportunities
3. Track savings jako KPI (ROI z cache adoption)
4. Enterprise compliance: explicit SLA questions (brak oficjalnego Anthropic SLA)
5. Freeze wersje produkcyjne (marzec 2026 lekcja)

**Jezeli jestes Claude Code power userem:**
1. Freeze CCh version (v2.1.88 / >=v2.1.105)
2. Uzywaj /clear zamiast /resume dla dluzszych sesji
3. NIE edytuj CLAUDE.md w trakcie sesji
4. Rejestruj wszystkie MCP na start
5. Monitor `/status` regularnie

## Appendix A - Sources (mapowanie R1..R7)

### Raport-ID do tytuly i daty

| ID | Report | Words | Key sources |
|----|--------|-------|-------------|
| R1 | API Spec + cache_control | 1703 | platform.claude.com docs, Anthropic cookbook, LangChain/LlamaIndex middleware |
| R2 | TTL + Invalidation | 1753 | GitHub Issues (#29230, #42338, #46917, #24147), The Register Apr 2026, Alex Volkov PSA |
| R3 | Pricing Economics | 2144 | Anthropic pricing docs, Du'An Lightfoot Medium, LLMindset, Finout.io |
| R4 | Claude Code CLI | 2220 | Piebald-AI RE project, Luong Nguyen Medium, cnighswonger/claude-code-cache-fix |
| R5 | Cache-first Design | 2095 | DigitalOcean blog, PromptHub, AWS Bedrock, Spring AI, Firecrawl |
| R6 | Batch API + Caching | 2017 | Anthropic Batch docs, ai.moda, LLMindset, AWS Bedrock 1h announcement |
| R7 | Monitoring + Community | 2029 | Medium case studies, DeepWiki community tools, Reddit via proxies, X/Twitter |

**Total research corpus:** 14,061 slow raw + 4,810 slow extracts (136 claims) = 18,871 slow pre-synthesis.

### Oficjalne Anthropic zrodla (najwyzszy trust)

- platform.claude.com/docs/en/build-with-claude/prompt-caching
- platform.claude.com/docs/en/about-claude/pricing
- platform.claude.com/docs/en/build-with-claude/batch-processing
- claude.com/blog/prompt-caching
- @AnthropicAI X account

### Community case studies (rzetelne, weryfikowalne liczby)

- Du'An Lightfoot (labeveryday) Medium post - $720/m -> $72/m
- Luong Nguyen Medium - Debugged Claude Code's 9% Cache Spike
- Alex Volkov (@altryne) X post - Max Plan quota drain

### Community tools (open-source)

- bokonon23/clawdbot-cost-monitor (deepwiki)
- sstklen/claude-api-cost-optimization (deepwiki)
- Sagargupta16/claude-cost-optimizer (GitHub)
- cnighswonger/claude-code-cache-fix (GitHub)
- Piebald-AI/claude-code-system-prompts (GitHub)
- LangChain AnthropicPromptCachingMiddleware
- LlamaIndex Anthropic Prompt Caching integration

### Media coverage (external check)

- The Register 13 Apr 2026 - Claude quota drain not caused by cache tweaks
- Medium various authors (prompt caching tutorials)
- Dev.to aggregators
- AWS blog (Effectively use prompt caching on Amazon Bedrock)

### Ograniczenia source quality

- Reddit direct search zablokowany - dane via pośredniki (lower confidence na community sentiment)
- Piebald-AI RE project technicznie moze naruszac ToS - uzyto z uczciwa flaga "reverse-engineered"
- LLMindset marketing claims zweryfikowane i skorygowane (95% discount framing)

## Appendix B - Rejected / disputed claims

### Claimy odrzucone lub skorygowane w syntezie

**1. "100x cheaper cache reads"** (ngrok blog, R7.C18)
- **Faktycznie:** 10x cheaper (0.1x multiplier = 90% savings)
- **Powod odrzucenia:** marketing exaggeration, rozbieznosc z oficjalnymi docs
- **Synteza uzywa:** "10x cheaper" / "90% savings" konsystentnie

**2. "95% discount od batch"** (LLMindset 2024, R6.C16)
- **Faktycznie:** 95% discount od baseline (Batch 50% + Cache 90% = 5% of base = 95% total)
- **Powod odrzucenia:** myli poziomy (95% vs baseline != 95% off batch)
- **Synteza uzywa:** "95% total discount vs regular baseline" zawsze

**3. "Thinking blocks nigdy nie cache'owane"** (LangChain docs, R1.C9)
- **Faktycznie:** cache'owane w scenariuszach gdzie tool_result pojawia sie w nastepnym requescie
- **Powod odrzucenia:** LangChain uproszczenie, docs Anthropic maja explicit exception
- **Synteza uzywa:** precyzyjna wersja z platform.claude.com

**4. "Minimum tokens 1024 dla wszystkich modeli"** (starsze Medium/Dev.to blogs, R1.C3 conflict)
- **Faktycznie:** 4096 dla Opus 4.7/Haiku 4.5, 2048 dla Sonnet 4.6, 1024 tylko dla Sonnet 4.5 i starszych
- **Powod odrzucenia:** pre-Opus 4.7 era, outdated
- **Synteza uzywa:** aktualne minimum per model z docs

**5. "Gemini cache 0.5x read"** (niektore outdated sources, R3.C12 conflict)
- **Faktycznie:** Gemini 0.25x read (75% savings)
- **Powod odrzucenia:** outdated Google pricing
- **Synteza uzywa:** current pricing

### Claimy disputed - przyjete z flag

**1. R4.C4 __SYSTEM_PROMPT_DYNAMIC_BOUNDARY__ marker**
- **Status:** reverse-engineered z Claude Code binarkow (Piebald-AI), nie official docs
- **Confidence:** med (nie high)
- **Synteza uwzglednia:** z explicite "reverse-engineered, not officially documented" framowanie

**2. Anthropic denial vs community evidence (marzec 2026)**
- **Claim 1 (Anthropic via The Register):** quota drain not caused by cache tweaks
- **Claim 2 (community):** TTL regression spowodowala drain
- **Synteza uznaje:** multi-cause incident. Oba strony partial truth. Przedstawia oba perspektywy balanced.

**3. R4.C11 Max Plan 70 min exhaustion**
- **Status:** anegdotyczne ale z wielu zrodel (Alex Volkov, GitHub issues, Reddit)
- **Confidence:** high (cross-triangulated) mimo ze Anthropic zaprzecza korelacji z cache
- **Synteza uwzglednia:** jako obserwowany fakt, explanation multi-cause

### Brak rejected claims krytycznych

Zadnego claimu nie odrzucilismy z powodu fabrykacji lub kompletnej niedokladnosci. Wszystkie 136 claims sa w mniejszym lub wiekszym stopniu sourceable. 5 claimow skorygowanych (marketing exaggerations) i 3 disputed to maksymalnie "uczciwe misunderstandings" - nie fabrykacje.

**Zdrowa krytyka vs pipeline:** Critic PASS 7/7 raportow z average 9.2/10 bez redo. Brak revisions oznacza jakosc researchu na wysokim poziomie.

## Appendix C - Open questions / luki wymagajace follow-up

### Krytyczne luki (priorytet dla delta research)

**Gap 1: Brak publicznych benchmarkow Batch + Cache w skali 10k+ requestow**
- R6 liczy samodzielnie z formuly (94.8% savings, $150 -> $7.79)
- Brak third-party validation na skale enterprise
- **Follow-up:** delta research na GitHub/medium na 2026-Q2 Batch+Cache case studies
- **Priority:** HIGH

**Gap 7: Claude Managed Agents + CCh interakcja**
- Nowa feature 2026, docs wciąż ewoluuja
- Niejasne jak stateful sessions Managed Agents wspoluja z cache
- **Follow-up:** poczekaj na GA release Managed Agents, zamow dedicated research
- **Priority:** HIGH dla enterprise deployment planning

**Gap 8: Publiczny spec dla /compact algorytmu**
- Jak dokladnie /compact dzieli summary vs. zachowuje messages
- Jak wybiera co "compact" vs co zostawic
- **Follow-up:** reverse-engineering z Piebald-AI style lub feature request do Anthropic
- **Priority:** MED (istnieja workarounds)

### Medium-priority luki

**Gap 2: Burst workflow ze 100+ userow z identycznym prefixem**
- Brak oficjalnej guidance
- Potencjalna race condition na pierwszy cache write
- **Follow-up:** eksperymentalny benchmark w kontrolowanej skali

**Gap 3: Multi-modal patterns (images + text + tools)**
- Brak wzorcow czy images na poczatku czy koncu messages
- Czy cache zachowuje sie inaczej dla image content
- **Follow-up:** doświadczenie z Anthropic image-heavy agent benchmark

**Gap 5: Cache entries pool size per klient**
- Brak oficjalnych liczb
- Niejasne czy jest limit unikalnych prefixes jednoczesnie
- **Follow-up:** pytanie do Anthropic support dla enterprise accounts

**Gap 6: Cache availability SLA**
- Brak oficjalnego SLA
- Brak incident response procedures
- **Follow-up:** enterprise contract negotiation dla compliance-sensitive deployments

**Gap 9: Datadog/Splunk oficjalne integration snippets**
- Community projekty wypelniaja, ale nie enterprise-grade
- **Follow-up:** buduj custom lub pressure Anthropic na partner integrations

### Low-priority luki (nice-to-have)

**Pool size per klient** - niejasne limity
**Freshness filter Anthropic changelog** - brak formalnego changeloga dla cache changes
**Claude Mythos Preview 1M context + Batch+Cache** - teoretycznie kompatybilne, brak potwierdzenia
**Fast Mode + Cache benchmark** - Opus 4.6 only, malo community data
**Haiku 4.5 case studies** - glownie Sonnet/Opus cases publicznie

### Metodologiczne ograniczenia tej kampanii

**Reddit direct search zablokowany** - dane z Reddita via pośredniki zamiast direct observation. Confidence na community sentiment ponizej idealnego.

**Task/Agent tool unavailable** - cale 7 researchers roles + 7 extractors wykonane przez Orchestrator sekwencyjnie. Teoretycznie mogloby dac wiecej perspectives jezeli parallel subagents byly mozliwe. Pipeline z [deep-research-v2.md](../../.claude/commands/deep-research-v2.md) zaklada parallelism; w tym run wszystko sekwencyjne.

**RE claims (Piebald-AI)** - tylko jeden zrodlo dla __SYSTEM_PROMPT_DYNAMIC_BOUNDARY__ marker. Nie triangulowane z oficjalnymi Anthropic docs.

### Rekomendacje na next steps

1. **Q2 2026 delta research:** Gap 1 (Batch+Cache scale benchmarks) + Gap 7 (Managed Agents integration)
2. **Monitor Anthropic changelog** - dla cache-related updates
3. **Wait 3 months** po marcu 2026 incident dla stabilnego state przed enterprise adoption
4. **Enterprise contract review** - explicite zapytaj o Gap 5 (pool limits) i Gap 6 (SLA)
5. **Framework tracking** - LangChain/LlamaIndex/Spring AI dodaja support velocity, check quarterly
