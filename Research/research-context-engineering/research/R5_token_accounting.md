# R5 - Token Accounting: Empiryczne metryki z community
**Researcher:** R5 Forums (empiric community metrics)
**Campaign:** Claude Code Context Engineering 2026
**Date:** 2026-04-17
**Cut-off:** 2026-04-17

---

## Executive Summary

Community empirycznie zmierzyla token cost kazdego komponentu Claude Code przez: `/context` command output, API `/messages` call inspection, oraz analityczne repozytoria (ccusage, Piebald-AI/claude-code-system-prompts). Rozrzut liczb jest duzy (metody rozne), ale wzorzec jest jasny: **system tools dominuja baseline (14-18k tokens)**, **MCP tools to najbardziej zmienny komponent (od 0 do 144k tokens)**, a **CLAUDE.md i memory files to male ale kumulujace sie koszty**. Skill files w trybie progressive disclosure moga kosztowac tyle co frontmatter (~61 tokens na plik), ale raporty z GitHuba wskazuja ze pelne body czesto laduje sie od razu (3-6k per skill). Command files (slash commands) nie maja baseline kosztu - ich body laduje sie tylko po inwokacji.

---

## TABLE: Component Costs

| Component | Tokens | Source | Date | Metodologia |
|-----------|--------|--------|------|-------------|
| **System prompt (core instructions)** | ~2,600-2,700 | claudefa.st /context output | 2025-2026 | `/context` command live output |
| **System prompt (core instructions)** | ~14,328 | dev.to/slima4 API analysis | 2025-2026 | API cache_read śledzony przez 4 segmenty sesji |
| **System prompt (z Claude.ai webapp)** | ~24,000 | HN #43909409 (tokenizer verify) | 2025 | Paste do tokenizera zewnętrznego |
| **System tools (builtin 24 narzedzia)** | 16,800-17,600 | claudefa.st + wmedia.es /context | 2025-2026 | `/context` live output |
| **System tools (builtin 24 narzedzia)** | ~14,400 | GitHub #11364 community report | 2025 | `/context` live output |
| **Bash tool (description alone)** | 1,611 | Piebald-AI/claude-code-system-prompts v2.1.112 | 2026-04-16 | Token count z repozytorium system prompt |
| **TodoWrite tool** | 2,037 | Piebald-AI/claude-code-system-prompts v2.1.112 | 2026-04-16 | Token count z repozytorium |
| **WebFetch tool** | 297 | Piebald-AI/claude-code-system-prompts v2.1.112 | 2026-04-16 | Token count z repozytorium |
| **Bash tool (API call overhead)** | 245 | MindStudio blog + branch8.com | 2025-2026 | Cytowane bez podanej metodologii |
| **Custom agents (agent definitions)** | 400-1,300 | GitHub #11364 + claudefa.st | 2025-2026 | `/context` live output |
| **Memory files (CLAUDE.md baseline)** | 302-1,700 | wmedia.es + GitHub #11364 | 2025-2026 | `/context` live output |
| **Skills (frontmatter only, progressive)** | 61-100 per skill | wmedia.es /context example | 2025-2026 | `/context` live output |
| **Skills (full body loaded)** | 3,000-5,500 per skill | GitHub #14882 community report | 2025 | `/context` live output (rozbieznosc!) |
| **Skill zbiorczo (multiple skills, progressive)** | ~1,000 dla 10 skills | codewithseb.com claim | 2025-2026 | Szacunek, nie /context |
| **Skill zbiorczo (multiple plugins, full body)** | 50,000+ | GitHub #14882 user report | 2025 | `/context` live output |
| **Command file (slash command body, on invoke)** | 500-1,500 per invocation | tokrepo.com | 2025-2026 | Szacunek, brak /context source |
| **Command file (repeated calls this session)** | 2-3 per call | tokrepo.com | 2025-2026 | Claim (prawdopodobnie cached) |
| **MCP tool: 1 tool definition (avg)** | 100-500 | jdhodges.com measured | 2025-2026 | `/context` z 4 serwerami |
| **MCP: Playwright (22 tools)** | ~3,442 | jdhodges.com measured | 2025-2026 | `/context` measured |
| **MCP: Gmail (7 tools)** | ~2,640 | jdhodges.com measured | 2025-2026 | `/context` measured |
| **MCP: SQLite (6 tools)** | ~385 | jdhodges.com measured | 2025-2026 | `/context` measured |
| **MCP: Gmail + Playwright + Codex + SQLite (37 tools)** | ~7,077 | jdhodges.com measured | 2025-2026 | `/context` measured |
| **MCP: GitHub (91 tools)** | ~46,000 | atcyrus.com report | 2025-2026 | /context reported |
| **MCP: Playwright (21 tools) - heavy** | ~9,700 | atcyrus.com report | 2025-2026 | /context reported |
| **MCP: AWS Cost Explorer (7 tools)** | ~9,100 | atcyrus.com report | 2025-2026 | /context reported |
| **MCP: mcp-docker (135 tools)** | 125,964 | atcyrus.com extreme case | 2025-2026 | /context reported |
| **MCP: 7 servers active** | 67,300 | GitHub #11364 | 2025 | `/context` live output |
| **MCP: 3 servers (zoptymalizowane)** | 42,600 | GitHub #11364 | 2025 | `/context` live output |
| **MCP: Tool Search baseline (po deferred)** | ~8,700 | atcyrus.com | 2025-2026 | vs 77k bez deferred |
| **MCP: Tool Search tool overhead** | ~500 | atcyrus.com | 2025-2026 | Measured overhead samego search tool |
| **MCP: Jira server** | ~17,000 | jdhodges.com (other devs) | 2025-2026 | Reported |
| **MCP: mcp-omnisearch** | ~14,100 | jdhodges.com (other devs) | 2025-2026 | Reported |
| **Autocompact buffer (zarezerwowany)** | 33,000 | claudefa.st measured | 2025-2026 | `/context` live output |
| **Autocompact buffer (stary)** | ~45,000 | claudefa.st historical | pre-2025 | `/context` historical |
| **Compaction summary (per zdarzenie)** | 11,000-19,000 | dev.to/slima4 API analysis | 2025-2026 | API tokens tracked |
| **Tool result: Read 100 linii** | ~400-600 | Szacunek: 4-6 chars/token x avg line 25 chars | community rule-of-thumb | Nie mierzone bezposrednio |
| **Tool result: Bash verbose output (np. git log 200)** | potencjalnie 10,000-50,000 | MindStudio + community warn | 2025-2026 | Warning, brak /context pomiaru |
| **Total baseline (lean setup, bez MCP)** | ~20,000-25,000 | claudefa.st /context snapshot | 2025-2026 | `/context` live output |
| **Total baseline (medium MCP, 4 serwery)** | ~40,000-60,000 | multiple sources | 2025-2026 | Agregat /context snapshots |
| **Total baseline (heavy MCP, 5+ serwerow)** | 66,000-86,000+ | GitHub #11364 | 2025 | `/context` live output |

