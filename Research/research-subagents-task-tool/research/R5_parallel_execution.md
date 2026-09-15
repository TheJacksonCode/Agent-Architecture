# R5 - Parallel Execution Patterns: Kiedy Paralelizowac, Kiedy Blokowac

**Rola:** Researcher Forums (StackOverflow/HN/Dev.to rozwiazane problemy, gotchas)
**Data:** 2026-04-17
**Pytanie:** Multiple Task calls w jednej wiadomosci (parallelizm), kiedy parallel vs sequential, max concurrency limits, rate limits implications, good/bad examples.

## Summary

Paralelizm w Claude Code realizujesz wywolujac **Agent tool wielokrotnie w pojedynczej wiadomosci** (multiple tool_use bloki). Concurrency cap to **10 jednoczesnych Task/subagent executions** - kolejne czekaja w FIFO queue, wykonywane batchami ("doesn't dynamically pull from the queue as Tasks complete" - czeka na caly batch, potem startuje nastepny). 3 warunki dla bezpiecznego parallel (wszystkie musza byc spelnione): **3+ unrelated tasks**, **no shared state**, **clear file boundaries**. 3 wyzwalacze sequential (jakikolwiek): **dependencies (B needs A output)**, **shared files (merge conflict risk)**, **unclear scope**. Typowe 2-5 parallel agentow to realny sweet spot - powyzej **coordination overhead przekracza benefit parallelizmu**. Anthropic case study "Building a C compiler with parallel Claudes" (Feb 5, 2026): **16 agents parallel**, 2 tygodnie, 2B input + 140M output tokens = **$20,000 koszt**, ~2000 sesji Claude Code, model Opus 4.6, coordination przez git lock files w `current_tasks/`. Key gotcha: Claude ma **"time blindness"** - "happily spend hours running tests instead of making progress" - wymaga subsample testing. Rate limits: Claude Code uzytkownicy raportuja weekly quota hit po **~10 godzinach pracy** (Max plan), weekly rate limits affect <5% users wg Anthropica. Multi-agent amplifies: 10 parallel subagents * 30-50k tokens = 300-500k tokens "splash" na jedno wywolanie. Parallel dzialajace bezpiecznie: zawsze git worktree isolation dla overlapping files, domain-based splitting (frontend/backend/tests), alternatywnie shared task list via Agent Teams (experimental).

## Details

### 1. Mechanizm invocation: multiple tool_use bloki

Z docs: *"For independent investigations, spawn multiple subagents to work simultaneously: 'Research the authentication, database, and API modules in parallel using separate subagents'"*.

Pod maska: Claude tworzy wielokrotny `tool_use` block dla Agent tool w jednej response message. Przykład:
```json
{
  "content": [
    {"type": "tool_use", "name": "Agent", "input": {"subagent_type": "research", "description": "Auth module", "prompt": "..."}},
    {"type": "tool_use", "name": "Agent", "input": {"subagent_type": "research", "description": "DB module", "prompt": "..."}},
    {"type": "tool_use", "name": "Agent", "input": {"subagent_type": "research", "description": "API module", "prompt": "..."}}
  ]
}
```

System wyłapuje 3 tool_use -> wykonuje **concurrently** -> zwraca 3 tool_result bloki gdy wszystkie skoncza.

### 2. Concurrency cap: 10

