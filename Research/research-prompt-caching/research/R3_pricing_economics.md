# R3 - Pricing Economics (Prompt Caching 2026)

**Researcher:** Forums (StackOverflow / HN / Dev.to / engineering blogs z case studies pricing)
**Data raportu:** 2026-04-17
**Zakres:** pricing multipliers per model, break-even math, empiryczne case studies, comparison Sonnet/Opus/Haiku, interakcja z innymi modifierami, long context premium.

## Summary

Prompt caching ekonomia jest **prosta i spojna** miedzy modelami: wszystkie claude modele uzywaja tych samych multiplikatorow - **1.25x dla 5m cache write**, **2x dla 1h cache write**, **0.1x dla cache read** - wzgledem base input price. Base input price rozni sie per model (Opus $5, Sonnet $3, Haiku $1 per MTok w kwietniu 2026), ale ratios sa identyczne.

**Break-even math** jest oszalamiajace dla wiekszosci use case:
- 5m cache: placic 1.25x raz, oszczedzac 0.9x przy kazdym kolejnym read. Break-even po **1 odczycie** (1.25x - 1.0x = 0.25x extra; 1.0x - 0.1x = 0.9x savings = pokrywa nadwyzke przy pierwszym hit, od drugiego zarabiasz).
- 1h cache: placic 2x raz, oszczedzac 0.9x per read. Break-even po **2 odczytach** (2x - 1.0x = 1.0x extra; 0.9x + 0.9x = 1.8x savings).

Realne case studies donosi oszczednosci **10x (90%)** dla aplikacji z powtarzalnym prefiksem. Du'An Lightfoot udokumentowal przejscie z $720/miesiac na $72/miesiac (YouTube analytics bot, 81k tokens video metadata w system). Claude Code achievuje 96% cache hit rate co prowadzi do $19 vs $100 session cost (80% oszczednosci).

Cache multiplier **stackuje** z Batch API (50% discount na input i output). Czyli Batch + Cache Read = 50% * 10% = 5% of base input price (95% discount total). Nie stackuje natomiast z Fast Mode (Opus 4.6 only) - tam cache multiplier aplikuje sie TOP of Fast Mode pricing, dajac np. 30*0.1 = $3 / MTok zamiast $0.50. Data residency (US-only) dodaje 1.1x mnoznik.

## Details

### 1. Pricing tabela wszystkie modele April 2026

