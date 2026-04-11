# v32.6 Instruction - Premium Presets + Context Budget Edition

> **Status**: SPEC / nie-zaimplementowane
> **Plik docelowy**: `v32.6/AGENT_TEAMS_CONFIGURATOR_v32_6.html` (kopia v32.5 + zmiany ponizej)
> **Bazowane na**: 4 rownoleglych agentach research (2 Explore + 2 Opus general-purpose)
> **Glowne motto**: "Kazdy agent < 50% kontekstu, kazdy preset to research-backed deep workflow"

---

## 1. Cele i nie-cele

### Cele
1. Dodac **Context Budget System** - widoczna miara wykorzystania okna kontekstu na poziomie pojedynczego agenta i calego presetu, z progami severity (50/65/75/80%).
2. Dodac **5-13 Premium Presets** - workflowy 6-15 agentow oparte na publicznych blueprintach (Anthropic Research Multi-Agent, Magentic-One, wshobson/agents, NVIDIA AI-Q, MetaGPT, CrewAI).
3. Wszyscy agenci w premium presetach domyslnie na **Opus 4.6** (uzytkownik moze zmienic potem). Cel: maksymalna jakosc, bo Opus i Sonnet 4.6 maja 1M kontekstu.
4. Naprawic bug: **Sonnet 4.6 wyswietla "200K ctx" zamiast "1M ctx"** w 4 miejscach.
5. Dodac **7 nowych built-in agentow** ktorzy powtarzaja sie w premium presetach (zamiast tworzyc je jako custom).
6. Zachowac pelna kompatybilnosc wsteczna (presets v32.5 dzialaja, custom agents migracja z `acV32_5_custom`).

### Nie-cele
- Nie zmieniamy systemu kolorow (zostaje v32.5 Color Consistency).
- Nie dotykamy logiki Cost Command Center poza dodaniem cells dla kontekstu.
- Nie wprowadzamy nowych modeli (tylko Opus/Sonnet/Haiku 4.5/4.6).
- Nie tworzymy nowych modali - context budget zywie w juz istniejacym Cost Modal jako 5-ta zakladka "Context".

---

## 2. Research findings TL;DR (zrodla w sekcji 12)

### Okna kontekstu (kwiecien 2026)
| Model | Window | Max Output |
|---|---|---|
| Claude Opus 4.6 (`claude-opus-4-6`) | **1,000,000** | 128k |
| Claude Sonnet 4.6 (`claude-sonnet-4-6`) | **1,000,000** (NIE 200K!) | 64k |
| Claude Haiku 4.5 (`claude-haiku-4-5`) | **200,000** | 64k |

**Source**: platform.claude.com/docs/en/build-with-claude/context-windows. Bez beta headera, pricing jest plat (900k = 9k per token).

### Bazowy narzut na kazdy subagent Claude Code
| Component | Tokens |
|---|---|
| System prompt (Anthropic-injected) | ~6,200 |
| Built-in tools (Read/Edit/Grep/Bash/Glob/Write/Task) | ~11,600 |
| Memory files (CLAUDE.md project + user) | ~3,300 |
| Subagent role markdown body (typowy) | ~1,000 |
| Skills (jesli loaded) | ~300 |
| **BASELINE per-call (bez MCP, bez pracy)** | **~22,400** |
| MCP overhead per server (jesli wlaczone) | +2,000 - 5,000 |

**Source**: J.D. Hodges `/context` snapshot + Piebald claude-code-system-prompts repo.

### Subagent isolation
Kazdy subagent dostaje **wlasne, swieze** okno kontekstu. Kontekst rodzica NIE liczy sie do dziecka. To znaczy: `total_context_used` na poziomie presetu nie jest sumarycznym, tylko **maksimum** z poszczegolnych agentow + osobno orchestrator (ktory trzyma streszczenia od dzieci, ~1-2k per dziecko).

### Empiryczne progi (context rot research, NIE oficjalne Anthropic)
| % okna | Stan |
|---|---|
| < 50% | Safe - performance stabilne |
| 50-65% | Warn - nuance loss zaczyna sie pojawiac |
| 65-75% | High - re-reading, sprzecznosci |
| 75-80% | Danger - auto-compact zaraz wystrzeli |
| > 80% | Severe degradation |

**Source**: Stanford "Lost in the Middle" + Morph context-rot research. Cel uzytkownika: **kazdy agent < 50% (zielony), max 60%**.

### Anthropic Multi-Agent Research System (czerwiec 2025)
- Token usage explains 80% of the variance in performance.
- Multi-agent systems use ~15x wiecej tokenow niz chat.
- Subagents kompresuja: eksploruja 50k+ tokenow, ale return tylko 1-2k summary.
- 90.2% lepiej niz single-agent Opus 4 na ich research evalu.
- Effort scaling: 1 agent dla simple, 2-4 dla porownan, 10+ dla complex.

### Stan presetow v32.5
| Metric | Wartosc |
|---|---|
| Wszystkich presetow | 29 |
| Premium (6+ agentow) | 16 (55%) |
| Najwiekszy preset | `deep_five_minds` (25 agentow) |
| Z HITL gates | 1 (`deep_five_minds`) |
| `research` preset | 9 agentow, 7 researcherow na haiku |
| Tylko `orchestrator` na Opusie domyslnie | TAK |

---

## 3. FEATURE 1: Context Budget System

### 3.1 Nowe stale (wstaw kolo `MODEL_COSTS`, linia ~2818)

```javascript
// Context windows per model (kwiecien 2026)
const MODEL_CTX={opus:1000000,sonnet:1000000,haiku:200000};

// Bazowy narzut subagent Claude Code (J.D. Hodges /context snapshot, pickled 2026-04)
const CTX_BASELINE={
  systemPrompt:6200,    // Anthropic-injected system prompt
  builtInTools:11600,   // Read/Edit/Grep/Bash/Glob/Write/Task default tools
  memoryFiles:3300,     // CLAUDE.md project + user (median)
  subagentRole:1000,    // markdown role body (typowy)
  skills:300            // skills metadata
};
const CTX_BASELINE_TOTAL=22400; // sum

// Progi severity (context rot research consensus)
const CTX_SEVERITY={safe:0.50,warn:0.65,high:0.75,danger:0.80};

// Domyslny target dla premium presetow (uzytkownik wymagal <50%)
const CTX_PREMIUM_TARGET=0.50;
```

### 3.2 Nowe funkcje (wstaw kolo `calcAgentCost`, linia ~4259)

