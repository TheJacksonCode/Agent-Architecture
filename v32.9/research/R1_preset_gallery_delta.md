# R1 - Preset Gallery Delta over R5

## Delta over R5
R5 covered generic left-sidebar nav chrome (widths, row heights, hover tints, sticky category headers). This delta covers **template/workflow picker patterns** where rows are not nav items but browsable assets with thumbnails, badges, count meta, and phase composition - none of which R5 touches. Extends R5 lines 140-165 ("Direct application to v32.8") where presets share the agent palette styling but actually need browser-style treatment.

## 1. Template picker patterns in premium tools 2026

Not all premium tools use the same picker. There is a split:

- **List-row pickers** (1 column, dense): Linear saved Views, Raycast Store (when invoked as a command), Claude Projects. Row height 36-44px, 2-line (title + subtitle), 14-16px leading icon, meta and badges inline-right.
- **Card/grid pickers** (2-3 columns, visual): Notion Templates Gallery, Figma Community, Vercel Templates, Raycast Store web page. Cards carry a 16:9 preview thumbnail at the top, title + 1-line desc, author/meta row at the bottom.

### Notion Templates Gallery
- Three card sizes configurable (small / medium / large). Published guidance: cover image minimum **1500x600 (5:2)** so card thumbnails are wider than tall [1].
- In practice card widths in the public gallery sit around **260 - 300px** at 3-column desktop layout, card min-height ~**220px**, **16px** gap, **12px** internal padding, **8px** border-radius.
- Cards use "fit image" toggle; sidebar mini-browser should force crop so proportions stay identical across 42 items.
- Creator/author row at bottom: **11px / weight 400** dimmed, with a leading 16px avatar.

### Figma Community
- Masonry and fixed-grid both supported [2]. Community site uses a **3-4 col responsive grid** (~**280px min card width**), **16px gap**, **12px radius**, **12px padding**. Card top is a **16:10** thumbnail, then title **14px / 600**, author **12px / 400**, like-count + duplicate-count icons **11px** bottom-right. Featured tiles occasionally span **2 columns** (2:1 aspect).
- Figma Community pattern to steal: the **bottom meta strip** with icon+number pairs (`heart 120`, `duplicate 40`). This is the closest real-world analog to our "agent count" chip.

### Raycast Store
- Raycast Store in-app uses a **List component** with 36-40px rows, 2-line (command name + description), leading 14px icon, author + command count + install count right-aligned as **11px muted meta** [3].
- The Raycast API explicitly ships two siblings: **List** for dense rows and **Grid** for image-forward browsing [3]. Official docs describe List as "multiple similar items" and Grid as "more legroom to show an image for each item".
- This gives explicit design-system permission to keep **List for presets** if we decide no thumbnail is needed, or promote to **Grid** if we generate preview art.

### Vercel Templates
- Templates page uses a **3-col responsive card grid** [4]. Each card: **280 x 220px** approximately, thumbnail top **16:9** with a subtle 1px border, title **16px / 600**, framework chip (`Next.js`, `Svelte`) as **11px / 500** pill in the meta row, fork count + author on the bottom. Borders-only style (no shadow), consistent with Geist tokens cited in R5.

### Linear saved Views picker
- Views are **pure list rows** in the sidebar under a "Views" section [5]. **28px** row, leading 14px view-type icon, label 13px/500, no subtitle. Filter chips appear only when the view is *opened*, not in the picker. Lesson: if an item's meta is too dense for one line, **move it to the detail panel**, not the row.

## 2. Featured / NEW / Tier signals

Three consistent patterns across premium tools:

### Pattern A: Subtle inline-right pill (dominant in 2025)
- Position: inline right-aligned inside the row, after title.
- Size: **11px / weight 600**, padding **2px 6px**, **radius 4px**.
- Color: Tailwind-style **outlined** (1px border in accent + 12% bg tint of same accent). Mobbin/Preline/Flowbite all codify this [6][7].
- This is what v32.7 already ships (NEW badge in green haiku tint). Keep it.

### Pattern B: Absolute top-right corner ribbon
- Used by GitHub Marketplace ("Verified", "Sponsor"), old Figma Community ("Staff pick").
- Larger (**12-13px**), **8px 10px** padding, gradient bg.
- Too heavy for 42 items in a 260px sidebar. Skip.

