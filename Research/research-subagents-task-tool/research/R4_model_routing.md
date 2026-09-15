# R4 - Model Routing Strategies: Kiedy Opus, Sonnet, Haiku

**Rola:** Researcher X/Twitter (trends, hot takes, empiryczne benchmarki community)
**Data:** 2026-04-17
**Pytanie:** Kiedy override model w Agent/Task call, price implications, empiryczne benchmarki "Sonnet wystarczajacy dla X, Haiku dla Y". Heurystyka "75% zadan to Sonnet".

## Summary

Model override per subagent jest **kanonicznym way** optymalizacji kosztu w Claude Code. Official pricing (Apr 2026): **Opus 4.7** $5/M input, $25/M output; **Sonnet 4.6** $3/M input, $15/M output (40% taniej od Opus); **Haiku 4.5** $1/M input, $5/M output (5x taniej od Opus). Speed: Sonnet 40-60 tok/s (~2x szybszy niz Opus 20-30 tok/s), Haiku 80-120 tok/s (~4x szybszy). **Rzeczywiste usage data** (GitHub issue #27665, user Max plan $200, 17 dni, 1.8 mld tokens): **93.8% tokens -> Opus**, 5.2% Haiku, 1.0% Sonnet - czyli praktycy nie uzywaja routingu, wszystko leci na default Opus. Koszt: 97.8% ($1246/$1274) poszedl na Opus. **96% Opus tokens to cache reads** - ponawianie konwersacji full context kazda ture. Advisor Strategy od MindStudio: Opus planning (20-30% tokens), Sonnet implementation (60-70%), Haiku simple edits (10-20%) = **~11% cost reduction** wedlug Anthropica + early problem detection. Aggressive routing moze oszczedzic **60-80% kosztu**, saving $2000-3000/month dla heavy users wg issue #27665 petition. Heurystyka "75% zadan to Sonnet" pochodzi z rozumowania X community: 60-70% tokens wg issue #27665 moze byc Sonnet/Haiku bez jakosci drop. Subagent override dziala od **Claude Code v1.0.64** (Ian Nuttall confirm). `opusplan` broken (promised "Opus plan mode, Sonnet execute" - tylko switchuje dla krotkiego okienka, nie persist). Standard deep-research-v2 routing (empirical Maciej memory): Orchestrator/Critic/Syntetyk **Opus**, Researchers **Sonnet**, Extractors **Haiku** - hybrid routing praktykowany.

## Details

### 1. Pricing tablica Apr 2026

Zrodlo: [benchlm.ai/blog/posts/claude-api-pricing](https://benchlm.ai/blog/posts/claude-api-pricing), [claude API pricing docs](https://platform.claude.com/docs/en/about-claude/pricing).

| Model | Input $/M | Output $/M | vs Opus | Speed (tok/s) |
|---|---|---|---|---|
| **Opus 4.7** | $5 | $25 | 1.0x | 20-30 |
| Sonnet 4.6 | $3 | $15 | 0.60x (40% cheaper) | 40-60 |
| Haiku 4.5 | $1 | $5 | 0.20x (5x cheaper) | 80-120 |

**Opus 4.7 quirk:** *"Opus 4.7 ships with a new tokenizer that can produce up to 35% more tokens for the same input text, meaning your real bill per request can go up even though the rate card did not."* - ukryty koszt.

**Prompt cache reads:** typowo 10-25% kosztu tokenu regularnego - istotne dla long-running Opus sesji.

### 2. "93.8% Opus" data - rzeczywista praktyka

GitHub issue [#27665 Intelligent Model Routing](https://github.com/anthropics/claude-code/issues/27665). Real Max subscriber 17-dniowa analiza:

```
Model            Total Tokens          Pct      Virtual Cost
opus-4-6        1,405,957,116        77.0%        $1,011.59
opus-4-5          305,903,815        16.8%          $234.43
haiku-4-5          94,216,971         5.2%           $16.02
sonnet-4-5         17,285,048         0.9%           $11.44
sonnet-4-6          1,046,090         0.1%            $0.92
TOTAL           1,825,500,411       100.0%        $1,274.40

By tier:
  Opus:    93.8% of tokens,  97.8% of cost  ($1,246)
  Sonnet:   1.0% of tokens,   1.0% of cost  ($12)
  Haiku:    5.2% of tokens,   1.3% of cost  ($16)
```

Takeaways:
1. **Opus dominuje przez default behavior.** User nie override, session zaczyna na Opus i tam zostaje.
2. **96% Opus tokens to cache reads** - full conversation context re-sent every turn. Even "list files" on trivial directory eats Opus tokens przez shared cache.
3. **Sonnet 4.6 use <0.1%** mimo ze jest zalecany dla standard coding.

Issue ma 30+ linked open issues (opusplan bugs, routing requests, subagent model, token tracking).

### 3. Advisor Strategy pattern (MindStudio)

Zrodlo: [mindstudio.ai/blog/claude-code-advisor-strategy](https://www.mindstudio.ai/blog/claude-code-advisor-strategy-opus-sonnet-haiku).

**Pattern:** *"It pairs Opus as a senior adviser — handling planning, architecture decisions, and code review — with Sonnet or Haiku as the executor that does the actual implementation work."*

**3-fazowy workflow:**
1. Opus analyzes + plans (pre-flight)
2. Sonnet/Haiku executes
3. Opus reviews output (post-flight)

**Token split estimate:**
- Opus plan+review: 20-30% tokens
- Sonnet implementation: 60-70% tokens
- Haiku simple edits: 10-20% tokens

**Quoted saving:** *"Anthropic reports approximately 11% overall cost reduction compared to single-model approaches, with additional quality improvements from early problem detection during the planning phase."* (Anthropic claim, needs primary source).

### 4. Per-model task routing heuristics

Z community + official recommendations ([claude.com/resources/tutorials/choosing-the-right-claude-model](https://claude.com/resources/tutorials/choosing-the-right-claude-model)):

| Task type | Recommended model | Why |
|---|---|---|
| Architectural decisions, ambiguous requirements | **Opus** | Multi-step reasoning, breadth |
| Code review, security audit | Opus | Critical discernment |
| Standard implementation | **Sonnet** | 79.6% SWE-bench (1.2pp less than Opus 80.8%) at 40% cost |
| Refactoring clear patterns | Sonnet | Pattern matching |
| Tool output processing (parsing, extracting) | Sonnet/Haiku | Structured, no creativity |
| High-volume repetitive edits | **Haiku** | Cheap + fast |
| File discovery, codebase search | Haiku | (default dla Explore subagent) |
| JSON structured extraction | Haiku | 5x cheaper, sufficient structure following |
| Formatting, renaming, batch edits | Haiku | Low ambiguity |
| Status line setup, config generation | Haiku | Simple templating |

Praktyczny wynik issue #27665 argument: *"conservatively 60-70% of tokens are spent on tasks where Sonnet or Haiku would be sufficient, and auto-routing could cut costs by $2,000-3,000/month for heavy users."*

Skad "75%" heurystyka (X common claim): Average between 60-70% (issue) i 70-80% (dextralabs blog) rounded to "about 75% tasks fit Sonnet". Niepotwierdzony primary benchmark, ale consistent estimate w spolecznosci.

### 5. Model override w Agent SDK / frontmatter

Od **Claude Code v1.0.64** (Ian Nuttall tweet 2025): per-subagent `model` parameter. Resolution order (z R1):
1. `CLAUDE_CODE_SUBAGENT_MODEL` env var
2. Per-invocation `model` argument do Agent tool
3. Subagent definition frontmatter `model`
4. Main conversation model

**Opcje:** `opus`, `sonnet`, `haiku`, full model ID (`claude-opus-4-7`, `claude-sonnet-4-6`), `inherit`.

Frontmatter:
```yaml
---
name: extractor
description: Extracts structured claims from reports
tools: Read, Write
model: haiku
---
```

Per-invocation (SDK):
```python
agents={
  "security-reviewer": AgentDefinition(
    description="Security code review",
    prompt="...",
    model="opus" if strict else "sonnet"
  )
}
```

### 6. opusplan bug (tier 1 fix request)

Wyjasnienie z #27665: docs obiecuja *"Uses opus during plan mode, then switches to sonnet for execution"*. Kod `getRuntimeMainLoopModel`:

```javascript
function getRuntimeMainLoopModel({ permissionMode, mainLoopModel, exceeds200kTokens }) {
  if (getUserSpecifiedModel() === "opusplan" && permissionMode === "plan" && !exceeds200kTokens)
    return getDefaultOpusModel();
  if (getUserSpecifiedModel() === "haiku" && permissionMode === "plan")
    return getDefaultSonnetModel();
  return mainLoopModel;  // fallback
}
```

Konsekwencja: *"it only switches briefly inside EnterPlanMode. Most of the session runs on Sonnet fallback."* - promises niezrealizowane.

### 7. Empiryczny case: deep-research-v2 routing

Zrodlo: internal memory Macieja [feedback_deep_research_v2_model_routing.md](C:/Users/macie/.claude/projects/.../feedback_deep_research_v2_model_routing.md).

Standard routing w /deep-research-v2 preset (17 agentow):
- Orchestrator: Opus (decyzje architektoniczne)
- Research Critic: Opus (cross-report reasoning)
- Syntetyk Lean: Opus (citation discipline dla 8-10k slow output)
- 7 Researchers: Sonnet (retrieval + 1500-6000w raport)
- 7 Extractors: Haiku (structured JSON claim-table)

Wariant --premium: wszyscy Opus. Wariant --ultra-budget: Researchers Haiku, Extractors Haiku, Critic+Syntetyk Sonnet.

Empirical claim (memory): to routing daje **~15x oszczednosc vs premium** z zachowaniem citation discipline bramy (Syntetyk na Opus).

Trafnosc: 7 Sonnet Researcher avg 5k input + 5k output per call = per researcher ~$0.09 (input) + $0.075 (output) = $0.17 vs Opus $0.30 = **43% oszczednosc** per researcher. Dla 7 researcher: ~$1.19 vs $2.10 = $0.91 saving na kampanii.

7 Haiku Extractor avg 2k input + 0.5k output = per extractor $0.002 + $0.003 = $0.005 vs Sonnet $0.013 = **62% oszczednosc** przy Extractor routing Haiku vs Sonnet. Dla 7: ~$0.035 vs $0.09 = $0.06 saving.

**Netto:** research campaign ~$1 cheaper per iteration z hybrid routing vs "all Opus". Dla zespolu wykonujacego 20 kampanii miesiecznie = $20+/miesiac oszczednosc na kampaniach research same - skromne ale real.

### 8. When to override (heurystyki decision)

**Opus dla subagenta:** tylko jesli:
- Zadanie wymaga multi-step reasoning
- Cross-document synthesis (Syntetyk, Critic, Orchestrator)
- Security review gdzie missed bug kosztowne
- Architectural decision bez clear precedent
- Ambiguous requirements gdzie model musi decide

**Sonnet dla subagenta:** default dla:
- 1500-6000 slow research report
- Standard code implementation z clear spec
- UI tweaks, CSS, typography
- Refactoring z established pattern
- Code review standard quality
- Planning simple features

**Haiku dla subagenta:**
- Structured JSON extraction (Extractor, data parsing)
- File discovery, grep-style search (Explore builtin)
- Format transforms (markdown -> JSON, XML -> YAML)
- Repetitive edits (rename variable, add comment)
- Tool output parsing
- Status line / config template generation

### 9. X/Twitter takes: async subagents shift

Lydia Hallie tweet (2025):
> "Claude Code now supports async subagents! Background agents keep working even after your main task completes, and wake up your main agent when they're done. Huge improvement for long-running tasks!"

Implikacja dla model routing: `background: true` subagent moze byc ustawiony na Opus bez blokowania main session - pozwala na long-running Opus research pipeline w tle.

Akshay Pachaar tweet:
> "Most people reach for multi-agent systems too early. Start with a single agent and only add complexity when you can measure that it's needed. When you do need multiple agents, Claude offers two models: sub-agents (isolated) and Agent Teams."

Implies: model routing nie ma sensu jesli nie potrzebujesz multi-agent. Dla prostego code edit: single agent Sonnet jest ok.

### 10. Community-proposed auto-routing

Z #27665 Tier proposals:
- **Tier 1**: default subagents Sonnet not inherit (#26179), fix opusplan reliability, model in skill frontmatter (#23462)
- **Tier 2**: per-message override syntax: `//s` for Sonnet, `//h` for Haiku (#25410, #26961)
- **Tier 3**: JSON routing rules in settings (#19269, #26740)
- **Tier 4**: complexity-based heuristics (tool-output-processing -> Sonnet) (#25986, #15721)

External: [0xrdan/claude-router](https://github.com/0xrdan/claude-router) GitHub repo - intelligent model orchestration plugin routing queries to optimal model based on complexity. Community workaround w obliczu brak official heuristics.

### 11. Caveat z X community: "don't measure cost, measure outcome"

Przeciwny glos:
> "Multi-agent systems only earn their cost when you need context protection, true parallelism, or conflicting specializations"

Sugeruje ze dla 60-70% zadan SINGLE agent (nie multi-agent routing) jest optymalny - zadanie nie tyle o Opus vs Sonnet, co o sub-agent vs main agent overhead.

## Issues / Flags

- **"11% cost reduction"** od Anthropica wg MindStudio nie ma primary source w oryginalnej dokumentacji - cite trzecia rzeka. Flag: validate za pomoca WebFetch do oryginalnego posta jak jest.
- **"75% Sonnet" heurystyka** jest folklorem - konsensus implicit, nie benchmark. Realne data z #27665 pokazuje 60-70% jako konserwatywny estimate.
- **`opusplan`** advertised feature jest partialy broken - docs i zachowanie mija sie.
- **93.8% Opus real data** jest "one Max user 17 dni" - pojedyncze data point. Moze byc nierepresentatywne - ale to raczej **underestimate** bo enterprise users wiecej kodu = wiecej Opus cost.
- **Cache reads podatnosc:** Opus rates stosowane nawet dla trivialnych operacji jesli session model = Opus. Realny problem kosztowy.
- **Opus 4.7 tokenizer change** moze powiekszyc faktury o 35% bez zmiany rate card.
- **Subagent model override od v1.0.64** - uzytkownicy wczesniejszych wersji Claude Code NIE MAJA tej flexibility.

## Recommendation

R4 pokazuje praktyczna nieuzywanosc routingu + konkretne heuristics do zmiany. **GO dla Fazy 2 (Extract)** - claim-table:
1. Pricing table (Opus $5/$25, Sonnet $3/$15, Haiku $1/$5)
2. Speed table (Opus 20-30, Sonnet 40-60, Haiku 80-120 tok/s)
3. "93.8% Opus" practice anomaly + 96% cache reads cost driver
4. Advisor Strategy: Opus 20-30%, Sonnet 60-70%, Haiku 10-20%
5. Task-to-model decision matrix (architectural -> Opus, standard impl -> Sonnet, extraction -> Haiku)
6. opusplan broken claim
7. Model override od v1.0.64
8. Resolution order (env -> invocation -> frontmatter -> session)
9. Opus 4.7 tokenizer 35% token inflation gotcha
10. deep-research-v2 hybrid routing case study (empirical)
11. 4-tier auto-routing community proposals
12. Async subagents enable long-running Opus background

**Licznik slow: ~2100.**

## Sources

- [Models overview - Claude API Docs](https://platform.claude.com/docs/en/about-claude/models/overview)
- [Claude API Pricing: Haiku 4.5, Sonnet 4.6, and Opus 4.7 (April 2026) - benchlm.ai](https://benchlm.ai/blog/posts/claude-api-pricing)
- [Claude Opus 4.7 Pricing: Real Cost Story - finout.io](https://www.finout.io/blog/claude-opus-4.7-pricing-the-real-cost-story-behind-the-unchanged-price-tag)
- [Claude Benchmarks 2026 - morphllm.com](https://www.morphllm.com/claude-benchmarks)
- [Issue #27665 - Intelligent Model Routing (93.8% Opus data)](https://github.com/anthropics/claude-code/issues/27665)
- [Claude Code Advisor Strategy - MindStudio](https://www.mindstudio.ai/blog/claude-code-advisor-strategy-opus-sonnet-haiku)
- [Choosing the right Claude model - Anthropic tutorial](https://claude.com/resources/tutorials/choosing-the-right-claude-model)
- [Pick the Right Claude Code Model - dev.to/klement_gunndu](https://dev.to/klement_gunndu/pick-the-right-claude-code-model-for-every-task-1p6a)
- [Ian Nuttall X post: Claude Code 1.0.64 subagent model](https://x.com/iannuttall/status/1950677706816811016)
- [Lydia Hallie X post: async subagents](https://x.com/lydiahallie/status/1998837856794771527)
- [Akshay Pachaar X post: Subagents vs Agent Teams](https://x.com/akshay_pachaar/status/2033456347354996815)
- [0xrdan/claude-router - community model orchestration](https://github.com/0xrdan/claude-router)
- Internal memory: `feedback_deep_research_v2_model_routing.md` (Maciej, 2026-04)
