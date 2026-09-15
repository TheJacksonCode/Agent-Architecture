# 02 DECISION GUIDE - Czy uzyc cache w moim przypadku

**Cel:** po przeczytaniu wiesz DOKLADNIE czy uzyc prompt caching w swoim projekcie, jaki pattern wybrac, jaki TTL, jakie break-even osiagniesz, i jak wdrozyc w 4 sprintach. Dokument zamienia teorie z `00_FUNDAMENTALS` i `01_PATTERNS` w konkretna decyzje biznesowa.

**Czas czytania:** 18-22 minut. **Poziom:** tech lead / architekt / developer z budzetem ok Claude API.

## 1. Drzewo decyzyjne gownlej

Przejdz przez 6 pytan. Kazde "NIE" na kluczowe pytanie moze eliminowac caching jako sensowna opcje.

```
Q1: Masz static prefix >= 4096 tokens (Opus/Haiku) lub >= 2048 (Sonnet 4.6)?
    NIE -> STOP. Cache nie zadziala (fails silently ponizej progu). 
           Podbij prefix (wiecej RAG docs, dluzszy system) lub pomin cache.
    TAK -> Q2

Q2: Oczekujesz >= 2 requestow z tym samym prefiksem w ciagu 5 minut?
    (Alt: >= 3 w ciagu godziny dla 1h TTL)
    NIE -> STOP. Single-shot usage = 25% ekstra za nic, wylacz cache.
    TAK -> Q3

Q3: Masz kontrole nad struktura promptu (mozesz odseparowac static od dynamic)?
    NIE -> ZAGROZONE. Frameworki jak LangChain wymagaja custom work.
           Sprawdz `01_PATTERNS` Pattern 4/6 (framework support matrix).
    TAK -> Q4

Q4: Output-heavy generation (wiecej niz 3000 output tokens per request)?
    TAK -> OGRANICZONA KORZYSC. Cache tylko na input, output zawsze full rate.
           Moze dalej warto ale kalkuluj prawdziwy ROI.
    NIE -> Q5

Q5: Uzywasz Claude Code CLI z domyslnymi ustawieniami?
    TAK -> CACHE JUZ AKTYWNY. 96% hit ratio out-of-the-box (R7.C8).
           Wlacz tylko extended 1h przez ENV jesli sesje > 5 min bezruchu.
    NIE -> Q6

Q6: Budujesz API dla wielu uzytkownikow z shared system prompt?
    TAK -> Pattern 7 (multi-user isolation): system cached globally,
           user-specific na koncu messages (Pattern 2 two-tier).
    NIE -> Single-user use case, Pattern 1 lub 4 (koniec drzewa).
```

**Skrot:** jezeli masz static prefix >=4096 tokens i 2+ requesty w 5 min, **prawdopodobnie powinienes uzyc cache**. Reszta to optymalizacja pattern/TTL.

## 2. Matryca scenariuszy

Dla 12 typowych przypadkow z praktyki - co wybrac, jaki pattern, jakie oczekiwane savings.

| # | Scenariusz | Prefix size | Pattern | TTL | Expected savings | Break-even |
|---|------------|-------------|---------|-----|------------------|------------|
| 1 | **Chatbot interaktywny** (user pisze non-stop) | 10-30k | Pattern 2 two-tier | 5m | 80-90% | 1 hit |
| 2 | **Chatbot email support** (response co 15 min) | 10-30k | Pattern 1 single + 1h TTL | 1h | 70-85% | 2 hity |
| 3 | **RAG z codziennym refresh** (docs pondiw raz/dzien) | 50-200k | Pattern 2 tools+docs | 5m batch, 1h core | 85-95% | po 2 req |
| 4 | **Claude Code CLI** (default) | ~4-6k auto | Pattern 3 automatic | 5m default | 90% (measured 96% hit) | 1 hit |
| 5 | **Claude Code batch refactor** (1 sesja 2h) | ~4-6k + CLAUDE.md | Pattern 3 + ENV 1h | 1h | 85-95% | 2 hity |
| 6 | **API endpoint z bookownym JSON** | 500-2000 | **NIE CACHUJ** | - | Below threshold | - |
| 7 | **Single-shot classification** (1x per request, nigdy nie powtarza) | dowolny | **NIE CACHUJ** | - | Waste 25% | - |
| 8 | **Multi-user SaaS** (tysiace userow) | system 20k + user docs 5k | Pattern 7 isolation + 2 | 5m system, 1h user sessions | 85-95% agregat | 1 hit na user |
| 9 | **Batch API scoring 10k recordow** | 5-20k per batch | Pattern 6 priming + Batch | 5m | 95% (50% batch + 90% cache) | 1 priming req |
| 10 | **Few-shot classifier 50 examples** | 30-80k examples | Pattern 5 few-shot prefix | 5m | 85-90% | 1 hit |
| 11 | **Agent z evolving history** | history rosnie do 100k | Pattern 1 + messages breakpoint | 5m | 70-85% (rosnie z ka turn) | 1 hit |
| 12 | **Dev/experiments z changing prompts** | 5-20k | **NIE CACHUJ** (A/B testing) | - | Invalidation co deploy | - |

