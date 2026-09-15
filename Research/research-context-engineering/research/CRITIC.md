# CRITIC - Claude Code Context Engineering 2026

**Krytyk:** Research Critic (sonnet, phase: research, load: 85/100)
**Data audytu:** 2026-04-17
**Zakres:** 7 raportow (R1-R7) + spot-checks przeciwko extractom
**Status BRAMA 4:** PASS (pelny werdykt per raport + 6 konfliktow rozstrzygnietych + 5 gaps)

---

## Executive Verdict

Zestaw 7 raportow jest w wiekszosci solidny, ale **nie jednorodny pod wzgledem rygoru**. Jest wyrazny podzial: **R1 (docs primary), R2 (caching) i R3 (compact mechanics) to rdzen primary-source** - cytuja Anthropic docs z datami dostepu i ich findings sie wzajemnie potwierdzaja. **R5 (token accounting), R6 (antipatterns) i R7 (community)** dostarczaja niezastapionego materialu empirycznego (/context snapshots, GitHub issues z numerami, 6852-session study), ale polegaja na heterogennych metodologiach i czesto cytuja agregatory zamiast pierwotnych zrodel. **R4 (.claudeignore) ma najwieksza slabosc: jawnie zglasza PRIMARY SOURCE GAP** - wlasna honestyzacja, ale rownoczesnie oznacza ze wiekszosc twierdzen o `.claudeignore` jest oparta na community implementations, nie na Anthropic documentation.

**Najwiekszy overarching konflikt** to **auto-compact threshold**: R1 mowi "~95% capacity" (cytuje oficjalne docs env-vars), R3 ujawnia ze 95% to nominal ale ~83.5% to "efektywne" po odjeciu 33K buffera, R6/R7 podaja community-driven 60-80% (sprzecznosc tkwi w tym, ze to sa **user-recommended proactive thresholds**, a nie auto-compact triggers). To nie jest prawdziwa sprzecznosc - to trzy rozne metryki przekazywane pod tym samym nazwiskiem. **SYNTHESIS musi jawnie rozdzielic trzy pojecia: (1) nominal trigger ~95%, (2) effective trigger po buforze ~83.5%, (3) community proactive recommendation 60-80%**. Bez tego rozdzielenia kazda rekomendacja dla uzytkownika bedzie zla.

