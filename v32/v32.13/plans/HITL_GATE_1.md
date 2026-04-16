# v32.13 HITL Gate #1 - Variant B recommendation + open questions

**Status:** AWAITING USER APPROVAL. Phase D1 starts only after user answers below.
**Recommendation:** Variant B Progressive Disclosure (10 sections, ~956px total).

---

## 1. Why Variant B (one paragraph)

Variant B mirrors v32.12 preset sidebar muscle memory, keeps the scroll budget near 1 screen on 1080p, and delivers every v32.12 polish win (verdict panel, long desc, rich CTA, compact model row) without adding tabs. Variant A (Information-dense ~1270px) would overflow on 720p laptops by 350px. Variant C (Two-zone tabbed ~788px) is shorter but tab switching costs muscle memory and hides content behind a click. R4 + CRITIC agree.

Full rationale: `v32.13/research/R4_agent_profile_design.md` section 5, `v32.13/research/CRITIC.md` conflict 1.

---

## 2. Six open questions for user

### Q1 - Prompt modal width on desktop
Default in DESIGN_SPEC: **720px centered**, fullscreen on mobile (<=640px).

Options:
- **A) 720px desktop / fullscreen mobile** (recommended) - matches moCost, feels like a card not a takeover.
- B) 900px wide desktop - more room, feels more "editor".
- C) Always fullscreen - distraction-free editing, but heavy feel.

Pick one: [ A / B / C ]

---

### Q2 - Analogy guardrails
The 17 agents WITHOUT notebookLM source will get AGENT_KNOWLEDGE.analogy as-is. Some are short/generic.

Options:
- **A) Use AGENT_KNOWLEDGE.analogy as-is for all 17** (recommended) - ships faster, can enrich later.
- B) Write fresh literal-first analogies for all 17 during Phase D1 - ~1 day extra, higher quality.
- C) Hide ANALOGIA section when AGENT_KNOWLEDGE.analogy missing or weaker than 8 words - conditional render.

Pick one: [ A / B / C ]

---

### Q3 - Dynamic facts counter formula
The encyclopedia CTA says "Pelny profil, N sekcji wiedzy".

Options:
- **A) Count populated fields of {who, analogy, does, doesNot, antiPatterns, facts}** (recommended) - dynamic 1-6 range.
- B) Static "6 sekcji wiedzy" - consistent but dishonest for sparse agents.
- C) Count total items (does.length + doesNot.length + ...) - can exceed 20, feels like a spam number.

Pick one: [ A / B / C ]

---

### Q4 - 17 agents without notebookLM source
R2 covered 18/35 agents. Missing: db_architect, observability_engineer, gtm_strategist, statistician, eda_analyst, control_mapper, telemetry_surfer, expert_pragmatist/innovator/analyst/user/devil, decision_presenter, res_critic, res_docs, feature, qa_perf.

Options:
- **A) Fallback to AGENT_KNOWLEDGE with ~150 word AGENT_LONG_PL** (recommended) - ships with full 35/35, marked as derived.
- B) Block ship until notebookLM extraction exists for all 35 - weeks of extra work.
- C) Hide KLUCZOWE KOMPETENCJE section for those 17 - visible asymmetry in UI.

Pick one: [ A / B / C ]

---

### Q5 - backend/frontend shared source disclosure
R2 split one Koder.md into two slanted interpretations (backend=API/DB/infra, frontend=UI/state).

Options:
- **A) Ship both as distinct entries without disclosure** (recommended) - cleanest UX, users see tailored content.
- B) Add "[interpretacja]" badge to both entries - transparent but noisy.
- C) Merge into single "koder" agent - loses phase flexibility for build pipelines.

Pick one: [ A / B / C ]

---

### Q6 - Scroll budget on 720p laptops
Variant B CTA sits ~180px below fold on 1366x720.

Options:
- **A) Accept below-fold CTA** (recommended) - CTA is "more info" not primary action, ~180px scroll is normal.
- B) Collapse KLUCZOWE KOMPETENCJE by default AND collapse POLACZENIA by default -> saves ~80px -> CTA 100px below fold.
- C) Move ENCYKLOPEDIA button into sticky hero as icon -> always visible, but crowds hero.

Pick one: [ A / B / C ]

---

## 3. What Phase D1 ships if Gate #1 = all A

- AGENT_LONG_PL (35 entries, HTML, R2 rich 18 + AGENT_KNOWLEDGE 17)
- AGENT_MID_PL (35 entries, plain 1-2 sentences for haiku card)
- AGENT_GREEN_PL (35 arrays, 4-6 bullets)
- AGENT_RED_PL (35 arrays, 4-5 bullets)
- `countAgentFacts(id)` helper
- i18n entries added to I18N_EN

**No HTML edits in Phase D1.** Phase D2 does the markup rewrite.

---

## 4. What Phase D2 ships

- pokazWezel rewritten to 10-section Variant B
- pokazDef rewritten (shorter variant, 7 sections)
- New CSS block (~25 lines) appended to stylesheet
- Prompt modal (`moPrompt`) added + `otworzMoPrompt`, `promptDup/Copy/Reset/Save`
- Version bumps: title v32.13, eksportujKfg v='32.13', buildCostJSON version='32.13'
- localStorage migration: `acV32_13_custom` reads from `acV32_12_custom` chain

---

## 5. Stop point

**I am stopping here.** Please answer Q1-Q6 (a single line like "1A 2A 3A 4A 5A 6A" is fine) or say "kompakt" if you need to compress first. Phase D1 kicks off the moment I have the 6 answers.
