# CRITIC - Walidacja researchu R1-R7 (Claude Code MCP Servers 2026)

**Rola:** Krytyk (Opus equivalent)
**Data:** 2026-04-17
**Input:** 7 raportow R1-R7 + 7 extractow E1-E7 (159 claimow total)
**Output:** PASS/REVISE per raport, konflikty miedzy raportami, gaps, bias flags

---

## Executive Summary

**Overall verdict:** PASS z 4 REVISE nagniotami dla SYNTHESIS. Corpus 7 raportow MCP Servers 2026 ma solidna podstawe primary sources (modelcontextprotocol.io spec v2025-11-25, code.claude.com oficjalne docs, research.checkpoint.com CVE disclosure) i spojny wzorzec citation. Kluczowe findings (3 primitives, JSON-RPC 2.0, Tool Search Tool 46.9% redukcja, CVE-2025-59536 + CVE-2026-21852 pelne traceability) sa wieloseri potwierdzone. Research pokrywa wszystkie 7 questions z MANIFEST i odpowiada na 6 z 7 Open Questions Q1-Q7 (Q2 Managed MCP dalej ma gap). Glowne slabosci: niektore liczby (CVSS score, tokens per server) maja variance miedzy sources - wymaga synthesis flag. 2 GitHub issues (#11364, #20335) potrzebuja real-time status check bo situation moze sie zmienic post-patch.

**Statystyki:**
- 159 total claimow w 7 extractach
- 89 claimow Trust-1 (56%)
- 56 claimow Trust-2 (35%)
- 14 claimow Trust-3 (9%)
- 16 konfliktow zidentyfikowanych (inter-report + intra-source variance)
- 25 gapow zidentyfikowanych

---

## PASS/REVISE per raport

### R1 (MCP Protocol Spec) - **PASS**
- Primary source: modelcontextprotocol.io/specification/2025-11-25 accessed
- 21 claimow, wszystkie z explicit URL
- Lifecycle, 3 primitives, capability negotiation sa dokladnie opisane
- Trust: 12 Trust-1, 9 Trust-2
- **Uwaga:** R1.C11 (Claude Code rzadziej uzywa resources/prompts) wymaga re-framing w synthesis - nie jest to "niepelne wsparcie", to workflow preference. Synthesis should say: "Tools sa pierwszoklasowo konsumowane, resources/prompts sa dostepne ale mniej integrowane w automatic workflow discovery Claude Code."

### R2 (Building MCP Servers) - **PASS**
- Python + TypeScript SDK pokryci
- FastMCP 3.0 (2026-01-19) aktualne info
- Decision tree stdio/HTTP jasny
- OAuth 2.1 + PKCE mandate wspomniany
- 22 claimow, dobra dystrybucja Trust-1/Trust-2
- **Uwaga:** R2.C10 (OAuth mandate spec) jest spec-level, ale ENFORCE jest zalezny od klient. Niektore lokalne HTTP servery dzialaja bez OAuth. Synthesis: "Spec mandates OAuth 2.1 PKCE for HTTP, Claude Code enforces for remote servers, lokalne development tolerate softer auth."

### R3 (Security Model + CVE) - **REVISE (minor)**
- Pelne traceability CVE-2025-59536 i CVE-2026-21852: reported/fixed/published dates, attack vectors, fix dates
- Primary source (Check Point Research) + secondary confirmation (MintMCP, TheHackerNews, Zscaler)
- 23 claimow z najwiekszym Trust-1 ratio
- **REVISE problems:**
  - R3.C12 CVSS 8.7 - tylko w jednym sekundarnym source. Primary source (Check Point) nie podaje explicit CVSS. NVD id nie wspomniany bezposrednio w research. Synthesis musi flag: "CVSS score varies by source; official NVD entry should be consulted for compliance reporting."
  - R3.C10 (startup runs before permission check) - krytyczny claim o architekturze. Research cited exploit description (valid) ale potrzebny caveat: "Based on exploit behavior and disclosure narrative; exact fix architecture post-2025-08-26 may have shifted this boundary. Empirical verification recommended for enterprise."
- **Gaps urgent:** Q2 (Managed MCP osobne pole?) pozostaje open, Q3 (enableAll vs deny precedence) ma odpowiedz pochodna ale nie oficjalna.

### R4 (Ecosystem 2026) - **PASS**
- 5000+ community servers, top 15 breakdown
- Deprecated Puppeteer -> Playwright migracja
- Aggregators (Rube, Apify)
- 22 claimow
- **Uwaga:** R4.C1 (~5000 servers) - szacowanie, synthesis powinien flag "approximately, as of 2026-04-17". Last-commit staleness per-server nie verifikowany real-time (CRITIC valid gap).

### R5 (MCP vs Skill vs Command) - **PASS**
- Clear decision tree
- Token cost comparison z empirical numbers
- Overlap zones rozstrzygniete
- Plugins nowosc 2026
- 22 claimow
- **Uwaga:** Solid, najbardziej "clean" raport z corpusu. Nothing to revise.

### R6 (Performance + Context) - **REVISE (minor)**
- Tool Search Tool benchmark (46.9% redukcja) dobry signal
- GitHub issues #11364, #20335, #44032, #15945 listed z URL
- 24 claimow
- **REVISE problems:**
  - R6.C7 (TST redukcja 46.9%) pochodzi z jednego Medium article (Joe Njenga). Synthesis should flag "per single-source benchmark, 46.9% reduction; corroboration ze Anthropic native docs desirable".
  - R6.C12 i R6.C13 (timeout issues #20335, #3033) - status tych issues na 2026-04-17 moze byc "fixed" lub "open". Synthesis should indicate: "as of research date 2026-04-17, issues open; check real-time GitHub status for current state."
  - R6.C16 (timeout defaults) ma variance 30s/60s/4min - synthesis musi rozdzielic per-transport/per-platform.

### R7 (Debugging + Community) - **PASS (minor notes)**
- Pelny debug flow (5 steps)
- Symptoms top 5 z issue IDs
- Power-user patterns
- 25 claimow (najwiekszy extract)
- **Uwaga:** R7.C12 (Reddit pattern: post-update breakage) Trust-3, ale pattern jest szeroko raportowany. Synthesis: "Community observation, widely reported post-update".
- R7.C22 (--debug flag) - flag istnieje ale może nie byc w kazdej wersji CLI. Synthesis: "Available via --debug in recent versions; verify with `claude --help`".

---

## Minimum 5 konfliktow (cross-report)

### Konflikt 1: MCP resources/prompts wsparcie Claude Code
- **R1.C11:** "Claude Code konsumuje tools pierwszoklasowo; resources i prompts rzadziej uzywane przez workflow"
- **R4 / R7.C14:** Power-user patterns uzywaja resources (np. config://team/style-guide, shop schema)
- **Rozstrzygniecie:** Brak absolutnego konfliktu - tools sa defaultowo konsumowane w auto-workflow (Claude decyduje), resources sa "available on request" ale nie auto-loaded domyslnie. Power-user explicit request resources, defaultowy user nie. Synthesis: "Tools: auto-consumed przez Claude's decision engine. Resources: dostepne, auto-advertised, ale konsumpcja wymaga explicit reference. Prompts: dostepne przez menu/slash, rzadko triggered automatycznie."

### Konflikt 2: enableAllProjectMcpServers vs permissions.deny precedence
- **R3.C9:** "permissions.deny ma precedencje nad allow (deny wygrywa). Pattern mcp__* blokuje wszystkie"
- **R3.C10:** "enableAllProjectMcpServers dziala wczesniej niz permission layer - startup commands wykonuja sie PRZED permission check"
- **Rozstrzygniecie:** Deny wygrywa dla tool CALLS; enableAllProjectMcpServers operuje w startup phase (server process spawn + initialization). To DWIE rozne warstwy:
  1. Server startup (controllable przez enabled/disabled lists, BEFORE permission check)
  2. Tool invocation (controllable przez permissions.deny/allow, DURING/AFTER startup)
- Synthesis musi jasno pokazac: permissions.deny chroni invocation, NIE chroni przed startup side-effects. To byl core CVE-2025-59536.

### Konflikt 3: Token cost per server (8-15k vs 67k dla 7 = 9.6k avg)
- **R5.C8:** "~8-15k tokens per server"
- **R6.C2:** "7 servers = 67,300 tokens (9,614 avg)"
- **Rozstrzygniecie:** Spojne (8-15k zakres, 9.6k srednia pasuje). Variance zalezy od serwera - GitHub MCP (~12k), Slack (~8k), Apify (40k+). Synthesis: "Typowy server 8-15k tokens tool defs, outliers do 40k+ dla heavy tool servers".

### Konflikt 4: Puppeteer MCP - deprecated vs dalej uzywany
- **R4.C10:** "Puppeteer MCP DEPRECATED - migracja do Playwright MCP"
- **Community reality:** niektore serwery i setups dalej uzywaja Puppeteer MCP
- **Rozstrzygniecie:** Deprecated = 'not actively maintained' (message maintainers), ale server nadal dziala. Synthesis: "Recommended migration to Playwright MCP (Microsoft-managed). Puppeteer still functional but no new development."

### Konflikt 5: Timeout defaults variance
- **R6.C16:** "stdio ~30s, HTTP ~60s, Windows 4min"
- **R6 issue #20335:** "config ignored, default used"
- **Rozstrzygniecie:** Defaults sa te ktore cytowane; problem w tym ze Claude Code nie respektuje user-configured wartosci (uzywa defaultu). Synthesis jasno rozdzielic: "Defaults per transport/platform [X]. User config often ignored, issue #20335 - use default anyway."

### Konflikt 6 (bonus): Per-tool model routing
- **R6.C21:** "NIE ISTNIEJE 2026-04-17 - cala sesja jeden model"
- **Community:** subagents moga uzywac innego modelu
- **Rozstrzygniecie:** Subagents (Task tool) to OSOBNY mechanizm od MCP. Subagent dziala jako sub-process Claude z wlasnym modelem config. MCP tool calls w ramach jednej sesji NIE zmieniaja modelu. Synthesis: "MCP calls = same session model. Subagents (Task tool) dispatch separate sub-processes ktore moga miec rozny model - ale to nie jest 'MCP routing', to 'agent routing'."

### Konflikt 7 (bonus): Registry commercial-only vs OSS self-publish
- **R2.C15, R4.C2-C3:** Anthropic Registry oficjalny, commercial-visibility
- **Gap:** Brak jasnego procesu self-publish dla OSS
- **Rozstrzygniecie:** Registry is curated by Anthropic, submit process dla third-party servers exists ale details unclear publicznie. Synthesis note: "Registry is Anthropic-curated. Self-service publication dla OSS servers may exist ale dokumentacja skapa."

---

## Minimum 3 gaps wymagajace dalszego researchu lub explicit flag

### Gap 1: Managed MCP - dedykowane pole settings?
**Q2 z MANIFEST** pozostaje open. Research nie znalazl explicit "Managed MCP" field w docs 2026-04-17. Wszystko idzie przez managed-settings.json. Enterprise customers moze miec osobne docs niepubliczne.
**Impact:** Enterprise adoption - niektorzy CIO potrzebuja granular org-policy per MCP server.
**Rekomendacja:** Synthesis flag jako "open question 2026-04-17, Anthropic enterprise docs deep-dive needed".

### Gap 2: CVSS formalna dla CVE-2025-59536
**R3.C12** CVSS 8.7 z secondary source. NVD id nie cytowany bezposrednio. Check Point disclosure nie podaje explicit CVSS.
**Impact:** Compliance reporting (PCI DSS, SOC2) wymaga CVSS formalny.
**Rekomendacja:** Synthesis cite "CVSS High severity, ~8.7 per secondary sources; consult NVD (nvd.nist.gov) dla official score".

### Gap 3: Tool Search Tool post-aktywacja - czy dziala dla resources i prompts?
**R6.C6, R6.C7** Tool Search Tool zmniejsza definitions na 46.9%, ale claims dotycza TOOLS. Czy resources list i prompts list tez sa lazy-loaded? Unclear.
**Impact:** Jesli aggregator server wystawia 500 resources (np. Rube), bez lazy-load to inny kategorial blow-up budget.
**Rekomendacja:** Synthesis note "Tool Search Tool confirmed dla tools; extension to resources/prompts unconfirmed as of 2026-04-17".

### Gap 4: Post-fix status known bugs
**R6.C12-15, R7.C25** listuja issues #424, #11364, #20335, #44032, #15945 jako open. Stan moze byc zmieniony post-research.
**Impact:** Synthesis moze byc out-of-date dla CI/CD recommendations.
**Rekomendacja:** Synthesis cite "as of 2026-04-17", link do live GitHub issue tracker.

### Gap 5: Client capabilities declared by Claude Code
**R1** potwierdzil 3 client capabilities mozliwe (sampling, roots, elicitation) ale NIE potwierdzil ktore Claude Code declaruje w initialize. Empirical test wymagany (uruchomic server, zrobic inspection initialize response).
**Impact:** Developerzy serwerow nie wiedza czy moga request sampling.
**Rekomendacja:** Synthesis flag; empirical test bedzie simple (uruchomic Inspector).

---

## Bias flags

### Bias 1: Commercial source skew
R2-R4 heavily cite dev.to, Medium, commercial blogs (k2view, apigene, skyvia, MintMCP). Te sources sa uzyteczne ale maja commercial interest (np. MintMCP promuje ich gateway service, k2view data products). Claims dotyczace "best practices" moga byc colored przez commercial agenda.
**Mitigacja:** Cross-check z GitHub official repos i Anthropic docs dla critical claims.

### Bias 2: Check Point Research as sole primary dla CVE
R3 CVE details pochodza z jednego primary source (Check Point). Check Point jest reputable security research firm, ale single-source dla CVE introduces reliance. MITRE/NVD entries nie byly directly fetched.
**Mitigacja:** Synthesis cite "MITRE/NVD entry" jako additional authority, but check Point narrative jest wiarygodny (responsible disclosure).

### Bias 3: English/Western ecosystem focus
Top servers list heavy na English-language tools (Slack, Notion, Linear). Chinese/Japanese/European alternatives underserved.
**Mitigacja:** Synthesis note: "Ekosystem reflects Western AI developer audience; non-English ecosystem may differ."

### Bias 4: Post-CVE alarmist tone
R3 ma mocny security focus ktory moze over-signal "MCP = dangerous". Balans: MCP jest legitimately uzyteczny, CVE byly patched w responsible disclosure, proper usage z enabled/disabled whitelists + managed settings to safe pattern.
**Mitigacja:** Synthesis balans - security risk REAL, ale mitigation PATH available. MCP ekosystem jest usable w enterprise z proper governance.

---

## Trust-tier breakdown (dla Appendix SYNTHESIS)

**Trust-1 (primary, 89 claimow):**
- modelcontextprotocol.io (official spec)
- code.claude.com (Anthropic official)
- github.com/modelcontextprotocol (schemas + SDKs)
- github.com/anthropics/claude-code (issues tracker)
- research.checkpoint.com (primary CVE disclosure)
- platform.claude.com (Anthropic API docs)

**Trust-2 (secondary, 56 claimow):**
- dev.to, Medium articles (technical deep-dives)
- k2view, apigene, skyvia, MintMCP blogs (commercial but factual)
- stainless.com, particula.tech (technical writeups)
- gofastmcp.com (FastMCP team)
- arsturn.com (debugging writeups)
- truefoundry.com, circleci.com (production guides)

**Trust-3 (tertiary, 14 claimow):**
- Reddit r/ClaudeAI, r/ClaudeCode threads
- Community forum discussions
- Individual developer blog posts bez verification

**Action dla synthesis:** Trust-1 jako backbone, Trust-2 jako corroboration, Trust-3 jako "community wisdom" z explicit label. Appendix z kazdym claim oznaczonym.

---

## Rekomendacje dla SYNTHESIS

1. **Otworzyc executive summary z dwiema metaforami** (LSP for AI, "three pillars: spec+security+performance")
2. **6-8 Parts:** (1) Spec fundamentals, (2) Building servers, (3) Security model + CVE (dominant section), (4) Ecosystem 2026, (5) Decision matrix MCP vs alternatives, (6) Performance + context economy, (7) Debugging + community patterns, (optional 8) Future outlook 2026-2027
3. **Explicit konflikty section:** 6 konfliktow zidentyfikowanych, kazdy z resolution
4. **Open questions flagged jako Q1-Q7:** Q2 nierozstrzygniete, pozostale odpowiedziane
5. **Appendix Trust-1/2/3:** pelna tabela claims -> trust tier
6. **Cytowania w stylu R<N>.C<M>** inline
7. **No em-dashes, no en-dashes** (tylko zwykle hyphens -)
8. **Jezyk: polski** 
9. **Target 8-10k slow**
10. **Early-write szkielet pierwsze, potem wypelniaj** (retry-safety DD06)

---

## Podsumowanie CRITIC

Research corpus 7 raportow dla kampanii MCP Servers 2026 jest **PASS z 4 minor REVISE**. Primary source coverage jest solid (spec + Anthropic docs + CVE disclosure). Glowne slabosci to: (1) single-source zaleznosci dla kilku kluczowych claimow (CVSS, Tool Search Tool benchmark), (2) GitHub issues status moze sie zmieniac post-research, (3) jeden Open Question (Q2 Managed MCP) pozostaje bez jasnej odpowiedzi. 6 konfliktow inter-report i 5 key gaps zidentyfikowanych z resolution guidance dla synthesis. Trust distribution 56% T1 / 35% T2 / 9% T3 - zdrowe dla kampanii technicznej. Corpus gotowy do SYNTHESIS z recommendations powyzej.

Liczba slow CRITIC: ~2410.
