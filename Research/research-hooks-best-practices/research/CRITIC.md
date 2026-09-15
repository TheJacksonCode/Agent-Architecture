# CRITIC - R1-R7 Audit

**Campaign:** Claude Code Hooks Best Practices 2026
**Auditor:** CRITIC
**Date:** 2026-04-17
**Reference date:** 2026-04-17
**Reports read:** 7 (R1 anthropic_official_docs, R2 opus_47_release_delta, R3 community_patterns_github, R4 security_antipatterns, R5 performance_observability, R6 advanced_patterns, R7 taxonomy_global_vs_project)
**Approximate words audited:** ~19,500 across 7 reports (R1 ~4200, R2 ~1850, R3 ~3100, R4 ~3500, R5 ~2350, R6 ~2800, R7 ~3400)

---

## 0. Executive Summary

Across 7 reports the signal-to-noise ratio is high but there are meaningful internal contradictions that any synthesis MUST resolve before shipping. Top findings:

1. **R1 vs R5 default-timeout contradiction is the single largest red flag.** R1 says command-hook default timeout is **600 s (10 minutes)**; R5 both parrots this ("Default hook timeout is 10 minutes") and elsewhere in section 2 claims "Default hook timeout is 60 seconds" in the performance tables. R4 also asserts "60s default" as a DoS premise. These cannot both be true; the 600-second figure is the one most consistently documented.
2. **R2's Claude Code version numbers are inconsistent with R1.** R1 cites hook-event deltas in the v2.1.76-v2.1.105 range. R2 introduces v2.1.111 (Opus 4.7 release build) and v2.1.112 (same-day patch) without any cross-reference. R2 also references CVE fixes at "v1.0.88" as if this were a Claude Code CLI version - that conflicts with the v2.1.x numbering used everywhere else in R2/R1. Likely copy-paste from a much older security writeup.
3. **R2 vs R4 totally disagree on Opus 4.6 context window.** R2 table says Opus 4.6 context = 1M. R1 does not contradict but R2 also says "Stare podejscie (Opus 4.6, 200k)" in section 2.8 - self-contradiction inside R2 itself. One of those numbers is wrong.
4. **R4 cites two CVEs with unverifiable IDs and links.** CVE-2025-59536 (CVSS 8.7) and CVE-2026-21852 (CVSS 5.3) are flagged as UNVERIFIED: I cannot fetch the Check Point link from this environment, and neither CVE appears in Anthropic's published changelog or security page per R1's source list. They might be real - CheckPoint does write Claude Code CVEs - but the specific numbers need external verification before syntetyk quotes them.
5. **R1's hook-events table is richer than R6's** (28 vs "21+") and the delta lists do not fully align (R6 mentions `SkillActivationHook` which appears in neither R1 nor R2). Need to reconcile the authoritative event catalogue.
6. **R2 gets the Opus 4.7 release date right (2026-04-16)** relative to the user-supplied environment variable "currentDate 2026-04-17". No conflict here - 4.7 was released yesterday.
7. **R3 correctly flags the #1 community foot-gun (exit 1 vs exit 2)** but its own settings.json snippets do not show timeout hygiene R4/R5 demand. Internal consistency gap.
8. **R5's OTel env var naming is partially un-anchored.** `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS`, `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA`, `CLAUDE_CODE_DEBUG_LOG_LEVEL`, `OTEL_LOG_RAW_API_BODIES` - R5 marks most `[DOC]` but I cannot independently confirm these exact names from R1's citation list.
9. **R6 admits some patterns are "hypothetical composites"** which is honest, but a few (P11 cost kill-switch, P12 self-distilling CLAUDE.md) may not actually work as written because the HTTP hook response schema in the canonical docs does not show `{"decision": "block", ...}` as a valid top-level response for UserPromptSubmit in the way R6 implies.
10. **R7 confuses `--settings` as a known CLI flag**; R1 section 13 explicitly notes "There is no documented `--settings` flag... in the current reference (as of 2026-04-17)." R7 uses `--settings` in its CLI-flags table and in anti-pattern 6.9. Direct contradiction with R1.

Verdict at a glance: **R1 PASS, R2 REVISE, R3 PASS-with-nitpicks, R4 REVISE, R5 REVISE, R6 REVISE, R7 REVISE.** Nothing is a REJECT - all seven have real value - but syntetyk cannot naively paste-and-merge.

---

## 1. R1 Critique (Anthropic Official Docs)

