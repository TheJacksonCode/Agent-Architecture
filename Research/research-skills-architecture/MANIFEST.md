# MANIFEST - Claude Code Skills Architecture 2026

**Kampania:** Tier 2 #1 Research Roadmap 2026
**Data startu:** 2026-04-17
**Preset:** /deep-research-v2 (17 agentow, STANDARD routing)
**Orkiestrator:** Claude Opus 4.7

## Zadanie

Deep Research v2 dla "Claude Code Skills Architecture 2026". Uzytkownik (Maciej) ma juz dzialajacy system 35 skills + 42 commands (v32.16 Agent Architecture Designer) - badanie ma byc SYSTEMATYZUJACE wiedzy o Skills, nie uczace od zera co to jest skill. Target: SYNTHESIS.md 8-10k slow + 4 pliki NbLM (00_FUNDAMENTALS, 01_PATTERNS, 02_DECISION_GUIDE, 03_MEDIA_PROMPTS).

## 7 pytan badawczych (z MASTER_PLAN)

- R1 Skills Official Docs - frontmatter spec, loading mechanics, progressive disclosure
- R2 Frontmatter Deep Dive - kazde pole, edge cases, deprecated, plugin-specific
- R3 Skill Invocation Paths - Skill tool vs /name vs description-match auto-trigger, priority
- R4 Skill Chaining + Composition - czy skill moze wolac skill, rekurencja, orchestrator+worker
- R5 Skill vs Command vs Agent - decision tree, token economics, overlap zones
- R6 Plugin Skills vs Standalone - namespacing, plugin.json, marketplace distribution 2026
- R7 Community Patterns 2026 - awesome-claude-code, popular skills, quality signals, anti-patterns

## Decyzje Architektoniczne

**DD01 Routing STANDARD** - Orchestrator/Critic/Syntetyk Opus, 7 Researchers Sonnet, 7 Extractors Haiku. Uzasadnienie: kampania systematyzujaca (nie compliance/audyt), optymalne koszt/jakosc.

**DD02 Researcher role mapping** (odejscie od domyslnego swarm-pro bo kampania jest techniczna-dokumentacyjna a nie UX-heavy):
- R1 -> res_docs (Anthropic docs primary)
- R2 -> res_tech (frontmatter spec techniczne)
- R3 -> res_tech (invocation paths techniczne)
- R4 -> res_github (skill chaining - pattern analysis z repos)
- R5 -> res_tech (decision tree Skill/Command/Agent)
- R6 -> res_docs + community (plugin marketplace distribution)
- R7 -> res_reddit + res_x (community patterns) - ale DD02a: przypisze res_reddit do R7, res_x do R6 community component, res_forums do R4 forum-verified patterns, res_ux do R5 decision tree UX

**Ostateczny mapping 7 researcherow -> 7 pytan:**
| # | Skill | Pytanie |
|---|-------|---------|
| 1 | res_docs | R1 Official Docs |
| 2 | res_tech | R2 Frontmatter Deep Dive |
| 3 | res_tech | R3 Invocation Paths (drugi res_tech - override ad-hoc) |
| 4 | res_github | R4 Skill Chaining (repos) |
| 5 | res_ux | R5 Decision Tree Skill/Command/Agent |
| 6 | res_x | R6 Plugin Skills + Marketplace |
| 7 | res_reddit | R7 Community Patterns |

DD02b: res_forums nie uzyty (kampania nie ma silnego StackOverflow/HN footprinta dla Skills jako niszy), drugi res_tech reuse - to override ad-hoc zgodny z MASTER_PLAN ("trzymaj 7 agentow dla parallelizmu").

**DD03 Haiku dla Extractorow** - standard preset, structured JSON output, 15x taniej vs Opus. Fallback Sonnet jesli JSON nie parsuje (unlikely dla 15-30 claim format).

**DD04 Target SYNTHESIS 8-10k slow, 5-7 Parts** - zgodny z BRAMA 5 (6-12k range). Parts wstepnie: (1) Fundamenty, (2) Frontmatter Spec, (3) Invocation & Loading, (4) Chaining Patterns, (5) Skill vs Command vs Agent, (6) Plugin Distribution, (7) Community 2026.

**DD05 NbLM 4 pliki zamiast 3** - MASTER_PLAN docelowo ma 4 pliki (00 Fundamentals, 01 Patterns, 02 Decision Guide, 03 Media Prompts). Uzytkownik wprost zazyczyl w briefie.

**DD06 Cytation format R<N>.C<M>** - kazda teza w SYNTHESIS linkuje do claimu z extracta.

## Stack Technologiczny

N/A (kampania badawcza, output = markdown). Pipeline: Agent tool parallel, Write/Read/Grep tools, model param routing.

## Known Risks

- R1 Skills ewoluuje szybko (Anthropic moze wydac spec v2 w trakcie kampanii) - cytuj version explicite
- R4 Skill chaining moze byc underdocumented - awaitable, Critic moze to flagowac jako gap
- R6 Plugin marketplace 2026 - niestabilny temat, moze nie byc danych
- R7 community patterns - awesome-claude-code repo moze miec malo wysokiej jakosci skills (bias na quantity)
- Haiku Extractor moze miss nuance - Critic czyta raw prose zeby to zlapal
- Duplikacja z kampania Subagents Research - unikamy (R7 Subagents opisuje jak AGENT uzywa Skills, my tu od strony SKILLS)

## Open Questions do CRITIQUE

- Max dlugosc description (token budget przy wielu skills) - pytanie do R1+R2
- Czy description cache sie razem z system prompt - pytanie do R1
- Plugin skill vs user skill konflikt priority - R6
- Skill moze invokowac Command (cross-paradigm)? - R4
- when_to_use field - czy nadal oficjalny czy deprecated - R2
- user-invocable field semantyka (true/false/when) - R2

## Polaczenie z innymi kampaniami

- Kampania Subagents (planowana) - ONI opisuja jak agent wykonuje skill; TU opisujemy jak zaprojektowac skill
- Kampania Context Engineering (planowana) - token cache interaction
- Kampania MCP (planowana) - MCP tool vs Skill capability overlap

## Status BRAMA 1

Kryterium: 7 konkretnych pytan badawczych w MASTER_PLAN (nie abstrakcyjnych).

Werdykt: **PASS** - R1-R7 maja konkretny scope (frontmatter spec, invocation paths, chaining, decision tree, plugin namespacing, community patterns), nie "zbadaj X". Kazde pytanie ma jasne deliverable (co musi byc w raporcie zeby uznac za odpowiedziane).

Przechodze do Fazy 1 RESEARCH (7 researcherow parallel na Sonnet).
