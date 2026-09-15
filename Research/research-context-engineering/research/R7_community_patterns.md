# R7: Power-User Patterns 2026 - Pre-Compact Checklists, Session Doctrine, Hybrid Context Management

**Researcher:** R7 - Researcher X/Twitter (power-user patterns live)
**Campaign:** Claude Code Context Engineering 2026
**Date:** 2026-04-17
**validation_status:** PARTIALLY_VALIDATED (X/Twitter direct fetch blocked by paywall; patterns cross-confirmed via blogs, GitHub, official Anthropic sources)

---

## Summary

Community power-user context management has matured into a well-defined set of patterns in 2026. The core shift: context engineering has replaced prompt engineering as the primary productivity lever. The field has settled on ~8 distinct patterns with significant community consensus. Pre-compact save-state workflows (PROGRESS.md, HANDOVER.md, SESSION-NOTES.md) are now standard practice. The /compact-with-hint command is the dominant single-session tactic. Three major tool categories have emerged: hooks-based automation (PreCompact hook, claude-mem), AI-compiled memory (claude-memory-compiler), and structured handoff commands (/handoff:create, /checkpoint, /restore).

Key viral signal: Boris Cherny (@bcherny, creator of Claude Code) posted a "hidden features" thread on 2026-03-29 that became a reference anchor for the community. Zara Zhang's (@zarazhangrui) /handover command (2026-03-??) was widely copied and spawned a plugin ecosystem. The MindBranches session fast-rules summary (2026-04-??) was widely circulated.

Critical finding: auto-compact threshold is NOT natively configurable via settings.json (highly requested feature, multiple open GitHub issues) - workaround is `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` env var.

---

## Top 10 Power-User Patterns

### PATTERN 1: PROGRESS.md Checkpoint Before /clear

**Name:** Pre-Clear PROGRESS.md Write
**Description:** Before reaching context limit, ask Claude to summarize: accomplishments, files modified with rationale, next 3 steps, decisions/constraints - save to `PROGRESS.md`. Then run `/clear` and paste summary back into fresh session.
**Hype score:** 9/10
**Tier:** Tier 1 (official Anthropic docs, Boris Cherny, Claude Code best practices)
**Sources:**
- https://claudefa.st/blog/guide/mechanics/context-management
- https://dev.to/subprime2010/claude-code-memory-how-to-survive-a-200k-context-window-filling-up-idk
- https://support.claude.com/en/articles/14554000-claude-code-power-user-tips
**validation_status:** VALIDATED - confirmed in official docs + community

**Concrete pattern:**
```
Ask Claude: "Before we hit the limit, summarize: what we accomplished,
which files were modified and why, next 3 steps, any constraints.
Save to PROGRESS.md."
Then: /clear
Then: "Read PROGRESS.md and continue from there."
```

---

### PATTERN 2: /handover Command + HANDOVER.md

**Name:** Session Handover Document
**Description:** Custom slash command `/handover` generates a HANDOVER.md at session end capturing: decisions, pitfalls, lessons, failed approaches (do not repeat), key decisions with rationale, current state (working vs broken), resume instructions with numbered steps.
**Hype score:** 8/10
**Tier:** Tier 1 (Zara Zhang, widely copied in community)
**Source tweets:**
- @zarazhangrui status/2020992712825241801 (date: ~2026-03-??, engagement: viral in CC community)
- @commte status/2023231375198028049 (Japanese echo - "pre auto compact hook")
**Plugin repos:**
- https://github.com/willseltzer/claude-handoff
- https://mcpmarket.com/tools/skills/session-handover
**validation_status:** VALIDATED - independent implementations confirm pattern

