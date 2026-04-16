# SYNTEZA RESEARCHU: Preset Routing Optimization

**Data:** 2026-04-16 | **Raporty:** R1-R6 + R7 Critic Framework

---

## Konsensus miedzy raportami (potwierdzone w 4+ raportach)

### 1. CLAUDE.md musi byc krotki
**R1 + R3 + R4 + R5 zgodnie:** < 200 linii, < 5,000 tokenow. Boris Cherny (tworca Claude Code) uzywa ~100 linii. Pliki >500 slow = negatywna korelacja z jakoscia.
- **Nasz CLAUDE.md projektowy:** ~39KB (~10K tokenow) - 2x za duzo
- **Akcja:** wydzielic historie wersji do osobnego pliku

### 2. Commands to poprawny mechanizm dla 42 presetow
**R1 + R4 + R5 zgodnie:** commands sa lazy-loaded (zero kosztu do uzycia). Skills laduja metadata przy starcie (~100 tok per skill). Dla 42 presetow commands sa tansze (0 vs 4,200 tok startup).
- **Nasz wybor:** commands - POTWIERDZONY jako optymalny

### 3. Model routing Opus/Sonnet/Haiku jest validated
**R1 + R4 + R5 + R6 zgodnie:** oficjalny code-review.md Anthropic (Boris Cherny) uzywa identycznego wzorca. Andrew Ng, Harrison Chase, Anthropic docs - wszyscy rekomenduja 3-tier routing.
- **Nasze presety:** juz maja per-agent model assignment - POTWIERDZONY

### 4. Subagent isolation = MAX nie SUM
**R1 + R4 zgodnie:** subagenci NIE dziela kontekstu. calcPresetMaxCtx uzywa MAX - POPRAWNE per oficjalna dokumentacja.

### 5. Context engineering > prompt engineering
**R5 + R6 zgodnie:** trend 2026 - nie chodzi o JAK pytasz ale JAKIE informacje otaczaja pytanie. Nasz CTX_BASELINE_TOTAL = 22,400 tok jest zgodny z J.D. Hodges measurement.

### 6. Human-in-the-Loop jest obowiazkowy
**R6 zgodnie z R2:** LangGraph, CrewAI, Anthropic - wszyscy maja HITL checkpoints. Nasze 3 bramy HITL = state-of-the-art.

### 7. Nasz system 42 presetow jest UNIKATOWY
**R3 + R6 zgodnie:** najblizszy konkurent to Fabric (~100 single-agent patterns) ale ZERO multi-agent team templates z model routing i kosztorysem. wshobson/agents ma 7 preset teams (nie 42).

---

## Rozstrzygniecie konfliktow (z R7 Critic Framework)

### Konflikt 1: Flat vs hierarchiczny routing
R1 sugeruje tag-based matching (~200 tok w CLAUDE.md). R2 proponuje confidence-based 3-tier.
**Rozstrzygniecie:** HYBRID - przewodnik decyzyjny (flat keywords) w katalogu + confidence-based response (HIGH/MEDIUM/LOW). Obecna architektura (CLAUDE.md routing -> PRESET_CATALOG.md) jest poprawna.

### Konflikt 2: Verbose vs compressed opisy
R1 chce minimalizowac tokeny. R2/R6 pokazuja ze bogatsze opisy daja lepszy routing.
**Rozstrzygniecie:** obecne ~3,500 tok katalogu to SWEET SPOT. Przyklady uzycia + antyprzyklady poprawiaja trafnosc (R2 potwierdza). Dalsze rozbudowanie do ~5,000 tok jest uzasadnione jesli dodaje decision-making value.

### Konflikt 3: Jeden katalog vs lazy loading dwuetapowy
R1 rozważa dwuetapowy lookup (kategoria -> presety). R3 preferuje jeden plik.
**Rozstrzygniecie:** jeden plik PRESET_CATALOG.md. Przy 42 presetach i ~3,500 tok dwuetapowy lookup dodaje latency (2 czytania) bez istotnej oszczednosci. Przy 80+ presetach warto reconsider.

### Konflikt 4: Auto vs confirmation step
R2 proponuje confidence-based auto. R6 mowi ze eksperci preferuja confirmation.
**Rozstrzygniecie:** ZAWSZE confirmation step. Uzytkownik (Maciej) explicite chce kontroli. Claude Code proponuje, uzytkownik potwierdza. Nigdy auto-launch presetu.

---

## Rekomendacje - priorytetyzowane

### TIER 1: Zrobic TERAZ (natychmiastowy efekt, niski koszt)