```javascript
// Estymacja zuzycia kontekstu pojedynczego agenta = baseline + jego AGENT_TOKENS.i
// AGENT_TOKENS.i to "cumulative input across all API turns" - to dokladnie input context
// jaki zostanie uzyty zanim agent skonczy. Output nie liczy sie do okna wejsciowego.
function calcAgentCtx(defId,model){
  const est=AGENT_TOKENS[defId]||{i:15000,o:3000};
  const win=MODEL_CTX[model]||MODEL_CTX.haiku;
  const used=CTX_BASELINE_TOTAL+est.i;
  return{used:used,window:win,pct:used/win,tokens:used};
}

// Klasyfikacja severity
function getCtxSeverity(pct){
  if(pct<=CTX_SEVERITY.safe)return'safe';
  if(pct<=CTX_SEVERITY.warn)return'warn';
  if(pct<=CTX_SEVERITY.high)return'high';
  return'danger';
}

// Maksymalne zuzycie kontekstu w obrebie presetu (subagents sa izolowane, wiec MAX nie SUM)
function calcPresetMaxCtx(){
  if(!nodes.length)return{maxPct:0,maxAgent:null,worstSev:'safe',allPcts:[]};
  let maxPct=0,maxAgent=null;const allPcts=[];
  nodes.forEach(n=>{
    const c=calcAgentCtx(n.defId,n.model);
    allPcts.push({id:n.id,defId:n.defId,model:n.model,pct:c.pct,used:c.used,window:c.window});
    if(c.pct>maxPct){maxPct=c.pct;maxAgent=n;}
  });
  return{maxPct:maxPct,maxAgent:maxAgent,worstSev:getCtxSeverity(maxPct),allPcts:allPcts};
}

// Format procent
function fmtPct(p){return Math.round(p*100)+'%';}
```

### 3.3 Topbar HUD - dodaj 4-tą cell "CTX"

W funkcji `aktKoszt()` (linia ~4269) dodaj cell po MIX:

```javascript
const ctx=calcPresetMaxCtx();
const ctxSevCls='sev-'+ctx.worstSev;
hud.innerHTML+='<div class="tbc-cell tbc-ctx '+ctxSevCls+'">'
  +'<div class="tbc-lbl">CTX MAX</div>'
  +'<div class="tbc-val">'+fmtPct(ctx.maxPct)+'</div>'
  +'<div class="tbc-bar"><span class="bctx" style="width:'+Math.min(100,ctx.maxPct*100)+'%"></span></div>'
  +'</div>';
```

CSS dla `.tbc-ctx` (kolo `.tbc-cell`):
```css
.tbc-ctx .bctx{height:3px;display:block;background:var(--ph-research);border-radius:2px;transition:width .3s}
.tbc-ctx.sev-warn .bctx{background:var(--mc-opus)}
.tbc-ctx.sev-high .bctx{background:var(--mc-sonnet)}
.tbc-ctx.sev-danger .bctx{background:var(--ph-qa)}
```

### 3.4 Per-agent badge w sidebarze szczegolow

W `pokazWezel()` (linia ~4099), zaraz po model buttons, dodaj sekcje:

```javascript
const ctx=calcAgentCtx(d.defId,nd.model);
const sevCls='ctx-'+getCtxSeverity(ctx.pct);
h+='<div class="ds-ctx-box '+sevCls+'">'
  +'<div class="ds-ctx-hdr"><span>'+t('CTX_USAGE')+'</span><span class="ds-ctx-pct">'+fmtPct(ctx.pct)+'</span></div>'
  +'<div class="ds-ctx-bar"><span style="width:'+Math.min(100,ctx.pct*100)+'%"></span></div>'
  +'<div class="ds-ctx-meta">'+fmtTok(ctx.used)+' / '+fmtTok(ctx.window)+' tok</div>'
  +'<div class="ds-ctx-meta">'+t('CTX_BASELINE')+': ~22.4k + agent: '+fmtTok(ctx.used-CTX_BASELINE_TOTAL)+'</div>'
  +'</div>';
```

CSS:
```css
.ds-ctx-box{margin:10px 0;padding:10px;border-radius:8px;border:1px solid var(--bg-input);background:rgba(255,255,255,.02)}
.ds-ctx-box.ctx-safe{border-color:rgba(var(--mc-haiku-rgb),.4);background:rgba(var(--mc-haiku-rgb),.06)}
.ds-ctx-box.ctx-warn{border-color:rgba(var(--mc-opus-rgb),.4);background:rgba(var(--mc-opus-rgb),.08)}
.ds-ctx-box.ctx-high{border-color:rgba(var(--mc-sonnet-rgb),.5);background:rgba(var(--mc-sonnet-rgb),.1)}
.ds-ctx-box.ctx-danger{border-color:rgba(var(--ph-qa-rgb),.6);background:rgba(var(--ph-qa-rgb),.12)}
.ds-ctx-hdr{display:flex;justify-content:space-between;font-size:11px;color:var(--t2);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}
.ds-ctx-pct{font-weight:700;color:var(--t1)}
.ds-ctx-bar{height:6px;border-radius:3px;background:var(--bg-input);overflow:hidden}
.ds-ctx-bar span{display:block;height:100%;background:var(--mc-haiku);transition:width .3s}
.ds-ctx-box.ctx-warn .ds-ctx-bar span{background:var(--mc-opus)}
.ds-ctx-box.ctx-high .ds-ctx-bar span{background:var(--mc-sonnet)}
.ds-ctx-box.ctx-danger .ds-ctx-bar span{background:var(--ph-qa)}
.ds-ctx-meta{font-size:10px;color:var(--t3);margin-top:4px}
```

### 3.5 Cost Modal - nowa zakladka "Context"

Dodaj 5-ta zakladke do `cbm-tabs` (linia ~1185):

```html
<button class="cbm-tab" onclick="cbmTab('context')" data-tab="context">
  <span class="cbm-tab-icon">🧠</span>
  <span data-i18n="CBM_TAB_CONTEXT">Kontekst</span>
</button>
```

I container:
```html
<div id="cbmContext" class="cbm-pane"></div>
```

Render funkcja `renderCbmContext()`:
```javascript
function renderCbmContext(){
  const el=G('cbmContext');if(!el)return;
  if(!nodes.length){el.innerHTML='<div class="cbm-empty">'+t('NO_AGENTS')+'</div>';return;}
  const ctx=calcPresetMaxCtx();
  const sorted=[...ctx.allPcts].sort((a,b)=>b.pct-a.pct);
  let h='<div class="cbm-ctx-summary">';
  h+='<div class="cbm-kpi"><div class="cbm-kpi-lbl">'+t('CTX_MAX_AGENT')+'</div><div class="cbm-kpi-val sev-'+ctx.worstSev+'">'+fmtPct(ctx.maxPct)+'</div><div class="cbm-kpi-sub">'+(ctx.maxAgent?ADmap(ctx.maxAgent.defId).n:'-')+'</div></div>';
  h+='<div class="cbm-kpi"><div class="cbm-kpi-lbl">'+t('CTX_OVER_TARGET')+'</div><div class="cbm-kpi-val">'+sorted.filter(p=>p.pct>CTX_PREMIUM_TARGET).length+' / '+sorted.length+'</div><div class="cbm-kpi-sub">'+t('CTX_TARGET_50')+'</div></div>';
  h+='<div class="cbm-kpi"><div class="cbm-kpi-lbl">'+t('CTX_AVG')+'</div><div class="cbm-kpi-val">'+fmtPct(sorted.reduce((s,p)=>s+p.pct,0)/sorted.length)+'</div></div>';
  h+='</div>';
  // Lista agentow z paskami
  h+='<div class="cbm-ctx-list">';
  sorted.forEach(p=>{
    const sev=getCtxSeverity(p.pct);
    const ag=ADmap(p.defId);
    h+='<div class="cbm-ctx-row sev-'+sev+'">';
    h+='<div class="cbm-ctx-name">'+(ag?ag.n:p.defId)+' <span class="cbm-ctx-mdl b-'+(p.model[0]==='o'?'op':p.model[0]==='s'?'so':'ha')+'">'+p.model+'</span></div>';
    h+='<div class="cbm-ctx-bar-wrap"><div class="cbm-ctx-bar"><span style="width:'+Math.min(100,p.pct*100)+'%"></span></div><div class="cbm-ctx-num">'+fmtPct(p.pct)+'</div></div>';
    h+='<div class="cbm-ctx-tok">'+fmtTok(p.used)+' / '+fmtTok(p.window)+'</div>';
    h+='</div>';
  });
  h+='</div>';
  // Tip box
  h+='<div class="cbm-tip">💡 '+t('CTX_TIP_ISOLATION')+'</div>';
  el.innerHTML=h;
}
```

