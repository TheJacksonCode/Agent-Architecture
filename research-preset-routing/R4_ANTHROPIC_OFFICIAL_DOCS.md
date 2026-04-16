# R4: Oficjalna dokumentacja Anthropic - kluczowe wytyczne

## Zrodla
1. [anthropics/claude-code](https://github.com/anthropics/claude-code) - 110k stars
2. [Prompting Best Practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/)
3. [Tool Use Docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
4. [Claude Code Docs](https://code.claude.com/docs/en/overview)
5. J.D. Hodges /context snapshot (April 2026)

---

## 1. CLAUDE.md Best Practices

### Hierarchia
- `~/.claude/CLAUDE.md` - globalny (kazdy projekt)
- `./CLAUDE.md` - projektowy (shared with team)
- `./subdir/CLAUDE.md` - per-directory

### Optymalna dlugosc
Anthropic NIE publikuje oficjalnego limitu. Z pomiarow J.D. Hodges mediana memory files = ~3,300 tokenow. Praktyczna rekomendacja: sumaryczny CLAUDE.md (global + project) < 5,000 tokenow.

**CLAUDE.md jest traktowany jako nadrzedne instrukcje systemowe** - "These instructions OVERRIDE any default behavior."

---

## 2. Commands vs Skills

| Aspekt | Command | Skill |
|--------|---------|-------|
| Trigger | `/name` explicit | Automatyczny LUB `/name` |
| Listing cost | Opis (kilka slow) | Do 1,536 zn ZAWSZE w kontekscie |
| Body cost | Lazy (na zadanie) | Lazy (na zadanie) |
| $ARGUMENTS | Tak | Tak |
| Subagent | Przez Agent tool | Przez `context: fork/agent` |

**Z CHANGELOG v2.1.108:** Commands i Skills konwerguja - model moze odkrywac slash commands via Skill tool.

---

## 3. Context Window Breakdown

### J.D. Hodges measurement (April 2026)

| Component | Tokeny | Udzial |
|-----------|--------|--------|
| System prompt (Anthropic) | ~6,200 | 27.7% |
| Built-in tools | ~11,600 | 51.8% |
| Memory files (CLAUDE.md) | ~3,300 | 14.7% |
| Subagent role body | ~1,000 | 4.5% |
| Skills metadata | ~300 | 1.3% |
| **TOTAL BASELINE** | **~22,400** | **100%** |

### Model context windows
- Opus 4.6: 1,000,000 tok (1M)
- Sonnet 4.6: 1,000,000 tok (1M)
- Haiku 4.5: 200,000 tok (200K)

### Baseline jako % okna
- Opus/Sonnet: 22.4k / 1M = **2.24%**
- Haiku: 22.4k / 200k = **11.2%**

### Context rot severity (Stanford + Morph)
- Safe: <= 50%, Warn: <= 65%, High: <= 75%, Danger: > 80%

---

## 4. Agent Tool Best Practices

### Z oficjalnych pluginow Anthropic (code-review, feature-dev):

1. **Model routing** - Haiku: triage. Sonnet: workhorse. Opus: krytyczne decyzje.
2. **Parallelizacja** - "Launch 4 agents in parallel to independently review"
3. **Izolacja subagentow** - NIE dziela kontekstu. Kazdy ma wlasne okno (dlatego MAX nie SUM).
4. **Allowed-tools** - principle of least privilege
5. **Jawne przekazywanie kontekstu** - subagent nie dziedziczy automatycznie

---

## 5. Memory System

### Hierarchia priorytetow
1. Enterprise managed settings (najwyzszy)
2. ~/.claude/CLAUDE.md (globalny)
3. PROJECT/CLAUDE.md (projektowy)
4. .claude/settings.local.json (lokalny, gitignored)

### Auto-memory
- Lokalizacja: ~/.claude/projects/{hash}/memory/MEMORY.md
- Koszt: wliczony w baseline ~3,300 tok
- Format: linki + 1-zdaniowe opisy, szczegoly w osobnych plikach

---

## 6. Model Selection (April 2026)

| Model | Input | Output | Cache Read | Context |
|-------|-------|--------|------------|---------|
| Opus 4.6 | $15/MTok | $75/MTok | $1.50/MTok | 1M |
| Sonnet 4.6 | $3/MTok | $15/MTok | $0.30/MTok | 1M |
| Haiku 4.5 | $0.80/MTok | $4/MTok | $0.08/MTok | 200K |

### Oficjalny wzorzec (Boris Cherny, Anthropic):
Haiku (triage) -> Sonnet (compliance, summary) -> Opus (bug detection, validation)
Kaskada od taniego do drogiego. Opus TYLKO tam gdzie bledy kosztuja.

---

## Rekomendacje

1. **CLAUDE.md za duzy** - historia 40+ wersji zuzywa ~10-20K tok. Cel: <5K tok.
2. **Commands = poprawne podejscie** - lazy loaded, zero kosztu. Skills lepsze dla auto-discovery.
3. **Context budget system zgodny** - CTX_BASELINE=22,400 z J.D. Hodges. Severity progi zgodne z research.
4. **Model routing potwierdzony** - oficjalny code-review.md uzywa identycznego wzorca (Haiku->Sonnet->Opus).
5. **Subagent isolation poprawna** - MAX (nie SUM) context usage jest correct.
