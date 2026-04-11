#!/usr/bin/env python3
"""
v32.16 UI Fix: wrap hardcoded Polish labels in V14/V15 encyclopedia renderers
and Cost Modal renderers with t() calls, and add EN translations to I18N_EN.ui.

Atomic replacements: each (old, new) pair must match exactly once.
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "AGENT_TEAMS_CONFIGURATOR_v32_16.html"

src = HTML.read_text(encoding='utf-8')
orig_len = len(src)

def must_replace(old, new, label, n=1):
    global src
    c = src.count(old)
    if c != n:
        print(f"[FAIL] {label}: expected {n} match(es), got {c}")
        print(f"  OLD: {old[:120]}...")
        sys.exit(1)
    src = src.replace(old, new, n)
    print(f"[OK] {label} (x{n})")

# ============================================================================
# STEP 1: Insert new I18N_EN.ui entries
# ============================================================================
# We add a block right after the last entry before the closing brace.
# Anchor: the 'Brama decyzyjna HITL aktywowana...' line is the final entry.

NEW_UI_ENTRIES = """
    // v32.16 UI fix: encyclopedia + cost modal labels
    'Powieksz infografike': 'Enlarge infographic',
    'DLACZEGO JA': 'WHY ME',
    'JAK PRACUJE': 'HOW IT WORKS',
    'META': 'META',
    'Koszt': 'Cost',
    'CO UMIEM': 'WHAT I DO',
    'CZEGO NIE': 'WHAT I DO NOT',
    'PRZYKLAD Z ZYCIA': 'REAL EXAMPLE',
    'Scenariusz': 'Scenario',
    'KIEDY ZAWODZE': 'WHEN I FAIL',
    'CIEKAWOSTKI': 'FACTS',
    'ZANURKUJ': 'DEEP DIVE',
    'Techniczne szczegoly': 'Technical details',
    'Kliknij aby powiekszyc': 'Click to enlarge',
    'Otworz prezentacje PDF (nowe okno)': 'Open PDF presentation (new window)',
    'System prompt': 'System prompt',
    'Miejsce w architekturze': 'Position in architecture',
    'NASTEPNY AGENT': 'NEXT AGENT',
    'Nastepny agent': 'Next agent',
    'ZESPOL': 'TEAM',
    'faza': 'phase',
    'fazy': 'phases',
    'faz': 'phases',
    'DLACZEGO TEN PRESET': 'WHY THIS PRESET',
    'JAK DZIALA': 'HOW IT WORKS',
    'Fazy': 'Phases',
    'Koszt est.': 'Est. cost',
    'Wzorzec': 'Pattern',
    'Tokens': 'Tokens',
    'CO OSIAGASZ': 'WHAT YOU GET',
    'CZEGO NIE OSIAGNIESZ': 'WHAT YOU DO NOT GET',
    'Sklad zespolu + przeplyw + porownanie': 'Team + flow + comparison',
    'Przeplyw faz': 'Phase flow',
    'Agenci w zespole': 'Agents in team',
    'Zielone swiatlo': 'Green light',
    'Czerwone swiatlo': 'Red light',
    'NASTEPNY PRESET': 'NEXT PRESET',
    'Nastepny preset': 'Next preset',
    'Preset': 'Preset',
    'Encyklopedia Universal': 'Encyclopedia Universal',
    'Universal Bilingual': 'Universal Bilingual',
    'do': 'up to',
    '(p90)': '(p90)',
    'avg': 'avg',
    'est. cache:': 'est. cache:',
    'total p50': 'total p50',
    'brak': 'none',
    'Tok In': 'Tok In',
    'Tok Out': 'Tok Out',
    'Cached': 'Cached',
    'Cost p50': 'Cost p50',
    'Cost p90': 'Cost p90',
    'Klikaj naglowki aby sortowac.': 'Click headers to sort.',
    'Cached = wejscie cache-eligible (pricing': 'Cached = cache-eligible input (pricing',
    '%, konfig w zakladce What-if).': '%, config in What-if tab).',
    'Koszt wg modelu: Opus': 'Cost by model: Opus',
    'proc, Sonnet': 'pct, Sonnet',
    'proc, Haiku': 'pct, Haiku',
    'proc': 'pct',
    'Rozklad kosztow na fazy': 'Cost distribution by phase',
    'Breakdown kosztow per agent': 'Per-agent cost breakdown',
    'Blad pobierania:': 'Download error:',
