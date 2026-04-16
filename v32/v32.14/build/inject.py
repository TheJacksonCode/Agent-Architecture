#!/usr/bin/env python3
# v32.14 Agent Encyclopedia Premium - atomic injection script
# Applies all 10 mutations to v32.14/AGENT_TEAMS_CONFIGURATOR_v32_14.html

import os
import sys

ROOT = r"C:\Projekty Claude Code\Agent_Architecture\v32.14"
SRC = os.path.join(ROOT, "AGENT_TEAMS_CONFIGURATOR_v32_14.html")
BUILD = os.path.join(ROOT, "build")

def read(p):
    with open(p, "r", encoding="utf-8") as f:
        return f.read()

def write(p, s):
    with open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(s)

def must_replace(haystack, needle, repl, tag):
    if haystack.count(needle) != 1:
        print("FAIL {}: needle count={}".format(tag, haystack.count(needle)))
        sys.exit(1)
    return haystack.replace(needle, repl, 1)

html = read(SRC)
print("Loaded HTML: {} bytes, {} lines".format(len(html), html.count("\n")+1))

# Load staged blocks
css_block = read(os.path.join(BUILD, "CSS_BLOCK.txt"))
js_block = read(os.path.join(BUILD, "JS_BLOCK.txt"))
modal_html = read(os.path.join(BUILD, "HTML_MODAL.txt"))
edu_js = read(os.path.join(BUILD, "AGENT_EDU_PL.js"))
media_js = read(os.path.join(BUILD, "AGENT_MEDIA.js"))

print("Loaded staged blocks: CSS={}B JS={}B MODAL={}B EDU={}B MEDIA={}B".format(
    len(css_block), len(js_block), len(modal_html), len(edu_js), len(media_js)))

# ---------------------------------------------------------------------------
# 1. TITLE bump
# ---------------------------------------------------------------------------
old_title = "<title>Agent Architecture Designer v32.13 | Agent Detail Sidebar Premium Polish</title>"
new_title = "<title>Agent Architecture Designer v32.14 | Agent Encyclopedia Premium</title>"
html = must_replace(html, old_title, new_title, "TITLE")
print("[1/10] TITLE bumped")

# ---------------------------------------------------------------------------
# 2. Replace old .bento-grid rule with v14 placeholder comment
# ---------------------------------------------------------------------------
old_grid = ".bento-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-flow:dense;gap:14px;margin-bottom:24px}"
new_grid = "/* v32.14: legacy .bento-grid kept intact for 31 non-pilot agents; new .bento-grid-v14 defined below */\n.bento-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-flow:dense;gap:14px;margin-bottom:24px}"
html = must_replace(html, old_grid, new_grid, "GRID_RULE")
print("[2/10] GRID marker inserted")

# ---------------------------------------------------------------------------
# 3. Replace old media queries with v14 note (keep legacy queries for legacy renderer)
# ---------------------------------------------------------------------------
old_media = (
    "@media(max-width:1100px){.side-r{width:260px}.bento-grid{grid-template-columns:repeat(3,1fr)}}\n"
    "@media(max-width:900px){.side-l{width:200px}.side-r{width:220px}.bento-grid{grid-template-columns:repeat(2,1fr)}}\n"
    "@media(max-width:700px){.side-l,.side-r{display:none}.bento-grid{grid-template-columns:1fr}}\n"
    "/* === V23: LIGHT THEME OVERRIDES === */"
)
new_media = (
    "@media(max-width:1100px){.side-r{width:260px}.bento-grid{grid-template-columns:repeat(3,1fr)}}\n"
    "@media(max-width:900px){.side-l{width:200px}.side-r{width:220px}.bento-grid{grid-template-columns:repeat(2,1fr)}}\n"
    "@media(max-width:700px){.side-l,.side-r{display:none}.bento-grid{grid-template-columns:1fr}}\n\n"
    "/* === V32.14: AGENT ENCYCLOPEDIA PREMIUM - container queries + enc-* recipes + zoom lightbox === */\n"
    + css_block.rstrip() + "\n\n"
    "/* === V23: LIGHT THEME OVERRIDES === */"
)
html = must_replace(html, old_media, new_media, "CSS_BLOCK")
print("[3/10] CSS block inserted ({} bytes)".format(len(css_block)))

# ---------------------------------------------------------------------------
# 4. Insert AGENT_EDU_PL + AGENT_MEDIA constants before AD_MAP
# ---------------------------------------------------------------------------
anchor4 = "// O(1) agent lookup map\nconst AD_MAP=new Map(AD.map(a=>[a.id,a]));"
new4 = (
    "// === V32.14: AGENT_EDU_PL (18 educational fields x 4 pilot agents) ===\n"
    + edu_js.rstrip() + "\n\n"
    "// === V32.14: AGENT_MEDIA (inline base64 infographics + relative PDF paths) ===\n"
    + media_js.rstrip() + "\n\n"
    + anchor4
)
html = must_replace(html, anchor4, new4, "EDU_MEDIA")
print("[4/10] AGENT_EDU_PL + AGENT_MEDIA inserted")

# ---------------------------------------------------------------------------
# 5. Rename legacy renderer + insert V14 renderer + wrapper
# ---------------------------------------------------------------------------
anchor5 = "function rysujBentoAgenta(aid){\n  const d=AD_MAP.get(aid);if(!d)return;"
rename5 = "function rysujBentoAgentaLegacy(aid){\n  const d=AD_MAP.get(aid);if(!d)return;"
html = must_replace(html, anchor5, rename5, "RENAME_LEGACY")
print("[5/10] rysujBentoAgenta renamed to Legacy")