**HANDOVER.md structure (from willseltzer/claude-handoff):**
- Goal + timestamp + branch
- Completed items (checkbox)
- Outstanding tasks
- Failed approaches (DON'T repeat these)
- Key decisions (decision/rationale table)
- Current state: working vs broken
- Resume instructions (numbered + expected outcomes)
- Env vars and warnings

---

### PATTERN 3: /compact with Targeted Hint

**Name:** Directed Compaction
**Description:** Never run bare `/compact`. Always provide context hint: `/compact focus on auth refactor, drop test debugging`. This tells Claude what to preserve vs discard during compaction, preventing critical context loss.
**Hype score:** 9/10
**Tier:** Tier 1 (Anthropic official blog, Boris Cherny)
**Sources:**
- https://claude.com/blog/using-claude-code-session-management-and-1m-context
- @MindBranches status/2044733281204387983 (session fast rules, widely shared)
**validation_status:** VALIDATED - official Anthropic recommendation

**Fast rules from MindBranches (viral summary):**
```
Related follow-up, same working set   -> Continue
New task                              -> /clear
Wrong path, same task                 -> /rewind (Esc Esc)
Same task, context getting heavy      -> /compact [with hint]
Need lessons from failed branch       -> HANDOVER.md first
```

---

### PATTERN 4: PreCompact Hook - Automated State Capture

**Name:** PreCompact Emergency Backup Hook
**Description:** Hook fires RIGHT BEFORE compaction, capturing full session transcript to a JSON/markdown backup. Extracts: user messages, file modifications (write/edit tool calls), task events, sub-agent invocations, loaded skills, MCP tool usage, build/test commands. Filters noise (tool results, system messages, single-char inputs).
**Hype score:** 8/10
**Tier:** Tier 2 (community tool, claudefa.st implementation)
**Sources:**
- https://claudefa.st/blog/tools/hooks/context-recovery-hook
- https://github.com/Ixe1/claude-code-checkpointing-hook
- https://github.com/anthropics/claude-code/issues/15923 (feature request: pre-compaction hook)
**validation_status:** VALIDATED

**Implementation key:**
```json
{ "async": true }  // Required - don't slow down compaction
```
**State file:** `~/.claude/claudefast-statusline-state.json`
Fields: sessionId, lastFreeUntilCompact, lastBackupAtTokens, currentBackupPath

**Triggers:** `precompact_auto` | `precompact_manual`

---

### PATTERN 5: Context Budget Thresholds + autoCompact Override

**Name:** Context Budget Planning with Threshold Configuration
**Description:** Community consensus on 60-75% as safe autocompact trigger. Native settings.json config NOT available (multiple open GitHub issues: #11819, #15719, #25679, #28728, #34126, #46695). Workaround: `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` env var (1-100).
**Hype score:** 7/10
**Tier:** Tier 2 (community + GitHub issues)
**Sources:**
- https://github.com/anthropics/claude-code/issues/46695
- https://github.com/anthropics/claude-code/issues/15719
- https://www.mindstudio.ai/blog/ai-agent-token-budget-management-claude-code
- https://buildtolaunch.substack.com/p/claude-code-token-optimization
**validation_status:** VALIDATED

**Power-user config pattern:**
```json
// settings.json workaround (env var method):
{
  "env": {
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "75",
    "CLAUDE_CODE_EFFORT_LEVEL": "max",
    "CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING": "1"
  }
}
```

**Key numbers:**
- 80% threshold: stop complex multi-file work (claudefa.st recommendation)
- 60% threshold: community recommendation for proactive compaction
- 33K tokens: reserved by auto-compact buffer (non-negotiable)
- 20%: context where quality degradation begins (claudefa.st finding)

---

### PATTERN 6: Session Per Task Doctrine (Session Isolation)

**Name:** One-Task-One-Session Rule
**Description:** Canonical rule: "When you start a new task, start a new session." Prevents context rot accumulation across unrelated work. Effective session cost drops from $2.87 to $0.94 average when switching from long drag-on sessions to focused isolated sessions. Community shorthand: "New topic = new chat. No exceptions."
**Hype score:** 9/10
**Tier:** Tier 1 (Anthropic official + Boris Cherny)
**Sources:**
- https://claude.com/blog/using-claude-code-session-management-and-1m-context
- https://buildtolaunch.substack.com/p/claude-code-token-optimization
- https://scortier.substack.com/p/claude-code-drama-6852-sessions-prove
- @bhaidar status/2015152391658611052 (Bilal Haidar: "Clear Session between tasks!")
**validation_status:** VALIDATED

**Additional insight from 6852-session study (Scortier):**
- 2-hour session = 2-3 compactions = compounding summary dilution
- Performance degradation begins at 20% context utilization (not 80%)
- Effective high-quality window: ~400K tokens of the advertised 1M

---

### PATTERN 7: Plan Acceptance = Automatic Context Clear

**Name:** Plan-Then-Clear Pattern
**Description:** Native Claude Code feature (shipped ~2026-02): accepting a plan automatically clears context, giving plan execution a fresh context window. Boris Cherny (creator): "We found this helps keep Claude on track longer, and significantly improves plan adherence." Power users pair this with CLAUDE.md containing project state.
**Hype score:** 8/10
**Tier:** Tier 1 (Boris Cherny, @bcherny, Claude Code creator)
**Source tweet:** @bcherny status/2012663636465254662
**Source:** https://www.mindstudio.ai/blog/ai-agent-token-budget-management-claude-code
**validation_status:** VALIDATED

---

### PATTERN 8: claude-mem + claude-memory-compiler (Automated Memory Pipeline)

**Name:** AI-Compiled Session Memory
**Description:** Two distinct tool approaches to automated context persistence:

**Tool A: claude-mem** (thedotmack/claude-mem)
- 5 lifecycle hooks: SessionStart -> UserPromptSubmit -> PostToolUse -> Summary -> SessionEnd
- SQLite3 DB at `~/.claude-mem/claude-mem.db`
- Worker on Express API port 37777
- AI compresses captures and injects relevant context into future sessions
- April 2026 backlog: 93 PRs, 147 issues merged into 138 tracking items

**Tool B: claude-memory-compiler** (coleam00/claude-memory-compiler)
- Based on Karpathy LLM Knowledge Base architecture
- Hooks: SessionEnd + PreCompact -> flush.py -> daily/YYYY-MM-DD.md -> compile.py
- Knowledge dirs: concepts/, connections/, qa/
- 6 PM auto-compilation trigger
- No RAG (structured index outperforms vector at personal scale of 50-500 articles)
- SessionStart hook re-injects compiled index into new sessions

**Hype score:** 7/10
**Tier:** Tier 2 (community tools, active development)
**Sources:**
- https://github.com/thedotmack/claude-mem
- https://github.com/coleam00/claude-memory-compiler
- https://aitoolly.com/ai-news/article/2026-04-15-claude-mem-a-new-claude-code-plugin-for-automated-session-memory-and-context-injection
**validation_status:** PARTIALLY_VALIDATED (tools exist and are active; effectiveness claims require longer-term testing)

---

### PATTERN 9: Subagent Isolation for Context Budget

**Name:** Subagent-as-Context-Firewall
**Description:** Mental test: "Will I need this tool output again, or just the conclusion?" If just the conclusion - use a subagent. Subagents get fresh 200K context windows; only 1K-2K token summaries return to parent session. Rule of thumb: "Anything requiring reading more than 3-4 large files is a solid subagent candidate."
**Hype score:** 8/10
**Tier:** Tier 1 (Anthropic engineering blog + official docs)
**Sources:**
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- https://buildtolaunch.substack.com/p/claude-code-token-optimization
- @zhuokaiz status/2030028470328164528 (`fork` command guide, widely read)
**validation_status:** VALIDATED

---

### PATTERN 10: Hybrid Human/AI Context Management (Manual Summary + Selective Load)

**Name:** Structured Knowledge File System
**Description:** Pre-session token audit: load only relevant knowledge files, not all. Split monolithic CLAUDE.md into domain-specific files (e.g., `policies.md`, `wot.md`, `queries.md`). Session starts with manual summary of "what matters today" before any file reads. Opening context summary gets highest attention weight - "earlier context is more reliably referenced than context buried in the middle."
**Hype score:** 7/10
**Tier:** Tier 2 (Thomas Landgraf substack, community)
**Sources:**
- https://thomaslandgraf.substack.com/p/context-engineering-for-claude-code
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- https://dev.to/subprime2010/claude-code-memory-how-to-survive-a-200k-context-window-filling-up-idk
**validation_status:** PARTIALLY_VALIDATED

**Key finding from Landgraf:** "A single research session consumes 100K+ tokens and costs $40-70" - front-load research into reusable documents. Keep CLAUDE.md under 500 lines (200 lines target). 5K token CLAUDE.md costs 5K tokens every single turn.

---

## Cited Threads / Tweets (with URLs and Dates)

| Handle | Status ID | Approx Date | Topic | Viral? |
|--------|-----------|-------------|-------|--------|
| @bcherny | 2038454336355999749 | 2026-03-29 | Hidden + underused Claude Code features | YES (790K views) |
| @bcherny | 2017742741636321619 | ~2026-03-?? | Boris's own Claude Code setup/tips | HIGH |
| @bcherny | 2012663636465254662 | ~2026-02-?? | Plan acceptance = auto context clear | HIGH |
| @zarazhangrui | 2020992712825241801 | ~2026-03-?? | /handover custom command + HANDOVER.md | YES (widely copied) |
| @MindBranches | 2044733281204387983 | ~2026-04-?? | Session fast rules (5 decision rules) | NICHE (high quality) |
| @bhaidar | 2015152391658611052 | ~2026-02-?? | Claude Code mind map + context tips | MODERATE |
| @zhuokaiz | 2030028470328164528 | ~2026-03-?? | `fork` command for subagent isolation | NICHE (technical) |
| @commte | 2023231375198028049 | ~2026-03-?? | /handover + pre auto compact hook (JP) | NICHE |
| @omarsar0 | 2024587792127340731 | ~2026-03-?? | Context limits + prompt caching tips | MODERATE |
| @ClaudeCodeLog | 2032507422393164029 | ~2026-03-?? | CLI 2.1.75: 1M context for Opus 4.6 | INFORMATIONAL |

**Note:** Status IDs are from search snippets. Direct X/Twitter fetches returned 402 (paywall). Dates estimated from status ID ordering and surrounding context.

---

## Tool Inventory

| Tool | GitHub | Category | Status |
|------|--------|----------|--------|
| claude-mem | github.com/thedotmack/claude-mem | Automated session memory | ACTIVE (Apr 2026: 93 PRs merged) |
| claude-memory-compiler | github.com/coleam00/claude-memory-compiler | AI-compiled KB from sessions | ACTIVE |
| claude-checkpoint | github.com/sinzin91/claude-checkpoint | /checkpoint + /restore commands | ACTIVE |
| claude-handoff | github.com/willseltzer/claude-handoff | /handoff:create, :quick, :resume | ACTIVE |
| claude-code-checkpointing-hook | github.com/Ixe1/claude-code-checkpointing-hook | Git checkpoint before file changes | ACTIVE |
| claude-session-restore | github.com/ZENG3LD/claude-session-restore | Restore context from git history | ACTIVE |
| claude-code-tools (pchalasani) | github.com/pchalasani/claude-code-tools | Skills to avoid compaction | ACTIVE |
| claudekit (carlrannaberg) | github.com/carlrannaberg/claudekit | Auto-save checkpointing | ACTIVE |
| recall (zippoxer) | github.com/zippoxer/recall | Full-text search across sessions | ACTIVE |
| awesome-claude-code | github.com/hesreallyhim/awesome-claude-code | Curated community registry | ACTIVE |
| awesome-claude-code-toolkit | github.com/rohitg00/awesome-claude-code-toolkit | 135 agents + 176 plugins + 20 hooks | ACTIVE |
| claude-code-hooks-mastery | github.com/disler/claude-code-hooks-mastery | Hook implementation examples | ACTIVE |

**Notable env vars (power user config layer):**
- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` - threshold override (1-100)
- `CLAUDE_CODE_EFFORT_LEVEL` - low/medium/high/max (default: medium since 2026-03-03)
- `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` - 1 to disable (workaround for zero-reasoning bug)

---

## Conflicts Detected

**CONFLICT 1: Compaction threshold recommendations**
- buildtolaunch.substack: 60% threshold
- claudefa.st: 80% threshold (stop complex work)
- Anthropic official: no specific threshold given
- Resolution: likely workflow-dependent. 60% = aggressive (safe, costly), 80% = permissive (efficient, risky for complex tasks). Use 60-70% as default.

**CONFLICT 2: 1M context window effectiveness**
- Official Anthropic: 1M context available for Max/Team/Enterprise
- Scortier study (6852 sessions): effective high-quality window ~400K; degradation at 20% utilization
- claudefa.st: performance issues at 20%, compression at 40%
- Resolution: treat 1M as theoretical max; practical budget for complex work is 300-400K tokens. Session doctrine applies regardless.

**CONFLICT 3: Adaptive thinking / effort level**
- Boris Cherny (official): workarounds exist (/effort max, CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1)
- Scortier/Stella Laurenzo study: 73% reasoning depth decline (2200 -> 600 chars) Jan->Mar 2026
- Anthropic position: deliberate changes for latency; /effort high is opt-in
- Resolution: power users SHOULD set CLAUDE_CODE_EFFORT_LEVEL=max for complex tasks. This is an underpublicized but important finding.

---

## Gaps / Requires Validation

1. **Exact engagement metrics for viral tweets** - X/Twitter direct fetch blocked (402). Engagement numbers ("790K views" for bcherny thread) are from secondary sources.
2. **HANDOVER.md vs SESSION-NOTES.md vs PROGRESS.md** - three competing naming conventions with no canonical winner. Community fragmentation.
3. **autoCompactAt in settings.json** - Multiple GitHub issues open (latest: #46695) but no merge yet as of 2026-04-17. Status may have changed.
4. **Effectiveness of claude-mem AI compression** - No controlled benchmarks found comparing manual PROGRESS.md vs automated claude-mem injection.
5. **@simonw Agentic Engineering Patterns newsletter** - content confirmed (Feb 27, 2026) but specific context-management patterns behind Substack paywall.
6. **@swyx IMPACT framework** - referenced in multiple sources but no direct context-budget-specific content found.

---

## Citations

1. https://claude.com/blog/using-claude-code-session-management-and-1m-context (Anthropic official, 2026)
2. https://claudefa.st/blog/guide/mechanics/context-management (claudefa.st, 2026)
3. https://claudefa.st/blog/tools/hooks/context-recovery-hook (PreCompact hook implementation)
4. https://buildtolaunch.substack.com/p/claude-code-token-optimization (buildtolaunch substack, 2026)
5. https://scortier.substack.com/p/claude-code-drama-6852-sessions-prove (6852-session study, 2026)
6. https://github.com/thedotmack/claude-mem (claude-mem repo, active Apr 2026)
7. https://github.com/coleam00/claude-memory-compiler (Karpathy-inspired memory compiler)
8. https://github.com/willseltzer/claude-handoff (handoff plugin, structured HANDOVER.md)
9. https://github.com/sinzin91/claude-checkpoint (/checkpoint + /restore plugin)
10. https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents (Anthropic engineering blog)
11. https://x.com/zarazhangrui/status/2020992712825241801 (@zarazhangrui /handover command, 2026)
12. https://x.com/bcherny/status/2012663636465254662 (@bcherny plan-acceptance context clear, 2026)
13. https://x.com/bcherny/status/2038454336355999749 (@bcherny hidden features thread, 2026-03-29)
14. https://x.com/MindBranches/status/2044733281204387983 (session fast rules, 2026)
15. https://x.com/bhaidar/status/2015152391658611052 (Claude Code mind map tips)
16. https://pasqualepillitteri.it/en/news/805/claude-code-effort-adaptive-thinking-guida (effort/adaptive thinking workarounds)
17. https://dev.to/subprime2010/claude-code-memory-how-to-survive-a-200k-context-window-filling-up-idk (DEV.to survival guide)
18. https://thomaslandgraf.substack.com/p/context-engineering-for-claude-code (Thomas Landgraf substack)
19. https://github.com/hesreallyhim/awesome-claude-code (awesome-claude-code registry)
20. https://simonw.substack.com/p/agentic-engineering-patterns (Simon Willison, Feb 27, 2026)
21. https://x.com/omarsar0/status/2024587792127340731 (@omarsar0 context limits + caching)
22. https://github.com/anthropics/claude-code/issues/46695 (autoCompact threshold feature request)

---

## Hype Assessment

- **Context engineering > prompt engineering**: VALIDATED, consensus across all sources
- **1M context solves session problems**: REQUIRES_VALIDATION - effective quality window appears to be ~300-400K based on empirical data
- **Automated memory tools (claude-mem)**: PARTIALLY_VALIDATED - active development, no controlled benchmarks
- **Session per task doctrine**: VALIDATED - cost and quality data support this
- **CLAUDE.md as primary memory layer**: VALIDATED - Tier 1 sources, Boris Cherny confirms

---

## Recommendation

**GO for R7 synthesis inclusion.** 10 well-defined patterns with source corroboration. Key actionable gaps for CRITIC review:

1. Threshold conflict (60% vs 80%) - recommend CRITIC flag for synthesis note
2. Missing native autoCompact config - important for practitioners (should be in SYNTHESIS as "known gap")
3. Effort level default change (2026-03-03) - underpublicized, high practical impact - recommend highlight in SYNTHESIS
4. HANDOVER.md naming fragmentation - recommend SYNTHESIS pick one canonical name

**BRAMA 2 STATUS:** PASS - research complete, 10 patterns documented, 22 sources (>10 URL minimum met), conflicts flagged, tool inventory compiled.
