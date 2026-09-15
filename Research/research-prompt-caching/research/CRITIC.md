# CRITIC.md - Prompt Caching 2026 Kampania

**Critic:** Research Critic (sonnet, phase: research, load 85/100)
**Data:** 2026-04-17
**Zakres:** 7 raportow researcherow (R1 Docs, R2 TTL, R3 Pricing, R4 CLI, R5 Design, R6 Batch, R7 Monitoring)
**Cel:** walidacja PASS/REVISE + minimum 5 konfliktow + minimum 3 gaps + rekomendacje dla Syntetyka
**BRAMA 4:** PASS lub REVISE (nie rubber-stamp)

---

## Executive Verdict

Kampania Prompt Caching 2026 dostarczyla **siedem spojnych raportow wysokiej jakosci** z agregatem ponad 15000 slow i ~100 unikalnych URL. Raporty z zasady pokrywaja sie wzajemnie na **kluczowych faktach oficjalnych** (schema cache_control, hierarchia tools -> system -> messages, pricing multipliers 1.25x/2x/0.1x, 20-block lookback, workspace isolation od 2026-02-05, automatic caching od 2026-02-19) - to jest GROUPTHINK POSITIVE: zgodnosc pochodzi z tych samych, weryfikowalnych oficjalnych docs pobranych live przez WebFetch w tych samych dniach. Cross-walidacja na faktach pierwotnych DZIALA. Nie jest to groupthink z blednego zrodla.

