# v32.8 MASTER PLAN — Premium Visual Overhaul

**Status:** IN PROGRESS
**Started:** 2026-04-08
**Baseline:** v32.7 (6033 lines, 523089 chars)
**Target:** v32.8 — premium visual redesign in Apple/Google elegant style + bug fixes from v32.7

## Why this version exists

User feedback after v32.7 ship:
1. **BUG**: 13 new presets show no icons in detail sidebar (PRESET_SVG missing entries -> svgPresetu returns '')
2. **GAP**: No mid-length 2-3 sentence "when to use" description for presets — only the very short palette `dsc` (40 chars) and the very long `PRESET_LONG_PL` paragraph. User wants something in between so they can scan quickly.
3. **VISION**: Major visual overhaul. Apple/Google premium dark elegance. Subtle, dignified, NOT flashy. Latest April 2026 trends. Redesign all sidebars (left palette, right detail, top HUD). Keep all functionality identical — only visual layer changes.

User's exact request (translated): "use ~30 agents total, save plans in files so compaction can recover, do a thorough research first (6-8 researchers minimum), make it dark, can completely change everything, but keep it elegant Apple/Google style not eye-catching, must look really premium with the latest trends from end of March / April 2026"

## Phases

### Phase A — Bug fixes from v32.7 (synchronous, fast)
- [x] A1: v32.8 folder + plan skeletons
- [ ] A2: 13 PRESET_SVG entries (stroke-based, matching existing v32 style)
- [ ] A3: 13 PRESET_COLORS_DARK + LIGHT entries
- [ ] A4: PRESET_MID_PL constant — 2-3 sentence "when to use" for ALL presets, rendered above SZCZEGOLOWY OPIS

### Phase B — Research (8 parallel agents)
Each writes to `v32.8/research/R{N}_{topic}.md`. Topics:
1. **R1_apple_hig.md** — Apple Human Interface Guidelines 2026 + visionOS spatial design language. What does "Apple premium" actually mean in 2026? Glass materials, hierarchy, restraint.
2. **R2_material3.md** — Google Material 3 Expressive 2026. Color roles, dynamic theming, motion tokens, expressive variants.
3. **R3_dark_mode_2026.md** — Dark mode trends April 2026. Surface elevation systems, dark glass, OLED-aware blacks, accent placement.
4. **R4_glass_neumorph.md** — Glassmorphism evolution and where it's heading post-2025. Backdrop-filter strategies. Sub-pixel borders. Inner-stroke contrast.
5. **R5_premium_tools.md** — Sidebar/dashboard patterns in premium AI/dev tools: Linear, Cursor, Vercel, Arc, Raycast, Figma, Notion, Claude.ai. What do they share? Concrete pixel measurements where possible.
6. **R6_typography.md** — Typography in premium 2026 apps. Variable fonts, optical sizing, line-height systems, monospace pairings, OpenType features.
7. **R7_motion.md** — Motion + micro-interactions 2026. Spring physics, choreography, reduced-motion fallbacks, easing curves.
8. **R8_color_a11y.md** — Color systems + accessibility 2026. APCA contrast, P3 wide gamut, semantic color tokens, WCAG 2.2 vs APCA debate.

### Phase B-post — Research Critic (1 agent, after R1-R8 complete)
- **C0 Research Critic** -> v32.8/research/CRITIC.md
  - Walidacja wszystkich 8 raportow R1-R8: sprzecznosci, luki, bias, rzetelnosc zrodel
  - Ocena per researcher (rubryka completeness/accuracy/relevance/freshness/actionability) z PASS / REVISE
  - Lista CONSENSUS findings (potwierdzonych przez >=3 researcherow)
  - Rozstrzygniecia konfliktow miedzy raportami

### Phase C — Synthesis (Syntetyk + 2 spec writers, sequential then parallel)
- **C1 Syntetyk** -> v32.8/MANIFEST.md
  - Single source of truth: Decyzje Designerskie + Stack Wizualny + Design System + Known Risks + Open Questions
  - Aktualizowany po kazdej fazie
- **C2 DESIGN_SPEC writer** -> v32.8/plans/DESIGN_SPEC.md
  - Konkretne CSS variables, type scale, spacing, radii, shadows, motion - drop-in ready
- **C3 LAYOUT_SPEC writer** -> v32.8/plans/LAYOUT_SPEC.md
  - Konkretne sidebar redesigns z ASCII/HTML mockups: left palette, right detail, topbar HUD, modals

