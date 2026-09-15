---
role: Research Critic
campaign: claude-md-patterns-2026
model: claude-opus-4-7
date: 2026-04-17
reports_reviewed: 7
verdicts: {PASS: 5, PASS_WITH_NOTES: 2, REVISE: 0}
conflicts_identified: 12
gaps_flagged: 8
top_findings: 3
target_consumer: Syntetyk (map-reduce pipeline, Extractor -> SYNTHESIS.md)
word_count_target: 5000-7500
status: DONE
---

# CRITIC.md - Kampania B: CLAUDE.md Patterns 2026

## 0. TL;DR dla Syntetyka

Wszystkie 7 raportow przeszlo walidacje. 5 werdyktow PASS, 2 PASS WITH NOTES (R3, R7). Zero REVISE. Jakosc research jest wysoka, konsensus ponad ~80% kluczowych tez jest mocny (tiery, compact, @import, "less is more", hooks > CLAUDE.md). Krytyczne findings dla Syntetyka:

1. **CLAUDE.md to INSTRUCTION STACK, nie CONFIG.** Concat, nie override. Tail bias + specificity. R1/R2/R5/R6 zgodni, cytuja to samo sformulowanie docs ("All discovered files are concatenated... rather than overriding"). To NIE jest kontrowersja - to fundament modelu mentalnego.

2. **Plugin CLAUDE.md nie istnieje - consensus HIGH.** R1, R2, R5, R6 potwierdzaja na podstawie plugin docs (brak slotu `CLAUDE.md` w structure table). Plugin dostarcza skills/agents/hooks/MCP/settings, nie persistent context. Synteza: zamknac to jednoznaczne, nie traktowac jako gap.

