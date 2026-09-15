# MASTER_PLAN - Claude Code Skills Architecture 2026

**Kampania:** Tier 2 #1 z Research Roadmap 2026
**Data przygotowania:** 2026-04-17 (gotowe do odpalenia)
**Preset:** `/deep-research-v2` (17 agentow, map-reduce + Extractor phase)
**Model routing:** STANDARD (Orch/Critic/Syntetyk Opus, Researchers Sonnet, Extractors Haiku)
**Target output:** SYNTHESIS.md 8-10k slow + 3 pliki NbLM + 03_MEDIA_PROMPTS.md 9.5/10

## Zadanie

Deep Research v2 dla tematu "Claude Code Skills Architecture 2026". Maciej ma 35 skills + 42 commands w swoim systemie (v32.16) - potrzebuje systematycznej wiedzy o tym jak Anthropic zaprojektowal Skills system i jak build "premium" skill sets.

## Scope kampanii

1. Skills system fundamentals: progressive disclosure (description in frontmatter -> body loaded on demand), auto-loading
2. Skill file anatomy: frontmatter fields (name, description, type?, user-invocable?, when_to_use), body structure, examples
3. Skill invocation: automatyczne (description match) vs eksplicite (/name), Skill tool vs inline invocation
4. Skill chaining: jeden skill wola drugi, patterns for composition
5. Skill vs Command vs Agent: decision tree, token cost porownanie, overlap zones
6. Plugin skills (namespaced `plugin:skill-name`) vs standalone, user-level vs project-level
7. Community patterns: awesome-claude-code lists, quality indicators, popular skills 2026

## 7 pytan badawczych

**R1 (Skills Official Docs)** - Anthropic docs na Skills: frontmatter spec (wszystkie pola, required vs optional), file location (~/.claude/skills/, .claude/skills/), loading mechanics, description-match vs slash invocation, progressive disclosure rationale.

**R2 (Frontmatter Deep Dive)** - Kazde pole frontmatter: `name`, `description`, `user-invocable`, `type`, `when_to_use`, `model`, inne. Example wartosci, edge cases (Unicode, long descriptions), deprecated fields, plugin-specific fields.

**R3 (Skill Invocation Paths)** - Skill tool vs /name slash command vs description-match auto-trigger. Kiedy ktora sciezka sie uruchamia. Priority gdy konflikt. Jak Claude Code decyduje czy zaproponowac skill czy wywolac od razu.

**R4 (Skill Chaining + Composition)** - Czy jeden skill moze invokowac inny (Skill tool inside skill), rekurencja, wzorce composition ("orchestrator skill" + "worker skills"). Real-world examples z awesome-claude-code.

**R5 (Skill vs Command vs Agent)** - Decision tree: Skill (specialized knowledge/capability), Command (orchestration/slash action), Agent (via Task tool, isolated). Overlap zones: co zrobic jesli mozna reprezentowac jako kazde z 3. Token economics.

**R6 (Plugin Skills vs Standalone)** - Plugin namespacing `vercel:deploy`, kiedy uzytkownik widzi, jak plugins sie instaluja, plugin.json spec, distribution via marketplace (2026 status), user-invocable w plugin context.

**R7 (Community Patterns 2026)** - Popular skills (awesome-claude-code repos, Reddit recommendations), quality signals (frontmatter discipline, body structure), premium skill authors, anti-patterns (skill as config dump, skill as FAQ).

## Struktura output

```
Research/research-skills-architecture/
  MASTER_PLAN.md
  MANIFEST.md, PROGRESS.md
  research/ + extracts/ + plans/ + NbLM/
```

## Fazy i agenci

STANDARD routing: 1+7+7+1+1+1 = 17 agentow.

## Known risks

- Skills system ewoluuje - cytuj version (2026 stan)
- Plugin-skill interaction moze byc niedoudokumentowany
- Maciej ma juz wlasny system (35 skills) - badanie ma byc systematyzujace, nie uczace ego "co to jest skill"

## Open questions do CRITIQUE

- Max dlugosc description (token budget przy wielu skills)?
- Czy description cache sie razem z system prompt?
- Plugin skill + user skill konflikt - kto wygrywa?
- Skill moze invokowac Command? (cross-paradigm)

## Polaczenie z innymi kampaniami

- Subagents research (jak agent uzywa skills)
- Context Engineering (ile zjada skills caching)
- MCP research (MCP tools vs Skill - same tool, rozne paradygmaty?)