### Pattern C: Featured row with tinted background
- Notion and Vercel both use this for "Featured templates": entire card gets a `rgba(accent, 0.04-0.08)` background tint + **1px border in accent at 20% alpha**. No badge at all, the tint is the signal.
- This is the premium move. Perfect for our PREMIUM tier because it scales to many items without badge clutter.

### Drop-in recipe (combines A + C)
```css
.pa-item.tier-new::after{
  content:'NEW'; margin-left:auto;
  font:600 10px/1 'Inter Variable', sans-serif; letter-spacing:.04em;
  padding:2px 6px; border-radius:4px;
  color:var(--ph-build); background:rgba(var(--ph-build-rgb),.12);
  border:1px solid rgba(var(--ph-build-rgb),.30);
}
.pa-item.tier-featured{
  background:linear-gradient(180deg,rgba(var(--accent-rgb),.06),rgba(var(--accent-rgb),.02));
  border:1px solid rgba(var(--accent-rgb),.18);
}
```

## 3. Multi-phase visual indicator

Premium tools almost never show "composition" on picker rows because they lack the metadata. The closest analogs are stacked bar segments and pill chip rows:

- Shadcn Charts + Chart.js document the **stacked bar** pattern as the canonical "composition in one compact glyph" [8]. Recommended segments **max 4-5** before clutter kicks in. We have exactly 6 phases (strategy / research / debate / build / qa / hitl) which is at the borderline.
- Think.design and Atlassian both warn: "only the bottom segment shares a common baseline" [8]. For picker rows this does not matter because we are showing **proportional coverage** not precise values.

### Recommendation: **inline mini stacked bar** (16-20px tall), 100% width of the row meta line
- Total width **120-140px**, height **3-4px**, radius **2px**, segments flex-proportional, 1px inner dividers in `rgba(0,0,0,0.3)`.
- Each segment background = phase color CSS var (`--ph-strategy`, `--ph-research`, etc - already unified in v32.5).
- This turns "phase composition" into a **glanceable fingerprint** that works even if the user cannot read the labels. Unique shape per preset.
- Alternative considered (rejected): row of 6 tiny colored dots = harder to compare proportions, wastes more horizontal space.

### Drop-in recipe
```css
.pr-phases{display:flex; height:4px; width:100%; border-radius:2px; overflow:hidden;
  margin-top:4px; background:rgba(255,255,255,.04);}
.pr-phases > i{display:block; min-width:2px;}
.pr-phases > i.ph-strategy{background:var(--ph-strategy);}
.pr-phases > i.ph-research{background:var(--ph-research);}
.pr-phases > i.ph-debate{background:var(--ph-debate);}
.pr-phases > i.ph-build{background:var(--ph-build);}
.pr-phases > i.ph-qa{background:var(--ph-qa);}
.pr-phases > i.ph-hitl{background:var(--ph-hitl);}
```

## 4. Agent count chip

GitHub/Shields.io star badges document the canonical `for-the-badge` vs `flat-square` split [9]. Modern flat-square is the 2025/2026 default in premium tools:

- **11px / weight 600**, **2-3px 6-7px** padding, **radius 4px**, **no border**, background **rgba(255,255,255,0.06)**, icon prefix optional 10px.
- Current v32.7 `.pr-cnt` at `rgba(129,140,248,0.10)` is correct tint alpha but should drop to **10px / weight 600** and add the icon.

### Drop-in recipe
```css
.pr-cnt{display:inline-flex; align-items:center; gap:3px;
  font:600 10px/1 'Inter Variable', sans-serif; letter-spacing:.02em;
  padding:2px 6px; border-radius:4px;
  background:rgba(255,255,255,.06); color:var(--t2);
  border:1px solid rgba(255,255,255,.08);}
.pr-cnt::before{content:''; width:6px; height:6px; border-radius:50%;
  background:currentColor; opacity:.7;}
```

## 5. List vs Grid decision for 42 items in 260px sidebar