CSS dla nowej zakladki:
```css
.cbm-ctx-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px}
.cbm-ctx-list{display:flex;flex-direction:column;gap:8px}
.cbm-ctx-row{display:grid;grid-template-columns:200px 1fr 110px;gap:12px;align-items:center;padding:8px 12px;border-radius:6px;background:rgba(255,255,255,.02);border:1px solid var(--bg-input)}
.cbm-ctx-row.sev-warn{border-color:rgba(var(--mc-opus-rgb),.35)}
.cbm-ctx-row.sev-high{border-color:rgba(var(--mc-sonnet-rgb),.4)}
.cbm-ctx-row.sev-danger{border-color:rgba(var(--ph-qa-rgb),.5);background:rgba(var(--ph-qa-rgb),.06)}
.cbm-ctx-name{font-size:12px;color:var(--t1)}
.cbm-ctx-mdl{padding:1px 6px;border-radius:4px;font-size:9px;margin-left:4px}
.cbm-ctx-bar-wrap{display:flex;align-items:center;gap:8px}
.cbm-ctx-bar{flex:1;height:8px;background:var(--bg-input);border-radius:4px;overflow:hidden}
.cbm-ctx-bar span{display:block;height:100%;background:var(--mc-haiku);transition:width .3s}
.cbm-ctx-row.sev-warn .cbm-ctx-bar span{background:var(--mc-opus)}
.cbm-ctx-row.sev-high .cbm-ctx-bar span{background:var(--mc-sonnet)}
.cbm-ctx-row.sev-danger .cbm-ctx-bar span{background:var(--ph-qa)}
.cbm-ctx-num{font-size:11px;font-weight:700;color:var(--t1);min-width:36px;text-align:right}
.cbm-ctx-tok{font-size:10px;color:var(--t3);text-align:right}
.cbm-tip{margin-top:14px;padding:10px;background:rgba(var(--ph-strategy-rgb),.08);border:1px solid rgba(var(--ph-strategy-rgb),.25);border-radius:6px;font-size:11px;color:var(--t2)}
```

### 3.6 Tooltips i nowe stringi i18n

Do `I18N_EN` dodaj:
```javascript
CTX_USAGE:'Context usage',
CTX_BASELINE:'Baseline',
CTX_MAX_AGENT:'Heaviest agent',
CTX_OVER_TARGET:'Over 50% target',
CTX_TARGET_50:'Premium target',
CTX_AVG:'Average usage',
CTX_TIP_ISOLATION:'Subagents are isolated - each gets a fresh window. We display MAX, not SUM. Source: Anthropic Claude Code subagent docs.',
CBM_TAB_CONTEXT:'Context',
NO_AGENTS:'Drop agents on canvas to see metrics'
```

Polskie default (juz w UI):
```
CTX_USAGE: 'Wykorzystanie kontekstu'
CTX_BASELINE: 'Bazowy narzut'
CTX_MAX_AGENT: 'Najciezszy agent'
CTX_OVER_TARGET: 'Powyzej celu 50%'
CTX_TARGET_50: 'Cel premium'
CTX_AVG: 'Srednie wykorzystanie'
CTX_TIP_ISOLATION: 'Subagenci sa izolowani - kazdy dostaje swieze okno. Pokazujemy MAX, nie SUM. Zrodlo: Anthropic Claude Code subagent docs.'
```

---

## 4. FEATURE 2: Premium Preset Tier

### 4.1 Definicja
Preset jest "premium" jezeli spelnia WSZYSTKIE warunki:
- 6+ agentow
- Wszyscy agenci pasuja do `<50% kontekstu` (kalkulowane przy zaladowaniu, jezeli model pozwala)
- Posiada `tier:'premium'` w definicji
- Posiada `source:` - zrodlo blueprintu
- Domyslnie wszyscy na Opusie (`model:'opus'`) - uzytkownik moze obnizyc

### 4.2 Premium badge w palette

W `rPalete()` lub odpowiedniku dla presetow, jezeli `p.tier==='premium'`, dodaj:
```html
<span class="pa-tier-badge">PREMIUM</span>
```

CSS:
```css
.pa-tier-badge{display:inline-block;padding:1px 6px;font-size:9px;font-weight:700;letter-spacing:.5px;background:linear-gradient(135deg,var(--mc-opus),var(--mc-sonnet));color:#000;border-radius:3px;margin-left:6px;vertical-align:middle}
```

### 4.3 13 nowych premium presetow

> **Wszystkie preset agenci domyslnie na `opus`**, chyba ze zaznaczono inaczej.
> **Wszystkie nowe presety maja `tier:'premium'`, `source:'<url>'`.**
> **Format ponizej** to specyfikacja, nie kod JS - implementacja w `PSETY` musi nastapic z prawdziwymi defId i nodes/conns. Skladnia identyczna jak istniejace v32.5 presets.

---

#### Preset 1: `deep_research_swarm_pro` - Deep Research Swarm Pro / Glebokie Badanie Pro
- **Kategoria**: research
- **Use case**: Anthropic-style lead-researcher blueprint dla zlozonych multi-source investigations (market landscape, competitive intel, scientific lit review).
- **Liczba agentow**: 11
- **Sklad**:
  1. `orchestrator` - LeadResearcher, planuje + decomposes
  2. `res_tech` - frameworks/architektura (1 zrodlo)
  3. `res_docs` - oficjalne specs (1 zrodlo)
  4. `res_github` - real code patterns (1 zrodlo)
  5. `res_reddit` - voice of community (1 zrodlo)
  6. `res_x` - signaly trendow (1 zrodlo)
  7. `res_forums` - best practices threads (1 zrodlo)
  8. `res_ux` - design trends (1 zrodlo)
  9. NEW `res_academic` - papers/arxiv (1 zrodlo) [custom built-in]
  10. `res_critic` - waliduje, flaguje gaps i sprzecznosci
  11. `synthesizer` - pisze finalny raport z cytatami
