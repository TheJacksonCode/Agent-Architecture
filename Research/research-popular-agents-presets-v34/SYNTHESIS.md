# Delta-Research: Popularne agenty i presety do dodania (v34)

**Data:** 2026-08-31
**Cel:** ugruntowac decyzje "czy i co dodac" gdy inne repo maja 100+ agentow.
**Zasada reuse:** ten raport NIE powtarza mechaniki (model routing, worktree, taksonomia komend) - to pokrywaja
[[research-preset-routing]] R1/R3/R5/SYNTHESIS. Delta = taksonomia POPULARNYCH ROL agentow i ZESPOLOW, ktorej
tamte raporty nie mialy.

---

## 1. Reuse z istniejacego researchu (nie powtarzam)

- **R1/R3/SYNTHESIS (routing):** wshobson/agents = 182 agenty ale TYLKO 7 preset teams. Fabric ~100 single-agent
  patterns, ZERO multi-agent teamow. Cytat R1: "Nikt publicznie nie zbudowal auto-routera na 42 presety... nasz
  system jest unikalny w skali".
- **R5 (community):** model routing 10/30/60 Opus/Sonnet/Haiku, worktree isolation, Command->Agent->Skill. Mechanika OK.

**Wniosek strategiczny (potwierdzony danymi):** konkurencja wygrywa na BREADTH pojedynczych agentow. NASZ moat =
ZESPOLY (presety) + edukacja + routing modeli/kosztow. Nie gonic za 154-182 agentami (ich teren, rozmycie
tozsamosci, koszt PL/EN x 10-section bento). Rozbudowywac PRESETY; agentow dodawac W SLUZBIE nowych presetow.

## 2. Delta - taksonomia rynku 2026 (web)

Standard de-facto: **VoltAgent/awesome-claude-code-subagents = 154 agenty / 10 kategorii**:
Core Development, Language Specialists, Infrastructure, Quality & Security, Data & AI, Developer Experience,
Specialized Domains, Business & Product, Meta & Orchestration, Research & Analysis.

**7 najczesciej polecanych typow (recurring value):** code-reviewer, test-writer, debugger, security-auditor,
docs-writer, refactorer, context-explorer. (my mamy odpowiedniki: qa_*, res_critic, presety review/bug_hunt).

Kontekst rynku: Claude Code = najpopularniejszy agent codingowy 2026 (~39% profesjonalnych devow), 2x czesciej
niz Copilot. Najgoretsze kategorie zapotrzebowania: **Data & AI (RAG/LLM apps)**, **Infrastructure (DevOps/Cloud)**,
**Accessibility**, **Product**.

## 3. Analiza luk (nasze 47 vs taksonomia)

| Kategoria | Nasz stan | Luka (popularne, ktorych brak) |
|-----------|-----------|--------------------------------|
| Meta/Orchestration | **MOCNY** (orchestrator, synthesizer(_lean), analyst, planner, decision_presenter) | - (nasza tozsamosc) |
| Research | **MOCNY** (7 researcherow + extractor) | - (nasza tozsamosc) |
| Core Development | OK generycznie (backend/frontend/feature/designer/integrator) | mobile (opcjonalnie) |
| Language Specialists | BRAK (swiadomie - generyczne role) | NIE dodawac (katalog, nie nasz teren) |
| **Data & AI** | SLABY (statistician, eda_analyst) | **ai_engineer, ml_engineer, prompt_engineer, data_engineer** |
| **Infrastructure** | SLABY (observability, db_architect) | **devops_engineer, cloud_architect, sre_engineer, kubernetes_specialist** |
| Quality & Security | OK (4x qa, res_critic) | **accessibility_tester**, code_reviewer (preset review istnieje) |
| Business & Product | Czesciowo (gtm, social, career, interview, decision_advisor) | **product_manager, ux_researcher, technical_writer** |
| DX / Specialized | BRAK | seo/game/blockchain - NIE (niszowe, poza misja) |

## 4. Rekomendacja - kandydaci (teams-first, ranking ROI)

### Nowe PRESETY (nasz moat - priorytet)
1. **RAG / AI App Build** 🔥 - ai_engineer + prompt_engineer + backend + qa_security + orchestrator. Najgoretszy temat 2026.
2. **MLOps / ML Pipeline** - ml_engineer + data_engineer + eda_analyst + statistician + qa_quality.
3. **DevOps / CI-CD Setup** - devops_engineer + sre_engineer + observability_engineer + qa_security.
4. **Cloud / K8s Deploy** - cloud_architect + kubernetes_specialist + devops_engineer + observability_engineer.
5. **Accessibility Audit (a11y)** - accessibility_tester + qa_quality + designer + res_ux.
6. **Product Discovery / PRD** - product_manager + ux_researcher + business_analyst(=?) + gtm_strategist (wzmocnienie istniejacego prd_to_launch).

### Nowe AGENCI (tylko ci, ktorzy odblokowuja powyzsze presety - ~10-12)
Data&AI: **ai_engineer, ml_engineer, prompt_engineer, data_engineer**
Infra: **devops_engineer, cloud_architect, sre_engineer, kubernetes_specialist**
Quality: **accessibility_tester**
Product: **product_manager, ux_researcher, technical_writer**

### CZEGO NIE dodawac
Language specialists (python-pro, react-specialist...), niszowe domeny (blockchain, game, embedded, fintech) -
to katalog konkurencji, rozmywa edukacyjna narracje zespolu i mnozy koszt PL/EN. Jesli kiedys - jako lekki tier
bez pelnego 10-section bento.

## 5. Proponowany pierwszy batch (do potwierdzenia scope)
Najwyzszy ROI + spojnosc: **RAG/AI App Build** preset + 2 agenty (ai_engineer, prompt_engineer). Pilotaz nowej
kategorii Data&AI, ocena jakosci/formatu, potem skalowanie na reszte. Kazdy nowy agent = pelny format (AD + SVG +
kolory + speech + knowledge + edu PL/EN + effort + relatedAgents). Kazdy nowy preset = 20 struktur (jak Track F).

**Zrodla (delta):** VoltAgent/awesome-claude-code-subagents (154 agenty/10 kat.), wshobson/agents (182/7 teams),
JetBrains AI Adoption 2026, Claudify/MCSA best-agents 2026. Reuse: [[research-preset-routing]] R1/R3/R5/SYNTHESIS.
