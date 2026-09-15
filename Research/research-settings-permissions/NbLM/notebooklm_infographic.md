# NotebookLM Ready Infographic - Settings i Permissions

## SEKCJA 3: Infografika - Opis

**Rekomendowana orientacja:** pionowo

**Uzasadnienie:** Centralna narracja tego materialu to drabina precedence (Managed -> CLI -> Local -> Project -> User) oraz pionowy flow startup sequence (parse settings -> apply env -> fire hooks -> trust dialog). Orientacja pionowa (9:16) naturalnie oddaje te dwie hierarchie i dopasowuje sie do trendu 2026 (dual 16:9 / 9:16, social reels) z TRENDS_BRIEF.

**Tresc (300-500 znakow):**

Format Bento 2.0 z 7 kafelkami na tle #141413 (Dark Anthropic), accenty #d97757 (coral) dla deny/alert i #6a9bcc (blue) dla managed/enforcement. Typografia: JetBrains Mono dla liczb i kodu, Inter dla etykiet.

Layout pionowy (9:16, 1080x1920):

- **Tile 1 (hero, top, full-width):** wielki tytul "Settings i Permissions" + hook "settings.json to wykonywalny kod, NIE konfiguracja". Font: JetBrains Mono 72px, coral underline.

- **Tile 2 (drabina precedence, full-width, 5 poziomow):** pionowy stack od gory: Managed (blue, locked icon), CLI flags, Local (settings.local.json), Project (.claude/settings.json), User (~/.claude/settings.json). Strzalka w dol: "wyzsza warstwa wygrywa".

- **Tile 3 (half-left):** "3 tier permissions" - deny (coral) > ask (amber) > allow (green). Podpis: "first match wins".

- **Tile 4 (half-right):** "Bash matcher traps" - 3 code snippety w JetBrains Mono: `Bash(ls *)` OK, `Bash(ls*)` TRAP (matches lsof), `Bash(git:* push)` FAIL.

- **Tile 5 (half-left, coral frame):** YOLO mode risk - `--dangerously-skip-permissions` + CVE-2025-59536 CVSS 8.8, ikona alertu.

- **Tile 6 (half-right, blue frame):** 25+ hook events, 4 transport types (command / http / prompt / agent), exit 2 blocks.

- **Tile 7 (footer, full-width):** 3 liczby Fireship style - "5 warstw precedence | 120+ env vars | 42 pola settings". Plus bug #17017 OPEN (coral badge).

Top 5 liczb/faktow wyeksponowanych wizualnie: 5 scope levels precedence, 3 tier permissions (deny/ask/allow first-match-wins), 25+ hook event types, 120+ env vars, bug #17017 OPEN (duplikuj deny rules).

---

## Final report

**Orientacja:** pionowo (9:16, 1080x1920).

**Uzasadnienie:** 5-warstwowa drabina precedence oraz pionowy flow startup sequence naturalnie pasuja do formatu pionowego; zgodne z trendem 2026 dual 16:9/9:16 (social reels).

**Top 3 liczby/fakty:**
1. **5 warstw precedence**: Managed > CLI > Local > Project > User (managed = jedyny enforceable).
2. **3 tier permissions + first-match-wins**: deny > ask > allow, deny nigdy nie override'owane.
3. **25+ hook event types, 4 transport types**, exit 2 blokuje nawet allow rules.

Paleta: Dark Anthropic #141413 + coral #d97757 (deny/alert) + blue #6a9bcc (managed). Typografia: JetBrains Mono (Fireship vibe). Bento 2.0, 7 tiles.
