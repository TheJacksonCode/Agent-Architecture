# R2 - TTL + Invalidation (Prompt Caching 2026)

**Researcher:** Tech (Researcher R2 - Archiwista oficjalnej prawdy)
**Model:** Researcher Sonnet (res_tech skill)
**Data raportu:** 2026-04-17
**Zakres:** 5-minutowy default TTL, 1-hour extended TTL, triggerny inwalidacji, edge cases, Bedrock/Vertex roznice, March + April 2026 regressions, env vars v2.1.108.
**Freshness filter:** 18 miesiecy (zrodla od pazdziernika 2024 wzwyz)

---

## Executive Summary

Prompt caching w Claude API oferuje dwie wartosci TTL: **5 minut (default)** i **1 godzina (extended)**. Wybierasz przez pole `ttl` w `cache_control`: `"ephemeral"` (domyslnie 5m) lub `"ephemeral" + "ttl": "1h"`. TTL resetuje sie przy kazdym cache hit bez dodatkowego kosztu - aktywna sesja moze utrzymac 5m cache przez godziny o ile kolejne requesty ida co <5 min.

Krytyczna nowosc 2026: **dwie wykryte, nieoglaszane regressions TTL** (March 6 i April 9), w wyniku ktorych tysiacom uzytkownikow wzrosly rachunki o 17-53% przez powrot do 5m zamiast 1h. Issue #46829 zamkniety jako "not planned". **Workaround od v2.1.108 (14 kwietnia 2026):** `ENABLE_PROMPT_CACHING_1H=1` env var wymusza 1h na wszystkich platformach (Anthropic, Bedrock, Vertex, Foundry).

Inwalidacja cache jest hierarchiczna: tools -> system -> messages. Kazdazmiana na danym poziomie kasuje ten poziom i wszystkie ponizej. Dodanie jednej wiadomosci na koncu konwersacji NIE invaliduje prefiksu (prefix matching backward). Dodanie jednego narzedzia MID-session kasuje CALY cache.

**Confidence score: 0.87** (wysoki - oficjalne docs pobrane live + empiryczne dane z 119,866 API calls + changelog v2.1.108 potwierdzony).

---

## Details

### 1. Dwie wartosci TTL - 5m vs 1h

#### Specyfikacja JSON (oficjalne docs, pobrane 2026-04-17)

```json
// 5-minute TTL (default)
{ "cache_control": { "type": "ephemeral" } }

// 5-minute TTL (explicit)
{ "cache_control": { "type": "ephemeral", "ttl": "5m" } }

// 1-hour TTL
{ "cache_control": { "type": "ephemeral", "ttl": "1h" } }
```

Zrodlo: [Anthropic Prompt Caching Docs](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)

#### Pricing per TTL (Claude Sonnet 4.6 / MTok, dane per docs 2026-04-17)

| Typ | Cena write | Mnoznik |
|-----|-----------|---------|
| Base input | $3.00 | 1.0x |
| 5m cache write | $3.75 | 1.25x |
| 1h cache write | $6.00 | 2.0x |
| Cache read (oba TTL) | $0.30 | 0.1x |

Break-even: 5m TTL po 1 odczycie; 1h TTL po 2 odczytach.

#### TTL reset on use

Oficjalne docs: "The cache is refreshed for no additional cost each time the cached content is used." Oznacza to, ze:
- Aktywna sesja z requestami co <5 min utrzymuje 5m cache bez dodatkowych kosztow
- Przerwa >5 minut = miss; kolejny request placi write cost od nowa
- Dla przerw 5-60 min: 1h TTL ekonomicznie lepszy pomimo 2x write cost

Confidence: 0.92 (oficjalne docs, bezposrednie cytowanie).

---

### 2. Hierarchia inwalidacji - pelna tabela (oficjalne docs)

Zrodlo: [Anthropic Prompt Caching Docs](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching) - tabela pobrana 2026-04-17.

