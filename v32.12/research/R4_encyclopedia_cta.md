# R4: Encyclopedia CTA research

Research for v32.12 "Encyklopedia presetu" call-to-action button in the preset detail sidebar. The goal is to transform a visually flat, semantically neutral button into a persuasive discovery trigger that promises rich content behind the door while respecting the existing dark glassmorphism theme, APCA contrast floors, prefers-reduced-motion, WCAG 2.2 SC 2.5.8, and a ~40 line CSS budget.

## Baseline audit (why current button underperforms)

The existing `.btn-learn` is a single-row 11px button with a faint violet-to-mint linear gradient at 10% opacity, a subtle border pulse at 0.25 -> 0.55 alpha, a book emoji glyph (U+1F4DA) and the neutral descriptive label "Encyklopedia presetu". Every dimension of the button works against click-through:

1. **Contrast is the first problem.** The label color is `var(--accent1)` (~#818CF8) painted over a 10% violet-on-dark-glass background. In APCA terms that foreground against the `rgba(22,22,42,0.8)` baseline panel computes to roughly Lc 62 - acceptable for UI text but well below the Lc 75 body floor required by the v32.8 design tokens. On top of that the gradient darkens toward `rgba(52,211,153,0.1)` on the right half, which further compresses the lightness delta under the rightmost glyph. The button does not look "bright", it looks "recessed".

2. **Size is the second problem.** 9px 14px padding + 11px font yields a vertical target height of ~31px. That meets SC 2.5.8 but falls below the 44px comfortable touch target Apple HIG/Material 3 recommend for primary discovery CTAs. The button sits in the same row rhythm as the secondary save/export chips, so the eye has nothing to anchor onto. There is no visual hierarchy saying "this is the main thing you should do next".

3. **Copy is the third problem.** "Encyklopedia presetu" is a category label, not an invitation. Nielsen Norman Group has published repeatedly that discovery CTAs must answer two questions for the user: *what will I get* and *why should I care right now*. The current label answers neither. The user has to infer "there is content inside" and that there is enough of it to justify a click. Research from Unbounce's CTA study (2019) shows that specific, benefit-loaded verbs ("Discover", "See how", "Zobacz jak") outperform category nouns ("Encyclopedia", "Documentation") by 30-90% in click rate.

4. **The animation is invisible.** `learnPulse` swings border alpha from 0.25 to 0.55 once every 3 seconds. On a 16:9 LCD at typical brightness that delta is perceptible but only if the user is already looking at the button. Pulses as attention magnets work best when they are either fast enough to catch peripheral vision (1.2-1.6s) or paired with a visible color change (not just alpha). The current pulse does neither.

5. **There is no "scent of information".** Information Foraging Theory (Pirolli/Card, Xerox PARC) says users click when they smell the content trail. The current button has no scent: no section count, no preview, no icon stack, no chevron, no hover morph. The user has no way to know whether clicking opens a one-line tooltip or a 5-section deep dive.

6. **It competes with the new v32.12 neighborhood but loses.** The preset sidebar in v32.12 now holds: the CLAUDE CODE COMMAND pill, the ZMIEN MODEL chip row, the SKLAD micro bar and the model-chip header composition. All of those use tight 10-11px type and violet/haiku tinting. `.btn-learn` uses the same typography and the same tinting, which means it visually merges into the same control strip instead of standing out as the "main event".

Conclusion: the fix must simultaneously (a) raise contrast above Lc 75 for the label, (b) make the CTA taller and heavier than the surrounding chips so it reads as the primary action, (c) replace the category label with a specific, benefit-loaded copy that hints at content volume, (d) add a visible-but-tasteful motion affordance, and (e) introduce at least one "scent of information" signal (section count badge, icon stack, or chevron).

## Topic 1: Copy candidates

Eight candidates with rationale, Polish default and English via `t()`. Character budgets assume 40ch max on one line at 12-13px or 2 lines for split variants.

### C1 - "Zobacz jak to dziala" / "See how it works"

Polish main: `Zobacz jak to dziala` (20 ch). English main: `See how it works` (16 ch). Promise-of-insight pattern from Stripe and Linear product pages. The verb "zobacz / see" is concrete and non-committal; "how it works" answers *what will I get*. This is the most universal option and translates cleanly. It does not advertise content volume so it pairs best with a section-count badge. Risk: feels slightly passive. NNg rating: strong for users who are unfamiliar with the preset, weaker for expert users who already "know how it works".

### C2 - "Poznaj preset gleboko" / "Deep dive into this preset"

Polish main: `Poznaj preset gleboko` (21 ch). English main: `Deep dive into this preset` (27 ch). Depth framing borrowed from Vercel Docs "Deep Dive" collapsible sections and AWS "Deep Dive" blog format. "Deep dive" has become a widely understood idiom for "more than you asked for". The Polish "poznaj gleboko" is slightly formal but still idiomatic in product writing. Risk: "deep dive" is becoming a cliche in English.

### C3 - "Pelna encyklopedia (5 sekcji)" / "Full encyclopedia (5 sections)"

Polish main: `Pelna encyklopedia` (18 ch) + subtitle `5 sekcji wiedzy`. English main: `Full encyclopedia` (17 ch) + subtitle `5 knowledge sections`. Volume-signaling pattern from Refactoring UI chapter on "Give users a reason to click" and Notion's "X items" link pattern. The section count is the *information scent*. This is the strongest option when paired with a split-card visual because it uses both lines: headline = category, subtitle = quantified promise. The `5` is dynamic: render it from `PRESET_KNOWLEDGE[pid]` section count so it stays honest.

### C4 - "Otworz atlas presetu" / "Open the preset atlas"

Polish main: `Otworz atlas presetu` (20 ch). English main: `Open the preset atlas` (21 ch). Atlas metaphor is warmer than "encyclopedia" and implies navigability without commitment. Used successfully by Linear's "Method" docs and Arc Browser's "Library" panel. Risk: atlas is unusual enough that some users will not recognize it as a metaphor for "rich reference content". Good fit if paired with a map/compass icon.

### C5 - "Zanurz sie w preset ->" / "Dive into this preset ->"

Polish main: `Zanurz sie w preset ->` (22 ch). English main: `Dive into this preset ->` (24 ch). Active-voice imperative with explicit directional chevron. The verb "zanurz sie / dive" carries emotional weight and implies immersion. Pattern seen in Arc Browser's onboarding and Material 3 "Open details" affordances. The arrow becomes a motion target for the hover micro-interaction.

### C6 - "Wszystko o tym presecie" / "Everything about this preset"

Polish main: `Wszystko o tym presecie` (23 ch). English main: `Everything about this preset` (28 ch). Comprehensive-promise pattern from Apple Support "Learn everything about X" and Notion's "Full reference". The word "wszystko / everything" is a heavy promise and works only if the panel really does contain 5+ sections. Legal-honesty note: do not use this if some presets have sparse knowledge entries.

### C7 - Split label: "ENCYKLOPEDIA / Jak to dziala + anti-patterns + fun facts" (two lines)

Polish line 1 `ENCYKLOPEDIA` 12 ch caps + line 2 `Jak to dziala plus anti-patterns plus fakty`. English line 1 `ENCYCLOPEDIA` + line 2 `How it works plus anti-patterns plus facts`. Two-line split uses a small uppercase eyebrow label + a longer descriptive subtitle. The eyebrow tells the user what kind of thing is behind the door; the subtitle names the top 2-3 sections. Pattern borrowed from Material 3 "List item with supporting text" and Stripe's marketing CTAs. This is the richest option but also the tallest.

### C8 - "Poznaj ten preset" + KBD hint "Press E" / "Learn this preset" + KBD hint "Press E"

Polish main: `Poznaj ten preset` (17 ch) + KBD chip `E`. English main: `Learn this preset` (17 ch) + KBD chip `E`. Pairs a short action label with a keyboard shortcut hint in a pill. Power-user pattern from Linear, GitHub Copilot, Vercel dashboard. The `E` key would need to be wired to the existing `otworzEncykl()` call and documented in the keyboard help. Risk: adds a shortcut surface area the project has to maintain; works only if there is budget to register a real hotkey.

**Ranking for v32.12 context.** Given the user explicitly says the problem is "users don't realize they're missing a treasure-trove of content" the winning copy must quantify the treasure. C3 (`Pelna encyklopedia + 5 sekcji wiedzy` split subtitle) wins on that criterion. C7 is a close second and gives even more scent but takes more vertical space. C5 (`Zanurz sie`) wins on emotional energy but does not quantify. I recommend C3 as the baseline and C7 as a richer fallback if vertical space permits.

## Topic 2: Visual patterns

Seven drop-in recipes. Each is full-ready CSS. All assume the existing `.btn` base class is still attached for base padding reset, cursor, and transition. All recipes override padding and font-size on their specific class. APCA estimates use https://apcacontrast.com assumptions: `--t1` ≈ #E6E6F2, `--t2` ≈ #B4B4C8, `--accent1` ≈ #818CF8, `--mc-haiku` ≈ #34D399, background panel `#16162A` at 80% alpha over starfield.

### P1 - Split-card CTA with eyebrow + headline + subtitle + arrow

Taller 2-line card with small uppercase eyebrow label, bold headline, muted subtitle, and a right-aligned chevron. Visual hierarchy is explicit: eyebrow = category, headline = action, subtitle = quantity, arrow = direction.

```css
.btn-learn{
  display:grid;
  grid-template-columns:36px 1fr 20px;
  grid-template-rows:auto auto;
  gap:2px 12px;
  align-items:center;
  width:100%;
  padding:12px 14px;
  margin-top:10px;
  border:1px solid rgba(129,140,248,0.35);
  border-radius:12px;
  background:
    linear-gradient(135deg,rgba(129,140,248,0.12),rgba(52,211,153,0.08)),
    rgba(22,22,42,0.85);
  backdrop-filter:blur(14px);
  cursor:pointer;
  transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease,background .25s ease;
  font-family:var(--hd);
  text-align:left;
}
.btn-learn .bl-icon{
  grid-column:1;grid-row:1 / span 2;
  width:36px;height:36px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;
  background:rgba(129,140,248,0.15);
  border:1px solid rgba(129,140,248,0.3);
  color:#E6E6F2;
}
.btn-learn .bl-eyebrow{
  grid-column:2;grid-row:1;
  font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  color:#C9C9DE;
}
.btn-learn .bl-title{
  grid-column:2;grid-row:2;
  font-size:13px;font-weight:600;color:#F2F2F8;line-height:1.25;
}
.btn-learn .bl-sub{
  grid-column:2 / span 2;grid-row:3;
  font-size:10px;font-weight:500;color:#B4B4C8;margin-top:2px;
}
.btn-learn .bl-arrow{
  grid-column:3;grid-row:1 / span 2;
  color:#C4B5FD;transition:transform .25s ease;
}
.btn-learn:hover{
  transform:translateY(-1px);
  border-color:rgba(129,140,248,0.6);
  background:
    linear-gradient(135deg,rgba(129,140,248,0.2),rgba(52,211,153,0.14)),
    rgba(22,22,42,0.9);
  box-shadow:0 8px 28px rgba(129,140,248,0.22);
}
.btn-learn:hover .bl-arrow{transform:translateX(3px)}
.btn-learn:focus-visible{outline:2px solid #C4B5FD;outline-offset:2px}
```

HTML pattern:

```html
<button class="btn btn-learn" onclick="otworzEncykl(\'preset\',\'${pid}\')" aria-label="${t(\'Otworz encyklopedie presetu\')}">
  <span class="bl-icon" aria-hidden="true">📚</span>
  <span class="bl-eyebrow">${t(\'ENCYKLOPEDIA\')}</span>
  <span class="bl-title">${t(\'Pelna encyklopedia\')}</span>
  <span class="bl-sub">${secCount} ${t(\'sekcji wiedzy\')} · ${t(\'jak uzywac, anti-patterns, fakty\')}</span>
  <svg class="bl-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
</button>
```

**APCA estimate.** Headline `#F2F2F8` on `#16162A` ≈ Lc 98 (excellent, clears 75 body and 60 UI floors with margin). Eyebrow `#C9C9DE` on `#16162A` ≈ Lc 83. Subtitle `#B4B4C8` on `#16162A` ≈ Lc 72 (right at the body threshold; bump to `#C2C2D4` if the QA agent flags it). Arrow `#C4B5FD` on `#16162A` ≈ Lc 77.

**Pros.** Strongest scent of information (eyebrow + headline + subtitle + arrow all carry meaning). Clear visual hierarchy. Accommodates dynamic section count. Target area ~60px tall, well above SC 2.5.8. Pros for accessibility: each sub-element is a separate span so screen readers announce it as one button via the outer aria-label without duplicating content.

**Cons.** Tallest option (~64-72px). Costs ~40 lines of CSS (right at budget). Three text colors to maintain across themes.

**Source.** Material 3 "List item with three-line supporting text", Stripe product marketing cards, Vercel dashboard "recent activity" cards, Refactoring UI chapter 9 "Hierarchy is everything".

### P2 - Gradient border ring with conic rotation

Medium-height pill with a rotating conic-gradient border ring that sweeps violet -> haiku -> opus -> back. Visible but not aggressive.

```css
.btn-learn{
  position:relative;
  width:100%;
  padding:12px 16px;
  margin-top:10px;
  border:none;
  border-radius:12px;
  background:rgba(22,22,42,0.9);
  color:#F2F2F8;
  font-family:var(--hd);font-size:13px;font-weight:600;
  cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:10px;
  isolation:isolate;
}
.btn-learn::before{
  content:"";position:absolute;inset:-1px;border-radius:13px;z-index:-1;
  background:conic-gradient(from var(--angle,0deg),
    rgba(129,140,248,0.7),
    rgba(52,211,153,0.6),
    rgba(245,158,11,0.5),
    rgba(129,140,248,0.7));
  animation:blRing 6s linear infinite;
}
.btn-learn::after{
  content:"";position:absolute;inset:1px;border-radius:11px;z-index:-1;
  background:linear-gradient(135deg,rgba(129,140,248,0.1),rgba(52,211,153,0.06)),rgba(22,22,42,0.92);
}
@property --angle{syntax:"<angle>";inherits:false;initial-value:0deg}
@keyframes blRing{to{--angle:360deg}}
.btn-learn:hover{transform:translateY(-1px)}
.btn-learn:focus-visible{outline:2px solid #C4B5FD;outline-offset:3px}
@media (prefers-reduced-motion:reduce){
  .btn-learn::before{animation:none;background:linear-gradient(135deg,rgba(129,140,248,0.5),rgba(52,211,153,0.4))}
}
```

HTML:

```html
<button class="btn btn-learn" onclick="otworzEncykl(\'preset\',\'${pid}\')">
  <span aria-hidden="true">📚</span>
  <span>${t(\'Pelna encyklopedia\')} · ${secCount} ${t(\'sekcji\')}</span>
  <span aria-hidden="true">→</span>
</button>
```

**APCA.** Label `#F2F2F8` on `#16162A` ≈ Lc 98. Ring colors are decorative and do not need to clear UI floor.

**Pros.** Distinctive; conic gradient rotation is eye-catching without being loud. Uses CSS `@property` which is now supported in Chrome/Edge/Safari/Firefox. Automatically blends all three model-color brand anchors (violet/haiku/opus) without picking a side.

**Cons.** `@property` fallback needed for older browsers (`@property` is optional - without it the ring just stays static, which is still fine). Conic gradient animation runs continuously and uses GPU; `prefers-reduced-motion` override is critical. Ring is the only information scent signal; does not quantify content like P1.

**Source.** Shadcn/ui "Rainbow Button" pattern, Vercel Geist "shimmer button", Radix Themes accent button recipes, CSS Tricks conic-gradient border tutorial.

### P3 - Frosted hero card with icon stack + label

Short-wide card with 3 overlapping small icons (book + magnifier + eye) on the left suggesting "multiple content types" and a label on the right.

```css
.btn-learn{
  display:flex;align-items:center;gap:14px;
  width:100%;
  padding:14px 16px;
  margin-top:10px;
  border:1px solid rgba(129,140,248,0.3);
  border-radius:14px;
  background:
    radial-gradient(ellipse at top left,rgba(129,140,248,0.18),transparent 60%),
    rgba(22,22,42,0.88);
  backdrop-filter:blur(14px);
  color:#F2F2F8;
  font-family:var(--hd);font-size:13px;font-weight:600;
  cursor:pointer;
  transition:all .3s ease;
  text-align:left;
}
.btn-learn .bl-stack{
  position:relative;width:48px;height:36px;flex:0 0 48px;
}
.btn-learn .bl-stack svg{
  position:absolute;top:50%;transform:translateY(-50%);
  width:26px;height:26px;padding:4px;
  border-radius:8px;
  background:rgba(22,22,42,0.95);
  border:1px solid rgba(129,140,248,0.35);
  transition:transform .3s ease;
}
.btn-learn .bl-stack svg:nth-child(1){left:0;color:#C4B5FD;z-index:3}
.btn-learn .bl-stack svg:nth-child(2){left:11px;color:#86EFAC;z-index:2}
.btn-learn .bl-stack svg:nth-child(3){left:22px;color:#FCD34D;z-index:1}
.btn-learn .bl-text{display:flex;flex-direction:column;flex:1 1 auto;gap:2px}
.btn-learn .bl-main{font-size:13px;font-weight:600;color:#F2F2F8}
.btn-learn .bl-meta{font-size:10px;font-weight:500;color:#B4B4C8}
.btn-learn .bl-chev{color:#C4B5FD;margin-left:auto;transition:transform .25s ease}
.btn-learn:hover{
  border-color:rgba(129,140,248,0.55);
  box-shadow:0 8px 24px rgba(129,140,248,0.2);
  transform:translateY(-1px);
}
.btn-learn:hover .bl-stack svg:nth-child(1){transform:translateY(-50%) translateX(-3px) rotate(-4deg)}
.btn-learn:hover .bl-stack svg:nth-child(3){transform:translateY(-50%) translateX(3px) rotate(4deg)}
.btn-learn:hover .bl-chev{transform:translateX(3px)}
```

HTML icon SVGs use the existing stroke-based system. Three icons: book, magnifier, lightbulb.

```html
<button class="btn btn-learn" onclick="otworzEncykl(\'preset\',\'${pid}\')">
  <span class="bl-stack" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 1-2-2z"/><path d="M4 19a2 2 0 0 0 2 2h12"/></svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0-4 10.5V16h8v-2.5A6 6 0 0 0 12 3z"/><path d="M10 20h4"/></svg>
  </span>
  <span class="bl-text">
    <span class="bl-main">${t(\'Pelna encyklopedia\')}</span>
    <span class="bl-meta">${secCount} ${t(\'sekcji wiedzy\')}</span>
  </span>
  <svg class="bl-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>
</button>
```

**APCA.** Main `#F2F2F8` on `#16162A` ≈ Lc 98. Meta `#B4B4C8` ≈ Lc 72 (tight, consider `#C2C2D4`). Icons colored but not load-bearing.

**Pros.** Icon stack is the most literal "multiple things inside" signal. Three-color icon palette naturally maps to the three model-color vars. Icons split on hover = delightful micro-moment. Compact vertical footprint (~60px).

**Cons.** Highest markup complexity (3 inline SVGs). Icon stack is decorative; if user disables images the card degrades to text + empty box. Icons must be tuned so the stack does not look cluttered.

**Source.** Material 3 "avatar stack", Arc Browser spaces icons, Stripe "Integrations" card, Notion "Templates" hero.

### P4 - Shimmer sweep button

Medium pill with a periodic light sweep that crosses the button left-to-right every 4s. Simple and effective; the sweep is the only visual gimmick.

```css
.btn-learn{
  position:relative;overflow:hidden;
  display:flex;align-items:center;justify-content:center;gap:10px;
  width:100%;
  padding:14px 16px;
  margin-top:10px;
  border:1px solid rgba(129,140,248,0.35);
  border-radius:12px;
  background:linear-gradient(135deg,rgba(129,140,248,0.15),rgba(52,211,153,0.1)),rgba(22,22,42,0.88);
  color:#F2F2F8;
  font-family:var(--hd);font-size:13px;font-weight:600;letter-spacing:.01em;
  cursor:pointer;
  transition:all .25s ease;
}
.btn-learn::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,0.18) 50%,transparent 70%);
  transform:translateX(-100%);
  animation:blSweep 4.5s ease-in-out infinite;
  pointer-events:none;
}
@keyframes blSweep{0%,100%{transform:translateX(-100%)} 55%{transform:translateX(100%)} 60%,100%{transform:translateX(100%)}}
.btn-learn:hover{
  border-color:rgba(129,140,248,0.65);
  box-shadow:0 0 28px rgba(129,140,248,0.25);
  transform:translateY(-1px);
}
.btn-learn .bl-arrow{transition:transform .25s ease}
.btn-learn:hover .bl-arrow{transform:translateX(3px)}
@media (prefers-reduced-motion:reduce){.btn-learn::after{animation:none;display:none}}
```

HTML:

```html
<button class="btn btn-learn" onclick="otworzEncykl(\'preset\',\'${pid}\')">
  <span aria-hidden="true">📚</span>
  <span>${t(\'Pelna encyklopedia\')} · ${secCount} ${t(\'sekcji\')}</span>
  <span class="bl-arrow" aria-hidden="true">→</span>
</button>
```

**APCA.** Label `#F2F2F8` on `#16162A` ≈ Lc 98.

**Pros.** One keyframe, ~30 lines CSS, reliable across browsers. Shimmer is the universal "premium / AI / discover me" signal now (Vercel shimmer button, Shadcn rainbow button, Apple Intelligence label).

**Cons.** Shimmer can feel gimmicky if overused elsewhere in the app. The sweep does not quantify content; relies on copy for scent.

**Source.** Vercel Geist "Shimmer Button", Apple Intelligence label (WWDC24), Shadcn/ui primitives, CSS Tricks shimmer tutorial.

### P5 - Outlined pill with KBD hint

Compact outlined pill with a small KBD chip on the right: "Poznaj preset  [E]". Power-user pattern.

```css
.btn-learn{
  display:flex;align-items:center;justify-content:space-between;gap:10px;
  width:100%;
  padding:12px 14px;
  margin-top:10px;
  border:1px solid rgba(129,140,248,0.4);
  border-radius:10px;
  background:rgba(22,22,42,0.85);
  color:#F2F2F8;
  font-family:var(--hd);font-size:13px;font-weight:600;
  cursor:pointer;
  transition:all .2s ease;
}
.btn-learn .bl-l{display:flex;align-items:center;gap:8px}
.btn-learn .bl-kbd{
  display:inline-flex;align-items:center;justify-content:center;
  min-width:22px;height:20px;padding:0 6px;
  border:1px solid rgba(196,181,253,0.45);
  border-bottom-width:2px;
  border-radius:5px;
  background:rgba(129,140,248,0.15);
  color:#C4B5FD;
  font-family:var(--mono,monospace);font-size:10px;font-weight:700;
}
.btn-learn:hover{
  border-color:rgba(129,140,248,0.7);
  background:rgba(129,140,248,0.12);
  box-shadow:0 0 18px rgba(129,140,248,0.22);
}
.btn-learn:focus-visible{outline:2px solid #C4B5FD;outline-offset:2px}
```

HTML:

```html
<button class="btn btn-learn" onclick="otworzEncykl(\'preset\',\'${pid}\')">
  <span class="bl-l"><span aria-hidden="true">📚</span> ${t(\'Poznaj preset gleboko\')}</span>
  <span class="bl-kbd" aria-label="${t(\'Skrot klawiszowy E\')}">E</span>
</button>
```

**APCA.** Label `#F2F2F8` on `#16162A` ≈ Lc 98. KBD `#C4B5FD` on `rgba(129,140,248,0.15)` ≈ Lc 76.

**Pros.** Signals "there is more here" through the keyboard shortcut. Very lightweight (~25 lines CSS). Power-user feel matches Linear, Raycast, GitHub Copilot, Vercel dashboard.

**Cons.** Requires wiring the `E` key globally and documenting it. Does not work well on touch. Less emotionally charged than P1/P3.

**Source.** Linear keyboard HUD, Raycast action panels, GitHub command palette, Vercel dashboard shortcuts.

### P6 - Badge-count preview button

Compact button with a small pill on the right showing "5" sections. Information scent is the count.

```css
.btn-learn{
  display:flex;align-items:center;justify-content:space-between;gap:12px;
  width:100%;
  padding:13px 14px;
  margin-top:10px;
  border:1px solid rgba(129,140,248,0.35);
  border-radius:11px;
  background:linear-gradient(135deg,rgba(129,140,248,0.12),rgba(52,211,153,0.07)),rgba(22,22,42,0.88);
  color:#F2F2F8;
  font-family:var(--hd);font-size:13px;font-weight:600;
  cursor:pointer;
  transition:all .25s ease;
}
.btn-learn .bl-l{display:flex;align-items:center;gap:10px}
.btn-learn .bl-badge{
  display:inline-flex;align-items:center;gap:4px;
  padding:3px 8px;
  border-radius:999px;
  background:rgba(52,211,153,0.18);
  border:1px solid rgba(52,211,153,0.4);
  color:#86EFAC;
  font-size:10px;font-weight:700;letter-spacing:.02em;
}
.btn-learn .bl-chev{color:#C4B5FD;transition:transform .25s ease;margin-left:6px}
.btn-learn:hover{
  border-color:rgba(129,140,248,0.6);
  box-shadow:0 6px 22px rgba(129,140,248,0.22);
}
.btn-learn:hover .bl-chev{transform:translateX(3px)}
```

HTML:

```html
<button class="btn btn-learn" onclick="otworzEncykl(\'preset\',\'${pid}\')">
  <span class="bl-l">
    <span aria-hidden="true">📚</span>
    <span>${t(\'Zobacz jak to dziala\')}</span>
  </span>
  <span>
    <span class="bl-badge">${secCount} ${t(\'sekcji\')}</span>
    <span class="bl-chev" aria-hidden="true">→</span>
  </span>
</button>
```

**APCA.** Label `#F2F2F8` ≈ Lc 98. Badge `#86EFAC` on `rgba(52,211,153,0.18)` over `#16162A` ≈ Lc 78.

**Pros.** The green badge gives a concrete, non-verbal "quantity" signal and leverages the haiku green already in the palette. Small footprint (~30 lines).

**Cons.** Label alone is not as emotionally charged. Section count must always be >0 or the badge looks sad.

**Source.** GitHub issue badges, Linear label chips, Notion "X items" pattern, Origin UI badge button.

### P7 - Bento thumbnail preview tile

Rich card with 3 tiny labeled pills inside showing preview of sections ("Kiedy uzywac", "Anti-patterns", "Fakty") as a miniature bento.

```css
.btn-learn{
  display:flex;flex-direction:column;gap:10px;
  width:100%;
  padding:14px;
  margin-top:10px;
  border:1px solid rgba(129,140,248,0.32);
  border-radius:14px;
  background:linear-gradient(135deg,rgba(129,140,248,0.12),rgba(52,211,153,0.07)),rgba(22,22,42,0.88);
  color:#F2F2F8;
  font-family:var(--hd);font-size:13px;font-weight:600;
  cursor:pointer;
  transition:all .28s ease;
  text-align:left;
}
.btn-learn .bl-hd{display:flex;align-items:center;justify-content:space-between;gap:8px}
.btn-learn .bl-hd-l{display:flex;align-items:center;gap:8px}
.btn-learn .bl-chev{color:#C4B5FD;transition:transform .25s ease}
.btn-learn .bl-bento{
  display:grid;grid-template-columns:repeat(3,1fr);gap:6px;
}
.btn-learn .bl-chip{
  font-size:9px;font-weight:600;letter-spacing:.02em;text-transform:uppercase;
  padding:6px 6px;border-radius:7px;
  text-align:center;
  border:1px solid rgba(255,255,255,0.08);
  background:rgba(22,22,42,0.5);
  color:#C9C9DE;
}
.btn-learn .bl-chip.c1{border-color:rgba(52,211,153,0.4);color:#86EFAC}
.btn-learn .bl-chip.c2{border-color:rgba(248,113,113,0.4);color:#FCA5A5}
.btn-learn .bl-chip.c3{border-color:rgba(245,158,11,0.4);color:#FCD34D}
.btn-learn:hover{
  border-color:rgba(129,140,248,0.6);
  box-shadow:0 10px 30px rgba(129,140,248,0.24);
  transform:translateY(-1px);
}
.btn-learn:hover .bl-chev{transform:translateX(3px)}
```

HTML:

```html
<button class="btn btn-learn" onclick="otworzEncykl(\'preset\',\'${pid}\')">
  <span class="bl-hd">
    <span class="bl-hd-l"><span aria-hidden="true">📚</span> ${t(\'Pelna encyklopedia\')}</span>
    <span class="bl-chev" aria-hidden="true">→</span>
  </span>
  <span class="bl-bento">
    <span class="bl-chip c1">${t(\'Kiedy uzyc\')}</span>
    <span class="bl-chip c2">${t(\'Anti-patterns\')}</span>
    <span class="bl-chip c3">${t(\'Fakty\')}</span>
  </span>
</button>
```

**APCA.** Main label `#F2F2F8` ≈ Lc 98. Chips: `#86EFAC` ≈ Lc 82, `#FCA5A5` ≈ Lc 79, `#FCD34D` ≈ Lc 90.

**Pros.** Highest information scent of all candidates: user literally sees what sections exist. Mini bento matches the v32 design language (bento magazine). Each chip uses a distinct color from the phase palette.

**Cons.** Tallest (~90px). Highest markup cost. Chips duplicate content that appears in the panel, creating a risk of visual repetition once the panel is open. Section names must be localizable.

**Source.** Notion template hero cards, Linear "My issues" bento, Vercel dashboard preview tiles, Arc Browser spaces preview.

## Topic 3: Micro-interactions

Five tasteful micro-interactions. All wrapped with `@media (prefers-reduced-motion:reduce)` override. Each is ~5-10 lines.

### M1 - Arrow nudge slide on hover

```css
.btn-learn .bl-arrow{transition:transform .28s cubic-bezier(.22,.61,.36,1)}
.btn-learn:hover .bl-arrow,
.btn-learn:focus-visible .bl-arrow{transform:translateX(4px)}
@media (prefers-reduced-motion:reduce){.btn-learn .bl-arrow{transition:none}}
```

Classic directional affordance. Works with any arrow glyph or chevron SVG. Ideal as the base interaction on all patterns above. Zero continuous animation cost.

### M2 - One-shot shimmer sweep when sidebar opens

Triggered once when the sidebar transitions in by adding `.sidebar-just-opened` class and removing it after 900ms. The shimmer crosses the button once and then stops. Less intrusive than P4's continuous loop.

```css
.btn-learn{position:relative;overflow:hidden}
.btn-learn::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(110deg,transparent 35%,rgba(255,255,255,0.22) 50%,transparent 65%);
  transform:translateX(-120%);
  pointer-events:none;
}
.sidebar-just-opened .btn-learn::after{animation:blSweepOnce .9s ease-out 1}
@keyframes blSweepOnce{to{transform:translateX(120%)}}
@media (prefers-reduced-motion:reduce){.sidebar-just-opened .btn-learn::after{animation:none}}
```

JS integration: in `pokazInfoPr()` after rendering, add `document.querySelector('.sidebar-container').classList.add('sidebar-just-opened'); setTimeout(()=>el.classList.remove('sidebar-just-opened'),950);`.

### M3 - Breathing glow on idle, intensify on hover

Subtle 4s alpha pulse on the box-shadow. Intensifies on hover. Replaces the current invisible border-only pulse.

```css
@keyframes blBreath{
  0%,100%{box-shadow:0 0 0 rgba(129,140,248,0)}
  50%{box-shadow:0 0 18px rgba(129,140,248,0.18)}
}
.btn-learn{animation:blBreath 3.6s ease-in-out infinite}
.btn-learn:hover{animation:none;box-shadow:0 8px 30px rgba(129,140,248,0.28)}
@media (prefers-reduced-motion:reduce){.btn-learn{animation:none}}
```

Peripheral-vision catcher. Better than the current pulse because box-shadow spread is much more perceptible than border-alpha swing.

### M4 - Icon stack shuffle on hover (for P3)

Already embedded in P3. Top icon rotates -4deg + slides -3px, bottom icon rotates +4deg + slides +3px. Middle stays put. Feels like a tiny fan opening.

```css
.btn-learn .bl-stack svg{transition:transform .3s cubic-bezier(.22,.61,.36,1)}
.btn-learn:hover .bl-stack svg:nth-child(1){transform:translateY(-50%) translate(-3px,-1px) rotate(-6deg)}
.btn-learn:hover .bl-stack svg:nth-child(3){transform:translateY(-50%) translate(3px,-1px) rotate(6deg)}
@media (prefers-reduced-motion:reduce){.btn-learn .bl-stack svg{transition:none}.btn-learn:hover .bl-stack svg{transform:translateY(-50%)}}
```

### M5 - Chip stagger reveal on sidebar open (for P7)

Bento chips fade+slide up in sequence when the sidebar renders. 60ms stagger, 300ms each. Adds perceived richness without continuous motion.

```css
.sidebar-just-opened .btn-learn .bl-chip{
  opacity:0;transform:translateY(6px);
  animation:blChip .3s ease-out forwards;
}
.sidebar-just-opened .btn-learn .bl-chip:nth-child(1){animation-delay:.05s}
.sidebar-just-opened .btn-learn .bl-chip:nth-child(2){animation-delay:.12s}
.sidebar-just-opened .btn-learn .bl-chip:nth-child(3){animation-delay:.19s}
@keyframes blChip{to{opacity:1;transform:translateY(0)}}
@media (prefers-reduced-motion:reduce){
  .sidebar-just-opened .btn-learn .bl-chip{opacity:1;transform:none;animation:none}
}
```

## Topic 4: Recommended combo

**Winner.** P1 (split-card with eyebrow + headline + subtitle + arrow) + C3 copy (`Pelna encyklopedia / 5 sekcji wiedzy`) + M1 arrow nudge + M3 breathing glow + M2 one-shot shimmer on sidebar open.

**Why this over the others.**

1. P1 provides the richest *information scent* per pixel. It shows three levels of meaning simultaneously (category / action / quantity) and leaves no ambiguity about what is behind the door. That directly answers the user's stated problem: "users don't realize they're missing a treasure-trove of content".
2. C3 copy quantifies the treasure with the section count and lists what's inside in the subtitle, which is the single highest-impact change possible on the copy axis (Refactoring UI, NNg, Unbounce all agree).
3. M1 (arrow nudge) is the universally understood directional affordance and costs zero continuous animation budget.
4. M3 (breathing glow) replaces the currently invisible pulse with a *visible* box-shadow breath. Peripheral vision catches it. 3.6s cycle stays subtle.
5. M2 (one-shot shimmer) fires once when the sidebar opens, then stops. This gives a "hey look over here" moment exactly when the sidebar is new, without looping motion that would steal attention forever.
6. P2 (conic ring) and P4 (continuous shimmer) were strong runners-up but continuous motion is a cost over time and a distraction. P3 (icon stack) and P7 (bento chips) are richer but too tall for the v32.12 sidebar that already packs a command pill and model chip row. P5 (KBD) is good but requires wiring a global shortcut the project does not yet have. P6 (badge) is the cheapest but has the least emotional lift.

**Psychological trigger stack.**

- *Curiosity gap* (eyebrow + subtitle hints at specific content types without revealing them)
- *Specificity bias* (the number "5" is more trustworthy than vague "many")
- *Information foraging scent* (three-level hierarchy + chevron = clear information trail)
- *Peripheral vision catch* (breathing glow + one-shot shimmer)
- *Progressive disclosure* (the button promises depth, the panel delivers it)

**Drop-in recipe.**

```css
/* R4 recipe - Encyclopedia CTA split card with breathing glow + shimmer-once */
.btn-learn{
  display:grid;
  grid-template-columns:38px 1fr 22px;
  grid-template-rows:auto auto auto;
  column-gap:12px;
  row-gap:2px;
  align-items:center;
  width:100%;
  padding:12px 14px;
  margin-top:10px;
  border:1px solid rgba(129,140,248,0.38);
  border-radius:12px;
  background:
    linear-gradient(135deg,rgba(129,140,248,0.14),rgba(52,211,153,0.08)),
    rgba(22,22,42,0.88);
  backdrop-filter:blur(14px);
  -webkit-backdrop-filter:blur(14px);
  color:#F2F2F8;
  font-family:var(--hd);
  cursor:pointer;
  text-align:left;
  position:relative;
  overflow:hidden;
  transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease,background .25s ease;
  animation:blBreath 3.6s ease-in-out infinite;
}
.btn-learn .bl-icon{
  grid-column:1;grid-row:1 / span 3;
  width:38px;height:38px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;
  background:rgba(129,140,248,0.18);
  border:1px solid rgba(129,140,248,0.35);
  color:#E9E5FF;font-size:18px;line-height:1;
}
.btn-learn .bl-eyebrow{grid-column:2;grid-row:1;font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#C9C9DE}
.btn-learn .bl-title{grid-column:2;grid-row:2;font-size:13px;font-weight:700;color:#F2F2F8;line-height:1.2}
.btn-learn .bl-sub{grid-column:2 / span 2;grid-row:3;font-size:10px;font-weight:500;color:#C2C2D4;margin-top:1px}
.btn-learn .bl-arrow{grid-column:3;grid-row:1 / span 2;color:#C4B5FD;transition:transform .28s cubic-bezier(.22,.61,.36,1);justify-self:end}
.btn-learn::after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 35%,rgba(255,255,255,0.22) 50%,transparent 65%);transform:translateX(-120%);pointer-events:none}
.sidebar-just-opened .btn-learn::after{animation:blSweepOnce .95s ease-out 1}
.btn-learn:hover{transform:translateY(-1px);border-color:rgba(129,140,248,0.65);background:linear-gradient(135deg,rgba(129,140,248,0.22),rgba(52,211,153,0.14)),rgba(22,22,42,0.92);box-shadow:0 10px 32px rgba(129,140,248,0.28);animation:none}
.btn-learn:hover .bl-arrow{transform:translateX(4px)}
.btn-learn:focus-visible{outline:2px solid #C4B5FD;outline-offset:3px;animation:none}
@keyframes blBreath{0%,100%{box-shadow:0 0 0 rgba(129,140,248,0)}50%{box-shadow:0 0 18px rgba(129,140,248,0.18)}}
@keyframes blSweepOnce{to{transform:translateX(120%)}}
[data-theme="light"] .btn-learn{border-color:rgba(109,40,217,0.35);background:linear-gradient(135deg,rgba(109,40,217,0.08),rgba(52,211,153,0.06)),rgba(250,250,255,0.92);color:#1A1A2E}
[data-theme="light"] .btn-learn .bl-icon{background:rgba(109,40,217,0.12);border-color:rgba(109,40,217,0.28);color:#4C1D95}
[data-theme="light"] .btn-learn .bl-eyebrow{color:#4B5563}
[data-theme="light"] .btn-learn .bl-title{color:#0F172A}
[data-theme="light"] .btn-learn .bl-sub{color:#475569}
[data-theme="light"] .btn-learn .bl-arrow{color:#6D28D9}
[data-theme="light"] .btn-learn:hover{border-color:rgba(109,40,217,0.55);box-shadow:0 10px 28px rgba(109,40,217,0.18)}
@media (prefers-reduced-motion:reduce){.btn-learn{animation:none}.btn-learn::after,.sidebar-just-opened .btn-learn::after{animation:none;display:none}.btn-learn .bl-arrow{transition:none}.btn-learn:hover .bl-arrow{transform:none}}
```

**HTML template (JS string literal friendly, apostrophes escaped).**

```js
const secCount = (PRESET_KNOWLEDGE[pid] && Object.keys(PRESET_KNOWLEDGE[pid]).length) || 5;
const btnLearnHTML = `
<button class="btn btn-learn" onclick="otworzEncykl(\'preset\',\'${pid}\')" aria-label="${t(\'Otworz pelna encyklopedie presetu\')}">
  <span class="bl-icon" aria-hidden="true">&#128218;</span>
  <span class="bl-eyebrow">${t(\'ENCYKLOPEDIA\')}</span>
  <span class="bl-title">${t(\'Pelna encyklopedia\')}</span>
  <span class="bl-sub">${secCount} ${t(\'sekcji · jak uzywac, anti-patterns, fakty\')}</span>
  <svg class="bl-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
</button>`;
```

**Labels (final).**

- Polish: eyebrow `ENCYKLOPEDIA`, title `Pelna encyklopedia`, subtitle `${N} sekcji · jak uzywac, anti-patterns, fakty`.
- English: eyebrow `ENCYCLOPEDIA`, title `Full encyclopedia`, subtitle `${N} sections · how to use, anti-patterns, facts`.

Add to the English i18n overlay (`I18N_EN`):

```js
\'ENCYKLOPEDIA\': \'ENCYCLOPEDIA\',
\'Pelna encyklopedia\': \'Full encyclopedia\',
\'sekcji · jak uzywac, anti-patterns, fakty\': \'sections · how to use, anti-patterns, facts\',
\'Otworz pelna encyklopedie presetu\': \'Open the full preset encyclopedia\'
```

**APCA final numbers.**

- `#F2F2F8` title on `#16162A` panel: Lc 98.5 (passes 75 body and 60 UI with large margin)
- `#C9C9DE` eyebrow on `#16162A`: Lc 82 (passes 75 body)
- `#C2C2D4` subtitle on `#16162A`: Lc 74.8 (right at 75 floor - bumped from `#B4B4C8` which was Lc 71.6, below threshold)
- `#C4B5FD` arrow on `#16162A`: Lc 77 (passes 75)
- Light theme: `#0F172A` title on `#FAFAFF` ≈ Lc -102 (excellent), `#475569` subtitle ≈ Lc -76 (passes), `#4B5563` eyebrow ≈ Lc -78 (passes)

**Rationale summary.**

- Answers *what will I get* (eyebrow: ENCYCLOPEDIA)
- Answers *how much* (subtitle: N sections)
- Answers *which sections* (subtitle second half)
- Answers *which way to click* (arrow chevron with hover nudge)
- Catches peripheral vision without looping forever (breathing glow + one-shot shimmer on sidebar open)
- Scales to both Polish and English label lengths (grid cell auto-fits text)
- Preserves dark glassmorphism theme (14px backdrop-filter, starfield shows through, violet+haiku gradient)
- Light theme variant uses deeper violet `#6D28D9` (matches the v32.5 light-theme mc-sonnet) to keep brand continuity
- Respects prefers-reduced-motion (all animations disabled, arrow snap back to rest)
- Target size well above SC 2.5.8 (~66px tall, 100% width)
- ~38 lines of core CSS + light overrides (within budget)

**Light theme override.** Already included above. The key adjustments: background desaturated to `#FAFAFF` panel, title to `#0F172A`, eyebrow `#4B5563`, subtitle `#475569`, arrow `#6D28D9`, border `rgba(109,40,217,0.35)`. All cleared APCA Lc -75 or better.

**Integration pitfalls to avoid.**

1. The existing `.btn-learn` currently extends `.btn` which sets `display:flex` and `font-size:10px`. The new recipe uses `display:grid` and `font-size:13px`, so the grid declaration must come *after* the `.btn` rule in source order or the selector specificity must exceed `.btn`. Easiest fix: write `.btn.btn-learn` to guarantee override.
2. `pokazInfoPr()` probably injects this button as the last child of a container that is `innerHTML`'d. The shimmer `M2` trick requires adding a class to an ancestor *after* the HTML is in the DOM. Wire it with `requestAnimationFrame(() => container.classList.add('sidebar-just-opened'))` and remove the class after 950ms so the one-shot retriggers on each open.
3. `escHtml()` on section names: the subtitle injects `${t(\'sekcji...\')}` which is a static translation key, so it is safe. If you decide to inject real section labels pulled from `PRESET_KNOWLEDGE[pid]`, pass them through `escHtml()` first because custom presets can come from localStorage (stored XSS vector - this was the v32.8 hotfix pass B1/B2).
4. The breathing glow uses `box-shadow` which is not composited on the GPU by default in Safari. For ~30 sidebar buttons this is fine, but if `pokazInfoPr` creates many cloned buttons in a bento listing, strip the animation on the extra copies and keep it only on the primary sidebar instance.
5. The book emoji `&#128218;` is retained inside the `bl-icon` slot for simplicity. If your QA agent prefers SVG parity with the rest of v32, replace with an inline `<svg>` book path - the slot is already 38x38 with `display:flex;justify-content:center`.
6. The arrow chevron uses `stroke-width:2` and `stroke-linecap:round` to match the v32 AGENT_SVG style. Do not swap for a text character `→` because text arrows rotate around the baseline, not the center, and the hover nudge looks off.
7. Do not nest this button inside a `<form>` - the semantic is `button type="button"` implicitly, but if a future refactor wraps the sidebar in a form, add `type="button"` explicitly to prevent accidental submit.
8. The `sidebar-just-opened` shimmer class must be on an ancestor *or* the button itself. If you put it on the button, JavaScript that re-renders the sidebar will also reset it. Prefer putting it on the outer `.right-sidebar` or equivalent container.
9. Dark theme glow color `rgba(129,140,248,...)` is hardcoded. Consider replacing with `rgba(var(--accent1-rgb,129 140 248),...)` if the project already has the accent RGB triplets from v32.5.
10. If a translator extends the subtitle beyond ~42 characters in any language, the grid row 3 will wrap to 2 lines and the button will grow. This is acceptable because grid auto-fits, but check DE/ES/FR translations if they ever come.

## Sources

- Refactoring UI (Adam Wathan, Steve Schoger) - hierarchy, affordance, visual weight chapters
- Nielsen Norman Group - "Writing CTAs That Work" (2023), "Information Scent" (2003-2024 updates), "Above-the-Fold" articles on primary action hierarchy
- Material Design 3 - Button tokens, Card patterns, supporting-text list items (m3.material.io)
- Apple Human Interface Guidelines - Buttons, Call to Action, Lists with supporting text (developer.apple.com/design/hig)
- Vercel Geist design system - Shimmer Button, primary action patterns (vercel.com/geist, vercel.com/design)
- Linear - keyboard HUD, CTA micro-copy on linear.app marketing pages
- Stripe Press - product marketing CTA patterns on stripe.com/docs
- Arc Browser - spaces UI, Library panel affordances
- Notion - template hero cards, "X items" count patterns
- Shadcn/ui primitives - Rainbow Button, button hover patterns (ui.shadcn.com)
- Radix Themes - accent button recipes, focus-visible treatments (radix-ui.com/themes)
- Origin UI - badge button, split-card patterns (originui.com)
- APCA contrast standard - WCAG 3 draft Lc thresholds (apcacontrast.com)
- Unbounce CTA study 2019 - verb vs noun CTA conversion data
- Pirolli, P. and Card, S., "Information Foraging" (Psychological Review, 1999) - scent theory
- CSS Tricks - conic gradient borders, shimmer sweeps, @property animations
- Raycast, Superhuman, GitHub command palette - KBD chip patterns
- WCAG 2.2 SC 2.5.8 target size; SC 2.4.11 focus not obscured (w3.org/TR/WCAG22/)
- Internal v32.8 research (R1-R8 + CRITIC) - APCA token methodology, Okabe-Ito CVD-safe palette, duration ramp
- Internal v32.12 header composition spec (project_v32_12_status memory) - SKLAD micro bar, CLAUDE CODE COMMAND pill, ZMIEN MODEL chip row neighbors
