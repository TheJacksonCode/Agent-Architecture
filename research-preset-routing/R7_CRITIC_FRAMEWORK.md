# CRITIC: Framework walidacji researchu preset-routing

## Kryteria oceny (per raport)

Kazdy raport R1-R6 bedzie oceniany w 6 wymiarach na skali PASS / REVISE / FAIL:

| # | Kryterium | Opis | PASS jesli... |
|---|-----------|------|---------------|
| K1 | **Zrodla i dowody** | Czy raport cytuje konkretne zrodla? | >=2 weryfikowalne zrodla, zero halucynacji |
| K2 | **Konkretnosc** | Czy dostarcza drop-in artefakty? | >=1 gotowy do uzycia artefakt |
| K3 | **Zastosowalnosc** | Czy dziala w naszym stacku (Claude Code CLI, ~/.claude/commands, 1M ctx Opus)? | Testowalne bez modyfikacji platformy |
| K4 | **Koszt tokenowy** | Czy podaje ile tokenow zuzywaja proponowane rozwiazania? | Szacunki tokenow dla happy path i worst case |
| K5 | **Kompletnosc** | Czy pokrywa scope tematu bez luk? | Brak oczywistych bialych plam |
| K6 | **Sprzecznosc wewnetrzna** | Czy nie przeczy sam sobie? | Zero sprzecznosci miedzy sekcjami |

Warunek PASS calosciowy: >=5/6 PASS i zero FAIL.

## Potencjalne konflikty miedzy raportami

| Konflikt | R vs R | Rozstrzygniecie |
|----------|--------|-----------------|
| Flat vs hierarchiczny routing | R1 vs R2 | Benchmark decyduje |
| Verbose vs compressed opisy | R3 vs R4 | Punkt przegieciowy vs trafnosc |
| Jeden duzy katalog vs lazy loading | R1 vs R3 | Koszt tokenowy vs latency |
| Antyprzyklady: pomagaja vs szum | R4 vs R3 | Ablation study |
| Human-in-the-loop vs full-auto | R2 vs R6 | User preference (auto z override) |
| Embedding vs prompt-based matching | R2 vs R6 | Ograniczenia CLI sa hard constraint |

## Red flags

**Halucynacje:** nieistniejace flagi CLI, wymyslone limity tokenow, fabulowane benchmarki
**Nieaktualne:** dane sprzed Opus 4.6 / 1M context, stare limity 200K
**Bias:** over-engineering (vectorstore gdy prompt matching wystarczy), sunk cost (obecna struktura bez kwestionowania)

## Kryteria sukcesu

1. >=4 z 6 raportow PASS (bez FAIL)
2. Konflikty rozstrzygniete danymi
3. Artefakty: format opisu presetu + mechanizm routingu + metryki baseline
4. Koszt zmierzony: obecny vs proponowany vs delta
5. Skalowalosc: dziala dla 42 I dla 60+ presetow
6. Zero halucynacji API

**North Star:** >=85% trafnosc doboru na >=30 zadaniach testowych przy <=5000 tokenow input na request.