**Jak czytac:** kolumna "Pattern" referuje patterny z `01_PATTERNS.md`. Expected savings to % ogolnego kosztu input tokenow przy typowym workloadzie. Break-even to liczba cache hitow zanim cache sie zwroci.

## 3. Case studies - prawdziwe liczby

Piec udokumentowanych przypadkow z 2025-2026. Pokazuja ze caching dziala w praktyce na skali od 100 do 100,000 requestow dziennie.

### Case 1: Du'An Lightfoot - AWS Developer Advocate

**Kontekst:** Voice-based coding assistant, 81k tokens prefix (codebase context + system prompt + tools).

**Workload:**
- 100 requestow dziennie (code generation + review)
- Pattern 1 single breakpoint po tools/system
- 5m TTL (sesje 30-60 min)

**Metryki:**
- **Baseline (bez cache):** $720/miesiac (input cost na Sonnet 4.6)
- **Z cache:** $72/miesiac
- **Redukcja:** 90% ($648/mo oszczednosc)
- **Hit ratio:** >85% (samodzielnie raportowane)

**Kluczowy insight:** nie musial zmieniac architektury. Dodanie `cache_control` na koncu tools i system zajalo 30 minut implementacji. Break-even po **pierwszym dniu**.

### Case 2: Claude Code team - Anthropic official

**Kontekst:** Claude Code CLI, reverse-engineered przez Piebald-AI (R4.C3-C8).

**Workload:**
- Default instalacja, >1M aktywnych userow
- Pattern 3 (automatic top-level) + 4 warstwy cache
- 5m TTL default, 1h dostepny przez ENV

**Metryki:**
- **Cache hit ratio:** 96% (measured in production)
- **User-visible cost:** $10-19/dzien per active developer
- **Bez cache (szacowane):** $50-100/dzien (5x wyzej)
- **Savings:** 80-90% systemowo

**Kluczowy insight:** efektywnosc caching w Claude Code wynika z `<system-reminder>` mechanism - dynamiczny kontekst wbudowany PO breakpoincie cache, nie w system prompt. To nauka dla wlasnych agentow (zob. `01_PATTERNS` Bonus Pattern).

### Case 3: Haiku 4.5 + Batch + Cache stacking

**Kontekst:** Enterprise support classification, 10,000 ticketow dziennie.

**Workload:**
- Few-shot classifier (50 examples, ~20k tokens prefix)
- Pattern 5 few-shot + Pattern 6 priming + Batch API
- 24h turnaround acceptable (Batch API compatible)

**Metryki:**
- **Baseline Sonnet 4.6 bez cache:** $37/dzien per 10k ticketow
- **Haiku 4.5 + Batch + Cache:** $0.63/dzien
- **Redukcja:** **98.3%** ($36.37/dzien oszczednosc)
- **Monthly:** $1110 -> $19

**Decomposycja oszczednosci:**
1. Sonnet -> Haiku 4.5: ~70% cheaper per token
2. Batch API: 50% discount
3. Cache read: 90% discount na input prefiksie
4. Multiplicative: (1-0.7)*(1-0.5)*(1-0.9) = 0.015 = **98.5% redukcja teoretyczna**

**Kluczowy insight:** multiplicative stacking to najmocniejsza technika w toolbox. Nie dodawaj savings, **mnoz je**.

### Case 4: Alex Volkov - Twitter thread

**Kontekst:** Interactive agent z document context, shared across conversations.

**Workload:**
- 248k tokens prefix (dokumentacja + spec + examples)
- Pattern 1 single breakpoint
- 1h TTL (long sessions)

**Metryki:**
- **Pierwszy request:** ~$0.75 (1.25x write cost na 248k)
- **Kazdy nastepny:** ~$0.03 (0.1x read)
- **Po 10 requestach:** $0.75 + 9*$0.03 = $1.02 (vs $6.00 bez cache = **83% savings**)

**Kluczowy insight:** im wiekszy prefix, tym szybsza amortyzacja write cost. 248k prefix + 1 hit juz sie zwraca. 10 hitow = dramatic ROI.

