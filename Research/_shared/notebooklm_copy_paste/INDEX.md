# NotebookLM Copy-Paste Index - 8 kampanii (Tier 1 + Tier 2)

**Data:** 2026-04-17
**Zrodlo trendow:** `Research/_shared/trends_2026_04/TRENDS_BRIEF.md`
**Top 5 trendow zastosowanych:** Bento 2.0, 3-sek cold open warstwowy, Dark Anthropic palette (#141413 / #d97757 / #6a9bcc), Fireship + JetBrains Mono, Explainer 16:9 + Brief 9:16 dual.

## Co wklejasz gdzie

Kazdy temat ma 2 pliki: `notebooklm_video.md` (2 sekcje) + `notebooklm_infographic.md` (1 sekcja + orientacja).

### NotebookLM Studio: Film objasniajacy
1. Ustaw Format: **Film objasniajacy**, Jezyk: **polski**, Styl wizualny: **Niestandardowy**
2. Pole "Opisz niestandardowy styl wizualny" = SEKCJA 1 z `notebooklm_video.md`
3. Pole "Na czym powinni sie skupiac prezenterzy AI" = SEKCJA 2 z `notebooklm_video.md`

### NotebookLM Studio: Infografika
1. Ustaw Jezyk: **polski**, Styl wizualny: **Wybor automatyczny**, Poziom szczegolow: **Szczegolowe BETA**
2. Orientacja: patrz kolumna "Orientacja" ponizej (agent zdecydowal per temat)
3. Pole "Opisz infografike" = SEKCJA 3 z `notebooklm_infographic.md`

## Tier 1 - Fundamenty

| Temat | Video file | Infografika file | Orientacja | Hook video | Key liczby |
|-------|-----------|------------------|------------|------------|------------|
| Hooks Best Practices | [notebooklm_video.md](../../research-hooks-best-practices/NbLM/notebooklm_video.md) | [notebooklm_infographic.md](../../research-hooks-best-practices/NbLM/notebooklm_infographic.md) | **pionowo 9:16** | "Jeden hook. CVSS 8.8. RCE." | 28 eventow lifecycle, exit 0/1/2, 4 typy handlerow, timeouts 600/30/30/60s |
| CLAUDE.md Patterns | [notebooklm_video.md](../../research-claude-md-patterns/NbLM/notebooklm_video.md) | [notebooklm_infographic.md](../../research-claude-md-patterns/NbLM/notebooklm_infographic.md) | **pionowo 9:16** | "93% twojego CLAUDE.md to szum. Pokazujemy co zostawic." | 70% vs 100% compliance, sweet spot 60-100 linii / ceiling 200 / 600+ fail, @import max 5 hopow |
| Settings i Permissions | [notebooklm_video.md](../../research-settings-permissions/NbLM/notebooklm_video.md) | [notebooklm_infographic.md](../../research-settings-permissions/NbLM/notebooklm_infographic.md) | **pionowo 9:16** | "settings.json to wykonywalny kod, nie konfiguracja. Parsowany PRZED trust dialogiem." | 5 scope precedence (Managed>CLI>Local>Project>User), 3 tier deny>ask>allow, YOLO + disableBypassPermissionsMode |

## Tier 2 - Zaawansowane

| Temat | Video file | Infografika file | Orientacja | Hook video | Key liczby |
|-------|-----------|------------------|------------|------------|------------|
| Context Engineering | [notebooklm_video.md](../../research-context-engineering/NbLM/notebooklm_video.md) | [notebooklm_infographic.md](../../research-context-engineering/NbLM/notebooklm_infographic.md) | **pionowo 1200x1500** | "652 069 tokenow stracisz jedna komenda" | 652069 phantom, 83.5% compact, 7.4% CLAUDE.md, 81% cache redukcja |
| Prompt Caching | [notebooklm_video.md](../../research-prompt-caching/NbLM/notebooklm_video.md) | [notebooklm_infographic.md](../../research-prompt-caching/NbLM/notebooklm_infographic.md) | **poziomo 16:9** | "98.3% redukcji kosztow. Jak?" | 90% cache read, 4096/2048 min, 98.3% Haiku+Batch+Cache stack |
| MCP Servers | [notebooklm_video.md](../../research-mcp-servers/NbLM/notebooklm_video.md) | [notebooklm_infographic.md](../../research-mcp-servers/NbLM/notebooklm_infographic.md) | **pionowo 9:16** | "7 MCP zabiera 33.7% kontekstu. 67k tokens juz zniknelo" | 67k tokens / 33.7%, -46.9% Tool Search, CVE-2025-59536 CVSS 8.8, 80% to Skill |
| Subagents + Task Tool | [notebooklm_video.md](../../research-subagents-task-tool/NbLM/notebooklm_video.md) | [notebooklm_infographic.md](../../research-subagents-task-tool/NbLM/notebooklm_infographic.md) | **pionowo 9:16** | "5 subagentow = 250000 tokenow overhead. Gdzie idzie twoja kasa." | recursion depth 1, 20-50k entry tax, 93.8% Opus waste |
| Skills Architecture | [notebooklm_video.md](../../research-skills-architecture/NbLM/notebooklm_video.md) | [notebooklm_infographic.md](../../research-skills-architecture/NbLM/notebooklm_infographic.md) | **pionowo 9:16** | "Skill, Subagent, Hook, MCP. Cztery opcje, jeden wybor." | Bug #17283 context:fork, 4-tier hierarchy, chain max 3-5 |

## Workflow wklejania (per temat)

1. Otworz notatnik tematu w NotebookLM
2. Studio > Generate Video Overview
3. Skopiuj SEKCJA 1 do pole 1, SEKCJA 2 do pole 2, odpal
4. Osobno: Studio > Generate Infographic
5. Ustaw orientacja zgodnie z tabela
6. Skopiuj SEKCJA 3 do pole "Opisz infografike", odpal

## Konwencje

- Stary `03_MEDIA_PROMPTS.md` w kazdym folderze **pozostaje** jako archive S-C-L-M-A / L-C-T-I-M-A-N, ale nie jest source-of-truth dla NotebookLM
- Nowy source-of-truth: 2 pliki `notebooklm_*.md` per temat
- Orientacje: **7 pionowo + 1 poziomo** (Prompt Caching = poziomo dla comparison tables, reszta to hierarchie / decision trees / timeline / scope precedence = top-down pionowo)
- Wszystkie 8 tematow stosuje Dark Anthropic palette #141413 / #d97757 / #6a9bcc + JetBrains Mono + Fireship pacing
- 16 plikow Markdown razem (8 video + 8 infografika) + TRENDS_BRIEF + INDEX
