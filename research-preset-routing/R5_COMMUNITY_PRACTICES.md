# R5: Spolecznosc - praktyki i wzorce uzytkownikow AI tools

## Zrodla
- [claude-code-best-practice (shanraisshan)](https://github.com/shanraisshan/claude-code-best-practice)
- [Stop Bloating Your CLAUDE.md](https://alexop.dev/posts/stop-bloating-your-claude-md-progressive-disclosure-ai-coding-tools/)
- [How Boris Uses Claude Code](https://howborisusesclaudecode.com)
- [Your CLAUDE.md Is Probably Too Long](https://tianpan.co/blog/2026-02-14-writing-effective-agent-instruction-files)
- [HN: 18-agent autonomous workflow](https://news.ycombinator.com/item?id=46663702)
- [HN: 24 Simultaneous agents](https://news.ycombinator.com/item?id=47099597)
- [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules)
- [The Real Cost of AI Coding 2026 (Morph)](https://www.morphllm.com/ai-coding-costs)
- [Token Optimization Guide](https://buildtolaunch.substack.com/p/claude-code-token-optimization)
- [AI Model Routing Guide (Augment Code)](https://www.augmentcode.com/guides/ai-model-routing-guide)
- [Effective Context Engineering (Anthropic)](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Context Engineering arxiv 2603.09619](https://arxiv.org/pdf/2603.09619)

---

## Kluczowe wnioski

### 1. CLAUDE.md: mniej znaczy wiecej (SILNY konsensus)
Mediana dobrze dzialajacego pliku instrukcji: **300-350 slow**. Pliki >1000 slow = NEGATYWNA korelacja z jakoscia. Boris Cherny (tworca Claude Code) uzywa ~100 linii.

**Progressive disclosure:** CLAUDE.md = "clean index" pod 80 linii kierujacy do plikow ladowanych na zadanie.

### 2. Command -> Agent -> Skill: trojwarstwowa architektura
- **Commands** - lekkie szablony, wstrzykiwane do kontekstu
- **Agents** - autonomiczni aktorzy z izolowanym kontekstem
- **Skills** - bloki wiedzy z progressive disclosure (YAML frontmatter zawsze, body on-demand)

### 3. Model routing oszczedza 40-70%
60% zadan = Haiku, 30% = Sonnet, 10% = Opus. 3-tier routing oszczedza 51% vs uniformowy Opus. Typowy koszt: $13/dev/dzien, $150-250/dev/miesiac enterprise.

### 4. Git worktree = standard izolacji
Boris Cherny: 10-15 rownoczesnych sesji, kazda z worktree. Subagenty z `isolation: worktree`.

### 5. Cursor .cursorrules -> .mdc migracja
Od monolitycznego do modularnych .cursor/rules/*.mdc z glob matching. Mapuje sie 1:1 na Claude skills.

---

## Problemy i rozwiazania

| Problem | Rozwiazanie |
|---------|-------------|
| CLAUDE.md ignorowane po 500+ slow | Progressive disclosure: 80-liniowy index + lazy loading |
| Instrukcje przestrzegane w ~70% | Hooks w settings.json daja 100% compliance |
| Parallel agents edytuja te same pliki | Git worktree per agent |
| Token bloat w dlugich sesjach | /compact po kazdej fazie, fresh context na major phases |
| Multi-agent loops | Explicit workflow > emergent coordination |
| Regresja jakosci Claude (kwiecien 2026) | Anthropic obnizylo effort level; uzytkownicy przywracaja "high" |

---

## Rekomendacje

**R5.1 - CLAUDE.md audit:** wydzielic historie wersji, target 80-150 linii.
**R5.2 - Hooks enforcement:** krytyczne reguly (nie nadpisuj wersji, nie uzywaj em-dash) via hooks, nie tylko instrukcje.
**R5.3 - Model routing potwierdzony:** 10/30/60 Opus/Sonnet/Haiku optymalny.
**R5.4 - Worktree isolation per agent:** deklarowac w presetach typu deep_research_swarm_pro.
**R5.5 - Skill-based architecture:** encyclopedia agentow jako skill per agent, ladowany on-demand.
**R5.6 - Context engineering > prompt engineering:** budzetowanie kontekstu per agent (juz robimy z CTX_BASELINE).
**R5.7 - Monitorowanie regresji:** fallback strategies na degradacje modelu.
