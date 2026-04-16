# R2: UX wzorce routingu i rekomendacji agentow

## Zrodla
- [GitHub Copilot - Ask, Edit, Agent Modes](https://github.blog/ai-and-ml/github-copilot/copilot-ask-edit-and-agent-modes-what-they-do-and-when-to-use-them/)
- [Cursor AI Complete Guide 2025](https://medium.com/@hilalkara.dev/cursor-ai-complete-guide-2025)
- [Claude Code - Extend with Skills](https://code.claude.com/docs/en/skills)
- [CrewAI vs LangGraph vs AutoGen 2026](https://www.datacamp.com/tutorial/crewai-vs-langgraph-vs-autogen)
- [LangGraph Router Pattern](https://medium.com/@huzaifaali4013399/the-routing-pattern-build-smart-multi-agent-ai-workflows-with-langgraph)
- [AI Agent Routing - Patronus](https://www.patronus.ai/ai-agent-development/ai-agent-routing)
- [Magentic-One - Microsoft Research](https://www.microsoft.com/en-us/research/articles/magentic-one)
- [UX Patterns for CLI Tools](https://lucasfcosta.com/2022/06/01/ux-patterns-cli-tools.html)
- [Progressive Disclosure in AI - aiuxdesign.guide](https://www.aiuxdesign.guide/patterns/progressive-disclosure)
- [Progressive Disclosure for AI Agents - Honra](https://www.honra.io/articles/progressive-disclosure-for-ai-agents)
- [Designing for Agentic AI - Smashing Magazine](https://www.smashingmagazine.com/2026/02/designing-agentic-ai-practical-ux-patterns/)
- [Error Recovery in AI Agents - GoCodeo](https://www.gocodeo.com/post/error-recovery-and-fallback-strategies-in-ai-agent-development)

---

## 1. AI Tool Routing Patterns - trzy dominujace wzorce

**Wzorzec A: Explicit Mode Selector (dropdown/pills)**
GitHub Copilot: Ask -> Edit -> Agent (rosnaca autonomia). Cursor: Tab -> Cmd+K -> Composer/Agent. Uzytkownik swiadomie "oddaje kontrole".

**Wzorzec B: Slash command / skill dispatch**
Claude Code: `/nazwa-presetu` z dynamicznym lazy loading. Na starcie TYLKO nazwy+opisy (~1% okna kontekstowego), pelna tresc on-demand. Discord identyczny wzorzec: max 25 choices + search.

**Wzorzec C: Implicit routing via intent**
ChatGPT Custom GPTs: model sam decyduje ktory GPT/app. Zero explicit selection.

**Trend 2025-2026:** przejscie od explicit -> hybrid (kliknij LUB opisz, system sugeruje).

---

## 2. Agent Selection UX w platformach multi-agent

**CrewAI** - role-based DSL z metafora "zespolu". Agent ma role, goal, backstory. Natychmiast zrozumialy onboarding.

**LangGraph** - graf stanow z router pattern: lightweight LLM klasyfikuje intent -> conditional edges -> specjalizowani agenci. 3-warstwowa architektura.

**Magentic-One (Microsoft)** - pelna automatyzacja. Orchestrator sam dobiera agentow. Uzytkownik nie wybiera.

**AutoGen** - conversational GroupChat, agenci "debatuja".

**Wniosek:** spektrum od pelnej kontroli (LangGraph) przez pol-kontrole (CrewAI) do pelnej automatyzacji (Magentic-One). Im krytyczniejsze zadanie, tym wiecej kontroli chce uzytkownik.

---

## 3. CLI Recommendation Patterns

5 wzorcow z create-next-app, npm init, Yeoman:

1. **Progressive narrowing** - sekwencyjne pytania, kazde zaweza przestrzen
2. **Sensible defaults + skip** - `--yes` dla power users
3. **Typo correction** - "did you mean?" z fuzzy matching
4. **Validation at input** - natychmiastowy feedback
5. **Dual mode: interactive + non-interactive** - discovery vs automatyzacja

---

## 4. Decision Trees vs Free Text

**Hybrid approach jest najskuteczniejszy:**

Decision tree lepsze dla: nowych uzytkownikow, <50 opcji, nieodwracalnych decyzji.
Free text lepsze dla: power users, otwartych scenariuszy, edge cases.

**Progressive disclosure jako most:** metadata (~50-100 tok per skill) jako lekki router, pelna tresc on-demand. Eliminuje "context rot".

**Confidence-based routing:**
- HIGH (>0.85) -> od razu laduj preset
- MEDIUM (0.5-0.85) -> pokaz 2-3 sugestie
- LOW (<0.5) -> uruchom decision tree / clarifying questions

---

## 5. Fallback Patterns - 4 poziomy

1. **Clarifying questions** - "Czy chodzilo o X czy Y?" (Amazon Lex disambiguation)
2. **Graceful degradation** - exact match -> generative -> prescribed fallback (Dialogflow CX)
3. **Suggestion surfacing** - "Oto co moge zrobic: [lista]" (nigdy "nie wiem" bez opcji)
4. **Human escalation** - HITL gate: "nie mam presetu, moge zlozyc custom - chcesz?"

**Anti-pattern:** Generyczne "Nie rozumiem" bez kontekstu i opcji.

---

## Rekomendacje dla naszego projektu

**R2.1 - Hybrid Router (slash + NL intent)**
Zachowac `/nazwa-presetu` jako primary. Dodac NL router: "potrzebuje zespol do migracji" -> system matchuje i proponuje z confidence score.

**R2.2 - Progressive Disclosure w palecie**
Start z 5-6 "featured" presetami, "Wiecej..." rozwija pelna palate, search bar z fuzzy matching.

**R2.3 - Confidence-based 3-tier response**
HIGH -> od razu laduj. MEDIUM -> "Pasuja 2-3: [lista]". LOW -> guided wizard.

**R2.4 - Fallback: custom pipeline builder**
Gdy zaden preset nie pasuje -> "Nie mam gotowego presetu, ale moge zlozyc custom z 35 agentow. Chcesz?"

**R2.5 - Token-budget aware routing**
Wykorzystac CTX_BASELINE do filtrowania presetow per model (Haiku 200K vs Opus 1M).

**R2.6 - Dual mode: wizard + direct command**
Wizard dla nowych (3-4 pytania -> rekomendacja), slash command dla power users. Wizard konczy sugestia "/nazwa" - uczy nazw komend.