"""

anchor_ui = "    'Brama decyzyjna HITL aktywowana. Wymagana decyzja w 120 sekund.': 'HITL decision gate activated. Decision required within 120 seconds.'\n  }"
new_anchor_ui = "    'Brama decyzyjna HITL aktywowana. Wymagana decyzja w 120 sekund.': 'HITL decision gate activated. Decision required within 120 seconds.',\n" + NEW_UI_ENTRIES.lstrip('\n') + "  }"
must_replace(anchor_ui, new_anchor_ui, "1. Insert UI entries for v32.16 UI fix")

# ============================================================================
# STEP 2: V14 RENDERER - rysujBentoAgentaV14 patches
# ============================================================================

# 2.1 HERO infographic aria-label (both button occurrences share same literal -> replace_all n=2)
must_replace(
    'aria-label="Powieksz infografike">',
    'aria-label="\'+t(\'Powieksz infografike\')+\'">',
    "2.1 V14 infographic aria-label (x2)",
    n=2
)

# 2.2 WHY kicker
must_replace(
    "whyHtml += encKicker('2','DLACZEGO JA');",
    "whyHtml += encKicker('2',t('DLACZEGO JA'));",
    "2.2 V14 WHY kicker"
)

# 2.3 HOW kicker
must_replace(
    "howHtml += encKicker('3','JAK PRACUJE');",
    "howHtml += encKicker('3',t('JAK PRACUJE'));",
    "2.3 V14 HOW kicker"
)

# 2.4 META kicker
must_replace(
    "metaHtml += encKicker('4','META');\n  metaHtml += '<div class=\"enc-meta-grid\">';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">Model</span>",
    "metaHtml += encKicker('4',t('META'));\n  metaHtml += '<div class=\"enc-meta-grid\">';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">'+t('Model')+'</span>",
    "2.4 V14 META kicker + Model label"
)

# 2.5 Faza label (V14 meta)
must_replace(
    "'<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">Faza</span><span class=\"enc-meta-value\">'+encEsc(phLabel)+'</span></div>';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">Koszt</span>",
    "'<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">'+t('Faza')+'</span><span class=\"enc-meta-value\">'+encEsc(phLabel)+'</span></div>';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">'+t('Koszt')+'</span>",
    "2.5 V14 Faza + Koszt labels"
)

# 2.6 Kontekst + Obciazenie + Narzedzia (V14 meta rows)
must_replace(
    "'<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">Kontekst</span><span class=\"enc-meta-value\">'+Math.round(ctx.pct*100)+'%</span></div>';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">Obciazenie</span><span class=\"enc-meta-value\">'+d.load+'%</span></div>';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">Narzedzia</span>",
    "'<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">'+t('Kontekst')+'</span><span class=\"enc-meta-value\">'+Math.round(ctx.pct*100)+'%</span></div>';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">'+t('Obciazenie')+'</span><span class=\"enc-meta-value\">'+d.load+'%</span></div>';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">'+t('Narzedzia')+'</span>",
    "2.6 V14 Kontekst/Obciazenie/Narzedzia labels"
)

# 2.7 CO UMIEM kicker
must_replace(
    "doHtml += encKicker('5','CO UMIEM');",
    "doHtml += encKicker('5',t('CO UMIEM'));",
    "2.7 V14 CO UMIEM kicker"
)

# 2.8 CZEGO NIE kicker
must_replace(
    "dontHtml += encKicker('6','CZEGO NIE');",
    "dontHtml += encKicker('6',t('CZEGO NIE'));",
    "2.8 V14 CZEGO NIE kicker"
)

# 2.9 EXAMPLE kicker (V14 + V15 identical)
must_replace(
    "encKicker('7','PRZYKLAD Z ZYCIA')",
    "encKicker('7',t('PRZYKLAD Z ZYCIA'))",
    "2.9 EXAMPLE kicker", n=2
)
# 2.9b Scenariusz label (V14 + V15 identical)
must_replace(
    '"enc-example-label">Scenariusz</div>',
    '"enc-example-label">\'+t(\'Scenariusz\')+\'</div>',
    "2.9b Scenariusz label", n=2
)
# 2.9c ANTI kicker (V14 + V15 identical)
must_replace(
    "encKicker('8','KIEDY ZAWODZE')",
    "encKicker('8',t('KIEDY ZAWODZE'))",
    "2.9c KIEDY ZAWODZE kicker", n=2
)

# 2.10 FACTS kicker (V14 + V15 identical)
must_replace(
    "encKicker('9','CIEKAWOSTKI')",
    "encKicker('9',t('CIEKAWOSTKI'))",
    "2.10 CIEKAWOSTKI kicker", n=2
)

# 2.11 DEEP DIVE kicker + Techniczne szczegoly (V14)
must_replace(
    "deepHtml += '<summary>'+encKickerInline('10','ZANURKUJ')+'Techniczne szczegoly</summary>';",
    "deepHtml += '<summary>'+encKickerInline('10',t('ZANURKUJ'))+t('Techniczne szczegoly')+'</summary>';",
    "2.11 V14 ZANURKUJ + Techniczne szczegoly"
)

# 2.12 V14 deep infographic zoom hint (aria already handled in 2.1 via replace_all)
must_replace(
    '<span class="enc-zoom-hint">Kliknij aby powiekszyc</span>',
    '<span class="enc-zoom-hint">\'+t(\'Kliknij aby powiekszyc\')+\'</span>',
    "2.12 V14 zoom hint"
)

# 2.13 V14 PDF button label
must_replace(
    "deepHtml += '<a class=\"enc-dl-btn\" href=\"'+pdfHref+'\" target=\"_blank\" rel=\"noopener\" title=\"'+pdfLabel+'\">Otworz prezentacje PDF (nowe okno)</a>';",
    "deepHtml += '<a class=\"enc-dl-btn\" href=\"'+pdfHref+'\" target=\"_blank\" rel=\"noopener\" title=\"'+pdfLabel+'\">'+t('Otworz prezentacje PDF (nowe okno)')+'</a>';",
    "2.13 V14 PDF button"
)

# 2.14 V14 System prompt + Miejsce w architekturze + Porownanie h4 headers
must_replace(
    "deepHtml += '<div><h4>System prompt</h4><pre class=\"enc-prompt\">'+encEsc(getAgentPrompt(aid))+'</pre></div>';\n  deepHtml += '<div><h4>Miejsce w architekturze</h4>'+kartaHierarchii(d.cat)+'</div>';\n  deepHtml += '<div><h4>Porownanie modeli dla tej roli</h4>';",
    "deepHtml += '<div><h4>'+t('System prompt')+'</h4><pre class=\"enc-prompt\">'+encEsc(getAgentPrompt(aid))+'</pre></div>';\n  deepHtml += '<div><h4>'+t('Miejsce w architekturze')+'</h4>'+kartaHierarchii(d.cat)+'</div>';\n  deepHtml += '<div><h4>'+t('Porownanie modeli dla tej roli')+'</h4>';",
    "2.14 V14 deep h4 headers"
)

# 2.15 V14 model comparison table - Kontekst row
must_replace(
    "deepHtml += '<tr><td>Kontekst</td><td>1M tok</td><td>1M tok</td><td>200K tok</td></tr>';\n  deepHtml += '<tr><td>Koszt/1M in</td>",
    "deepHtml += '<tr><td>'+t('Kontekst')+'</td><td>1M tok</td><td>1M tok</td><td>200K tok</td></tr>';\n  deepHtml += '<tr><td>'+t('Koszt/1M in')+'</td>",
    "2.15 V14 table Kontekst + Koszt/1M in"
)

# 2.16 V14 Koszt/1M out row
must_replace(
    "deepHtml += '<tr><td>Koszt/1M out</td>",
    "deepHtml += '<tr><td>'+t('Koszt/1M out')+'</td>",
    "2.16 V14 table Koszt/1M out"
)

# 2.17 V14 recommendation row
must_replace(
    "const recO = (d.cat==='STRATEGIA'||d.cat==='FIVE MINDS')?'\\u2713 Idealny':'Overkill';\n  const recS = (d.cat==='BUILD'||d.cat==='PLANOWANIE')?'\\u2713 Idealny':'Dobry';\n  const recH = (d.cat==='RESEARCH'||d.cat.indexOf('QA')>=0)?'\\u2713 Idealny':'Ryzykowny';\n  deepHtml += '<tr><td>Rekomendacja</td>",
    "const recO = (d.cat==='STRATEGIA'||d.cat==='FIVE MINDS')?'\\u2713 '+t('Idealny'):t('Overkill');\n  const recS = (d.cat==='BUILD'||d.cat==='PLANOWANIE')?'\\u2713 '+t('Idealny'):t('Dobry');\n  const recH = (d.cat==='RESEARCH'||d.cat.indexOf('QA')>=0)?'\\u2713 '+t('Idealny'):t('Ryzykowny');\n  deepHtml += '<tr><td>'+t('Rekomendacja')+'</td>",
    "2.17 V14 recommendation row + values"
)

# 2.18 V14 next agent button
must_replace(
    "let nextHtml = '<button type=\"button\" class=\"enc-next\" onclick=\"otworzEncykl(\\'agent\\',\\''+nextAid+'\\')\" aria-label=\"Nastepny agent\">';\n  nextHtml += '<div style=\"width:44px;height:44px;display:grid;place-items:center;background:rgba(var(--ph-build-rgb,52,211,153),0.15);border-radius:12px\">'+svgAgenta(nextAid,28)+'</div>';\n  nextHtml += '<div><div class=\"enc-next-kicker\">NASTEPNY AGENT</div>",
    "let nextHtml = '<button type=\"button\" class=\"enc-next\" onclick=\"otworzEncykl(\\'agent\\',\\''+nextAid+'\\')\" aria-label=\"'+t('Nastepny agent')+'\">';\n  nextHtml += '<div style=\"width:44px;height:44px;display:grid;place-items:center;background:rgba(var(--ph-build-rgb,52,211,153),0.15);border-radius:12px\">'+svgAgenta(nextAid,28)+'</div>';\n  nextHtml += '<div><div class=\"enc-next-kicker\">'+t('NASTEPNY AGENT')+'</div>",
    "2.18 V14 next agent button"
)

# ============================================================================
# STEP 3: V15 RENDERER - rysujBentoPresetV15 patches
# ============================================================================

# 3.1 V15 ZESPOL badge + plural faza
must_replace(
    "heroHtml += '<div style=\"font-family:var(--mn);font-size:9px;letter-spacing:.12em;color:var(--t2);margin-bottom:4px\">ZESPOL</div>';\n  heroHtml += '<div style=\"font-size:28px;font-weight:800;color:var(--ph-strategy,#818CF8);line-height:1\">'+agentCount+'</div>';\n  heroHtml += '<div style=\"font-size:10px;color:var(--t2);margin-top:2px\">'+t('agentow')+' | '+phaseCount+' '+(phaseCount===1?'faza':(phaseCount<5?'fazy':'faz'))+'</div>';",
    "heroHtml += '<div style=\"font-family:var(--mn);font-size:9px;letter-spacing:.12em;color:var(--t2);margin-bottom:4px\">'+t('ZESPOL')+'</div>';\n  heroHtml += '<div style=\"font-size:28px;font-weight:800;color:var(--ph-strategy,#818CF8);line-height:1\">'+agentCount+'</div>';\n  heroHtml += '<div style=\"font-size:10px;color:var(--t2);margin-top:2px\">'+t('agentow')+' | '+phaseCount+' '+(phaseCount===1?t('faza'):(phaseCount<5?t('fazy'):t('faz')))+'</div>';",
    "3.1 V15 ZESPOL + plural faza"
)

# 3.2 V15 DLACZEGO TEN PRESET kicker
must_replace(
    "whyHtml += encKicker('2','DLACZEGO TEN PRESET');",
    "whyHtml += encKicker('2',t('DLACZEGO TEN PRESET'));",
    "3.2 V15 DLACZEGO TEN PRESET kicker"
)

# 3.3 V15 JAK DZIALA kicker
must_replace(
    "howHtml += encKicker('3','JAK DZIALA');",
    "howHtml += encKicker('3',t('JAK DZIALA'));",
    "3.3 V15 JAK DZIALA kicker"
)

# 3.4 V15 META kicker + meta labels
must_replace(
    "metaHtml += encKicker('4','META');\n  metaHtml += '<div class=\"enc-meta-grid\">';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">'+t('agentow')+'</span><span class=\"enc-meta-value\">'+agentCount+'</span></div>';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">Fazy</span><span class=\"enc-meta-value\">'+phaseCount+'</span></div>';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">Koszt est.</span><span class=\"enc-meta-value\">'+(typeof fmtCost === 'function' ? fmtCost(presetCost) : ('$'+presetCost.toFixed(2)))+'</span></div>';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">Wzorzec</span><span class=\"enc-meta-pill\">'+encEsc(m.pt||'-')+'</span></div>';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">Model mix</span>",
    "metaHtml += encKicker('4',t('META'));\n  metaHtml += '<div class=\"enc-meta-grid\">';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">'+t('agentow')+'</span><span class=\"enc-meta-value\">'+agentCount+'</span></div>';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">'+t('Fazy')+'</span><span class=\"enc-meta-value\">'+phaseCount+'</span></div>';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">'+t('Koszt est.')+'</span><span class=\"enc-meta-value\">'+(typeof fmtCost === 'function' ? fmtCost(presetCost) : ('$'+presetCost.toFixed(2)))+'</span></div>';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">'+t('Wzorzec')+'</span><span class=\"enc-meta-pill\">'+encEsc(m.pt||'-')+'</span></div>';\n  metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">'+t('Model mix')+'</span>",
    "3.4 V15 META labels"
)

# 3.5 V15 Tokens meta row
must_replace(
    "metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">Tokens</span>",
    "metaHtml += '<div class=\"enc-meta-row\"><span class=\"enc-meta-label\">'+t('Tokens')+'</span>",
    "3.5 V15 Tokens label"
)

# 3.6 V15 CO OSIAGASZ kicker
must_replace(
    "doHtml += encKicker('5','CO OSIAGASZ');",
    "doHtml += encKicker('5',t('CO OSIAGASZ'));",
    "3.6 V15 CO OSIAGASZ kicker"
)

# 3.7 V15 CZEGO NIE OSIAGNIESZ kicker
must_replace(
    "dontHtml += encKicker('6','CZEGO NIE OSIAGNIESZ');",
    "dontHtml += encKicker('6',t('CZEGO NIE OSIAGNIESZ'));",
    "3.7 V15 CZEGO NIE OSIAGNIESZ kicker"
)

# 3.8 + 3.9 handled together with V14 in step 2.9/2.9b/2.9c/2.10 (shared literals)

# 3.10 V15 DEEP DIVE summary
must_replace(
    "deepHtml += '<summary>'+encKickerInline('10','ZANURKUJ')+'Sklad zespolu + przeplyw + porownanie</summary>';",
    "deepHtml += '<summary>'+encKickerInline('10',t('ZANURKUJ'))+t('Sklad zespolu + przeplyw + porownanie')+'</summary>';",
    "3.10 V15 ZANURKUJ + summary"
)

# 3.11 V15 Przeplyw faz h4
must_replace(
    "deepHtml += '<div><h4>Przeplyw faz</h4>';",
    "deepHtml += '<div><h4>'+t('Przeplyw faz')+'</h4>';",
    "3.11 V15 Przeplyw faz h4"
)

# 3.12 V15 Agenci w zespole + table headers
must_replace(
    "deepHtml += '<div><h4>Agenci w zespole ('+agentCount+')</h4>';\n  deepHtml += '<table class=\"bento-table\"><tr><th>#</th><th>Agent</th><th>Faza</th><th>Model</th></tr>';",
    "deepHtml += '<div><h4>'+t('Agenci w zespole')+' ('+agentCount+')</h4>';\n  deepHtml += '<table class=\"bento-table\"><tr><th>#</th><th>'+t('Agent')+'</th><th>'+t('Faza')+'</th><th>'+t('Model')+'</th></tr>';",
    "3.12 V15 Agenci w zespole + table headers"
)

# 3.13 V15 Zielone swiatlo h4
must_replace(
    "deepHtml += '<h4 style=\"color:var(--mc-haiku);margin:0 0 8px\">Zielone swiatlo</h4>';",
    "deepHtml += '<h4 style=\"color:var(--mc-haiku);margin:0 0 8px\">'+t('Zielone swiatlo')+'</h4>';",
    "3.13 V15 Zielone swiatlo h4"
)

# 3.14 V15 Czerwone swiatlo h4
must_replace(
    "deepHtml += '<h4 style=\"color:var(--ph-qa);margin:0 0 8px\">Czerwone swiatlo</h4>';",
    "deepHtml += '<h4 style=\"color:var(--ph-qa);margin:0 0 8px\">'+t('Czerwone swiatlo')+'</h4>';",
    "3.14 V15 Czerwone swiatlo h4"
)

# 3.15 V15 next preset button
must_replace(
    "let nextHtml = '<button type=\"button\" class=\"enc-next\" onclick=\"otworzEncykl(\\'preset\\',\\''+nextPid+'\\')\" aria-label=\"Nastepny preset\">';\n  nextHtml += '<div style=\"width:44px;height:44px;display:grid;place-items:center;background:rgba(var(--ph-build-rgb,52,211,153),0.15);border-radius:12px\">'+(PRESET_SVG[nextPid]?svgPresetu(nextPid,28):(PM[nextPid]?PM[nextPid].i:''))+'</div>';\n  nextHtml += '<div><div class=\"enc-next-kicker\">NASTEPNY PRESET</div>",
    "let nextHtml = '<button type=\"button\" class=\"enc-next\" onclick=\"otworzEncykl(\\'preset\\',\\''+nextPid+'\\')\" aria-label=\"'+t('Nastepny preset')+'\">';\n  nextHtml += '<div style=\"width:44px;height:44px;display:grid;place-items:center;background:rgba(var(--ph-build-rgb,52,211,153),0.15);border-radius:12px\">'+(PRESET_SVG[nextPid]?svgPresetu(nextPid,28):(PM[nextPid]?PM[nextPid].i:''))+'</div>';\n  nextHtml += '<div><div class=\"enc-next-kicker\">'+t('NASTEPNY PRESET')+'</div>",
    "3.15 V15 next preset button"
)

# 3.16 V15 banner text v32.15 -> v32.16 + Preset label wrap
must_replace(
    "h += '<p>Preset '+agentCount+' '+t('agentow')+' | v32.15 Encyklopedia Universal</p></div>';",
    "h += '<p>'+t('Preset')+' '+agentCount+' '+t('agentow')+' | v32.16 '+t('Universal Bilingual')+'</p></div>';",
    "3.16 V15 banner v32.15->v32.16 + t() wraps"
)

# ============================================================================
# STEP 4: COST MODAL - renderCbmOverview + renderCbmBreakdown patches
# ============================================================================

# 4.1 Overview KPI card #1 - Total cost + "do X (p90)"
must_replace(
    "+'<div class=\"cbm-kpi-card sev-'+sev+'\"><div class=\"cbm-kpi-lbl\">Total cost (p50-p90)</div><div class=\"cbm-kpi-val\">'+fmtCost(est.p50,2)+'</div><div class=\"cbm-kpi-sub\">do '+fmtCost(est.p90,2)+' (p90)</div></div>'",
    "+'<div class=\"cbm-kpi-card sev-'+sev+'\"><div class=\"cbm-kpi-lbl\">'+t('Total cost (p50-p90)')+'</div><div class=\"cbm-kpi-val\">'+fmtCost(est.p50,2)+'</div><div class=\"cbm-kpi-sub\">'+t('do')+' '+fmtCost(est.p90,2)+' '+t('(p90)')+'</div></div>'",
    "4.1 Overview KPI Total"
)

# 4.2 Overview KPI #2 Agentow + avg
must_replace(
    "+'<div class=\"cbm-kpi-card\"><div class=\"cbm-kpi-lbl\">Agentow</div><div class=\"cbm-kpi-val\">'+nodes.length+'</div><div class=\"cbm-kpi-sub\">avg '+fmtCost(avgAgentCost,4)+'/agent</div></div>'",
    "+'<div class=\"cbm-kpi-card\"><div class=\"cbm-kpi-lbl\">'+t('Agentow')+'</div><div class=\"cbm-kpi-val\">'+nodes.length+'</div><div class=\"cbm-kpi-sub\">'+t('avg')+' '+fmtCost(avgAgentCost,4)+'/agent</div></div>'",
    "4.2 Overview KPI Agentow"
)

# 4.3 Overview KPI #3 Tokeny
must_replace(
    "+'<div class=\"cbm-kpi-card\"><div class=\"cbm-kpi-lbl\">Tokeny (in/out)</div>",
    "+'<div class=\"cbm-kpi-card\"><div class=\"cbm-kpi-lbl\">'+t('Tokeny (in/out)')+'</div>",
    "4.3 Overview KPI Tokeny"
)

# 4.4 Overview KPI #4 Model mix + est cache
must_replace(
    "+'<div class=\"cbm-kpi-card\"><div class=\"cbm-kpi-lbl\">Model mix</div><div class=\"cbm-kpi-val\" style=\"font-size:13px;line-height:1.3\">'+(mix.opus?mix.opus+' Opus ':'')+(mix.sonnet?mix.sonnet+' Sonnet ':'')+(mix.haiku?mix.haiku+' Haiku':'')+'</div><div class=\"cbm-kpi-sub\">est. cache: '+Math.round(cbmState.whatif.cachePct*100)+'%</div></div>'",
    "+'<div class=\"cbm-kpi-card\"><div class=\"cbm-kpi-lbl\">'+t('Model mix')+'</div><div class=\"cbm-kpi-val\" style=\"font-size:13px;line-height:1.3\">'+(mix.opus?mix.opus+' Opus ':'')+(mix.sonnet?mix.sonnet+' Sonnet ':'')+(mix.haiku?mix.haiku+' Haiku':'')+'</div><div class=\"cbm-kpi-sub\">'+t('est. cache:')+' '+Math.round(cbmState.whatif.cachePct*100)+'%</div></div>'",
    "4.4 Overview KPI Model mix"
)

# 4.5 Overview donut card header + aria + total
must_replace(
    "+'<div class=\"cbm-card\"><div class=\"cbm-card-t\">Koszt wg modelu</div><div class=\"cbm-donut\" style=\"background:'+donutBg+'\" role=\"img\" aria-label=\"Koszt wg modelu: Opus '+Math.round(opPct)+' proc, Sonnet '+Math.round(soPct)+' proc, Haiku '+Math.round(haPct)+' proc\"><div class=\"cbm-donut-ctr\"><div class=\"dv\">'+fmtCost(est.p50,2)+'</div><div class=\"dl\">total p50</div></div></div>'",
    "+'<div class=\"cbm-card\"><div class=\"cbm-card-t\">'+t('Koszt wg modelu')+'</div><div class=\"cbm-donut\" style=\"background:'+donutBg+'\" role=\"img\" aria-label=\"'+t('Koszt wg modelu: Opus')+' '+Math.round(opPct)+' '+t('proc, Sonnet')+' '+Math.round(soPct)+' '+t('proc, Haiku')+' '+Math.round(haPct)+' '+t('proc')+'\"><div class=\"cbm-donut-ctr\"><div class=\"dv\">'+fmtCost(est.p50,2)+'</div><div class=\"dl\">'+t('total p50')+'</div></div></div>'",
    "4.5 Overview donut header + aria + total"
)

# 4.6 Overview phase card header + aria + brak + note
must_replace(
    "+'<div class=\"cbm-card\"><div class=\"cbm-card-t\">Koszt wg fazy</div><div class=\"cbm-stack\" role=\"img\" aria-label=\"Rozklad kosztow na fazy\">'+(stackH||'<div class=\"cbm-stack-seg\" style=\"flex:1;background:#888\">brak</div>')+'</div><div class=\"cbm-stack-leg\">'+stackLegH+'</div><div class=\"cbm-note\">Kolory faz zgodne z glownym UI. Hover nad segmentem = tooltip z kwota.</div></div>'",
    "+'<div class=\"cbm-card\"><div class=\"cbm-card-t\">'+t('Koszt wg fazy')+'</div><div class=\"cbm-stack\" role=\"img\" aria-label=\"'+t('Rozklad kosztow na fazy')+'\">'+(stackH||'<div class=\"cbm-stack-seg\" style=\"flex:1;background:#888\">'+t('brak')+'</div>')+'</div><div class=\"cbm-stack-leg\">'+stackLegH+'</div><div class=\"cbm-note\">'+t('Kolory faz zgodne z glownym UI. Hover nad segmentem = tooltip z kwota.')+'</div></div>'",
    "4.6 Overview phase card"
)

# 4.7 Breakdown table - aria + thead
must_replace(
    "let h='<div class=\"cbm-tbl-wrap\"><table class=\"cbm-tbl\" aria-label=\"Breakdown kosztow per agent\">'\n    +'<thead><tr>'\n    +'<th class=\"'+sortClass('phase')+'\" onclick=\"cbmSort(\\'phase\\')\">Faza</th>'\n    +'<th class=\"'+sortClass('name')+'\" onclick=\"cbmSort(\\'name\\')\">Agent</th>'\n    +'<th class=\"'+sortClass('model')+'\" onclick=\"cbmSort(\\'model\\')\">Model</th>'\n    +'<th class=\"'+sortClass('tokIn')+'\" onclick=\"cbmSort(\\'tokIn\\')\">Tok &uarr;</th>'\n    +'<th class=\"'+sortClass('tokOut')+'\" onclick=\"cbmSort(\\'tokOut\\')\">Tok &darr;</th>'\n    +'<th class=\"'+sortClass('cached')+'\" onclick=\"cbmSort(\\'cached\\')\">Cached</th>'\n    +'<th class=\"'+sortClass('p50')+'\" onclick=\"cbmSort(\\'p50\\')\">Cost p50</th>'\n    +'<th class=\"'+sortClass('p90')+'\" onclick=\"cbmSort(\\'p90\\')\">Cost p90</th>'",
    "let h='<div class=\"cbm-tbl-wrap\"><table class=\"cbm-tbl\" aria-label=\"'+t('Breakdown kosztow per agent')+'\">'\n    +'<thead><tr>'\n    +'<th class=\"'+sortClass('phase')+'\" onclick=\"cbmSort(\\'phase\\')\">'+t('Faza')+'</th>'\n    +'<th class=\"'+sortClass('name')+'\" onclick=\"cbmSort(\\'name\\')\">'+t('Agent')+'</th>'\n    +'<th class=\"'+sortClass('model')+'\" onclick=\"cbmSort(\\'model\\')\">'+t('Model')+'</th>'\n    +'<th class=\"'+sortClass('tokIn')+'\" onclick=\"cbmSort(\\'tokIn\\')\">'+t('Tok In')+' &uarr;</th>'\n    +'<th class=\"'+sortClass('tokOut')+'\" onclick=\"cbmSort(\\'tokOut\\')\">'+t('Tok Out')+' &darr;</th>'\n    +'<th class=\"'+sortClass('cached')+'\" onclick=\"cbmSort(\\'cached\\')\">'+t('Cached')+'</th>'\n    +'<th class=\"'+sortClass('p50')+'\" onclick=\"cbmSort(\\'p50\\')\">'+t('Cost p50')+'</th>'\n    +'<th class=\"'+sortClass('p90')+'\" onclick=\"cbmSort(\\'p90\\')\">'+t('Cost p90')+'</th>'",
    "4.7 Breakdown table headers"
)

# 4.8 Breakdown footer
must_replace(
    "h+='</tbody><tfoot><tr><td colspan=\"3\">SUMA ('+rows.length+' agentow)</td>",
    "h+='</tbody><tfoot><tr><td colspan=\"3\">'+t('SUMA')+' ('+rows.length+' '+t('agentow')+')</td>",
    "4.8 Breakdown footer SUMA"
)

# 4.9 Breakdown note
must_replace(
    "+'<div class=\"cbm-note\">Klikaj naglowki aby sortowac. Cached = wejscie cache-eligible (pricing '+Math.round(COST_CACHE_PCT*100)+'%, konfig w zakladce What-if).</div>';",
    "+'<div class=\"cbm-note\">'+t('Klikaj naglowki aby sortowac.')+' '+t('Cached = wejscie cache-eligible (pricing')+' '+Math.round(COST_CACHE_PCT*100)+t('%, konfig w zakladce What-if).')+'</div>';",
    "4.9 Breakdown note"
)

# ============================================================================
# STEP 5: COST MODAL - renderCbmWhatif patches (wrap all labels in t())
# ============================================================================

# 5.1 Whatif title
must_replace(
    "+'<div class=\"cbm-card-t\">Parametry symulacji</div>'",
    "+'<div class=\"cbm-card-t\">'+t('Parametry symulacji')+'</div>'",
    "5.1 Whatif title"
)

# 5.2 Whatif slider row 1 - inMul
must_replace(
    "+'<div class=\"cbm-slider-row\"><label>Mnoznik wejscia (verbosity kontekstu) <span>'+wf.inMul.toFixed(2)+'x</span>",
    "+'<div class=\"cbm-slider-row\"><label>'+t('Mnoznik wejscia (verbosity kontekstu)')+' <span>'+wf.inMul.toFixed(2)+'x</span>",
    "5.2 Whatif inMul label"
)

# 5.3 Whatif slider row 2 - outMul
must_replace(
    "+'<div class=\"cbm-slider-row\"><label>Mnoznik wyjscia (dlugosc odpowiedzi) <span>'+wf.outMul.toFixed(2)+'x</span>",
    "+'<div class=\"cbm-slider-row\"><label>'+t('Mnoznik wyjscia (dlugosc odpowiedzi)')+' <span>'+wf.outMul.toFixed(2)+'x</span>",
    "5.3 Whatif outMul label"
)

# 5.4 Whatif slider row 3 - cache
must_replace(
    "+'<div class=\"cbm-slider-row\"><label>Cache hit rate <span>'",
    "+'<div class=\"cbm-slider-row\"><label>'+t('Cache hit rate')+' <span>'",
    "5.4 Whatif cache label"
)

# 5.5 Whatif reset button
must_replace(
    "+'<button class=\"btn\" style=\"margin-top:8px\" onclick=\"cbmWifReset()\">Reset parametrow</button>'",
    "+'<button class=\"btn\" style=\"margin-top:8px\" onclick=\"cbmWifReset()\">'+t('Reset parametrow')+'</button>'",
    "5.5 Whatif reset button"
)

# 5.6 Whatif slider note
must_replace(
    "+'<div class=\"cbm-note\">Slidery pokazuja jak koszt zmienia sie w skrajnych scenariuszach. Bez wywolania API.</div>'",
    "+'<div class=\"cbm-note\">'+t('Slidery pokazuja jak koszt zmienia sie w skrajnych scenariuszach. Bez wywolania API.')+'</div>'",
    "5.6 Whatif note"
)

# 5.7 Whatif scenario: current
must_replace(
    "+'<div class=\"cbm-scen\"><div class=\"cbm-scen-bar current\" style=\"height:'+barH(scenarios.current)+'px\"></div><div class=\"cbm-scen-val\">'+fmtCost(scenarios.current,2)+'</div><div class=\"cbm-scen-delta\">bazowy</div><div class=\"cbm-scen-lbl\">Obecny mix</div></div>'",
    "+'<div class=\"cbm-scen\"><div class=\"cbm-scen-bar current\" style=\"height:'+barH(scenarios.current)+'px\"></div><div class=\"cbm-scen-val\">'+fmtCost(scenarios.current,2)+'</div><div class=\"cbm-scen-delta\">'+t('bazowy')+'</div><div class=\"cbm-scen-lbl\">'+t('Obecny mix')+'</div></div>'",
    "5.7 Whatif scenario current"
)

# 5.8 Whatif scenario: opus
must_replace(
    "<div class=\"cbm-scen-lbl\">Caly Opus</div></div>'",
    "<div class=\"cbm-scen-lbl\">'+t('Caly Opus')+'</div></div>'",
    "5.8 Whatif scenario opus"
)

# 5.9 Whatif scenario: sonnet
must_replace(
    "<div class=\"cbm-scen-lbl\">Caly Sonnet</div></div>'",
    "<div class=\"cbm-scen-lbl\">'+t('Caly Sonnet')+'</div></div>'",
    "5.9 Whatif scenario sonnet"
)

# 5.10 Whatif scenario: haiku
must_replace(
    "<div class=\"cbm-scen-lbl\">Caly Haiku</div></div>'",
    "<div class=\"cbm-scen-lbl\">'+t('Caly Haiku')+'</div></div>'",
    "5.10 Whatif scenario haiku"
)

# ============================================================================
# STEP 6: COST MODAL - renderCbmExport patches
# ============================================================================

# 6.1 Export: Kopiuj Markdown button
must_replace(
    "<div class=\"cbm-exp-t\">Kopiuj Markdown</div><div class=\"cbm-exp-d\">Tabela MD gotowa do wklejenia w PR/Notion</div>",
    "<div class=\"cbm-exp-t\">'+t('Kopiuj Markdown')+'</div><div class=\"cbm-exp-d\">'+t('Tabela MD gotowa do wklejenia w PR/Notion')+'</div>",
    "6.1 Export Kopiuj Markdown"
)

# 6.2 Export: CSV button
must_replace(
    "<div class=\"cbm-exp-t\">Pobierz CSV</div><div class=\"cbm-exp-d\">Arkusz z pelnym breakdown per agent</div>",
    "<div class=\"cbm-exp-t\">'+t('Pobierz CSV')+'</div><div class=\"cbm-exp-d\">'+t('Arkusz z pelnym breakdown per agent')+'</div>",
    "6.2 Export CSV"
)

# 6.3 Export: JSON button
must_replace(
    "<div class=\"cbm-exp-t\">Pobierz JSON</div><div class=\"cbm-exp-d\">Z snapshotem cennika + assumptions</div>",
    "<div class=\"cbm-exp-t\">'+t('Pobierz JSON')+'</div><div class=\"cbm-exp-d\">'+t('Z snapshotem cennika + assumptions')+'</div>",
    "6.3 Export JSON"
)

# 6.4 Export: Podglad Markdown header
must_replace(
    "+'<div class=\"cbm-card-t\">Podglad Markdown</div>'",
    "+'<div class=\"cbm-card-t\">'+t('Podglad Markdown')+'</div>'",
    "6.4 Export Podglad Markdown"
)

# 6.5 cbmDownload toast + error
must_replace(
    "pokazToast('Pobrano '+filename)}catch(e){alert('Blad pobierania: '+e.message)}",
    "pokazToast(t('Pobrano')+' '+filename)}catch(e){alert(t('Blad pobierania:')+' '+e.message)}",
    "6.5 cbmDownload toast + error"
)

# ============================================================================
# WRITE
# ============================================================================

HTML.write_text(src, encoding='utf-8')
new_len = len(src)
print(f"\n[DONE] {orig_len} -> {new_len} bytes (delta: {new_len-orig_len:+d})")