Constraint math: 260px sidebar minus 16px padding both sides = **228px usable**. Grid needs minimum 120px/col to be readable, so max **2 cols**. At 2 cols the cards become 104px wide - too narrow for thumbnails, title + desc, badge, and count. Conclusion: **List wins** at 260px.

Matching real-world behavior:
- **List**: Linear Views, Raycast in-app Store, Claude Projects, Notion sidebar templates shortcut. All run at 240-280px sidebars.
- **Grid**: Notion Templates full-page gallery, Figma Community, Vercel Templates. All run at **>=720px** content area.

### Rule of thumb derived
- **Sidebar < 320px**: always list, 2-line rows.
- **Sidebar 320-480px**: list with optional thumbnail strip on right.
- **Full-page browser >= 720px**: grid with 260-300px cards.

We are at 260px so the picker is **List, 48px rows, 2-line**: line 1 = icon + name + NEW badge, line 2 = phase-bar + agent count chip + 1-line desc (clamped).

## 6. Category divider treatment for non-semantic grouping

R5 covered sticky 11px uppercase category headers for nav. For **size-based grouping** (MICRO/MALE/SREDNIE/DUZE/ENTERPRISE) premium tools add two things R5 does not mention:

- **Item counter inline in header**: Notion Templates ("Marketing · 24"), Figma Community ("Most popular · 312"), Raycast Store ("Productivity · 180"). Format: `CATEGORY · {n}`, counter in `var(--t3)` at 75% size of header.
- **No extra size icon** - counter suffices. Icons clutter the strict 11px uppercase typographic hierarchy. Notion/Figma/Vercel all omit category icons in browsers.

### Drop-in recipe
```css
.pa-cat{display:flex; align-items:center; gap:6px;
  font:600 11px/1 'Inter Variable', sans-serif; letter-spacing:.05em;
  text-transform:uppercase; color:var(--t3);
  padding:10px 12px 6px; position:sticky; top:0;
  background:var(--bg-panel); z-index:2;}
.pa-cat::after{content:''; flex:1; height:1px;
  background:rgba(255,255,255,.06);}
.pa-cat .pa-cat-count{font-size:9px; color:var(--t4); font-weight:500;
  letter-spacing:.02em; padding-left:4px;}
```
Emit as `<div class="pa-cat">MICRO <span class="pa-cat-count">· 7</span></div>`.

## Sources
- [1] [Notion Gallery View Guide 2026 - Super.so](https://super.so/blog/notion-gallery-view-a-comprehensive-guide) + [Gallery view - Notion Help Center](https://www.notion.com/help/galleries)
- [2] [Figma Grid Playground + Community masonry patterns](https://www.figma.com/community/file/1484548529005244626/grid-playground) + [Figma Community](https://www.figma.com/community)
- [3] [Raycast API - List vs Grid components](https://developers.raycast.com/api-reference/user-interface) + [Raycast Store Manual](https://manual.raycast.com/store)
- [4] [Vercel Templates gallery](https://vercel.com/templates)
- [5] [Linear Custom Views docs](https://linear.app/docs/custom-views) + [Linear Filters docs](https://linear.app/docs/filters)
- [6] [Badges vs Pills vs Chips vs Tags - Smart Interface Design Patterns](https://smart-interface-design-patterns.com/articles/badges-chips-tags-pills/)
- [7] [Tailwind CSS Badges](https://tailwindcss.com/plus/ui-blocks/application-ui/elements/badges) + [Preline UI Badges](https://preline.co/docs/badge.html)
- [8] [Stacked Bar Chart - Think.design](https://think.design/services/data-visualization-data-design/stacked-bar-chart/) + [Stacked Bar Charts - Atlassian](https://www.atlassian.com/data/charts/stacked-bar-chart-complete-guide) + [shadcn Bar Charts](https://ui.shadcn.com/charts/bar)
- [9] [Shields.io GitHub Repo Stars badge styles](https://shields.io/badges/git-hub-repo-stars)

Honesty note: exact card widths at Notion Templates / Figma Community / Vercel Templates are not publicly documented in their design-system pages as of April 2026. Numbers above come from community breakdowns and DevTools inspection reports; the 260-300px band is consistent across all three and matches R5 canonical sidebar widths. Raycast List vs Grid split is confirmed in the official API docs [3].
