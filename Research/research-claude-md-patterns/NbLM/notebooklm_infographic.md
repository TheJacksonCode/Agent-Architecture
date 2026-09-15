# NotebookLM Ready Infographic - CLAUDE.md Patterns

## SEKCJA 3: Infografika - Opis

**Rekomendowana orientacja:** pionowo (9:16)

**Uzasadnienie:** Temat ma naturalna struktura hierarchiczna (4-tier scope + decision tree od "chce zeby Claude pamietal X" do konkretnej warstwy). Pionowy flow od Managed na gorze do Local na dole + decision branches w dol czyta sie jak top-down architecture, ktora jest kanonicznym modelem mentalnym z 00_FUNDAMENTALS. Bento 2.0 5-8 tiles w kolumnie dziala tu lepiej niz macierz pozioma.

**Tresc (300-500 znakow):**

Paleta Anthropic Dark: tlo #141413, akcent orange #d97757 (Managed + enforcement hooks), niebieski #6a9bcc (User/Project), typografia JetBrains Mono dla sciezek i liczb, Inter dla opisow. Bento 2.0, 7 tiles, corner radius 16px, 24px gutter.

Layout pionowy 9:16:

Tile 1 (hero, top): liczba "~70%" wielka, podpis "compliance CLAUDE.md vs ~100% hooks - dlatego hooks > CLAUDE.md dla hard enforcement".

Tile 2: scope hierarchy 3-poziomowa piramida - Managed (#d97757, "cannot exclude") > User ~/.claude/CLAUDE.md > Project ./CLAUDE.md > Local CLAUDE.local.md (NIE deprecated).

Tile 3: @import depth = 5 hopow max, relatywnie do pliku (nie cwd), brakujace silently skipped.

Tile 4: rozmiar - 60-100 linii sweet spot, hard ceiling 200, 600+ linii = "Claude stopped reading".

Tile 5: dos vs donts chip row - DO: mid-level facts, non-guessable commands, pnpm not npm | DONT: sekrety (Issue #2142), linter rules, ephemera, /init boilerplate (-20% success).

Tile 6: imperative mood "Use ripgrep not grep" + pozytywne nad negatywnym (ETH Zurich 160x tool effect).

Tile 7 (footer): "1 token CLAUDE.md = 1 token kazdy turn" + recency/primacy bias diagram.

Zero em-dash, tylko hyphen. Starfield subtle bg, edge glow na tile 1.

---

## Final report

**Orientacja:** pionowo (9:16). Scope hierarchy 4-tier + decision tree top-down to naturalny vertical flow, Bento 2.0 7 tiles w kolumnie.

**Top 3 fakty:**
1. ~70% compliance CLAUDE.md vs ~100% hooks (Wiegold, corpus consensus) - hooks > CLAUDE.md dla enforcement.
2. Sweet spot 60-100 linii (HumanLayer), hard ceiling 200 (Anthropic), 600+ linii = zignorowane.
3. @import max 5 hopow, relatywny do pliku; plugin CLAUDE.md NIE istnieje (R1+R2+R5+R6 zgodnosc).
