#!/usr/bin/env python3
# v32.16 Universal Bilingual - atomic injection script
# Extends v32.15 Encyclopedia Universal with EN translations for all content-heavy constants

import os
import sys

ROOT = r"C:\Projekty Claude Code\Agent_Architecture\v32.16"
SRC = os.path.join(ROOT, "AGENT_TEAMS_CONFIGURATOR_v32_16.html")
BUILD = os.path.join(ROOT, "build")

def read(p):
    with open(p, "r", encoding="utf-8") as f:
        return f.read()

def write(p, s):
    with open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(s)

def must_replace(haystack, needle, repl, tag):
    c = haystack.count(needle)
    if c != 1:
        print("FAIL {}: needle count={}".format(tag, c))
        sys.exit(1)
    return haystack.replace(needle, repl, 1)

html = read(SRC)
print("Loaded HTML: {} bytes, {} lines".format(len(html), html.count("\n")+1))

# Load EN extensions
ext_js = read(os.path.join(BUILD, "I18N_EN_V16_EXTENSIONS.js"))
print("Loaded I18N_EN_V16_EXTENSIONS.js: {} bytes".format(len(ext_js)))

# ---------------------------------------------------------------------------
# 1. TITLE bump
# ---------------------------------------------------------------------------
old_title = "<title>Agent Architecture Designer v32.15 | Encyclopedia Universal</title>"
new_title = "<title>Agent Architecture Designer v32.16 | Universal Bilingual</title>"
html = must_replace(html, old_title, new_title, "TITLE")
print("[1/12] TITLE bumped")

# ---------------------------------------------------------------------------
# 2. Insert 10 new EN namespaces at the start of I18N_EN
# ---------------------------------------------------------------------------
anchor2 = "const I18N_EN = {\n  // -------- AGENT NAMES --------\n  agentNames: {"
new2 = "const I18N_EN = {\n" + ext_js + "  // -------- AGENT NAMES --------\n  agentNames: {"
html = must_replace(html, anchor2, new2, "I18N_EN_EXTENSIONS")
print("[2/12] 10 new EN namespaces inserted into I18N_EN")

# ---------------------------------------------------------------------------
# 3. Patch getAgentLongPl/MidPl/GreenPl/RedPl getters to be lang-aware
# ---------------------------------------------------------------------------
old_getters = (
    "function getAgentLongPl(id){return AGENT_LONG_PL[id]||''}\n"
    "function getAgentMidPl(id){return AGENT_MID_PL[id]||''}\n"
    "function getAgentGreenPl(id){return AGENT_GREEN_PL[id]||[]}\n"
    "function getAgentRedPl(id){return AGENT_RED_PL[id]||[]}"
)
new_getters = (
    "function getAgentLongPl(id){return currentLang==='en'&&I18N_EN.agentLong&&I18N_EN.agentLong[id]?I18N_EN.agentLong[id]:(AGENT_LONG_PL[id]||'')}\n"
    "function getAgentMidPl(id){return currentLang==='en'&&I18N_EN.agentMid&&I18N_EN.agentMid[id]?I18N_EN.agentMid[id]:(AGENT_MID_PL[id]||'')}\n"
    "function getAgentGreenPl(id){return currentLang==='en'&&I18N_EN.agentGreen&&I18N_EN.agentGreen[id]?I18N_EN.agentGreen[id]:(AGENT_GREEN_PL[id]||[])}\n"
    "function getAgentRedPl(id){return currentLang==='en'&&I18N_EN.agentRed&&I18N_EN.agentRed[id]?I18N_EN.agentRed[id]:(AGENT_RED_PL[id]||[])}\n"
    "// v32.16: EDU + PRESET sidebar lang-aware getters\n"
    "function getAgentEdu(aid){return currentLang==='en'&&I18N_EN.eduAgent&&I18N_EN.eduAgent[aid]?I18N_EN.eduAgent[aid]:(typeof AGENT_EDU_PL!=='undefined'?AGENT_EDU_PL[aid]:null)}\n"
    "function getPresetEdu(pid){return currentLang==='en'&&I18N_EN.eduPreset&&I18N_EN.eduPreset[pid]?I18N_EN.eduPreset[pid]:(typeof PRESET_EDU_PL!=='undefined'?PRESET_EDU_PL[pid]:null)}\n"
    "function getPresetLongPl(pid){return currentLang==='en'&&I18N_EN.presetLong&&I18N_EN.presetLong[pid]?I18N_EN.presetLong[pid]:(typeof PRESET_LONG_PL!=='undefined'?(PRESET_LONG_PL[pid]||''):'')}\n"
    "function getPresetMidPl(pid){return currentLang==='en'&&I18N_EN.presetMid&&I18N_EN.presetMid[pid]?I18N_EN.presetMid[pid]:(typeof PRESET_MID_PL!=='undefined'?(PRESET_MID_PL[pid]||''):'')}\n"
    "function getPresetGreenPl(pid){return currentLang==='en'&&I18N_EN.presetGreen&&I18N_EN.presetGreen[pid]?I18N_EN.presetGreen[pid]:(typeof PRESET_GREEN_PL!=='undefined'?(PRESET_GREEN_PL[pid]||[]):[])}\n"
    "function getPresetRedPl(pid){return currentLang==='en'&&I18N_EN.presetRed&&I18N_EN.presetRed[pid]?I18N_EN.presetRed[pid]:(typeof PRESET_RED_PL!=='undefined'?(PRESET_RED_PL[pid]||[]):[])}"
)
html = must_replace(html, old_getters, new_getters, "AGENT_GETTERS")
print("[3/12] Agent/Preset sidebar getters patched (lang-aware) + 6 new getters added")