---

## Patterns i Wnioski

### 1. System Prompt - dwie "warstwy" i rozbieznosc

Rozbieznosc pomiedzy 2,600-2,700 a 14,328 tokens ma jasne wyjasnienie:
- **2,600-2,700 tokens** = `/context` pokazuje "System prompt" jako osobna kategorie - to tylko core instructions Claude Code
- **14,328 tokens** = API-level cache_read tracking obejmuje system prompt + wszystkie builtin tool descriptions razem (bo sa przesylane w jednym bloku)
- **24,000 tokens** = Claude.ai webapp ma bogatszy system prompt (osobowosc + copyright guidelines + dynamic date injection)

Wnioski: `System prompt` w `/context` !== system prompt w rozumieniu API. Community mierzy rozne rzeczy tym samym terminem.

### 2. System Tools - dominujacy, staly koszt

System tools (24 wbudowane narzedzia Claude Code) to 14,400-17,600 tokens w kazdej sesji. Nie ma opcji ich wylaczenia. To jest "cost of entry" niezaleznie od tego co robisz. W /context to 7-9% calego okna 200k.

Szczegolowe koszty per tool z Piebald-AI repo (Claude Code v2.1.112, 2026-04-16):
- TodoWrite: 2,037 tokens
- Bash: 1,611 tokens
- PowerShell: 1,455 tokens
- Security Review: 2,550 tokens
- REPL Tool: 591 tokens
- WebFetch: 297 tokens

