# NotebookLM Ready Video - CLAUDE.md Patterns

## SEKCJA 1: Video - Opis niestandardowego stylu wizualnego

Dark Anthropic. Tlo #141413, tekst off-white #faf9f5, jeden ciepły pomaranczowy akcent #d97757 (tylko reveal i CTA), chlodny niebieski #6a9bcc na liczbach i diff markerach. Typografia: Poppins 600 nagłówki, JetBrains Mono liczby i kod, monospace caption burn-in. Bento 2.0 overlay z zaokragleniami 16-20px. Ciecia co 2-3 sekundy, Fireship-style density, split screen problem/solution, zero em-dash, deadpan humor. Output dual: master 16:9 (2-3 min) i auto-crop 9:16 (60-75s) z wypalonymi napisami.

## SEKCJA 2: Video - Na czym powinni sie skupiac prezenterzy AI

Cold open warstwowy w 3 sekundy. Obraz: monolityczny 600-liniowy CLAUDE.md scrolluje sie, czerwony highlight zjezdza przez szum, 3 linie blyskaja pomaranczowo. Audio: sub-bass drop. Tekst na ekranie: "93% twojego CLAUDE.md to szum. Pokazujemy co zostawic." Potem backtrack.

Pieć faktow nosnych do reveal-u po kolei, kazdy 10-15 sekund:

1. CLAUDE.md to NIE config, to instruction stack doklejany jako user message po system prompt. Nie ma overridow, jest concat plus tail bias plus specificity. Konflikty rozstrzyga Claude probabilistycznie.
2. Cztery tiery: Managed, User, Project, Local. Plus `.claude/rules/`, `@import` (max 5 hopow, eager), ancestor walk, lazy subfolder overlay. Plugin CLAUDE.md NIE istnieje.
3. Rozmiar: sweet spot 60-100 linii, hard ceiling 200, powyzej 500 Claude przestaje czytac. 1 token CLAUDE.md to 1 token na KAZDYM turnie, 2000 linii zjada 25% okna 100k zanim zadasz pytanie.
4. Compliance: CLAUDE.md okolo 70 procent, hooks 100 procent. Issue #2142 to landmark - 3 live API keys committed MIMO 150-liniowej sekcji security. Three-strikes rule: trzy razy zignorowane, przenies do hooka.
5. Lean principle + zero-drift: reactive curation, pozytywne frazowanie z alternatywa (nie "NIE rob X", tylko "uzyj Y"), file:line refs zamiast pasted kodu, max 2-3 emphasis markery na plik.

Ton prezentera: spokojny autorytet plus sucha ironia. Nie krzyczec CRITICAL. Kazde 15-20 sekund retention checkpoint: nowy wizual lub reset muzyki. Payoff w ostatnich 5 sekundach: "Mniej znaczy wiecej. Reszta jest szumem. Link w opisie."

---

Final report pod 150 slow:

Hook: "93% twojego CLAUDE.md to szum. Pokazujemy co zostawic" + warstwowy 3-sekundowy cold open (scroll monolitu, sub-bass, text burn-in). Visual motif: Dark Anthropic #141413 + pomaranczowy #d97757 akcent + niebieski #6a9bcc liczby, Bento 2.0 kafelki 16-20px, JetBrains Mono na kazdej liczbie, Fireship tempo ciec 2-3s. Sekcje napisane: opis stylu (296 znakow) i focus prezenterow (ok 1350 znakow, 5 reveal-faktow). Wstrzykniete liczby z corpusa: 70% compliance, 60-100/200/500 prog linii, 1 token = 1 token/turn, Issue #2142, 25% okna 100k. Dual output 16:9 master + 9:16 auto-crop z captions. Zero em-dash. Plik zapisany w C:\Projekty Claude Code\Agent_Architecture\Research\research-claude-md-patterns\NbLM\notebooklm_video.md.