# ---------------------------------------------------------------------------
# 6. Insert JS_BLOCK (defines V14 renderer + wrapper + helpers + zoom modal)
# Insert AFTER the legacy function closes. We find the line "aktStatHTML();"
# which is the last init block before </script>. Insert before it.
# Actually we need to insert the JS block BEFORE that init so helpers are defined.
# Safer anchor: the final "aktStatHTML();" call.
# ---------------------------------------------------------------------------
anchor6 = "aktStatHTML();\ninicjGwiazdy();inicjStrumienDanych();ladujCustomAgentow();rPalete();rPresety();rZapisy();aktSiatke();ladujPreset('deep_five_minds');podepnijPrTip();"
new6 = (
    "// === V32.14: AGENT ENCYCLOPEDIA PREMIUM - helpers + zoom modal + V14 renderer + wrapper ===\n"
    + js_block.rstrip() + "\n\n"
    + anchor6
)
html = must_replace(html, anchor6, new6, "JS_BLOCK")
print("[6/10] JS_BLOCK inserted ({} bytes)".format(len(js_block)))

# ---------------------------------------------------------------------------
# 7. Insert #moZoom modal shell before </body>
# ---------------------------------------------------------------------------
anchor7 = "</script>\n</body>"
new7 = (
    "</script>\n"
    "<!-- === V32.14: Zoom lightbox modal (shared for all infographic previews) === -->\n"
    + modal_html.rstrip() + "\n"
    "</body>"
)
html = must_replace(html, anchor7, new7, "MODAL_SHELL")
print("[7/10] #moZoom modal inserted")

# ---------------------------------------------------------------------------
# 8. buildCostJSON version bump
# ---------------------------------------------------------------------------
html = must_replace(html, "version:'32.13',generated:", "version:'32.14',generated:", "BUILD_COST_JSON_VER")
print("[8/10] buildCostJSON version -> 32.14")

# ---------------------------------------------------------------------------
# 9. eksportujKfg version bump
# ---------------------------------------------------------------------------
html = must_replace(html, "function eksportujKfg(){const d={v:'32.13',", "function eksportujKfg(){const d={v:'32.14',", "EKSPORT_VER")
print("[9/10] eksportujKfg version -> 32.14")

# ---------------------------------------------------------------------------
# 10. localStorage key migration: acV32_13_custom -> acV32_14_custom
# ---------------------------------------------------------------------------
# Two save sites + one load site
# a) zapiszCustom save
html = html.replace(
    "safeSaveLS('acV32_13_custom',AD.filter(a=>a.isCustom));\n  rPalete();rWez();aktStan();aktLicznik();\n  zamknijModal('moC');\n  pokazToast(t('Agent zapisany!'));",
    "safeSaveLS('acV32_14_custom',AD.filter(a=>a.isCustom));\n  rPalete();rWez();aktStan();aktLicznik();\n  zamknijModal('moC');\n  pokazToast(t('Agent zapisany!'));",
    1
)
# b) usunCustomAgent save
html = html.replace(
    "safeSaveLS('acV32_13_custom',AD.filter(a=>a.isCustom));\n  rPalete();rWez();aktStan();aktLicznik();zamknijModal('moC');",
    "safeSaveLS('acV32_14_custom',AD.filter(a=>a.isCustom));\n  rPalete();rWez();aktStan();aktLicznik();zamknijModal('moC');",
    1
)
# c) ladujCustomAgentow - rewrite the migration chain
old_load = (
    "function ladujCustomAgentow(){\n"
    "  // V32.13: migrate from older keys (v32..v32.12) if present\n"
    "  let customs=safeParseLS('acV32_13_custom',null);\n"
    "  if(!customs){\n"
    "    customs=safeParseLS('acV32_12_custom',null)||safeParseLS('acV32_11_custom',null)||safeParseLS('acV32_10_custom',null)||safeParseLS('acV32_9_custom',null)||safeParseLS('acV32_8_custom',null)||safeParseLS('acV32_7_custom',null)||safeParseLS('acV32_6_custom',null)||safeParseLS('acV32_5_custom',null)||safeParseLS('acV32_4_custom',null)||safeParseLS('acV32_3_custom',null)||safeParseLS('acV32_2_custom',null)||safeParseLS('acV32_1_custom',null)||safeParseLS('acV32_custom',[])||[];\n"
    "    if(customs.length)safeSaveLS('acV32_13_custom',customs);\n"
    "  }"
)
new_load = (
    "function ladujCustomAgentow(){\n"
    "  // V32.14: migrate from older keys (v32..v32.13) if present\n"
    "  let customs=safeParseLS('acV32_14_custom',null);\n"
    "  if(!customs){\n"
    "    customs=safeParseLS('acV32_13_custom',null)||safeParseLS('acV32_12_custom',null)||safeParseLS('acV32_11_custom',null)||safeParseLS('acV32_10_custom',null)||safeParseLS('acV32_9_custom',null)||safeParseLS('acV32_8_custom',null)||safeParseLS('acV32_7_custom',null)||safeParseLS('acV32_6_custom',null)||safeParseLS('acV32_5_custom',null)||safeParseLS('acV32_4_custom',null)||safeParseLS('acV32_3_custom',null)||safeParseLS('acV32_2_custom',null)||safeParseLS('acV32_1_custom',null)||safeParseLS('acV32_custom',[])||[];\n"
    "    if(customs.length)safeSaveLS('acV32_14_custom',customs);\n"
    "  }"
)
if old_load not in html:
    print("FAIL LS_MIGRATE: old_load anchor not found")
    sys.exit(1)
html = html.replace(old_load, new_load, 1)
print("[10/10] localStorage key migrated acV32_13 -> acV32_14")

# Save result
write(SRC, html)
print("\nWritten: {} bytes, {} lines".format(len(html), html.count("\n")+1))
print("DONE")
