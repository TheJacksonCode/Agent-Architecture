#!/usr/bin/env python3
# v32.15 Encyclopedia Universal - atomic injection script
# Extends v32.14 Agent Encyclopedia Premium from 4 pilots to all 35 agents + 42 presets

import os
import sys

ROOT = r"C:\Projekty Claude Code\Agent_Architecture\v32.15"
SRC = os.path.join(ROOT, "AGENT_TEAMS_CONFIGURATOR_v32_15.html")
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

# Load staged blocks
agent_edu_js = read(os.path.join(BUILD, "AGENT_EDU_PL_v15.js"))
preset_edu_js = read(os.path.join(BUILD, "PRESET_EDU_PL_v15.js"))
preset_renderer_js = read(os.path.join(BUILD, "PRESET_V15_RENDERER.js"))

print("Loaded staged: AGENT_EDU={}B PRESET_EDU={}B PRESET_RENDERER={}B".format(
    len(agent_edu_js), len(preset_edu_js), len(preset_renderer_js)))

# ---------------------------------------------------------------------------
# 1. TITLE bump
# ---------------------------------------------------------------------------
old_title = "<title>Agent Architecture Designer v32.14 | Agent Encyclopedia Premium</title>"
new_title = "<title>Agent Architecture Designer v32.15 | Encyclopedia Universal</title>"
html = must_replace(html, old_title, new_title, "TITLE")
print("[1/10] TITLE bumped")

# ---------------------------------------------------------------------------
# 2. Replace AGENT_EDU_PL block (4 entries -> 35 entries)
# ---------------------------------------------------------------------------
edu_start_marker = "// === V32.14: AGENT_EDU_PL (18 educational fields x 4 pilot agents) ===\n"
edu_end_marker = "\n// === V32.14: AGENT_MEDIA (inline base64 infographics + relative PDF paths) ===\n"

start_idx = html.find(edu_start_marker)
end_idx = html.find(edu_end_marker)
if start_idx < 0 or end_idx < 0 or end_idx <= start_idx:
    print("FAIL AGENT_EDU_PL: markers not found (start={} end={})".format(start_idx, end_idx))
    sys.exit(1)

old_edu_block = html[start_idx:end_idx]
new_edu_block = "// === V32.15: AGENT_EDU_PL (18 educational fields x 35 agents) ===\n" + agent_edu_js.rstrip()
html = html[:start_idx] + new_edu_block + html[end_idx:]
print("[2/10] AGENT_EDU_PL block replaced ({} -> {} bytes)".format(len(old_edu_block), len(new_edu_block)))

# ---------------------------------------------------------------------------
# 3. Insert PRESET_EDU_PL after AGENT_MEDIA block, before AD_MAP
# ---------------------------------------------------------------------------
anchor3 = "// O(1) agent lookup map\nconst AD_MAP=new Map(AD.map(a=>[a.id,a]));"
new3 = (
    "// === V32.15: PRESET_EDU_PL (18 educational fields x 42 presets) ===\n"
    + preset_edu_js.rstrip() + "\n\n"
    + anchor3
)
html = must_replace(html, anchor3, new3, "PRESET_EDU_PL")
print("[3/10] PRESET_EDU_PL inserted")

# ---------------------------------------------------------------------------
# 4. Rename rysujBentoPreset -> rysujBentoPresetLegacy
# ---------------------------------------------------------------------------
html = must_replace(
    html,
    "function rysujBentoPreset(pid){\n  const m=PM[pid];if(!m)return;",
    "function rysujBentoPresetLegacy(pid){\n  const m=PM[pid];if(!m)return;",
    "RENAME_LEGACY_PRESET"
)
print("[4/10] rysujBentoPreset renamed to Legacy")

# ---------------------------------------------------------------------------
# 5. Insert preset V15 renderer + wrapper before the init block
# ---------------------------------------------------------------------------
anchor5 = "function rysujBentoAgenta(aid){\n  if(typeof AGENT_EDU_PL !== 'undefined' && AGENT_EDU_PL[aid]){\n    return rysujBentoAgentaV14(aid);\n  }\n  return rysujBentoAgentaLegacy(aid);\n}\n\naktStatHTML();"
new5 = (
    "function rysujBentoAgenta(aid){\n"
    "  if(typeof AGENT_EDU_PL !== 'undefined' && AGENT_EDU_PL[aid]){\n"
    "    return rysujBentoAgentaV14(aid);\n"
    "  }\n"
    "  return rysujBentoAgentaLegacy(aid);\n"
    "}\n\n"
    "// === V32.15: PRESET V15 RENDERER (10-section encyclopedia) ===\n"
    + preset_renderer_js.rstrip() + "\n\n"
    "aktStatHTML();"
)
html = must_replace(html, anchor5, new5, "PRESET_RENDERER_JS")
print("[5/10] Preset V15 renderer inserted")

