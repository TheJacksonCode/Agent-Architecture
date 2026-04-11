# H1 QA Security - v32.8

## Verdict: GO-WITH-FIXES
## Score: 5/10

One HIGH-severity systemic XSS class affecting the Custom Agent pipeline
(user-controlled `name`/`role`/`tools` flows into `innerHTML` in ~10 call sites
without `escHtml`). Creator preview, CBM breakdown table and MD/JSON exports
are clean. View Transition recursion guards are correctly implemented in all
4 wrappers. Clipboard, modals and localStorage parsing are safe. No eval /
no external links / no window.open / no inline event injection.

---

## CRITICAL (must fix before ship)
_None._

## HIGH (should fix in v32.8)

1. **XSS via Custom Agent `name` rendered unescaped into canvas + palette + sidebars**
   User input stored in `agent.name` (zapiszCustom line 6595) is written to
   `innerHTML` via `getAgentName()` at:
   - `AGENT_TEAMS_CONFIGURATOR_v32_8.html:5242` — `rPalete` palette item name+desc
   - `AGENT_TEAMS_CONFIGURATOR_v32_8.html:5307` — `rWez` canvas node label
   - `AGENT_TEAMS_CONFIGURATOR_v32_8.html:5410` — `pokazWezel` sidebar `<h4>`
   - `AGENT_TEAMS_CONFIGURATOR_v32_8.html:5431-5432` — connection rows
   - `AGENT_TEAMS_CONFIGURATOR_v32_8.html:5449` — `pokazDef` palette detail
   - `AGENT_TEAMS_CONFIGURATOR_v32_8.html:5888` — `addDTLMsg` dialog timeline
   - `AGENT_TEAMS_CONFIGURATOR_v32_8.html:6313` — clone dropdown `<option>`
     (user name inside `>...</option>` - closable via `</option><script>`)
   - `AGENT_TEAMS_CONFIGURATOR_v32_8.html:6689` — `fpRich` Final Prompt section name
   Repro: create custom agent named `<img src=x onerror=alert(1)>`, drop on
   canvas -> fires on render. Persisted to localStorage so XSS reloads on startup.
   **Fix**: wrap every `getAgentName(...)`/`getAgentDesc(...)` that goes into
   innerHTML with `escHtml(...)`. Same treatment for `d.role` / `nd.cp` usage.

2. **XSS via Custom Agent `tools` chip rendering**
   `d.tools.split(',').map(tool=>'<span class="ds-tool-chip">'+tool.trim()+'</span>')`
   at `AGENT_TEAMS_CONFIGURATOR_v32_8.html:5412` and `:5450`.
   Tools from the checkbox UI are trusted, BUT the MD importer at
   `:6559` calls `setKreatorTools(meta.tools)` which splits on `,\s*` and only
   matches checkboxes (safe), however a localStorage-crafted `tools` string
   survives `ladujCustomAgentow` and hits innerHTML directly. An attacker
   with DevTools access to `acV32_8_custom` JSON can persist XSS across
   reloads (shared browser / polluted profile scenario).
   **Fix**: `escHtml(tool.trim())`.

3. **Mermaid export string injection via custom name**
   `AGENT_TEAMS_CONFIGURATOR_v32_8.html:6296`:
   `l.push('  '+n.id+'["'+getAgentName(d.id)+' ['+n.model+']"]')`
   A custom name containing `"` or `]` breaks the node label; containing
   `"] click n1 "javascript:alert(1)"` in Mermaid's live editor triggers
   click-handler injection when the diagram is pasted into mermaid.live.
   Not an in-app XSS but an exfil vector via copy-paste.
   **Fix**: strip `"`, `[`, `]`, `{`, `}`, backticks and newlines from name
   before templating, or use quoted-string escape `name.replace(/"/g,'#quot;')`.

4. **CSV formula injection in `buildCostCSV`**
   `AGENT_TEAMS_CONFIGURATOR_v32_8.html:5805-5809`.
   Custom agent name starting with `=`, `+`, `-`, `@`, `\t`, `\r` executes
   as formula when the CSV is opened in Excel / LibreOffice / Google Sheets
   (CWE-1236). Current escaping only wraps commas, not leading sigils.
   **Fix**: prefix `'` to any cell starting with `[=+\-@\t\r]`, and also
   escape embedded `"` via `"" ` doubling. Same applies to `d.phase` / model
   when those become user-controllable later.