### Case 5: RAG chatbot SaaS, 1000 userow

**Kontekst:** Knowledge base chatbot (customer support), 1000 aktywnych userow/dzien.

**Workload:**
- System prompt 5k + RAG docs 30k (globalne)
- User session 2-5 ticketow dziennie
- Pattern 7 multi-user isolation + Pattern 2 two-tier

**Metryki:**
- **Shared system cache:** 90% hit ratio (wszystkie user sessions)
- **Per-user session cache:** 60% hit ratio (wewnatrz session)
- **Agregatowe savings:** 87%
- **Monthly cost (baseline):** $3200
- **Z cache:** $420
- **Redukcja:** $2780/mo ($33,360/rok)

**Kluczowy insight:** w multi-user SaaS najwiekszy win jest na shared prefix. Per-user caching pomaga ale marginalnie wobec shared.

## 4. Mapowanie decyzji na pattern

Po przejsciu drzewa decyzyjnego masz decyzje "TAK uzywam cache". Kolejne pytanie: **ktory pattern?**

### Kryterium 1: Liczba warstw statycznych

```
1 warstwa static (tylko system ALBO tylko tools) -> Pattern 1 single breakpoint
2 warstwy static (system + history OR tools + docs) -> Pattern 2 two-tier
3+ warstw -> Pattern 2 z 3-4 breakpointami (max 4 eksplicytnych)
```

### Kryterium 2: Stabilnosc warstw

```
Tools zmieniaja sie czesto -> Pattern 4 tool stability (feature flags)
Prompt evoluuje co deploy -> Pattern 3 automatic (kontrola cache przez system)
RAG docs rotate daily -> Pattern 2 (docs w dolnej warstwie, core system w gornej)
```

### Kryterium 3: Distribution sessions

```
Rzadkie ale dlugie sesje (> 5 min) -> 1h TTL
Czeste i krotkie (< 5 min gap) -> 5m TTL (refresh on hit)
Mixed workload -> Pattern 2 two-tier (1h core, 5m ephemeral)
```

### Kryterium 4: Dostep do API low-level

```
Pelna kontrola (raw SDK) -> wszystkie patterny dostepne
Framework (LangChain, LlamaIndex) -> sprawdz `01_PATTERNS` matrix (Pattern 3 najmniej friction)
Platform SaaS bez custom API -> pewnie nie dasz rady, uzyj workarounds
```

## 5. Decision kalkulator - excel-style

Wystandaryzowany kalkulator. Zastapisz swoimi liczbami.

```
INPUT (twoje liczby):
  prefix_tokens: 50000              # rozmiar static prefix
  requests_per_hour: 6              # typowa liczba requestow
  session_gap_max_minutes: 8        # max przerwa miedzy requestami
  output_avg_tokens: 1500           # typical output
  
PRICE BASE (Opus 4.7):
  input_rate: $5 per 1M
  cache_5m_write: $6.25 per 1M (1.25x)
  cache_1h_write: $10 per 1M (2x)
  cache_read: $0.50 per 1M (0.1x)
  output_rate: $22.50 per 1M

STEP 1 - Eligibility check:
  prefix_tokens (50000) >= 4096? YES -> eligible
  
STEP 2 - TTL selection:
  session_gap_max (8 min) > 5 min? YES
  session_gap_max (8 min) < 60 min? YES -> 1h TTL recommended
  
STEP 3 - Cost estimate per hour (6 req):
  Without cache:
    6 * (50000 * $5/1M + 1500 * $22.50/1M) = 6 * ($0.25 + $0.034) = $1.70
  
  With 1h cache:
    Request 1 (write): 50000 * $10/1M + 1500 * $22.50/1M = $0.50 + $0.034 = $0.534
    Requests 2-6 (read): 5 * (50000 * $0.50/1M + 1500 * $22.50/1M) = 5 * ($0.025 + $0.034) = $0.295
    Total: $0.534 + $0.295 = $0.829

STEP 4 - Savings:
  absolute: $1.70 - $0.829 = $0.871/hour
  percentage: 51% savings
  monthly (24*30 hours): $626 saved
  
STEP 5 - Break-even:
  write overhead: (50000 * $10/1M) - (50000 * $5/1M) = $0.25
  savings per read: 50000 * ($5 - $0.50)/1M = $0.225
  break_even = ceil(0.25 / 0.225) = 2 reads
  VERIFY: Request 1 + 2 reads = write $0.50 + 2*$0.25 = $1.00 (with cache)
          vs 3 * $0.25 = $0.75 (without cache)
  NIE, z 1h TTL potrzeba 3 hitow (bo write 2x = $0.50 vs write 1x $0.25 = $0.25 difference, 
  2 saved reads * $0.225 = $0.45 <$0.50 niepokrywa)
  Faktycznie 3 hity -> zysk od 4. requesta
```