# ---------------------------------------------------------------------------
# 4. Patch rysujBentoAgentaV14 edu source
# ---------------------------------------------------------------------------
html = must_replace(
    html,
    "  const edu = (typeof AGENT_EDU_PL !== 'undefined') ? AGENT_EDU_PL[aid] : null;",
    "  const edu = (typeof getAgentEdu === 'function') ? getAgentEdu(aid) : ((typeof AGENT_EDU_PL !== 'undefined') ? AGENT_EDU_PL[aid] : null);",
    "V14_EDU_DISPATCH"
)
print("[4/12] rysujBentoAgentaV14 now reads via getAgentEdu dispatcher")

# ---------------------------------------------------------------------------
# 5. Patch rysujBentoPresetV15 edu source
# ---------------------------------------------------------------------------
html = must_replace(
    html,
    "  const edu = (typeof PRESET_EDU_PL !== 'undefined') ? PRESET_EDU_PL[pid] : null;",
    "  const edu = (typeof getPresetEdu === 'function') ? getPresetEdu(pid) : ((typeof PRESET_EDU_PL !== 'undefined') ? PRESET_EDU_PL[pid] : null);",
    "V15_EDU_DISPATCH"
)
print("[5/12] rysujBentoPresetV15 now reads via getPresetEdu dispatcher")

# ---------------------------------------------------------------------------
# 6. Patch pokazInfoPr preset sidebar MID/GREEN/RED/LONG reads
# ---------------------------------------------------------------------------
old_mid = "(PRESET_MID_PL[pid]?'<div class=\"ds\"><div class=\"ds-l\" style=\"color:var(--mc-haiku)\">'+t('KIEDY UZYWAC')+'</div><div style=\"font-size:11px;color:var(--t1);line-height:1.55;background:linear-gradient(180deg,rgba(var(--mc-haiku-rgb),0.07),rgba(var(--mc-haiku-rgb),0.02));padding:11px 13px;border-radius:10px;border:1px solid rgba(var(--mc-haiku-rgb),0.22)\">'+PRESET_MID_PL[pid]+'</div></div>':'')+"
new_mid = "((function(){var _m=getPresetMidPl(pid);return _m?'<div class=\"ds\"><div class=\"ds-l\" style=\"color:var(--mc-haiku)\">'+t('KIEDY UZYWAC')+'</div><div style=\"font-size:11px;color:var(--t1);line-height:1.55;background:linear-gradient(180deg,rgba(var(--mc-haiku-rgb),0.07),rgba(var(--mc-haiku-rgb),0.02));padding:11px 13px;border-radius:10px;border:1px solid rgba(var(--mc-haiku-rgb),0.22)\">'+_m+'</div></div>':''})())+"
html = must_replace(html, old_mid, new_mid, "INFOPR_MID")
print("[6/12] pokazInfoPr MID section patched")