### 3. MCP Tools - najbardziej zmienny i niebezpieczny komponent

Token cost MCP jest **proporcjonalny do liczby tools i szczegolowosci opisow**, nie do liczby serwerow:
- Gmail (7 tools): 2,640 tokens - ale najdrozszy tool (gmail_create_draft) kosztuje 820 sam
- GitHub (91 tools): ~46,000 tokens
- Docker MCP (135 tools): 125,964 tokens - ekstremum

**Kluczowy pattern:** Tool definitions laduja sie przy kazdym API call (nie sa cached miedzy turnami w sensie cost - sa cached w sensie prompt cache). Jesli masz 67k tokens w MCP tools, placi sie za nie (prompt cache rate) w kazdym API call.

**Tool Search (deferred loading):** Gdy MCP tool descriptions > 10k tokens, Tool Search wchodzi automatycznie, reduktujac overhead z ~77k do ~8.7k tokens (85% redukcja). Ale sam tool search dodaje ~500 tokens overhead.

Formula aproksymacyjna (zrodlo: MindStudio):
```
tokens ≈ (liczba_tools × 200) + (suma_znakow_opisow ÷ 4)
```

### 4. CLAUDE.md - Tier Accumulation

Claude Code laduje wszystkie CLAUDE.md w hierarchii:
1. `~/.claude/CLAUDE.md` - global (zawsze)
2. `{project-root}/CLAUDE.md` - projektowy (zawsze gdy w projekcie)
3. `{subdirectory}/CLAUDE.md` - subdirectory (on-demand gdy Claude odwiedza folder)

W `/context` wszystkie CLAUDE.md pokazuja sie razem jako "Memory files" - brak granularnosci per plik w standardowym output.

