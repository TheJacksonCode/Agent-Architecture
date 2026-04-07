# HITL Pipeline — Dokumentacja nowej funkcji

## Status: GOTOWY DO TESTOW
## Baza: V25 (AGENT_TEAMS_CONFIGURATOR_v25.html)
## Pliki: `.claude/skills/hitl-pipeline/`

---

## Co to jest

HITL Pipeline to **skill Claude Code** (`/hitl-pipeline`) ktory orkiestruje wielofazowy
workflow z prawdziwymi subagentami i **3 bramami decyzyjnymi** gdzie czlowiek
wybiera kierunek projektu.

## Jak uzyc

W terminalu Claude Code wpisz:
```
/hitl-pipeline Zaprojektuj system rezerwacji hoteli
```

Pipeline automatycznie:
1. Tworzy `MANIFEST.md` (stan pipeline) i folder `gates/`
2. Przechodzi przez 6 faz z 3 bramami HITL
3. Na kazdej bramie tworzy plik Markdown z analiza i pyta usera o decyzje
4. Loguje wszystkie decyzje

## Architektura

```
STRATEGIA → [BRAMA 1] → RESEARCH → DEBATA → [BRAMA 2] → BUILD → [BRAMA 3] → QA → PODSUMOWANIE
```

### Fazy
| Faza | Co robi | Agenci |
|------|---------|--------|
| 1. Strategia | Analiza tematu, dekompozycja, scope | Orkiestrator (inline) |
| 2. Research | Badanie aspektow rownolegle | 2-6 subagentow (haiku) |
| 3. Debata | Five Minds Protocol na wynikach | 1 subagent (sonnet) czyta five-minds/SKILL.md |
| 4. Build | Implementacja Gold Solution | 1-3 subagentow (sonnet) |
| 5. QA | Code review, security, performance | 1-3 subagentow (sonnet/haiku) |
| 6. Podsumowanie | Finalne wnioski | Orkiestrator (inline) |

### Bramy decyzyjne (HITL)
| Brama | Miedzy | Opcje |
|-------|--------|-------|
| 1 | Strategia → Research | Szeroki / Skupiony / Research+Prototyp |
| 2 | Debata → Build | Pelna impl. / MVP / Iteracyjny |
| 3 | Build → QA | Pelne QA / Core QA / QA+Debate |

### Dwupoziomowa interakcja
- **Szybka sciezka:** User widzi krotkie podsumowanie w chacie, odpowiada "A/B/C"
- **Deep dive:** User otwiera plik `gates/BRAMA_N.md` z pelna analiza, tabelami, Mermaid diagramem

## Pliki skilla

```
.claude/skills/hitl-pipeline/
  SKILL.md              — 538 linii, glowna logika orkiestracji
  MANIFEST_TEMPLATE.md  — szablon referencyjny (autorytatywny format w SKILL.md)
  GATE_TEMPLATE.md      — szablon referencyjny (autorytatywny format w SKILL.md)

.claude/skills/five-minds/
  SKILL.md                    — 249 linii, Five Minds Protocol v1 (oryginalna)
  SKILL_v2_terminal_rich.md   — 301 linii, Five Minds Protocol v2 Terminal Rich (uzywany przez hitl-pipeline)
```

## Artefakty generowane w projekcie

```
projekt/
  MANIFEST.md                        — stan pipeline, wyniki faz, decyzje, metryki
  FIVE_MINDS_DEBATE.md               — pelna debata Five Minds (jesli Faza 3 uruchomiona)
  gates/
    BRAMA_1_strategia_research.md    — analiza + opcje + Mermaid + decyzja
    BRAMA_2_debata_build.md
    BRAMA_3_build_qa.md
```

## Koszty (szacunki)

| Model routing | Bez routingu (all Opus) | Z routingiem |
|---------------|----------------------|--------------|
| Research (4-6 agentow) | ~$0.60-1.20 | ~$0.02-0.06 (haiku) |
| Debata Five Minds | ~$0.30-0.60 | ~$0.05-0.15 (sonnet) |
| Build (1-3 agentow) | ~$0.30-0.90 | ~$0.05-0.15 (sonnet) |
| QA (1-3 agentow) | ~$0.20-0.60 | ~$0.03-0.10 (sonnet+haiku) |
| **TOTAL** | **~$1.40-3.30** | **~$0.15-0.46** |

## Kluczowe decyzje projektowe

1. **Self-contained SKILL.md** — formaty MANIFEST i GATE osadzone w SKILL.md, zero zewnetrznych zaleznosci
2. **Inline execution** — skill dziala w glownym kontekscie (nie forked) bo bramy wymagaja interakcji z userem
3. **Agent czyta Five Minds SKILL.md** — zamiast wywolywac skill (co nie dziala), subagent czyta plik i wykonuje protokol
4. **MANIFEST.md jako persistent memory** — jedyne trwale zrodlo prawdy gdy kontekst sie kompresuje
5. **Randomizacja opcji** — rekomendowana opcja losowo jako A/B/C aby zapobiec rubber-stamp
6. **Model routing** — haiku dla researchu, sonnet dla buildu/debaty, nigdy opus na subagentach

## Znane ograniczenia

- Skill nie moze wolac innego skilla (architektoniczne ograniczenie Claude Code)
- Dlugi pipeline moze zjesc kontekst — MANIFEST.md mityguje, ale nie eliminuje
- Subagenci nie dziela kontekstu — kazdy dostaje waski prompt, wyniki laczy orkiestrator
- Brak prawdziwego timera (120s z V25 HTML to symulacja) — w terminalu user decyduje w swoim tempie
- Wznowienie pipeline wymaga recznego przeczytania MANIFEST.md

## Co dalej

- [ ] Przetestowac na prawdziwym temacie
- [ ] Dodac wizualizacje Five Minds debaty w terminalu (patrz: FIVE_MINDS_TERMINAL.md)
- [ ] Integracja z V25 HTML — import wynikow pipeline do wizualizacji
- [ ] Mozliwosc eksportu gates/ jako PDF/HTML