- **Faza**: strategy (orchestrator) -> research (8 parallel) -> qa (critic) -> build (synthesizer)
- **Why premium**: Bezposrednia implementacja Anthropic blueprint - kazdy researcher ma EXPLICIT boundary instructions w prompcie ("ty owns tylko subreddity, nie dotykasz X").
- **Context budget**: Kazdy researcher czyta ~30-50k tokenow swojej dzialki, wraca z 2k summary. Lead synthesizer dostaje 8x 2k = 16k zamiast 400k raw. **Najwiekszy uzytkownik kontekstu = synthesizer ~80k = 8% Opus 1M = SAFE.**
- **Source**: anthropic.com/engineering/multi-agent-research-system

---

#### Preset 2: `migration_crew` - Codebase Migration Crew / Ekipa Migracji Kodu
- **Kategoria**: build (refactor)
- **Use case**: Migracja legacy codebase do nowego stack (Java 8 -> 21, Angular -> React, Python 2 -> 3, REST -> gRPC).
- **Liczba agentow**: 10
- **Sklad**:
  1. `orchestrator`
  2. `analyst` - inwentaryzuje legacy
  3. `planner` - migration strategy
  4. `res_github` (instance 1) - explore: auth-files (boundary)
  5. `res_github` (instance 2) - explore: data-access (boundary)
  6. `res_github` (instance 3) - explore: routes/handlers (boundary)
  7. `backend` - migrates modules
  8. `integrator` - wires interop shims
  9. `qa_quality`
  10. `decision_presenter` - HITL gate: big-bang vs strangler fig
- **Faza**: strategy -> research (3 parallel explorers) -> hitl -> build -> qa
- **Why premium**: 3 parallel explorers, kazdy z EXPLICIT scope w prompcie. HITL gate przed jakimkolwiek kodem. Basic `legacy` preset ma 1 explorer i zero gates.
- **Context budget**: Kazdy explorer czyta ~30k jednego subsystemu. Planner dostaje 3x 3k summary.
- **Source**: docs.claude.com/en/docs/agent-sdk/subagents + wshobson/agents migration plugin

---

#### Preset 3: `fullstack_premium` - Full-Stack Feature Crew Premium / Pelny Stack Premium
- **Kategoria**: build
- **Use case**: Production-ready feature end-to-end z observability, security, deploymentem.
- **Liczba agentow**: 12
- **Sklad**:
  1. `orchestrator`
  2. `analyst`
  3. `planner`
  4. `res_ux`
  5. `res_docs`
  6. `designer`
  7. NEW `db_architect` - schema design [custom built-in]
  8. `backend`
  9. `frontend`
  10. `integrator`
  11. `qa_security`
  12. NEW `observability_engineer` - logs/metrics/traces [custom built-in]
- **Faza**: strategy -> research (ux+docs parallel) -> build (db -> backend+frontend parallel -> integrator -> designer polish) -> qa (security) -> obs pass
- **Why premium**: wshobson 7-agent fullstack + UX research + observability. Basic `saas` preset (10 agentow) nie ma observability ani db_architect.
- **Context budget**: Backend/frontend dziala na disjoint file globs (controlled by prompt). Kazdy ~40k. db_architect tylko schema files.
- **Source**: github.com/wshobson/agents fullstack orchestrator + Magentic-One Coder/Terminal separation

---

#### Preset 4: `security_multi_vector` - Multi-Vector Security Audit / Wielowektorowy Audyt
- **Kategoria**: qa
- **Use case**: Pre-release security sweep: code, deps, infra, secrets, threat model.
- **Liczba agentow**: 9
- **Sklad**:
  1. `orchestrator`
  2. `analyst` - STRIDE threat model
  3. `qa_security` - code audit
  4. NEW `deps_auditor` - dependency CVEs [custom built-in]
  5. NEW `infra_auditor` - IaC review (Terraform/K8s) [custom built-in]
  6. NEW `secrets_auditor` - leaked credentials scan [custom built-in]
  7. NEW `auth_auditor` - authn/authz patterns [custom built-in]
  8. `qa_manager` - consolidates severity matrix
  9. `decision_presenter` - HITL release gate
- **Faza**: strategy (STRIDE) -> qa (5 parallel scanners on disjoint vectors) -> qa_manager -> hitl
- **Why premium**: Basic `security` ma 3 sequential. Tu 5 parallel + threat model first + release gate. SOC2-aligned audit trail.
- **Context budget**: Kazdy auditor loaduje TYLKO swoj scope (deps -> manifests, infra -> terraform, secrets -> grep wynikow). Nikt nie czyta calego kodu.
- **Source**: wshobson/agents security plugin, SkillProbe arxiv

---

#### Preset 5: `perf_squad` - Performance Investigation Squad / Oddzial Sledczy Wydajnosci
- **Kategoria**: qa
- **Use case**: Root-cause prod regression: profile, hypothesize, test fix, verify.
- **Liczba agentow**: 8
- **Sklad**:
  1. `orchestrator`
  2. `analyst` - czyta traces/profiles
  3. NEW `db_perf_specialist` - query plans, indexes [custom built-in]
  4. NEW `frontend_perf_specialist` - lighthouse, bundle [custom built-in]
  5. NEW `backend_perf_specialist` - flame graphs [custom built-in]
  6. `expert_devil` - attacks every hypothesis
  7. `qa_perf` - benchmarks fixes
  8. `synthesizer` - RCA doc
- **Faza**: strategy -> research (3 perf specs hypothesize parallel on disjoint layers) -> debate (devil) -> qa (qa_perf benchmarks) -> synthesis
- **Why premium**: Five Minds adversarial + parallel diagnostic specialists. Basic `perf-boost` ma 1 backend + 1 qa_perf.
- **Context budget**: Kazdy spec czyta TYLKO swoj layer (db -> explain plans, frontend -> lighthouse JSON, backend -> flame graphs).
- **Source**: wshobson performance plugin + AutoGen GroupChat hypothesis-driven

---

#### Preset 6: `prd_to_launch` - PRD to Launch Pipeline / Pipeline PRD do Launchu
- **Kategoria**: product (NEW kategoria)
- **Use case**: Konwersja idei/transcryptu na full launch package (PRD, tickets, designs, copy, GTM).
- **Liczba agentow**: 11
- **Sklad**:
  1. `orchestrator`
  2. `analyst` - JTBD extraction
  3. `res_ux` - competitive
  4. `res_reddit` - voice of customer
  5. NEW `prd_writer` - structured PRD [custom built-in]
  6. NEW `ticket_builder` - user stories [custom built-in]
  7. `designer` - mockups
  8. `writer` - launch copy
  9. NEW `gtm_strategist` - go-to-market [custom built-in]
  10. `res_critic` - consistency
  11. `decision_presenter` - PM sign-off
