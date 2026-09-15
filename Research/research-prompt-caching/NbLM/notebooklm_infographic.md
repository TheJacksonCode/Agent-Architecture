# NotebookLM Ready Infographic - Prompt Caching

## SEKCJA 3: Infografika - Opis

**Rekomendowana orientacja:** poziomo

**Uzasadnienie:** Prompt Caching opiera sie na comparison (write vs read), flow (tools -> system -> messages) i break-even chart (hits vs koszt) - wszystkie te formy zyskuja na szerokosci 16:9. Pionowa ramka zdusilaby 4-kolumnowa tabele cen i 5-stopniowy timeline break-even.

**Tresc do pola "Opisz infografike" (300-500 znakow):**

Infografika pozioma 16:9, Bento 2.0 (6 kafli, corner radius 16px, 24px gap). Tlo #141413, accent #d97757 (Anthropic orange) dla liczb hero, mono #6a9bcc (JetBrains Mono) dla wartosci API i kodu. Typografia: Geist sans dla headline, JetBrains Mono dla metryk. Kafel 1 (hero, 40% szerokosci): wielka liczba 90% z podpisem "savings na cache read". Kafel 2: 2x write cost (1h TTL) i 1.25x (5m TTL) jako dual stat. Kafel 3: break-even chart flow 1-3 hits, strzalki w kolorze #d97757. Kafel 4: progi minimum 4096 / 2048 tokens jako pigulki. Kafel 5: hierarchia tools -> system -> messages, pionowe warstwy z invalidation arrow. Kafel 6 (hero bottom): 98.3% savings jako stack Haiku + Batch + Cache, duza cyfra w #d97757 na ciemnym tle. Zero em-dash, zero gradientow, flat dark-first Anthropic.

---

**Final report (pod 100 slow):**

Orientacja: **poziomo (16:9)**. Uzasadnienie: comparison tables (pricing 4 modele), break-even flow (1-3 hits) i hierarchia warstw (tools/system/messages) naturalnie rozkladaja sie w poziomie; Bento 2.0 6 kafli lepiej oddycha. Top 3 liczby: **90% savings** (cache read vs base input), **4096 / 2048 min tokens** (Opus+Haiku / Sonnet, ponizej fails silently), **98.3% oszczednosci** (Haiku 4.5 + Batch 50% + Cache stack, hero bottom tile). Paleta #141413 + #d97757 + #6a9bcc, Geist + JetBrains Mono.
