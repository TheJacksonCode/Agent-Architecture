# MANIFEST - Claude Code Context Engineering 2026

## Zadanie

Deep Research v2 kampania na temat swiadomego zarzadzania oknem kontekstowym, tokenami i cache w dlugich sesjach Claude Code. Target: SYNTHESIS 8-10k slow + 4 pliki NbLM z media prompts 9.5/10.

## Decyzje Architektoniczne

- **DD01 Model routing (STANDARD hybrid):** Orch/Critic/Syntetyk Opus 4.7, Researchers Sonnet 4.6, Extractors Haiku 4.5. Zgodnie z `feedback_deep_research_v2_model_routing.md` - oszczednosc ~5-8x vs all-Opus.
- **DD02 Mapping R<N> -> researcher specialization:**
  - R1 (Primary Sources Anthropic docs) -> res_docs
  - R2 (Prompt Caching Deep Dive) -> res_tech
  - R3 (/compact Mechanics + Strategy) -> res_github
  - R4 (.claudeignore + Context Boundaries) -> res_tech (#2 - ad-hoc override, patrz DD03)
  - R5 (Token Accounting w Praktyce) -> res_forums
  - R6 (Context Anti-patterns + Failures) -> res_reddit
  - R7 (Community Patterns 2026) -> res_x
- **DD03 Override klasycznego podzialu:** Kampania techniczna - bez res_ux (nie ma sensownego scope dla "user experience" context engineeringu). Podwajamy res_tech dla R2 i R4 (oba sa technicznymi deep-dive'ami z API/filesystem). Preset explicit na to zezwala ("zastapic rol ad-hoc researcherami").
- **DD04 Orkiestrator = glowna sesja Claude Code (opus)** - nie delegujemy orchestration do sub-agenta (test w MCP kampanii pokazal ze sub-agenty nie maja Agent tool).
- **DD05 Output scope:** research/R1..R7 (7 raportow >=1500w) -> extracts/E1..E7 (JSON claim-table) -> research/CRITIC.md -> plans/SYNTHESIS.md (8-10k) -> NbLM/{00,01,02,03}.md (media 9.5/10).
- **DD06 Date cut-off:** 2026-04-17.

## Stack Technologiczny

- Preset: /deep-research-v2 (reimplementowany manualnie z glownej sesji)
- Target docs: claude.ai/code, docs.anthropic.com (2026), GitHub anthropics/anthropic-cookbook, anthropic-skills, awesome-claude-code
- Sekundarne: Reddit r/ClaudeAI, X/Twitter, HN, dev.to, github issues claude-code

## Known Risks

- **R-01** Auto-compact heuristics moga byc closed-source - oczekuj gapow w R3
- **R-02** Token counts roznia sie per model (Opus 4.7 vs Sonnet) - R5 musi precyzyjnie rozroznic
- **R-03** .claudeignore syntax moze byc slabo udokumentowany - R4 eskaluje gap jesli brak primary source
- **R-04** Overlap z Prompt Caching kampania (parallel) w R2 - OK, akceptujemy; Syntezy moga byc polaczone w "Token Economy 2026" master-doc pozniej

## Open Questions (do CRITIC)

- Q1 Auto-compact trigger: % context full? time-based? message-count-based?
- Q2 Cache 1h vs 5min - kto moze wlaczyc (tier)?
- Q3 Czy /compact zachowuje tool_use/tool_result blocks czy tylko prose?
- Q4 Rola auto-memory files w budget - czy sa cache-friendly?
- Q5 Czy CLAUDE.md jest cached razem z system promptem?
- Q6 Per-tier rozniac context window (Pro/Team/Enterprise)?
