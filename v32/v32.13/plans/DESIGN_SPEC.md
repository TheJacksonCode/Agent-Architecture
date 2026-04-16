# v32.13 DESIGN_SPEC - CSS tokens, new rules, APCA

**Mirrors:** v32.12 preset sidebar polish applied to agent sidebar.
**Palette source:** v32.8 `:root` tokens (unchanged).

---

## 1. Reused tokens (no changes)

- `--bg-panel`, `--bg-card`, `--bg-input`
- `--mc-opus`, `--mc-sonnet`, `--mc-haiku` + `-rgb` triplets
- `--ph-strategy`, `--ph-research`, `--ph-debate`, `--ph-build`, `--ph-qa`, `--ph-hitl` + `-rgb` + `-ink`
- `--t1`, `--t2`, `--t3` text ramp
- `--shadow`, `--radius`

APCA reference (already compliant in v32.8):
- `--mc-sonnet-ink #C4B5FD` Lc 81 on --bg-card
- `--ph-qa-ink #FCA5A5` Lc 78 on --bg-card
- `--ph-strategy-ink #8AB4F8` Lc 76 on --bg-card
- `--t1` Lc 95 body floor, `--t2` Lc 82 secondary, `--t3` Lc 68 chrome only

---

## 2. Reused CSS blocks (drop-in, verify line ranges)

| Block | Lines | Purpose | Change |
|-------|-------|---------|--------|
| `.vd .vd-col .vd-col.fit .vd-col.nofit .vd-head .vd-list` | 1161-1174 | Verdict dual-column | none |
| `.ds-longdesc details / summary / -body` | 1146-1155 | Collapsible long desc | none |
| `.ds-mdl-row .ds-mdl-chip .m-opus/.m-sonnet/.m-haiku` | 1454-1472 | Compact 3-chip model | none |
| `.btn-learn.is-rich .bl-icon .bl-eyebrow .bl-title .bl-sub .bl-arrow` | 1208-1227 | Rich encyclopedia CTA | none |
| `.ds-avatar-orb.ph-*` | 1016-1021 | Phase glow orb | none |
| `.ds-card`, `.ds`, `.ds-l` | base | sidebar shells | none |

---

## 3. New CSS rules (append to existing stylesheet)

Place in same region as other `.ds-*` rules (around line 1200-1250). Total ~25 lines.

```css
/* v32.13 agent sidebar additions */
.ds-hero-sticky {
  position: sticky;
  top: 0;
  z-index: 2;
  background: var(--bg-panel);
  padding: 10px 12px 8px;
  border-bottom: 1px solid rgba(255,255,255,.04);
}

.ds-twinchips {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 6px;
}
.ds-twinchips .tw-col { display: flex; flex-direction: column; gap: 4px; }
.ds-twinchips .tw-head { font-size: 10px; letter-spacing: .08em; color: var(--t3); text-transform: uppercase; }

.ds-anti-chip {
  display: inline-block;
  padding: 3px 8px;
  margin: 2px 4px 0 0;
  border-radius: 999px;
  font-size: 10px;
  border: 1px solid rgba(var(--ph-qa-rgb), .35);
  background: rgba(var(--ph-qa-rgb), .08);
  color: var(--ph-qa-ink);
}

.ds-load-mini {
  height: 4px;
  width: 100%;
  margin-top: 6px;
  border-radius: 2px;
  background: rgba(255,255,255,.06);
  overflow: hidden;
}
.ds-load-mini > i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--mc-haiku), var(--mc-sonnet));
}

.ds-cmd.is-prompt {
  height: 32px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  border-radius: 16px;
  background: rgba(var(--ph-debate-rgb), .12);
  border: 1px solid rgba(var(--ph-debate-rgb), .3);
  color: var(--ph-debate-ink);
  cursor: pointer;
}
.ds-cmd.is-prompt:hover { background: rgba(var(--ph-debate-rgb), .18); }

.ds-hero-row { display: flex; align-items: center; gap: 10px; }
.ds-hero-meta { flex: 1; min-width: 0; }
.ds-hero-chips { display: flex; gap: 6px; margin-top: 4px; flex-wrap: wrap; }
.ds-chip-micro { font-size: 10px; padding: 2px 6px; border-radius: 999px; background: rgba(255,255,255,.06); color: var(--t2); }
```

**Target-size WCAG 2.2 SC 2.5.8:** `.ds-cmd.is-prompt` is 32px tall, chip buttons are 24x24 min (inherits from `.ds-mdl-chip`).

---

## 4. Prompt modal shell (reuse existing)

