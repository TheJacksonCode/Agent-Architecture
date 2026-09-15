# NotebookLM Ready Video - Settings i Permissions

## SEKCJA 1: Video - Opis niestandardowego stylu wizualnego

Dark Anthropic security-lab: tlo #141413, tekst off-white #faf9f5, alert orange #d97757 na deny rules i CVE stampy, mono blue #6a9bcc na liczby-hero. JetBrains Mono dla settings.json, Poppins dla headline. Bento 2.0, corner radius 16-20px, split-screen settings.json vs terminal /status. Cold open 3s: terminal pulse + klakson "TRUST DIALOG = UX, NOT SECURITY" czerwonym overlay. B-roll co 2-3s, deadpan Fireship ton, kinetic mono na 5 scope levels. Zero Ghibli.

## SEKCJA 2: Video - Na czym powinni sie skupiac prezenterzy AI

Dwa prezenterzy w ton casual-technical z deadpan humorem, zero hype, zero korporacji. Cold open 3s: "settings.json to wykonywalny kod, nie konfiguracja - parsowany PRZED trust dialog" (F1, CVE-2025-59536 CVSS 8.8). Potem backtrack.

Piec rzeczy musza wybic, monospace na ekranie przy kazdej:

1. **5 scope levels precedence**: Managed > CLI flag > Local (settings.local.json gitignored) > Project (settings.json committed) > User (~/.claude/settings.json). "User i Project sluza wygodzie, Managed sluzy enforcement".

2. **Allow / Deny / Ask tier**: evaluation order deny > ask > allow, first match wins. Deny ma absolutny priorytet, zadna warstwa nie moze tego overridowac.

3. **Bash matcher patterns i ich pulapki**: `Bash(ls *)` wymaga word boundary, `Bash(ls*)` matchuje `lsof` (trap), compound commands przez && evaluatuja tylko pierwszy token (issue #36637).

4. **YOLO mode risk**: `--dangerously-skip-permissions` plus `enableAllProjectMcpServers: true` to byl wektor CVE-2025-59536. Managed `disableBypassPermissionsMode: "disable"` to jedyna twarda brama.

5. **settings.json vs settings.local.json**: pierwszy committed do git (team baseline), drugi gitignored (personal, "Yes don't ask again" historia). Convention, nie enforcement - malicious PR moze usunac wpis z .gitignore.

Retention checkpoint co 15-20s. Payoff: `/status` jako jedyne niezawodne zrodlo prawdy o aktywnej warstwie managed. Dual output: master 16:9 2-3 min, auto-crop 9:16 60-75s z burned-in captions. Zero em-dash.
