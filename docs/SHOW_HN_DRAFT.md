# Show HN Draft

## Title
Show HN: Agent Architecture Designer - visual multi-agent builder in a single HTML file

## Post Body
I built a visual designer for multi-agent Claude Code systems. You drag agents onto a canvas, connect them, assign models (Opus/Sonnet/Haiku), and it generates a complete orchestration prompt. Zero dependencies, zero build step - one HTML file you can download and open.

28 agents across 6 phases (strategy, research, debate, build, QA, human-in-the-loop). 29 preset configurations from "Solo + Validator" up to a 27-node "Deep Five Minds Ultimate."

Technically interesting bits:

- **Five Minds Protocol** - structured adversarial debate: 4 domain experts + Devil's Advocate argue in rounds, then a Synthesizer produces a "Gold Solution." No direct equivalent in existing MAS frameworks that I could find.
- **HITL Decision Gates** - simulation pauses at 3 checkpoints with a 120s countdown timer. The user decides the next path, not the AI.
- **Live Simulation** - agents exchange animated speech bubbles and data packets along SVG connections. A Mission Control dashboard shows real-time phase progression.
- **Rendering stack** - Canvas 2D for particles, inline SVG for connections, WAAPI for agent state animations, CSS transitions for UI. All in ~4500 lines of vanilla JS.
- **i18n** - full Polish/English UI toggle with ~150 translated strings, stored in localStorage.

Live demo: https://thejacksoncode.github.io/Agent-Architecture/
Source: https://github.com/TheJacksonCode/Agent-Architecture

Happy to discuss the Five Minds Protocol design, single-file architecture trade-offs, or HITL patterns in agent systems.