# ---------------------------------------------------------------------------
# 6. Patch ENC_V14_PILOTS next-agent cycle to use AD (cycle all 35 agents)
# ---------------------------------------------------------------------------
old_next = (
    "  // NASTEPNY AGENT\n"
    "  const idx = ENC_V14_PILOTS.indexOf(aid);\n"
    "  const nextAid = idx >= 0 ? ENC_V14_PILOTS[(idx+1) % ENC_V14_PILOTS.length] : ENC_V14_PILOTS[0];"
)
new_next = (
    "  // NASTEPNY AGENT - v32.15: cycle all 35 agents via AD (not just 4 pilots)\n"
    "  const encCycle = AD.filter(function(a){return typeof AGENT_EDU_PL !== 'undefined' && AGENT_EDU_PL[a.id]}).map(function(a){return a.id});\n"
    "  const idx = encCycle.indexOf(aid);\n"
    "  const nextAid = idx >= 0 ? encCycle[(idx+1) % encCycle.length] : (encCycle[0] || aid);"
)
html = must_replace(html, old_next, new_next, "ENC_NEXT_CYCLE")
print("[6/10] Next-agent cycle patched to use AD")

# Also bump the banner line from v32.14 to v32.15
html = must_replace(
    html,
    "h += '<p>'+encEsc(getCatLabel(d.cat))+' | v32.14 Encyklopedia Premium</p></div>';",
    "h += '<p>'+encEsc(getCatLabel(d.cat))+' | v32.15 Encyklopedia Universal</p></div>';",
    "BANNER_AGENT_VER"
)
print("[6b/10] Agent banner text bumped")

# ---------------------------------------------------------------------------
# 7. buildCostJSON version bump
# ---------------------------------------------------------------------------
html = must_replace(html, "version:'32.14',generated:", "version:'32.15',generated:", "BUILD_COST_JSON_VER")
print("[7/10] buildCostJSON version -> 32.15")

# ---------------------------------------------------------------------------
# 8. eksportujKfg version bump
# ---------------------------------------------------------------------------
html = must_replace(html, "function eksportujKfg(){const d={v:'32.14',", "function eksportujKfg(){const d={v:'32.15',", "EKSPORT_VER")
print("[8/10] eksportujKfg version -> 32.15")

# ---------------------------------------------------------------------------
# 9. localStorage key migration: acV32_14_custom -> acV32_15_custom
# ---------------------------------------------------------------------------
# There are 3 safeSaveLS and 1 safeParseLS usages of acV32_14_custom
html = html.replace("safeSaveLS('acV32_14_custom',", "safeSaveLS('acV32_15_custom',")
html = html.replace("safeParseLS('acV32_14_custom',", "safeParseLS('acV32_15_custom',")
# Extend the migration chain inside ladujCustomAgentow
old_load = (
    "function ladujCustomAgentow(){\n"
    "  // V32.14: migrate from older keys (v32..v32.13) if present\n"
    "  let customs=safeParseLS('acV32_15_custom',null);\n"
    "  if(!customs){\n"
    "    customs=safeParseLS('acV32_13_custom',null)||safeParseLS('acV32_12_custom',null)||safeParseLS('acV32_11_custom',null)||safeParseLS('acV32_10_custom',null)||safeParseLS('acV32_9_custom',null)||safeParseLS('acV32_8_custom',null)||safeParseLS('acV32_7_custom',null)||safeParseLS('acV32_6_custom',null)||safeParseLS('acV32_5_custom',null)||safeParseLS('acV32_4_custom',null)||safeParseLS('acV32_3_custom',null)||safeParseLS('acV32_2_custom',null)||safeParseLS('acV32_1_custom',null)||safeParseLS('acV32_custom',[])||[];\n"
    "    if(customs.length)safeSaveLS('acV32_15_custom',customs);\n"
    "  }"
)
new_load = (
    "function ladujCustomAgentow(){\n"
    "  // V32.15: migrate from older keys (v32..v32.14) if present\n"
    "  let customs=safeParseLS('acV32_15_custom',null);\n"
    "  if(!customs){\n"
    "    customs=safeParseLS('acV32_14_custom',null)||safeParseLS('acV32_13_custom',null)||safeParseLS('acV32_12_custom',null)||safeParseLS('acV32_11_custom',null)||safeParseLS('acV32_10_custom',null)||safeParseLS('acV32_9_custom',null)||safeParseLS('acV32_8_custom',null)||safeParseLS('acV32_7_custom',null)||safeParseLS('acV32_6_custom',null)||safeParseLS('acV32_5_custom',null)||safeParseLS('acV32_4_custom',null)||safeParseLS('acV32_3_custom',null)||safeParseLS('acV32_2_custom',null)||safeParseLS('acV32_1_custom',null)||safeParseLS('acV32_custom',[])||[];\n"
    "    if(customs.length)safeSaveLS('acV32_15_custom',customs);\n"
    "  }"
)
if old_load not in html:
    print("FAIL LS_MIGRATE: old_load anchor not found")
    sys.exit(1)
html = html.replace(old_load, new_load, 1)
print("[9/10] localStorage key migrated acV32_14 -> acV32_15 + chain extended")

# ---------------------------------------------------------------------------
# 10. Save result
# ---------------------------------------------------------------------------
write(SRC, html)
print("\n[10/10] Written: {} bytes, {} lines".format(len(html), html.count("\n")+1))
print("DONE")