- **Faza**: strategy (JTBD) -> research (UX+reddit parallel) -> build (prd_writer -> {ticket_builder + designer + writer + gtm_strategist} parallel) -> qa (critic) -> hitl
- **Why premium**: MetaGPT/IBM PRD-to-tickets blueprint + full launch assets. Brak istniejacego presetu w product space.
- **Context budget**: prd_writer to JEDYNY agent czytajacy caly transcript (~30k). Downstream builders dostaja tylko skompresowany PRD (~5k) + swoja domain slice.
- **Source**: ibm.com/think/tutorials/multi-agent-prd-ai-automation-metagpt

---

#### Preset 7: `ab_test_lab` - A/B Test Design Lab / Laboratorium A/B
- **Kategoria**: product
- **Use case**: Rygorystyczny A/B test: hipoteza, power calc, warianty, guardrails, readout.
- **Liczba agentow**: 7
- **Sklad**:
  1. `orchestrator`
  2. NEW `statistician` - power calc, effect size [custom built-in]
  3. `analyst` - baseline metrics
  4. `res_ux` - benchmark
  5. `designer` - variant mocks
  6. `expert_devil` - p-hacking red team (SRM, peeking, Simpson)
  7. `decision_presenter` - stat sign-off
- **Faza**: strategy (hipoteza+power) -> research (baseline+ux) -> build (variants+guardrails) -> debate (devil) -> hitl
- **Why premium**: Statistical rigor + adversarial red team + design handoff. Brak rownowaznego.
- **Context budget**: Statistician potrzebuje tylko metric defs + variance (~10k). Designer tylko variant spec.
- **Source**: CrewAI Lead Score Flow HITL + Five Minds template

---

#### Preset 8: `kb_constructor` - Knowledge Base Constructor / Konstruktor Bazy Wiedzy
- **Kategoria**: knowledge (NEW kategoria)
- **Use case**: Build wiki/KB ze scattered sources (Slack exports, old wiki, PDFs, READMEs).
- **Liczba agentow**: 10
- **Sklad**:
  1. `orchestrator`
  2. NEW `slack_ingester` - normalize Slack [custom built-in]
  3. NEW `wiki_ingester` - normalize old wiki [custom built-in]
  4. NEW `pdf_ingester` - extract+chunk PDFs [custom built-in]
  5. `res_github` - READMEs harvester
  6. `analyst` - taxonomy design
  7. NEW `deduplicator` - dedup chunks [custom built-in]
  8. `writer` - article drafting
  9. `res_critic` - fact-check
  10. `integrator` - publish to portal
- **Faza**: strategy (taxonomy) -> research (4 parallel ingesters, kazdy 1 source type) -> build (dedup -> writer -> integrator) -> qa (critic spot-check)
- **Why premium**: Deep research swarm pattern applied to internal knowledge. Brak istniejacego.
- **Context budget**: Kazdy ingester emituje normalized chunk format (~20% raw). Deduplicator widzi tylko chunks.
- **Source**: LangChain DeepAgents virtual filesystem + NVIDIA enterprise search

---

#### Preset 9: `tech_writing_pipe` - Technical Writing Pipeline / Pipeline Pisania Technicznego
- **Kategoria**: knowledge
- **Use case**: Long-form tech piece (deep-dive blog, whitepaper, talk) z rough outline.
- **Liczba agentow**: 8
- **Sklad**:
  1. `orchestrator`
  2. `res_docs`
  3. `res_github` - code examples
  4. `analyst` - outline
  5. `writer`
  6. `designer` - diagrams
  7. `res_critic` - facts + tone
  8. NEW `seo_optimizer` - titles/meta/keywords [custom built-in]
- **Faza**: strategy (outline+audience) -> research (docs+code parallel) -> build (writer drafts -> designer diagrams -> seo) -> qa (critic)
- **Why premium**: Basic `content` ma 4 agentow. Tu pelny pipeline z code-examples, diagrams, SEO.
- **Context budget**: Writer to jedyny holding draft (~20k). Designer czyta tylko section headers + diagram briefs. SEO tylko titles/metadata.
- **Source**: CrewAI Content Creator Flow + wshobson technical-writing plugin

---

#### Preset 10: `five_minds_strategic` - Five Minds Strategic Forecast / Prognoza Strategiczna 5 Umyslow
- **Kategoria**: hybrid (research + debate)
- **Use case**: High-stakes strategic question gdzie pomylka kosztuje (pivot, akwizycja, technologia).
- **Liczba agentow**: 13
- **Sklad**:
  1. `orchestrator`
  2. `res_tech` (parallel)
  3. `res_reddit` (parallel)
  4. `res_forums` (parallel)
  5. `res_docs` (parallel)
  6. `analyst` - framing
  7. `expert_innovator`
  8. `expert_pragmatist`
  9. `expert_analyst`
  10. `expert_user`
  11. `expert_devil`
  12. `synthesizer`
  13. `decision_presenter`
- **Faza**: research (4 parallel) -> strategy (framing) -> debate (3 rounds: opinions, cross-examination, gold) -> hitl
- **Why premium**: Grunt Five Minds debate w prawdziwym researchu. Basic `five-minds` nie ma upfront research; `deep-five-minds` uzywa default researchers.
- **Context budget**: Kazdy expert czyta TYLKO synthesizer's framing brief (~10k) + swoj persona prompt, nie raw research.
- **Source**: Deep Five Minds v12v3 + Anthropic research blueprint hybrid

---

#### Preset 11: `soc2_sweep` - SOC2 Compliance Sweep / Przeglad Zgodnosci SOC2
- **Kategoria**: compliance (NEW kategoria)
- **Use case**: Przygotowanie do SOC2 Type II audit - policy review, evidence, control mapping, gap analysis.
- **Liczba agentow**: 9
- **Sklad**:
  1. `orchestrator`
  2. NEW `policy_reader` - policies/SOPs [custom built-in]
  3. NEW `control_mapper` - links evidence to CC1-CC9 [custom built-in]
  4. NEW `evidence_collector` - logs/screenshots/configs [custom built-in]
  5. NEW `gap_analyzer` - missing controls [custom built-in]
  6. `qa_security` - tech controls
  7. `writer` - auditor-facing report
  8. `res_critic`
  9. `decision_presenter` - CISO sign-off
- **Faza**: strategy (Trust Services Criteria scope) -> research (policy_reader + evidence_collector parallel) -> build (control_mapper -> gap_analyzer) -> qa -> hitl
- **Why premium**: Brak governance presetow. Match "separate intent from execution" audit-trail pattern.
- **Context budget**: policy_reader tylko docs, evidence_collector tylko logs. Kazdy CC (CC6.1 etc) jako discrete unit.
- **Source**: policylayer.com SOC2 for AI agents

---

