# v31 - Audit Edition (Security + Accessibility + Code Quality)

## Changes from v30

### Security Fixes
- **XSS: `escHtml()` for save names** - `x.name` from localStorage now escaped in `rZapisy()` preventing self-XSS
- **XSS: textarea breakout** - `nd.cp` in prompt editor textarea now escaped with `<`/`>` replacement
- **Safe localStorage helpers** - new `safeParseLS()` with try/catch + `safeSaveLS()` with QuotaExceededError handling
- **Export version fixed** - was hardcoded as `'25.0'` (copy-paste bug), now correctly `'31.0'`

### Accessibility (WCAG 2.2)
- **Skip link** - "Skip to canvas" link visible on focus (WCAG 2.4.1)
- **Screen reader announcer** - `#srAnnounce` with `aria-live="assertive"` for simulation start/stop, HITL gates (WCAG 4.1.3)
- **SVG `aria-hidden="true"`** - all agent and preset icons now hidden from screen readers (WCAG 1.1.1)
- **Focus visible indicators** - global `:focus-visible` styles for buttons, tabs, inputs, textareas (WCAG 2.4.7)
- **`html lang` attribute** - now updates dynamically on language switch (WCAG 3.1.1)
- **Keyboard-accessible palette** - `tabindex="0"` + `role="option"` + Enter/Space handlers on all agent and preset items (WCAG 2.1.1)
- **Improved contrast** - `--t2` lightened from `#71717A` to `#8B8B96` for reliable 4.5:1 ratio (WCAG 1.4.3)

### CSS Fixes
- **CRITICAL: Light mode Bento/Learn overlay** - 18 new light theme overrides for encyclopedia: `.learn-nav`, `.bento-card`, `.bento-hero-title`, `.bento-tag`, `.bento-table`, `.nd-speech` etc. Text was invisible on light backgrounds.
- **Dead CSS removed** - 19 lines of dead context menu CSS (V22, removed in V23), 7 dead `.ds-mdls`/`.ds-m` old model button rules, dead `.pi-badge` rule
- **Firefox scrollbar support** - `scrollbar-color`/`scrollbar-width` standard properties alongside `::-webkit-scrollbar`
- **Unused font weight removed** - `Inter:wght@300` removed from Google Fonts URL (never used, saves ~10-15KB)

### Code Quality
- **`safeParseLS()` / `safeSaveLS()`** - centralized localStorage access with error handling (was 5x unguarded JSON.parse)
- **`structuredClone()`** - replaces `JSON.parse(JSON.stringify())` for deep cloning nodes/conns (ES2022+)
- **`announce()` helper** - centralized screen reader announcements via `#srAnnounce`
- **`escHtml()` reusable** - HTML escaping utility for any user-provided string

### Bilingual Translation Fixes
- **getPrompt -> getAgentPrompt** - 5 calls to undefined `getPrompt()` function caused all agent clicks to fail with silent ReferenceError
- **Preset use/pros/cons in English** - added `presetUse`, `presetPros`, `presetCons` to I18N_EN + `getPresetUse()`/`getPresetPros()`/`getPresetCons()` getters
- **aktStatHTML() rewrite** - comprehensive function updating ~40 static UI elements on language switch (tabs, buttons, modals, status bar, HITL overlay, keyboard shortcuts)
- **Dynamic keyboard shortcuts** - replaced 12 hardcoded Polish rows with bilingual array-driven generation
- **~30 new I18N_EN.ui entries** - zoom controls, connection mode, simulation messages, HITL labels, modal buttons
- **Locale-aware dates** - save list and prompt use `en-US`/`pl-PL` based on current language
- **switchLang() simplified** - delegates all static updates to aktStatHTML(), then re-renders dynamic UI

### localStorage
- Key changed from `acV30` to `acV31`
- Theme: `acV31_theme`
- Language: `acV31_lang`

### Line count
- v30: 4454 lines
- v31: 4475 lines (+21 net: added a11y/security/light-mode, removed dead CSS)
