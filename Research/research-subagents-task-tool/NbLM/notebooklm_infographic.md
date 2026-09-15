# NotebookLM Ready Infographic - Subagents i Task Tool

## SEKCJA 3: Infografika - Opis

**Rekomendowana orientacja:** pionowo

**Uzasadnienie:** Temat laczy hierarchie delegacji (recursion depth = 1, Task tool -> subagent -> STOP) z narastajacym stosem kosztow (entry tax 20-50k -> 5 parallel = 100-250k -> 93.8% Opus). Pionowy 9:16 naturalnie czyta od gory "co to jest" do dolu "ile to kosztuje", pasuje do mobile-first (90% wyzszy completion rate na Shorts/Reels) i pozwala ulozyc 6 kafelkow Bento w dwoch kolumnach bez scigania sie o miejsce.

**Tresc (300-500 znakow):**

Paleta Anthropic Dark: tlo #141413, powierzchnie kafelkow #1d1d1b z subtle border rgba(217,119,87,0.12), text primary #faf9f5. Akcenty: orange #d97757 (liczby-hero, CTA strzalki delegacji), blue #6a9bcc (mechanizmy async), green #788c5d (wins, redukcje kosztow), red desaturated #c67b5c (pulapki kosztowe, anti-patterns).

Layout Bento 2.0: 6 kafelkow, corner rounding 20px, asymmetric grid 2 kolumny x 3 rzedy plus hero-banner na gorze. Hero (1x full-width): tytul "SUBAGENTS w CLAUDE CODE - Flat by design" + podtytul 11px mono "Task tool = synchronous spawn, max depth 1". Kafelek 1 (orange hero liczba): "1" 120px JetBrains Mono Bold + label "MAX RECURSION DEPTH" 13px + mikro-diagram Parent -> Child -> STOP. Kafelek 2 (red-warm): "20-50k" tokens monospace + "ENTRY TAX per subagent" + stack bar 5x = 100-250k tokens overhead. Kafelek 3 (red hero): "93.8%" w monospace + donut chart + "Community Claude Code na OPUS (= waste)" + mikro GitHub #27665. Kafelek 4 (green hero): "95%" redukcja + "MONITOR v2.1.98 tokens" + before 120k / after 600 tokens bar compare. Kafelek 5 (blue): ikony + lista 4 mechanizmow (Task, run_in_background, Monitor, Agent Teams) z kolorowymi dot markers. Kafelek 6 (neutral): "3-5" sweet spot + "10 hard cap" + horizontal progress ring.

Typografia: Geist Sans dla headingow 32/20/14px, JetBrains Mono Bold 72-120px dla liczb-hero i 11px dla labels/code, Inter 13-15px dla body PL. Zero em-dash, hyphen (-) tylko. Subtle grain texture na tle (2% opacity), soft glow #d97757 przy liczbach-hero. Stopka: "Claude Code v2.1.98 | kwiecien 2026 | Anthropic engineering".

Wymagania spelnione: PL-only, hyphen zamiast em-dash, Bento 2.0 z 6+1 tiles w zakresie 5-8, paleta Anthropic Dark, JetBrains Mono accent dla liczb, orientacja pionowa uzasadniona hierarchia + stos kosztow, top 5 liczb zakotwiczonych w osobnych kafelkach.