Use `moCost`-like structure:
```
<div class="mo moPrompt" id="moPrompt" role="dialog" aria-modal="true" aria-labelledby="moPromptTitle">
  <div class="mo-box" style="max-width:720px">
    <div class="mo-hd">
      <h3 id="moPromptTitle">Edytuj prompt</h3>
      <button class="mo-close" onclick="zamknijMoPrompt()">x</button>
    </div>
    <div class="mo-body">
      <textarea id="moPromptTA" class="ds-ta" style="min-height:400px"></textarea>
    </div>
    <div class="mo-ft">
      <button onclick="promptDup()">Duplikuj</button>
      <button onclick="promptCopy()">Kopiuj</button>
      <button onclick="promptReset()">Resetuj</button>
      <button onclick="promptSave()" class="btn-prim">Zapisz</button>
    </div>
  </div>
</div>
```

**Mobile:** CSS media query `@media (max-width:640px) { .moPrompt .mo-box { max-width:100%; height:100%; } }`.

---

## 5. Height budget validation

| Section | Height | Cumulative |
|---------|--------|------------|
| Hero sticky | 88 | 88 |
| Verdict panel | 220 | 308 |
| Kluczowe kompetencje (collapsed) | 140 | 448 |
| Kim jest + analogia | 72 | 520 |
| Co/Nie robi twin + inline anti | 120 | 640 |
| Narzedzia | 56 | 696 |
| Polaczenia (conditional) | 80 | 776 |
| Model row | 56 | 832 |
| Prompt pill + icons | 48 | 880 |
| Encyklopedia CTA | 76 | 956 |

**Total: ~956px.** Matches R4 prediction (~936px +/- 20). On 1080p viewport with 160px topbar, usable 920px -> CTA just below fold, scrollable. On 720p laptop, CTA below fold by ~180px (acceptable per CRITIC risk #5).

---

## 6. Phase-tinted hero housing

Apply `.ds-hero-sticky.ph-{phase}` to color the hero border using existing phase tokens:
```css
.ds-hero-sticky.ph-strategy { border-bottom-color: rgba(var(--ph-strategy-rgb), .35); }
.ds-hero-sticky.ph-research { border-bottom-color: rgba(var(--ph-research-rgb), .35); }
.ds-hero-sticky.ph-debate   { border-bottom-color: rgba(var(--ph-debate-rgb), .35); }
.ds-hero-sticky.ph-build    { border-bottom-color: rgba(var(--ph-build-rgb), .35); }
.ds-hero-sticky.ph-qa       { border-bottom-color: rgba(var(--ph-qa-rgb), .35); }
.ds-hero-sticky.ph-hitl     { border-bottom-color: rgba(var(--ph-hitl-rgb), .35); }
```

Consistent with v32.5 phase housing pattern.

---

## 7. prefers-reduced-motion

No new motion in v32.13 sidebar (hero is static, longdesc toggle is instant). No `@media (prefers-reduced-motion)` guards needed.

---

## 8. Dynamic facts counter function

```js
function countAgentFacts(id) {
  const k = AGENT_KNOWLEDGE[id];
  if (!k) return 0;
  const fields = ['who', 'analogy', 'does', 'doesNot', 'antiPatterns', 'facts'];
  return fields.filter(f => {
    const v = k[f];
    return v && (typeof v === 'string' ? v.trim().length : v.length);
  }).length;
}
```

Used in CTA sub-label: `` `Pelny profil, ${countAgentFacts(id)} sekcji wiedzy` ``.

---

## 9. New i18n keys (Polish-keyed, EN overlay)

Add to `I18N_EN`:
```js
'KLUCZOWE KOMPETENCJE': 'KEY COMPETENCIES',
'ANALOGIA': 'ANALOGY',
'Wiecej': 'More',
'Mniej': 'Less',
'Edytuj prompt': 'Edit prompt',
'Poznaj tego agenta': 'Meet this agent',
'Pelny profil, {N} sekcji wiedzy': 'Full profile, {N} knowledge sections',
```

Already present (verify in aktStatHTML): "KIEDY UZYWAC", "Nadaje sie do", "Nie dla", "SZCZEGOLOWY OPIS", "OBCIAZENIE".

---

## 10. Optional helpers (Phase D1)

```js
function getAgentLongPl(id)  { return (currentLang==='en' && I18N_EN.agentLong && I18N_EN.agentLong[id]) || AGENT_LONG_PL[id] || ''; }
function getAgentMidPl(id)   { return (currentLang==='en' && I18N_EN.agentMid && I18N_EN.agentMid[id]) || AGENT_MID_PL[id] || ''; }
function getAgentGreenPl(id) { return (currentLang==='en' && I18N_EN.agentGreen && I18N_EN.agentGreen[id]) || AGENT_GREEN_PL[id] || []; }
function getAgentRedPl(id)   { return (currentLang==='en' && I18N_EN.agentRed && I18N_EN.agentRed[id]) || AGENT_RED_PL[id] || []; }
```

v32.13 ships PL-only for the 4 new constants. EN overlay is stub-ready but empty until future version.
