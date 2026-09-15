# MANIFEST - Claude Code Subagents + Task Tool 2026

**Data:** 2026-04-17
**Preset:** /deep-research-v2 (17 agentow, STANDARD routing)
**Orkiestrator model:** Opus 4.7
**Target output:** SYNTHESIS 8-10k slow + 4 pliki NbLM (w tym MEDIA 9.5/10)

## Zadanie

Deep Research v2 dla tematu "Claude Code Subagents + Task Tool 2026": jak swiadomie delegowac zadania przez Task tool, zarzadzac isolation (default vs worktree), optymalizowac paralelizm oraz model routing per subagent, stosowac background agents i unikac anti-patternow spoleczosci.

Scope pokrywa 7 osi badawczych (R1-R7) rozbitych w MASTER_PLAN.md.

## Decyzje Architektoniczne

**DD01 - Routing STANDARD (nie premium):**
- Orkiestrator, Critic, Syntetyk, NbLM Writer -> Opus 4.7 (decyzje, cross-report reasoning, citation discipline)
- 7 Researcherow -> Sonnet 4.6 (retrieval + 1500-6000 slow)
- 7 Extractorow -> Haiku 4.5 (structured JSON claim-table)
Uzasadnienie: 90% kampanii tak prowadzimy, mamy empiryczny case-study z /deep-research-v2 (cytowany w R4).

**DD02 - Mapowanie 7 pytan R1-R7 do 7 researcherow:**
- R1 (Task Tool API Spec) -> Researcher Docs (oficjalne docs Anthropic, CLI reference, system prompt CC)
- R2 (Subagent Lifecycle + Context) -> Researcher Tech (archi artykul, inheritance mechanics)
- R3 (Worktree Isolation) -> Researcher GitHub (repo samples, issue threads, worktree PRs)
- R4 (Model Routing) -> Researcher X (Twitter threads "75% zadan Sonnet", hot takes, shared benchmarks)
- R5 (Parallel Execution) -> Researcher Forums (StackOverflow/HN/Dev.to "multiple Task calls" patterns)
- R6 (Background Agents) -> Researcher UX (user-facing flow: run_in_background, notifications, Monitor)
- R7 (Anti-patterns + Community) -> Researcher Reddit (r/ClaudeAI, r/LocalLLaMA niefiltrowane opinie)

**DD03 - Windows worktree risk:**
R3 Researcher musi **explicite testowac** claims czy wszystkie git worktree features dzialaja na Windows (systemd-less, symlink caveats). Nie przyjmuje "dziala" bez cytatu.

**DD04 - R6 background agents gap expected:**
Researcher UX dla R6 moze zwrocic < 2000 slow z powodu scarce docs. Akceptujemy jesli >= 1000 slow i explicite oznaczone gaps. Critic zaznaczy jako "thin but honest".

**DD05 - Memory citation dla R4:**
R4 (Model Routing) moze cytowac `C:/Users/macie/.claude/projects/.../feedback_deep_research_v2_model_routing.md` jako empiryczny case (hybrid Orch Opus + Res Sonnet + Ext Haiku = praktykowany). Oznaczone jako "self-citation, empirical".

**DD06 - Citation format:**
Kazda teza w SYNTHESIS.md: `(R<N>.C<M>)` gdzie C<M> to claim number z extracta E<N>. Critic bedzie weryfikowac.

**DD07 - NbLM 4 pliki:**
Standard deep-research-v2 daje plans/SYNTHESIS.md. Ten run dodaje Faza 5 NbLM z czterema plikami: 00_FUNDAMENTALS, 01_PATTERNS, 02_DECISION_GUIDE, 03_MEDIA_PROMPTS (Video S-C-L-M-A + Infographic L-C-T-I-M-A-N, target 9.5/10). NbLM Writer to Opus.

## Stack Technologiczny

Nie dotyczy (research campaign, output = markdown + JSON).

Narzedzia zrodla:
- WebSearch/WebFetch (dla researcherow) - Anthropic docs, Reddit, X, GitHub, HN, Dev.to, StackOverflow
- Read/Write (dla Extractorow, Critic, Syntetyk, NbLM Writer)
- Memory cross-reference dla R4 (self-citation)

## Known Risks

**Ryzyko 1 - R3 Windows worktree:** git worktree na Windows moze miec ograniczenia (symlinks, permissions). Jesli researcher nie znajdzie empirycznych testow, Critic flaguje jako OPEN QUESTION.

**Ryzyko 2 - R6 background scarce docs:** run_in_background + SendMessage + Monitor to nowe features. Researcher UX moze nie znalezc 1500+ slow z primary sources - akceptujemy minimum 1000 slow + explicit gap list.

**Ryzyko 3 - R4 heurystyka "75% Sonnet":** to krazy na X/Reddit bez benchmark - Researcher X musi znalezc primary source albo oznaczyc jako "folklore, nieudokumentowane".

**Ryzyko 4 - Over-spawning anti-pattern:** R7 bedzie kolekcjonowac zgłoszenia "context explosion" i "tokenbleed". Musimy rozroznic zgloszenia real vs FUD.

**Ryzyko 5 - Haiku Extractor fallback:** jesli Haiku zwraca broken JSON (naturalne ryzyko), fallback na Sonnet dla tego Extractora. Udokumentuj w PROGRESS.

## Open Questions

**OQ1** - Max recursion depth sub-subagentow? Czy subagent moze spawn Task tool?
**OQ2** - Czy subagent widzi CLAUDE.md rodzica, czy cwd-based lookup?
**OQ3** - Timeout default dla subagent (2 min? 10 min?)
**OQ4** - Czy isolation: worktree dziala na Windows?
**OQ5** - Jak Task tool rate-limity (concurrent calls) wspoldzialaja z API tier?
**OQ6** - Czy SendMessage do background agenta moze stanowisko zmienic, czy tylko append?

Te OQ trafia do CRITIC.md i jesli nie maja PASS, ida do NbLM/02_DECISION_GUIDE jako "known unknowns".

## Target delivery

- `research/R1..R7_*.md` (7 raportow >= 1500 slow each)
- `extracts/E1..E7_*.json` (7 claim-tables, 15-30 claimow each)
- `research/CRITIC.md` (PASS/REVISE, min 5 konfliktow, min 3 gaps)
- `plans/SYNTHESIS.md` (8-10k slow, citation discipline)
- `NbLM/00_FUNDAMENTALS.md`
- `NbLM/01_PATTERNS.md`
- `NbLM/02_DECISION_GUIDE.md`
- `NbLM/03_MEDIA_PROMPTS.md` (media 9.5/10)

Total ~25-30k slow final output.
