# v32.12 MASTER PLAN - Header Composition + Compact Controls

## Motywacja (user quote)

User po v32.11 verdict panel chce dopracowac 3 kolejne sekcje w sidebarze preset-detail:

1. **SKLAD do headera** - "w tym właśnie miejscu gdzie jest ikona i te informacje no to tam właśnie powinien być ten skład. możemy tutaj właśnie wcisnąć na dole jeszcze ponieważ on tam się bez problemu zmieści". Przyklad: Deep Research and Build "18 agentów full orkiestra" - tam dodac kompozycje "4 Opus / 10 Sonnet / 4 Haiku".

2. **CLAUDE CODE COMMAND** - "czy ma tak wyglądać" - przegladnac i zdecydowac czy zostaje, zmienic na bardziej kompakt, czy inna forma.

3. **ZMIEN MODEL** - "to wszystko to jest niejasne... nie wiem czy to będzie aż tak często używana funkcja więc nie wiem czy jest sens żeby jakby były jakby trzy przyciski pod sobą moglibyśmy nawet to zmieścić w sumie wszystkie obok siebie... było napisane opus w sensie jakie są nazwa modelu... takie zwinne". Tzn: horyzontalny rzad 3 chipow, krotkie labele "Opus" / "Sonnet" / "Haiku" bez wersji / ctx / pricing.

## Constrainty

- Sidebar width 360px (z v32.11), inner ~336px
- Dark glassmorphism + starfield preserved
- Tokens: --mc-opus, --mc-sonnet, --mc-haiku (+ -rgb), --ph-* phase colors, --bg-card, --bg-input
- Plain Polish, no jargon
- WCAG 2.2 SC 2.5.8 (target-size >= 24x24)
- APCA Lc >= 60 body text
- prefers-reduced-motion support
- escHtml() na dynamicznych stringach
- No em-dashes, no emojis (poza istniejacymi clipboard &#128203;)

## Fazy

### Phase A - Setup (DONE)
- v32.12/{research,plans} created
- v32.12/AGENT_TEAMS_CONFIGURATOR_v32_12.html copied from v32.11 (7399 lines baseline)
- MASTER_PLAN.md + PROGRESS.md written

### Phase B - Research (IN PROGRESS, background)
- R1 `R1_compact_controls.md` - 3 topics (A: SKLAD header chips, B: command display, C: compact model switcher), candidates + recommendations + drop-in CSS + APCA contrast

### Phase C - Design decisions
- DESIGN_SPEC.md - wybrane patterny z R1, uzasadnienie, mapowanie na istniejace tokeny
- LAYOUT_SPEC.md - ASCII mockup nowego sidebara, class names, HTML structure, JS template literal

### Phase D - Implementation
- D1: Dodac CSS dla header composition chips (.hd-mix, .hd-mix-chip) po .ds-longdesc
- D2: Dodac CSS dla compact model switcher (.mdl-compact, .mdl-compact-chip)
- D3: Patch pokazInfoPr header card - wstrzyknac .hd-mix pod .ds-role
- D4: Usunac z pokazInfoPr srodkowy `ds` blok SKLAD (redundantny po przeniesieniu)
- D5: Patch sekcji ZMIEN MODEL - zamienic .ds-mdl-big z 3 pionowych .ds-mdl-btn na .mdl-compact (3 poziome chipy)
- D6: (opcjonalnie per research) polish CLAUDE CODE COMMAND
- D7: Version bumps (title v32.12, eksportujKfg v='32.12', buildCostJSON, localStorage acV32_12_custom + migration chain)

### Phase E - QA + ship
- node --check JS parse
- grep audit: SKLAD sekcja usunieta, .hd-mix w headerze, .mdl-compact zamiast .ds-mdl-big, version bumps
- Visual eyeball (brak - automated only)
- Update PROGRESS.md -> SHIPPED
- Update memory project_v32_12_status.md + MEMORY.md index
- NIE mirror do index.html (odroczony per workflow)

## Decyzje otwarte (do ustalenia po R1)

- DO-1: Czy SKLAD w headerze to chipy "4 Opus / 6 Sonnet / 2 Haiku" czy micro-bar 100%-stacked czy dot-row?
- DO-2: Czy CLAUDE CODE COMMAND zostaje w obecnej formie, ale moze bez helper textu?
- DO-3: Czy compact model switcher to segmented control (sliding pill), pill group, czy underline-active?
- DO-4: Czy komenda zmienWszModel() pozostaje (zmienia WSZYSTKIE nody w presecie) czy wywala sie z sidebara jako slabo uzywana?

## Success criteria

- v32.12 HTML parse PASS (node --check)
- Sidebar preset-detail ma: header card z composition chipami zamiast "N agentow | pt" tylko (lub obok) -> KIEDY UZYWAC -> VERDICT -> SZCZEGOLOWY OPIS -> CLAUDE CODE COMMAND -> ZMIEN MODEL (compact row) -> Encyklopedia
- Srodkowy ds blok SKLAD usuniety
- ZMIEN MODEL redukcja pionowa ~140px -> ~40px (3.5x mniej)
- Label w chipach modelu: "Opus" / "Sonnet" / "Haiku" (bez wersji, bez cen, bez ctx)
- target-size WCAG OK
- APCA Lc >= 60 na wszystkich labelach
