# MASTER_PLAN - Claude Code Settings + Permissions 2026

**Kampania:** Tier 1 #2 z Research Roadmap 2026
**Data startu:** 2026-04-17
**Preset:** `/deep-research-v2` (17 agentow, map-reduce + Extractor phase)
**Model override:** WSZYSCY agenci na **Opus 4.7** (user explicit request - stress test Opus 4.7 na duzym korpusie)
**Target output:** SYNTHESIS.md 8-10k slow + 3 pliki NbLM + **03_MEDIA_PROMPTS.md 9.5/10 quality** (user explicit: "3/10 -> 9.5/10")

**Media prompts quality gate:** 03_MEDIA_PROMPTS.md MUSI byc 9.5/10 profesjonalny, estetyczny, zgodny z najnowszymi trendami 2026 w zakresie infografik i video prompts. NbLM-writer czyta shared research `Research/_shared/media_prompts_standards/R8_media_prompts_2026.md` i stosuje te standardy.

## Zadanie od uzytkownika

> "Settings JSON, czyli pieciowarstwowa precedencja, permissions.allow / permissions.deny, oraz Managed layer deployment"

## Scope kampanii

Temat: **Claude Code Settings + Permissions** - kompletna wiedza o:
1. `settings.json` schema (wszystkie pola, typy, defaults, walidacja)
2. 5-warstwowa precedensja: **Managed > CLI > Local > Project > User** (merge semantyka per pole)
3. `permissions.allow` / `permissions.deny` (patterns, globs, tool matchers, bypass scenariusze)
4. Managed layer deployment (MDM, enterprise rollout, lock-down)
5. Environment variables + CLI flags (jak wchodza w precedensje)
6. Security implications (co permissions NIE chroni, real-world CVE/incydenty)
7. Real-world patterns z community (GitHub, dev.to, Reddit, HN)

## 7 pytan badawczych (podzial R1-R7)

**R1 (Tech / Primary Sources)** - settings.json schema: zbierz pelny JSON schema wszystkich pol z oficjalnych docs Anthropic (docs.claude.com/en/docs/claude-code), typy, defaults, required vs optional, deprecated fields. Cytuj URLs i sekcje docs.

**R2 (Precedence Deep Dive)** - 5-warstwowa precedensja: jak dokladnie wchodzi Managed > CLI > Local > Project > User. Merge semantyka per typ pola (object - deep merge? array - concat czy replace? scalar - override?). Jakie pola sa "zablokowane" przez Managed. Przyklady konfliktow i rozwiazan.

**R3 (Permissions Deep Dive)** - permissions.allow / permissions.deny: syntax dokladnie (tool:matcher format), wildcards/globs, mcp__ prefix, Bash command patterns, WebFetch domains, MCP server matchers. Tool reference complete list. Priority allow vs deny. Edge case: brak permissions field oznacza co?

**R4 (Managed Layer + Enterprise)** - Managed settings deployment: sciezka pliku per OS (Windows/Mac/Linux), MDM deployment scenarios, Jamf/Intune patterns, enterprise rollout strategie, co mozna zablokowac przez Managed vs co uzytkownik moze nadpisac.

**R5 (Environment + CLI)** - Environment variables (ANTHROPIC_* zmienne, CLAUDE_CODE_* zmienne), CLI flags (--settings, --project, etc.), jak wchodza w precedensje (CLI > Local czy CLI nadpisuje wszystko?), ktorych var unikac w produkcji.

**R6 (Security / Anti-patterns)** - Security: co permissions NIE chroni (np. filesystem poza scope, network via Bash), real-world bypass (CVE lub community reports), najczestsze anti-patterns (deny * as last resort, overly permissive allow globs), hardening checklist.

**R7 (Community Patterns)** - Real-world konfiguracje z GitHub (public repos z settings.json), dev.to / Medium artykuly, Reddit r/ClaudeAI, HackerNews threads, X/Twitter patterns. Konkretne przyklady, co ludzie robia (i czy slusznie).

## Struktura output

```
Research/research-settings-permissions/
  MASTER_PLAN.md           # ten plik
  MANIFEST.md              # shared scratchpad (tworzony w Phase 1)
  PROGRESS.md              # log postepu
  research/
    R1_official_docs.md
    R2_precedence_semantics.md
    R3_permissions_syntax.md
    R4_managed_enterprise.md
    R5_env_vars_cli.md
    R6_security_antipatterns.md
    R7_community_patterns.md
    CRITIC.md              # Phase 3
  extracts/
    E1_official_docs.json
    E2_precedence.json
    E3_permissions.json
    E4_managed.json
    E5_env_cli.json
    E6_security.json
    E7_community.json
  plans/
    SYNTHESIS.md           # Phase 4 kanoniczny
  NbLM/                    # Phase 5 (post-v2)
    00_FUNDAMENTALS.md
    01_PATTERNS.md
    02_DECISION_GUIDE.md
    03_MEDIA_PROMPTS.md
```

## Fazy (wg /deep-research-v2)

1. **STRATEGIA** - ten plik + PROGRESS + MANIFEST (DONE przez orchestrator)
2. **RESEARCH** - 7 researcherow parallel na Opus 4.7, target 3-5k slow per report
3. **EXTRACT** - 7 extractorow parallel na Opus 4.7 (user override), JSON 300-500 slow kazdy
4. **CRITIQUE** - 1 critic Opus 4.7, CRITIC.md z werdyktami PASS/REVISE + konflikty + gaps
5. **SYNTEZA** - 1 lean syntetyk Opus 4.7, SYNTHESIS.md 8-10k slow, early-skeleton write
6. **NbLM-writer** (post-v2) - 3 pliki destylatu + 03_MEDIA_PROMPTS.md dla NotebookLM

## Constraints

- Opus 4.7 wszedzie (eksperyment: jak dziala 1M context + heavy reasoning vs Sonnet)
- Early skeleton write obowiazkowy dla Syntetyka (retry-safe)
- Kazdy researcher MUSI cytowac zrodla (URL / commit hash / doc section)
- Citation format: `R<N>.C<M>` w SYNTHESIS
- Security R6 musi podac konkretne CVE lub incydenty, nie abstrakcyjne "byc moze"

## Known risks

- Tematyka "permissions" jest niedokumentowana publicznie w calosci - oczekuj luk
- 5-warstwowa precedensja moze miec quirki ktorych nikt nie opublikowal (konflikty w praktyce)
- Managed layer: moze byc slabo opisany publicznie (enterprise feature)

## Open questions do rozstrzygniecia w CRITIQUE

- Czy `settings.local.json` jest juz oficjalnie deprecated czy tylko "hidden"?
- Co dokladnie robi `permissions.additionalDirectories` vs `--add-dir` CLI?
- Czy `enableAllProjectMcpServers` ma priority nad indywidualnymi rules?
- Jak dokladnie zachowuje sie merge dla `hooks` array (concat czy replace)?

## Docelowy output

SYNTHESIS.md (~8-10k slow) z sekcjami:
- Part 1: Settings model (5 warstw, precedensja, merge)
- Part 2: Schema reference (pola z typami + defaults)
- Part 3: Permissions model (allow/deny, patterns, tool matchers)
- Part 4: Managed deployment (enterprise rollout)
- Part 5: Environment + CLI
- Part 6: Security (co chroni / co NIE chroni + hardening)
- Part 7: Patterns z community (z przykladami)
- Appendix A: Quick reference card
- Appendix B: Migration guide (starsze wersje -> 2026)
- Appendix C: Open questions (do weryfikacji)