### Phase D — Five Minds Protocol Debate (5 ekspertow + Cien + Syntetyk)
Adwersarialna debata nad DESIGN_SPEC + LAYOUT_SPEC. Kazdy ekspert max 300 slow per stanowisko, 2 rundy.
- **D-FM1 Pragmatyk** — wykonalnosc, koszt CSS/JS, performance, kompatybilnosc przegladarek
- **D-FM2 Innowator** — najlepsze mozliwe rozwiazanie, przewaga konkurencyjna, swieze podejscie
- **D-FM3 Analityk Danych** — benchmarki, metryki Lighthouse, FCP/LCP, faktyczne pomiary kontrastu APCA
- **D-FM4 Rzecznik Uzytkownika** — UX, a11y, intuicyjnosc, dostepnosc, prefers-reduced-motion
- **D-FM5 Cien (Devil's Advocate)** — destrukcja konsensusu, przeoczone ryzyka, "co jesli to zalozenie jest bledne"
- **D-FM-Syn Syntetyk** — zbiera stanowiska -> aktualizuje DESIGN_SPEC.md i LAYOUT_SPEC.md ze wskazaniami z debaty

### Phase E — HITL Gate #1 (Prezenter Decyzji)
- **E1 Prezenter Decyzji** -> v32.8/plans/HITL_GATE_1.md
  - 2-3 opcje wizualnego kierunku z plusami/minusami
  - Pytanie do uzytkownika: ktora opcje wybierasz przed Build?
  - PAUZA na decyzje uzytkownika (lub fallback: opcja A jako default jesli user nie odpowie)

### Phase F — Build (5 paralelnych implementatorow + Integrator)
Kazdy edytuje swoja izolowana sekcje, czyta DESIGN_SPEC + LAYOUT_SPEC, robi JS parse po edycji.
- **F1 Designer** — root CSS tokens (:root + [data-theme=light]), shape ramp, motion tokens, color tokens
- **F2 Frontend Dev (sidebars)** — left palette .pa-*, right detail .ds-*, topbar HUD .topbar
- **F3 Frontend Dev (canvas)** — canvas nodes .nd, .pa-orb, hover/sel states, connections
- **F4 Feature Dev (modals)** — cost modal, encyclopedia, custom agent creator, mermaid
- **F5 Backend Dev (form controls)** — buttons, chips, inputs, model buttons globalny pass
- **F6 Integrator** — laczy zmiany, rozwiazuje konflikty CSS, E2E JS parse, weryfikuje spojnosc z MANIFEST

### Phase G — HITL Gate #2 (Prezenter Decyzji)
- **G1 Prezenter Decyzji** -> v32.8/plans/HITL_GATE_2.md
  - Status po Build: co dziala, co wymaga decyzji
  - 2-3 opcje co naprawic vs co przepuscic do QA
  - PAUZA na decyzje (fallback: GO do QA)

### Phase H — QA (3 audytorzy + Manager QA)
- **H1 QA Security** — XSS w nowych innerHTML render paths, sanityzacja, focus traps modali
- **H2 QA Quality** — pokrycie a11y (aria, focus-visible, role), prefers-reduced-motion, semantic HTML, kontrast APCA
- **H3 QA Performance** — paint czas, backdrop-filter koszt, animacje na 60fps, bundle size delta
- **H4 Manager QA** -> v32.8/plans/QA_REPORT.md
  - Agreguje H1+H2+H3, GO/NO-GO ocena 1-10, lista naprawcza jesli NO-GO

### Phase I — HITL Gate #3 (Prezenter Decyzji) + ship
- **I1 Prezenter Decyzji** -> finalna brama: ship vs naprawy
- **I2 Final JS parse + Mirror** — kopiuj do index.html
- **I3 Update CLAUDE.md + memory** — dodaj wpis v32.8, zaktualizuj MEMORY.md, stworz project_v32_8_status.md

## Workflow zgodny z Deep Five Minds (zgodnie z preset z v32.7)
A: bug fix [DONE]
B: 8 researcherow [IN PROGRESS]
B-post: Research Critic
C: Syntetyk + DESIGN_SPEC + LAYOUT_SPEC
D: Five Minds debate (5 ekspertow + Cien)
E: HITL Gate #1 (przed Build)
F: Build (5 implementatorow + Integrator)
G: HITL Gate #2 (przed QA)
H: QA (Security + Quality + Performance + Manager)
I: HITL Gate #3 (final ship)
Razem: ~30 agentow zgodnie z proba uzytkownika.

## Compaction-recovery protocol

If compaction happens mid-task:
1. Read this MASTER_PLAN.md first
2. Read PROGRESS.md to find current phase + last completed task
3. Read v32.8/research/ for any completed research
4. Read v32.8/plans/ for any completed specs
5. Resume from the next pending task in the phase list above

Progress is tracked in `PROGRESS.md`. Each phase update writes a new entry there.

## Constraints (non-negotiable)

- All functionality from v32.7 must continue working — no behavioral regressions
- File must remain a single self-contained HTML file
- All Polish UI text preserved with EN i18n
- localStorage migration chain extended: `acV32_8_custom -> acV32_7_custom -> ...`
- Version stamps bumped: title, eksportujKfg v=, buildCostJSON version=
- No emojis added (only existing AD `i:` field emojis stay)
- No em-dashes / en-dashes anywhere — only `-`
- Apple/Google elegance: subtle, restrained, dignified — NOT flashy gradients or rainbow neon
- **MOTYW GWIAZD ZOSTAJE** (decyzja uzytkownika 2026-04-08, doprecyzowanie): animated starfield + shooting stars to motyw przewodni i ma zostac. Mozna go DELIKATNIE udoskonalic (gestosc, paralaksa, wielkosci, lekka korekta odcienia/jasnosci, dodatkowe warstwy parallax, lepszy twinkle easing, redukcja na prefers-reduced-motion) ale NIE wolno go usunac ani zastapic plaskim tlem/gradientem/glass background. Zadne nowe CSS background na .canvas / body / .stage nie moze go calkowicie nadpisac. Phase D Five Minds ma to przyjac jako constraint, Phase F Build ma to chronic. Refinement gwiazd dozwolony tylko jako osobny minor task w Build, nie ukrywany w innych edytach.