**Strengths:**
- By far the most comprehensive single reference. Every claim is anchored with a `[https://code.claude.com/docs/...]` link. Almost no floaters.
- 28-event catalogue with cadence / matcher / blocks-on-exit-2 columns is the best single table across the corpus.
- Correctly flags the exit-1 vs exit-2 semantic (the #1 community trap) with the canonical Anthropic quote.
- Honest "Gaps" section (13) explicitly lists what is NOT documented (Windows PowerShell per-hook override, `--settings` flag, resource limits). Good epistemic hygiene.
- Clean handler-type comparison (4.1-4.5) with default timeouts stated as 600s / 30s / 30s / 60s - these numbers are the ground truth the other reports should align to.
- Correctly states "`allow` does not override deny rules" (section 12.1) - this is a critical security invariant others confirm.

**Weaknesses:**
- Cites `code.claude.com/docs/en/*` URLs exclusively; I cannot verify these from the sandbox so they are all technically UNVERIFIED. Reader must trust that the 301 redirect from `docs.anthropic.com/en/docs/claude-code/*` is real (R1 claims it is).
- Section 3 table lists `Setup` event as "async / TypeScript SDK only" with n/a matcher. This event does not appear in R6's event list (R6 says "21+ lifecycle events" which is fewer than 28) - possible internal inconsistency between R1 and R6.
- Section 4.5 shows `once: no - run only once per session (skills only)`. R6 section 5.2 confirms this is skill-only. Good alignment.
- Section 5.2 JSON schema example shows `"decision": "block"` + `"hookSpecificOutput.permissionDecision": "deny"` in the same object - these look mixable but per section 6.1 in R4 they are explicitly NOT mixable ("You must choose one approach per hook: either use exit codes alone ... or exit 0 and print JSON"). R1 should have been explicit about this exclusivity.
- Section 13 says "`--settings` ... Not present in the current settings reference" - but R7 uses this flag as if it were real. R1 is right, R7 needs fixing.
- Section 9.1 lists Windows managed path `C:\Program Files\ClaudeCode\managed-settings.json (v2.1.75+, legacy C:\ProgramData\ClaudeCode\ removed)`. R7 repeats this. Cannot independently verify the v2.1.75 cutover - flag as UNVERIFIED.

**Hallucinations / suspect claims:**
- "28 documented lifecycle events" - I counted 27 in the table (missing one? or Setup counted separately?). Minor.
- `TeammateIdle` and `TaskCreated` / `TaskCompleted` events are plausible for agent-teams but cross-verification is weak. R2 section 2.1 confirms `TaskCreated` at v2.1.84. R6 section 8.1 discusses parent-child coordination but does not list `TeammateIdle` explicitly.
- `CLAUDE_ENV_FILE` semantics (section 8.2) - plausible pattern, only R1 cites it. R6 also uses it. Call it confirmed-weakly.
- `FileChanged` uses "literal filenames split on `|`, not regex" - distinctive claim, no cross-confirmation in other reports, but sounds too specific to be invented.

**Verdict: PASS.** This is the anchor document; any conflict with R1 should favor R1 unless another source has stronger evidence. Syntetyk should build on R1's event table as the spine.

---

## 2. R2 Critique (Opus 4.7 Release Delta)

**Strengths:**
- Clear delta framing: does not re-document hooks, only what changed.
- Concrete pricing numbers and tokenizer multiplier (1.0x-1.35x) with honest disclaimer "konkretny multiplier zalezy od contentu" in section 6.
- Good Migration Notes (section 4) - actionable.
- Correctly states Opus 4.7 release date as 2026-04-16, which aligns with the environment's "currentDate 2026-04-17" (yesterday's release, today's audit).
- Pricing-of-validator-model table in section 2.7 is the single most actionable cost-awareness artifact across the whole corpus.

**Weaknesses:**
- **Self-contradicts on Opus 4.6 context window.** Section 2.8 says "Stare podejscie (Opus 4.6, 200k)" - but section 3 table lists Opus 4.6 context window as 1M and Opus 4.5 as 200k. Both cannot be right. Best guess: 4.6 was 1M (Anthropic publicly introduced 1M Opus context with 4.6) and the section 2.8 line is a typo where the author confused 4.5 with 4.6. Syntetyk must resolve.
- **Version number confusion with R1.** R1's section 17 references changelog entries at v2.1.76, v2.1.78, v2.1.84, v2.1.85, v2.1.89, v2.1.90, v2.1.105. R2 introduces v2.1.101, v2.1.110, v2.1.111, v2.1.112. No overlap in citations - two parallel version histories. Both can be true (R1 might have stopped at v2.1.105 while R2 extends it), but the separation should have been explicit.
- **"Tool use pricing (tokens per tool definition) - 346 tokens auto/none, 313 any/tool"** - specific-to-the-digit numbers without a source. UNVERIFIED and suspect. Anthropic's pricing docs do not usually expose per-tool-definition token counts at that resolution.
- Section 2.6 migration math: "Tokenizer 4.7 liczy do 35% wiecej tokenow ... Jesli hook liczyl 'skompaktuj kiedy context > 800k' na 4.6, to na 4.7 ten sam content to ~1.08M tokenow" - the math only works if the user was operating at the 800k threshold on a 1M context. If R2 is simultaneously claiming 4.6 had 200k context (section 2.8), the math is incoherent. Another symptom of the 4.6 context-window confusion.
- Section 2.2 "Push notification tool (Claude moze wysylac mobile push kiedy Remote Control wlaczony) - dziala przez Notification hook event" - "Remote Control" as a named feature of Claude Code is UNVERIFIED. Could be real, could be a community term.
- Section 2.2 "Plan files nazywane po prompt'cie (np. `fix-auth-race-snug-otter.md`)" - cute-name suffix claim is very specific. UNVERIFIED but harmless if wrong.
- Section 2.9 `disableSkillShellExecution` at v2.1.91 - UNVERIFIED against R1 changelog list.
- Section 4.2 "Usuniete komendy - `/tag`, `/vim` (v2.1.92)" - UNVERIFIED.

**Hallucinations / suspect claims:**
- `output-300k-2026-03-24` Batch API header - very specific string, cite-or-it-didn't-happen. R2 does not cite.
- `task-budgets-2026-03-13` beta header - same.
- "benchmarks: 64.3% SWE-bench Pro, 87.6% SWE-bench Verified, 69.4% Terminal-Bench 2.0. +13% wzgledem 4.6" - plausible but hyper-specific. Cite.
- "Skills description cap raised 250 -> 1,536 chars (wazne dla 35-skill systemow jak Agent_Architecture)" - the "1,536" precise number looks like a real-char-cap figure but without source it is suspect. The context-specific mention of Agent_Architecture is a nice touch but slightly suspicious (is this the model projecting into the report?).

**Verdict: REVISE.** Good bones, but fix:
1. Opus 4.6 context window - 1M or 200k, pick one and be consistent across sections.
2. Anchor specific numbers (346/313 tool tokens, 1536 chars) to a source or drop them.
3. Verify the v2.1.91/92 changelog entries against R1's list.
4. Verify beta header names (`output-300k-2026-03-24`, `task-budgets-2026-03-13`) - if they are speculative, mark as such.

---

## 3. R3 Critique (Community Patterns GitHub)

**Strengths:**
- Ecosystem-mapping is genuinely useful: ~40 repos, clear "top 10 patterns by frequency" framing, good distillation of the language-runtime breakdown.
- Seven deep-dives with verbatim code blocks - the value is in that verbatim.
- Excellent anti-patterns section (15 items) - the #1 item ("exit 1 does NOT block, only exit 2 blocks") is the single most important takeaway for anyone writing a hook.
- Fork-bomb regex `:(){ :|:& };:` in Blake Crosley example is genuinely useful defense-in-depth.
- Honest status labels (STABLE / MATURING / EXPERIMENTAL) give downstream readers calibration.
- SHA256 caching pattern from bartolli is a gem.

**Weaknesses:**
- Verbatim bash quoting in some snippets needs a careful read. Example Hook 2 (Blake Crosley Security Gate): `grep -qE "rm\s+-rf\s+/|..."` - quoting is correct inside the outer `bash -c '...'` but the `jq -r` pipeline inside a single-quoted `bash -c` and then nested interpolation makes this fragile. Testing locally would catch subtle breakage.
- Fork-bomb detection regex `:(){ :|:& };:` embedded inside `grep -qE "..."` pattern will need `\|` escape or will match the `|` as regex alternation. The R3 quote shows it plain - might not actually work as shown. Worth double-checking against the original blog post.
- Deep-Dive 1 (disler/claude-code-hooks-mastery) lists 13 hooks but the community frequently cites 21-28 event types - dissonance between "the flagship uses 13" and "there are 28 events". Not a contradiction, just incomplete coverage - worth calling out in the synthesis.
- Deep-Dive 4 (disler/multi-agent-observability) talks about "async hooks (Jan 2026 feature)" - this conflicts with R1 and R2 which place `async: true` as a longstanding field. "January 2026" is plausible for a feature version bump but deserves a changelog anchor.
- Deep-Dive 6 (tdd-guard) "Node.js 22+ hard requirement" - UNVERIFIED against the source repo, plausible.
- Deep-Dive 7 BurntToast: `Install-Module BurntToast -Scope CurrentUser -Force` is correct for PowerShell but no mention of ExecutionPolicy needed to run this - subtle gap for Windows readers.
- R3's cited blogs (claudelog.com, claudefa.st, smartscope.blog, techsy.io, serenitiesai.com, pasqualepillitteri.it, gend.co, scalebloom.com, codesignal.com) - some of these look like SEO farms and their authority on Claude Code specifics is low. Not evidence-of-hallucination, just source quality concern.
- "Every flavor exists: ElevenLabs premium, OpenAI TTS, gTTS free, pyttsx3 offline, macOS `say`..." - rhetorical flourish, not a problem.
- No mention of Windows-native Python invocation nuances (user is on Win11). This is a gap.

**Hallucinations / suspect claims:**
- Nothing egregious. R3 is mostly structured reporting with verbatim quotes; low hallucination surface.
- "Stopped counting around repo #15" for TTS/notification hooks - rhetorical, not a claim.

**Verdict: PASS-with-nitpicks.** Trust the repo inventories. Re-verify the two or three regex-embedded patterns. Flag the "January 2026 async hooks" claim against R1's changelog; if it is ambiguous, note it in the synthesis.

---

## 4. R4 Critique (Security & Anti-Patterns)

**Strengths:**
- By far the most urgent of the seven reports. Lays out command-injection, prompt-injection, and supply-chain threats with working PoCs.
- Ten-item top anti-pattern list at section 9 is a ready-to-ship cheat sheet.
- Hardening checklist (section 10) is operational, per-user + per-project + managed. Syntetyk should mine this.
- Correctly partitions vulnerabilities into "Anthropic-side (fixed)" vs "User-config (not a bug)" - this rigor is rare.
- Mitigation code examples for bash, Python, and Node parallel coverage is excellent.

**Weaknesses:**
- **CVE IDs are UNVERIFIED** from this environment. R4 cites CVE-2025-59536 (CVSS 8.7) and CVE-2026-21852 (CVSS 5.3). I cannot reach `research.checkpoint.com/2026/...`, `theregister.com/2026/02/26/...`, `securityweek.com/...`, or `cybersecuritynews.com/...` to confirm. The IDs follow valid format but the specifics (CVSS scores, the exact CVE description) are single-sourced to one blogchain.
- **Claude Code CLI version numbers look wrong.** R4 cites "v1.0.88" as the fix version for CVE-2025-59536, and "v1.0.9+" as the version that added `/sandbox`, `ConfigChange` hook event, and HTTP hooks. R1/R2 use v2.1.76+ numbering for the same features. So either R4 is referencing a **very** old version history (pre-Claude Code v2 branch), or these are hallucinated version numbers. Most likely: R4 pulled them from a source that predates the v2.x branch, and they are now obsolete. Syntetyk MUST verify.
- "Do v1.0.70 (~Q4 2025) Claude Code **nie** automatycznie gitignore'owal `.claude/settings.local.json`" - same v1.0.x issue. R1 doesn't discuss this version cutoff.
- Section 1.1 claim "Anthropic explicitnie limituje to do 10,000 znakow" + citation format `code.claude.com/docs/en/hooks - "Hook output injected into context ... is capped at 10,000 characters."` - R5 section 9 and R6 also echo this. R1 does not explicitly confirm but does not contradict. Cross-confirmed weakly.
- Section 2.3 Python example uses `subprocess.run(f"echo 'Running: {cmd}' >> /tmp/audit.log", shell=True)` - the quote injection is real but the example would actually fail earlier because `subprocess.run` with `shell=True` and a single string is Unix-only (Windows differs). Not wrong per se, but worth noting for the Win11 user.
- Section 4.3 PoC: `ANTHROPIC_BASE_URL` exfiltration vector - plausible and publicly discussed; the CVE attribution is the weak link.
- Section 5.1 "The exception is `WorktreeCreate`, where any non-zero exit code aborts worktree creation" - this is confirmed by R1 section 5.1 table. Good cross-confirmation.
- Section 6.1 claim "Default hook timeout to 60 sekund" - **this contradicts R1** which says 600 seconds for command-type hooks. R4 may be confusing the agent-hook default (60s per R1) with the general default (600s). This is a material error because it changes the DoS calculus (a 60-second-per-tool-call DoS is different from a 600-second one).
- Section 6.6 Pattern 4: "Claude Code v1.0.9+ ma `ConfigChange` hook event" - v1.0.x version again, clashes with R1.
- Section 9 item 10 "additionalContext z external untrusted source" - correct and aligned with R1 12.1, good.

**Hallucinations / suspect claims:**
- CVE-2025-59536 CVSS 8.7 - UNVERIFIED.
- CVE-2026-21852 CVSS 5.3 - UNVERIFIED.
- v1.0.88 fix version - suspect, possibly obsolete.
- Lasso Security "50+ patterns in 4 categories" - specific claim, UNVERIFIED.
- "WebDAV Windows bypass" as CVE-grade category - UNVERIFIED.
- "Subcommand limit" prompt injection bypass - UNVERIFIED.

**Verdict: REVISE.** The threat models are sound; the CVE/version-number specifics need a second-pass verification before syntetyk can quote them with confidence. Specifically:
1. Re-verify CVE IDs, CVSS scores, and fix-version numbers against Anthropic's public security bulletin or a second independent source.
2. Replace v1.0.x references with v2.1.x equivalents (or explicitly note the historical mapping).
3. Correct the "60 sekund default timeout" to match R1's 600s / 30s / 30s / 60s breakdown - or, if R4 is asserting that user-facing DoS is governed by a session-level timeout that is different from per-hook timeout, make that explicit.

---

## 5. R5 Critique (Performance & Observability)

**Strengths:**
- Excellent structure: latency profile table, observability recipes, debugging flowchart, timing budgets, telemetry metrics list.
- Docker/OTel recipe (Recipe 4) is a real operational win.
- The ruvnet/ruflo issue #1530 case study is the one concrete "18-21 s per prompt caused by 11 Node-spawning hooks" - gives teeth to the abstract warnings. UNVERIFIED but plausible and well-anchored.
- claudekit benchmark numbers (80 ms file-guard, 2661 ms typecheck-changed, 14109 ms test-project) are vivid.
- Section 9 "Gotchas and war stories" pattern - CWD, stdin not args, stdout matters, updatedInput last-writer-wins - reads like hard-won experience.

**Weaknesses:**
- **TIMEOUT CONTRADICTION IS IN THIS REPORT.** Section 1 says "Default hook timeout is 10 minutes (600 seconds)". Section 2 latency-profile table says "Default timeout: 10 min" in almost every row but then shows "SessionEnd | ... | Default timeout: **1.5 s**" with env var override to 60s. R1 does not document a SessionEnd-specific timeout of 1.5s. This is a very specific claim. UNVERIFIED.
- **`CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` env var** - specific enough that it either exists or it doesn't. R1 does not list it. R5 marks it `[DOC]` which puts the burden on R5 to be right.
- `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` - UNVERIFIED.
- `OTEL_LOG_RAW_API_BODIES` - R2 section 4.4 also mentions this, partial cross-confirmation but both could have same source.
- `CLAUDE_CODE_DEBUG_LOG_LEVEL=verbose/info` - UNVERIFIED specifics.
- Metric name format `claude_code.tool_result.duration_ms`, `claude_code.token.usage`, etc. - plausible OTel naming but no direct link to Anthropic docs. R5 says "official Claude Code Monitoring Guide" - that's a real repo (anthropics/claude-code-monitoring-guide is cited) but the specific metric names list in R5 is not anchored to a line from that repo.
- Section 2 statement "Command hooks are deduplicated by command string, and HTTP hooks are deduplicated by URL" - R7 also cites this. Matches R1's deduplication note. Good.
- Section 2 "N matching hooks do NOT cost N times sequentially; they cost ~max(N) wall-clock plus process-spawn jitter" - derived correctly from parallel execution. Good.
- Section 3 Recipe 3 (statusline) - JSON schema fields `.model.display_name`, `.context.percent`, `.cost.total_usd`, `.duration.total_ms` - these look like guesses. R5 cites `code.claude.com/docs/en/statusline` but I cannot verify. If the field names are wrong, the recipe is broken.
- Section 4 "PermissionRequest hooks do NOT fire in `-p` (non-interactive) mode" - this is a concrete claim that aligns with R1's treatment of `-p` and `defer`. Good.
- Section 6 "Budget (p50) 100ms for PreToolUse (sync)" - these are opinions presented as policy, fine for a "proposed team defaults" framing.
- Bash command examples use `set -euo pipefail` which is correct best practice. Quoting generally safe.
- Recipe 5 Python Sentry example: `sentry_sdk.init(dsn=...)`, `traces_sample_rate=0.0` - correct Sentry 2.x API. Code is runnable.
- Recipe 6 HTTP hook JSON: `"async": true` alongside `"timeout": 2` - R1 confirms `async: true` is a valid field. Good.

**Hallucinations / suspect claims:**
- SessionEnd 1.5s default timeout - UNVERIFIED.
- `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` env var - UNVERIFIED.
- Specific OTel metric names (cardinality, precise naming) - UNVERIFIED at that resolution.
- `/heapdump` writes to `~/Desktop` - cute claim, UNVERIFIED, hard to believe (why ~/Desktop specifically?).
- `CLAUDE_CODE_MAX_RETRIES` default 10 - UNVERIFIED.

**Verdict: REVISE.** Mostly solid, but:
1. Resolve the SessionEnd 1.5s vs 600s claim - is SessionEnd special?
2. Verify env var names (`CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS`, `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA`, `CLAUDE_CODE_DEBUG_LOG_LEVEL`) - if they are real, fine; if not, drop or flag.
3. Verify statusline JSON schema fields - recipe 3 depends on them being right.
4. Verify OTel metric names against the monitoring guide repo.

---

## 6. R6 Critique (Advanced Patterns)

**Strengths:**
- Handler-type deep dive with comparison matrix (section 1.5) is the cleanest "when to use which handler" table in the corpus.
- Skill-scoped hooks discussion (section 5.1) is genuinely advanced and well-grounded.
- Worktree + sparse-checkout + CwdChanged composition is non-obvious and useful.
- Plugin vs user scope distinction (6.2) reinforces R7 but from the angle of "versioning".
- Explicitly flags Patterns 11 and 12 as "hypothetical composites" - good epistemic hygiene.
- Multi-hook orchestration (section 3) with explicit decision-precedence rule `deny > defer > ask > allow` matches R1 section 5.3. Cross-confirmed.
- Self-healing loops (section 7) with stop_hook_active guard is a real pattern that R1 mentions and R5 echoes.

**Weaknesses:**
- Section opening claims "21+ lifecycle events" - R1 table has 28. Mismatch. R6 does not cite its source for "21".
- Section 1.1 command hook example shows `shell: "bash"` - R1 section 13 Gaps notes "Per-hook PowerShell override is not explicitly documented" - so `shell: "powershell"` at the per-hook level may not be real. R6 asserts it is real without confirming. UNVERIFIED for Windows users.
- Section 2.2 Scoped MCP per subagent - YAML frontmatter example shows `mcpServers:` as a list with mixed inline-object and string entries. YAML-wise this is valid, but the exact schema for subagent frontmatter is UNVERIFIED.
- Section 2.3 Elicitation pattern is marked "Hypothetical pattern (supported by the mechanics, not documented as a canned recipe)" - honest, good.
- Section 2.4 Dynamic MCP via `list_changed` - plausible but specifics of `SessionStart` emitting `additionalContext` that then influences a future MCP server restart is a composite that needs more care.
- Section 3.5 "Because command hooks typically finish before agent hooks spawn, this works in practice but is a race-prone optimization" - honestly flagged as race-prone.
- Section 4.2 WorktreeCreate/WorktreeRemove - confirmed in R1 and R2.
- Section 6.3 "Plugin-shipped subagents do NOT support the `hooks`, `mcpServers`, or `permissionMode` frontmatter fields" - distinctive security-relevant claim. UNVERIFIED but plausible.
- Section 8.1 GitHub issue #7881 "SubagentStop does not always uniquely identify which specific subagent finished when multiple of the same type are running concurrently" - specific claim with a specific issue number. Plausible but UNVERIFIED.
- Section 8.4 "Frontmatter hooks do NOT transfer when the definition is reused as a team member" - distinctive claim, UNVERIFIED.
- Section 9.1 Hook-as-channel pattern - confirms R6's "channels" feature (chat-bridges for permission relay). Not documented in R1's source list. UNVERIFIED.
- Section 10 Pattern 3 (Semantic commit) uses `"matcher": "Bash", "if": "Bash(git commit *)"` - double-filtering is documented (R1 6.2) but the example shows both `matcher` AND `if` which is redundant unless I am misreading. OK, `matcher` gates on tool name, `if` gates on args - so this is correct.
- Pattern 4 (Agent-verified refactor safety) has `timeout: 120` on an agent hook. R1 says agent-hook default is 60s "bounded to 50 tool-use turns" - a 120s timeout is legal but the 50-tool-use cap still applies. Worth noting.
- Pattern 11 (Cost kill-switch) has `"url": "https://ledger.internal/claude-check"` - returning a block from UserPromptSubmit via HTTP is documented in R6 1.2 but the exact JSON schema to block a UserPromptSubmit via HTTP (vs tool events) should be double-checked. UserPromptSubmit schema per R1 is `decision: "block"` top-level (not `hookSpecificOutput.permissionDecision`).
- `SkillActivationHook` reference in R6 sources (cited from claudefa.st) - this event is NOT in R1's 28-event table. Either R1 missed it, R6's source invented it, or the event was renamed. UNVERIFIED.

**Hallucinations / suspect claims:**
- "21+ lifecycle events" mismatches R1's 28. Minor.
- `shell: "powershell"` at per-hook level - UNVERIFIED, contradicts R1 gaps note.
- `SkillActivationHook` - UNVERIFIED.
- Subagent frontmatter `mcpServers:` list syntax - UNVERIFIED precise schema.
- Specific GitHub issue numbers (#7881, #33049) - plausible but UNVERIFIED.

**Verdict: REVISE.** Mostly good, but:
1. Align event count with R1 (28 or 27 depending on Setup).
2. Flag `shell: "powershell"` per-hook as UNVERIFIED (or drop in favor of the top-level `defaultShell` R1 mentions).
3. Verify the precise JSON schema for HTTP hook returning a block on UserPromptSubmit vs tool events - Pattern 11's correctness hinges on it.
4. Mark SkillActivationHook as speculative if it cannot be corroborated.

---

## 7. R7 Critique (Taxonomy Global vs Project)

**Strengths:**
- Decision framework (section 3) with three-question triage is genuinely useful for placing settings.
- Five concrete paired examples in section 4 - that is the rare "show me, don't just tell me" artifact that helps a syntetyk paint the right picture.
- Anti-patterns in section 6 are practical and tactical.
- Conflict-resolution examples (2.4, 2.5, 2.6) with scalar/array/hook semantics laid out separately - pedagogically clean.
- Section 8 verification via `/status` - concrete, operational.

**Weaknesses:**
- **`--settings <path>` treated as a known CLI flag.** Section 1.1 table row: `CLI flag | --settings <path> on claude invocation | Current session | No | User ad-hoc`. Section 2.1 also lists "Command line: --settings, --model, ..." as precedence layer 2. Section 6.9 recommends `--settings /tmp/clean-settings.json` for a session override. But R1 section 13 explicitly says: *"There is no documented `--settings` flag for passing a bespoke settings.json path at startup in the current reference (as of 2026-04-17)."* **Direct contradiction.** Either R1 is wrong (the flag exists, R1 missed it) or R7 invented it. I weight R1's claim higher because R1 is a canonical-docs report that explicitly searched for this flag in a "Gaps" section. R7 should either cite the flag's existence to an Anthropic source or drop it.
- Section 2.7 "lower-layer `allow` cannot override a higher-layer `deny`" - aligned with R1 section 12.1. Good.
- Section 3.1 table row "Personal `voiceEnabled`" - voice mode in settings is UNVERIFIED. R1 does not list this setting.
- Section 3.1 table row "Personal `awayuSummaryEnabled`" - typo? "awayu"? Likely should be "autosummary" or similar. Smells like a hallucination-through-typo.
- Section 4 Example 3: `"permissions": { "defaultMode": "acceptEdits", "allow": [ "Bash(*)" ] }` - anti-pattern but labeled as solo-repo pattern with a warning. OK.
- Section 6.8 "These specific keys live in `~/.claude.json`, not `settings.json`" - distinctive claim (editor mode, autoConnectIde live in ~/.claude.json). R1 does not directly confirm but does mention `~/.claude.json` as a file. UNVERIFIED at this resolution.
- Section 6.11 `autoMemoryDirectory` forbidden in project settings - distinctive claim. UNVERIFIED.
- Section 1.1 Windows managed path `C:\Program Files\ClaudeCode\managed-settings.json` matches R1 section 9.1. Cross-confirmed.
- Section 1.1 `com.anthropic.claudecode` MDM preferences domain - plausible for macOS, UNVERIFIED.
- Section 1.1 Windows Registry paths `HKLM\SOFTWARE\Policies\ClaudeCode\Settings` - matches R1. Good.
- Section 2.2 hybrid merge table - "Scalar (highest wins) / Array (concat+dedupe) / Object (deep-merged)" - this is the single most-cited claim across all reports. R1 confirms arrays merge + dedupe. R7's deep-merge claim for objects is distinctive but plausible.
- Source quality (section 9): eesel.ai, DEV.to, builder.io, claudelog.com - medium-weight third-party blogs. The direct quotes to Anthropic canonical are anchored correctly.

**Hallucinations / suspect claims:**
- `--settings` CLI flag - STRONGEST hallucination candidate. R1 explicitly says this is not documented.
- `awayuSummaryEnabled` - almost certainly a typo or fabrication.
- `voiceEnabled` - UNVERIFIED.
- `autoMemoryDirectory` forbidden-in-project claim - UNVERIFIED.

**Verdict: REVISE.** Structurally solid and syntetyk should use the decision framework intact. But:
1. Drop or rigorously cite the `--settings` CLI flag.
2. Verify `awayuSummaryEnabled` / `voiceEnabled` / `autoMemoryDirectory` - if they are invented, remove.
3. Double-check Example 2's `"STRIPE_SECRET_KEY": "sk_test_redacted_personal_key"` - it is labeled as a test placeholder but the anti-pattern section should repeat that secrets in env under settings.local are acceptable only because the file is gitignored.

---

## 8. Cross-Report Conflicts Table

| Fact | R1 | R2 | R3 | R4 | R5 | R6 | R7 | Who's right |
|---|---|---|---|---|---|---|---|---|
| Default timeout for command-type hooks | 600 s | (not stated) | (not stated) | **60 s** (section 6.1) | 600 s (section 1) + conflicting table entries | 600 s (section 1.1) | (not stated) | **R1/R5/R6: 600 s.** R4's "60s" is wrong - probably confused with agent-hook default or with something else. |
| Default timeout for agent hooks | 60 s (up to 50 tool-use turns) | (not stated) | (not stated) | (not stated) | 60 s | (implied) | (not stated) | R1 |
| Default timeout for HTTP hooks | 30 s | (not stated) | 1-5 s in examples | (not stated) | 30 s | (not stated) | (not stated) | R1 |
| SessionEnd default timeout | (not stated specifically) | (not stated) | (not stated) | (not stated) | **1.5 s, auto-raised to 60 s max** | (not stated) | (not stated) | R5 alone - UNVERIFIED |
| Number of lifecycle events | 28 | (references specific ones) | 12 events in disler telemetry | (references specific ones) | 14 in tables | **21+** | (not stated) | R1 is most complete but R6 says "21+" without source |
| Hook precedence among decisions | `deny > defer > ask > allow` | (repeats R1) | (not stated) | (references) | (not stated) | **`deny > defer > ask > allow`** | (not stated) | R1 = R6 agree. Authoritative. |
| Opus 4.6 context window | (not in scope) | **1M** (section 3 table) and **200k** (section 2.8) - **self-contradicts** | - | - | - | - | - | R2 must pick one; 1M is most likely correct |
| Opus 4.7 release date | (not in scope) | 2026-04-16 | - | - | - | - | - | R2; matches environment's "today is 2026-04-17" |
| Claude Code version fixing CVE-2025-59536 | (not in scope) | v2.1.x range | - | **v1.0.88** | - | - | - | R4 looks wrong; v1.0.88 does not fit v2.1.x numbering |
| `ConfigChange` hook event version | v2.1.76 (section 17) | v2.1.76 (section 2.1) | - | **v1.0.9+** | - | - | - | R1/R2 - R4 is wrong |
| `--settings` CLI flag | **does NOT exist** in docs (section 13) | (not stated) | (not stated) | (not stated) | **uses `--debug-file`** | (not stated) | **exists and is usable** (section 1.1, 2.1, 6.9) | R1 - R7 is wrong or sourced to something outside Anthropic docs |
| Hook output size cap (additionalContext) | (not explicitly stated) | 10k chars (section 2.8) | (not stated) | **10,000 characters** | **10,000 characters** (section 9) | (not stated) | (not stated) | R2/R4/R5 agree - probably correct |
| `defer` permission decision | v2.1.89+, non-interactive only | v2.1.89+ | - | - | - | references | - | R1/R2 agree |
| Hooks parallel execution + dedup | Yes, dedup by command string / URL | (not stated) | (not stated) | - | Yes, same | Yes, same | Yes, same | Unanimous on this |
| MCP tool matcher format | `mcp__<server>__<tool>` | - | - | - | `mcp__<server>__<tool>` | `mcp__<server>__<tool>` | - | Unanimous |
| Skills description cap | (not explicitly stated) | **1536 chars (up from 250)** | - | - | - | - | - | R2 alone - UNVERIFIED specific |
| `allow` overrides deny rules? | No - hooks can tighten, not loosen | (not stated) | (not stated) | Same - No | Same - No | Same - No | Same - No | Unanimous on this invariant |
| `shell: "powershell"` per-hook | Not explicitly documented (Gaps) | - | - | - | - | **claims works** (section 1.1) | - | R1 is cautious, R6 asserts - favor R1 |

---

## 9. Gaps (what is NOT covered but should be)

1. **Windows-specific hook guidance.** The user is on Win11 (per environment `OS Version: Windows 11 Home 10.0.26200`). R3 has WSL/BurntToast, R5 mentions PowerShell briefly, but there is no coherent "Claude Code hooks on Windows native" section across any report. Bash-everywhere examples risk breaking. Specifically missing:
   - Does `jq` work out-of-box on Windows? (no - user installs via winget/choco)
   - Is `chmod +x` necessary on Windows? (no - file extension or shebang-independent)
   - PowerShell equivalent for `read -p` hook patterns?
   - Path separator handling (`\` vs `/` in `$CLAUDE_PROJECT_DIR`)
   - Windows-native managed settings paths and registry deployment.

2. **Cold-start performance.** R5 focuses on per-hook latency but does not distinguish cold-start (first invocation per session) from warm-state. `uv run` has cold-start cost; Node has ~80-120ms per R5's ruvnet story; Python has similar. No recipe in R5 for warming interpreters.

3. **Memory leaks / long-lived session resource growth.** R5 mentions `/heapdump` but no guidance on how hooks contribute to Claude Code's own memory footprint over a long session.

4. **Hook error propagation semantics.** If hook A exits 2 and hook B in the same matcher group exits 0 with `additionalContext`, what happens? Does the block propagate? R1 covers this weakly, R6 section 3.1 slightly, but no report has a clean "N hooks matched, here is the aggregate decision matrix" artifact.

5. **Testing hooks.** R5 section 4 mentions "Test locally with `echo '<sample json>' | ./hook.sh; echo $?`" but no report has a real testing recipe (assertions, fixtures, CI integration).

6. **Hook versioning and rollback.** R7 covers migration patterns (local -> project) but not "my hook broke the team, how do I roll back fast?" Answer: revert PR. But for plugin-scoped hooks? Nothing.

7. **Hook observability when run under a managed plugin.** If IT deploys hooks via `managed-settings.json` + a plugin, users cannot see the hook's stderr easily. R5 touches debug-file but not the trust/privacy angle.

8. **CVE status tracking discipline.** R4 lists two CVE IDs but no explicit "here is the Anthropic security bulletin URL you should subscribe to" recommendation. Syntetyk should add that.

9. **Cost forecast for hook-driven LLM calls.** R2 section 2.7 has the per-call pricing table, R5 has OTel observability, but no report shows "at 500 events/session what is my real total added cost" worked example with breakdown. R2 gives one number ($1.50) but doesn't explore volume.

10. **Agent-Architecture project-specific integration.** All reports are generic. The user's CLAUDE.md mentions 35 skills + 42 commands + catalog. How do hooks interact with skill/command loading specifically in that architecture? Gap.

11. **macOS-specific gotchas.** R3 mentions `osascript` but no report covers macOS code-signing/notarization of hook scripts, or the "gatekeeper" prompt that might fire on first-run of a downloaded plugin hook.

12. **Managed vs user reading-rights asymmetry.** R7 implies managed is "hard law" but doesn't explore "can a user read what managed hooks are installed?" - this is an audit question.

---

## 10. Pricing / Cost Claims Review

**R2 section 2.7 pricing table:**
- Haiku 4.5: $0.001 / $0.005 per 1K tokens (i.e., $1/$5 per MTok). Plausible. UNVERIFIED against current Anthropic pricing page.
- Haiku 3.5: $0.0008 / $0.004 - looks like older Haiku 3 pricing. UNVERIFIED.
- Sonnet 4.6: $0.003 / $0.015 (i.e., $3/$15 per MTok) - plausible.
- Opus 4.7: $0.005 / $0.025 ($5/$25 per MTok) - matches R2 section 1.1 Opus 4.7 pricing. Consistent internally.

**R2 cache-tier pricing:**
- 5m cache write $6.25/MTok, 1h cache write $10/MTok, read $0.50/MTok. Plausible, matches the generally-accepted Anthropic cache multipliers. UNVERIFIED against live page.

**R2 section 2.7 real-world math:**
- "Hook ktory wola Haiku 4.5 raz per PreToolUse event z 2k input / 200 output tokenow = $0.002 + $0.001 = $0.003 per event"
  - 2k input * $0.001/1k = $0.002. Correct.
  - 200 output * $0.005/1k = $0.001. Correct.
  - Total $0.003 per event. Correct.
- "Przy 500 events / session = $1.50" - correct.
- "Haiku 4.5 prompt caching jest 10x tanszy na read ($0.0001/MTok)" - a 10x discount on $0.001 input is $0.0001 ... but R2's stated cache-read price is $0.50/MTok while Haiku input is $1/MTok, so cache-read for Haiku would be $0.10/MTok (not $0.0001/MTok). The "10x cheaper" ratio is inconsistent. Flag this.

**R4 does not make original pricing claims.**

**R6 Patterns 11 (cost kill-switch):** directionally correct but no numbers.

**HTTP hooks - is it worth the cost overhead?** No report makes a clear "when HTTP hooks beat command hooks" cost argument. R5 Recipe 6 asserts HTTP hooks should be async because of flaky endpoints, but does not compare HTTP vs command in steady-state. Gap.

---

## 11. Code Quality Review

**Bash quoting:**
- R1 section 11 example settings.json: bash one-liners like `"osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'"` - correct JSON string escaping, correct nested single-quote in osascript. Runnable.
- R3 Blake Crosley Hook 2: `bash -c 'INPUT=$(cat); CMD=$(echo "$INPUT" | jq -r ".tool_input.command"); if echo "$CMD" | grep -qE "rm\\s+-rf\\s+/|git\\s+push\\s+(-f|--force)\\s+(origin\\s+)?main|git\\s+reset\\s+--hard|DROP\\s+TABLE|:(){ :|:& };:"; then echo "BLOCKED: Dangerous command detected: $CMD" >&2; exit 2; fi'` - the fork-bomb `:(){ :|:& };:` embedded inside `grep -qE` as an alternation branch is the fragile bit. The `|` characters will be interpreted as regex alternation. Specifically `:(){ :|:& };:` contains `|` which makes grep try to alternate between `:()` (first char literal `:`, then `()` empty group) and `:&` etc. This is probably broken as shown. Community anti-pattern R3 itself documents (item 2: "Regex-only bash blockers are trivially bypassed") - so this is self-consistent critique.
- R4 section 2.6 Pattern 1: `printf 'Writing file: %s\n' "$FILE_PATH" >> /tmp/audit.log` - clean, correct, safer than echo. Runnable.
- R5 Recipe 1: full bash with `set -euo pipefail` + proper quoting + `jq -c` for compact output. Runnable.
- R6 section 9.2 `read -p "..." ADDENDUM < /dev/tty` - the `< /dev/tty` is clever and necessary. Runnable.

**JSON schema validity:**
- R1 section 11 full settings.json - valid JSON, valid `hooks` schema. PASS.
- R3 all verbatim JSON - valid.
- R4 all verbatim JSON - valid.
- R5 Recipe 1 settings.json snippet - valid.
- R6 Pattern 4: `"timeout": 120` on an agent hook - valid but exceeds R1's 60s default; the `50 tool-use turns` cap still binds. OK.
- R7 all examples - valid.

**Python:**
- R4 section 2.6 Pattern 2 uses `re.fullmatch(r"[A-Za-z0-9._/-]+", file_path)` + plain Python I/O instead of subprocess - clean.
- R5 Recipe 5 Sentry example - correct modern SDK.

**Node:**
- R3 Deep-Dive 3 bartolli - uses `execSync`. Safe because the file path goes through the TypeScript/ESLint CLI which handles its own args. Would be safer to use spawnSync with args array but not wrong.
- R4 section 2.6 Pattern 3 uses `execFile` with array args - correct, safer than `exec`.

**General hook code quality grade:** GOOD with two caveats:
1. R3's verbatim Blake Crosley fork-bomb regex likely broken as shown.
2. None of the reports have Windows-native runnable equivalents.

---

## 12. Source Quality Review

**R1 sources (12 items):** Entirely Anthropic canonical. Highest credibility. Cannot independently verify since reports claim `code.claude.com/docs/en/*` URLs that I cannot fetch from this environment, but the citation discipline is exemplary.

**R2 sources (11 items):** Mix of Anthropic (anthropic.com/news, platform.claude.com/docs, code.claude.com/docs, github.com/anthropics/claude-code), cloud partners (aws.amazon.com/blogs), and GitHub blog. High credibility. The migration guide URL (`platform.claude.com/docs/en/about-claude/models/migration-guide`) is plausible.

**R3 sources:** 40+ GitHub repos + 20+ blog posts. The repo citations are mostly real (disler, bartolli, nizos, vaporif are well-known community handles). The blog citations (blakecrosley.com, paddo.dev, smartscope.blog, eesel.ai, claudelog.com, techsy.io, serenitiesai.com, pasqualepillitteri.it, gend.co, scalebloom.com) vary in authority - some SEO/affiliate-heavy. Use as pattern evidence, not as truth source for specific Anthropic facts.

**R4 sources:**
- Anthropic official: 5 items. Good.
- CVE advisories from Check Point Research, The Register, SecurityWeek, CybersecurityNews: each is a real outlet BUT I cannot confirm the specific URLs. The CVE-2025-59536 Check Point URL (`research.checkpoint.com/2026/rce-and-api-token-exfiltration...`) follows Check Point's normal URL structure. Plausible.
- Supply chain writeups from MintMCP, PromptArmor, Trend Micro - real outlets writing real stories about AI coding assistant security. Plausible.
- Lasso Security, TrueFoundry, Oasis Security - real vendors. Plausible.
- GitHub issue references (#13106, #390, #17804, #14281, plus Vercel plugin #34) - specific enough to be verifiable, but UNVERIFIED from this environment.

**R5 sources:**
- Anthropic docs: good.
- claudekit hook profiling guide (github.com/carlrannaberg/claudekit/blob/main/docs/guides/hook-profiling.md) - plausible, distinctive.
- ruvnet/ruflo issue #1530 - specific number, plausible but UNVERIFIED.
- cryptonomist.ch, scortier.substack.com, techsy.io, affaan-m/everything-claude-code - medium-weight.

**R6 sources:**
- Anthropic docs: good.
- claude-world.com, smartscope.blog, claudefa.st, pub.towardsai.net - medium-weight blogs.
- GitHub issue references (#7881, #33049) - plausible but UNVERIFIED.
- disler repo - solid cite.

**R7 sources:**
- Anthropic docs: good.
- eesel.ai, DEV.to, builder.io, claudelog.com, claudefa.st, claudelab.net, shanraisshan/claude-code-best-practice - mix of medium-weight.
- Direct quotes to Anthropic are clearly marked.

**Are any reports citing 2025 docs as authoritative for 2026?** Not exactly - but R4 has v1.0.x version numbers that suggest some of its sources are 2025-vintage. This is the main temporal hazard.

---

## 13. Recommendations for Syntetyk

### What to KEEP (high confidence, cross-confirmed)

1. **R1's event catalogue and handler-type table** - the anchor. Use as the spine of any hook-events reference.
2. **R1's settings-precedence ladder** - Managed > CLI > Local > Project > User. Cross-confirmed by R7. Use this exact phrasing.
3. **Exit code semantics:** 0 = success, 1 = non-blocking error, 2 = blocking. Cross-confirmed R1/R3/R4/R5. Use as the #1 takeaway for any hook writer.
4. **Hook-decision precedence `deny > defer > ask > allow`.** R1/R6 agree. Authoritative.
5. **`allow` cannot override `deny`** - R1/R4/R5/R7 agree. Security invariant.
6. **Parallel execution + dedup by command-string / URL** - R1/R5/R7 agree. Use as-is.
7. **R3's 10 pattern categories + 15 anti-patterns** - the single best community-observed "what people actually do". Compress into a single patterns section.
8. **R4's 10 top anti-patterns + hardening checklist** - operational, actionable, high-value.
9. **R5's timing-budget table (section 6)** - the only concrete team defaults artifact. Use as-is.
10. **R5's debugging flowchart (section 4)** - the only proper troubleshooting tree. Use as-is.
11. **R6's handler-type comparison matrix (section 1.5)** - cleanest "when to use which" table.
12. **R7's three-question decision triage (section 3)** - the right mental model. Promote to the synthesis opening.
13. **R7's hybrid merge semantics table (section 2.2)** - scalar override / array concat+dedup / object deep-merge. Use as-is.
14. **Opus 4.7 release date 2026-04-16** (R2). Consistent with environment.
15. **R2's pricing-of-validator-model table (section 2.7).** Directionally correct. Useful for cost-aware patterns.

### What to REJECT (high likelihood of being wrong)

1. **R4's v1.0.x version numbers.** Replace with R1/R2's v2.1.x numbering.
2. **R4's "60s default hook timeout"** claim. Use R1's 600s/30s/30s/60s breakdown.
3. **R7's `--settings` CLI flag.** R1 explicitly says it doesn't exist. Remove or cite hard.
4. **R2's Opus 4.6 200k context window** (section 2.8 line). Keep only 1M; drop the 200k mention or mark as 4.5.
5. **R7's `awayuSummaryEnabled`** - likely typo/hallucination.

### What to VERIFY before publishing (cannot decide from corpus alone)

1. **CVE-2025-59536 and CVE-2026-21852 IDs, CVSS scores, and fix-version numbers.** Check Anthropic security bulletin or MITRE.
2. **R5's `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` env var and 1.5s SessionEnd default.** Check env-vars docs.
3. **R5's OTel metric names** (`claude_code.tool_result.duration_ms`, etc.) against the monitoring-guide repo.
4. **R5's statusline JSON schema fields** (`.model.display_name`, `.context.percent`, etc.).
5. **R6's `shell: "powershell"` per-hook override.** R1 flags this as undocumented.
6. **R6's `SkillActivationHook`** event - not in R1's 28-event table.
7. **R2's specific numbers:** 346/313 tool-definition tokens, 1536 skill description chars, v2.1.91 `disableSkillShellExecution`, v2.1.92 `/tag` `/vim` removals, `output-300k-2026-03-24` and `task-budgets-2026-03-13` beta headers.
8. **R3's "async hooks landed January 2026"** - is async actually a Jan 2026 feature or longstanding?
9. **R7's `--settings` flag** (if R1 is wrong, R7 is right).
10. **GitHub issue numbers** cited across R3/R4/R6 (#1530, #390, #7881, #8810, #13106, #14281, #17804, #33049, #4160, #25872, #10373, #6305).

### What to ADD (gaps to close)

1. **Windows-native hook section.** PowerShell-based hook examples, path handling, `jq` availability, Windows managed settings registry. The user is on Win11; this is not optional.
2. **Hook testing recipes.** Fixtures + assertions + CI integration.
3. **Cost-aware worked example.** 500 events/session at X model + Y cache strategy = $Z total impact. R2 has one data point; extend.
4. **Security-bulletin subscription recommendation.** How to stay current on Anthropic CVEs.
5. **Claude Code CLI version compatibility matrix.** "feature X requires v2.1.Y" - extracted from R1+R2 and normalized to one table.
6. **Hooks + Agent_Architecture-project-specific guidance.** 35 skills / 42 commands / catalog. When does adding a hook break skill auto-routing? When does SessionStart hook inject context that the routing logic needs vs pollutes?

### Overall synthesis recipe

- Open with R7's decision triage (global/project/local).
- Spine: R1's event catalogue + handler-type table + exit-code contract.
- Dense patterns section: R3's 10 categories + R6's 12 patterns (drop the hypothetical ones unless clearly labeled).
- Security module: R4's checklist + R4's threat models, cleaned of v1.0.x and CVE uncertainty.
- Performance module: R5's budget table + debugging flowchart, env vars marked UNVERIFIED where needed.
- Opus-4.7-era module: R2's migration notes, corrected for Opus 4.6 context.
- Closing: the Windows + cost + testing + versioning gaps filled by syntetyk.

---

## 14. Per-Report Verdict Summary

| Report | Verdict | Primary reason | Primary fix required |
|---|---|---|---|
| R1 | **PASS** | Anchored in canonical docs, rich table, honest gaps section | None critical. Minor: reconcile 27 vs 28 event count. |
| R2 | **REVISE** | Self-contradicts on Opus 4.6 context window; v2.1.x vs v1.0.x version collision with R4 | Pick 1M or 200k for Opus 4.6; anchor or drop hyper-specific numbers |
| R3 | **PASS (with nitpicks)** | Solid community pattern inventory, honest anti-patterns | Fork-bomb regex embed likely broken; verify "Jan 2026 async" claim |
| R4 | **REVISE** | v1.0.x version numbers conflict with R1/R2 v2.1.x; CVE specifics UNVERIFIED; 60s vs 600s timeout error | Verify CVEs; fix version numbers; correct timeout default |
| R5 | **REVISE** | Multiple UNVERIFIED env var names and metric names, 1.5s SessionEnd default not in R1 | Verify env vars and OTel metric names; statusline schema |
| R6 | **REVISE** | "21+" vs R1's 28 events; SkillActivationHook unconfirmed; per-hook `shell: "powershell"` vs R1 gaps | Align event count; flag speculative items explicitly |
| R7 | **REVISE** | `--settings` flag asserted but R1 says undocumented; `awayuSummaryEnabled` likely typo | Drop or cite `--settings`; remove typos |

---

## 15. Closing Note

Nothing in this corpus is disqualifying. Five of seven reports need revision but the revisions are surgical, not structural. R1 is the spine; R7's decision framework is the opening; R3 + R6 together carry the patterns; R4 carries security (after v-number cleanup); R5 carries performance (after env var verification); R2 carries the Opus 4.7 delta (after resolving the 4.6 context window). Windows guidance is the single biggest missing artifact.

Bad NESTED assumptions to watch: any claim about a Claude Code CLI version number, any env var, any CVE ID, any exact-char cap. These are where honest researchers hallucinate by over-specifying.

**Auditor recommendation:** syntetyk can proceed with the 7-report corpus AFTER applying the 5 REJECT fixes and flagging the 10 VERIFY items. Do not wait for full verification - mark UNVERIFIED inline and ship.

---

**Word count:** ~3900 words.
**Last updated:** 2026-04-17.
