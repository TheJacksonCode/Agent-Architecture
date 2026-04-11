# FM5 Cien - Devil's Advocate

## The consensus I am attacking (50 words)

All 4 experts agree: "v32.8 is 90 percent shippable, just REVISE a few numbers (Sonnet Lc, backdrop-filter perf, WCAG 2.2) and ship the rest." Nobody said RESTART. Nobody said the MANIFEST might be solving the wrong problem. That shared politeness is the first thing I am going to attack.

## The questions nobody asked

1. **Does the user actually want a visual redesign at all?**
   - Why it matters: v32.7 shipped 2 weeks ago. 8 versions in v32.x series. The user might be on a treadmill of his own making.
   - Evidence the spec lacks: zero user research, zero usage telemetry, zero quote from Maciej saying "v32.7 feels wrong". The whole v32.8 justification is internal ("CRITIC.md found gaps"). A critic document is NOT a user signal.
   - Honest answer: v32.7 is probably fine for shipping. v32.8 exists because the research pipeline exists.

2. **Who is the paying customer for premium glass?**
   - Why it matters: this is a single HTML file on GitHub Pages for demo/education. Nobody is paying for Arc-grade refraction.
   - Evidence the spec lacks: no "success metric". What does "better" mean? Conversion? Engagement? GitHub stars? Nothing is named.
   - Honest answer: the customer is Maciej's portfolio. Which means v32.8 should optimize for "looks great in a tweet screenshot", not for 8-hour daily ergonomics.

3. **What breaks first when the user is offline on a plane?**
   - Why it matters: DD11 ships fonts via CDN. "single HTML file" philosophy is punctured.
   - Evidence the spec lacks: zero offline test plan. Pragmatyk flagged FOUT but nobody asked whether the file ID identity of "one file you can email" is now dead.
   - Honest answer: fonts-from-CDN means v32.8 is no longer portable. That is a bigger category shift than the authors realized.

4. **What is the baseline v32.7 number on the metrics v32.8 promises to beat?**
   - Why it matters: Analityk proposed 7 measurements. But v32.7 was never measured on any of those.
   - Evidence the spec lacks: no v32.7 Lighthouse, no v32.7 APCA spreadsheet, no v32.7 frame-time trace.
   - Honest answer: we will declare victory against a ghost. Any number v32.8 posts will look like "improvement" because there is nothing to compare against.

5. **Does the 6000x6000 SVG canvas even need to exist?**
   - Why it matters: every perf risk in the debate traces to "glass over 6000x6000 animated SVG". That canvas is a v14-era decision nobody has challenged in 18 versions.
   - Evidence the spec lacks: no reason given for 6000x6000. Viewport is ~1920x1080. Virtualization, off-screen culling, or shrinking to 2400x1600 were never considered.
   - Honest answer: probably 3x the canvas size is unused at any given time. The glass-perf crisis is self-inflicted.

6. **Why is there a simulation mode at all in a configurator?**
   - Why it matters: half the perf budget is consumed by Live Simulation. The tool's job is to GENERATE a prompt for Claude Code, not to animate fake agents talking.
   - Evidence the spec lacks: no metric on how often users trigger simulation vs copy-prompt.
   - Honest answer: simulation is a portfolio demo feature, not a utility feature. Maybe it should be an OPT-IN lazy-loaded module, not always-on.

7. **Why are all 4 experts Polish-speaking coastal-city professionals?**
   - Why it matters: the debate missed i18n-as-identity. Rzecznik mentioned PL string length but nobody asked about RTL, CJK, or German compounds.
   - Evidence the spec lacks: no German "Zusammenarbeitsprotokoll" test, no Arabic RTL mirror test.
   - Honest answer: v32.8 is PL+EN only and will stay that way. Fine, but state it explicitly as scope.

8. **Is "starfield is the motif" a user preference or a sunk-cost defense?**
   - Why it matters: every expert started with "starfield stays" as if it were a law. P1 pillar in MANIFEST literally reads "Starfield is the motif". Who decided that?
   - Evidence the spec lacks: no A/B, no mutlu user quote, no conversion data. Just Maciej's aesthetic from v13.
   - Honest answer: the starfield is load-bearing for mood, but it is also the single biggest perf risk, the worst a11y companion (contrast floor over animated dark void), and the reason backdrop-filter cost is even debated. Defending it unconditionally is tribal, not rational.

