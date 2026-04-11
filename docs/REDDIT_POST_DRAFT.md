# Reddit r/ClaudeAI - Gotowy post

## Gdzie: https://www.reddit.com/r/ClaudeAI/submit

## Flair: "Built with Claude"

## Title (wklej w pole tytulu)
```
I built a visual multi-agent team designer - drag & drop 28 agents, run live simulation, generate prompts. Single HTML file, zero dependencies.
```

## Body (wklej w tresc posta - Reddit obsluguje Markdown)

```markdown
I kept running into the same problem: designing multi-agent Claude Code teams by hand. Writing orchestration prompts for 10+ agents, figuring out which model goes where, making sure the workflow makes sense - it was slow and error-prone.

So I built a visual designer for it.

## What it does

You drag agents onto a canvas, connect them into workflows, assign models (Opus/Sonnet/Haiku), run a live simulation, and export a ready-to-use system prompt. One HTML file, zero dependencies, works offline.

**Live demo:** https://thejacksoncode.github.io/Agent-Architecture/

**Source:** https://github.com/TheJacksonCode/Agent-Architecture

## Quick demo

To get the full experience: open the demo -> pick "Deep Five Minds Ultimate" from the preset sidebar -> click "Simulation" -> watch 27 agents talk to each other.

## What's inside

- **28 agents** across 6 phases (strategy, research, debate, build, QA, HITL)
- **29 presets** from a 2-agent Solo setup to a 27-agent full orchestra
- **Five Minds Protocol** - structured debate: 4 domain experts + Devil's Advocate argue in rounds, then a Synthesizer on Opus produces a "Gold Solution"
- **HITL Decision Gates** - simulation pauses at 3 human checkpoints with a 120s countdown timer
- **Live Simulation** - agents exchange speech bubbles and data packets along SVG connections
- **Mission Control** - fullscreen dashboard with real-time metrics and communications log
- **Agent Encyclopedia** - research-backed prompts, anti-patterns, and analogies for every agent
- **Dark/Light theme** + full PL/EN bilingual UI

## How Claude helped build it

This entire project was built with Claude Code. Every version (there are 31 of them) was pair-programmed with Claude. The agent prompts follow a structured format: ROLE / INPUT / OUTPUT / RESPONSIBILITIES / RULES / WHAT YOU DO NOT DO / REPORT FORMAT.

Example prompt structure (Research Tech agent):

    ROLE: You are Research Tech - a technical researcher specializing in 
    finding current solutions, libraries, APIs, and implementation patterns.
    
    INPUT: Research brief from Planner with specific technical questions.
    
    OUTPUT: Structured report with findings, each labeled 
    [CERTAIN], [PROBABLE], or [SPECULATION].
    
    WHAT YOU DO NOT DO: You do not recommend solutions. You do not 
    coordinate with other researchers (to prevent groupthink).

## Tech stack

~4600 lines of vanilla JS in a single HTML file. Canvas 2D for particles, inline SVG for connections, Web Animations API for agent animations, CSS variables for theming. No npm, no build step, no CDN.

31 versions, each saved as a separate file. I never overwrite previous versions.

I'd love to hear what multi-agent workflows you're using with Claude Code, and what agents/presets would be useful to add. Happy to answer any questions about the architecture.
```

---

## Instrukcja krok po kroku

1. Wejdz na https://www.reddit.com/r/ClaudeAI/submit
2. Wybierz **Text** (nie Link)
3. Ustaw flair: **"Built with Claude"** (lub najblizszy odpowiednik)
4. Wklej Title
5. Wklej Body (Reddit obsluguje Markdown - formatowanie bedzie dzialac)
6. Kliknij Post
7. Przez 2-3 godziny odpowiadaj na kazdy komentarz

## Kiedy publikowac
- Wtorek-Czwartek, 15:00-18:00 czasu polskiego (9 AM-12 PM EST)
- To jest peak traffic na r/ClaudeAI

## Wskazowki
- Badz szczery ze to twoj projekt
- Odpowiadaj na krytke z otwartoscia
- Jesli ktos pyta o feature - zapisz, to material na v32
- NIE postuj tego samego na inne subreddity tego samego dnia
