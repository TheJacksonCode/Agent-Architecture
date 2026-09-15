# MASTER_PLAN - Claude Code Context Engineering 2026

**Kampania:** Tier 1 #4 z Research Roadmap 2026
**Data przygotowania:** 2026-04-17 (gotowe do odpalenia)
**Preset:** `/deep-research-v2` (17 agentow, map-reduce + Extractor phase)
**Model routing:** STANDARD (Orch/Critic/Syntetyk Opus 4.7, Researchers Sonnet 4.6, Extractors Haiku 4.5) - zgodnie z nowym feedback_deep_research_v2_model_routing
**Target output:** SYNTHESIS.md 8-10k slow + 3 pliki NbLM + 03_MEDIA_PROMPTS.md 9.5/10

## Zadanie

Deep Research v2 dla tematu "Claude Code Context Engineering 2026". Jak swiadomie zarzadzac oknem kontekstowym, tokenami i cache w dlugich sesjach.

## Scope kampanii

1. Context window mechanics: 200k/1M, kiedy auto-compact, jak Claude decyduje co zostawic
2. /compact strategies: manual vs auto, kiedy inicjowac, jak przygotowac context do compaction
3. Prompt caching w Claude Code (5-min TTL, breakpointy), nie tylko w API - jak sesja to wykorzystuje
4. Token accounting: ile zajmuje system prompt, tools, CLAUDE.md, skills, commands, MCP output
5. .claudeignore patterns: co wykluczac, regex vs gitignore syntax, interakcja z Read/Grep
6. Context anti-patterns: bloated CLAUDE.md, nadmierne @imports, long-tail tool results
7. Session state: co przezywa /compact, co /resume, rola auto-memory files

## 7 pytan badawczych

**R1 (Tech / Primary Sources)** - Oficjalne docs Anthropic: mechanika context window w Claude Code, 200k vs 1M context, auto-compact triggery, dokladnie jakie algorytmy Anthropic wspomina o token accountingu. Cytuj sekcje docs.

**R2 (Prompt Caching Deep Dive)** - Cache breakpointy w Claude Code API, 5-min TTL, kiedy cache jest resetowany (zmiana system prompt, zmiana tools), economics (cache read vs cache write), 1h cache (enterprise). Konkretne przyklady cost reduction.

**R3 (/compact Mechanics + Strategy)** - Jak dziala /compact pod spodem (heuristics, summary generation, co zachowuje), kiedy automatyczny a kiedy reczny, jak user powinien przygotowac context przed compaction, co mozna stracic.

**R4 (.claudeignore + Context Boundaries)** - Syntax, interakcja z Read/Grep/Glob, rekurencja, negation patterns, konflikt z .gitignore, jak Claude Code wchlania vs nie wchlania pliki. Real examples ignoring dist/, node_modules/, itd.

**R5 (Token Accounting w Praktyce)** - Ile tokenow zajmuje: system prompt CCh, ksiazka narzedzi, CLAUDE.md (per tier), skill file, command file, MCP tool definitions, long Read/Bash outputs. Empiryczne metryki z community (Reddit/GitHub).

**R6 (Context Anti-patterns + Failures)** - Realne przypadki: bloated CLAUDE.md rujnujace quality, recursive @imports, MCP outputs zjadajace context, nadmierne Read bez head_limit. "Co zrobilem zle" threads z Reddit/dev.to/X.

**R7 (Community Patterns 2026)** - Power-user patterns: pre-compact checklists, context budget planning, "session doctrine" approaches, hybrid human/AI context management. Konkretne tweets/posts/repos.

## Struktura output

```
Research/research-context-engineering/
  MASTER_PLAN.md           (ten plik)
  MANIFEST.md              (Phase 0 - orchestrator)
  PROGRESS.md              (Phase 0 - orchestrator)
  research/
    R1_docs.md ... R7_community.md
    CRITIC.md
  extracts/
    E1..E7_*.json
  plans/
    SYNTHESIS.md
  NbLM/
    00_FUNDAMENTALS.md
    01_PATTERNS.md
    02_DECISION_GUIDE.md
    03_MEDIA_PROMPTS.md (9.5/10 quality gate)
```

## Fazy i agenci

| Faza | Agenci | Model |
|------|--------|-------|
| 0 STRATEGIA | 1 orch | Opus 4.7 |
| 1 RESEARCH | 7 parallel | Sonnet 4.6 |
| 2 EXTRACT | 7 parallel | Haiku 4.5 |
| 3 CRITIQUE | 1 | Opus 4.7 |
| 4 SYNTEZA | 1 | Opus 4.7 |
| 5 NbLM + media 9.5/10 | 1 | Opus 4.7 (dla jakosci media) |

## Known risks

- Niektore mechaniki (auto-compact heuristics) moga byc closed-source - oczekuj gapow
- Token counts roznia sie per model (Opus 4.7 vs Sonnet) - precyzyj
- .claudeignore moze byc slabo udokumentowany

## Open questions do CRITIQUE

- Auto-compact trigger: % context full? time-based? message-count-based?
- Cache 1h vs 5min - kto moze wlaczyc?
- Czy /compact zachowuje tool_use/tool_result blocks czy tylko prose?
- Rola auto-memory files w budget - czy sa cache-friendly?
