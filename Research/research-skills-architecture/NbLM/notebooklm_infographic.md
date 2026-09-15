# NotebookLM Ready Infographic - Skills Architecture

## SEKCJA 3: Infografika - Opis

**Rekomendowana orientacja:** pionowo (9:16)

**Uzasadnienie:** Glowny load-bearing element to decision tree 4-tier hierarchy (MCP -> Skills -> Subagents -> Hooks) oraz kaskada progressive disclosure (Metadata -> Instructions -> Resources), ktore czytajacemu lepiej sie skanuje z gory na dol. Format pionowy 9:16 pasuje tez do mobile/Shorts distribution i trendu Dual 16:9 / 9:16 gdzie pionowy wariant jest priorytetowy dla NotebookLM Studio.

**Tresc (300-500 znakow):**

Paleta Anthropic Dark: tlo #141413, akcent ciepla terakota #d97757 (tytuly + strzalki decyzji), akcent chlodny blekit #6a9bcc (liczby + metryki), tekst #e8e6e3, muted #a3a29e. Bento 2.0 grid 5 tiles, corner radius 16px, gap 20px, subtelny inner border 1px #2a2a28.

Tile 1 (header, full-width gory): tytul "Skills Architecture 2026" + podtytul "Claude Code progressive disclosure + 4-tier hierarchy". Font: Inter Tight Bold 42px + 18px.

Tile 2 (lewa kolumna, 60%): decision tree pionowy "Ktory tier wybrac?". 4 wezly polaczone strzalkami w dol w kolorze #d97757, kazdy wezel ma ikone + etykiete + przyklad. MCP (dane zewnetrzne), Skills (reusable prompty), Subagents (izolacja), Hooks (triggery lifecycle). Pod drzewem: zasada "start najprostszym tierem - eskaluj tylko gdy konieczne".

Tile 3 (prawa kolumna gorna, 40%): Progressive Disclosure 3-level schodki. Level 1 Metadata 37-100 tok, Level 2 Instructions do 5k tok, Level 3 Resources unlimited. Liczby w JetBrains Mono Bold 56px #6a9bcc.

Tile 4 (prawa srodkowa): TOP FAKTY jako stat cards.
- 40 skilli = 1500 tokenow overhead
- Chain max 3-5 skilli (post-compaction cap)
- 25000 tokenow combined budget po compaction
- 1536 chars cap listing per skill
- 1% context window budget (fallback 8000)

Tile 5 (prawa dolna, czerwony flag): Bug #17283 - "context:fork IGNOROWANY gdy skill invokowany przez Skill tool, blokuje Fan-Out/Merge. Workaround: slash invocation (Path B) lub skills: preload w subagent."

Tile 6 (footer, full-width dol): Zasada zlota w ramce terakota: "Commitment-before-generation = najwiekszy pojedynczy skok jakosci. Wymus explicit wybor PRZED generowaniem, ban list filtruje statistical mean ex ante."

Typografia: Inter Tight (naglowki), Inter (body), JetBrains Mono (liczby + kod + identyfikatory). Hierarchia rozmiarow: H1 42, H2 24, Body 16, Caption 13, Metric 56. Line-height 1.4 body, 1.15 naglowki.

Ikony: outline 1.5px stroke, kolor #d97757 dla primary, #6a9bcc dla metric context. Zadnych emoji (psuja retrieval + brand consistency).

Mikrodetale: numerki kazdego tile w rogu (01..06) Mono #a3a29e 11px, delikatna linia separatora pod header #2a2a28, signature footer "R1-R7 + SYNTHESIS, Agent Architecture v32.16" 11px muted.

---

## Final report

**Orientacja:** pionowo 9:16.
**Uzasadnienie:** 4-tier decision tree + progressive disclosure kaskada czytaja sie top-down, pionowy format priorytetowy dla NotebookLM Studio + mobile distribution.

**Top 3 liczby/fakty:**
1. Bug #17283 - context:fork ignorowany przez Skill tool, blokuje Fan-Out/Merge (workaround: slash Path B lub preload).
2. 4-tier hierarchia MCP / Skills / Subagents / Hooks z zasada "start simplest, escalate only when necessary".
3. Chain max 3-5 skilli (post-compaction 25k combined, 5k per skill cap) + commitment-before-generation jako najwiekszy skok jakosci.