## Hidden assumptions

1. **"Premium = glass + blur + dark + violet".** Every expert accepted this aesthetic vocabulary without asking if it is 2023-era. Counter-framing: 2026 premium might actually be FLAT-LUXURY (solid surfaces, ultra-precise type, pastel accents, zero blur - see Linear 2026 refresh, the Raycast redesign, Notion AI). Glass is now the "default Apple knockoff" look. Counter is more useful because flat surfaces are cheaper to ship, more a11y-friendly, and more distinctive in 2026.

2. **"Okabe-Ito is the definitive CVD palette".** Analityk even used it as the anchor. Counter-framing: Okabe-Ito was designed for scientific charts on white paper in 2008. It maps poorly to dark-mode glass UIs because several anchors lose saturation on dark surfaces (see Sonnet Lc 34). Counter is more useful because a BESPOKE dark-mode CVD palette (e.g., the Material 3 dynamic CVD set) would actually solve the 5-tokens-fail problem at the root.

3. **"The right move is REVISE".** All 4 verdicts. Counter-framing: the right move may be SPLIT - ship two files: v32.8-lite (bug fixes + a11y + starfield polish, 1 week, low risk) and v32.9-canvas (the full glass/type/token overhaul, 3 weeks, measured). Counter is more useful because it delivers a safe ship THIS week and a premium ship NEXT month, instead of gambling both on one release.

4. **"The user will notice the retune".** DD10 assumes shifting Opus `#F59E0B -> #F5B042` is worth 8 versions of muscle memory. Counter-framing: the user may notice NOTHING except bug fixes. Counter is more useful because it suggests visible improvements (HUD, Context tab, rail collapse) produce more value-per-risk than invisible hex nudges.

5. **"Measurement comes in Phase H QA, not Phase C design".** All specs punt perf/APCA to later. Counter-framing: measurement BEFORE Build would save the 5 failing tokens and the glass-perf debate that this whole FM Protocol is consuming. Counter is more useful because we would not be debating Sonnet Lc 34 in a philosophy paper; we would already know the answer.

## The user who is missing

The 4 experts all spoke to "a designer-developer using the tool as a primary workflow". Missing:

**(a) The GitHub Pages tire-kicker on a slow 4G connection.** Someone clicks Maciej's portfolio link on mobile data. They see a blank page for 3-5s while fonts.googleapis.com + vercel.com serve fonts. Then a 500KB HTML file paints. Then starfield canvas boots. They leave before the first paint. DD11 (CDN fonts) + starfield-at-boot directly sabotages this user. The spec gives them NOTHING. Fix: inline critical CSS, lazy-load starfield canvas behind an IntersectionObserver, serve the page at under 100 KB first paint.

**(b) The user who only exports Mermaid and never touches the visual canvas.** Export-only users are the silent majority of a "configurator" tool. They don't care about backdrop-filter; they care that `generujMermaid()` still produces valid flowchart TD. The spec talks about visuals for 6000 lines and about Mermaid for zero. Fix: add an "export-first" mode that skips canvas rendering entirely and lands on the Mermaid/Prompt panel in 200 ms.

**(c) The Claude Code power user running this 8 hours a day.** Ergonomic failure mode: the starfield twinkles in their peripheral vision during deep work. The HUD severity flash lights up when they change a preset. They will Cmd+B the rail collapse, Cmd+Shift+S the starfield, and wish there was a "focus mode" that kills ALL animation, glass, and color except the canvas. The spec has no focus mode. Fix: add `data-focus="true"` mode that strips starfield + glass + accents down to a Linear-grade working view. This is a 20-line add that helps the heaviest user.

## The simplest thing that could work

~300 words, contrarian mode ON.

What if v32.8 is 70 percent accidental scope creep? Here is the ruthless cut:

**KEEP from v32.8:** the 4 HUD cells (CTX MAX is a genuine win, Cost Center is shipped in v32.4 already, user value is real), the Context tab in Cost modal, the WCAG 2.2 fixes (scroll-padding, target sizes, roving tabindex), and the 3 critical bug fixes (backdrop-filter kill-switch, remove `contain: layout`, sticky header blur removed).