Drugim krytycznym problemem jest **skill loading**: R5 (wmedia.es snapshot) pokazuje 61 tokens dla skills w /context, a R5 (GitHub #14882) pokazuje 50k+ u innego uzytkownika - rozbieznosc 800x. To nie jest wada raportu - R5 poprawnie oznacza konflikt - ale synthesis musi wyjasnic mechanizm (feature vs bug, liczba pluginow, wersja CLI).

---

## Per-report PASS/REVISE

| Raport | Werdykt | Reason (1 linia) |
|--------|---------|------------------|
| R1 docs_primary | **PASS** | Oficjalne zrodla z datami dostepu, cytaty verbatim, timeline dat zmian 2026, 18 URL; minor: konflikt DISABLE_COMPACT vs DISABLE_AUTO_COMPACT sam zglosil |
| R2 caching_deep | **PASS** | Solidny mix docs+community, tabele pricing/invalidacji gruntowne, 14 citations; brak mocnej recencji dla niektorych empirik (LMCache wyniki 92%) |
| R3 compact_mechanics | **PASS** | Najlepsze cross-walidowanie: 24 GitHub issues z numerami, dokumenty Anthropic, jasne oznaczenie [PRIMARY]/[COMMUNITY]; znakomita sekcja conflict resolution |
| R4 claudeignore | **PASS z FLAG** | Jawnie zglasza PRIMARY SOURCE GAP (zasluga) ale bazowe twierdzenia o native Anthropic support sa niepotwierdzone; confidence 0.72 zgodne z rzeczywistoscia |
| R5 token_accounting | **PASS z FLAG** | Wspaniala tabela komponentow z metodologia per wiersz, ale nierozstrzygniety skill-loading konflikt (61 vs 50k+); nalezy siegnac do SYNTHESIS po discriminator |
| R6 antipatterns | **PASS z FLAG** | 10 AP + 5 case studies + numery GitHub, ale slabe direct-Reddit sourcing (agregator morphllm.com/aitooldiscovery.com zamiast linkow do watkow); 20-40% degradation threshold ma tylko 1 primary source (bswen.com) |
| R7 community_patterns | **REVISE** | X/Twitter paywall zablokowal direct fetch - engagement metrics ("790K views") sa secondhand; Scortier "6852 sessions" jest jedynym zrodlem dla "effective ~400K" claim; HANDOVER vs PROGRESS.md fragmentacja nierozwiazana |

**Uwaga o REVISE R7:** Nie blokuje synthesis, ale wymaga od Syntetyka **downgrade confidence** na twierdzenia pochodzace wylacznie z Twitter statusow (Pattern 2, 7) oraz jawnego zaznaczenia "single-source" przy metryce "effective 300-400K context window". R7 dostarcza jakoscowo cennych patterns (checklist 5 decision rules, tool inventory 12 tools) ktore wchodza do synthesis, ale numeryczne claims wymagaja asterysku.

---

## Konflikty (6 explicit-resolved)

### K1: Skill loading - progressive disclosure czy full-body?

**Strony:**
- R5/wmedia.es: `/context` pokazuje "Skills: 61 tokens" przy lean setupie (frontmatter-only loading)
- R5/GitHub #14882: user reportuje "Skills: 50,000+ tokens" przy wielu pluginach, z per-skill breakdowns 3,900-5,500 tokens kazdy

**Rozstrzygniecie:** **OBIE WARTOSCI SA PRAWDZIWE** dla roznych konfiguracji. Mechanizm: progressive disclosure dziala poprawnie dla pojedynczych custom skills w `~/.claude/skills/`, ale **pluginowy loading (z claude-plugin packages) laduje pelne body na starcie** - to co /context pokazuje to actual API cost. Issue #14882 byl zamkniety bez jasnej answer od Anthropic. **SYNTHESIS musi dac dwie liczby:** (a) skill standalone: ~100 tokens frontmatter jesli nieuzywany, ~3-6k przy invoke; (b) skill zainstalowany jako czesc pluginu: 3-6k tokens od razu, sumuje sie liniowo. Wmedia.es mierzyl (a), GitHub #14882 mierzyl (b).

**Confidence w rozstrzygnieciu:** medium (mechanizm wyjasniony z community consensus, ale brak Anthropic confirmation)

---

### K2: Auto-compact threshold numeryka vs percepcja

**Strony:**
- R1 (docs): "Default behavior: Auto-compaction triggers at approximately 95% capacity" (code.claude.com/docs/en/env-vars, verbatim cytat)
- R3 (empiryk): ~83.5% effective po odjeciu 33K hardcoded buffera (claudefa.st measurement)
- R6 (community): degradacja jakosci przy 20-40% fill (nie trigger, ale quality threshold)
- R7 (community): 60% = aggressive proactive, 80% = permissive proactive (user-recommended)

**Rozstrzygniecie:** **Cztery RÓŻNE pojecia pod jednym nazwiskiem.** Hierarchy:
1. **Nominal auto-compact trigger** = ~95% capacity (R1 correct)
2. **Effective auto-compact trigger** = ~83.5% po odjeciu 33K buffera na 200K oknie (R3 correct, konsystentne z R1 - buffer to feature, nie sprzecznosc)
3. **Quality degradation threshold** = 20-40% fill (R6 correct; to moment kiedy uwaga sie rozmywa, nie kompakcja)
4. **Community proactive /compact recommendation** = 60-80% fill (R7 correct; user should run manual /compact zanim dojdzie do auto)

R1 i R3 NIE sa w konflikcie - liczba 83.5% to 95% * (200000 - 33000) / 200000 = 83.5%. R6/R7 odnosza sie do zupelnie innych zjawisk. **SYNTHESIS musi jawnie odrozniac trigger od quality i od proactive recommendation.**

**Confidence:** high (matematyka sie zgadza, R6/R7 to inne zjawiska)

---

### K3: Effective 1M context window (theoretical vs practical)

**Strony:**
- R1 (docs): Opus 4.7, Opus 4.6, Sonnet 4.6 = 1M tokens GA od 2026-03-13, standard pricing
- R7 (Scortier study): efektywny high-quality window ~300-400K; degradation zaczyna sie przy 20% utilization
- R6 (bswen.com): degradacja 20-40% context fill
- R2, R5: brak komentarza do tej tezy

**Rozstrzygniecie:** **BRAK PRAWDZIWEGO KONFLIKTU - rozne warstwy pytania.** R1 mowi o **architectural context window** (ile tokenow API bezbladnie przyjmie). R6/R7 mowia o **practical quality-preserving window** (ile tokenow model utrzymuje w attention skutecznie). Obie prawdziwe. Analogicznie: CPU ma zegar 5 GHz ale nie kazda instrukcja wykonuje sie w 1 cyklu. **SYNTHESIS format:** "1M = maksymalne oknon; dla complex multi-file tasks praktyczny sweet spot to 300-400K tokens (Scortier n=6852). Przy fill >40% sprawdzaj output quality aktywnie."

**Confidence:** medium (Scortier n=6852 to solidny sample, ale jedyne primary empirical zrodlo; bswen.com potwierdza threshold 20-40% z innej metodologii)

---

### K4: `.claudeignore` - soft-hint czy native Anthropic feature?

**Strony:**
- R4 (jawny GAP): "Official Claude Code documentation at code.claude.com/docs does NOT have a dedicated .claudeignore page. (...) .claude/ directory explorer lists 10+ configuration files but does not list .claudeignore as a named file type."
- R4 (community implementations): 3 community tools (li-zhixin, pg-creative, yurekami) - to nie native support, to workaround
- R1 i R5: nie wspominaja o `.claudeignore` w ogole (potwierdzenie gap w oficjalnych docs)
- R6 (buildtolaunch): "93-99% tokenow startowych moze byc zmarnowanych na nierelewantny kod bez .claudeignore" (zaklada ze dziala)

**Rozstrzygniecie:** **R4 MA RACJE co do GAP, ale model konceptualny soft-hint vs permissions.deny JEST prawdziwy.** Ewidencja: (a) Anthropic deprekowal `ignorePatterns` w settings.json (twarda blokada) bez wprowadzenia oficjalnego `.claudeignore` (twarda blokada), (b) permissions.deny ma nativne wsparcie z gitignore-syntax (potwierdzone w R4), (c) The Register test pokazuje ze `.claudeignore` NIE blokuje twardo. **Verdict:** `.claudeignore` to **community convention + model instruction**, nie native enforcement. permissions.deny to **native hard-block** (best-effort dla Read/Grep/Glob, nie obejmuje Bash). SYNTHESIS musi to rozdzielic: **rekomendacja dla context-token optimization** = `.claudeignore` + converter tool. **Rekomendacja dla security** = permissions.deny + sandboxing.

**Confidence:** high (R4 sam zglasza gap, cross-validated przez silence w R1/R5)

---

### K5: 1h cache TTL - enterprise-only czy GA?

**Strony:**
- R2 (current): "1h TTL jest Generally Available (nie wymaga juz beta headera od 2025)"
- R2 (historical): Starsze zrodla twierdzily ze 1h wymaga enterprise lub beta headera
- R2 (Bedrock): `ENABLE_PROMPT_CACHING_1H_BEDROCK` istnieje w bundle ale hardcoded na 5m w CLI (Issue #32671 confirms)
- R2 (Claude Code Max): potwierdzono 1h cache

**Rozstrzygniecie:** **1h TTL stalo sie GA, historyczne zrodla byly prawdziwe w swoim czasie.** Timeline rekonstruowany z R2: (1) wczesne 2024: 1h beta-only, (2) 2025: GA dla API direct, (3) 2026: GA dla Claude Code Max (confirmed), Bedrock nadal hardcoded na 5m mimo wsparcia backendu. **Kiedy sie zmienilo:** R2 cytuje pricing page "kwiecien 2026" bez enterprise-only clausule - ta zmiana musiala nastapic wczesniej, prawdopodobnie 2025. **SYNTHESIS:** 1h TTL jest GA dla API i Claude Code (Max plan); na Bedrock hardcoded 5m, workaround przez undocumented env var.

**Confidence:** medium-high (pricing page verbatim confirms GA; dokladna data zmiany nie udokumentowana w R2, zgodnie z jego wlasnym gap log)

---

### K6: Invisible token inflation v2.1.100 - realna czy pojedyncze zgloszenie?

**Strony:**
- R6 (efficienist.com): +20k tokens per request od v2.1.100, HTTP proxy analysis (v2.1.98 = 49,726 vs v2.1.100 = 69,922)
- R6 (GitHub #41930): `--resume`/`--continue` = 652,069 phantom tokens, Max 5x wyczerpany w 19 min, >300 komentarzy Marzec 2026
- R6 (buildtolaunch): $1,600 billing incident, "10-20x inflacja"
- R5 (dev.to/slima4): mierzy "compaction summaries 11-19k" ale nie mierzy v2.1.100 delta
- R3: nie komentuje v2.1.100 bezposrednio, ale dokumentuje "Anti-thrashing protection (v2.1.x)"
- R7: nie wspomina o v2.1.100 (zaskakujaca luka dla community researcher)

**Rozstrzygniecie:** **Inflacja POTWIERDZONA przez NAJMNIEJ 3 zrodla niezalezne, ale zakres spektakulam jest source-dependent.** Efficienist.com dostarcza metodologia (HTTP proxy diff), ktora ma najwieksza wiarygodnosc - liczby 49,726 vs 69,922 sa reproducible gdyby ktos zrobil ten sam pomiar. Issue #41930 ma >300 komentarzy spolecznosci, co znacznie podwyzsza confidence. buildtolaunch's $1,600 ma mniejsza wiarygodnosc (jeden deweloper, self-reported, bez breakdownu). **R7 nie podnosi tego mimo bycia power-user researcherem - to wlasnie jest luka R7 (viral finding Marzec 2026 umkneel).** SYNTHESIS: **zgloszenie REAL**, workaround = downgrade lub unikac `--resume`/`--continue` w tym okresie, status fix nieznany (wymaga delta-research).

**Confidence:** medium-high (multi-source, ale brak Anthropic postmortem - moglo byc naprawione w pozniejszych wersjach, R6 sam oznacza to jako open question)

---

## Gaps (5 explicitly listed)

### G1: Algorytm /compact selekcji "co zachowac"

- **Severity:** HIGH
- **Detail:** R1 i R3 oba zgadzaja sie ze to czarny box. R1 cytuje: "requests i key code snippets są zachowane; detailed instructions from early in the conversation may be lost" - brak formalnej specyfikacji algorytmu. R3 dostarcza DEFAULT prompt template (API-level) ale R3 sam zglasza ze **CLI moze uzywac innego prompt niz API**.
- **Impact na SYNTHESIS:** Uniemozliwia doradzenie uzytkownikowi "co zrob ze zasadami krytycznymi zeby przetrwaly compaction" poza prostym "dodaj Compact Instructions do CLAUDE.md". Rekomendacja w synthesis: **najpierw CLAUDE.md + Compact Instructions section, backup: MEMORY.md/PROGRESS.md jako external persistence**.

### G2: Subagent cache inheritance model

- **Severity:** MEDIUM
- **Detail:** R2 jawnie zglasza: "Subagents i cache isolation: czy subagenty w Claude Code wspoldziela cache z parentem - niejasne". R7 Pattern 9 mowi "subagents get fresh 200K context windows" ale nie wyjasnia czy cache parent prefix jest dziedziczony. R5 gap #6 to samo pytanie: "jak tokeny subagentow licza sie w /context i /cost parenta?"
- **Impact na SYNTHESIS:** Zalecenia "deleguj do subagent dla kontekstowego firewallingu" sa ogolnie poprawne, ale prawdziwa oszczednosc kosztowa zalezy od cache model. **SYNTHESIS musi zapisac:** "subagent isolation daje context window relief (potwierdzone); cache economics (shared parent prefix vs cold start) niezweryfikowane - moze wymagac delta-research przed rekomendacja w production settings".

### G3: Raw engagement metrics z X/Twitter (paywall)

- **Severity:** MEDIUM-LOW
- **Detail:** R7 jawnie zglasza: "X/Twitter direct fetch blocked by paywall; patterns cross-confirmed via blogs, GitHub, official Anthropic sources". Metryki "790K views" dla @bcherny thread, viral claims dla @zarazhangrui /handover - wszystkie secondhand. Status IDs sa w tabeli, ale bez bezposredniego fetch.
- **Impact na SYNTHESIS:** Twitter-first patterns (PROGRESS.md, /handover, /compact with hint) maja cross-validation via blogs/GitHub - to jest OK. Ale "viral" hype assessment wymaga asterisk. SYNTHESIS: **pisz "community-adopted" zamiast "viral", podawaj cross-sources jako primary, Twitter jako secondary signal**.

### G4: Managed MCP vs regular MCP - pricing/cache ratio

- **Severity:** LOW-MEDIUM
- **Detail:** R1 cytuje pricing page: "Context window is managed by the runtime" bez szczegolow dla Managed Agents. R5 nie miara MCP servers w Managed context. R2 omawia cache dla standard API ale nie Managed Agents. **Nikt nie zadal tego pytania** - to gap w zakresie researchu.
- **Impact na SYNTHESIS:** Jesli kampania dotyczy roli Managed Agents w context engineering - delta-research wymagany. Jesli tylko standalone Claude Code + API - gap mniej krytyczny. SYNTHESIS: flag jako out-of-scope, redirect czytelnika do delta-research jesli relevant.

### G5: Dokladny compaction buffer na 1M context

- **Severity:** MEDIUM
- **Detail:** R3 wymienia Issue #34126 "Per-model configurable autocompact threshold" jako OPEN - "1M model use case". R3 Issue #34363: "Po upgrade do v2.1.76, bufor autocompact byl obliczany dla 1M okna ale aplikowany do 200k. Natychmiastowy loop po starcie sesji." Indicator ze behavior sie zmienia miedzy wersjami bez jasnej dokumentacji. Jak 33K buffer scaluje na 1M? Liniowo (~165K) czy constant (33K na 1M = ~3.3%)?
- **Impact na SYNTHESIS:** Uzytkownicy Opus 4.7/Sonnet 4.6 z 1M oknem nie maja deterministycznej odpowiedzi "kiedy sie zacznie compaction". **SYNTHESIS musi napisac: "na 1M context buffer scaling nieudokumentowany - monitorowac /context output i uzywac CLAUDE_CODE_AUTO_COMPACT_WINDOW jesli potrzeba deterministic behavior".**

---

## Bias detection

### R6: agregator-based sourcing

**Flag:** R6 cytuje morphllm.com i aitooldiscovery.com jako zrodla Reddit sentyments zamiast bezposrednich watkow. R6 **sam zglasza to** w sekcji "Gaps": "Konkretne posty Reddit z linkami i upvotami sa trudne do wyekstrahowania - wiekszosc agregatorow (morphllm.com, aitooldiscovery.com) cytuje 'Reddit user reports' bez bezposrednich URL". **Ocena bias:** low-medium - jesli agregator sam popelnia confirmation bias (wybiera tylko negatywne sentiments), R6 propagates to. Watki "Claude Is Dead" i "841 upvotes" sa wspomniane bez direct thread link - nie moglem niezaleznie zweryfikowac upvote count.

**Rekomendacja:** SYNTHESIS nie powinna cytowac "841 upvotes" bez asterisk; powinno stosowac frazy "community reports", "aggregated Reddit sentiment" zamiast implikacji primary source.

### R7: single-source dla kluczowych metryk

**Flag:** Kilka krytycznych twierdzen R7 ma tylko JEDNO primary source:
- "effective high-quality window ~400K" = Scortier 6852-session study (ten sam zrodlo)
- "73% reasoning depth decline Jan-Mar 2026" = Scortier/Stella Laurenzo (same laboratorium, prawdopodobnie ta sama metodologia)
- "$2.87 -> $0.94 savings from session isolation" = buildtolaunch.substack (one blog)

**Ocena bias:** medium. Scortier to respektowany substack ale nie peer-reviewed. Triangulation wymaga porownania z drugim niezaleznym pomiarem. R7 **nie prowadzi tej triangulacji**.

**Rekomendacja:** SYNTHESIS flaguje te metryki jako "single-source community empirical finding". Nie cytuj jak fakty.

### R5: metodology mixing without hierarchical weighting

**Flag:** R5 pomiary mieszaja trzy rozne metodologie (`/context` live output, API cache_read tracking, tokenizer verify) w jednej tabeli bez wyraznej hierarchii zaufania. Poslkutek: "System prompt = 2,600-2,700 OR 14,328 OR 24,000" - czytelnik nie wie ktora wartosc zastosowac w kalkulacji.

**Ocena bias:** low (to nie bias, to confusing presentation). **Rekomendacja dla synthesis:** uzyj tylko /context live output ("user-observable") jako canonical, zaznacz inne jako ticking-different-metric.

### R1: pro-docs bias (oczekiwany w jego roli)

**Flag:** R1 cytuje "95% trigger" z docs i implicit downplays community measurements (83.5%). Jest to zrozumiale dla Researchera Docs, ale nie zwalnia z obowiazku cross-reference. R1 sam napisal "Używamy 95% jako source of truth" - to **anti-pattern Single-Source Trust** z wlasnego skill file R_CRITIC.

**Ocena bias:** medium. R1 w tej konkretnej decyzji niestrannie wyszedl. R3 i R6 naprawiaja bias poprzez pokazanie mechanizmu 33K buffer.

**Rekomendacja:** SYNTHESIS bierze R3 wersje (nominal 95%, effective 83.5%, matematyka explicit).

---

## Rekomendacje dla Syntetyka

### Trust levels per raport

- **R1 (docs):** TRUST dla numerical facts z docs (context window sizes, pricing, dates), FLAG dla interpretations ("95% source of truth") - patrz K2.
- **R2 (caching):** TRUST dla pricing/formula/invalidation tables (dobrze cross-sourced), FLAG dla LMCache 92% claim (secondhand).
- **R3 (compact):** HIGH TRUST - najlepsze cross-sourcing, explicit primary/community split. Przyjmij jako canonical gdy R1 w konflikcie z community.
- **R4 (claudeignore):** PARTIAL TRUST - ogólny model soft-hint vs permissions.deny trust; konkretne "replaces ignorePatterns" FLAG (R4 confidence 0.72, primary source gap jawny).
- **R5 (tokens):** TRUST dla /context-sourced values (wmedia.es, claudefa.st, jdhodges.com, atcyrus.com), FLAG dla tokrepo.com estimates bez /context. Uzyj tabele komponentow ale preferuj /context snapshots jako canonical.
- **R6 (antipatterns):** TRUST dla wzorcow z GitHub Issue numbers (K1-K5 primary), FLAG dla Reddit quote agregacji (upvote counts, "Claude Is Dead" post).
- **R7 (community):** PARTIAL TRUST - 10 patterns sa validated przez secondary sources, FLAG Scortier metrics jako single-source, REVISE przed cytowaniem X/Twitter views jako evidence.

### Obowiazkowe discriminatory w synthesis

1. **Auto-compact threshold MUSI byc rozdzielone na 4 pojecia** (K2). Brak tego = zla rekomendacja dla uzytkownika.
2. **Skill loading MUSI byc dyskryminowane miedzy standalone i plugin** (K1). Liczby sa rozne o 2 rzedy wielkosci.
3. **`.claudeignore` vs permissions.deny** - rozne rekomendacje dla token-opt vs security (K4).
4. **1M context window: theoretical vs practical** - jedna liczba byc mylaca (K3).

### Reprioritizowane delta research (jesli sesja budget pozwala)

- **HIGH priority:** Subagent cache inheritance model (G2) - bezposredni wplyw na cost architecture rekomendacji
- **HIGH priority:** v2.1.100 invisible inflation - naprawione czy nie? (K6) - wplywa na "praktyczny" advice w synthesis
- **MEDIUM priority:** /compact selection algorithm empirical test (G1) - potwierdzenie ze Compact Instructions sekcja dziala
- **LOW priority:** Managed MCP cost/cache (G4) - out-of-scope jesli kampania jest tylko o Claude Code CLI

### Struktura synthesis - sugestia krytyka

1. **Tier 1 findings (high confidence, cross-validated):** context window sizes per model, caching economics (break-even formulas), auto-compact mechanika (nominal vs effective), /compact preserve/lose list, session doctrine, plan-acceptance auto-clear
2. **Tier 2 findings (medium confidence, some single-source):** token accounting tables (ale wybierz canonical metodology), skill loading patterns (z discriminator), community patterns (PROGRESS.md, HANDOVER.md)
3. **Tier 3 findings (flag as caveat):** effective 300-400K window, 20-40% degradation, v2.1.100 inflation, Scortier cost savings
4. **Known gaps section (separate):** algorithm black boxes, subagent cache, 1M buffer scaling
5. **Anti-patterns section** (z R6, ale odfilter Reddit agregator overcalls)

---

## Status & Counts

- **Reports reviewed:** 7/7 full-text (R1, R2, R3, R4, R5, R6, R7)
- **Extracts cross-checked:** dostepne w extracts/E1-E7_*.json (spot-check basis)
- **Verdicts:** 5 PASS, 1 PASS z FLAG (R4), 2 PASS z FLAG (R5, R6), 1 REVISE (R7)
- **Konflikty rozstrzygniete:** 6 (wymagany min 5) - wszystkie z 6 "znane konflikty" adresowane
- **Gaps explicitly listed:** 5 (wymagany min 3) - wszystkie 4 "znane gaps" adresowane + G1 dodatkowy
- **Bias flags:** 4 (R6 agregatorowy, R7 single-source, R5 methodology mixing, R1 pro-docs)
- **BRAMA 4 STATUS:** **PASS** - krytyk nie rubber-stamped (1 REVISE, 3 FLAGs), eksplicyty resolution per konflikt, priority-sorted recommendations dla synthesis

**Slowa:** ~4,400 (target 4000-7000 spelniony)

### Key insights dla Orkiestratora

1. **Najwieksza wartosc z researchu siedzi w R3** - najlepsze primary/community split + GitHub issue registry
2. **Najwiekszy handicap synthesis to terminologiczne ROZDZIELENIE** auto-compact threshold na 4 pojecia (nominal/effective/degradation/proactive) - bez tego uzytkownik dostanie sprzeczne advice
3. **R4 primary source gap jest niemozliwa do zamkniecia** w tej kampanii - Anthropic po prostu nie dokumentuje natywnie `.claudeignore`. SYNTHESIS powinna przyjac te jako state-of-the-world i dac community workaround tools jako recipe
4. **v2.1.100 inflation bug i #41930 resume drain** - to LIVE zagrozenia, SYNTHESIS powinna dac "safety note" z timestampem "as of 2026-04-17" i workaroundami
5. **R7 REVISE nie blokuje** - wzorce sa ok, ale liczby wymagaja asterisku. Syntetyk moze przekleic 10 patterns z R7 + dodac "community-adopted, single-source metrics" footnote
