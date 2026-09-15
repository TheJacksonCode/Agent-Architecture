# MASTER_PLAN - Claude Code Prompt Caching 2026

**Kampania:** Wild card #3 (suggested 2026-04-17)
**Data przygotowania:** 2026-04-17 (gotowe do odpalenia)
**Preset:** `/deep-research-v2` (17 agentow, map-reduce + Extractor phase)
**Model routing:** STANDARD (Orch/Critic/Syntetyk Opus, Researchers Sonnet, Extractors Haiku)
**Target output:** SYNTHESIS.md 7-9k slow + 3 pliki NbLM + 03_MEDIA_PROMPTS.md 9.5/10

## Zadanie

Deep Research v2 dla tematu "Prompt Caching w Claude Code + API 2026". Jak swiadomie projektowac sesje pod cache-first design, zeby tnac koszt 10x+ na dlugich pipeline'ach.

## Scope kampanii

1. Cache breakpointy: jak Anthropic API identyfikuje cache hits, cache_control parameter, ephemeral cache
2. TTL: 5-min default, 1-hour enterprise, kiedy cache jest inwalidowany (system prompt change, tools change)
3. Pricing economics: write (1.25x) vs read (0.1x) - break-even analiza
4. Cache w Claude Code (nie tylko API): jak sesja wykorzystuje cache, co jest cacheable (system prompt, tools, CLAUDE.md)
5. Strategia cache-first design: struktura promptow, kolejnosc (static first), stabilne vs dynamiczne bloki
6. Batch API + caching interaction
7. Monitoring cache hits: API response fields (cache_read_input_tokens, cache_creation_input_tokens)

## 7 pytan badawczych

**R1 (API Spec + Cache Control)** - Oficjalne docs Anthropic na prompt caching: cache_control param, ephemeral type, breakpoint semantics, max 4 breakpointy, kolejnosc (cache jest prefiksowy, wiec content po breakpoint nie jest cached). Konkretne JSON examples.

**R2 (TTL + Invalidation)** - 5-min default TTL, 1-hour beta, kiedy cache jest inwalidowany (change tools, change system prompt, message content). Edge cases: co jesli dodam jedna wiadomosc, co jesli zmienie narzedzie.

**R3 (Pricing Economics)** - 1.25x write, 0.1x read (vs base), break-even formula (jak dlugo musi trwac cache zeby sie oplacalo), empiryczne przypadki. Comparison ze Sonnet/Opus/Haiku - czy pricing ratios sa takie same.

**R4 (Caching w Claude Code)** - Jak CLI CCh wykorzystuje cache: czy system prompt jest auto-cached, czy tools sa cached, co dzieje sie po /compact (cache reset?), czy mozna wymusic cache hit.

**R5 (Cache-first Design Strategy)** - Jak strukturyzowac prompty dla max cache hit: static content first (system prompt, tools, CLAUDE.md), dynamic content last (current task). Kolejnosc messages. Anti-patterns.

**R6 (Batch API + Caching)** - Batch API interaction z caching, czy jednakowe prompty w batch sa cached, 50% discount na Batch multiplikuje sie z 90% discount na cache read?

**R7 (Monitoring + Community Patterns)** - Jak monitorowac cache hits (response.usage.cache_read_input_tokens), dashboard patterns, Reddit/X wpisy o oszczednosciach, konkretne case studies "przed -> po cache" z kwotami.

## Struktura output

```
Research/research-prompt-caching/
  MASTER_PLAN.md
  MANIFEST.md, PROGRESS.md
  research/ + extracts/ + plans/ + NbLM/
```

## Fazy i agenci

STANDARD routing (jak Context Engineering): 1+7+7+1+1+1 = 17 agentow.

## Known risks

- Beta features (1h cache) moga sie zmienic - cytuj wersje API
- Pricing moze sie wahac - cytuj date ksztaltow
- Cache behavior w CCh moze byc closed-source - oczekuj gapow

## Open questions do CRITIQUE

- Czy Batch + Caching sie mnozy czy alternatywa?
- CLI Claude Code auto-caches CLAUDE.md czy nie?
- Czy prompt_caching jest dostepny dla wszystkich Anthropic tiers czy tylko Pro/Enterprise?
- Max 4 breakpointy - dla niektorych modeli inne?

## Naturalne polaczenie z Context Engineering

Ta kampania moze byc odpalona po Context Engineering (share R1/R4 findings) albo rownolegle. Syntezy mozna potem polaczyc w jeden "Token Economy 2026" master-document.
