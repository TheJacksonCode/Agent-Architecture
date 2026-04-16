# R6: Opinie ekspertow - AI agents, token economics, configuration

## Metodologia
Raport oparty na publicznych wypowiedziach ekspertow, dokumentacji, postach na X/Twitter, YouTube, podcastach i blogach z okresu 2024-2026.

---

## 1. Claude Code Power Users - Workflow i Tipy

### Zrodla
- Anthropic oficjalna dokumentacja (docs.anthropic.com/en/docs/claude-code)
- Thorsten Ball (@thorstenball) - Anthropic engineer
- Simon Willison (@simonw) - praktyk AI coding
- swyx (Shawn Wang, @swyx) - AI Engineer, founder smol.ai

### Kluczowe opinie

**Thorsten Ball** (Anthropic):
- CLAUDE.md to fundament - porownuje to do onboardingu nowego developera
- Subagent delegation z izolacja kontekstu jest szybsze niz sekwencyjne prompty
- Iteracyjne prompty > jednorazowe mega-prompty

**Simon Willison**: wzorzec "disposable code" - napisz, uzyj, wyrzuc. "The most expensive token is the one you didn't need to send."

**swyx**: "Prompt is the new code" - system prompty powinny byc wersjonowane i testowane jak kod. Claude Code custom commands to niedoceniany feature.

---

## 2. Multi-Agent System Design

### Zrodla
- Andrew Ng - DeepLearning.AI, "Agentic Design Patterns"
- Harrison Chase - LangChain/LangGraph CEO (@hwchase17)
- CrewAI - Joao Moura (@joaomdmoura)
- Anthropic - "Building effective agents" blog post

### Kluczowe opinie

**Andrew Ng**: 4 wzorce (Reflection, Tool Use, Planning, Multi-Agent). Rekomenduje zaczynanie od JEDNEGO agenta, dodawanie kolejnych dopiero gdy task jest zbyt zlozony. "Start simple, add complexity only when needed."

**Harrison Chase / LangGraph**: "The hardest part of multi-agent is not the agents - it is the orchestration." Ostrzega przed "agent sprawl" - 3-7 agentow na pipeline, powyzej 10 wymaga bardzo przemyslanej orkiestracji.

**Anthropic "Building Effective Agents"**: "Use the simplest solution that works." Wzorzec Orchestrator-Workers: jeden LLM kieruje, reszta wykonuje izolowane zadania. Prompt routing: Haiku jako router (tani), Opus jako worker (jakosc).

**CrewAI**: "Agents need constraints more than capabilities. Tell them what NOT to do."

---

## 3. System Prompt Engineering

### Zrodla
- Anthropic Prompt Engineering docs
- "The Prompt Report" (arxiv 2406.06608) - survey 1500+ papers
- Elvis Saravia - Prompt Engineering Guide

### Kluczowe opinie

**Struktura promptu (konsensus 2025-2026)**: ROLE / TASK / CONTEXT / CONSTRAINTS / OUTPUT FORMAT
- Anthropic rekomenduje XML tags do strukturyzacji
- "What you do NOT do" czesto wazniejsze niz pozytywne instrukcje
- Chain of Thought z guardrails (nie generyczne "think step by step")

**Prompt Routing**: tani model klasyfikuje, drogi odpowiada. Redukuje koszty 60-80%.

**Meta-prompting** (trend 2025-2026): orkiestrator generuje wyspecjalizowane prompty dla sub-modeli.

---

## 4. Token Economics

### Zrodla
- ccusage (github.com/ryoppippi/ccusage)
- Simon Willison - blog posty o kosztach LLM
- Cline / Roo Code - dane od uzytkownikow
- Latent Space podcast

### Kluczowe dane

- Typowa sesja Claude Code z Opus: $2-15
- Multi-agentowe pipeline'y: $20-100+
- Ceny tokenow spadaja ~50% rocznie

### Strategie oszczedzania (konsensus ekspertow)

1. **Model routing** - Haiku do prostych, Sonnet do wiekszosci, Opus do krytycznych
2. **Prompt caching** - cache read = 0.1x ceny input, redukcja 90%
3. **Context window management** - "Lost in the Middle" (Stanford) - krotszy dobrze strukturyzowany kontekst > dlugi dump
4. **Batch processing** - Anthropic Batch API 50% discount
5. **Compaction** - periodyczne streszczanie kontekstu

---

## 5. AI Coding Assistant Configuration

### Wspolny pattern (niezaleznie od narzedzia)
- "Teach it YOUR codebase" - kontekst o konwencjach
- "Small, focused prompts > mega prompts"
- "Review everything" - AI jako junior dev, czlowiek jako senior reviewer

### Claude Code power user tips
- /compact po kazdej fazie
- Custom slash commands w .claude/commands/
- CLAUDE.md hierarchy: globalny + per-project + per-directory
- Model selection per task

---

## 6. Preset/Template Systems dla AI

### Zrodla
- Daniel Miessler / Fabric (github.com/danielmiessler/fabric) - najblizszy odpowiednik
- LangChain Hub - marketplace promptow
- Claude Code custom commands

### Kluczowe wnioski

**Fabric**: system "patterns" (gotowe szablony .md). "AI patterns should be composable - small, focused, chainable." Najblizszy publiczny odpowiednik naszego systemu presetow.

**Brak publicznych odpowiednikow systemu 42 presetow z team composition**: Fabric ma ~100 single-agent patterns, ale zero multi-agent team templates z model routing. Ten projekt jest jedynym publicznym systemem z gotowymi zespolami agentow + kosztorysem.

---

## Trendy 2025-2026

1. **Agent sprawl backlash** - eksperci cofaja sie do "use the simplest solution"
2. **Human-in-the-Loop obowiazkowy** - checkpointy dla czlowieka w kazdym powaznym frameworku
3. **Cost-aware design** - token economics jako first-class concern
4. **Prompt as code** - wersjonowanie, testowanie, CI/CD dla promptow
5. **Context window =/= context quality** - 1M nie znaczy wypelniaj do konca
6. **Agentic coding explosion** - kazdy miesiac nowe narzedzie

---

## Rekomendacje dla naszego projektu

1. **Model routing (Opus/Sonnet/Haiku per agent)** - validated pattern (Ng, Chase, Anthropic)
2. **HITL gates** - state-of-the-art (LangGraph, Anthropic)
3. **Context budget system** - unikatowy, nikt publicznie tego nie robi
4. **42 presety z team composition** - bezkonkurencyjne, Fabric ma single-agent only
5. **Encyclopedia jako onboarding** - zgodne z "teach your codebase" tipem
6. **Brakujacy element: prompt testing/validation** - prompty powinny byc testowane

## Confidence
- [CERTAIN] Opinie Ng, Chase, Anthropic docs
- [CERTAIN] Pricing, model capabilities
- [PROBABLE] Trendy na X/Twitter
- [SPECULATION] "Brak publicznych odpowiednikow 42 presetow"