#### Preset 12: `data_analysis_pipe` - Data Analysis Pipeline / Pipeline Analizy Danych
- **Kategoria**: data (NEW kategoria)
- **Use case**: Raw datasets -> stakeholder-ready analiza: ingest, clean, EDA, modeling, narrative.
- **Liczba agentow**: 9
- **Sklad**:
  1. `orchestrator`
  2. NEW `data_collector` - ingest+profile [custom built-in]
  3. NEW `data_cleaner` - dedup, normalize, missing [custom built-in]
  4. NEW `eda_analyst` - distributions, correlations [custom built-in]
  5. NEW `sql_specialist` - query optimization [custom built-in]
  6. NEW `model_builder` - ML/stats models [custom built-in]
  7. `writer` - narrative report
  8. `designer` - charts
  9. `res_critic` - stats sanity (assumptions, leakage)
- **Faza**: research (collector ingests) -> build (cleaner -> eda+sql parallel -> model_builder) -> report (writer+designer parallel) -> qa (critic)
- **Why premium**: Match arxiv 2510.04023 LLM Data Science Agents survey blueprint. Basic `data-pipe` ma planning+backend+feature.
- **Context budget**: collector emituje profile (schema+stats+samples ~5k) zamiast raw data. eda i sql dostaja tylko profile. model_builder cleaned sample.
- **Source**: arxiv.org/html/2510.04023v1 LLM Data Science Agents survey

---

#### Preset 13: `incident_war_room` - Incident Response War Room / Pokoj Wojenny Incydentu
- **Kategoria**: ops (NEW kategoria)
- **Use case**: Live prod incident triage: symptom -> blast radius -> hypothesis -> mitigation -> postmortem.
- **Liczba agentow**: 10
- **Sklad**:
  1. `orchestrator` - Incident Commander
  2. NEW `telemetry_surfer` - metrics dashboards [custom built-in]
  3. NEW `log_analyst` - error logs grep [custom built-in]
  4. NEW `diff_investigator` - recent deploys [custom built-in]
  5. `qa_perf`
  6. `qa_security`
  7. `expert_devil` - challenges leading hypothesis
  8. NEW `comms_officer` - status page updates [custom built-in]
  9. `writer` - postmortem
  10. `decision_presenter` - rollback gate
- **Faza**: strategy (severity + war room) -> research (telemetry+logs+diff parallel) -> qa (perf+security rule-outs) -> debate (devil) -> hitl (rollback) -> build (comms + postmortem)
- **Why premium**: Magentic-One dual-ledger pattern dla SRE. Brak ops/incident presetow.
- **Context budget**: telemetry_surfer tylko metrics, log_analyst tylko error logs, diff_investigator tylko recent diffs. Kazdy compresses do 2k bundle dla commandera.
- **Source**: Microsoft Magentic-One Task Ledger/Progress Ledger

---

### 4.4 Walidacja: zadnemu agentowi w premium presecie nie wolno przekroczyc 50% kontekstu

Po zaladowaniu presetu (`zaladujPreset()`), uruchom walidacje:

```javascript
function walidujPremiumCtx(presetId){
  const ctx=calcPresetMaxCtx();
  if(ctx.maxPct>CTX_PREMIUM_TARGET){
    console.warn('Premium preset '+presetId+' przekracza 50% target: '+fmtPct(ctx.maxPct)+' ('+ctx.maxAgent.defId+')');
    // opcjonalnie: anuncjuj uzytkownikowi
    announce(t('PREMIUM_OVER_TARGET')+': '+fmtPct(ctx.maxPct));
  }
}
```

W praktyce - przy obliczeniach z research:
- Najwiekszy uzytkownik to **synthesizer = 80k input** = **8% Opus 1M** lub **40% Haiku 200K**
- Wszyscy premium na Opusie -> wszystkie agenty ponizej 10% kontekstu = SAFE
- Najgorszy case: **observability_engineer / db_architect** custom -> seed wartoscia 40-60k input -> max 6% Opus 1M

**Wiec wszystkie premium presety beda comfortably <10% kontekstu na Opusie. Cel <50% jest osiagniety z duzym zapasem.**

---

## 5. FEATURE 3: Bug fix Sonnet 4.6 ctx (200K -> 1M)

Sonnet 4.6 ma **1M context window** (potwierdzone w platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-6).

Aktualnie wyswietla `200K ctx` w 4 miejscach:

| # | Linia | Lokacja |
|---|---|---|
| 1 | ~4109 | `pokazWezel()` agent detail sidebar |
| 2 | ~4243 | multi-select sidebar |
| 3 | ~4890 | preset info sidebar |
| 4 | ~5452 | agent bento card |

**Fix**: Zamien `200K ctx` na `1M ctx` dla Sonnet w kazdym z 4 miejsc. **Haiku zostaje 200K** (Haiku 4.5 nie ma 1M).

Lepiej (cleaner): wprowadz `MODEL_CTX` constant (juz w sekcji 3.1) i refactor template strings:

```javascript
const ctxLabel={opus:'1M',sonnet:'1M',haiku:'200K'};
// w templatce:
'<div>'+ctxLabel[d.model]+' ctx</div>'
```

---

## 6. FEATURE 4: 7 nowych built-in agentow (z prom. 13 presetow)

Na podstawie research, te 7 custom agentow powtarzaja sie w >2 premium presetach. Zamien je na **first-class built-in agents** w `AD` array:

| # | id | name PL | name EN | cat | phase | model default | avg tokens i/o | uzyte w presetach |
|---|---|---|---|---|---|---|---|---|
| 1 | `db_architect` | Architekt Bazy | DB Architect | build | build | sonnet | 50k/8k | fullstack_premium |
| 2 | `observability_engineer` | Inzynier Obserwowalnosci | Observability Engineer | build | build | sonnet | 40k/6k | fullstack_premium |
| 3 | `gtm_strategist` | Strateg GTM | GTM Strategist | product | build | sonnet | 30k/5k | prd_to_launch |
| 4 | `statistician` | Statystyk | Statistician | data | strategy | sonnet | 20k/4k | ab_test_lab |
| 5 | `eda_analyst` | Analityk EDA | EDA Analyst | data | build | sonnet | 50k/8k | data_analysis_pipe |
| 6 | `control_mapper` | Mapper Kontroli | Control Mapper | compliance | build | sonnet | 30k/5k | soc2_sweep |
| 7 | `telemetry_surfer` | Surfer Telemetrii | Telemetry Surfer | ops | research | sonnet | 35k/4k | incident_war_room |

Pozostali (~25 nowych custom) zostaja w premium presetach jako **preset-scoped customs** - dostarczone w specjalnym `PRESET_CUSTOM_AGENTS` ktore sie auto-tworza przy zaladowaniu presetu.

### 6.1 Nowe AGENT_TOKENS entries (dodaj do linia ~2827)

```javascript
db_architect:{i:50000,o:8000},
observability_engineer:{i:40000,o:6000},
gtm_strategist:{i:30000,o:5000},
statistician:{i:20000,o:4000},
eda_analyst:{i:50000,o:8000},
control_mapper:{i:30000,o:5000},
telemetry_surfer:{i:35000,o:4000}
```