**CUT from v32.8:** the entire token system rewrite, the Okabe-Ito phase remap, the Opus/Sonnet retune, the typography overhaul (Inter Variable weights 420/520/580/680, tracking +0.005em), the Google Fonts + Geist Mono CDN, the squircle orb redesign (20 px radius vs 50 percent circle), the glass dialect formalization (keep v32.7 blur values), the rail-collapse mode (DD18 is net-new UX state), the P3 progressive enhancement block, the scroll-driven sidebar headers, the View Transitions API rewrite, the `@starting-style` choreography, the specular pointer-reactive glass.

**Why this works:** v32.7 already has a starfield, glass sidebars, violet Sonnet, and phase colors that MOSTLY work. The ACTUAL user complaints driving v32.8 (as best we can infer from MANIFEST/CRITIC) are: (a) Sonnet and debate are too similar, (b) backdrop-filter perf is scary, (c) a11y gaps exist. All three can be fixed in a 200-line patch over v32.7. The rest is a designer-system exercise disguised as a user release.

**What you lose:** the portfolio screenshot moment. Maciej's tweet would say "v32.8 ships CTX HUD and WCAG 2.2" instead of "v32.8 is the premium glass redesign". Less Instagrammable.

**What you gain:** a ship date this week, zero perf regression, zero a11y regression, and the full glass redesign moves to v33 where it gets the breathing room to be measured first, debated second, and shipped third.

## What I would actually ship (honest take, 150 words max)

Honest recommendation: REVISE with scope discipline. Ship v32.8 as planned for tokens + glass + typography, BUT:

1. Adopt Pragmatyk's `data-glass="solid"` kill-switch (non-negotiable perf safety net).
2. Adopt Analityk's APCA measurement gate: Sonnet must clear Lc 60 OR switch to `#A78BFA` range blue-shifted OR be demoted to border/glyph accent only.
3. Adopt Rzecznik's 3 WCAG 2.2 fixes (2.4.11 scroll-padding, 2.5.8 target sizes, roving tabindex) - non-negotiable.
4. DEFER Innowator's View Transitions + liquid glass refraction + pointer parallax to v32.9. These are optional cream, not base.
5. CUT rail-collapse (DD18), P3 enhancement block, squircle orbs. Three net-new scope items with no user signal.
6. PRESERVE v32.7 Opus hex `#F59E0B` exactly. Harmonize by shifting research, not muscle-memory Opus.

Ship in 5-7 days, not 10.

## Open questions the Syntetyk MUST address

1. **Sonnet violet retune: (a) shift to `#A78BFA` blue-shifted, (b) keep `#8B5CF6` but demote to border/glyph-only in chips, or (c) RESTART color system with bespoke dark-mode CVD palette?** Binary between a/b, trichotomy including c.

2. **Opus gold: (a) retune to `#F5B042` per DD10, or (b) preserve v32.7 `#F59E0B` exactly?** Binary.

3. **Rail-collapse mode DD18: (a) ship in v32.8 with visible chevron and Cmd+B shortcut, (b) defer to v32.9, or (c) cut permanently?** Trichotomy.

4. **Font loading: (a) CDN as specced, (b) CDN + inline critical fallback with `.fonts-failed` class, or (c) drop fonts entirely and commit to system-ui?** Trichotomy. C is the honest "single file" answer.

5. **Perf kill-switch `data-glass="solid"`: (a) user-toggleable only, (b) auto-enable on first-paint budget breach via rAF probe, or (c) not shipped?** Trichotomy. B is the safest.

6. **Squircle orb redesign (50 percent -> 20 px radius): (a) ship, or (b) defer?** Binary. Identity change.

## Closing (50 words)

**Verdict: REVISE with cuts.** The spec is premium but scope-creeping into a hidden v33. Keep the disciplined parts (token system, a11y fixes, HUD, perf kill-switch, APCA gate). Cut the speculative parts (rail mode, P3 block, squircle, View Transitions). Ship what is measured, defer what is imagined.