**Skonstruuj wlasny kalkulator w 5 minutach.** Klucz to:
1. Compute request without cache cost
2. Compute request with cache cost (1 write + N reads per TTL)
3. Differentiate
4. Scale do miesiaca/roku

## 6. Roadmap wdrozenia - 4 sprinty

Jak zaadoptowac caching w existing codebase bez breakage.

### Sprint 1 - Audit + Quick Win (1 tydzien)

**Cele:**
- Audit obecnych promptow: rozmiar static prefix, czestotliwosc requestow, patterns
- Zidentyfikuj top 3 endpointy po kosztach input
- Zaimplementuj Pattern 1 na NAJTANSZYM endpoincie (niski risk, high reward)

**Deliverables:**
- Spreadsheet: endpoint, daily_requests, avg_prefix_tokens, daily_cost, ROI_estimate
- 1 endpoint z Pattern 1 deployed do staging
- Weryfikacja `cache_creation_input_tokens > 0` w staging logs

**Budzet:** 8-16 godzin dev.

**Typowy wynik:** 60-85% savings na 1 endpoincie w tydzien.

### Sprint 2 - Monitoring + Observability (1 tydzien)

**Cele:**
- Dashboard cache_hit_ratio per endpoint (Prometheus/Datadog/CloudWatch)
- Alerts: hit_ratio < 60% dla cached endpoints
- Hit ratio trend (daily/weekly) dla spotlight regression

**Deliverables:**
- Monitoring skeleton z 4 response.usage fields
- Alert rules: sudden drop w hit_ratio > 20% w godzinie
- Weekly review automation

**Budzet:** 8-12 godzin dev + 2-4 godzin DevOps.

**Kluczowe metryki:**
- `cache_hit_ratio = cache_read / (cache_read + cache_creation + input_tokens)`
- Target: 80%+ dla produkcyjnych endpointow z cache
- Cost per request (avg): trend over time

### Sprint 3 - Roll-out + Patterns (2 tygodnie)

**Cele:**
- Wdrozenie cache na 3-5 kolejnych endpointach
- Migrate z Pattern 1 na Pattern 2 (two-tier) gdzie sensowne
- Testy A/B: 10% traffic na 1h TTL (gdzie sesje > 5 min)

**Deliverables:**
- 5 endpointow z cache in production
- 1-2 endpointow na 1h TTL (extended)
- Regression tests dla cache invalidation

**Budzet:** 20-40 godzin dev + QA.

**Typowy wynik:** 70-85% savings na 80% traffic input tokenowego.

### Sprint 4 - Advanced + Batch (1-2 tygodnie)

**Cele:**
- Integracja z Batch API dla async workloadow (classification, scoring)
- Pattern 6 priming dla one-shot + batch scenarios
- Multi-user isolation (Pattern 7) dla multi-tenant SaaS

**Deliverables:**
- Batch API endpoint z cache stacking
- Priming endpoint (pre-warm cache przed duzymi batchami)
- Docs: team playbook (kiedy uzyc co)

**Budzet:** 16-32 godzin dev.

**Typowy wynik:** dodatkowe 10-15% savings na batchowych workloadach (mnozace sie z cache 90%).

**TOTAL 4 sprints:** 5-6 tygodni, 50-100 godzin dev, **expected 70-90% redukcja input costu**.

## 7. Anti-patterns to unikac w decyzji

### Anti-pattern A: Cache everywhere

"Jezeli cache daje 90% savings, wlaczmy wszedzie."

**Problem:** single-shot endpointy, unique prompts per user, dev environments. Cache generuje 25% write overhead i nie jest oplacalny.

**Test:** sprawdz `cache_read/total` ratio po 1 tygodniu. Jesli < 40%, **wylacz cache** na tym endpoincie.

### Anti-pattern B: Wszystko na 1h TTL

"Dluzsze TTL to dluzsze savings."

**Problem:** 1h write kosztuje 2x zamiast 1.25x. Jezeli nie masz >= 3 requestow w godzine na ten prefix, 1h TTL **tracisz piniandze**.

**Test:** wlacz 1h tylko gdy mierzyles, ze sesje trwaja >= 30 min srednio.

### Anti-pattern C: Cache pierwszy, monitoring pozniej

"Mamy deadline, dodamy observability potem."