### 6.2 Nowe AGENT_KNOWLEDGE entries
Kazdy z 7 powyzszych potrzebuje wpisu z:
- `who:` - 1-zd. opis
- `analogy:` - cytat
- `does:` - lista 4-6 punktow
- `doesNot:` - lista 3-4 punkty
- `antiPatterns:` - lista 2-3
- `facts:` - 2-3 ciekawostki

Tresci do wygenerowania w czasie implementacji v32.6.

### 6.3 Nowe SVG ikony i kolory
Wybierz z istniejacej `CUSTOM_ICONS` library (159 ikon, sekcja v32.2). Sugestie:
- `db_architect` -> `database_stack`
- `observability_engineer` -> `gauge_chart`
- `gtm_strategist` -> `rocket`
- `statistician` -> `bell_curve`
- `eda_analyst` -> `scatter_plot`
- `control_mapper` -> `checklist`
- `telemetry_surfer` -> `pulse_wave`

Kolory z istniejacej palety (`AGENT_ICON_COLOR`):
- `db_architect` -> blue
- `observability_engineer` -> cyan
- `gtm_strategist` -> rose
- `statistician` -> violet
- `eda_analyst` -> cyan
- `control_mapper` -> green
- `telemetry_surfer` -> amber

---

## 7. localStorage migration

```javascript
function ladujCustomAgentow(){
  let customs=safeParseLS('acV32_6_custom',null);
  if(!customs){
    customs=safeParseLS('acV32_5_custom',null)
      ||safeParseLS('acV32_4_custom',null)
      ||safeParseLS('acV32_3_custom',null)
      ||safeParseLS('acV32_2_custom',null)
      ||safeParseLS('acV32_1_custom',null)
      ||safeParseLS('acV32_custom',[])
      ||[];
    if(customs.length)safeSaveLS('acV32_6_custom',customs);
  }
  customs.forEach(function(a){a.isCustom=true;if(!a.iconRef)a.iconRef='';AD.push(a);AD_MAP.set(a.id,a)});
}
```

Zapis: `safeSaveLS('acV32_6_custom', customs)` we wszystkich miejscach (`zapiszCustom`, `usunCustomAgent`).

Eksport: `eksportujKfg` - `v:'32.6'`.

Title bumps: `Agent Architecture Designer v32.6 | Premium Presets + Context Budget Edition`.

---

## 8. Walidacja v32.6

Przed merge nalezy zweryfikowac:

1. **JS parse OK** - `node -e "const fs=require('fs'); ... new Function(js)"` zwraca 1/1 blocks.
2. **Wszystkie 13 nowych premium presetow ladowalne** - kliknij kazdy w UI, nie ma errors w konsoli.
3. **Walidacja kontekstu** - dla kazdego z 13 nowych presetow `calcPresetMaxCtx().maxPct < 0.50` (50%).
4. **Sonnet 4.6 wyswietla "1M ctx"** w 4 miejscach wymienionych w sekcji 5.
5. **localStorage migracja** - test: zapisz custom agent w v32.5, otworz v32.6, custom widoczny.
6. **Eksport JSON** - zawiera `v:'32.6'`, premium presets, ctx metadata.
7. **Cost Modal -> Context tab** - renderuje liste agentow z paskami.
8. **Topbar HUD** - 4-ta cell `CTX MAX` widoczna, kolor zmienia sie przy >65%.
9. **Kompatybilnosc wsteczna** - v32.5 presets zachowuja sie identycznie.
10. **i18n PL/EN** - wszystkie nowe stringi maja tlumaczenia w obu jezykach.

---

## 9. Pliki do modyfikacji (lokalizacja zmian)

| Plik | Akcja |
|---|---|
| `v32.6/AGENT_TEAMS_CONFIGURATOR_v32_6.html` | NOWY - kopia v32.5 + zmiany sekcji 3-7 |
| `index.html` | OVERWRITE - mirror v32.6 |
| `CLAUDE.md` | DOPISZ entry v32.6 z opisem 4 features + bump Current version pointer |

Linie do zmian w nowym v32.6 (w odniesieniu do v32.5 baseline):

| Sekcja | Linia (v32.5) | Co |
|---|---|---|
| Title | 20 | bump na v32.6 |
| MODEL_CTX const | po 2818 | NOWE - okna kontekstu |
| CTX_BASELINE const | po 2818 | NOWE - baseline overhead |
| CTX_SEVERITY const | po 2818 | NOWE - progi |
| AGENT_TOKENS | 2827 | dodaj 7 nowych entries |
| AD array | gdzie sa def agentow | dodaj 7 nowych built-in |
| AGENT_KNOWLEDGE | gdzie definiowane | dodaj 7 entries |
| AGENT_SVG / AGENT_ICON_COLOR | gdzie definiowane | dodaj 7 entries |
| PSETY (presets) | gdzie definiowane | dodaj 13 nowych premium |
| PRESET_KNOWLEDGE | gdzie definiowane | dodaj 13 entries (who/use/whenToUse/whenNotToUse/keyFeatures) |
| calcAgentCtx, calcPresetMaxCtx, getCtxSeverity, fmtPct | po 4263 | NOWE funkcje |
| aktKoszt | 4269-4288 | dodaj 4-ta cell CTX MAX |
| pokazWezel | 4099 model buttons block | dodaj ds-ctx-box po model buttons |
| pokazWezel | 4109-4111 | fix Sonnet 200K -> 1M |
| multi-select sidebar | 4243-4245 | fix Sonnet 200K -> 1M |
| preset info sidebar | 4890-4892 | fix Sonnet 200K -> 1M |
| bento agent card | 5452 | fix Sonnet 200K -> 1M |
| moCost modal HTML | 1185-1209 | dodaj 5-ta zakladka Context |
| renderCbmContext | po renderCbmExport | NOWA funkcja |
| cbmTab dispatch | gdzie tabsy | dodaj `case 'context'` |
| ladujCustomAgentow | 5231-5256 | bump na acV32_6_custom z migration chain |
| zapiszCustom / usunCustomAgent | gdzie zapisuje | bump key |
| eksportujKfg | 5259 | v:'32.6' |
| I18N_EN | gdzie definiowane | dodaj nowe stringi z sekcji 3.6 |
| polskie defaults | gdzie definiowane | dodaj polskie odpowiedniki |
| CSS .tbc-ctx, .ds-ctx-box, .cbm-ctx-* | gdzie inne style | NOWE bloki |
| .pa-tier-badge | gdzie palette styles | NOWY badge |
| rPalete (preset listing) | gdzie | dodaj badge dla tier:'premium' |
| walidujPremiumCtx | po zaladujPreset | NOWA funkcja, hook po zaladowaniu |

---

## 10. Implementation order (sugerowana kolejnosc)