| Co sie zmienia | Tools cache | System cache | Messages cache |
|---------------|-------------|-------------|---------------|
| **Tool definitions** (name/desc/schema) | INVALIDATED | INVALIDATED | INVALIDATED |
| **Web search toggle** | INVALIDATED | OK | OK |
| **Citations toggle** | INVALIDATED | OK | OK |
| **Speed setting** (fast mode) | INVALIDATED | OK | OK |
| **Tool choice** | INVALIDATED | INVALIDATED | OK |
| **Images** (add/remove anywhere) | INVALIDATED | INVALIDATED | OK |
| **Thinking parameters** (enable/disable/budget) | INVALIDATED | INVALIDATED | OK |
| **Non-tool results in extended thinking** | INVALIDATED | INVALIDATED | OK |

Zasada: "Changes at each level invalidate that level and all subsequent levels."

**Co NIE invaliduje cache** (przy poprawnym prefix matching):
- Dodanie nowych wiadomosci NA KONCU messages array
- Zwiekszenienie `max_tokens`
- Zmiana `temperature`, `top_p`, `top_k`

Confidence: 0.95 (oficjalna tabela z docs, bezposredni WebFetch).

---

### 3. Prefix matching - mechanika (oficjalne docs, 2026)

Oficjalne docs opisuja trzy zasady prefix caching:

**Zasada 1 - Cache writes sa TYLKO przy breakpoincie:**
"Marking a block with `cache_control` writes exactly one cache entry: a hash of the prefix ending at that block. The system does not write entries for any earlier position."

**Zasada 2 - Cache reads sa lookback backward od breakpointu:**
"On each request the system computes the prefix hash at your breakpoint and checks for a matching cache entry. If none exists, it walks backward one block at a time, checking whether the prefix hash at each earlier position matches something already in the cache."

**Zasada 3 - Lookback window: 20 blokow:**
"The system checks at most 20 positions per breakpoint, counting the breakpoint itself as the first. If the system finds no matching entry in that window, checking stops."

#### Przyklad lookback:
```
Turn 1: 10 blocks, breakpoint @ block 10  -> Cache WRITE @ block 10
Turn 2: 15 blocks, breakpoint @ block 15  -> Cache HIT @ block 10;
                                             process blocks 11-15 fresh;
                                             Cache WRITE @ block 15
Turn 3: 35 blocks, breakpoint @ block 35  -> NO HIT (block 15 jest poza 20-block window;
                                             block 15 = position 21 od breakpointu @ 35)
```

Wazne ograniczenie: jezeli historia rosnie szybko, mozesz "wypasc" z 20-block window i przegapic hit. Rozwiazanie: uzyj wielu breakpointow (do 4).

Confidence: 0.93 (bezposredni cytat z oficjalnych docs).

---

### 4. Edge case: dodanie 1 wiadomosci

**Scenariusz:** Masz multi-turn conversation z 10 wiadomosciami i breakpointem na koncu. Dodajesz jedną nową wiadomosc. Co sie dzieje z cache?

**Odpowiedz: TAK, poprzedni prefiks jest CAHEOWANY.**

Mechanizm:
1. Nowa wiadomosc trafia na koniec messages array
2. Breakpoint (jezeli ustawiony automatycznie lub manualnie) przesuwa sie na koniec nowej wiadomosci
3. System szuka cache hit "backward" od nowego breakpointu
4. Poprzedni breakpoint (10 wiadomosci) jest w window 20 blokow -> HIT
5. Tylko nowa wiadomosc jest procesowana fresh
6. Placi sie za: cache read (10 wiadomosci) + fresh input (1 nowa wiadomosc) + nowy cache write (11 wiadomosci)

Wyjatki:
- Jezeli nowa wiadomosc zawiera image -> tools + system cache INVALIDATED
- Jezeli nowa wiadomosc zmienia tool_choice -> tools + system cache INVALIDATED
- Jezeli sesja jest po context compaction -> semantic break, poprzedni prefiks nie pasuje

Confidence: 0.88 (wnioskowanie z official prefix matching mechanics + edge case rules).

---