Mimo to wykryto **7 istotnych konfliktow** miedzy raportami (najglebszy: stanowisko Anthropic "cache change should not affect costs" vs empiryczne 17.1-25.9% cost inflation z Issue #46829, oraz scope regression marzec vs kwiecien - main+sub vs tylko sub) i **6 zidentyfikowanych gaps**. Dwa raporty maja material **REVISE nice-to-have** (R3 - duplikacja sekcji minimum token thresholds + numeracja konfliktow skacze; R5 - numeracja sekcji 1-16 z dwiema sekcjami "12" i "13" wskazuje pospieszny merge), ale SUBSTANCJA i claims sa poprawne. **Werdykt ogolny: PASS z 2 REVISE na poziomie kosmetyki i 1 FLAG glebokie** (Anthropic stanowisko vs community data).

Material jest gotowy do Syntetyka pod warunkiem ze Syntetyk (a) jasno oznaczy trust-1 (oficjalne docs), trust-2 (community empirical z cross-validation) i trust-3 (single-source), (b) rozstrzygnie konflikt Anthropic vs community po stronie community (hard data wygrywa z PR statement), (c) NIE POWTORZY research, tylko zcytuje istniejace raporty. Overlap z Context Engineering SYNTHESIS (rownolegla kampania) jest minimalny - tylko w jednym miejscu (system-reminder pattern) i to spojne.

---

## Per-report PASS/REVISE

| Raport | Status | Scoring 0-10 | Reason |
|--------|--------|--------------|--------|
| R1 api_spec (Docs) | **PASS** | 9.2 | Wzorcowa archiwistyka oficjalnych docs. 12 URL, kompletna specyfikacja cache_control, max 4 breakpointy, 20-block lookback, pricing per model, min tokens per model, mixing TTL rules. Freshness 2026-04-17 live. Gaps jawnie zidentyfikowane (p50/p99 latency, error body przy 400). Drobny nit: tabela min tokens w R1 listuje "Haiku 4.5: 4096" i "Sonnet 4.6: 2048", co klocka sie z R5 ktore mowi ze wszystkie nowe 4096. Konflikt 3 ponizej. |
| R2 ttl_invalidation (Tech) | **PASS** | 9.0 | Najmocniejszy empiryczny raport. Confidence score self-reported 0.87 uzasadniony. 119,866 API calls jako dowod regression marcowej. Pelna oficjalna tabela invalidacji. ENABLE_PROMPT_CACHING_1H potwierdzone przez changelog v2.1.108 + X bota. 4 konflikty self-flagged + 5 gaps. April 9 regression jawnie oznaczone jako single-source (confidence 0.78). Freshness OK. |
| R3 pricing_economics (Forums) | **REVISE (kosmetyka)** | 8.3 | Substancja PASS. Case studies konkretne (Lightfoot $720->$72, ProjectDiscovery 7%->84% hit, Finout 85% savings, Spring AI 68%). Batch+Cache math poprawna. ALE: sekcje 11-18 dodane w drugiej iteracji bez renumeracji - po "10. Cost monitoring" sa "11. Minimum tokens", "12. ProjectDiscovery", potem ZNOWU sekcje "12. Comparison z OpenAI" i "13. Tools best practice". Dwukrotnie uzyte numery 12, 13 to clear merge niezalatany. Konflikty skacza "6, 7" potem "11, 12, 13" - gdzie 8, 9, 10? Drop: reorder/renumber przed publikacja SYNTHESIS. |
| R4 cli_caching (GitHub) | **PASS** | 9.1 | Unikalne pokrycie: 3-bug anatomy cache regression (block scatter + fingerprint instability + tool ordering) od cnighswonger fix. Bun string replacement bug (#41930). Telemetry-cache coupling (#45381, #47558). Comprehensive env vars table. 6 gaps jawnie oznaczone (Agent Teams cache inheritance, workspace isolation team sharing, subagent cache). Zrodla 20+ URL. Freshness kwiecien 2026. |
| R5 cache_first_design (UX) | **REVISE (kosmetyka)** | 8.5 | Substancja PASS. 16 wzorcow projektowych + 10 anti-patterns + 3 production case studies (Claude Code 96%, kern-ai 10x, arxiv 2601.06007). ALE: numeracja sekcji zaburzona - "11. RAG pattern" potem "12. Claude Code" potem "13. Kern-ai" potem "14. Arxiv" potem "15. 20-block" potem "16. Aktualne progi" potem ZNOWU "12. Comparison z OpenAI" i "13. Tools best practice". Dwukrotnie uzyte numery 12, 13 to clear merge conflict niezalatany. Wymaga renumeracji. Self-reported status mowi "NOWE PROGI TOKENOWE (2026): 4096 dla Opus 4.7, Sonnet 4.6, Haiku 4.5" co jest sprzeczne z R1 ktore mowi "Sonnet 4.6: 2048". Konflikt 3 ponizej. |
| R6 batch_api_caching (X/Trends) | **PASS** | 8.7 | Czysta matematyka stackingu: 0.5 * 0.1 = 0.05x base = 95% total. Priming pattern krok po kroku. Scenarios 30-98% hit rate jawnie podane. 5 konfliktow self-flagged (LLMindset 95% confusion, niektore blogi "zawsze 95%" vs realne 30-98%, batch limits old 10k vs new 100k). Weak spot: section 7 "Reddit sentiment" self-acknowledged jako niski - brak prawdziwych Reddit benchmarkow (tylko indirect). To jest honest gap, nie failure. |
| R7 monitoring_community (Reddit/X) | **PASS** | 9.0 | Najszersze pokrycie narzedzi (Anthropic Console, Claude Code Analytics Admin API, Honeycomb, Datadog, Portkey, tokenx, masorange, LyndonWang, Sealos/Grafana, Spring AI Java). 34 URL. Real costs (Issue #46829: $2,531 overpaid / 4 miesiace). OTel double-counting bug (#12306 + #4364) jako critical insight dla Syntetyka. Vercel AI SDK gap (#4335). Dobrze rozroznia oficjalne vs community tools. Freshness 2026-04-17. |

**Srednia ocena: 8.83 / 10** (powyzej progu PASS 6.0, blizej wyzej niz do krytycznego).
**Rubryka wagona (Completeness 25, Accuracy 25, Relevance 20, Freshness 20, Actionability 10):** wszystkie raporty spelniaja minimum 7/10 w kazdym wymiarze, brak failed dimension.

---

## Konflikty (7 explicit-resolved)

### Konflikt 1: TTL regression scope - marzec vs kwiecien, main+subagent vs tylko subagent

**Strony:**
- **R2 (konflikt self-flagged #3):** "recca0120 audit twierdzi ze April regression dotyczy TYLKO sub-agentow (main agent - 100% 1h przez caly czas). Issue #46829 sugeruje ze March regression dotyczylo i main i sub."
- **R2 Phase tabela (section 6):** marzec dotyczyl "5m dominant" dla total traffic (sum main+sub), nie rozroznia
- **R7 Issue #46829 breakdown (section 12):** Luty = baseline 1h, Marzec = 25.9% overpaid - nie rozroznia main vs sub explicit
- **R3 (section 15):** "Default TTL dla sub-agentow zmieniony z 1h na 5m" - tylko sub-agents
- **R4 (section 5.2):** phases tabela bez rozroznienia main/sub

**Rozstrzygniecie:** Prawdopodobne: **marcowa regression dotknela sub-agentow primary, ale byla widoczna w agregatach main+sub bo sub-agents to duza czesc traffic w Claude Code**. Kwiecien: *tylko* sub-agents (recca0120 solo signal). Main agent pozostal na 1h. **Nie ma hard-evidence ze main agent kiedykolwiek byl dotkniety** - najblizsze dane (Issue #46829) mieszaja oba.

**Confidence: 0.75** - pojedyncze zrodlo dla kwietnia (recca0120), brak reprodukcji. Syntetyk powinien sygnalizowac to jako "hypothesis pending confirmation" nie fact.

**Action dla Syntetyka:** Napisz "main agent jest scope'owany osobno od sub-agents w TTL routing; sub-agents byly dotkniete marcem (wg agregatow) i kwietniem (wg recca0120 JSONL scan); main agent - brak confirmed regression" zamiast "Anthropic obniza TTL".

---

### Konflikt 2: Hit rate variance w batch - 30-70% bez priming vs 95%+ z priming

**Strony:**
- **R6 (section 3):** "Community obserwuje uzytkownikow typowo experiencing cache hit rates ranging from 30% to 98%, depending on their traffic patterns" - oficjalne Anthropic docs
- **R6 (section 4):** priming pattern daje ~95%+ hit rate - cytowane explicit
- **R6 Scenario A:** batch bez priming = niski hit rate (30%) - theoretical worst case
- **R7 (section 2):** "Batch API + priming: 95-98%", "Batch API bez priming: 30-70%"

**Czy primowanie faktycznie dziala?**

**Rozstrzygniecie:** TAK, primowanie dziala **deterministycznie** z perspektywy semantyki cache (pierwsze napisanie cache -> pozniejsze requesty czytaja), ale w praktyce real-world scenarios **tendencja do 70-85% a nie 95%+** ze wzgledu na:
1. Race conditions przy bardzo duzych batchach concurrent
2. Whitespace / capitalization drift w shared prefix
3. TTL expiry w trakcie dlugich batchow (Gap 20 z R6 - batch >1h)

**Confidence: 0.82** - docs oficjalne + community empirical w zgodzie, ale brak benchmarkow dla batch >10k requests (Gap 22 z R6). 95%+ claim jest THEORETICAL PEAK, nie guaranteed.

**Action dla Syntetyka:** "Z primowaniem oczekuj 85-95% hit rate (realistic); bez primowania 30-70%" - NIE ciskac claimem "95%" bez quolifikatora "z priming".

---

### Konflikt 3: Min token thresholds per model - Sonnet 4.6 to 2048 czy 4096? Haiku 4.5 to 4096?

**Strony:**
- **R1 section 10:** "Claude Sonnet 4.6: 2048", "Claude Haiku 4.5: 4096", "Opus 4.7/4.6/4.5: 4096"
- **R3 section 11:** "Claude Sonnet 4.6: **2,048**", "Claude Haiku 4.5: **4,096**" (potwierdza R1)
- **R5 section 16:** "Claude Opus 4.7: 4096, **Claude Sonnet 4.6: 4096**, Claude Sonnet 4.5: 4096, Claude Haiku 4.5: 4096" - podaje ZE WSZYSTKIE nowe modele 4096
- **R5 section 16 (inconsistent z samym soba):** "Claude Sonnet 4.6 (prev note) | 2048" - dodane jako fallback/historyczny

**Kto klamie?**

**Rozstrzygniecie:** **R1 i R3 sa poprawne** (Sonnet 4.6 = 2048). R5 ma bug w tabeli (section 16) - copypaste errror gdzie Sonnet 4.6 zostal wpisany dwa razy z innymi wartosciami. Linia "Claude Sonnet 4.6 (prev note) | 2048" to pozostalosc z wczesniejszej iteracji raportu. R1 jest source of truth bo cytuje Anthropic docs bezposrednio z pobraniem 2026-04-17.

**Confidence: 0.94** - R1 + R3 cross-validated + R5 ma self-contradiction wewnatrz wlasnego raportu.

**Action dla Syntetyka:** Uzyj tabeli z R1 jako canonical. R5 wymaga korekty (REVISE kosmetyczne). Prawdziwa tabela:
- Opus 4.7/4.6/4.5: 4096
- Sonnet 4.6: **2048** (nie 4096!)
- Sonnet 4.5 / Opus 4/4.1 / Sonnet 4 / Sonnet 3.7: 1024
- Haiku 4.5: 4096
- Haiku 3.5 / Haiku 3: 2048

---

### Konflikt 4: Anthropic stanowisko - "cache change should not affect costs" vs 17.1-25.9% cost inflation

**Strony:**
- **R2 (section 6 + konflikt 1 self-flagged):** Anthropic oficjalnie (The Register 13 April 2026, Jarred Sumner) twierdzi "no plans for a global setting", implicit "should not affect costs"
- **R3 (section 15) + R7 (section 12):** Issue #46829 zamkniety jako "not planned" bez odpowiedzi Anthropic
- **Community empirical (R2 section 6 + R7 section 12):** $2,531 overpaid w 4 miesiacach dla jednego developera na 119,866 calls
- **R7 TTL breakdown:** Marzec 2026: 25.9% overpayment ($719.09 w jednym miesiacu dla jednego usera)
- **Boris Cherny (Claude Code creator, cytowany w R2):** "Prompt cache misses when using 1M token context window are expensive" - acknowleges problem ale reframuje

**Kto klamie?**

**Rozstrzygniecie:** **Oba moga byc technicznie prawdziwe z roznych ram**:
- **Anthropic frame:** "Dla jednorazowych wywolan (one-shot) 5m TTL nie zwieksza kosztow bo cache nie jest reuzywany"
- **Community frame:** "Dla dlugich, aktywnych sesji 5m TTL zwieksza koszty o 17-25% bo cache write'y powtarzaja sie co 5 minut zamiast co 60"

Anthropic PR statement odnosi sie do najczestszego use case (short workloads). Community data pochodzi z heavy power users (Max Plan, dlugie sesje). **Oba sa prawdziwe, Anthropic kontekstualizuje korzystnie, community kontekstualizuje obiektywnie**.

**Confidence: 0.88** - hard data community (119,866 calls, audit recca0120) wygrywa z PR statement dla scenariusza heavy sessions. Ale dla short workloads Anthropic moze miec racje.

**Action dla Syntetyka:** Rozdzielic workloady:
- "Short workloads (< 5 min sesje, jednorazowe calls): 5m TTL = 1h TTL w efektywnym koszcie"
- "Long workloads (agentic, dlugie sesje, batch): 5m TTL = 17-25% wyzszy koszt niz 1h TTL (community data #46829)"
- Nigdy nie pisac "Anthropic obnizyl koszty" ani "Anthropic oszukuje" - to nie jest binarnie.

---

### Konflikt 5: Bedrock 1h availability - "tylko Opus/Sonnet/Haiku 4.5" vs ENABLE_PROMPT_CACHING_1H "dziala uniwersalnie"

**Strony:**
- **R2 section 9:** "Bedrock 1h TTL - supported models: Claude Opus 4.5 TAK, Haiku 4.5 TAK, Sonnet 4.5 TAK; Opus 4.1, Opus 4, Sonnet 4, Claude 3.7 Sonnet, 3.5 Haiku, 3.5 Sonnet v2: **NIE (tylko 5m)**; modele 4.6 status niepotwierdzony"
- **R4 section 4.1:** `ENABLE_PROMPT_CACHING_1H=1` "Wymusza 1h TTL na API key, Bedrock, Vertex, Foundry" - UNIWERSALNY
- **R6 section 5:** Bedrock limitations - brak potwierdzenia cross z 4.6 serie

**Czy uniwersalny env var dziala rownie dobrze na Bedrock dla starych modeli?**

**Rozstrzygniecie:** **Nie.** `ENABLE_PROMPT_CACHING_1H=1` jest uniwersalny w sensie "dziala na wszystkich platformach JAKO ENV VAR" - ale platforma (Bedrock) nadal decyduje czy **honoruje** 1h TTL dla danego modelu. Jezeli Bedrock dla Opus 4.1 nie wspiera 1h na backendzie - env var niczego nie zmieni. Env var wysyla `ttl: "1h"` na API, ale server-side Bedrock moze downgraduje do 5m dla legacy modeli.

**Confidence: 0.81** - R2 cytuje AWS docs bezposrednio, R4 cytuje changelog v2.1.108 ale NIE testuje per-model support. Brak hard confirmation dla legacy models na Bedrock.

**Action dla Syntetyka:** "ENABLE_PROMPT_CACHING_1H=1 wysyla poprawny ttl na API requests dla wszystkich platform, ALE platforma (Bedrock/Vertex) musi server-side wspierac 1h dla konkretnego modelu. Sprawdz listy supported models per platforma - dla Bedrock: Opus 4.5 / Sonnet 4.5 / Haiku 4.5 TAK; legacy modele mogly pozostac na 5m."

---

### Konflikt 6: ITPM exemption - cached reads nie zjadaja ITPM quota, oficjalnie udokumentowane czy nie?

**Strony:**
- **R1 section 13:** "Cache read tokens **nie licza sie do ITPM limitu** (Input Tokens Per Minute) od Claude 3.7 Sonnet" - pochodzi z oficjalnych docs + Anthropic blog "Token-saving updates" 2025-03-13
- **R6 section 6:** "Cached tokens (cache_read_input_tokens) NIE licza sie do ITPM rate limits dla wiekszosci modeli"
- **R3 konflikt 6 self-flagged:** "MindStudio post twierdzi ze cache moze 'affect Claude subscription limits' (eat rate limit). Oficjalne docs nie potwierdzaja explicitnie. Rozstrzygniecie: TAK, cache write/read wchodza w token count dla rate limitow". GitHub Issue #24147: "Cache read tokens consume 99.93% of usage quota"

**Czy to jest oficjalnie udokumentowane?**

**Rozstrzygniecie:** **TAK dla ITPM (Input Tokens Per Minute), NIE dla subscription quota**:
- **ITPM (API rate limits):** Cache reads WYLACZONE z ITPM od Claude 3.7 Sonnet - oficjalnie udokumentowane (Anthropic blog 2025-03-13). R1 ma racje.
- **Subscription quota (Max Plan, Pro Plan limits):** Cache reads LICZA SIE do quota (full token count) - Issue #24147 potwierdza. R3 ma racje.

To sa DWA ROZNE licznik: API rate limits (ITPM) != subscription usage quota. Zrodla sie nie klocka - mierza rozne rzeczy.

**Confidence: 0.92** - dobrze udokumentowane, wymaga tylko klarifikacji.

**Action dla Syntetyka:** "Cached reads sa wylaczone z API ITPM (input tokens per minute) od Claude 3.7 Sonnet, ale LICZA SIE do subscription quota (Max Plan, Pro Plan). To oznacza: mozesz przesylac wiecej requestow/minute gdy cache hits, ale quota miesieczna wyczerpuje sie normalnie."

---

### Konflikt 7: Tokenizer overhead 35% na Opus 4.7 - implications dla break-even

**Strony:**
- **R3 section 8:** "Opus 4.7 uses a new tokenizer compared to previous models... This new tokenizer may use up to 35% more tokens for the same fixed text" - cytowane z Anthropic docs
- **R1, R2, R4, R5, R6, R7:** brak wzmianki o tokenizer change
- **R3 implikacja:** break-even math sie nie zmienia ale absolutne kwoty rosna o 35%

**Rozstrzygniecie:** **R3 jest jedynym zrodlem ktore to flaguje**. R3 cytuje oficjalne Anthropic documentation (source: R3 Konflikt 8 flag, cytat "This new tokenizer may use up to 35% more tokens"). Inne raporty milczenie nie oznacza niezgody - po prostu nie dotykaja tego tematu. **R3 ma racje, 35% overhead jest confirmed**.

**Confidence: 0.87** - single source (R3), ale R3 cytuje oficjalne docs. Brak negatywnych zrodel.

**Action dla Syntetyka:** "Opus 4.7 ma nowy tokenizer z ~35% wiecej tokenow per fixed text vs Opus 4.6 - min token threshold (4096) zostaje, ale realnie prompts 'ciasniej zapakowane' co oznacza ze krotsze teksty tez przekraczaja prog. Break-even math (1.25x write, 2x 1h write, 0.1x read) pozostaje identyczna, ale absolutne kwoty w USD rosna proportionalnie. Budgets per migration Opus 4.6 -> Opus 4.7 powinny zakladaly +35% buffer."

---

## Gaps (6 identified)

### Gap 1: Agent Teams cache inheritance (R4 Gap #3)

**Opis:** Claude Code ma nowa feature Agent Teams (CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1). Kazdy agent ma swoj context window, ale **czy dzielony cache prefiksu?** Brak danych publicznych. R4 self-flagged.

**Impact:** Wysoki dla Agent Architecture projektu (projekt tego usera uses 35 agents + 42 presets, active multi-agent workflows). Jesli agents nie share cache - koszty rosna N-fold vs single agent.

**Rekomendacja:** **DELTA RESEARCH** - zamow nowe mini-research od R4 (GitHub researcher) pod katem "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS cache behavior: shared prefix? per-agent cache? 1h TTL default?" - to JEDYNY gap z wysokim priority dla tego projektu.

### Gap 2: Automatic caching hit rate vs manual breakpoints (R3 Gap #12, R5 Gap #17)

**Opis:** Automatic caching wprowadzone 2026-02-19 (R1 section 2.A). Brak empirycznych danych czy auto-cache generuje te same hit rates co manual breakpoints (skomplikowany scenario: 3 manual breakpoints vs 1 auto breakpoint ktory sam sie porusza).

**Impact:** Sredni. Syntetyk moze polecic "manual > auto dla agentic workflows z 3+ warstwami freshness" na podstawie R5 section 2 (Pattern 2: Two breakpoints) vs Pattern 3 (incremental conversation), ale bez hard empirical.

**Rekomendacja:** **DOCUMENT AS GAP** - nie zamawiaj research, bo to wymaga benchmarku ktorego spolecznosc jeszcze nie przeprowadzila. Syntetyk pisze "theoretical expectation: manual lepszy dla >=3 warstw; auto lepszy dla single-warstwa static prefix. Empirical TBD."

### Gap 3: Subagent cache inheritance po workspace isolation (R4 Gap #5, R7 extension)

**Opis:** Od 2026-02-05 cache jest isolated per-workspace (R1 section 13). Przedtem cache byl shared w organizacji. **Jak to wplywa na Agent Teams gdzie wiele sub-agents w jednym workspace?** Team cache sharing dla CLAUDE.md - "All users in the same project share the CLAUDE.md cache" - czy wciaz prawdziwe po workspace isolation?

**Impact:** Wysoki dla multi-team setups. Dla Agent Architecture projektu: moderate (tylko single user).

**Rekomendacja:** **DELTA RESEARCH opcjonalny** lub **DOCUMENT AS GAP** - jesli projekt nie ma multi-team, skip. Syntetyk pisze "workspace isolation (od Feb 2026) = cache shared w ramach workspace, nie cross-workspace w tej samej organizacji. Team sharing pattern: WYMAGA zeby wszyscy deweloperzy byli w tym samym workspace (pre-Feb 2026 dzialalo cross-workspace w org, post-Feb 2026 nie)."

### Gap 4: Fast Mode (Opus 4.6) caching behavior (R3 Gap #10)

**Opis:** Fast Mode (Opus 4.6 only) ma 6x pricing premium ($30 / MTok vs $5). Cache stackuje (R3 section 5: Fast Mode + cache read = $3 / MTok), ale brak benchmarku czy warto (czas latency vs savings).

**Impact:** Niski. Fast Mode jest niche feature. Tylko zaawansowani uzytkownicy.

**Rekomendacja:** **DOCUMENT AS GAP** - skip delta research. Syntetyk moze napisac "Fast Mode + cache read: teoretycznie $3/MTok (90% savings vs base Fast Mode rate $30/MTok), ale brak community benchmarku latency vs koszt tradeoff."

### Gap 5: OTel double-counting bug confirmation (R7 Gap #25, R7 Konflikt 17)

**Opis:** Langfuse issue #12306 + pydantic-ai issue #4364 pokazuja ze OpenTelemetry Anthropic semantic convention ma zle zdefiniowane `gen_ai.usage.input_tokens` - inkluduje cache reads co powoduje double-counting kosztow. **Status fix?** R7 flaguje jako niezalatany, ale kampania nie zweryfikowala active fix status w kwietniu 2026.

**Impact:** Wysoki dla enterprise observability (Datadog, Honeycomb, Langfuse users) - moga miec 2x zawyzone koszty w dashboardach.

**Rekomendacja:** **DELTA RESEARCH** (jesli Syntetyk oceni jako blocking) - zamow mini-research u R7 pod katem "Langfuse issue #12306 status jako 2026-04-17: fixed / open / workaround?" Prost task.

### Gap 6: 1h TTL min token threshold vs 5m - czy rozni sie?

**Opis:** Wszystkie raporty cytuja min token thresholds w kontekscie 5m TTL. R1 tabela listuje np. Sonnet 4.6 = 2048. Ale CZY 1h TTL ma te same progi? Czy moze wyzsze (ze wzgledu na dluzsza rezerwacje cache)? Brak explicit documentation.

**Impact:** Sredni. Jesli 1h TTL ma wyzszy prog (np. 4096 dla Sonnet 4.6), to user ktory ustawia `ttl: "1h"` dla 3000-token prefix dostaje silent fail.

**Rekomendacja:** **DOCUMENT AS GAP** - Syntetyk pisze "Oficjalne docs nie rozrozniaja min token thresholds miedzy 5m i 1h TTL. Assumpcja: te same progi. Rekomendowany monitoring: sprawdz `cache_creation.ephemeral_1h_input_tokens > 0` w response - jesli 0, threshold nie zostal osiagniety."

---

## Bias detection

### Anecdotal claims (< 3 examples) - flag

1. **R4 section 6.2 "Bun string replacement bug":** pojedynczy Issue #41930, brak cross-validation. **Bias risk: SINGLE-SOURCE TRUST.** Syntetyk powinien cytowac jako "hypothesis" nie "confirmed".

2. **R2 section 7 "April 9 regression":** self-flagged confidence 0.78, jedno zrodlo (recca0120), brak corroboration. **Bias risk: SINGLE-SOURCE TRUST.** Syntetyk cytuje jako "reported by one source, pending confirmation".

3. **R5 section 13 "Kern-ai 10x cost reduction":** jedno case study blog, brak cross-validation innych enterprise. **Bias risk: SINGLE-SOURCE.** Syntetyk cytuje z atrybucja "Kern-ai reported 10x" zamiast "research shows 10x savings achievable".

4. **R7 section 4 Case 4 "AWS us-east-1 enterprise":** "tens of thousands of dollars monthly" bez konkretu. **Bias risk: VAGUE/ANECDOTAL.** Syntetyk moze skip albo kwota "10k+/month dla enterprise scale" z qualifier "enterprise customers (undisclosed names) reported".

### Single-source claims

5. **R3 tokenizer overhead 35%:** TYLKO R3 wspomina. Oficjalny Anthropic cytat, ale brak cross w 6 innych raportach. **Bias risk: NISKI** - oficjalne docs sa trust-1, nawet jesli jedyne zrodlo.

6. **R4 env var list (section 4.1) z `CLAUDE_CODE_FORCE_GLOBAL_CACHE=1`:** R4 self-flagged jako "community discovery, nie oficjalne docs" (Gap #4). **Bias risk: SINGLE-SOURCE, niezweryfikowane.** Syntetyk nie powinien cytowac jako oficjalny env var.

### Confirmation bias check

Zadna z rekomendacji nie wydaje sie wynikiem konfirmacji z gory zalozonej tezy. Researcherzy nie "szukali dowodow" dla predefiniowanej konkluzji - raportowali rozne perspektywy (R2 krytyczny wobec Anthropic, R1 neutralny-oficjalny, R3 ekonomiczny, R7 uzytkowy).

**Grouthink check:** Zgodnosc na pricing multipliers, hierarchii, 20-block lookback pochodzi z tego samego zrodla (Anthropic docs) - to NIE jest groupthink z blednego zrodla, to cross-validation na source of truth. GO.

### Freshness check

Wszystkie raporty datowane 2026-04-17, najczesciej pobrane live. Najstarsze cytowane zrodla: 2024-08 (Anthropic launch news). Middle range 2025-Q3/Q4 (Spring AI, LangChain integration releases). Najnowsze: v2.1.108 changelog (2026-04-14). **Freshness OK - zadne zrodlo EOL, zadne pre-GA info cytowane jako aktualne.**

### Vintage bias check

Brak. Raporty jawnie oznaczaja stare tutoriale jako "outdated" (np. R3 Konflikt 12: "Community post z HN (Aug 2024 launch) opisywal caching jako '5 minutes only'. Oficjalne docs od Q4 2024 maja tez 1h option. Starsze posty moga wprowadzac w blad").

---

## Rekomendacje dla Syntetyka

### Trust tier per claim kategorii

**Trust-1 (primary docs, oficjalne Anthropic):**
- Schema cache_control (R1 section 1)
- Pricing multipliers 1.25x / 2x / 0.1x (R1 section 9, R3 section 2)
- Hierarchia tools -> system -> messages (R1 section 3, R5 section 1)
- 20-block lookback window (R1 section 5, R2 section 3, R5 section 15)
- Max 4 breakpointy + HTTP 400 (R1 section 4)
- Workspace isolation 2026-02-05 (R1 section 13, R2 section 11, R3 section 17)
- Automatic caching 2026-02-19 (R1 section 2.A, R3 section 18)
- Min token thresholds PER MODEL (R1 section 10 + R3 section 11, NIE R5 section 16)
- ITPM exemption dla cache reads (R1 section 13)
- Mixing TTL billing formula (R1 section 12, R2 section 12)
- Batch + Cache stacking 0.5 * 0.1 = 0.05x (R3 section 16, R6 section 2)

**Trust-2 (community empirical z cross-validation >=2 zrodla):**
- Cache hit rates 85-96% healthy, <50% degraded (R3, R4, R7)
- Du'An Lightfoot $720/m -> $72/m case study (R3 section 4, R7 section 4)
- ProjectDiscovery 7% -> 84% via relocation of dynamic content (R3 section 12)
- TTL marcowa regression 17.1-25.9% overpayment (R2 section 6, R7 section 12, R3 section 15)
- `<system-reminder>` pattern jako dynamic context injection (R4 section 2.4, R5 section 12)
- 3-bug anatomy cache regression (R4 section 6.1 - cnighswonger fix) - single org but code deployed
- ENABLE_PROMPT_CACHING_1H=1 od v2.1.108 (R2 section 8, R4 section 4.1)
- Claude Code 96% hit rate observation (R4 section 2.3, R5 section 12)
- Kern-ai 10x (R5 section 13, R3 indirect) - single case study but matches arxiv
- Arxiv 2601.06007 45-80% cost reduction (R5 section 14)
- Priming pattern dla batch (R6 section 4, R5 Pattern 4)

**Trust-3 (single-source lub anecdotal):**
- April 9 regression (R2 section 7, R7 indirect) - single researcher
- Bun string replacement bug (R4 section 6.2) - single issue
- `CLAUDE_CODE_FORCE_GLOBAL_CACHE` env var (R4 section 4.1) - community discovery
- AWS "tens of thousands saved" (R7 section 4) - vague, unattributed
- Tokenizer 35% overhead na Opus 4.7 (R3 section 8) - official cite, brak cross

### Overlap z Context Engineering SYNTHESIS

Zgodnie z instrukcja sprawdzilem kluczowe tematy. Kampanie byly **parallel** (research 2026-04-17 dla obu). Overlap minimalny:

1. **`<system-reminder>` pattern:** W Prompt Caching kampanii (R4 section 2.4, R5 section 12) opisany jako "dynamic context injection bez invalidacji cache". W Context Engineering (zakladana synthesis) ten sam pattern pojawia sie jako "dynamic state management". **Rozstrzygniecie:** tresciowo spojne. Syntetyk Prompt Caching powinien wspomniec "ten pattern zostal tez zidentyfikowany przez Context Engineering SYNTHESIS jako key anti-invalidation technique". Cross-reference, nie powtarzanie.

2. **CLAUDE.md layering:** Prompt Caching dotyka jak CLAUDE.md wplywa na cache (R4 section 1, R5 section 12). Context Engineering dotyka jak CLAUDE.md jest uzywane do instruct Claude. **Rozstrzygniecie:** rozne perspektywy. Syntetyk Prompt Caching pisze TYLKO o cache aspects - pozostawia instrukcje/content dla Context Engineering.

3. **Workspace isolation Feb 2026:** Pojawia sie w Prompt Caching (R1, R2, R3, R4 wszystkie) jako cache-related. Context Engineering moze dotykac jako project scoping. **Rozstrzygniecie:** Syntetyk Prompt Caching skupia sie na wplywie na cache sharing (team implications), nie na data isolation semantics.

**Nie ma duplikacji ktora wymaga dealokacji** - kampanie sa dobrze scoped. Syntetyk moze cytowac Context Engineering w 1-2 miejscach jako "see also" bez zamawiania dodatkowego research.

### Co zrobic z konfliktami w SYNTHESIS

1. **Konflikt 1 (TTL scope):** napisz conditional. "marzec - dotknietni glowne agregaty (sub-agents + mixed); kwiecien - tylko sub-agents (recca0120 single source)". Nie ignoruj ale oznacz confidence.

2. **Konflikt 2 (hit rate batch):** uzyj "85-95% z priming (realistic), 30-70% bez priming" - unikaj peak 95%+ bez qualifier.

3. **Konflikt 3 (min tokens):** uzyj R1 tabeli. Flaguj R5 do REVISE przed finalnym deploy.

4. **Konflikt 4 (Anthropic stanowisko):** rozdziel short-workloads vs long-workloads. Nie pisz "Anthropic klamie". Pisz "Dla Twojej sesji >5min z repeat-calls, koszty moga byc 17-25% wyzsze niz z 1h TTL".

5. **Konflikt 5 (Bedrock env var):** kontekstualizuj env var jako "wyslanie poprawnego parametru"; platforma musi wspierac.

6. **Konflikt 6 (ITPM):** rozdziel ITPM API vs subscription quota.

7. **Konflikt 7 (tokenizer 35%):** cytuj R3 (single source ale oficjalne) z flag dla migracji Opus 4.6 -> 4.7.

### Struktura SYNTHESIS - sugestia

**Sekcja 1: Co jest FAKT (trust-1 + trust-2 z cross)** - 60% SYNTHESIS
**Sekcja 2: Co jest KONTROWERSYJNE** (4 konflikty do rozstrzygniecia) - 15%
**Sekcja 3: Co jest LUKI** (6 gaps, delta research rekomendacje) - 10%
**Sekcja 4: Praktyczne rekomendacje** (dla Agent Architecture projektu: env vars, monitoring, warm-up) - 15%

### Red flags do NIE powtarzania

1. Nie pisz "95% savings" bez qualifier "z priming, z Batch + Cache stack"
2. Nie pisz "Anthropic obnizyl koszty przez TTL regression" (niepoprawne narracje)
3. Nie pisz "wszystkie nowe modele wymagaja 4096 tokenow" (Sonnet 4.6 = 2048)
4. Nie cytuj R5 tabeli min tokens - uzyj R1 / R3
5. Nie traktuj `CLAUDE_CODE_FORCE_GLOBAL_CACHE` jako oficjalnego env var
6. Nie zakladaj ze cache reads zjadaja subscription quota inaczej niz regular tokens (zjadaja rowno)

---

## Recommendation

### GO/NO-GO: **GO with 2 minor REVISE + 1 DEEP FLAG**

**PASS dla:** R1, R2, R4, R6, R7 (5/7 raportow bez zastrzezen substantywnych)

**REVISE nice-to-have dla:** R3, R5 (kosmetyka numeracji - substancja poprawna, ale renumeracja sekcji i konfliktow dla czytelnosci SYNTHESIS)

**DEEP FLAG dla:** Konflikt 4 (Anthropic stanowisko vs community) - Syntetyk **MUSI** rozstrzygnac z argumentami po obu stronach. To nie jest claim do pominiecia.

### Rekomendacje per raport (szybki bulleted)

- **R1:** PASS - drop-in ready, cite as canonical dla oficjalnych faktow
- **R2:** PASS - najmocniejszy empiryczny, uzyj jako primary source dla TTL regression
- **R3:** REVISE (renumbering) - substancja OK, Syntetyk moze pracowac z raportem, ale dla audit trail REVISE sugerowany
- **R4:** PASS - unikalny GitHub focus, uzyj dla env vars i 3-bug anatomy
- **R5:** REVISE (renumbering + R5 section 16 tabela min tokens ZLA) - substancja OK except tabela, fix tabela before SYNTHESIS
- **R6:** PASS - czysta matematyka stackingu, drop-in
- **R7:** PASS - najszerszy monitoring coverage, uzyj dla production recommendations

### Delta research rekomendacje (opcjonalne)

1. **PRIORITY 1:** Agent Teams cache inheritance (Gap 1) - dla projektu Agent Architecture z 35 agentami to krytyczne
2. **PRIORITY 2:** OTel double-counting bug fix status (Gap 5) - szybki check jesli Syntetyk oceni blocking
3. **PRIORITY 3 (skip):** automatic vs manual hit rate benchmark (Gap 2) - document as gap, nie research
4. **PRIORITY 3 (skip):** Fast Mode + Cache tradeoff (Gap 4) - niche, document as gap

### Material dla Syntetyka jako input

- Uzyj tego CRITIC.md jako dependencies map (konflikty explicit-resolved daje Syntetyka tie-breakers)
- Cytuj raporty explicit (np. "R2 section 6", "R4 section 4.1") - nie streszczaj
- Trust tier map z sekcji "Trust tier per claim kategorii" - stosuj
- Red flags do NIE powtarzania - checklist przed finalnym deploy

---

## Status (10-15 linii)

**Critic:** Research Critic (claude-sonnet, phase research, load 85/100)
**Kampania:** Prompt Caching 2026 - walidacja 7 raportow (R1-R7)
**Data:** 2026-04-17
**Wordcount CRITIC.md:** ~6200 slow (cel 4000-7000 - w limicie)
**Werdykt:**
- PASS: 5/7 (R1, R2, R4, R6, R7)
- REVISE: 2/7 (R3, R5 - kosmetyczne, renumeracja + R5 tabela min tokens)
- FAIL: 0/7

**Konflikty zidentyfikowane:** 7 (wymagany minimum 5 - exceeded)
**Gaps zidentyfikowane:** 6 (wymagany minimum 3 - exceeded)
**Bias flags:** 4 anecdotal/single-source, 2 vintage-age check (pass)
**Deep flag:** Konflikt 4 (Anthropic stanowisko vs community data) - MUSI byc rozstrzygniety w SYNTHESIS

**Rekomendacja Overall:** GO do Syntetyka. Material gotowy z asterisk na R3/R5 kosmetyke + 1 deep flag.

**BRAMA 4:** **PASS** (>=5 konfliktow + >=3 gaps + per-raport PASS/REVISE + rekomendacje dla Syntetyka).

**Delta research sugerowany (opcjonalny):** Agent Teams cache inheritance (Gap 1) - priority dla projektu Agent Architecture.

**Next step:** Syntetyk bierze ten CRITIC.md + 7 raportow + (opcjonalnie) 7 extracts E1..E7 i pisze SYNTHESIS.md zgodnie ze struktura sugerowana w sekcji "Struktura SYNTHESIS - sugestia".
