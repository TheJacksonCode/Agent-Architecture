# NotebookLM Ready Video - Skills Architecture

## SEKCJA 1: Video - Opis niestandardowego stylu wizualnego

Dark Anthropic: tlo #141413, orange #d97757 dla liczb-hero, blue #6a9bcc dla kodu, green #788c5d dla PASS. Typografia JetBrains Mono dla liczb i sciezek (SKILL.md, context:fork, 25k), Inter dla narracji. Decision tree jako centralny motyw: 4 galezie (Skill / Subagent / Hook / MCP) z orthogonal arrows i rounded nodes 16px. Split screen problem/solution, code-on-screen z typing animation, cut co 2-3 sek, sub-bass pod cold open. Dual output: master 16:9 (2-3 min) + auto-crop 9:16 (60-75s) z burned-in captions.

## SEKCJA 2: Video - Na czym powinni sie skupiac prezenterzy AI

Cold open 3-sek, warstwowy (wizual + audio punch + tekst): "Skill, Subagent, Hook, MCP. Cztery opcje, jeden wybor. Co wybrac." Potem in-medias-res reveal: decision tree na ekranie, a ty wskazujesz ze wiekszosc devow myli tiery.

Rdzen narracji to **komplementarnosc 4 tierow, nie konkurencja**: MCP to dane (API, DB), Skills to prompty (reusable pattern), Subagents to izolacja (wlasna pamiec), Hooks to triggery (lifecycle event). Jeden deadpan sentence per tier, bez marketingowej waty.

Highlight liczb-hero w monospace orange: **1% context budget / fallback 8000 znakow**, **1536 znakow per entry cap**, **5000 tokenow survive compaction**, **25000 tokenow shared re-attach budget**, **chain depth max 3-5 skilli** (dluzej = drop najstarszych).

Bug #17283 jako 10-sek dramatic beat: "context:fork ignorowany gdy skill invokowany przez Skill tool. Parallel fan-out blokowany. Workaround: Task tool zamiast Skill tool." Red flash, potem spokojnie dalej.

Highest-impact quality lever: **commitment-before-generation** (Frontend Design, Trail of Bits) - skill najpierw deklaruje co zrobi, dopiero potem generuje. 2x wzrost trafnosci w blind tests.

Zamkniecie Fireship-style deadpan: "Start simplest. Jesli default Claude wystarcza, nie buduj nic. Jesli musisz, zacznij od jednego Skilla, nie od orkiestratora z 17 agentami." Peak-end rule: ostatnie 3 sek to orange flash z liczba 35 skilli + 42 presetow jako CTA.