### 5. Edge case: dodanie 1 narzedzia MID-SESSION

**Scenariusz:** Uzytkownik ma aktywna sesje i odpala `/mcp add` lub dodaje nowe narzedzie. Co sie dzieje?

**Odpowiedz: CALY CACHE PRZEPADA.**

Mechanizm:
1. Tools array sie zmienilo (nowe narzedzie zostalo dodane)
2. Hash prefiksu tools sie zmienil
3. Zgodnie z tabelą invalidacji: tools change -> Tools INVALIDATED + System INVALIDATED + Messages INVALIDATED
4. Kolejny request musi zbudowac cache od zera, placac 1.25x (5m) lub 2x (1h) za caly prefix

Zrodlo: [GitHub Issue #27048](https://github.com/anthropics/claude-code/issues/27048) - "Prompt Cache Invalidation on Session Resume: Tool-Use Content Not Cached, Plugin State Changes Cause Full User Content Rewrite"

W Claude Code to czesto widac gdy:
- Uzytkownik dodaje MCP plugin mid-session
- Plugin CLAUDE.md dolacza nowa linie do swojego state
- Web search jest togglowany on/off w trakcie sesji

Rozwiazanie: zamrazaj zestaw narzedzi na poczatku sesji, nie dodawaj mid-session.

Confidence: 0.90 (oficjalna tabela invalidacji + GitHub issue z reprodukcja).

---

### 6. March 6, 2026 - pierwsza silent TTL regression

**Analiza: Issue #46829 (119,866 API calls, 2 maszyny, 2 konta, Jan-Apr 2026)**

| Faza | Daty | Zachowanie |
|------|------|-----------|
| 1 | Jan 11-31, 2026 | 5m ONLY |
| 2 | Feb 1 - Mar 5, 2026 | **1h ONLY** (33+ dni bez przerwania) |
| 3 | Mar 6-7, 2026 | Mixed (przejscie) |
| 4 | Mar 8 - Apr 8, 2026 | 5m dominant |

**Impact finansowy (Sonnet 4.6):**
- Actual cost: $5,561.17
- Expected (1h TTL): $4,612.09
- **Nadplatka: $949.08 (17.1% strata)**
- Marzec osobno: 25.9% overpayment, $719.09 wasted

**Najszerszy szacunek community:** 17-53% wzrost kosztow w zaleznosci od wzorca uzycia.

**Dodatkowa analiza:** [recca0120 audit](https://recca0120.github.io/en/2026/04/14/claude-code-cache-ttl-audit/) - main agent mial zero 5m writes przez caly okres analizy; KAZDA akcja TTL Anthropica dotyczyła wylacznie **sub-agentow**. To wskazuje ze downgrade byl serwerowy i selektywny, nie globalny.

**Stanowisko Anthropic (The Register, 13 April 2026):**
- Jarred Sumner (Anthropic): "Claude Code client determines the cache TTL automatically and there are no plans for a global setting"
- Boris Cherny (Claude Code creator): "Prompt cache misses when using 1M token context window are expensive" - bada zmniejszenie default context window
- Anthropic nie przyznaje wprost ze TTL zmiana spowodowala quota drain, reframuje jako "cost optimization"

**Status Issue #46829:** Zamkniety jako "not planned" bez oficjalnego komentarza Anthropica.

Zrodla:
- [GitHub Issue #46829](https://github.com/anthropics/claude-code/issues/46829)
- [byteiota.com - $2.5K Cost Spike Analysis](https://byteiota.com/anthropic-cache-ttl-downgrade-silent-2-5k-cost-spike/)
- [The Register - Anthropic response](https://www.theregister.com/2026/04/13/claude_code_cache_confusion/)

Confidence: 0.91 (empiryczne dane z 119k+ calls + oficjalna odpowiedz Anthropica).

---

### 7. April 9, 2026 - druga silent TTL regression

**Zrodlo:** [recca0120 95-day audit](https://recca0120.github.io/en/2026/04/14/claude-code-cache-ttl-audit/) - analiza opublikowana 2026-04-14

**Odkrycie:** Poczawszy od 9 kwietnia 2026, sub-agenty przeszly na **100% 5m TTL** przez 5 kolejnych dni (4,840 API calls zero 1h writes). Pattern identyczny jak regression marcowa: "sharp binary cutover", zero announcement, zero GitHub issue.

**Roznica od marcu:**
- Marzec: dotyczylo i main agents i sub-agents
- Kwiecien: TYLKO sub-agents (main agent pozostal na 100% 1h)
- Sugeruje ze April regression byl bardziej targeted, potencjalnie intentional dla sub-agentow

Brak publicznej informacji o tej regression w momencie pisania raportu (2026-04-17).

Confidence: 0.78 (pojedyncze zrodlo, ale z solidna metodologia JSONL scan, brak corroboration).

---

### 8. Workaround - env vars (Claude Code v2.1.108, April 14, 2026)

**Changelog v2.1.108** (wydany 2026-04-14, tydzien po April regression):

Zrodlo: [claudeupdates.dev v2.1.108](https://www.claudeupdates.dev/version/2.1.108) + [X @ClaudeCodeLog](https://x.com/ClaudeCodeLog/status/2044151319913455666)

| Env var | Dzialanie | Status |
|---------|-----------|--------|
| `ENABLE_PROMPT_CACHING_1H=1` | Wymusza 1h TTL na Anthropic API, Bedrock, Vertex, Azure Foundry | **AKTYWNY** (od v2.1.108) |
| `FORCE_PROMPT_CACHING_5M=1` | Wymusza 5m TTL | **AKTYWNY** (od v2.1.108) |
| `ENABLE_PROMPT_CACHING_1H_BEDROCK=1` | Stara zmienna Bedrock-specific | **DEPRECATED** (ale nadal dziala) |

**Fix zawarty w v2.1.108:**
"Fixed subscribers who set DISABLE_TELEMETRY falling back to 5-minute prompt cache TTL instead of 1 hour"

To naprawia Issue #45381 (telemetry disable -> 5m TTL bug, zgloszone 2026-04-08).

**Praktyczny workaround (krotkoterminowy):**
```bash
export ENABLE_PROMPT_CACHING_1H=1
claude  # Teraz wszystkie sessje uzywaja 1h TTL
```

Confidence: 0.94 (bezposredni changelog + X post od oficjalnego bota changelog).

---

### 9. Bedrock - roznice vs Anthropic native

**Zrodlo:** [AWS Bedrock Prompt Caching Docs](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html) - pobrane 2026-04-17

**Kluczowe roznice:**

| Feature | Anthropic Native | AWS Bedrock |
|---------|-----------------|-------------|
| Default TTL | 5m | 5m |
| 1h TTL dostepne | TAK (wszystkie modele) | TAK (select modele) |
| Automatic caching | TAK | COMING LATER |
| Workspace isolation | TAK (od Feb 5, 2026) | NIE (org-level) |
| ENABLE_PROMPT_CACHING_1H | TAK | TAK (via Claude Code v2.1.108) |
| Cache API syntax | `cache_control` + `ttl` | `cachePoint` (Converse) / `cache_control` (InvokeModel) |

**Bedrock 1h TTL - supported models:**
- Claude Opus 4.5: TAK (1h)
- Claude Haiku 4.5: TAK (1h)
- Claude Sonnet 4.5: TAK (1h)
- Claude Opus 4.1, Opus 4, Sonnet 4, Claude 3.7 Sonnet, 3.5 Haiku, 3.5 Sonnet v2: **NIE (tylko 5m)**
- Modele serii 4.6 (Sonnet 4.6, Opus 4.6): status niepotwierdzony w docs

**ENABLE_PROMPT_CACHING_1H_BEDROCK historia:**
- Poczatkowo undokumentowana zmienna wewnetrzna Anthropica
- Ujawniona przez community w Issue #32671
- Zdeprecjonowana w v2.1.108 na korzysc `ENABLE_PROMPT_CACHING_1H` (universal)

Confidence: 0.89 (oficjalne AWS docs + Claude Code changelog).

---

### 10. Vertex AI - roznice vs Anthropic native

**Zrodlo:** [Google Cloud Vertex AI Prompt Caching Docs](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/partner-models/claude/prompt-caching) - pobrane 2026-04-17

| Feature | Anthropic Native | Google Vertex AI |
|---------|-----------------|-----------------|
| Default TTL | 5m | 5m |
| 1h TTL dostepne | TAK (wszystkie modele) | TAK (select modele) |
| 1h NIE dostepne dla | - | Claude 3.7 Sonnet, 3.5 Sonnet v2, 3.5 Sonnet, 3 Opus |
| Automatic caching | TAK | COMING LATER |
| Workspace/project isolation | Workspace (od Feb 5, 2026) | Google Cloud Project (nie zmieniono) |
| ENABLE_PROMPT_CACHING_1H | TAK (via v2.1.108) | TAK (via v2.1.108) |

**Podobienstwo:** Vertex zachowuje sie "as described in Anthropic documentation" dla prompt caching - te same zasady prefix matching, lookback 20 blokow, te same triggery invalidacji.

Confidence: 0.83 (oficjalne Vertex docs + wentuo.ai cross-platform analysis).

---

### 11. Workspace isolation - zmiana February 5, 2026

**Zrodlo:** [Anthropic Prompt Caching Docs](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)

Oficjalny cytat: "Starting February 5, 2026, prompt caching will use workspace-level isolation instead of organization-level isolation. Caches will be isolated per workspace, ensuring data separation between workspaces within the same organization."

**Impact:**
- **Przed:** Kache wspoldzielone na poziomie organizacji (wszyscy workspace'y w jednej org wspoldzielily cache)
- **Po:** Kazdy workspace ma osobny cache pool
- **Dla kogo:** Anthropic API + Azure AI Foundry (preview)
- **NIE zmieniono:** AWS Bedrock (org-level isolation), Google Vertex AI (project-level isolation)

**Praktyczny skutek:** Jezeli masz 2 serwery API w tej samej organizacji ale roznych workspace'ach, nie moga wspoldzielic cache. Przenies ich API klucze do jednego workspace jesli chcesz cache sharing.

Confidence: 0.96 (bezposredni cytat z oficjalnych docs).

---

### 12. Mixing TTL values (5m + 1h w jednym requescie)

Oficjalne docs definiuja zasade: **1-hour cache entries MUSZA pojawiac sie PRZED 5-minute entries**.

Billing dla mieszanych TTL:
```
Position A: Highest cache hit
Position B: Highest 1-hour cache_control block after A
Position C: Last cache_control block (presumably 5m)

Charges:
1. Cache read tokens for A (at 0.1x)
2. 1-hour cache write tokens for (B - A) (at 2x)
3. 5-minute cache write tokens for (C - B) (at 1.25x)
```

Konflikt TTL w automatycznym cache: jezeli ostatni blok ma explicite `cache_control` z innym TTL niz top-level automatic cache control -> API zwraca **400 error**.

Confidence: 0.91 (oficjalne docs, bezposredni cytat).

---

## Issues / Flags

### Konflikty zrodel

**Konflikt 1:** Anthropic oficjalnie (The Register) twierdzi ze "cache TTL change should not increase costs." Empiryczne dane z Issue #46829 (119,866 calls) pokazuja 17.1-25.9% nadplatke. **Rozstrzygniecie:** Anthropic moze miec racje ze intent byl cost-neutral (1-shot calls), ale dla dlugich sesji efekt byl wyraznie negatywny. Brak oficjalnej odpowiedzi na Issue #46829.

**Konflikt 2:** Issue #45381 mowi ze DISABLE_TELEMETRY powoduje fallback do 5m. Changelog v2.1.108 mowi ze to zostalo "Fixed". Ale v2.1.108 wyszedl 14 kwietnia, a regression APrzelowy (9 kwietnia) wciaz nie jest wyjasniany. Mozliwe ze fix byl partial.

**Konflikt 3:** recca0120 audit twierdzi ze April regression dotyczy TYLKO sub-agentow (main agent - 100% 1h przez caly czas). Issue #46829 sugeruje ze March regression dotyczylo i main i sub. **Rozstrzygniecie: brak pewnosci** - rozne metodologie, rozne srodowiska. Wymaga cross-validation.

**Konflikt 4:** Bedrock docs (AWS) listuje modele z 1h support jako Opus/Sonnet/Haiku 4.5, ale wentuo.ai mowi ze "4.6 series support remains unconfirmed." **Gap: brak potwierdzenia czy Sonnet 4.6 na Bedrock ma 1h TTL.**

### Gaps

**Gap 1:** Brak oficjalnej definicji co Anthropic rozumie przez "cache hit" dla celow TTL reset. Czy reset nastepuje przy kazdym API call ktory uzywa cache, czy przy kazdym cache entry access wewnatrz jednego call? Community wnioskuje z obserwacji.

**Gap 2:** Brak oficjalnego limitu cache entries per klient (lub per workspace po Feb 2026). Jezeli jest limit, kiedy entries sa eject'owane? FIFO? LRU? Brak publicznej informacji.

**Gap 3:** April 9, 2026 regression - brak oficjalnego potwierdzenia, brak GitHub issue (poza recca0120 blog). Jeden raport bez corroboration.

**Gap 4:** Vertex AI - brak explicitnej listy tokenow minimalnych per model dla 1h TTL. Docs mowia tylko ktore modele NIE maja 1h.

**Gap 5:** Automatic caching na Bedrock i Vertex - "coming later" bez daty. Brak ETA.

---

## Recommendation

1. **Explicit TTL zawsze** - nigdy nie polegaj na domysle. Ustaw `"ttl": "1h"` explicite lub `ENABLE_PROMPT_CACHING_1H=1` w Claude Code v2.1.108+.
2. **Upgrade Claude Code do v2.1.108+** - naprawia telemetry/TTL bug + daje nowe env vars.
3. **Nie dodawaj tools mid-session** - jeden dodany tool = caly cache od nowa. Planuj zestawy narzedzi przed sesja.
4. **Monitoruj `ephemeral_5m_input_tokens` vs `ephemeral_1h_input_tokens`** - jezeli widzisz 5m gdzie oczekujesz 1h, regression moze byc aktywna.
5. **Dla Bedrock:** sprawdz czy Twoj model jest na liscie supported 1h TTL (Opus/Sonnet/Haiku 4.5). Dla 4.6 - testuj empirycznie.
6. **Workspace migration:** jezeli masz wiele zespolow ktore powinny wspoldzielic cache - polacz ich API klucze w jeden workspace (po Feb 2026 izolacja jest per workspace, nie org).
7. **Freeze tool definitions** jesli zalezy Ci na cache - zmiana description nawet o 1 znak kasuje tools cache.

---

## Source links

**Oficjalne dokumenty:**
1. [Anthropic Prompt Caching Docs (live, pobrane 2026-04-17)](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)
2. [AWS Bedrock Prompt Caching Docs (live, pobrane 2026-04-17)](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html)
3. [Google Vertex AI Prompt Caching Docs (live, pobrane 2026-04-17)](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/partner-models/claude/prompt-caching)

**GitHub Issues (claude-code repo):**
4. [Issue #46829 - Cache TTL silently regressed 1h to 5m, March 2026](https://github.com/anthropics/claude-code/issues/46829)
5. [Issue #45381 - DISABLE_TELEMETRY causes 5m TTL fallback](https://github.com/anthropics/claude-code/issues/45381)
6. [Issue #42338 - Session resume invalidates entire prompt cache](https://github.com/anthropics/claude-code/issues/42338)
7. [Issue #32671 - Bedrock: Prompt caching TTL hardcoded to 5m](https://github.com/anthropics/claude-code/issues/32671)
8. [Issue #27048 - Prompt Cache Invalidation on Session Resume (plugin state)](https://github.com/anthropics/claude-code/issues/27048)
9. [Issue #41930 - Critical: Widespread abnormal usage limit drain March 2026](https://github.com/anthropics/claude-code/issues/41930)

**Changelog / Release notes:**
10. [Claude Code v2.1.108 Changelog - claudeupdates.dev](https://www.claudeupdates.dev/version/2.1.108)
11. [X @ClaudeCodeLog - v2.1.108 announcement (ENABLE_PROMPT_CACHING_1H)](https://x.com/ClaudeCodeLog/status/2044151319913455666)

**Empiryczne analizy:**
12. [byteiota.com - $2.5K Silent Cost Spike Analysis (119,866 calls)](https://byteiota.com/anthropic-cache-ttl-downgrade-silent-2-5k-cost-spike/)
13. [recca0120 - 95 Days JSONL Scan, Second Regression April 9](https://recca0120.github.io/en/2026/04/14/claude-code-cache-ttl-audit/)
14. [dev.to whoffagents - Anthropic Silently Dropped TTL from 1h to 5m](https://dev.to/whoffagents/anthropic-silently-dropped-prompt-cache-ttl-from-1-hour-to-5-minutes-16ao)

**Media / Community:**
15. [The Register - Anthropic: Claude quota drain not caused by cache tweaks](https://www.theregister.com/2026/04/13/claude_code_cache_confusion/)
16. [GitHub cnighswonger/claude-code-cache-fix - community patch](https://github.com/cnighswonger/claude-code-cache-fix)
17. [AWS Blog - Claude Code + Bedrock prompt caching](https://aws.amazon.com/blogs/machine-learning/supercharge-your-development-with-claude-code-and-amazon-bedrock-prompt-caching/)
18. [wentuo.ai - 3-platform TTL pricing comparison](https://blog.wentuo.ai/en/claude-code-prompt-caching-ttl-pricing-guide-en.html)

---

## Status i BRAMA 2

**Slowa:** ~2100 slow (powyzej minimum 1500)
**URL zrodel:** 18 (powyzej minimum 10)
**Weryfikacja:** oficjalne docs pobrane live (WebFetch), GitHub issues, v2.1.108 changelog potwierdzony
**Edge cases:** oba pokryte (1 message dodana - TAK cached; 1 tool dodany - INVALIDATION full)
**Konflikty zrodel:** 4 zidentyfikowane z rozstrzygnieciami lub "brak pewnosci"
**Gaps:** 5 zidentyfikowanych
**Nowosc vs poprzedni draft R2:**
  - Dodano oficjalna tabele invalidacji z docs (pobrany live) zamiast rekonstrukcji
  - Dodano Bedrock supported models dla 1h TTL (konkretna lista)
  - Dodano April 9 second regression (brak w poprzednim drafcie)
  - Dodano v2.1.108 env vars (ENABLE_PROMPT_CACHING_1H, FORCE_PROMPT_CACHING_5M)
  - Dodano DISABLE_TELEMETRY bug + fix w v2.1.108
  - Dodano Vertex AI specific 1h model limitations
  - Dodano workspace isolation change Feb 2026 + co sie NIE zmienilo (Bedrock, Vertex)
  - Dodano prefix matching 20-block lookback window (oficjalny cytat)
  - Dodano mixing TTL values billing formula

**BRAMA 2: PASS**
- Wszystkie kluczowe podtematy z zadania R2 pokryte: TTL 5m vs 1h (status GA), pricing (1.25x/2x), invalidation triggers (pelna tabela oficjalna), edge cases (1 message, 1 tool), Bedrock hardcoded 5m + ENABLE_PROMPT_CACHING_1H_BEDROCK env var, partial invalidation (prefix matching 20-block).
- Confidence score sredni: 0.87 - wysoki dla oficjalnych docs i changeloga, nizszy dla April regression (pojedyncze zrodlo).
- Gaps jawnie oznaczone, konflikty rozstrzygniete lub oznaczone jako nierozstrzygniete.
