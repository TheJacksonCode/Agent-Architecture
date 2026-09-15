# MANIFEST - Settings + Permissions Campaign

Shared scratchpad miedzy agentami. Orchestrator (= Claude Opus 4.7) aktualizuje po kazdej fazie.

## Zadanie

Deep Research v2 dla tematu "Claude Code Settings + Permissions 2026". Tier 1 #2 z Research Roadmap.

## Decyzje Architektoniczne

- **DD1:** Wszystkie agenty na Opus 4.7 (user explicit - stress test 1M context + heavy reasoning)
- **DD2:** 7 researcherow dostosowanych do tematu (nie domyslny podzial tech/UX/reddit/x/github/forums/docs bo temat wysoko-techniczny)
- **DD3:** Media prompts quality gate 9.5/10 - dedykowany shared research R8 w `_shared/media_prompts_standards/`
- **DD4:** Citation format `R<N>.C<M>` dla traceability w SYNTHESIS
- **DD5:** NbLM format: 3 pliki (00_FUNDAMENTALS + 01_PATTERNS + 02_DECISION_GUIDE) + 03_MEDIA_PROMPTS.md wedlug standardu NotebookLM Studio

## Stack Technologiczny

- Claude Code CLI 2026 (Opus 4.6/4.7 era)
- Ekosystem: settings.json, Managed settings, permissions.allow/deny, env vars, CLI flags
- Docs primary: docs.claude.com/en/docs/claude-code
- Narzedzia researchu: WebFetch, WebSearch, Grep, Read

## Known Risks

- **R1:** Managed layer moze byc niedostatecznie udokumentowany publicznie (enterprise feature)
- **R2:** `settings.local.json` - status niejasny (deprecated vs hidden)
- **R3:** Precedence quirki - niektore pola moga mie wlasne zasady merge nie opisane w docs
- **R4:** Opus 4.7 na 15 agentach parallel moze hit API concurrency limits - jesli tak, retry-with-backoff

## Open Questions (do rozstrzygniecia w CRITIC + SYNTHESIS)

- Q1: settings.local.json - deprecated czy tylko undocumented?
- Q2: permissions.additionalDirectories vs --add-dir CLI flag - ta sama mechanika?
- Q3: enableAllProjectMcpServers ma priority nad permissions deny?
- Q4: hooks array w settings - concat czy replace przy merge?
- Q5: enabledMcpjsonServers array - override czy merge?

## Phase log

### Phase 0: STRATEGIA
- MASTER_PLAN.md created 2026-04-17
- MANIFEST.md created 2026-04-17 (this file)
- PROGRESS.md created 2026-04-17
- Foldery research/, extracts/, plans/, NbLM/ gotowe

### Phase 1: RESEARCH
(pending)

### Phase 2: EXTRACT
(pending)

### Phase 3: CRITIQUE
(pending)

### Phase 4: SYNTEZA
(pending)

### Phase 5: NbLM-writer
(pending)