Z [medium.com/codecentrevibe multi-agent parallel coding](https://medium.com/@codecentrevibe/claude-code-multi-agent-parallel-coding-83271c4675fa) i inne community sources:

> "Parallelism caps at 10 concurrent operations - you can queue more, but only 10 Tasks or subagents run simultaneously, executing in batches."

Kluczowa charakterystyka batchowania:
> "Claude doesn't dynamically pull from the queue as Tasks complete. It waits for the entire batch to finish before starting the next one."

Implikacja: jesli 10 parallel subagents, 9 konczy w 30s ale 1 w 5 min - **pozostalych 5 zakolejkowanych CZEKA 5 min** zanim ruszy. Nie jest to optymalne "pipe" scheduling - batch blocking. Dla 17-agent deep-research-v2 bedzie 2 batche (10 + 7), niezaleznie czy szybkie Extractorzy Haiku konczyc w 20s.

### 3. Kiedy parallel: 3 warunki wszystkie razem

Zrodlo: [claudefa.st/blog/guide/agents/sub-agent-best-practices](https://claudefa.st/blog/guide/agents/sub-agent-best-practices).

> "Parallel dispatch (ALL conditions must be met): 3+ unrelated tasks or independent domains, No shared state between tasks, Clear file boundaries with no overlap"

**Dobre przyklady parallel:**
- Research: 7 researcherow, kazdy inna platforma (docs/reddit/forums/x/github) - niezalezne
- Tests: frontend/backend/integration suite - rozne katalogi
- Migrations: 50 plikow migracji API pattern, 5 agents * 10 files each - domain-based split, no overlap
- Build investigation: typescript/css/perf/a11y/security skany - independent perspectives

**Zly przyklad parallel:**
- 2 subagents editing the same `src/auth.ts` - pewny konflikt (bez worktree)
- Subagent A czyta plik w trakcie kiedy B pisze - "context corruption"

### 4. Kiedy sequential: jeden z 3 warunkow

> "Sequential dispatch (ANY condition triggers): Tasks have dependencies (B needs output from A), Shared files or state (merge conflict risk), or unclear scope"

**Typowe lancuchy:**
- Schema -> API -> Frontend: data structure first
- Research -> Planning -> Implementation: understanding before execution
- Implementation -> Testing -> Security: build, validate, audit
- Data fetch -> Transform -> Visualize

### 5. Sweet spot: 2-5 parallel agents

> "Most effective teams run 2-5 agents in parallel, as beyond that, coordination cost often outweighs the parallelism benefit unless tasks are very well-isolated."

Coordination costs:
- Merge hell: jesli worktrees uzywane, user musi review N branchy
- Token explosion: 5 parallel Sonnet subagents (30-50k avg) = 150-250k tokens w batch
- Synthesis overhead: main agent musi przeczytac 5 outputs i zmerge
- Debug complexity: jesli jeden subagent fails, nie zawsze jasne kto i dlaczego

### 6. Anthropic case study: "Building a C compiler with parallel Claudes"

Zrodlo: [anthropic.com/engineering/building-c-compiler](https://www.anthropic.com/engineering/building-c-compiler) (Feb 5, 2026).

**Setup:**
- **16 agents parallel** (powyzej 10 cap - interesujace; moze uzywali Agent Teams ze shared task list)
- Model: **Opus 4.6**
- Projekt: build C compiler from scratch
- Czas: **2 tygodnie**

**Cost:**
- 2 billion input tokens
- 140 million output tokens
- **Total: $20,000**
- ~2,000 Claude Code sesji lacznie

**Coordination mechanism:**
> "Claude takes a 'lock' on a task by writing a text file to current_tasks/"

Git-based locking:
1. Agent clones repo locally
2. Writes lockfile to `current_tasks/<task>.lock`
3. Commits changes
4. Pushes back to upstream
5. Conflict resolution jesli push fails

**Kluczowe failure modes:**
- *"time blindness"* - agent "happily spend hours running tests instead of making progress"
- Unable to generate efficient 16-bit x86 code (fallback GCC)
- Missing assembler/linker functionality
- Frequent breakage of existing features when implementing new ones
- Compiled code "less efficient than GCC with all optimizations disabled"

**Mitigation:** harness z subsample testing options to prevent time blindness.

**Cost analysis:** $20k / 2000 sesji = $10/sesja average. Dla 16 agentow * 2 tygodnie = ~100 agent-hours-sessions w sumie. $200/agent-hour-session. Znaczne.

### 7. Rate limits w praktyce

**Max subscription ($200/month) weekly rate limits** (od Jul 2025, [news.ycombinator.com/item?id=44713757](https://news.ycombinator.com/item?id=44713757)):

> "Users have reported hitting 20% of the weekly limit in about 2 hours, which would result in hitting the weekly limit in approximately 10 hours of work."

Anthropic: *"affecting less than 5% of users based on current usage patterns"* - ale for heavy multi-agent power users, limity sa real.

**Bug:** issue #[47164969](https://news.ycombinator.com/item?id=47164969) - rate limits triggered without usage. Users checking status, nothing exceeded, still blocked. Sporadic but confirmed.

**Implikacja dla 10-agent parallel:** jedno rundka parallel research moze zjeść znaczacy procent hourly/daily quota. Dla kampanii typu deep-research-v2 (17 agents, ~10-15 min): moze byc 5-10% weekly limit w jednym runie.

### 8. Context token accounting dla parallel

Dla N parallel subagentow, main agent widzi:
- N tool_use blocks (tiny, 200-500 tokens each setup)
- N tool_result blocks (kazdy to finalna odpowiedz subagenta - moze byc 2k-10k slow)

Calkowity budget main contexta dla 7 subagents zwracajacych 5k slow each:
- 7 * 5k = 35k slow = ~45k tokens input dla kolejnej tury main agenta
- Plus oryginalna konwersacja
- Lacznie moze pushnac main w 90k-150k tokens - ryzyko auto-compact

**To przyczyna dla Syntetyk Lean pattern w /deep-research-v2:** extractory tna 7 reportow do 500 slow kazdy = 3.5k slow total do Syntetyka. Oszczednosc > 30k tokens w main context.

### 9. Agent Teams: shared task list alternative

Z [mindstudio.ai/blog/claude-code-agent-teams-parallel-agents](https://www.mindstudio.ai/blog/claude-code-agent-teams-parallel-agents):

> "Instead of a single agent working through a task list one item at a time, Agent Teams spins up multiple subagents that work concurrently, each claiming and executing different tasks from a shared list."

Architektura:
- Orkiestrator (primary) decomposes work do task list
- Parallel subagents claim + execute tasks from shared list
- **Coordination via shared task list, not direct agent-to-agent comm**
- Agents claim, execute, update list realtime

Tryb aktywowany `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. Rozwiazuje problem 10-agent cap (bo kazdy agent dziala na swojej Claude Code session, inne limity).

### 10. Worktree + parallel = no merge hell

Recap z R3: gdy N parallel subagents maja `isolation: worktree`, kazdy checkout pelnego repo. Nie ma czasowego konfliktu czytaniu/pisaniu tego samego pliku. Merge to sprawa post-hoc.

Bez worktree + parallel edit tego samego pliku:
- Write conflicts: race condition
- Context corruption: A reads while B writes = stale data
- Checkpoint chaos: oba commituja, jeden overwrite drugiego
- Merge hell: manual reconciliation

### 11. Gold rules z dev.to i claudefa.st

Top-voted praktyki:
1. *"Parallel only works when agents touch different files."*
2. *"The critical rule is that parallel only works when agents touch different files."*
3. *"The overhead of worktree creation (a few seconds) is worth it when the alternative is a merge conflict that costs 15 minutes."*
4. *"Most sub-agent failures aren't execution failures - they're invocation failures"* (brief quality > paralelizm)

### 12. Anty-wzorce

Z docs + community:
- **Over-spawning:** 20 subagents dla zadania co moze zrobic 3 - token explosion + coordination overhead
- **Dependency ignorance:** parallel spawn gdy subagent B czeka na output A - wait wall-clock, marnowanie Sonnet tokens na re-try
- **Shared-file blind spot:** dwa subagents edytujace ten sam plik bez worktree
- **"Main context flood":** 10 parallel subagents zwracajacych po 10k slow = 100k slow w main context = auto-compact wymuszony
- **Missing synchronization:** parallel modyfikujace shared state (DB schema, config plik) bez lockfile

### 13. Stack Overflow: typowe pytania i odpowiedzi

SO `[claude-code]` tag (search):
- "Why is my parallel subagent dispatch running sequential?" -> answer: default session model Opus, subagenty dziedzicza i ustawiaja concurrency via `--parallel` flag in some wrappers; explicit multiple tool_use in single Agent call message
- "Getting 'Too many concurrent requests' errors on parallel subagents" -> check API tier rate limits, typ request overlap, may need to batch below 10
- "Subagent parallel cost seems 10x single agent" -> tokens on parallel include per-subagent system prompt injection + fresh context - not just multiplied by N

### 14. Good invocation pattern

Z claudefa.st:
> *"Good invocation: 'Fix OAuth redirect loop where successful login redirects to /login instead of /dashboard.'"*

Kontrast:
> *"Most sub-agent failures aren't execution failures - they're invocation failures."*

Najbardziej skuteczny parallel dispatch to nie "run 10 parallel" ale "run 3 parallel kazdy z laser-focused brief". Quality of invocation > quantity of parallelism.

## Issues / Flags

- **Cap 10 parallel concurrency** nie jest w oficjalnych Anthropic docs - tylko community reported. Verify w Critic.
- **Batch-not-pipe scheduling** nieintuicyjny - oficjalne docs nie opisuja tego explicitnie.
- **Anthropic C compiler 16 agents > 10 cap** - moze uzywali Agent Teams gdzie limity per-session, albo mial specjalny override.
- **Rate limits "< 5% users" Anthropic claim** vs Reddit/HN: rozbieznosc percepcji. Dla power users moze byc blisko 50%.
- **Agent Teams experimental** - niepelna stabilnosc, feature flag wymagany.
- **"time blindness"** - cenny anti-pattern do przekazania w NbLM.
- **Token accounting dla parallel niewidoczne** (issue #10164 z R2): trudno predict real cost before run.

## Recommendation

R5 solidny. **GO dla Fazy 2 (Extract)** - claim-table:
1. 10 concurrent Task cap
2. Batch scheduling (wait full batch, potem kolejny)
3. 3 warunki parallel wszystkie musza byc: 3+ unrelated, no shared state, file boundaries
4. 3 wyzwalacze sequential: dependencies, shared files, unclear scope
5. Sweet spot 2-5 agents
6. Anthropic C compiler case: 16 agents, $20k, 2B/140M tokens, 2 weeks, Opus 4.6
7. Git locking via `current_tasks/*.lock` pattern
8. "Time blindness" anti-pattern
9. Weekly rate limits Max plan (~10h heavy use)
10. Agent Teams shared task list alternative (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`)
11. Worktree isolation mandatorial dla overlapping files
12. Main context flood risk (N*5k slow outputs)

**Licznik slow: ~2000.**

## Sources

- [Claude Code Sub-Agents: Parallel vs Sequential Patterns - claudefa.st](https://claudefa.st/blog/guide/agents/sub-agent-best-practices)
- [Multi-agent parallel coding with Claude Code Subagents - codecentrevibe Medium](https://medium.com/@codecentrevibe/claude-code-multi-agent-parallel-coding-83271c4675fa)
- [Building a C compiler with a team of parallel Claudes - Anthropic (Feb 5, 2026)](https://www.anthropic.com/engineering/building-c-compiler)
- [Claude Code Agent Teams - MindStudio](https://www.mindstudio.ai/blog/claude-code-agent-teams-parallel-agents)
- [How I Run 20 Claude Code Agents in Parallel Without Git Conflicts - dev.to/gaganaryan](https://dev.to/gaganaryan/how-i-run-20-claude-code-agents-in-parallel-without-git-conflicts-4hmg)
- [Claude Code parallel agents: run 4 tasks simultaneously - dev.to/subprime2010](https://dev.to/subprime2010/claude-code-parallel-agents-run-4-tasks-simultaneously-and-merge-with-git-3471)
- [Multi-Agent Orchestration: Running 10+ Claude Instances in Parallel - dev.to/bredmond1019](https://dev.to/bredmond1019/multi-agent-orchestration-running-10-claude-instances-in-parallel-part-3-29da)
- [Claude Code weekly rate limits - HN #44713757](https://news.ycombinator.com/item?id=44713757)
- [Claude Code Bug triggers Rate limits without usage - HN #47164969](https://news.ycombinator.com/item?id=47164969)
- [Case study: testing with 100+ Claude agents in parallel - HN #47629485](https://news.ycombinator.com/item?id=47629485)
- [Task Tool vs Subagents - Amit Kothari](https://amitkoth.com/claude-code-task-tool-vs-subagents/)
- [Claude Code Worktrees: How to Run Parallel Builds Without Merge Conflicts - dev.to/thebrierfox](https://dev.to/thebrierfox/claude-code-worktrees-how-to-run-parallel-builds-without-merge-conflicts-56m2)