Empiryczne snapshots "Memory files":
- Lean setup: 302 tokens (wmedia.es example)
- Medium setup: 1,700 tokens (GitHub #11364)
- Implied max (rich global + project): community sugestia <500 tokens dla optymalnego setup

**Wazna zasada z community:** Kazdy token w CLAUDE.md to token w kazdym turnie sesji. 5,000-token CLAUDE.md = 5,000 tokens recyklowanych w kazda wiadomosc. Cel community: <500 tokens global CLAUDE.md.

### 5. Skill Files - Progressive Disclosure vs Reality

**Oficjalny design (per docs):**
- Frontmatter (name + description only): ~100 tokens per skill
- Body (laduje sie gdy skill jest invoked): 1,500-5,000 tokens

**Community observation z GitHub #14882:**
- Uzytkownik reportuje ze `/context` pokazuje pelne skill bodies juz na starcie: 5.5k (Skill Dev), 4.6k (Command Dev), 3.9k (Hook Dev) per skill
- Przy wielu pluginach: 50k+ tokens ze skills samych

**Rozwiazanie:** Nie jest jasne czy to bug czy feature - GitHub #14882 był zamkniety. Autorzy wskazuja na mozliwa rozbieznosc miedzy tym co `/context` pokazuje (potential size) a tym co faktycznie konsumuje API.

**Lean example z /context:** Tylko 61 tokens dla "Skills" przy prostym setupie (wmedia.es). To sugeruje ze progressive disclosure DZIALA przy mniej rozbudowanych skill files.

### 6. Command Files - Zero Baseline Cost

Slash commands (`.claude/commands/*.md` i `~/.claude/commands/*.md`) maja zero kosztu baseline. Body pliku nie jest ladowane do kontekstu na starcie. Dopiero wywolanie `/command-name` powoduje zaladowanie body.

Community measurements z tokrepo.com:
- Pierwsze wywolanie: 500-1,500 tokens (body skill)
- Kolejne wywolania w tej sesji: 2-3 tokens (cached)

Brak bezposrednich `/context` snapshots potwierdzajacych zero-baseline dla command files - to bardziej architekturalny design assumption niz zmierzona liczba.

### 7. Tool Results - Dynamiczny, nielimitowany koszt

Narzedzia (Read, Bash, Grep) zwracaja output ktory wchodzi do kontekstu. Regula kciuka:
- 1 token ≈ 4 znaki
- Linia kodu (~80 znakow) = ~20 tokens
- Read 100 linii = ~400-600 tokens input
- Read 1000 linii = ~4,000-6,000 tokens input
- git log 200 commitow (verbose) = potencjalnie 10,000-50,000 tokens

Community silnie podkresla: tool results to "silent accumulator" - nikt nie mierzy ich na biezaco, ale po godzinie aktywnego developmentu (read, search, bash) mozna latwo dobrac 50,000-100,000 tokens z samych tool results.

---

## Conflicts (Rozbieznosci Liczb)

| Rozbieznosc | Wartosc A | Wartosc B | Wyjasnenie |
|-------------|-----------|-----------|------------|
| System prompt size | 2,600-2,700 (claudefa.st) | 14,328 (dev.to/slima4) | A = "System prompt" w /context (core only); B = full API system block (core + tools cached) |
| System prompt (webapp) | 2,700 (Code) | 24,000 (claude.ai) | Rozne produkty, rozne system prompty |
| Skills baseline | 61 tokens (wmedia.es) | 50,000+ (GitHub #14882) | Zalezy od liczby i rozmiaru skill files oraz implementacji progressive disclosure |
| MCP per-tool average | 64 (SQLite) | 820 (gmail_create_draft) | Roznica miedzy prosta a zlozonum tool description |
| Skill invoke cost | 500-1,500 (tokrepo) | 3,000-5,500 (GitHub #14882) | Roznica w rozmiarze skill files, nie metodologii |

---

## Gaps (Czego Brakuje)

1. **Brak bezposrednich pomiarow Read vs Bash per-line token cost** - community mowi "proporcjonalne do output" ale nikt nie opublikowal tabeli "X linii = Y tokens" z verified methodology
2. **Brak granularnych /context snapshots per CLAUDE.md tier** - widac "Memory files: N tokens" ale nie "global: X, project: Y, subdir: Z"
3. **Progressive disclosure skill loading** - sprzeczne sygnaly (bug vs feature, /context pokazuje potential czy actual?)
4. **Command file baseline** - zero-cost claim logicznie poprawny ale brak /context screenshot jako dowod
5. **Prompt cache TTL i refresh window** - community mowi 1 godzina cache window dla main agent ale brak pomiaru impact na faktyczny token cost przy dlugich sesjach
6. **Subagent token accounting** - jak tokeny subagentow licza sie w /context i /cost parenta?

---

## Citations

1. **claudefa.st - Context Buffer Management** - /context command snapshot z komponentami (system prompt 2.7k, system tools 16.8k, autocompact buffer 33k): https://claudefa.st/blog/guide/mechanics/context-buffer-management

2. **jdhodges.com - MCP Server Token Costs** - Pomiary 4 serwerow (Playwright 3,442, Gmail 2,640, Codex 610, SQLite 385): https://www.jdhodges.com/blog/claude-code-mcp-server-token-costs/

3. **GitHub Issue #11364 - Lazy-load MCP tool definitions** - Community pomiary 7 serwerow MCP: 67,300 tokens (33.7%), propozycja redukcji 85%: https://github.com/anthropics/claude-code/issues/11364

4. **GitHub Issue #14882 - Skills consume full token count** - Skills 5.5k/4.6k/3.9k tokens na starcie, 50k+ przy wielu pluginach: https://github.com/anthropics/claude-code/issues/14882

5. **Piebald-AI/claude-code-system-prompts** - Claude Code v2.1.112 (2026-04-16): 24 builtin tools, per-tool token counts (TodoWrite 2,037, Bash 1,611, WebFetch 297): https://github.com/Piebald-AI/claude-code-system-prompts

6. **HN #43909409 - Claude's system prompt is over 24k tokens with tools** - Webkit+Claude.ai system prompt, community tokenizer verification: https://news.ycombinator.com/item?id=43909409

7. **dev.to/slima4 - Where Do Your Claude Code Tokens Actually Go** - API-level tracking: system prompt 14,328 cache_read constant, compaction summaries 11-19k, 76% efficiency w 4-segment sesji: https://dev.to/slima4/where-do-your-claude-code-tokens-actually-go-we-traced-every-single-one-423e

8. **atcyrus.com - MCP Tool Search Context Pollution** - Scott Spence 143k/200k consumed, MCP_DOCKER 135 tools 125,964 tokens, GitHub 91 tools 46,000 tokens, Tool Search 85% redukcja: https://www.atcyrus.com/stories/mcp-tool-search-claude-code-context-pollution-guide

9. **wmedia.es - /context Command Token Usage** - /context snapshot: system prompt 2.6k, system tools 17.6k, MCP tools 907, custom agents 935, memory files 302, skills 61, messages 30.5k: https://wmedia.es/en/tips/claude-code-context-command-token-usage

10. **gist.github.com/johnlindquist - 54% token reduction** - File compression: skills-rules.md 70%, identity.md 82%, logging-preferences.md 78%, compressed skills 93%, overall initial context 54% redukcja: https://gist.github.com/johnlindquist/849b813e76039a908d962b2f0923dc9a

11. **codewithseb.com - Claude Code Skills Token Savings** - 10 skills = ~1,000 tokens przy progressive disclosure (vs 50k+ bez); 25k token budget dla re-attached skills: https://www.codewithseb.com/blog/claude-code-skills-reusable-ai-workflows-guide

12. **tokrepo.com - Save Token Costs with Skills** - Command file invoke: 500-1,500 tokens pierwsze uzycie, 2-3 tokens kolejne; /compact redukcja 85%: https://tokrepo.com/en/guide/save-token-costs

13. **MindStudio - MCP Server Token Overhead** - Formula aproksymacyjna: tokens ≈ (tools × 200) + (chars ÷ 4); typical 4-server setup: 15,000-20,000 tokens: https://www.mindstudio.ai/blog/claude-code-mcp-server-token-overhead

14. **MindStudio - Token Management Hacks** - Bash tool: 245 tokens fixed overhead per API call; tool results silent accumulation 50k-100k/hour: https://www.mindstudio.ai/blog/claude-code-token-management-hacks-3

---

## BRAMA 2 Status

**R5 PASS** - Raport gotowy do CRITIC review.

Kluczowe liczby zebrane i skategoryzowane z podzialem na metodologie. Najwazniejsze odkrycia dla kampanii:
- System tools: 14,400-17,600 tokens (staly, nieuchronny koszt)
- MCP tools: 385 - 125,964 tokens (zalezy od liczby i bogatosci tool definitions)
- Tool Search: 85% redukcja MCP overhead (od v2.1.x)
- CLAUDE.md: kumuluje sie przez tiers, community target <500 tokens global
- Skills: roznica miedzy progressive disclosure (61 tokens frontmatter) a full-body loading (3-6k per skill) - rozbieznosc wymaga CRITIC weryfikacji
- Command files: zero baseline, body laduje sie tylko na inwokacje

**Confidence score: 0.78** - Liczby z /context command sa wiarygodne (primary source), ale brak granularnych pomiarow dla Read/Bash tool results i nierozwiazana rozbieznosc przy skill loading.