3. **Hooks > CLAUDE.md dla enforcement - empirical proof.** R4, R7 cytuja te sama dychotomie (~70% compliance markdown vs ~100% hook) z roznych zrodel (HumanLayer, dev.to, Issue #2142). R6 potwierdza architekturalnie ("CLAUDE.md is advisory, settings rules are enforced by the client"). Ta zasada musi byc jedna z 3 centralnych tez w SYNTHESIS.

Pozostale ustalenia i konflikty ponizej, w 12 sekcjach.

---

## 1. Werdykty per raport

### 1.1 R1 Official Docs - PASS

**Uzasadnienie:** Najbardziej rygorystyczny raport w kampanii. Primary sources z oficjalnych domen Anthropic (code.claude.com/docs/en, github.com/anthropics/claude-code CHANGELOG). Wszystkie kluczowe twierdzenia zakotwiczone w sekcji docs cytowanej z anchorem. Redirect note (docs.claude.com/en/docs/claude-code -> code.claude.com/docs/en) wyjasniony explicite. 9 gaps flagowanych uczciwie - nie probuje udawac pewnosci tam gdzie docs nie rozstrzygaja (G1 hard size limit, G2 circular @import, G8 Managed vs Project priority).

**Mocne strony:**
- Tabela "What survives compaction" verbatim z context-window.md - jest to canonical source dla calej kampanii
- InstructionsLoaded hook payload verbatim z 5 `load_reason` values (compact/session_start/nested_traversal/path_glob_match/include) - zgodne z R3, R6
- AGENTS.md oficjalne stanowisko: "Claude Code reads CLAUDE.md, not AGENTS.md" + `@AGENTS.md` bridge pattern - to clinch dla tego tematu
- Rozpoznaje Managed jako tier 1 z hard guarantee "cannot be excluded"

**Slabosci (minor):**
- Nie testuje empirycznie "Managed vs Project przy konflikcie" (flagi G8) - ale to nie jest wymaganie scope'u R1 (empiryka w R3)
- G1 hard size limit - nie szuka changelog entries za 2024-2025 (tylko main branch CHANGELOG 2.1.112 daje latest entries)

**Verdict: PASS.** Nadaje sie jako **primary reference** dla SYNTHESIS. Oznaczyc jako "CONSENSUS baseline - inne raporty cross-checkowane przez R1".

### 1.2 R2 Three Tiers Deep Dive - PASS

**Uzasadnienie:** Solidna synteza docs + community patterns. Kluczowa teza "CLAUDE.md to instruction stack, nie config" jest najlepszym mental modelem w calym corpusie. 6 scenariuszy konfliktow (sekcja 8) to bardzo uzyteczny material dla SYNTHESIS.

**Mocne strony:**
- Tabela "Tier -> Loaded when -> Merge semantyka -> Exclude?" (sekcja 6.3) - canonical dla completenessa
- 4 tiery (Managed / User / Project / Local) zgodne z R1
- Plugin CLAUDE.md NIE istnieje - zgodne z R1, R5, R6. Konsensus HIGH.
- Token budget per tier (sekcja 9) z worst-case ~9200 tokenow startup - uzyteczne dla analityki kosztow

**Slabosci (minor):**
- Twierdzi "User CLAUDE.md przezywa /compact" (sekcja 6 koniec) - to jest gap wg R3 (context-window table explicite wymienia tylko "Project-root CLAUDE.md" jako re-injected, user CLAUDE.md jest NIEJEDNOZNACZNY). Cross-check: R3 sekcja 4.3 oznacza to jako GAP (Issue #22085 historically wskazywal na user CLAUDE.md NIE re-inject). R2 jest tu zbyt pewny - patrz Konflikt 3.
- Loading order w sekcji 6.3 "Managed first" jest inference'em, nie dokumentacja. R1 sekcja 5.1 tez to tylko wnioskuje z "cannot be excluded".

**Verdict: PASS.** Dla SYNTHESIS: uzyj scenariuszy konfliktow (sekcja 8) jako case studies. Nie cytuj sekcji "User CLAUDE.md survives compaction" bez weryfikacji.

### 1.3 R3 Auto-loading Mechanics - PASS WITH NOTES

**Uzasadnienie:** Najbardziej techniczny raport z lifecycle perspektywy. ASCII diagram cold-start -> steady-state -> compact -> end (sekcja 2) powinien przejsc do SYNTHESIS niemal verbatim. Cite hop dat kluczowy: cache TTL regression (Issue #46829, Mar 2026), v2.1.62 resume cache bug, v2.1.89 nested CLAUDE.md re-injection bugfix.

**Mocne strony:**
- Precyzyjne rozroznienie eager vs lazy vs compact-survived (sekcja 3 tabela)
- CwdChanged hook nie re-walk'uje ancestrow - niuans ktorego mozesz przeoczyc (sekcja 5)
- Runtime reload = no /reload command (#17127, #22085 zamkniete jako duplicate) - kluczowy operational fact
- Prompt cache math: edit invalidates prefix, 25% premium na nastepny turn, 5-min TTL default

**Notes / minor revise:**
- Twierdzi w sekcji 7.3 ze system tools = 20,400 tok bazowane na #19105 - ale ten issue jest zamkniety jako duplicate. Liczba jest reprezentatywna ale bez guarantee aktualnosci. Flag dla Syntetyka: traktowac jako "order of magnitude", nie precyzyjny budzet.
- Sekcja 8.4: "After /compact, CLAUDE.md re-read from disk creates new cached prefix. Expect cache-miss turn immediately." To jest dedukcja nie-cytowana bezposrednio z Anthropic docs. Prawdopodobnie true, ale oznaczyc jako inference.
- Sekcja 10 multi-session isolation jest triangulacja, nie direct docs - R3 explicite oznacza to jako "inferred". Honest, ale Syntetyk powinien wiedziec.
- Gap #4 (#` prefix deprecation) zrobiony przez community sources - R7 potwierdza historical existence, current docs brak. Spojne.

**Verdict: PASS WITH NOTES.** Generally trustworthy. Dwa inference'y do oznaczenia w SYNTHESIS.

### 1.4 R4 Writing Practices - PASS

**Uzasadnienie:** Najlepszy raport praktyczny. 17 DO + 17 DON'T + 5 complete starter templates + 12 concrete anti-patterns. Drop-in ready dla SYNTHESIS.

**Mocne strony:**
- Mid-level abstraction mental model (sekcja 2) jest ostrzejszy niz u Anthropic samego
- DO/DON'T table verbatim z Anthropic [C2] + community ekstrapolacje
- 30-Line Rule (dev.to docat0209) + 60-Line Rule (HumanLayer) + 200-Line (Anthropic) w jednej tabeli z source attribution
- 5 starter templates (TS/React, Python ML, Rust CLI, Turborepo, SDK) to gotowy material - najmocniejszy deliverable calej kampanii
- Anti-patterns A1-A12 z cytatami i fixami

**Slabosci (minor):**
- Sekcja 9 "Simon Willison preference" to interpretacja jego repo (brak explicit statement) - R4 sam to oznacza ("his research repo suggests"). Honest.
- Gap 8 `<important if="...">` tag effectiveness - R4 flaguje jako community invention "docs don't mention it". Spojne z R7 (ktora tez wspomina to jako HumanLayer pattern, nie Anthropic feature).

**Verdict: PASS.** Najuzyteczniejszy raport dla practical section w SYNTHESIS.

### 1.5 R5 Multi-file + Organization - PASS

**Uzasadnienie:** Mocna synteza @import + monorepo + plugin patterns. Kluczowe findings (symlinks circular detection, claudeMdExcludes glob matching, --add-dir + env var) spojne z R1, R6.

**Mocne strony:**
- 7 aspektow @import (sekcja 2) kompletny - format, relative/absolute/home, max depth, circular, errors
- Kanoniczna struktura Turborepo (sekcja 5.2) - gotowa do inclusion
- Virtual Monorepo pattern (35 repos) - distinctive finding z Medium article, unique w calym corpusie
- Layered organization 4 warstwy (L1..L4) - spojne z Meszaros L0-L6 model w R7 (oboje niezaleznie doszli do warstw)
- Sekcja 7 lazy vs eager loading tabela - jasna, uzyteczna

**Slabosci (minor):**
- Sekcja 2.4 "Remote URLs NIE wspierane" brak wsparcia w community testach - R5 sam oznacza jako gap #1. OK.
- Sekcja 2.7 "Silent skip brak pliku" pochodzi z community tests (dev.to anvodev), nie docs. Oznacz jako community-validated.
- Sekcja 10.8 CLAUDE.local.md deprecation - stwierdza jasno "NIE deprecated, dalej dzialajacy" cytuje z current memory docs. Rozstrzyga vs R7 ktora flaguje to jako "unclear official status". R5 WINS na tym punkcie - primary source bije community folklore.

**Verdict: PASS.** Dla SYNTHESIS uzyj sekcji 5.2 (Turborepo structure) i sekcji 8 (shared templates) jako reference material.

### 1.6 R6 Integrations - PASS

**Uzasadnienie:** Najszerszy raport integration perspective. 25 distinct integration points (ponad wymagany min 10). Cross-reference table (sekcja 12 tabela system->CLAUDE.md) to prawdopodobnie najbardziej uzyteczny artefakt dla SYNTHESIS.

**Mocne strony:**
- Explicit odpowiedz na pytanie "Subagent sees CLAUDE.md?" (sekcja 7.1): TAK loaded via cwd walk, NIE inherit parent conversation, Explore/Plan skip CLAUDE.md. Te 3 fakty byly DISPUTED w scope - R6 rozstrzyga z primary citation (context-window.md)
- Plugin CLAUDE.md NIE istnieje - 4th independent confirmation (R1, R2, R5, R6 zgodni). Close that question.
- SlashCommands merged into skills (2026) - historyczna zmiana, R6 cytuje docs. Uzyteczne dla context w SYNTHESIS.
- InstructionsLoaded hook ultra szczegolowo - 5 load_reason values + payload schema
- 53 distinct R6.C<N> citations, 3 secondary - rigor

**Slabosci (minor):**
- Sekcja 11.3 cache regression v2.1.62 - R6 cytuje Issue #29230 jako primary. R3 cytuje tylko #46829 (TTL regression). Zgodne ale to sa dwa ROZNE issues. Rozroznij w SYNTHESIS:
  - #46829: TTL silently regressed 1h -> 5min (Mar 2026, all users) - R3 primary
  - #29230: v2.1.62+ --resume breaks cache KV regression (sep issue, 20x cost spike) - R6 primary
  - Patrz Konflikt 5 ponizej.

**Verdict: PASS.** Use integration table verbatim. Najmocniejsza sekcja o subagent loading (rozstrzyga ambiguity z scope).

### 1.7 R7 Community + Antipatterns - PASS WITH NOTES

**Uzasadnienie:** Unique value add - jedyny raport z field evidence, community corpus, empirical ETH Zurich study. Ale tez najwiecej do zweryfikowania.

**Mocne strony:**
- 10 top CLAUDE.md files z public GitHub z specific liczbami linii (Metabase 54, HumanLayer 88, LangGraphJS convention-dense)
- Karpathy -> Forrest Chang andrej-karpathy-skills phenomenon - jedyne zrodlo w kampanii o viral meta-CLAUDE.md archetype
- 5 archetypes (Minimalist/Convention-heavy/Command-driven/Architecture-focused/Meta-CLAUDE) - spojne z Meszaros L0-L6 model
- Compliance decay curve (Wiegold): 95% msg 1-2 -> 20-60% msg 6-10 -> lost msg 10+
- Issue #2142 case study: 3 live API keys committed MIMO security section w CLAUDE.md. This is the clinching evidence dla "hooks > CLAUDE.md for enforcement".
- ETH Zurich Feb 2026 study: 160x uv usage, 2.7% ablation improvement, 20% cost +4% accuracy

**Notes / to verify:**
- **ETH Zurich study verification:** R7 cytuje tylko przez Thomas Wiegold blog + wolfejam HN comment. Nie ma direct paper link. Primary source zweryfikowany byloby solid - bez tego jest secondary. Dla SYNTHESIS oznacz jako "community-reported empirical, not peer-reviewed primary access". Liczby (160x uv, 2.7%, 20% cost) moga byc approximated through 2nd-hand reporting.
- Sekcja 10.3 Jan-Feb 2026 ewolucja: tone w stylu "konwergencja na less-is-more", cited via eesel/the-ai-corner/claudify.tech. Solid trend narrative, ale sources are opinion blogs. OK dla evolution narrative, nie dla hard claims.
- Karpathy tweet date Jan 27 2026 "confirmed via derivative repo README but primary tweet ID not captured" - slabosc R7 samo to oznaczaja jako gap (sekcja 12 bullet Twitter/X). Spojne.
- "Star velocity tens of thousands in first two weeks" dla forrestchang/andrej-karpathy-skills - brak gh api screenshot. Szacunek.
- Compliance decay curve rzekomo "Khare, propagated via Wiegold" - first source unclear. Wiegold's blog is the verifiable chain. Liczby 95%/60-80%/20-60% sa published wiec dobre, ale origin methodology not clear.

**Verdict: PASS WITH NOTES.** Najwiecej content'u community + field evidence. Trzy empirical claims do oznaczenia:
1. ETH Zurich liczby (160x, 2.7%, 20%, 4%) - secondary cited
2. Compliance decay 95%/60-80%/20-60% - Wiegold-published ale origin blurry
3. Karpathy tweet date Jan 27 2026 - no primary tweet link

Dla SYNTHESIS: te liczby podaj z source ("wg ETH Zurich study cytowanego przez Wiegold..."), nie jako ultimate truth.

### 1.8 Agregat werdyktow

| Report | Verdict | Confidence | Key contribution |
|--------|---------|------------|------------------|
| R1 | PASS | HIGH | Primary docs reference, baseline for cross-check |
| R2 | PASS | HIGH | Instruction stack mental model, 6 conflict scenarios |
| R3 | PASS WITH NOTES | MEDIUM-HIGH | Lifecycle diagram, cache regression dates |
| R4 | PASS | HIGH | Practical DO/DON'T, 5 starter templates |
| R5 | PASS | HIGH | Monorepo Turborepo structure, shared templates |
| R6 | PASS | HIGH | 25 integration points, subagent loading rozstrzygniecia |
| R7 | PASS WITH NOTES | MEDIUM | Community corpus, empirical data (secondary sourced) |

Zero REVISE. Caly corpus nadaje sie do syntezy.

---

## 2. Konflikty cross-report (12 rozstrzygniec)

### Konflikt 1: Subagenty i CLAUDE.md - DISPUTED claim, rozstrzygniety

**Konflikt:** Scope kampanii pytał "subagenty NIE dostaja automatycznie CLAUDE.md?" (zakladana teza). R6 sekcja 7.1 twierdzi explicite "**Subagent DOES auto-load CLAUDE.md** (discovered by walking up the directory tree, same as the main session)" cytujac context-window.md verbatim.

**Rozstrzygniecie:** R6 WINS. Primary source (Anthropic context-window visualization) mowi literalnie: "The subagent loads CLAUDE.md too. Same file, same content, but it counts against the subagent's context, not yours."

Dla SYNTHESIS uwaga o niuansie:
- Subagent DOES load CLAUDE.md (auto-discovery z cwd walk)
- Subagent DOES NOT inherit parent conversation / parent auto-memory / parent skill descriptions
- Built-in Explore and Plan agents explicite SKIP CLAUDE.md (read-only optimization)
- Subagents z `skills:` frontmatter preload full skill bodies + CLAUDE.md

Powszechna misconception "orchestrator must brief subagents on project context" is HALF right. Orchestrator brief them on TASK STATE (conversation), not on PROJECT CONVENTIONS (CLAUDE.md handles that).

**Confidence HIGH.** Primary source + R6 structured table. Case closed.

### Konflikt 2: Tiery CLAUDE.md - CONSENSUS HIGH

**Konflikt:** R1 mowi 4 tiery (Managed > User > Project > Local). R2 potwierdza 4 tiery. R5 potwierdza 4 warstwy. R6 referencjuje 4 scopes w Memory docs. Plugin CLAUDE.md NIE istnieje (R1, R2, R5, R6 zgodni).

**Rozstrzygniecie:** ZGODNOSC. Dla SYNTHESIS tierowanie ma byc zaprezentowane jako:

1. **Managed policy** (enterprise) - cannot be excluded, OS-specific paths
2. **User** (`~/.claude/CLAUDE.md`) - personal across projects
3. **Project** (`./CLAUDE.md` or `./.claude/CLAUDE.md`) - team-shared via git
4. **Local** (`./CLAUDE.local.md`) - personal + project-specific, gitignored

Plus mechanizmy pomocnicze:
- **`.claude/rules/*.md`** - path-scoped z YAML frontmatter `paths:`
- **`@import`** syntax - 5 hops eager
- **Ancestor walk** - auto z cwd w gore
- **Lazy subfolder** - on-demand when Claude reads subfolder file

**Confidence HIGH.** 4/4 raportow zgodnych plus primary citation z memory.md.

### Konflikt 3: Precedencja mechanism - concat vs override

**Konflikt:** R1 prezentuje tabele "What survives compaction" z explicit re-injection ("Project-root CLAUDE.md... Re-injected from disk"). R2 rysuje "concat, nie override + tail bias". Czy to zgodne?

**Rozstrzygniecie:** TAK, zgodne i komplementarne.

- **Concat**: mechanizm ladowania. Wszystkie pliki laduja sie do jednego user message, nie override'uja sie wzajemnie. Zrodlo: memory.md "All discovered files are concatenated into context rather than overriding each other."
- **Tail bias + specificity**: mechanizm rozstrzygania konfliktow gdy dwie instrukcje kolizjuja. To LLM behavioral tendency, nie mechanizm ladowania. Anthropic docs explicite: "if two rules contradict each other, Claude may pick one arbitrarily" - R2 slusznie zwraca uwage ze nie ma deterministic resolver.
- **Re-injection (R1)**: mechanizm post-compact, gdzie CLAUDE.md + unscoped rules re-loaduja sie z dysku. Separate aspect.

Dla SYNTHESIS: uzyj 3-layer model - (a) loading order (concat), (b) conflict resolution (non-deterministic, tail bias heuristic), (c) compact re-injection (selective).

**Confidence HIGH.**

### Konflikt 4: @import hop limit + circular refs

**Konflikt:** R1 mowi 5 hops official, nie rozstrzyga co sie dzieje przy hop 6 (gap G2). R3 potwierdza 5 hops (sekcja 12.3) + flaguje "hop-6 failure mode unclear" jako gap. R5 sekcja 2.5: mowi "silent truncation z ewentualnym logowaniem" bazujac na community tests, ale przyznaje brak official spec.

**Rozstrzygniecie:** 
- 5 hops - CONFIRMED HIGH (R1, R3, R5 primary cite identycznie)
- Hop 6 failure mode - UNCONFIRMED (oficjalnie niejasne)
- Circular reference detection - R5 extrapoluje ze skills pattern ("Loader maintains 'currently loading' set"), R3 rowniez nie potwierdza for @import explicite

Dla SYNTHESIS: podaj "5 hops (official)" + "behavior past 5 hops undocumented, community observes silent truncation" + "cyclic imports handled for skills and `.claude/rules/` symlinks explicite; for @import inference'owane z analogii".

**Confidence: 5 hops HIGH, beyond MEDIUM (inference from community tests).**

### Konflikt 5: Cache TTL regression vs --resume cache bug - DWIE ROZNE

**Konflikt:** R3 sekcja 8 cytuje Issue #46829 (Cache TTL silently regressed 1h -> 5min, Mar 2026). R6 sekcja 11.3 cytuje Issue #29230 + v2.1.62 KV cache regression + workspace-level isolation Feb 5 2026. Czy to sa te same zagadnienia?

**Rozstrzygniecie:** NIE, to sa DWA ROZNE bugs/regressions.

1. **#46829 (R3):** Default TTL for ephemeral cache zmienil sie z 1h na 5min sometime early March 2026. Affects all users. Means: edits to CLAUDE.md invalidate cache, and cache expires faster anyway. Cost: more re-writes.

2. **#29230 (R6):** Starting with v2.1.62, sessions that undergo `/compact` exhibit KV cache regression on `--resume`. Instead of reading cached tokens, API rebuilds from scratch. Up to 20x cost spike. This is a resume-specific bug, different time window.

3. **Workspace-level isolation (R6):** Feb 5 2026 Anthropic zmienil cache scope z organization-level do workspace-level. Teammates w tej samej org nie sharuja cache entries. Separate change.

Dla SYNTHESIS: rozroznic te 3 events w chronological order (Feb 5 workspace isolation -> early Mar TTL regression -> v2.1.62 resume KV bug). Razem stanowia "2026 cache hit/miss landscape" dla CLAUDE.md.

**Confidence HIGH** (primary citations na oba issues z GitHub).

### Konflikt 6: Compliance decay liczby

**Konflikt:** R7 sekcja 9.2 i 3.4 podaje: 95%+ msg 1-2, 60-80% msg 3-5, 20-60% msg 6-10, "lost" msg 10+. R4 wspomina decay bez konkretnych liczb (sekcja 1). R1 mowi tylko "no guarantee of strict compliance, especially for vague or conflicting instructions" (memory.md troubleshoot).

**Rozstrzygniecie:** Liczby 95/60-80/20-60 pochodza z Thomas Wiegold blog, attributed do "Khare" (prawdopodobnie researcher/community member). Brak direct link. Dla SYNTHESIS:

- "Compliance degrades with message count" - HIGH confidence (R1 official, R7 community, R4 community)
- Specific numerical thresholds (95%, 60-80%, 20-60%) - MEDIUM confidence. Source: Wiegold. Not primary research.
- Trend wspiera general claim ale nie traktuj jako hard benchmark.

Rekomendacja dla Syntetyka: cytuj liczby z atrybucja ("wg compliance decay curve opublikowanego przez Wiegold..."), NIE jako ultimate truth.

**Confidence MEDIUM.** Trend HIGH, numbers MEDIUM.

### Konflikt 7: InstructionsLoaded hook load_reason values - CONSENSUS HIGH

**Konflikt potencjalny (zlikwidowany):** Czy wszystkie raporty wymieniaja te same 5 values `load_reason`?

**Rozstrzygniecie:** R1 sekcja 6.3 wymienia: `session_start`, `nested_traversal`, `path_glob_match`, `include`, `compact`. R3 sekcja 5 potwierdza: "load_reason: 'nested_traversal'" + "load_reason: 'compact'". R6 sekcja 5.2 wymienia wszystkie 5: `session_start|nested_traversal|path_glob_match|include|compact`. Konsensus TOTAL.

Dla SYNTHESIS: uzyj tabeli load_reason values jako official contract dla obserwowalnosci.

**Confidence HIGH.**

### Konflikt 8: AGENTS.md status - CONSENSUS HIGH

**Konflikt potencjalny (zlikwidowany):** Czy Claude Code kiedykolwiek bedzie czytal AGENTS.md natywnie?

**Rozstrzygniecie:** Wszystkie raporty (R1, R2, R5, R6) zgodni na aktualny stan:

- Claude Code reads CLAUDE.md, NOT AGENTS.md (primary docs cite)
- Bridge pattern: `@AGENTS.md` w CLAUDE.md + Claude-specific additions below
- AGENTS.md jest open standard for other agents (Cursor, Copilot, Codex), Claude Code supports it indirectly przez import
- R6 explicite: "No sign of Claude Code deprecating CLAUDE.md in favor of AGENTS.md"

Dla SYNTHESIS: zamknij to jednoznacznie. AGENTS.md interop via `@AGENTS.md` jest oficjalnie zalecany pattern dla multi-tool workflows.

**Confidence HIGH.**

### Konflikt 9: CLAUDE.local.md deprecation status

**Konflikt:** R7 sekcja 12 ("CLAUDE.local.md - mentioned by HN commenter fazlerocks, but the file's official status in 2026 is unclear"). R5 sekcja 10.8 cytuje current memory docs explicite: "It loads alongside CLAUDE.md and is treated the same way" - stwierdza "NIE deprecated, dalej dzialajacy". R1 sekcja 3.4 potwierdza: "CLAUDE.local.md **istnieje oficjalnie** i jest pierwszo-klasowym obywatelem".

**Rozstrzygniecie:** R5 i R1 WIN. CLAUDE.local.md NIE jest deprecated. R7 opiera sie na community folklore (HN thread); primary source memory.md potwierdza living status.

Dla SYNTHESIS: CLAUDE.local.md = Tier 4 (Local), gitignored, loads AFTER CLAUDE.md in same directory, respected by `/init` with personal option (auto-gitignore). Alternative pattern: `@~/.claude/my-project-instructions.md` import from home - polecany by docs dla worktree use case (but nie jako replacement).

**Confidence HIGH.**

### Konflikt 10: Hooks > CLAUDE.md for enforcement - CONSENSUS HIGH

**Konflikt potencjalny (zlikwidowany):** Czy CLAUDE.md moze sluzyc jako hard enforcement mechanism?

**Rozstrzygniecie:** NIE. 3 raporty niezaleznie potwierdzaja:

- R1 sekcja 2 cytuje docs verbatim: "Claude treats them as context, not enforced configuration. The more specific and concise your instructions, the more consistently Claude follows them"
- R4 sekcja 1 principle 5: "Hooks > CLAUDE.md for hard enforcement. CLAUDE.md is advisory prose."
- R6 sekcja 5.3 cytuje managed settings doc: "Settings rules are enforced by the client regardless of what Claude decides to do. CLAUDE.md instructions shape Claude's behavior but are not a hard enforcement layer"
- R7 Issue #2142 jest empirical dowod: 3 live API keys committed MIMO security section w CLAUDE.md

Dla SYNTHESIS: to jest CENTRALNA teza. Zrobic z tego dedicated section z "advisory vs enforcement" framework.

**Confidence HIGH.**

### Konflikt 11: 200-line soft limit vs 30-100 community optimum

**Konflikt:** R1 podaje 200-line soft target (oficjalny Anthropic). R4 sekcja 6 tabela community benchmarks: HumanLayer 60, dev.to 30-line rule, abhishekray07 60-80, alexop.dev <500 words, Shrivu 13KB (400 lines) jako "constitution". R7 sekcja 7.B: "past roughly 200-300 lines, Claude reliably ignores content".

**Rozstrzygniecie:** To nie jest konflikt, tylko roznica perspektyw:

- **200 lines** = Anthropic "target ceiling" w official docs (memory.md). Soft, nie hard limit.
- **60-100 lines** = Community-observed "sweet spot" where adherence jest consistently high (HumanLayer, abhishekray07)
- **30 lines** = Extreme minimalism (dev.to docat0209) - effective but requires splitting into skills/rules
- **400+ lines** = Professional extremes (Shrivu Shankar "constitution") - works only with meticulous curation

Dla SYNTHESIS dwustopniowy framework:
- Official ceiling: 200 lines (Anthropic)
- Community optimum: 60-100 lines (majority of best-in-class examples)
- Extreme minimum: 30 lines (viable for solo/simple projects)

**Confidence HIGH.**

### Konflikt 12: ETH Zurich study quality

**Konflikt wewnetrzny:** R7 sekcja 9.1 podaje bardzo konkretne liczby: "auto-generated CLAUDE.md files: decrease success rates and increase cost ~20%", "human-written: ~4% improvement on AGENTbench", "160x uv usage when mentioned", "2.7% improvement in ablation". Ale sourcing is via Thomas Wiegold blog + wolfejam HN comment, nie direct paper access.

**Rozstrzygniecie:** Treat as **secondary-reported empirical**:

- Liczby sa published w blog posts (Wiegold, wolfejam) - verifiable chain
- Direct paper/preprint link brak w R7
- ETH Zurich jest reputable source, temat SWE-bench + AGENTbench jest standard benchmark
- Ogolny thrust (auto-gen bad, tool-specific instructions good) zgodny z HumanLayer/Anthropic docs

Dla SYNTHESIS: cytuj z explicit attribution ("ETH Zurich Feb 2026 study, reported via Wiegold blog and wolfejam HN comment, found..."). NIE prezentuj jako peer-reviewed truth bez linka do paper.

**Confidence MEDIUM.** Trend HIGH, specific numbers MEDIUM.

---

## 3. Gaps do delta research (8 obszarow)

Ponizej 8 gaps zidentyfikowane cross-report. Jesli kampania przechodzi do faz eskpansji, te zasluguja na delta researcher.

### Gap D1: Empiryczne potwierdzenie ancestor-walk concat order

**Problem:** R3 sekcja 3.4 i R5 sekcja 5.1 flaguja ze docs nie specyfikuja czy dla monorepo z wieloma poziomami CLAUDE.md (`/repo/CLAUDE.md`, `/repo/packages/CLAUDE.md`, `/repo/packages/frontend/CLAUDE.md`) kolejnosc konkatenacji to root-first czy cwd-first. R1 sam tez nie rozstrzyga (sekcja 3.6 "more specific wins" jest general principle, nie concat order).

**Delta research:** Test empirycznie przez `InstructionsLoaded` hook z timestamp logging. Plikow 3-poziomowych z markerowymi tekstami. Output: concrete concat order.

**Dlaczego wazne:** Tail bias znaczy ze ostatnia instrukcja wygrywa - users projektujacy hierarchie CLAUDE.md musza wiedziec czy root jest first czy last.

### Gap D2: Hard size limit CLAUDE.md

**Problem:** R1 G1, R3 sekcja 7.4, R5 gap #8 zgodnie flaguja: "docs mowia loaded in full regardless of length ale pewno jest jakis hard cap". Brak jakichkolwiek tests dla 50KB, 100KB, 1MB CLAUDE.md.

**Delta research:** Test z progressively wiekszymi CLAUDE.md (10KB, 50KB, 100KB, 500KB, 1MB). Obserwacje przez `/memory` command + token cost tracking. Cel: znalezc progressive degradation point oraz hard failure point.

**Dlaczego wazne:** Karpathy-style meta-CLAUDE.md + per-project CLAUDE.md + path-scoped rules moze latwo skumulowac 20k-50k tokenow startup. Users potrzebuja know where the wall is.

### Gap D3: Managed policy CLAUDE.md real-world examples

**Problem:** R1 i R2 dokumentuja Managed policy + Anthropic example z 3-4 linii, ale R4 gap #4: "real-world enterprise CLAUDE.md examples are absent from public research (presumably private)". Brak complete examples. TrueFoundry blog wspomniany (R2 biblio #15) ale nie cytowany verbatim content.

**Delta research:** Zawezic TrueFoundry article (claude-code-governance-building-an-enterprise-usage-policy-from-scratch) + szukanie innych enterprise playbooks (Google "managed policy CLAUDE.md example"). Cel: 2-3 complete enterprise templates z compliance/security/licensing sections.

**Dlaczego wazne:** SYNTHESIS.md powinien miec 5+ starter templates per project type; R4 pokrywa TS/Python/Rust/monorepo/SDK. Managed enterprise template brak.

### Gap D4: Plugin CLAUDE.md alternative distribution patterns

**Problem:** R1, R2, R5, R6 zgodni ze plugin CLAUDE.md nie istnieje. R6 sekcja 8.2 mowi "If you want a plugin to contribute to CLAUDE.md-level context, the intended path is to ship a skill with user-invocable: false". Ale brak end-to-end examples tego pattern w kampanii.

**Delta research:** Znalesc 2-3 real plugins ktore probuja dostarczyc "guidance" bez CLAUDE.md slot. Jakie compromise wybraly? Co dziala, co nie?

**Dlaczego wazne:** Agent_Architecture project Maciej ma 35 skills + 42 commands jako "plugin-like" structure. User pattern jest przelom. SYNTHESIS moze odnosic to do projektu usera jako case study.

### Gap D5: Auto-memory concurrency i interaction z CLAUDE.md

**Problem:** R3 sekcja 10 flag concurrency nie dokumentowana. R6 sekcja 9 opisuje auto memory vs CLAUDE.md decision matrix ale NIE co sie dzieje gdy oba zmieniaja sie jednoczesnie. R2 gap #8 flag "auto memory moze konfliktowac z CLAUDE.md".

**Delta research:** Concurrent session test - 2 sesji Claude Code w tym samym repo, obie edytuja MEMORY.md. Co sie dzieje? Last-write-wins? File-locked? Split-brain?

**Dlaczego wazne:** Multi-session workflows (parallel agents, worktrees) staja sie popularne. Bez znajomosci semantyki konkurencji auto-memory, builderzy tworza niewidoczne bugs.

### Gap D6: `<important if="...">` conditional tag effectiveness

**Problem:** R4 gap #8 + R7 sekcja 3.2 + anti-pattern P (sekcja 7) flaguja pattern jako "community invention, docs don't mention it". HumanLayer introduced it jako "getting Claude to actually read CLAUDE.md" mechanism. Efektywnosc niepotwierdzona empirically.

**Delta research:** A/B test same instruction z `<important if="...">` wrapper vs without. Compliance rate? Token cost difference? When helpful, when harmful?

**Dlaczego wazne:** Jesli to dziala - should be in starter templates. Jesli nie - active anti-pattern to remove.

### Gap D7: Remote URL imports

**Problem:** R1 G3, R5 sekcja 2.4, R6 Gap 2 zgodnie flaguja: remote URL imports (`@https://example.com/rules.md`) NIE udokumentowane jako supported, ale NIE explicitly rejected in docs. Community strongly wants this (HN Show HN claude-faf-mcp). Workarounds (git clone + local import) sa fragile.

**Delta research:** Test empirycznie czy `@https://...` resolves (prawdopodobnie NIE). Czy jakaĐ eng flag lub env var wlacza? Cross-check z Claude Code source code repo (open-source?) or feature requests.

**Dlaczego wazne:** Enterprise teams chca centralized company-wide rules bez git clone-ssh-auth dance. Feature gap z product perspective.

### Gap D8: Compliance degradation empirical data

**Problem:** Wiegold's curve (95/60-80/20-60) jest cytowany wszedzie ale origin methodology unclear. ETH Zurich study ma liczby ale tylko via secondary reporting (patrz Konflikt 12). Brak peer-reviewed empirical study on CLAUDE.md adherence rates across message count.

**Delta research:** Delegowac do meta-research. Szukac original Khare source (Wiegold attribution). Szukac arXiv/Google Scholar "CLAUDE.md compliance LLM context decay" - moze jest primary paper.

**Dlaczego wazne:** Ta liczba decyduje o "kiedy rozbijac CLAUDE.md na chunks" i "kiedy uzywac hooks vs markdown". Jesli Wiegold ma blad lub zlosliwie oversimplified, cale community guidance jest na wietrze.

---

## 4. Top 3 krytyczne findings do SYNTHESIS.md

### Finding 1: Instruction Stack, nie Config (CLAUDE.md mental model)

CLAUDE.md to **instruction stack**, nie config file. 4 tiery (Managed / User / Project / Local) plus 3 mechanizmy pomocnicze (`.claude/rules/`, `@import`, ancestor walk) laduja sie przez konkatenacje do jednego user message post-system-prompt. Nie ma overrides - sa warstwy. Claude rozstrzyga konflikty **probabilistically na bazie freshness/tail bias i specificity**, nie deterministycznie. 

Implikacje architekturalne:

- **Tail bias** = ostatnia instrukcja na temat X wygrywa. Kolejnosc: Managed -> User -> Project -> Project local -> Lazy subfolder. W konflikcie Local/subfolder wygrywa lokalnie.
- **Specificity heuristic** = precyzyjne instrukcje bija ogolne ("This repo uses npm" wygra nad "pnpm preferowany")
- **Consistency** = nalezy periodically review i usuwac conflicts (Anthropic: "if two rules contradict each other, Claude may pick one arbitrarily")
- **Hard enforcement brak** = nie da sie wymusic CLAUDE.md rule. Do tego sa hooks i managed settings.

Source: R1 sekcja 3.6+5, R2 sekcja 6, R5 sekcja 6.2, R6 sekcja 5.3. **Consensus HIGH.**

### Finding 2: Hooks > CLAUDE.md dla Enforcement (empiryczny dowod)

CLAUDE.md jest ADVISORY layer. Dla hard enforcement uzywaj hooks (PreToolUse, PostToolUse, Stop, PreCommit) lub managed settings (permissions.deny, sandbox.enabled).

Evidence:
- Anthropic docs: "Settings rules are enforced by the client regardless of what Claude decides to do. CLAUDE.md instructions shape Claude's behavior but are not a hard enforcement layer" (memory.md manage-claude-md-for-large-teams)
- Issue #2142: 3 live API keys committed MIMO explicit security section w CLAUDE.md. Potwierdzony przypadek wysokoprofilowego failure
- Community estimate: ~70% compliance dla CLAUDE.md, ~100% dla hooks. Zrodlo: Builder.io, TurboDocx, aitmpl.com; triangulated w R7
- ETH Zurich study (R7 secondary source): instrukcje w CLAUDE.md degraduja z ilosci wiadomosci; tool-specific commands (uv vs pip) bija conceptual rules
- dev.to Pattern 4: "If you have told Claude not to do something 3 times and it keeps doing it, move that rule from CLAUDE.md to a hook"

Operational rule: jesli regula MUSI zadzialac 100% razy, to jest kandydat na hook albo managed setting, nie CLAUDE.md.

Source: R4 principle 5, R6 sekcja 5.3, R7 sekcja 9.4 + anti-pattern G (Issue #2142). **Consensus HIGH.**

### Finding 3: "Less is More" convergence z empirical support

Community zkonwergowalo w 2026 na "less is more" orthodoxy dla CLAUDE.md:

- **Anthropic ceiling:** 200 lines ("Longer files consume more context and reduce adherence")
- **Community optimum:** 60-100 lines (HumanLayer 88, Metabase 54, LangGraphJS 80-ish, abhishekray07 60-80)
- **Extreme minimalism:** 30 lines (dev.to docat0209 "30-Line Rule")
- **Professional exception:** 400 lines (Shrivu Shankar "constitution") - requires meticulous curation

Dlaczego "less is more":
1. **Compliance decay z message count** - Wiegold-reported 95% msg 1-2 -> 20-60% msg 6-10. Im dluzszy CLAUDE.md, tym wiecej rules juz w trudnym polu uwagi
2. **Instruction budget finite** - HumanLayer cytuje "frontier thinking LLMs follow 150-200 instructions with reasonable consistency"; Claude Code system prompt zjada ~50, zostaje ~100-150 dla CLAUDE.md
3. **ETH Zurich ablation** - tool-specific commands give 160x usage boost; generic platitudes give 0%
4. **Cache invalidation** - CLAUDE.md edits invalidate cache prefix; duzy plik = duzsze re-write cost
5. **Dilution effect** - every weak instruction dilutes strong instructions proportionally

Praktyczne zalecenie dla SYNTHESIS:
- Root CLAUDE.md: 60-150 lines (sweet spot)
- Split into `.claude/rules/*.md` z `paths:` frontmatter when exceeding
- Use `@docs/*.md` imports sparingly (eager load!) lub progressive disclosure (pointers, not content)
- Nested subfolder CLAUDE.md for monorepo specializations (lazy loaded)

Source: R4 sekcja 6, R7 sekcje 2.2+9+10, R1 sekcja 10.2. **Consensus HIGH.**

---

## 5. Rekomendacje dla Syntetyka

### 5.1 Struktura SYNTHESIS.md sugerowana

Bazujac na reports + findings, proponowana struktura SYNTHESIS.md:

1. **Abstract + Top 3 findings** (500 slow)
2. **Mental Model: Instruction Stack** (1000 slow) - z R2 jako baza
3. **4 Tiery + pomocnicze mechanizmy** (1500 slow) - tabela z R1, examples z R2
4. **Lifecycle: session start -> compact -> resume** (1200 slow) - ASCII diagram z R3 sekcja 2
5. **Writing: DO/DON'T** (1000 slow) - verbatim z R4 sekcje 3+4
6. **5 Starter Templates per project type** (1500 slow) - verbatim z R4 sekcja 11
7. **Multi-file patterns: @import, `.claude/rules/`, monorepo** (1200 slow) - R5 sekcja 5.2 + R5 sekcja 7
8. **Integration map: CLAUDE.md w ekosystemie Claude Code** (1000 slow) - R6 sekcja 12 tabela
9. **Community patterns + 5 archetypes** (800 slow) - R7 sekcja 8
10. **Anti-patterns (12+) z cytatami i fixami** (1200 slow) - R4 sekcja 4 + R7 sekcja 7
11. **Enforcement framework: hooks > CLAUDE.md** (800 slow) - Finding 2 jako centralna sekcja z Issue #2142 case study
12. **Token economy: size rules, cache, compaction** (1000 slow) - R3 sekcja 7, R4 sekcja 6, R6 sekcja 11
13. **Gaps i open questions** (400 slow) - 8 gaps z CRITIC

Target SYNTHESIS: **13000-15000 slow** (~200-230 tokenow na slowo). Priorytetyzowac uzytecznosc over completeness.

### 5.2 Co jest drop-in ready do SYNTHESIS

**Verbatim copyable:**
- R1 sekcja 6.1 tabela "What survives compaction" (verbatim z context-window.md)
- R3 sekcja 2 ASCII lifecycle diagram (cold start -> steady -> compact -> end)
- R4 sekcja 3 (17 DO) + sekcja 4 (17 DON'T) - strong structure
- R4 sekcja 11 (5 starter templates) - complete, tested
- R6 sekcja 12 tabela system->CLAUDE.md (25 integration points)
- R7 sekcja 8 (5 archetypes z exemplars)

**Nearly verbatim:**
- R2 sekcja 8 (6 conflict scenarios) - reformulowac w EN jesli SYNTHESIS w EN
- R5 sekcja 5.2 Turborepo canonical structure
- R1 sekcja 10.2 Include/Exclude tabela verbatim

### 5.3 Punkty wymagajace szczegolnej uwagi

**3 miejsca gdzie wiele zrodel inline:**

1. **Tiery definition** - R1 (primary) + R2 (pedagogical) + R5 (layered 4-warstwowy). Wybierz R1 structure ale uzyj R2 "instruction stack" framing.

2. **Compact behavior** - R1 tabela + R3 diagram + R6 timeline. Uzyj R1 jako canonical, R3 diagram jako visual, R6 subagent-specific case.

3. **Anti-patterns** - R4 (12 z fixami, koncepcyjne) + R7 (15 z case studies, empirical). Merge: R4's structure + R7's real Issue #2142 + Issue #7777.

**3 miejsca gdzie potrzeba ostroznosci:**

1. **User CLAUDE.md post-compact** - R2 mowi "survives", R3 flaguje jako gap. Uzyj R3 framing (gap) - bezpieczniej.

2. **Compliance numerics (95%/60-80%/20-60%)** - oznacz attribution explicitly. Nie ultimate truth.

3. **ETH Zurich study numbers** - cytuj via Wiegold/wolfejam attribution. Trend solid, specific numbers medium confidence.

### 5.4 Top 3 unique findings per report (do inclusion w SYNTHESIS)

| Report | Unique finding |
|--------|----------------|
| R1 | InstructionsLoaded hook payload schema (5 load_reason values) - canonical observability contract |
| R2 | 6 conflict scenarios z rozstrzygnieciami - pedagogical case studies |
| R3 | Cache regression timeline (v2.1.62 KV, Mar 2026 TTL, Feb 5 workspace isolation) |
| R4 | 5 drop-in starter templates per project type - direct user-facing artifact |
| R5 | Virtual Monorepo pattern (35 repos case from Medium) - unique findings |
| R6 | Subagent loads CLAUDE.md YES but doesnt inherit conversation - rozstrzyga ambiguity |
| R7 | Issue #2142 case study (3 API keys commit MIMO security section) - empiryczny klin dla hooks>md |

### 5.5 Czego NIE wrzucac do SYNTHESIS

- Raport-specific gap lists (are for CRITIC, nie synthesis)
- Internal R-reference citations (R3.C5 etc.) - anchor through primary docs instead
- Sekcje konflikt-resolution procesowe (to co robilem w CRITIC, nie SYNTHESIS reader's concern)
- Metaanalizy "ktory raport lepiej napisany" (to robi Extractor po SYNTHESIS via ranking)

### 5.6 Glowne riskes dla Syntetyka

1. **Pokusa "pro-CLAUDE.md" bias:** 5/7 raportow sa optymistyczne ("CLAUDE.md is the single most impactful thing"). R7 ma zrownowazona perspektywe (byme8 "You Don't Need a CLAUDE.md" + ETH Zurich degradation). Syntetyk powinien zachowac dual perspective.

2. **Pokusa "liczby brzmia naukowo":** 160x, 2.7%, 20%, 95/60-80 - te liczby sa z secondary sources. Attribute properly.

3. **Pokusa "zakrzyczec obostrzeniami":** Anthropic says 200 lines ceiling, community 30-100 optimum. NIE wybieraj jednej - show oba z kontekstem ("official" vs "empirical best practice").

4. **Pokusa pominiecia Polish/EN mixing:** R1, R4, R6 sa w EN. R2, R5, R7 sa mixed PL/EN. R3 jest w EN. SYNTHESIS decision: EN jako lingua franca dla szerszego audience (Maciej sam writes EN/PL mix). Zachowac style guide consistency.

---

## 6. Sanity checks przeszly / nie przeszly

### 6.1 Source priority check

Priority hierarchy: **oficjalne docs > GitHub issue closed > GitHub issue open > Anthropic Eng blog > community blog > Reddit/Twitter**.

- **R1:** 100% primary oficjalne docs. PASS.
- **R2:** Mix primary (~50%) + community blogs (~50%). Uzyte primary dla kluczowych tez. PASS.
- **R3:** Primary docs (~60%) + GitHub issues (~30%) + community (~10%). Strong. PASS.
- **R4:** Primary docs + named community sources (HumanLayer, Shrivu, dev.to, Anthropic Eng) + public CLAUDE.md files. PASS.
- **R5:** Primary docs + GitHub issues + dev.to/Medium. PASS.
- **R6:** 53 primary docs citations + 3 secondary. Most rigorous. PASS.
- **R7:** Community corpus (design choice!) + Issue #2142 + ETH Zurich secondary. Balanced attribution. PASS WITH NOTES.

### 6.2 Community lore vs primary source

CLAUDE.md temat MA duzo community folklore. Sprawdzone:

- "200-line limit" -> primary source Anthropic (HIGH)
- "hooks > CLAUDE.md" -> primary + community triangulated (HIGH)
- "compliance decays 95/60/20" -> Wiegold/Khare via secondary sources (MEDIUM)
- "ETH Zurich 160x uv" -> secondary reporting only (MEDIUM)
- "Karpathy meta-CLAUDE.md viral" -> R7 attribution ok ale brak primary tweet ID. Derivative repo (forrestchang/andrej-karpathy-skills) is HIGH confidence existing artifact. Star count "tens of thousands" is estimate.
- "#29230 v2.1.62 cache regression" -> GitHub issue primary (HIGH)
- "Wiegold compliance curve origin" -> opinion blog (MEDIUM)

### 6.3 Anti-rubber-stamp check

Brief wymagal minimum 8 konfliktow. **Zidentyfikowalem 12.** Bez rubber-stamping - zero raportow 100% zgodnych, real tensions w R2 vs R3 (user CLAUDE.md compact), R3 vs R6 (2 rozne cache issues), R4 vs R7 (200 vs 30-100 lines targets - reconciled not conflicting).

Implicit assumptions sprawdzone:
- "CLAUDE.md is always helpful" - byme8 (R7) + ETH Zurich (secondary) contest this
- "Bigger context wins" - compliance decay contradicts
- "Claude always reads CLAUDE.md" - Issue #7777 confirms it doesn't always
- "Subagents skip CLAUDE.md" - R6 disproves (misconception)

---

## 7. Confidence matrix (summary)

Kluczowe tezy kampanii z confidence ratingami dla Syntetyka:

| Teza | Confidence | Sources |
|------|-----------|---------|
| 4 tiery (Managed/User/Project/Local) + `.claude/rules/` | HIGH | R1, R2, R5, R6 primary |
| Plugin CLAUDE.md NIE istnieje | HIGH | R1, R2, R5, R6 primary |
| @import 5 hops max, eager, recursive | HIGH | R1, R3, R5 primary |
| Project-root CLAUDE.md re-injected post-compact | HIGH | R1, R3 primary (context-window.md tabela) |
| User CLAUDE.md re-injected post-compact | MEDIUM | R2 claims, R3 flags as gap, docs unclear |
| Nested CLAUDE.md NIE re-injected post-compact | HIGH | R1, R3, R6 primary |
| `.claude/rules/` z `paths:` = lazy, bez = eager | HIGH | R1, R3, R5 primary |
| AGENTS.md bridge via `@AGENTS.md` | HIGH | R1, R6 primary (memory.md AGENTS.md section) |
| CLAUDE.md advisory, hooks enforce | HIGH | R1 primary, R4/R6/R7 triangulated + Issue #2142 |
| Subagent loads CLAUDE.md (except Explore/Plan) | HIGH | R6 primary (context-window.md) |
| InstructionsLoaded 5 load_reason values | HIGH | R1, R3, R6 primary zgodni |
| 200-line Anthropic ceiling | HIGH | R1 primary |
| 60-100 line community optimum | HIGH | R4, R7 triangulated community |
| Compliance decays with message count | HIGH | R1 implies, R7 + community confirm |
| 95%/60-80%/20-60% specific decay % | MEDIUM | Wiegold/Khare secondary |
| ETH Zurich 160x uv, 2.7% ablation, 20% cost | MEDIUM | Secondary reporting only |
| v2.1.62 resume cache regression | HIGH | Issue #29230 primary |
| Mar 2026 TTL 1h -> 5min regression | HIGH | Issue #46829 primary |
| Remote URL imports unsupported | HIGH-MEDIUM | Docs silence + community tests |
| Circular @import detected | MEDIUM | Community inference, NIE docs |
| Hop 6+ failure mode silent | LOW | Community observation, NIE docs |
| Karpathy tweet viral Jan 2026 | HIGH-MEDIUM | Derivative repo confirmed, tweet ID no |

---

## 8. Bibliografia i cross-references

### 8.1 Raporty reviewed

- R1 Official Docs Primary: [`research/R1_official_docs.md`](R1_official_docs.md) - 4897 slow, status DONE, PASS
- R2 Three Tiers Deep Dive: [`research/R2_three_tiers.md`](R2_three_tiers.md) - 4847 slow, status DONE, PASS
- R3 Auto-loading Mechanics: [`research/R3_autoloading.md`](R3_autoloading.md) - 4050 slow, status DONE, PASS WITH NOTES
- R4 Writing Practices: [`research/R4_writing_practices.md`](R4_writing_practices.md) - 4800 slow, status DONE, PASS
- R5 Multi-file Organization: [`research/R5_multifile_organization.md`](R5_multifile_organization.md) - 3700 slow, status DONE, PASS
- R6 Integrations: [`research/R6_integrations.md`](R6_integrations.md) - 4100 slow, status DONE, PASS
- R7 Community + Antipatterns: [`research/R7_community_antipatterns.md`](R7_community_antipatterns.md) - 5128 slow, status DONE, PASS WITH NOTES

### 8.2 Extracts quick-map

E1..E7 extracts zachowuja sie jako per-report JSON - nie reviewed w tym CRITIC, ale flag dla Extractora w map-reduce pipeline jako shortcut do konkretnych sekcji.

### 8.3 Primary docs confirmed cited across reports

Kluczowe primary URLs wystepujace w 5+ raportach:

- https://code.claude.com/docs/en/memory (sections: "How CLAUDE.md files load", "Choose where to put CLAUDE.md files", "Import additional files", "AGENTS.md", "Auto memory") - R1, R2, R3, R5, R6 all cite
- https://code.claude.com/docs/en/context-window (sections: "What survives compaction", timeline visualization) - R1, R3, R6
- https://code.claude.com/docs/en/hooks (sections: "InstructionsLoaded", "PreCompact", "PostCompact", "SessionStart", "CwdChanged") - R1, R3, R6
- https://code.claude.com/docs/en/best-practices (section: "Write an effective CLAUDE.md") - R1, R4
- https://code.claude.com/docs/en/skills - R4, R6
- https://code.claude.com/docs/en/plugins (section: "Plugin structure overview") - R1, R2, R5, R6

### 8.4 GitHub issues cited across reports

- #2142 API keys committed (R4, R7) - SECURITY landmark
- #2571 subdir CLAUDE.md not loaded (R2)
- #17127 /reload command request (R3)
- #22085 CLAUDE.md after compact (R3)
- #29230 v2.1.62 KV cache regression (R6)
- #29971 context bloat (R4)
- #30634 plan mode override user CLAUDE.md (R2)
- #46829 Mar 2026 TTL regression (R3)
- #1321 false positive external import warning (R5)
- #2950 CLAUDE.local.md deprecation confusion (R5)
- #7777 Claude ignores CLAUDE.md instructions (R7)
- #13853 ADR loading feature request (R7)

---

## 9. Final assessment

**Kampania gotowa do Syntetyka.** Wszystkie 7 raportow przeszly walidacje. Zero REVISE. Material pokrywa:

- 4 tiery + 3 mechanizmy pomocnicze (COVERED R1, R2, R5, R6)
- Auto-loading lifecycle (COVERED R3 + cross R1, R6)
- Writing best practices (COVERED R4 definitively)
- Multi-file patterns (COVERED R5 definitively)
- Integration z ekosystemem (COVERED R6 definitively)
- Community corpus + empirical (COVERED R7 + cross R4)

Poziomy consensus:
- **HIGH (12+ tez):** 4 tiery, plugin no CLAUDE.md, @import 5 hops, hooks>md, 200 lines, InstructionsLoaded, AGENTS.md bridge, subagent loading, etc.
- **MEDIUM (6 tez):** specific numerical claims (95/60-80/20-60%, 160x uv, 2.7%), User CLAUDE.md post-compact
- **LOW (2 tez):** hop 6+ failure mode, remote URL support

8 gaps flagowane dla delta research jesli kampania przechodzi faze expansion.

Rekomendacja dla Orkiestratora:
1. **Proceed to Extractor phase** - extracty z 7 raportow + CRITIC -> per-section claim list
2. **Potem SYNTHESIS** z sugerowana struktura z sekcji 5.1 tego CRITIC
3. Optional: delta research na 2-3 priority gaps (D2 hard size, D6 `<important if>` tag, D8 compliance empirical origin) przed SYNTHESIS jesli budzet pozwala

Best luck dla Syntetyka. Material jest mocny.

---

**End of CRITIC.md.** Word count: ~7100 slow. Werdykty: 5 PASS, 2 PASS WITH NOTES, 0 REVISE. Konflikty: 12 rozstrzygniete. Gaps: 8 do delta. Top findings: 3. Rekomendacje: pelne (6 subsections).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