old_vd = (
    "((PRESET_GREEN_PL[pid]||PRESET_RED_PL[pid])?'<div class=\"ds vd\" role=\"group\" aria-label=\"'+t('Nadaje sie do')+' / '+t('Nie dla')+'\">'+\n"
    "'<div class=\"vd-col fit\"><span class=\"vd-head\">'+t('Nadaje sie do')+'</span><ul class=\"vd-list\">'+(PRESET_GREEN_PL[pid]||[]).map(x=>'<li>'+escHtml(x)+'</li>').join('')+'</ul></div>'+\n"
    "'<div class=\"vd-col nofit\"><span class=\"vd-head\">'+t('Nie dla')+'</span><ul class=\"vd-list\">'+(PRESET_RED_PL[pid]||[]).map(x=>'<li>'+escHtml(x)+'</li>').join('')+'</ul></div>'+\n"
    "'</div>':'')+"
)
new_vd = (
    "((function(){var _g=getPresetGreenPl(pid),_r=getPresetRedPl(pid);return (_g.length||_r.length)?'<div class=\"ds vd\" role=\"group\" aria-label=\"'+t('Nadaje sie do')+' / '+t('Nie dla')+'\">'+\n"
    "'<div class=\"vd-col fit\"><span class=\"vd-head\">'+t('Nadaje sie do')+'</span><ul class=\"vd-list\">'+_g.map(function(x){return '<li>'+escHtml(x)+'</li>'}).join('')+'</ul></div>'+\n"
    "'<div class=\"vd-col nofit\"><span class=\"vd-head\">'+t('Nie dla')+'</span><ul class=\"vd-list\">'+_r.map(function(x){return '<li>'+escHtml(x)+'</li>'}).join('')+'</ul></div>'+\n"
    "'</div>':''})())+"
)
html = must_replace(html, old_vd, new_vd, "INFOPR_VERDICT")
print("[7/12] pokazInfoPr verdict panel (GREEN/RED) patched")

old_long = "(PRESET_LONG_PL[pid]?'<details class=\"ds ds-longdesc\"><summary>'+t('SZCZEGOLOWY OPIS')+'</summary><div class=\"ds-longdesc-body\">'+PRESET_LONG_PL[pid]+'</div></details>':'')+"
new_long = "((function(){var _l=getPresetLongPl(pid);return _l?'<details class=\"ds ds-longdesc\"><summary>'+t('SZCZEGOLOWY OPIS')+'</summary><div class=\"ds-longdesc-body\">'+_l+'</div></details>':''})())+"
html = must_replace(html, old_long, new_long, "INFOPR_LONG")
print("[8/12] pokazInfoPr long description patched")

# ---------------------------------------------------------------------------
# 9. Patch V15 renderer deep-dive pgn/prd
# ---------------------------------------------------------------------------
html = must_replace(
    html,
    "  const pgn = (typeof PRESET_GREEN_PL !== 'undefined' && PRESET_GREEN_PL[pid]) ? PRESET_GREEN_PL[pid] : null;\n  const prd = (typeof PRESET_RED_PL !== 'undefined' && PRESET_RED_PL[pid]) ? PRESET_RED_PL[pid] : null;",
    "  const _pgnRaw = (typeof getPresetGreenPl === 'function') ? getPresetGreenPl(pid) : ((typeof PRESET_GREEN_PL !== 'undefined' && PRESET_GREEN_PL[pid]) ? PRESET_GREEN_PL[pid] : null);\n  const _prdRaw = (typeof getPresetRedPl === 'function') ? getPresetRedPl(pid) : ((typeof PRESET_RED_PL !== 'undefined' && PRESET_RED_PL[pid]) ? PRESET_RED_PL[pid] : null);\n  const pgn = (_pgnRaw && _pgnRaw.length) ? _pgnRaw : null;\n  const prd = (_prdRaw && _prdRaw.length) ? _prdRaw : null;",
    "V15_PGN_PRD_DISPATCH"
)
print("[9/12] V15 renderer pgn/prd dispatcher patched")