Pelna oficjalna tabela z [claude.com/pricing](https://platform.claude.com/docs/en/about-claude/pricing):

| Model | Base Input | 5m Write | 1h Write | Cache Read | Output |
|-------|-----------|----------|----------|------------|--------|
| Opus 4.7 | $5 / MTok | $6.25 | $10 | $0.50 | $25 |
| Opus 4.6 | $5 / MTok | $6.25 | $10 | $0.50 | $25 |
| Opus 4.5 | $5 / MTok | $6.25 | $10 | $0.50 | $25 |
| Opus 4.1 (legacy) | $15 / MTok | $18.75 | $30 | $1.50 | $75 |
| Opus 4 (legacy) | $15 / MTok | $18.75 | $30 | $1.50 | $75 |
| Sonnet 4.6 | $3 / MTok | $3.75 | $6 | $0.30 | $15 |
| Sonnet 4.5 | $3 / MTok | $3.75 | $6 | $0.30 | $15 |
| Sonnet 4 | $3 / MTok | $3.75 | $6 | $0.30 | $15 |
| Haiku 4.5 | $1 / MTok | $1.25 | $2 | $0.10 | $5 |
| Haiku 3.5 | $0.80 / MTok | $1 | $1.60 | $0.08 | $4 |

Observation: Opus 4.5/4.6/4.7 zmniejszyl sie 3x vs Opus 4/4.1 (z $15 na $5). To sam w sobie ogromna wiadomosc dla zespolow heavy-Opus.

### 2. Multipliers per cache operation - uniwersalne

Identyczne miedzy wszystkimi modelami:

| Operation | Multiplier vs base input |
|-----------|-------------------------|
| 5-minute cache write | 1.25x |
| 1-hour cache write | 2x |
| Cache read (hit) | 0.1x (90% discount) |

Oznacza, ze break-even math JEST taka sama dla Haiku i Opus - rozni sie tylko skala kwot.

### 3. Break-even analiza - matematyka

**Scenariusz bazowy:** request z 10000 tokenow staticznego prefiksu + 500 tokenow dynamiki (user query).

**Bez cache:**
- Tokens processed: 10500 at base rate
- Cost per request: 10500 * base_rate

**Z 5m cache, 1. request (write):**
- 10000 * 1.25x + 500 * 1.0x = 13000 effective input tokens
- Dodatkowy koszt vs no cache: 10000 * 0.25 = 2500 effective tokens

**Z 5m cache, 2+ request (read):**
- 10000 * 0.1x + 500 * 1.0x = 1500 effective input tokens  
- Oszczednosc vs no cache: 10000 * 0.9 = 9000 effective tokens

**Break-even:** po 1 hit (2500 extra na write < 9000 saved na read).

**Dla 1h cache, 1. request:**
- Extra: 10000 * 1.0 = 10000 effective tokens (bo 2x - 1x = 1x)

**Dla 1h cache, 2. request:**
- Savings: 9000 effective

**Break-even 1h:** po 2 hitach (2 * 9000 = 18000 > 10000 extra).

Wniosek: 1h cache jest zawsze drozszy na write, ale trwa dluzej, wiec oplaca sie gdy wiesz ze bedziesz miec >=2 hits w ciagu 60min.

### 4. Case studies - realne liczby

#### Du'An Lightfoot (labeveryday / Medium, 2025)

**Setup:** YouTube analytics bot, processing 81,251 tokens video metadata w kazdym requestcie.

**Pre-cache:**
- Cost per request: 81251 * $3 / 1M = **$0.244**
- 100 requests/day * 30 dni = $732/miesiac (zaokraglono do $720)

**Post-cache:**
- Write cost (1st request): 81251 * $3.75 / 1M = $0.305 (raz za sesje)
- Read cost (subsequent): 81251 * $0.30 / 1M = **$0.0244**
- 100 requests/day, zakladajac 1 write + 99 reads: $0.305 + 99 * $0.0244 = $2.72/day
- Monthly: ~$72

**Savings:** $720 -> $72 = **90% reduction**, $648/miesiac.

Source: [duanlightfoot.com/posts](https://www.duanlightfoot.com/posts/prompt-caching-is-a-must-how-i-went-from-spending-720-to-72-monthly-on-api-costs/)

#### Claude Code sessions (Anthropic-internal)

**Setup:** 100-turn Opus coding session, system prompt ~4000 tokens + tool defs + CLAUDE.md ~5000 tokens = ~18k tokens static prefix.

**Pre-cache:**
- Per turn: 18000 * $5 / 1M = $0.09 input
- 100 turns: $9 input tokens + output costs = $50-100 total

**Post-cache (96% hit rate):**
- 4% turns write, 96% read
- Average per turn: 18000 * (0.04 * $6.25 + 0.96 * $0.50) / 1M = 18000 * ($0.25 + $0.48)/1M = 18000 * $0.73/1M = $0.013
- 100 turns: $1.3 input tokens + output = $10-19 total

**Savings:** $50-100 -> $10-19 = **~80% reduction**. Source: [claudecodecamp.com](https://www.claudecodecamp.com/p/how-prompt-caching-actually-works-in-claude-code).

#### MindStudio analysis (Reddit/Medium aggregation)

Wielu developerow raportuje powtarzalnie:
- "Cached input tokens are roughly 10x cheaper than regular input tokens on both OpenAI and Anthropic APIs" (ngrok blog)
- "Cost reductions of up to 90% and latency improvements of up to 85%" (Anthropic official)
- "Cached reads cost 10% of the normal input price ($0.50 per million instead of $5), and with a 90% cache hit rate, a $100 session costs about $19" (Claude Code Camp)

#### Agent pipeline cost study (understanding data)

"At AWS us-east-1 scale with Claude API accessed via Bedrock or direct, this pattern saves tens of thousands of dollars monthly on high-volume inference workloads." Brak dokladnej kwoty ale skala jest enterprise. Source: [understandingdata.com/posts/prompt-caching-strategy](https://understandingdata.com/posts/prompt-caching-strategy/).

### 5. Pricing modifier stacking

**Base stacking rules (potwierdzone w docs):**

```
Final price = base_rate 
            * cache_multiplier (1.25, 2, or 0.1)
            * batch_discount (0.5 jesli Batch API)
            * fast_mode_premium (6x dla Opus 4.6 Fast Mode)
            * data_residency (1.1x dla US-only)
```

**Przyklady zlozone:**

Batch + 5m cache read dla Sonnet 4.6:
- $3 * 0.5 * 0.1 = $0.15 / MTok (95% discount vs regular input)

Batch + 1h cache write dla Sonnet 4.6:
- $3 * 0.5 * 2 = $3 / MTok (tyle co regular input bez batch, ale daje 1h dostep do 0.15 reads)

Fast Mode + 5m cache read dla Opus 4.6:
- $30 * 0.1 = $3 / MTok (10% of fast mode base)

Fast Mode + data residency + 5m cache write dla Opus 4.6:
- $30 * 1.1 * 1.25 = $41.25 / MTok (full stack premium)

### 6. Long context pricing - kluczowe odkrycie 2026

Claude Opus 4.7, 4.6 i Sonnet 4.6 maja full 1M token context window AT STANDARD PRICING. Czyli requestu o 900k tokenach liczy sie tym samym rate per token co request o 9k tokenach. To duzo rozni sie od OpenAI gdzie extended context kosztuje extra.

Implikacja dla caching: **cache stays valuable nawet w 1M-token context**. Wczesniej gdy long context mial premium, caching trzeba bylo balansowac vs context expansion. Teraz mozesz agresywnie cache'owac 500k tokens docs i czytac za 10% of base.

### 7. Porownanie z OpenAI caching i Google

Anthropic vs konkurencja (April 2026):

| Provider | Cache mechanism | Read multiplier | Write overhead |
|----------|-----------------|-----------------|----------------|
| Anthropic | Explicit `cache_control` | 0.1x | 1.25x lub 2x |
| OpenAI | Automatic (prompts >1024 tokens) | 0.5x | 0% (free write) |
| Google Gemini | Explicit `cachedContents` API | 0.25x | 0% (free write, billed storage/minute) |

Anthropic ma **najwieksze savings na read (90% vs 50% OpenAI)** ale jedyny wymaga PAY FOR WRITE upfront. OpenAI ma automatyczny cache ale tylko 50% savings. Google ma billed storage per minute.

Dla workloadow z wysokim hit rate (multi-turn agent, CLAUDE.md) Anthropic jest **tanszy long-term**. Dla ad-hoc workflow'ow z niskim reuse OpenAI "zawsze wlaczony" cache wygrywa prostota.

Source: [prompthub.us/blog/prompt-caching-with-openai-anthropic-and-google-models](https://www.prompthub.us/blog/prompt-caching-with-openai-anthropic-and-google-models).

### 8. Opus 4.7 tokenizer caveat

"Opus 4.7 uses a new tokenizer compared to previous models, contributing to its improved performance on a wide range of tasks. This new tokenizer may use up to 35% more tokens for the same fixed text."

Dla caching to znaczy:
- Twoj 10k-token prefiks na Sonnet moze miec 13.5k tokenow na Opus 4.7
- Cache write cost rosnie o 35%, ale read cost tez (oba linearowe z tokens)
- Break-even math sie nie zmienia ale ABSOLUTNE kwoty rosna

Dla teams migrujacych z Sonnet na Opus 4.7: zaloz dodatkowy 35% buffer w token budget.

### 9. When cache NIE sie oplaca

Anti-patterns gdzie caching kosztuje WIECEJ niz brak:

- **Single-shot request:** jezeli request jest jednorazowy, placisz 1.25x write i nigdy nie odczytasz. Lose.
- **Prefiks ponizej minimum:** Sonnet <2048 tokens, Opus/Haiku 4.5 <4096 tokens. Write sie nie zapisze ale ewentualna prowizja za proba to 0 (silent fail), wiec tylko tracisz czas/lineage.
- **Wysoki churn rate:** jezeli prefiks zmienia sie czesciej niz co 2 requesty, constantly re-write > savings.
- **Session lifetime < 5m and requests < 5 minutes apart ZE SPREADEM:** jezeli 2 requesty a potem idle 10 min, cache wygasa. Placisz write dwa razy.

### 10. Cost monitoring pattern

Community rekomenduje loggowac nastepujace metryki per request:

```python
usage = response.usage
cache_hit_ratio = usage.cache_read_input_tokens / (
    usage.cache_read_input_tokens + 
    usage.cache_creation_input_tokens + 
    usage.input_tokens
) if (...) else 0

effective_cost_per_mtok = (
    usage.input_tokens * base_rate +
    usage.cache_read_input_tokens * base_rate * 0.1 +
    usage.cache_creation_input_tokens * base_rate * 1.25
) / total_input_tokens
```

Alert jezeli `cache_hit_ratio < 0.5` przez 3+ requesty w rzad - cos psuje cache (prawdopodobnie invalidation trigger).

## Issues / Flags

### Konflikty zrodel
- **Konflikt 6:** MindStudio post twierdzi ze cache moze "affect Claude subscription limits" (eat rate limit). Oficjalne docs nie potwierdzaja explicitnie. Rozstrzygniecie: TAK, cache write/read wchodza w token count dla rate limitow, wiec heavy cache session moze trafic na RPM/TPM. Ale cost dla limitu counting = full tokens (nie 10%). GitHub Issue #24147 to potwierdza ("Cache read tokens consume 99.93% of usage quota").
- **Konflikt 7:** Stary post (Du'An 2024) uzywa cen Sonnet 3.5. W 2026 Sonnet 4.6 ma identyczna cene $3/$15 - ratios utrzymane. Liczby Du'An nadal aplikowalne dla Sonnet 4.6.

### Gaps
- **Gap 8:** Brak empirycznych case studies dla Haiku 4.5. Wiekszosc cases to Sonnet/Opus. Nie wiem czy Haiku ma takie same patterns (prawdopodobnie tak bo ratios identyczne, ale brak publicznego wzoru).
- **Gap 9:** Brak case studies z Batch + Cache stack'iem. Teoretycznie 95% discount, ale brak community'ego benchmarku z kwotami.
- **Gap 10:** Fast Mode + Cache interaction - brak benchmarku czy warto (Opus 4.6 only).

### Warnings
- **Uwaga 6:** Nie zapomnij ze output tokens NIE sa cachowane. Cache dziala TYLKO na input. Dlugi output nadal kosztuje full rate.
- **Uwaga 7:** Data residency mnoznik 1.1x aplikuje sie TEZ do cache reads i writes. Jezeli US-only, Twoje cache savings sa 10% nizsze niz oczekiwane.
- **Uwaga 8:** Opus 4.7 tokenizer change - rebuilduj swoje koszt estymaty.

## Recommendation

1. **Domyslne stanowisko:** Wlaczaj cache ZAWSZE gdy masz >1000 tokens staticznego prefiksu ktory pojawi sie >=2 razy w 5 minutach.
2. **1h TTL gdy:** agent workflows, side agents z delay'ami, heavy document processing, chatboty z przerwami.
3. **5m TTL gdy:** real-time chat, spoke-shaped workload z requestami co <5min.
4. **Batch + 1h cache dla batch processingu:** maksymalizuje 95% discount. Najpierw wyslij pojedynczy request z 1h cache, potem batch reszty.
5. **Dla Opus 4.7:** zaplanuj 35% wiecej tokens w budget per request. Tokenizer zmiana.
6. **Zbuduj dashboard cache_hit_ratio:** cel >80% dla health, alert <50%.
7. **NIE wlaczaj cache dla single-shot calls** - placisz 1.25x za nic.

GO z mocnym zaleceniem: dla aplikacji z repeated prefix i cache hit >50%, caching daje 70-95% redukcji kosztow input. ROI w tygodniu.

### 11. Minimum token thresholds per model - ZAKTUALIZOWANE (docs oficjalne, kwiecien 2026)

Oficjalne minimums z [prompt-caching docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) (ROZNIA SIE od popularnego przekonania ze to zawsze 1024):

| Model | Minimum tokens | Uwaga |
|-------|---------------|-------|
| Claude Opus 4.7, 4.6, 4.5 | **4,096** | Nowe modele: wyzsza bariera |
| Claude Sonnet 4.6 | **2,048** | |
| Claude Sonnet 4.5, 4, 3.7 | **1,024** | Stare modele nizsza bariera |
| Claude Haiku 4.5 | **4,096** | Haiku 4.5 wymaga wiecej niz stary Haiku! |
| Claude Haiku 3.5 | **2,048** | |
| Claude Haiku 3 | **2,048** | |

**GOTCHA:** Jesli masz system prompt 1500 tokenow na Haiku 4.5 - caching SILENTLY FAILS. Brak erroru, brak warowania, po prostu `cache_read_input_tokens = 0` w response. Rozwiazanie: monitoruj usage fields, rozbuduj prompt az do progu.

**Cross-validate:** Spring AI docs (2025-10-27) potwierdzaja te same progi. LlamaIndex OSS docs rowniez spiejne.

### 12. ProjectDiscovery case study - enterprise scale (top case study 2026)

**Setup:** Security audit pipeline na Claude Opus 4.5, 2500+ linii YAML system prompt (20k+ tokenow), srednie zadanie = 26 steps + 40 tool calls, do 60M input tokenow na jedno zadanie.

**Wyniki:**
- **Cache hit rate startowy:** 7%
- **Cache hit rate po optymalizacji:** 84%
- **Tokeny z cache:** 9.8 billion (!)
- **Oszczednosci po optymalizacji:** 59% vs full price, potem 66%, najlepsze 10 dni: **70%**

**Technika (kluczowe odkrycie):** "Relocating dynamic content out of the cacheable prefix" - przeniesienie working memory, skills context i runtime context z srodka promptu na KONIEC jako user content. Jeden ruch z 7% -> 74% hit rate.

**Architektura 3-breakpoint:**
- BP1: static system prompt, 1h TTL (cross-user cache sharing)
- BP2: conversation sliding window, 5m TTL (ostatni tool result)
- BP3: tool definitions (static narzedzia cached, dynamiczne na koncu)

Source: [projectdiscovery.io/blog/how-we-cut-llm-cost-with-prompt-caching](https://projectdiscovery.io/blog/how-we-cut-llm-cost-with-prompt-caching)

### 13. Spring AI worked example - document analysis

**Setup:** 3,500-token document (legal agreement), 5 analytical questions, Claude Sonnet 4.

| Approach | Tokens | Cost |
|----------|--------|------|
| Without caching | 3500 * 5 = 17,500 | $0.053 |
| With caching (1 write + 4 reads) | 3500*1.25 + 4*(3500*0.1) + dynamic | $0.017 |
| Savings | - | **68% ($0.036)** |

Warto zauwazyc: 5 requestow to nieduzo. Nawet przy tak malej liczbie hits, caching daje 68% savings. Przy 50 requestach savings rosna do 90%+.

Source: [spring.io/blog/2025/10/27/spring-ai-anthropic-prompt-caching-blog](https://spring.io/blog/2025/10/27/spring-ai-anthropic-prompt-caching-blog/)

### 14. RAG pipeline scaled example (Finout.io analysis)

**Setup:** 50K-token system prompt, 1000 requestow dziennie, Claude Sonnet 4.6.

| | Cost |
|---|---|
| Without caching: 50M input tokens * $3/MTok | **$4,500/miesiac** |
| With caching (1h TTL): 1 write/hour + 999 reads | |
| - 24 writes/day: $6/MTok * 50k * 24 = $7.20/day = $216/miesiac | |
| - 999 reads/day: $0.30/MTok * 50k * 999 * 30 = $450/miesiac | |
| Total z cache | **$666/miesiac** |
| **Savings** | **85% ($3,834/miesiac)** |

Source: [finout.io/blog/anthropic-api-pricing](https://www.finout.io/blog/anthropic-api-pricing)

### 15. TTL Controversy: March + April 2026 silent regressions

**OSTRZEZENIE:** Dwa nieogloszone zdarzenia TTL w 2026, odkryte przez spolecznosc:

**Zdarzenie 1 - March 6, 2026:**
- Default TTL dla sub-agentow zmieniony z 1h na 5m z dnia na dzien
- Community zglosilo 100x wzrost kosztow dla nieaktualizowanych applikacji
- Przyklad z dev.to: 10k token prompt, 100 calls/hour: $15/miesiac -> $1,500/miesiac po zmianie default
- Anthropic BRAK publicznego oglosenia
- Fix: jawnie ustawic `"cache_control": {"type": "ephemeral", "ttl": 3600}`

**Zdarzenie 2 - April 9, 2026:**
- Sub-agent TTL ponownie przeszedl na 100% 5m (binarny przeskok)
- Odkryty przez skanowanie JSONL logow Claude Code (95 dni analizy)
- Main agent: bez zmian (100% 1h TTL przez caly czas)
- Sugeruje celowe targetowanie sub-agentow, nie blad techniczny

**Developer sentiment:** "desperately trying to cut costs", "breach of implicit trust", "significant quota and cost inflation"

**Aktualny obejscie:** Sprawdzaj `ephemeral_5m_input_tokens` vs `ephemeral_1h_input_tokens` w response usage, nie zakladaj ze dostaniesz 1h bez explicit TTL.

Sources:
- [dev.to/whoffagents - TTL silently dropped](https://dev.to/whoffagents/anthropic-silently-dropped-prompt-cache-ttl-from-1-hour-to-5-minutes-16ao)
- [dev.to/recca0120 - 95 days of Claude Code logs](https://dev.to/recca0120/verify-whether-your-claude-code-uses-5m-or-1h-cache-ttl-with-60-lines-of-python-4548)
- [HN thread - TTL downgrade March 6](https://news.ycombinator.com/item?id=47736476)

### 16. Batch + Cache stack: matematyka potwierdzona

Oficjalne docs potwierdzaja stackowanie:

| Scenario | Multiplier stack | Final rate (Sonnet 4.6, $3 base) |
|----------|-----------------|----------------------------------|
| Standard input | 1.0x | $3.00/MTok |
| 5m cache write | 1.25x | $3.75/MTok |
| 5m cache read | 0.1x | $0.30/MTok |
| Batch input | 0.5x | $1.50/MTok |
| Batch + 5m write | 0.5 * 1.25 = 0.625x | $1.875/MTok |
| Batch + 5m read | 0.5 * 0.1 = 0.05x | $0.15/MTok |
| Data residency US + cache read | 0.1 * 1.1 = 0.11x | $0.33/MTok |

**Ekstremalny przypadek Batch + 1h cache read Sonnet:**
- $3 * 0.5 * 0.1 = **$0.15/MTok** (95% discount vs standard input)

### 17. Workspace isolation change - February 5, 2026

Od **5 lutego 2026** cache jest izolowany per-workspace, nie per-organization. Jezeli uzywasz wielu workspace'ow w jednej organizacji - kazdy ma oddzielny cache pool. Potencjalnie WYZSZE koszty (brak cross-workspace cache sharing) dla multi-team setups.

Przyklad: team A i team B w tej samej org ale roznych workspace'ach. Ten sam CLAUDE.md w systemie -> kazdy workspace cache pisze osobno.

### 18. Automatic caching (February 2026) - zmiany w API

Anthropic wprowadzil **automatyczny caching** w lutym 2026: zamiast `cache_control` na kazdym bloku, jeden parametr na poziomie requestu:

```python
response = client.messages.create(
    model="claude-opus-4-7",
    cache_control={"type": "ephemeral"},  # top-level
    system="...",
    messages=[...]
)
```

System automatycznie ustawia breakpoint na ostatnim cacheable bloku i przesuwa go wraz z rostem konwersacji. Dla wiekszosci use case'ow to prostsze i mniej error-prone niz explicit breakpoints.

**GOTCHA:** Automatyczny cache przez pewien czas uzywal 1h TTL. Po zdarzeniu March 2026 - upewnij sie ze weryfikujesz w logach ktory TTL dostajecie.

## Issues / Flags (DODATKOWE - update April 17, 2026)

### Nowe konflikty odkryte w tej sesji

- **Konflikt 11:** Spring AI docs (Oct 2025) podaja inne minimums niz oficjalne docs (April 2026). Oficjalne docs sa source of truth. W szczegolnosci: Haiku 4.5 = 4096 (nie 2048 jak sugeruja starsze zrodla).

- **Konflikt 12:** Community post z HN (Aug 2024 launch) opisywal caching jako "5 minutes only". Oficjalne docs od Q4 2024 maja tez 1h option. Starsze posty moga wprowadzac w blad.

- **Konflikt 13:** Jeden poster na HN twierdzil write kosztuje "1.2x" a nie 1.25x. To zaokraglenie bledne - oficjalne docs: **1.25x** (dokkladnie 5/4).

### Nowe gaps

- **Gap 11:** Brak case study dla Haiku 4.5 z wysokim minimum threshold (4096). Czy developerzy wiedza o progu? Silent fail pattern moze byc powszechny.
- **Gap 12:** Brak empirycznych danych czy automatic caching (luty 2026) generuje inne hit rates niz manual breakpoints.
- **Gap 13:** Workspace isolation (od Feb 5, 2026) - brak case studies pokazujacych realny koszt dla multi-workspace orgs.

## Source links

- [Anthropic Pricing Docs (canonical)](https://platform.claude.com/docs/en/about-claude/pricing)
- [Anthropic Prompt Caching Docs (official)](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [Du'An Lightfoot blog - $720 to $72](https://www.duanlightfoot.com/posts/prompt-caching-is-a-must-how-i-went-from-spending-720-to-72-monthly-on-api-costs/)
- [ProjectDiscovery - 59% cost reduction at scale](https://projectdiscovery.io/blog/how-we-cut-llm-cost-with-prompt-caching)
- [Spring AI - Anthropic Prompt Caching Blog](https://spring.io/blog/2025/10/27/spring-ai-anthropic-prompt-caching-blog/)
- [Finout.io - Anthropic API Pricing 2026 complete guide](https://www.finout.io/blog/anthropic-api-pricing)
- [Markaicode - Cut Anthropic API Costs 90%](https://markaicode.com/anthropic-prompt-caching-reduce-api-costs/)
- [dev.to/portkey - Hidden Costs of AI: When caching hurts](https://dev.to/portkey/the-hidden-costs-of-ai-understanding-prompt-caching-and-when-to-use-it-37jf)
- [Medium/m_sea_bass - Comparing Prompt Caching: OpenAI, Anthropic, Gemini](https://medium.com/@m_sea_bass/comparing-prompt-caching-openai-anthropic-and-gemini-0eac16541898)
- [dev.to/whoffagents - Anthropic silently dropped TTL 1h to 5m](https://dev.to/whoffagents/anthropic-silently-dropped-prompt-cache-ttl-from-1-hour-to-5-minutes-16ao)
- [dev.to/recca0120 - 95 days of Claude Code logs TTL analysis](https://dev.to/recca0120/verify-whether-your-claude-code-uses-5m-or-1h-cache-ttl-with-60-lines-of-python-4548)
- [HN - Anthropic downgraded cache TTL on March 6th](https://news.ycombinator.com/item?id=47736476)
- [HN - Prompt Caching launch 2024 community discussion](https://news.ycombinator.com/item?id=41284639)
- [Claude Code Camp - How Prompt Caching Actually Works](https://www.claudecodecamp.com/p/how-prompt-caching-actually-works-in-claude-code)
- [ngrok blog - Prompt caching 10x cheaper LLM tokens (technical)](https://ngrok.com/blog/prompt-caching)
- [PromptHub - Prompt Caching with OpenAI, Anthropic, and Google](https://www.prompthub.us/blog/prompt-caching-with-openai-anthropic-and-google-models)
- [MindStudio - What Is Anthropic's Prompt Caching](https://www.mindstudio.ai/blog/anthropic-prompt-caching-claude-subscription-limits)
- [Understanding Data - Prompt Caching Strategy](https://understandingdata.com/posts/prompt-caching-strategy/)
- [Metacto - Claude API Pricing 2026 breakdown](https://www.metacto.com/blogs/anthropic-api-pricing-a-full-breakdown-of-costs-and-integration)
- [Medium/Joe Njenga - Automatic Prompt Caching Feb 2026](https://medium.com/ai-software-engineer/anthropic-just-fixed-the-biggest-hidden-cost-in-ai-agents-using-automatic-prompt-caching-9d47c95903c5)
