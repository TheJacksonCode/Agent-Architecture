# MASTER_PLAN - Claude Code CLAUDE.md Patterns 2026

**Kampania:** Tier 1 #3 z Research Roadmap 2026
**Data startu:** 2026-04-17
**Preset:** `/deep-research-v2` (17 agentow, map-reduce + Extractor phase)
**Model override:** WSZYSCY agenci na **Opus 4.7** (user explicit request - stress test Opus 4.7)
**Target output:** SYNTHESIS.md 8-10k slow + 3 pliki NbLM + **03_MEDIA_PROMPTS.md 9.5/10 quality** (user explicit: "3/10 -> 9.5/10")

**Media prompts quality gate:** 03_MEDIA_PROMPTS.md MUSI byc 9.5/10 profesjonalny, estetyczny, zgodny z najnowszymi trendami 2026 w zakresie infografik i video prompts. NbLM-writer czyta shared research `Research/_shared/media_prompts_standards/R8_media_prompts_2026.md` i stosuje te standardy.

## Zadanie od uzytkownika

> "CLAUDE.md: Dean Patel's project / user / global patterns"

(Rozszyfrowane z mowy: **CLAUDE.md patterns** - project vs user vs global ~/.claude/CLAUDE.md)

## Scope kampanii

Temat: **Claude Code CLAUDE.md best practices 2026** - kompletna wiedza o:
1. 3 typy CLAUDE.md: **project** (./CLAUDE.md), **user** (~/.claude/CLAUDE.md), **global/managed** (enterprise-level)
2. Auto-loading mechanics: kiedy jest re-read, jak trafia do kontekstu, koszt tokenow
3. Zasady pisania: co WRZUCAC (conventions, commands, architecture), co NIE (ephemera, duplicates of code)
4. Multi-file patterns: rozbijanie na `docs/*.md` + `@import`, organizacja dla duzych projektow
5. Frontmatter + metadata (jesli istnieje)
6. Interakcja z skills/commands/hooks/MCP: jak te systemy korzystaja (lub nie) z CLAUDE.md
7. Anti-patterns: real-world failures, conflicts, context bloat

## 7 pytan badawczych (podzial R1-R7)

**R1 (Tech / Primary Sources)** - Oficjalne docs Anthropic (docs.claude.com): jak CLAUDE.md dziala, @import syntax, hierarchical loading, plugin CLAUDE.md, managed CLAUDE.md. Cytuj sekcje docs dokladnie.

**R2 (3 Tiers Deep Dive)** - Project (./CLAUDE.md) vs User (~/.claude/CLAUDE.md) vs Global (Managed) CLAUDE.md: precedensja w kontekscie, merge semantyka, kolejnosc ladowania, konkretne use cases dla kazdego tiera.

**R3 (Auto-loading Mechanics)** - Auto-loading: kiedy plik jest re-read (start sesji, po /compact, po zmianie cwd?), ile tokenow zuzywa w kontekscie, czy jest w cache prompta, interakcja z auto-compact, discovery mechanika (cd do subfolderu).

**R4 (Writing Best Practices)** - Co wrzucac a co NIE: patterns z oficjalnych docs (Anthropic best practices), realne CLAUDE.md z duzych repos, anti-patterns z community (zbyt dlugie, duplikacja kodu, ephemera, secrets). Mid-level abstractions rule.

**R5 (Multi-file + Organization)** - Rozbijanie CLAUDE.md: `@path/to/file.md` import syntax, splitting by topic (docs/architecture.md, docs/testing.md), lazy-load patterns, plugin CLAUDE.md overlay.

**R6 (Skills/Commands/MCP Interaction)** - Jak CLAUDE.md wspolpracuje z innymi systemami: skills discovery, commands availability hints, hook references, MCP server info. Czy AGENTS.md byl predecessor? Czy CLAUDE.md ma priority nad system prompt/environment?

**R7 (Community Patterns + Anti-patterns)** - Real-world CLAUDE.md z public repos (awesome-claude-code listy), Reddit/HN/dev.to opinie, X patterns. Konkretne "wow to genialne" i "nigdy tego nie rob". Metryki skutecznosci (czy ktos mierzyl roznice w jakosci z/bez CLAUDE.md).

## Struktura output

```
Research/research-claude-md-patterns/
  MASTER_PLAN.md            # ten plik
  MANIFEST.md               # shared scratchpad
  PROGRESS.md               # log postepu
  research/
    R1_official_docs.md
    R2_three_tiers.md
    R3_autoloading.md
    R4_writing_practices.md
    R5_multifile_organization.md
    R6_integrations.md
    R7_community_antipatterns.md
    CRITIC.md
  extracts/
    E1..E7_*.json
  plans/
    SYNTHESIS.md
  NbLM/
    00_FUNDAMENTALS.md
    01_PATTERNS.md
    02_DECISION_GUIDE.md
    03_MEDIA_PROMPTS.md
```

## Fazy

1. **STRATEGIA** - ten plik + PROGRESS + MANIFEST
2. **RESEARCH** - 7 researcherow Opus 4.7 parallel
3. **EXTRACT** - 7 extractorow Opus 4.7 parallel, JSON claim-table
4. **CRITIQUE** - 1 critic Opus 4.7
5. **SYNTEZA** - 1 lean syntetyk Opus 4.7 (early skeleton write)
6. **NbLM-writer** - 3 pliki + media prompts

## Constraints

- Opus 4.7 wszedzie (heavy reasoning + 1M context)
- Citation format `R<N>.C<M>` w SYNTHESIS
- Kazdy researcher min 2000 slow + konkretne przyklady z linkami/commit hashy
- Anti-patterns w R7 musza miec konkretne "ten GitHub / ten thread", nie abstrakcyjne

## Known risks

- `@import` syntax moze byc slabo udokumentowany - oczekuj gaps
- Auto-loading mechanics moze miec quirki nie opisane (interakcja z /compact, hooks)
- "Global CLAUDE.md" dla Managed layer - czy to Managed settings pole czy osobna sciezka?
- Rozroznienie AGENTS.md (deprecated?) vs CLAUDE.md - moze byc mylacy

## Open questions do rozstrzygniecia w CRITIQUE

- Czy `CLAUDE.local.md` istnieje i jest nadal obslugiwany?
- Max size CLAUDE.md po ktorej zaczyna sie truncation?
- Czy plugin CLAUDE.md ma inne priority niz project CLAUDE.md?
- Czy `@import` akceptuje remote URLs czy tylko lokalne paths?
- Co sie dzieje gdy project CLAUDE.md sprzeczne z user CLAUDE.md?

## Docelowy output

SYNTHESIS.md (~8-10k slow) z sekcjami:
- Part 1: CLAUDE.md mental model (3 tiers, kiedy wchodzi w kontekst, token cost)
- Part 2: Auto-loading mechanics (session start, /compact, cd, re-read triggers)
- Part 3: Writing patterns (co wrzucic + co NIE + mid-level abstractions)
- Part 4: Multi-file organization (@import, splitting, plugin overlay)
- Part 5: Integrations (skills, commands, hooks, MCP)
- Part 6: Anti-patterns + failures (context bloat, conflicts, secrets)
- Part 7: Real-world examples (z zaznaczeniem dlaczego dzialaja)
- Appendix A: Quick reference card
- Appendix B: Starter CLAUDE.md template per projekt type
- Appendix C: Open questions