**A. Odchudzenie projektowego CLAUDE.md**
- Przenosimy historie wersji (v1-v32.16) do VERSIONS.md
- Zostawiamy: workflow standard, aktualna wersja, file locations, versioning rule
- Cel: < 200 linii, < 5K tokenow
- Oszczednosc: ~5,000 tok per turn, ~50,000+ tok per sesja
- Zrodlo: R1, R3, R4, R5 (konsensus)

**B. Wzbogacenie PRESET_CATALOG.md (juz zrobione)**
- Przyklady uzycia + antyprzyklady + porownania "vs" - DONE
- Przewodnik decyzyjny na gorze - DONE
- Koszt: ~3,500 tok on-demand (0.35% okna)

**C. Routing w CLAUDE.md (juz zrobione)**
- 7 linii routingu w globalnym CLAUDE.md - DONE
- Koszt: ~100 tok always-loaded

### TIER 2: Zrobic W NASTEPNEJ ITERACJI (sredni efekt)

**D. Macierz kosztow w katalogu**
- Dodac kolumne KOSZT (tani/sredni/drogi) per preset
- Ulatwia decyzje budzetowe
- Koszt: +~500 tok do katalogu

**E. Drzewo eskalacji**
- "Jesli /solo nie wystarczyl -> /trio -> /standard -> /deep"
- Mapuje sciezke od prostego do zlozonego
- Koszt: +~300 tok do katalogu

**F. Fallback: custom pipeline info**
- Dodac sekcje w katalogu: "Jesli zaden preset nie pasuje, moge zlozyc custom z 35 agentow"
- Koszt: +~100 tok

### TIER 3: Rozwazyc DLUGOTERMINOWO

**G. Hooks enforcement**
- Krytyczne reguly (nie nadpisuj wersji, nie uzywaj em-dash) via hooks w settings.json
- hooks = 100% compliance vs CLAUDE.md = ~70%
- Zrodlo: R5

**H. .claude/rules/ (glob-scoped)**
- rules/html-versioning.md (applyTo: "*.html") - "never overwrite, always new file"
- Wzorzec z Cursor .mdc
- Zrodlo: R3

**I. Worktree isolation w presetach**
- Deklarowac `isolation: worktree` per agent w ciezkich presetach
- Zrodlo: R5

---

## Metryki do sledzenia

| Metryka | Obecna wartosc | Cel |
|---------|---------------|-----|
| Projektowy CLAUDE.md rozmiar | ~10K tok | < 5K tok |
| PRESET_CATALOG.md rozmiar | ~3,500 tok | < 5K tok (z rozbudowa) |
| Globalny CLAUDE.md rozmiar | ~100 tok (routing) | < 200 tok |
| Trafnosc doboru presetu | Niezmierzona | >= 85% na 30+ zadaniach |
| Calkowity koszt routingu | ~4,500 tok | < 5,000 tok |
| % okna kontekstowego (routing) | 0.45% | < 0.5% |

---

## Walidacja Critic (R7)

### Spelnienie kryteriow sukcesu
1. **>=4 z 6 raportow PASS** - TAK: R1, R3, R4, R5, R6 maja weryfikowalne zrodla, konkretne artefakty, zastosowalnosc
2. **Konflikty rozstrzygniete** - TAK: 4 konflikty rozstrzygniete powyzej
3. **Artefakty referencyjne** - TAK: format katalogu (zrobiony), mechanizm routingu (zrobiony), baseline metryki
4. **Koszt zmierzony** - TAK: obecne 4,500 tok, proponowane < 5,000 tok
5. **Skalowalosc** - TAK: jeden plik katalogu dziala do ~80 presetow
6. **Zero halucynacji** - TAK: zrodla weryfikowalne (GitHub repos, Anthropic docs, community posts)

### Red flags wykryte
- R2 wspomina o "embedding lookup" - NIE mozliwe w Claude Code CLI (brak vectorstore). Ignorujemy.
- Niektore raporty cytuja "Lost in the Middle" Stanford paper - walidne ale dotyczy glownie middle of long contexts, nie naszego use case (katalog jest krotki).

---

## Podsumowanie jednym zdaniem

Nasz system (CLAUDE.md routing -> PRESET_CATALOG.md -> commands) jest architektonicznie POPRAWNY i UNIKATOWY w ekosystemie. Najwazniejsza akcja: odchudzenie projektowego CLAUDE.md z ~10K do <5K tokenow. Reszta to inkrementalne ulepszenia katalogu.
