# NotebookLM Ready Infographic - Hooks Best Practices

## SEKCJA 3: Infografika - Opis

**Rekomendowana orientacja:** pionowo

**Uzasadnienie:** Lifecycle 28 eventow to naturalna os czasu biegnaca pionowo (SessionStart -> UserPromptSubmit -> PreToolUse -> PostToolUse -> Stop -> PreCompact -> SessionEnd), a sam artefakt ma byc czytany na mobile i wklejany do Slack/Notion jako cheatsheet. Format 9:16 daje miejsce na 5-7 bento tiles stackujacych sie z gory na dol: hero number, lifecycle timeline, 4 typy handlerow, exit codes matrix, precedensja warstw, security callout.

**Tresc do pola "Opisz infografike" (300-500 znakow):**

Pionowy cheatsheet "Claude Code Hooks 2026" w Bento 2.0 layout, dark Anthropic. Tlo #141413, accent #d97757 (orange) dla liczb-hero i CTA, accent #6a9bcc (blue) dla technicznych tagow, zielen #788c5d dla PASS, czerwien dla BLOCK. Corner radius 16-20px, 6 kafelkow. Hero na gorze: "28 EVENTOW" ogromna liczba w JetBrains Mono, ponizej Geist headline "Hooks Lifecycle 2026". Kafelek 2: pionowy timeline 8 kluczowych eventow (SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, Stop, PreCompact, SubagentStop, SessionEnd) z ikona klodki przy tych co blokuja exit 2. Kafelek 3: exit codes matrix - "0 = OK (zielony)", "1 = NIE BLOKUJE (zolty)", "2 = BLOCK (czerwony accent)" - monospace. Kafelek 4: cztery typy handlerow z timeoutami (command 600s, http 30s, prompt 30s, agent 60s) jako 2x2 grid. Kafelek 5: drabina precedensji 5 warstw (Managed -> CLI -> Local -> Project -> User). Kafelek 6: security callout - "hooki moga tylko zaostrzyc, nigdy nie osłabic permissions.deny". Typografia: Geist Bold dla headline, JetBrains Mono dla liczb, exit codes i nazw eventow. Zero em-dash, polski.

---

## Final report

**Orientacja:** pionowa (9:16), bo lifecycle 28 eventow czyta sie jako os czasu, a artefakt jest mobile-first cheatsheet.

**Top 3 liczby/fakty:**
1. **28 eventow** cyklu zycia (SessionStart, PreToolUse, Stop, PreCompact i 24 inne) - hero number w JetBrains Mono.
2. **Exit codes 0 / 1 / 2** - #1 foot-gun ekosystemu: `exit 1` NIE blokuje (non-blocking error), tylko `exit 2` zatrzymuje wywolanie narzedzia.
3. **4 typy handlerow x rozne timeouty**: command 600s, http 30s, prompt 30s, agent 60s - plus zasada "hooki moga zaostrzyc, nigdy osłabic permissions.deny".

Paleta Anthropic dark (#141413 + #d97757 + #6a9bcc + #788c5d), Bento 2.0 z corner radius 16-20px, 6 tiles, Geist headline + JetBrains Mono dla accentow numerycznych.
