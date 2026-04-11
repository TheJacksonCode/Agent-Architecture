# Show HN - Gotowy post

## Gdzie: https://news.ycombinator.com/submit

## Title (wklej w pole "title")
```
Show HN: Agent Architecture Designer - visual multi-agent builder, single HTML file
```

## URL (wklej w pole "url")
```
https://thejacksoncode.github.io/Agent-Architecture/
```

## Text - zostaw PUSTE (bo dajesz URL)

---

## Pierwszy komentarz (wklej natychmiast po opublikowaniu)

```
I built this to solve a problem I kept running into: designing multi-agent Claude Code teams by hand. Writing orchestration prompts for 10+ agents, keeping track of which model goes where, making sure the workflow actually makes sense - it was tedious and error-prone.

So I made a visual designer. You drag agents onto a canvas, connect them, assign models (Opus/Sonnet/Haiku), and it generates a complete system prompt. 28 agents across 6 phases, 29 preset configurations from a 2-agent setup to a 27-node architecture.

Things I think are technically interesting:

*Five Minds Protocol* - structured adversarial debate: 4 domain experts + Devil's Advocate argue in rounds, then a Synthesizer produces a "Gold Solution." I haven't found an equivalent in existing multi-agent frameworks.

*HITL Decision Gates* - simulation pauses at 3 checkpoints with a 120s countdown. The human decides the next path, not the AI.

*Single HTML file, zero dependencies* - ~4600 lines of vanilla JS. Canvas 2D for particles, inline SVG for connections, Web Animations API for agent states. No npm, no build step, works offline.

*31 iterations* - this is v31. Each version is a separate file. I never overwrite previous versions.

Source: https://github.com/TheJacksonCode/Agent-Architecture

Happy to discuss the Five Minds design, single-file architecture trade-offs, or HITL patterns. What multi-agent workflows do you use?
```

---

## Instrukcja krok po kroku

1. Wejdz na https://news.ycombinator.com
2. Kliknij "login" (prawy gorny rog) -> "create account" jesli nie masz konta
3. Kliknij "submit" w gornym pasku
4. Wklej Title i URL z powyzszego (pole Text zostaw puste)
5. Kliknij Submit
6. NATYCHMIAST dodaj pierwszy komentarz (skopiuj tekst powyzej)
7. Przez 2-3 godziny odpowiadaj na kazdy komentarz

## Kiedy publikowac
- Wtorek-Czwartek, 15:00-18:00 czasu polskiego (9 AM-12 PM EST)
- To jest peak traffic na Hacker News
