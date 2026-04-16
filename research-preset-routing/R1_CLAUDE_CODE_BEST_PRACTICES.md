# R1: Claude Code - najlepsze praktyki konfiguracji

## Zrodla
1. [Best Practices - Claude Code Docs](https://code.claude.com/docs/en/best-practices)
2. [Agent Teams - Claude Code Docs](https://code.claude.com/docs/en/agent-teams)
3. [Costs - Claude Code Docs](https://code.claude.com/docs/en/costs)
4. [Skills - Claude Code Docs](https://code.claude.com/docs/en/skills)
5. [Compaction - Claude API Docs](https://platform.claude.com/docs/en/build-with-claude/compaction)
6. [Context Windows - Claude API Docs](https://platform.claude.com/docs/en/build-with-claude/context-windows)
7. [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice)
8. [wshobson/agents](https://github.com/wshobson/agents) - 182 agentow, 16 orkestratorow, 149 skills
9. [wshobson/commands](https://github.com/wshobson/commands) - production-ready slash commands
10. [Context Engineering - Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html)
11. [MCP Token Costs - J.D. Hodges](https://www.jdhodges.com/blog/claude-code-mcp-server-token-costs/)
12. [System prompt bloat issue #46339](https://github.com/anthropics/claude-code/issues/46339)
13. [Token Optimization Guide](https://buildtolaunch.substack.com/p/claude-code-token-optimization)
14. [CLAUDE.md Best Practices - UX Planet](https://uxplanet.org/claude-md-best-practices-1ef4f861ce7c)
15. [Writing a good CLAUDE.md - HumanLayer](https://www.humanlayer.dev/blog/writing-a-good-claude-md)

---

## 1. CLAUDE.md / System Instructions

### Oficjalne rekomendacje Anthropic
Trzy lokalizacje: `~/.claude/CLAUDE.md` (globalny), `./CLAUDE.md` (projektowy), `./subdir/CLAUDE.md` (per-directory).

**Rekomendowany rozmiar: ponizej 200 linii per plik.** Kazda linia powinna przejsc test: "Czy usuniecie tego spowoduje ze Claude popelni blad?" Rozdete CLAUDE.md powoduja ignorowanie instrukcji.

### Typowy narzut tokenowy
- CLAUDE.md 5,000 tok = 5,000 tok kosztu ZANIM wpiszesz slowo, przy KAZDYM turnie
- Deweloperzy z 4 pluginami: 35-40K tokenow narzutu (CLAUDE.md + MEMORY.md + tool definitions)
- System prompt wzrosl o ~40-50% miedzy wersjami v2.1.92 a v2.1.100
- Hidden overhead: 60-80% calkowitego zuzycia tokenow

### Rekomendowane sekcje CLAUDE.md (z analizy spolecznosci)
1. Project overview - 1-2 zdania
2. Tech stack
3. File structure (KLUCZOWE)
4. Coding conventions (NIE style rules - to robi linter)
5. Testing patterns
6. Build/deploy commands
7. Common workflows
8. Known gotchas
9. Architecture decisions
10. What NOT to do

### Stan naszego projektu
Nasz CLAUDE.md ma ~39,478 bajtow (~10,000 tokenow) - **2x wiecej niz rekomendowane.** Wiekszosc to historia wersji v1-v32.16.

---

## 2. Commands / Skills

### Organizacja commands (best practices)
- wshobson/agents: 182 agentow, 149 skills, 96 commands w 77 pluginach
- Popularne wzorce: workflows/ (multi-agent), tools/ (single-purpose), bilingual PL/EN

### Skills vs Commands
Skills uzywaja **progressive disclosure** w 3 warstwach:
1. Metadata (~100 tok per skill) - ladowane przy starcie
2. Body - ladowane przy wywolaniu
3. Referenced files - ladowane on-demand

42 presety jako skills = ~4,200 tok metadanych (42 x 100).
42 presety jako commands = zero kosztu do momentu `/nazwa`.

### Deferred Tool Search
Redukuje narzut MCP tools o 85% (z 77K do 8.7K tokenow).

---

## 3. Context Window Management

### Typowy rozklad zuzycia
- System prompt (Anthropic): ~8-12K tok
- CLAUDE.md + MEMORY.md: 5-15K tok
- Tool definitions (MCP): 7-35K tok (z Tool Search: ~3-9K)
- Conversation history: rosnie liniowo
- File reads / tool outputs: pelne outputy (nie streszczenia!)

### Best practices
1. **Jedna sesja = jedno zadanie, max 20 iteracji**
2. **/compact przy ~60% zapelnienia** (nie czekaj na auto-compact przy 95%)
3. **/compact z instrukcja zachowania** - podawaj co zachowac
4. **/clear miedzy zadaniami**
5. **Subagenty do verbose outputu** - verbose zostaje w subagent context
6. **CLI tools zamiast MCP** - gh, aws, gcloud sa bardziej context-efficient
7. **Markdown format** - zuzywa mniej tokenow niz inne formaty

---

## 4. Agent Routing / Preset Selection

### Oficjalne Agent Teams
Eksperymentalna (od v2.1.32). Jeden lead + 2-16 sesji. Zuzycie: ~5-7x wiecej niz single session.

### oh-my-claudecode
Auto-routing: proste -> Haiku, zlozoone -> Opus. Oszczednosc 30-50%.

### Kluczowy finding
**Nikt publicznie nie zbudowal auto-routera na 42 presety.** wshobson/agents ma 7 preset teams. Nasz system jest unikalny w skali.

---

## 5. Token Efficiency - strategie

### A. Lazy Loading / Progressive Disclosure
Kluczowy pattern 2026. Trzy warstwy: Discovery (nazwy ~100 tok) -> Activation (instrukcje) -> Execution (materialy).

### B. Model routing
Opus: orkiestracja, decyzje. Sonnet: workhorse. Haiku: skanowanie, lekki research. Oszczednosc 30-50%.

### C. Subagent isolation
Osobne okna kontekstowe. Verbose output w subagent context, streszczenie do parent.

### D. Session hygiene
Max 20 iteracji, /compact po milestone, /clear miedzy zadaniami.

### E. CLAUDE.md diet
<200 linii, usuwaj historie, style -> linter.

---

## Rekomendacje dla naszego projektu

### PRIORYTET 1: Odchudzenie CLAUDE.md
Wydzielic historie wersji do VERSIONS.md. Cel: <200 linii, <5K tokenow. Oszczednosc: ~5,000 tok per turn.

### PRIORYTET 2: Commands zostaja (poprawne podejscie)
42 presety jako commands = lazy-loaded, zero kosztu. Rozwazyc migracje top 5-10 do skills (automatyczne discovery).

### PRIORYTET 3: Auto-routing presetow
Opcje: (a) Skill z tabela decyzyjna, (b) Haiku kaskadowy selektor, (c) Tag-based matching w CLAUDE.md (~200 tok).

### PRIORYTET 4: Kompakcja miedzy fazami
Ustandaryzowac w CLAUDE.md: "po kazdej fazie /compact z instrukcja zachowania decyzji."

### Kluczowe liczby

| Metryka | Wartosc |
|---------|---------|
| Nasz CLAUDE.md | ~39KB / ~10K tok |
| Rekomendowany CLAUDE.md | <200 linii / <5K tok |
| Commands (EN) | 369KB / ~92K tok (lazy) |
| Skills | 84KB / ~21K tok (lazy) |
| System prompt overhead | ~8-12K tok |
| Smart routing oszczednosc | 30-50% |
