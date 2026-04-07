# Orkiestrator — Prompt do generowania ikony

## Agent: Orkiestrator (Orchestrator)
**Rola**: Centralny punkt decyzyjny calego systemu agentow. Nie generuje tresci — zarzadza workflow, deleguje zadania, kontroluje bramy miedzy fazami (GO/NO-GO), rozwiazuje konflikty.
**Kolor przewodni**: #FBBF24 — zloty amber, ciepla poswiatla, jak slonce w centrum ukladu
**Model**: Claude Opus 4.6 (najmocniejszy)

---

## PROMPT (do generowania ikony)

```
Create a premium icon for "The Orchestrator" — the central command intelligence of a multi-agent AI system.

CONCEPT: A cosmic conductor standing at the center of a stellar command nexus. Think of a golden supergiant star at the heart of a galaxy — everything orbits around it, everything draws energy from it, but it itself remains calm, composed, sovereign.

VISUAL DESCRIPTION:
- Central element: A stylized crown-like structure made of golden light beams radiating outward — not a literal crown, more like a stellar corona or solar flare pattern. The beams should feel like they're conducting energy, directing flows of data and decisions in different directions.
- Behind the crown: A perfect circle of warm amber light (#FBBF24) acting as a "command halo" — reminiscent of a total solar eclipse where the corona is visible. The halo has a subtle gradient from bright gold at center to deeper amber at edges.
- Orbiting elements: 4-6 tiny geometric nodes (representing other agents) orbiting the central figure on thin elliptical paths — like planets around a star. Each orbit line is a different subtle shade of gold, barely visible, suggesting control without force.
- Texture detail: Within the central halo, there should be extremely fine concentric rings — like tree rings or vinyl grooves — suggesting layers of accumulated wisdom and decision history. These are visible only when zoomed in, creating a "second layer of discovery."
- Small easter egg: Hidden within the corona rays, one beam subtly forms a tiny "GO" text made of light particles — a nod to the Orchestrator's GO/NO-GO gate decisions. This should be almost invisible at icon size but discoverable when enlarged.

STYLE:
- Galactic/cosmic aesthetic — dark space background implied (transparent)
- Golden amber palette: primary #FBBF24, secondary #F59E0B, highlight #FDE68A, shadow #92400E
- Clean geometric lines with organic glow effects
- Stroke-based with selective fills for emphasis
- The icon should feel WARM and AUTHORITATIVE — like a benevolent commander
- No literal human figure — abstract/geometric representation
- Scalable from 24px to 512px without losing clarity

MOOD/EMOTION:
- Confidence without arrogance
- Calm authority — "I know exactly what needs to happen next"
- Gravitational pull — you naturally look at this icon first
- A hint of ancient wisdom — like a star that has burned for billions of years

TECHNICAL REQUIREMENTS:
- SVG format, viewBox="0 0 24 24"
- Stroke-width: 1.5-2 for main elements, 0.5-1 for details
- Use currentColor for primary strokes (will inherit #FBBF24 in app)
- Fill="currentColor" only for accent dots/nodes
- Transparent background
- Must be recognizable and distinct at 24x24px
- Detail layers visible at 48px+ and 128px+

DO NOT:
- Use literal human figures or faces
- Make it look like a generic settings/gear icon
- Use more than 3 levels of visual complexity
- Make it symmetrical on all axes — slight asymmetry adds life
```

---

## WARIANTY DO ROZWAENIA

### Wariant A: "Solar Commander"
Korona sloneczna z promieniami kierunkowymi — kazdy promien wskazuje inny kierunek jak dyrygent wskazujacy sekcjom orkiestry.

### Wariant B: "Nexus Star"
Gwiazda w centrum z 6 polaczonymi wezlami na orbitach — przypomina atom lub uklad planetarny, ale z wyrazna hierarchia (centrum > orbity).

### Wariant C: "Golden Gate"
Brama/portal z zlotem — dwa luki tworzace brame z promieniem swiatla przechodzacym przez srodek. Nawiazanie do "gate'ow" decyzyjnych GO/NO-GO.

---

## KONTEKST W APLIKACJI
Ikona pojawia sie w:
- Node na canvasie (48x48px orb)
- Sidebar detail panel (56x56px avatar)
- Dialog Timeline (16x16px inline)
- Live Monitor agent cards (32x32px)
- Encyclopedia bento cards (64x64px)
- Final Prompt view (24x24px inline)

Orkiestrator jest ZAWSZE widoczny na canvasie (always-on agent) — jego ikona musi byc natychmiast rozpoznawalna wsrod 26 innych agentow.