**Problem:** silent failures (ponizej 4096 tokens, timestamp drift, model switch) moga dzialac miesiacami bez alertu. User placi normalny rate myslac ze cache dziala.

**Test:** zawsze pierwszy request -> assert `cache_creation_input_tokens > 0` w integration test.

### Anti-pattern D: Copy-paste z docs Anthropic bez audytu

Docs pokazuja "simple example" z 1 breakpointem na tools. W Twoim usecase mozesz miec bardziej zlozona strukture.

**Test:** napisz audit swojego requesta (rozmiar warstw + czestotliwosc zmian) PRZED implementacja.

### Anti-pattern E: Ignore warning 5 lutego 2026

Od 5 lutego 2026 cache jest **per workspace**, nie per organization.

**Konsekwencja:** multi-team shared prefix = osobne cache per team = brak shared benefits. Planujac architekture enterprise, zobaczy wszystkie teams do 1 workspace lub zaakceptuj per-team isolation.

## 8. Checklist przed go-live

Przejdzcie przez to PRZED deploy do production:

**Pre-flight:**
- [ ] Potwierdzony `cache_creation_input_tokens > 0` w staging
- [ ] `cache_read_input_tokens` rosnie z kolejnymi requestami (monotonicznie)
- [ ] Prefix tokens >= model minimum (4096 Opus, 2048 Sonnet)
- [ ] Timestamp NIE jest w system prompt (sprawdz regex `datetime.now\(\)` w cache'owanej czesci)
- [ ] Breakpoint cache_control na koncu statycznej czesci, NIE przed

**Monitoring:**
- [ ] `cache_hit_ratio` metric exported do Prometheus/DD/CloudWatch
- [ ] Alert: `hit_ratio < 0.6` na cached endpoint przez 15 min
- [ ] Alert: `cache_creation_input_tokens = 0` na endpoint oznaczony jako cached
- [ ] Weekly dashboard: cost per request (trend 7/30 dni)

**Cost controls:**
- [ ] Baseline cost measured (1 tydzien bez cache jako reference)
- [ ] Break-even zweryfikowany (actual, nie teoretyczny)
- [ ] Budget alert: daily spend > 1.5x baseline bez cache (indicates silent failure)

**Rollback plan:**
- [ ] Feature flag `cache_enabled_[endpoint]` (per-endpoint toggle)
- [ ] Rollback time <= 5 min (deployment without cache_control param)
- [ ] Staging env cacheing moze byc latwo wylaczone dla testow

**Documentation:**
- [ ] Team playbook: kto, kiedy, jak zmienia prompts (cache invalidation awareness)
- [ ] Runbook: silent failure detection i response
- [ ] Onboarding: nowi inzynierowie musza przeczytac `00_FUNDAMENTALS`

## 9. Kiedy NIE uzywac cache - final word

Powtorzenie z 00_FUNDAMENTALS + kontekst decyzji:

| Sytuacja | Dlaczego nie | Alternatywa |
|----------|--------------|-------------|
| Prefix < 4096 tokens | Ponizej progu minimum | Podbij prefix lub zaakceptuj full rate |
| 1 request total | 1 write 1.25x = waste | Skip cache |
| Rapid A/B testing | Invalidation co deploy | Cache po stabilizacji promptu |
| Output-heavy (>5k output) | Cache nie pomoga, output zawsze full | Optymalizuj output length, nie cache |
| Unique per user | Brak shared prefix | Pattern 7 z user-specific caching (niski ROI per user) |
| Legacy/maintenance | Change management > savings | Zostaw na koniec prac |

## 10. Final summary - 5 decyzji to live by

Jezeli zapamietasz tylko 5 rzeczy:

1. **Audit before caching:** prefix size + request frequency + session gap -> decyzja.
2. **Pattern 1 pierwszy:** najprostszy, najmniej ryzykowny, daje 60-85% quick win.
3. **Monitoring obowiazkowe:** bez `cache_creation_input_tokens > 0` weryfikacji, cache moze cicho nie dzialac miesiacami.
4. **Break-even math w excel:** nie ufaj marketingowym 90%, policz dla swoich liczb (5m: 1 hit, 1h: 3 hity typowo).
5. **Iterative roll-out:** 4 sprinty, nie big-bang. 1 endpoint -> monitor -> kolejne -> advanced patterns.

**Oczekiwany wynik po 4 sprintach:** 70-90% redukcja input costu, monitoring-grade observability, team owned playbook.

---

**Nastepny krok:** `03_MEDIA_PROMPTS.md` - prompty do video overview i infographic (dla social, prezentacji, edukacji).
