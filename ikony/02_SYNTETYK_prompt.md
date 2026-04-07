# Syntetyk — Prompt do generowania ikony

## Agent: Syntetyk (Synthesizer)
**Rola**: Pamiec cross-fazowa systemu — utrzymuje MANIFEST.md jako single source of truth. Zbiera wyniki z kazdej fazy, aktualizuje decyzje architektoniczne, oznacza sprzecznosci miedzy agentami. Jest "klejem" ktory laczy wszystko w spojna calosc.
**Kolor przewodni**: #A78BFA — fioletowy/lavender, ale z brokatowym/krystalicznym efektem zeby sie odroznic od granatowego (#818CF8) Analityka
**Model**: Claude Opus 4.6 (najmocniejszy)

---

## PROMPT (do generowania ikony)

```
Create a premium icon for "The Synthesizer" — the living memory and knowledge weaver of a multi-agent AI system.

CONCEPT: A crystalline neural nexus — imagine a purple amethyst crystal floating in space that acts as a cosmic library and memory palace. Everything that happens in the system passes through this crystal, gets refracted, and emerges as unified knowledge. It's not a passive storage — it's an ACTIVE weaver that finds patterns others miss.

VISUAL DESCRIPTION:
- Central element: A multi-faceted crystal or prism shape — not a simple diamond, but an irregular, organic crystal cluster with 3-5 distinct facets visible. Each facet represents a different phase of knowledge it has absorbed (strategy, research, build, QA). The crystal should feel like it's ALIVE — slightly asymmetric, growing.
- Refraction effect: From the crystal, 3-4 thin light beams emerge at different angles, each a slightly different shade of violet/purple (#A78BFA, #8B5CF6, #C4B5FD, #7C3AED). These represent synthesized knowledge being sent out to other agents. The beams should have a subtle sparkle/glitter effect — tiny dots along the beam paths like stardust or data particles.
- Surrounding aura: A soft, diffused glow around the crystal — NOT a hard circle, but an organic nebula-like cloud of purple light. Think of the Crab Nebula but miniaturized. This gives the "brokatowy" (glittery) effect that differentiates it from flat indigo/navy colors.
- Memory threads: Extremely fine lines (almost invisible at small sizes) connecting to invisible points outside the frame — like spider web silk or neural dendrites. These represent the cross-phase connections the Synthesizer maintains. At least 6-8 threads radiating outward, some with tiny nodes (dots) where they exit the frame.
- Easter egg detail: Inside the largest crystal facet, there's a micro-pattern that resembles a tiny document or scroll icon — a nod to MANIFEST.md, the Synthesizer's sacred document. Visible only at 64px+.
- Sparkle particles: 5-7 tiny star-like sparkles scattered around the crystal at varying distances — like glitter caught in cosmic light. These give the "brokat" effect and make the icon feel magical and alive. Each sparkle is a 4-pointed or 6-pointed tiny star.

STYLE:
- Galactic/cosmic aesthetic — crystal floating in space
- Purple palette with SHIMMER: primary #A78BFA, deep #7C3AED, light #C4B5FD, sparkle #E9D5FF, accent glow #DDD6FE
- The purple must feel DISTINCTLY DIFFERENT from navy/indigo (#818CF8) — achieved through the crystal refraction, sparkles, and lighter lavender tones
- More organic and flowing than the Orchestrator (which is geometric/authoritative)
- The icon should feel like it's SHIMMERING — even as a static image
- Elegant and mystical — like finding an ancient artifact that still pulses with energy

MOOD/EMOTION:
- Wisdom and synthesis — "I see connections you don't"
- Quiet brilliance — not loud like the Orchestrator, but deeply perceptive
- Crystalline clarity — transforming chaos into structured knowledge
- A sense of MAGIC — the Synthesizer does something that feels almost supernatural (finding cross-phase patterns)
- Collectedness — this is the calmest agent, the one who REMEMBERS everything

VISUAL DIFFERENTIATION FROM NEARBY COLORS:
- Analyst (#818CF8 indigo): Analyst should feel TECHNICAL and SHARP. Synthesizer should feel ORGANIC and LUMINOUS.
- Orchestrator (#FBBF24 gold): Orchestrator is WARM command. Synthesizer is COOL wisdom.
- The crystal/prism shape + sparkles + lighter purple tones should make it IMMEDIATELY distinguishable from the flat indigo of Analyst.

TECHNICAL REQUIREMENTS:
- SVG format, viewBox="0 0 24 24"
- Stroke-width: 1.5-2 for crystal edges, 0.5-1 for light beams and threads
- Use currentColor for primary strokes (will inherit #A78BFA in app)
- Fill="currentColor" only for sparkle dots and crystal core
- Transparent background
- Must be recognizable and distinct at 24x24px
- Crystal facets clear at 32px+, sparkles visible at 48px+, easter egg at 64px+

DO NOT:
- Make it look like a generic database or storage icon
- Use a brain symbol (too literal, too cliche)
- Make it perfectly symmetrical — crystals are organic
- Confuse it with the Analyst's magnifying glass aesthetic
- Use hard geometric shapes only — mix angular crystal with soft glow
```

---

## WARIANTY DO ROZWAENIA

### Wariant A: "Amethyst Nexus"
Klaster krysztalow ametystu z promieniami swiatla przechodzacymi przez niego jak przez pryzmat. Kazdy promien wychodzacy ma inny odcien fioletu. Wokol mglawica z brokatem.

### Wariant B: "Memory Weaver"
Pajeczyna z krysztalu w centrum — nitki rozchodza sie promieniście, a na kazdym skrzyzowaniu nitek jest maly punkt swietlny (wezel pamieci). Kryształ w centrum pulsuje jak serce.

### Wariant C: "Cosmic Prism"
Trojkatny pryzmat unoszacy sie w przestrzeni — po jednej stronie wchodzi bialy promien, a po drugiej wychodzi teczowy widmo rozlozone na kolory faz (zloty strategia, zielony build, czerwony QA). Pod pryzmatem cien z brokatowymi ciasteczkami.

---

## KONTEKST W APLIKACJI
Ikona pojawia sie w tych samych miejscach co Orkiestrator — oba sa "always-on" agentami widocznymi na canvasie przez cala symulacje.

Syntetyk jest DRUGIM najwazniejszym agentem po Orkiestratorze. Ich ikony musza byc:
1. Natychmiast rozrozniane obok siebie (zloto vs fiolet)
2. Obie "premium" ale w innym stylu (Orkiestrator = cieplo/wladza, Syntetyk = chlod/madresc)
3. Polaczone wizualna "energia" — w symulacji miedzy nimi jest "energy line", wiec ikony powinny wygladac jakby mogly "rozmawiac" ze soba

## POROWNANIE Z ORKIESTRATOREM
| Cecha | Orkiestrator | Syntetyk |
|-------|-------------|----------|
| Kolor | Zloty #FBBF24 | Fioletowy #A78BFA |
| Ksztalt | Korona/gwiazda (geometryczny) | Kryształ/pryzmat (organiczny) |
| Energia | Promieniuje NA ZEWNATRZ | Absorbuje DO SRODKA i transformuje |
| Nastroj | Ciepla wladza | Chlodna madrosc |
| Efekt | Blask slonca | Brokat/migotanie krysztalu |
| Szczegol | Ukryte "GO" w promieniach | Ukryty dokument w krysztale |