5. **Markdown injection via custom name in `buildCostMD` / final prompt MD**
   `AGENT_TEAMS_CONFIGURATOR_v32_8.html:5802`. Names containing `|`,
   `[foo](javascript:alert(1))`, `![img](x)` corrupt the MD table and
   create executable links when pasted into Notion/GitHub PR.
   **Fix**: escape `|` to `\|`, newlines to space, and replace `[` `]` with
   unicode fullwidth before emitting.

## MEDIUM (defer to v32.9 OK)

6. **Modal backdrop click does not close modals**
   None of `moC`, `moCost`, `moM`, `moP`, `moE`, `moI`, `moK` have a
   click-on-backdrop-to-close handler. Escape works (:6948) but pattern
   inconsistency with Encyclopedia overlay is a UX risk. No security
   impact since no focus escapes.

7. **Escape closes ALL open modals at once**
   `:6948` does `document.querySelectorAll('.mo.show').forEach(m=>classList.remove('show'))`.
   If nested modals are ever introduced (e.g. HITL inside Creator), one
   Escape collapses the whole stack. Today only one modal opens at a time,
   so no active bug - flag for v32.9 refactor to a stack.

8. **No focus trap in any `.mo` modal**
   Tab escapes the modal box into the canvas behind. `role="dialog"` and
   `aria-modal="true"` are declared but not enforced. Not a security hole
   per se, but WCAG boundary. (H2 a11y scope strictly, flagging because
   it intersects focus-theft attacks via hidden buttons on the canvas.)

9. **localStorage trust boundary**
   `safeParseLS` (`:5266`) catches malformed JSON but does NOT validate
   schema. `ladujCustomAgentow` (`:6617`) spreads arbitrary fields into
   `AD.push(a)`, so an attacker with localStorage write (extension,
   shared machine) can inject arbitrary `name/role/prompt/tools/iconRef`
   including event-handler payloads. Combined with HIGH-1 this is the
   persistence vector.
   **Fix**: whitelist fields, validate `model in [opus,sonnet,haiku]`,
   validate `phase in PHASES`, reject if `name.length > 60`, strip tags.

## LOW / Notes

- `<a href="https://fonts.googleapis.com">` preconnect has no `rel="noopener"`
  but `<link>` elements are not affected by the reverse-tabnabbing issue.
  OK as-is.
- `pokazToast` (`:6075`) correctly uses `textContent`. Clean.
- `addDTLMsg` sim `msg` strings are trusted narrative templates, not user
  input. OK.
- `generujPrompt` (`:6641`) writes to `<textarea>.value` (safe DOM property),
  not innerHTML. Clean.
- `importujMdPlik` (`:6545`) writes all fields via `.value` setters. Clean.
- Starfield canvas (`:6957`) draws geometric stars only, no fillText. Clean.
- `zapiszKfg` saved config `name` (`:6632`) IS escaped in `rZapisy` (`:5268`)
  via `escHtml(x.name)`. Clean — confirms the pattern; HIGH-1 is a
  regression from forgetting to apply it elsewhere.
- View Transition recursion guards verified clean at:
  `pokazCostBreakdown` (5624), `pokazMermaid` (6297), `otworzKreator` (6570),
  `otworzEncykl` (6725). Each checks `!_vt && document.startViewTransition`
  and recurses with `1` flag. No infinite loop possible.
- Clipboard API: all 5 `navigator.clipboard.writeText` calls have `.catch()`
  handlers (lines 2161, 2180, 5832, 6659, 6660). Clean.
- No `eval`, `new Function`, `setTimeout(string,...)`. Clean.
- No `window.open` / no `target="_blank"` external links. Clean.

## OK (verified clean)

- View Transitions recursion safety
- Clipboard error handling
- localStorage JSON parse guards (try/catch present)
- MD file import (form-value path)
- Final prompt textarea generation
- Saved-config name escaping (reference pattern)
- Starfield canvas (no user data)
- No eval/Function/inline-script-injection
- No open-redirect / tabnabbing vectors