# ---------------------------------------------------------------------------
# 10. Banner text v32.15 Universal -> v32.16 Bilingual
# ---------------------------------------------------------------------------
html = must_replace(
    html,
    "h += '<p>'+encEsc(getCatLabel(d.cat))+' | v32.15 Encyklopedia Universal</p></div>';",
    "h += '<p>'+encEsc(getCatLabel(d.cat))+' | v32.16 Universal Bilingual</p></div>';",
    "BANNER_AGENT_VER"
)
print("[10/12] Agent banner text bumped")

# ---------------------------------------------------------------------------
# 11. buildCostJSON + eksportujKfg version bumps
# ---------------------------------------------------------------------------
html = must_replace(html, "version:'32.15',generated:", "version:'32.16',generated:", "BUILD_COST_JSON_VER")
html = must_replace(html, "function eksportujKfg(){const d={v:'32.15',", "function eksportujKfg(){const d={v:'32.16',", "EKSPORT_VER")
print("[11/12] buildCostJSON + eksportujKfg version bumps 32.15 -> 32.16")

# ---------------------------------------------------------------------------
# 12. localStorage migration: acV32_15_custom -> acV32_16_custom
# ---------------------------------------------------------------------------
html = html.replace("safeSaveLS('acV32_15_custom',", "safeSaveLS('acV32_16_custom',")
html = html.replace("safeParseLS('acV32_15_custom',", "safeParseLS('acV32_16_custom',")
# Extend migration chain
old_load = (
    "function ladujCustomAgentow(){\n"
    "  // V32.15: migrate from older keys (v32..v32.14) if present\n"
    "  let customs=safeParseLS('acV32_16_custom',null);\n"
    "  if(!customs){\n"
    "    customs=safeParseLS('acV32_14_custom',null)||safeParseLS('acV32_13_custom',null)||safeParseLS('acV32_12_custom',null)||safeParseLS('acV32_11_custom',null)||safeParseLS('acV32_10_custom',null)||safeParseLS('acV32_9_custom',null)||safeParseLS('acV32_8_custom',null)||safeParseLS('acV32_7_custom',null)||safeParseLS('acV32_6_custom',null)||safeParseLS('acV32_5_custom',null)||safeParseLS('acV32_4_custom',null)||safeParseLS('acV32_3_custom',null)||safeParseLS('acV32_2_custom',null)||safeParseLS('acV32_1_custom',null)||safeParseLS('acV32_custom',[])||[];\n"
    "    if(customs.length)safeSaveLS('acV32_16_custom',customs);\n"
    "  }"
)
new_load = (
    "function ladujCustomAgentow(){\n"
    "  // V32.16: migrate from older keys (v32..v32.15) if present\n"
    "  let customs=safeParseLS('acV32_16_custom',null);\n"
    "  if(!customs){\n"
    "    customs=safeParseLS('acV32_15_custom',null)||safeParseLS('acV32_14_custom',null)||safeParseLS('acV32_13_custom',null)||safeParseLS('acV32_12_custom',null)||safeParseLS('acV32_11_custom',null)||safeParseLS('acV32_10_custom',null)||safeParseLS('acV32_9_custom',null)||safeParseLS('acV32_8_custom',null)||safeParseLS('acV32_7_custom',null)||safeParseLS('acV32_6_custom',null)||safeParseLS('acV32_5_custom',null)||safeParseLS('acV32_4_custom',null)||safeParseLS('acV32_3_custom',null)||safeParseLS('acV32_2_custom',null)||safeParseLS('acV32_1_custom',null)||safeParseLS('acV32_custom',[])||[];\n"
    "    if(customs.length)safeSaveLS('acV32_16_custom',customs);\n"
    "  }"
)
if old_load not in html:
    print("FAIL LS_MIGRATE: old_load anchor not found")
    sys.exit(1)
html = html.replace(old_load, new_load, 1)
print("[12/12] localStorage key migrated acV32_15 -> acV32_16 + chain extended")

# ---------------------------------------------------------------------------
# Save result
# ---------------------------------------------------------------------------
write(SRC, html)
print("\nWritten: {} bytes, {} lines".format(len(html), html.count("\n")+1))
print("DONE")
