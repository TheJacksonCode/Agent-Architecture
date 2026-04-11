# v32.10 MASTER PLAN

## Cel jednego zdania
Przepisac opisy WSZYSTKICH 41 presetow w prostym polskim jezyku tak, zeby osoba nietechniczna zrozumiala kiedy uzyc danego presetu i co on robi.

## Zakres (one-liner)
- `PRESET_MID_PL` - pelen rewrite wszystkich 41 wpisow ("kiedy uzywac", 2-4 zdania, prosty jezyk)
- `PRESET_LONG_PL` - rewrite 13 istniejacych (zbyt techniczne) + nowe 28 wpisow (razem 41), format sekcyjny, prosty jezyk
- `pokazInfoPr` render order swap: **KIEDY UZYWAC przed SZCZEGOLOWY OPIS** (obecnie odwrotnie)
- Bez zmian w kodzie JS poza render order
- Bump do v32.10 + migration chain
- **NIE shipujemy do index.html** dopoki nie skonczymy caly v32.9/v32.10 polish - mirror nastapi przy v33

## Fazy
- A. Setup + audyt (TA - DONE teraz)
- B. Style Guide (TB)
- C. Delegacja do 3 rownoleglych agentow content-writers
- D. Integracja zebranych wpisow do HTML
- E. Swap render order w pokazInfoPr
- F. Version bump + localStorage migration chain
- G. QA parse + grep audit
- H. PROGRESS.md update

## Agent batches (C)

Podzial na 3 rownolegle agenty:
- **A1**: MICRO + MALE (14 presetow): solo, quick_fix, recon, trio, reflect, bug_hunt, content, plan_exec, perf_boost, startup, cascade, test_suite, a11y, security
- **A2**: SREDNIE (13 presetow): review, design_sys, api_modern, ui_overhaul, feature_sprint, standard, data_pipe, research, ab_test_lab, tech_writing_pipe, perf_squad, legacy, saas
- **A3**: DUZE + ENTERPRISE (14 presetow): microservices, deep_research_swarm_pro, migration_crew, fullstack_premium, security_multi_vector, prd_to_launch, kb_constructor, soc2_sweep, data_analysis_pipe, incident_war_room, full, deep, five_minds, deep_five_minds, five_minds_strategic

Kazdy agent czyta STYLE_GUIDE.md, lokalizuje PM[pid] i PRESET_KNOWLEDGE[pid] w v32.10 HTML, produkuje JS snippet.

## Constrainty nienegocjowalne
- Jezyk: prosty polski, zero zargonu IT. Zastepujemy "root cause" -> "pierwotna przyczyna", "pipeline" -> "zespol/przeplyw", "research" -> "badanie/wyszukiwanie informacji", "deploy" -> "wdrozenie", "observability" -> "monitoring", "PRD" -> "dokument wymagan produktu".
- Preset/agent/bug/kod/test/SOC2 mozna zostawic (uniwersalne).
- Dlugosc KIEDY UZYWAC: 2-4 krotkie zdania.
- Dlugosc SZCZEGOLOWY OPIS: ~130-200 slow, sekcje z bold headerami.
- Zero em/en-dash (tylko zwykly minus -).
- Escapowanie apostrofow dla JS stringow.
- Wszystkie descriptions musza byc zrozumiale dla osoby nietechnicznej "z ulicy".

## Layout zmiana (E)
Obecnie w pokazInfoPr (linia 6418-6422):
1. ds-card z ikona + nazwa
2. SZCZEGOLOWY OPIS (PRESET_LONG_PL)
3. KIEDY UZYWAC (PRESET_MID_PL)
4. OPIS (fallback)

Po zmianie:
1. ds-card
2. KIEDY UZYWAC
3. SZCZEGOLOWY OPIS
4. OPIS (fallback)