1. **Setup**: skopiuj v32.5 -> v32.6/AGENT_TEAMS_CONFIGURATOR_v32_6.html, bump title.
2. **Bug fix Sonnet 200K -> 1M** (4 miejsca + nowy `MODEL_CTX` const) - low risk warmup.
3. **Context Budget core**: stale + 4 nowe funkcje + topbar 4-ta cell. Test JS parse.
4. **Per-agent ds-ctx-box** w sidebarze. Test wizualnie.
5. **7 nowych built-in agentow** (AD entries, AGENT_TOKENS, AGENT_KNOWLEDGE, AGENT_SVG, AGENT_ICON_COLOR, AGENT_ICON entry).
6. **13 premium presetow** w PSETY + PRESET_KNOWLEDGE + tier badge. Po kazdym presecie test loadowania w UI.
7. **Cost Modal Context tab** - HTML + renderCbmContext + CSS. Test po zaladowaniu duzego presetu.
8. **walidujPremiumCtx hook** + announce.
9. **i18n** - wszystkie nowe stringi PL/EN.
10. **localStorage migration** - bump key + chain.
11. **Eksport JSON** - v:'32.6'.
12. **Walidacja** - sekcja 8 checklist.
13. **CLAUDE.md update**.
14. **`index.html` mirror**.

---

## 11. Estymacja LOC

- v32.5 baseline: 5704 lines
- Nowe stale (3.1): ~25 lines
- Nowe funkcje calcAgentCtx etc (3.2): ~40 lines
- aktKoszt 4-ta cell (3.3): ~10 lines
- ds-ctx-box w sidebarze (3.4): ~15 lines
- Cost Modal Context tab (3.5): ~80 lines (HTML + JS + CSS)
- i18n stringi (3.6): ~30 lines
- 7 nowych built-in agentow (Feature 4): ~140 lines (AD + tokens + knowledge + SVG/colors)
- 13 premium presetow (Feature 2): ~400 lines (definicje PSETY + PRESET_KNOWLEDGE)
- Bug fix Sonnet (Feature 3): ~10 lines
- localStorage migration: ~5 lines
- Inne CSS: ~50 lines

**Estymacja totalna**: ~5704 + ~805 = **~6500 lines** (+800 vs v32.5).

---

## 12. Sources (full bibliography)

### Anthropic primary
1. [Models overview - Claude API Docs](https://platform.claude.com/docs/en/about-claude/models/overview)
2. [Context windows - Claude API Docs](https://platform.claude.com/docs/en/build-with-claude/context-windows)
3. [What's new in Claude 4.6](https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-6)
4. [Building Effective AI Agents - Anthropic](https://www.anthropic.com/research/building-effective-agents)
5. [How we built our multi-agent research system - Anthropic](https://www.anthropic.com/engineering/multi-agent-research-system)
6. [Effective context engineering for AI agents - Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
7. [Create custom subagents - Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
8. [Subagents in the SDK - Claude API Docs](https://platform.claude.com/docs/en/agent-sdk/subagents)

### Token measurements
9. [Claude Code /context Command - J.D. Hodges](https://www.jdhodges.com/blog/claude-code-context-slash-command-token-usage/)
10. [How Claude Code Builds a System Prompt - Drew Breunig](https://www.dbreunig.com/2026/04/04/how-claude-code-builds-a-system-prompt.html)
11. [Piebald Claude Code System Prompts repo](https://github.com/Piebald-AI/claude-code-system-prompts)
12. [Claude Code MCP Servers Token Overhead - Mind Studio](https://www.mindstudio.ai/blog/claude-code-mcp-server-token-overhead-2)

### Context rot
13. [Context Rot: Why LLMs Degrade - Morph](https://www.morphllm.com/context-rot)
14. [Context Rot in Claude Code - Vincent van der Eth](https://vincentvandeth.nl/blog/context-rot-claude-code-automatic-rotation)
15. [Subagents & Context Isolation - ClaudeWorld](https://claude-world.com/tutorials/s04-subagents-and-context-isolation/)
16. Stanford "Lost in the Middle" (2024)

### Multi-agent frameworks
17. [Magentic-One - Microsoft Research](https://www.microsoft.com/en-us/research/articles/magentic-one-a-generalist-multi-agent-system-for-solving-complex-tasks/)
18. [LangGraph Hierarchical Teams](https://langchain-ai.github.io/langgraph/tutorials/multi_agent/hierarchical_agent_teams/)
19. [LangChain Deep Agents](https://www.langchain.com/deep-agents)
20. [NVIDIA AI-Q Blueprint](https://build.nvidia.com/nvidia/aiq)
21. [CrewAI Examples](https://github.com/crewAIInc/crewAI-examples)
22. [wshobson/agents](https://github.com/wshobson/agents)
23. [VoltAgent awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)
24. [Kimi Agent Swarm](https://www.kimi.com/blog/agent-swarm)

### Domain blueprints
25. [IBM MetaGPT PRD tutorial](https://www.ibm.com/think/tutorials/multi-agent-prd-ai-automation-metagpt-ollama-deepseek)
26. [PolicyLayer SOC2 for AI agents](https://policylayer.com/blog/soc2-compliance-ai-agents)
27. [AgentC2 SOC2 compliance](https://agentc2.ai/blog/soc-2-ai-agents-compliance)
28. [LLM Data Science Agents survey - arxiv 2510.04023](https://arxiv.org/html/2510.04023v1)
29. [SkillProbe - arxiv 2603.21019](https://arxiv.org/html/2603.21019v1)
30. [AutoGen Group Chat](https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/design-patterns/group-chat.html)

---

## 13. Otwarte pytania do uzytkownika przed implementacja

1. **13 czy mniej?** Czy chcesz wszystkie 13 premium presetow czy podzbior (np. tylko 8)? 13 to top quality bo kazdy bazuje na innym blueprincie z research.
2. **Default model dla premium**: na pewno wszyscy na Opusie? Daje to cena ~5x vs Sonnet ale max quality. Sonnet 4.6 ma teraz tez 1M ctx wiec moze byc dobrym fallbackiem - zachowuje quality, taniej.
3. **Kategoria "premium"**: Nowy filter w palette (tab "Premium")? Czy mix z istniejacymi?
4. **7 nowych built-in agentow**: zatwierdzasz wszystkie czy chcesz tylko np. 4-5? Mozna zostawic czesc jako preset-scoped customs.
5. **Walidacja przy zaladowaniu**: tylko console.warn czy modal alert? Modal moze byc agresywny.
6. **CTX cell w topbar**: zawsze widoczna czy tylko gdy >0?

---

## 14. Co jest poza scope v32.6 (mozliwe na v32.7+)

- **Real-time MCP overhead konfig** - slider "ile MCP serverow"
- **Per-agent custom context cap** w settings agenta
- **Context budget historia** - track over time
- **Predykcja kosztu kontekstu** dla custom agentow podczas tworzenia
- **Auto-suggestion**: jezeli agent przekracza 50%, zaproponuj split na 2 mniejsze
- **Visual context flow** - pokaz JAK kontekst plynie miedzy fazami
- **Optimization auto-mode**: kliknij i preset auto-rebalansuje modele

---

**Koniec instrukcji v32.6.** Po akceptacji uzytkownika -> implementacja w nowej sesji.
