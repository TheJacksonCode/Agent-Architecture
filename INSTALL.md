# Installing the agents and presets in Claude Code

Agent Architecture Designer is two things in one repo: a single-HTML visual tool you open in a
browser, and a source of truth for **60 agent prompts** and **62 team presets** you can use
directly inside [Claude Code](https://claude.com/claude-code). This file covers the second part.

## What you get

- **60 agent skills** in `~/.claude/skills/*.md` - one self-contained prompt per agent (role,
  input/output contract, responsibilities, rules, anti-patterns)
- **62 team presets** in `~/.claude/commands/*.md` - each one a slash command (`/deep-five-minds`,
  `/security`, `/solo`, ...) that orchestrates a subset of the 60 agents across phases
- **A routing catalog** at `~/.claude/PRESET_CATALOG.md` - lets Claude Code propose a preset from
  a plain-language task description instead of you picking one by hand (see step 4)

All three are **global** - once generated, they work in every project on your machine, not just
this repo. Nothing is installed into Claude Code's own settings; these are plain Markdown files it
reads when you invoke them.

## Fastest path - install as a plugin

Skip everything below if you just want the agents and presets, not the ability to regenerate them.
The repo is itself a Claude Code plugin:

```
/plugin marketplace add TheJacksonCode/Agent-Architecture
/plugin install agent-architecture-designer@Agent-Architecture
```

This installs the same 60 agents and 62 presets, bundled in-repo as `agents/*.md` and
`commands/*.md`. The rest of this file covers the clone-and-generate path instead - use it if you
want to regenerate after editing the source HTML, add your own agent, or keep the files in
`~/.claude/` directly rather than as a plugin.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (only used to run the generator scripts below -
  nothing gets installed as a dependency, there is no `package.json`)
- [Claude Code](https://claude.com/claude-code) installed and working

## 1. Clone the repo

```bash
git clone https://github.com/TheJacksonCode/Agent-Architecture.git
cd Agent-Architecture
```

## 2. Generate the skills and commands

```bash
node generate_skills.js      # writes ~/.claude/skills/*.md      (60 files)
node generate_commands.js    # writes ~/.claude/commands/*.md    (62 files)
```

Both scripts read the agent and preset definitions straight out of
`v41/AGENT_TEAMS_CONFIGURATOR_v41.html` (the same file the browser app runs on), so the skills and
commands you get are guaranteed to match what you see in the encyclopedia.

By default, both scripts are **additive-only** - they write files that don't exist yet and leave
everything else untouched. This matters because skill files carry an `effort:` field
(`low` / `medium` / `high` / `xhigh`) that people commonly hand-tune after installing, and a
careless overwrite would silently discard that tuning.

If you want a full, clean regeneration (for example after pulling a new version of this repo):

```bash
node generate_skills.js --all      # rewrites every skill file (keeps your existing effort: values)
node generate_commands.js --all    # rewrites every command file (this DOES reset agent/model choices)
```

Run the plain scripts (no `--all`) after adding a brand-new agent or preset to the HTML - they will
only create what's missing and print a coverage report of anything still out of sync (a preset with
no matching agents, an agent with no skill file, etc.).

## 3. Use a preset

Open Claude Code in any project and type `/`. You should see all 62 presets in the autocomplete
list, grouped roughly by size:

| Tier | Example | Agents |
|------|---------|--------|
| Minimal | `/solo`, `/quick-fix`, `/trio` | 2-3 |
| Core | `/bug-hunt`, `/test-suite`, `/startup` | 4-6 |
| Advanced | `/security`, `/design-sys`, `/research` | 7-11 |
| Enterprise | `/saas`, `/full`, `/five-minds`, `/deep-five-minds` | 12-27 |

Run `/deep-five-minds <your task>` (or any other preset) and Claude Code will spawn the agents in
that preset's `## REFERENCES TO SKILLS` table, in phase order, with the model each one is assigned
in the app (Opus / Sonnet / Haiku).

Not sure which preset fits your task? Open the app, use the search box in the left panel, or read
the "Use when" / "vs" comparisons in each preset's encyclopedia entry - that text was written
specifically to help you pick.

## 4. (Optional) Auto-routing from a task description

Instead of picking a preset by hand, you can describe your task in plain language and have Claude
Code propose the best preset on its own - this is how the author uses the project day to day.

```bash
node generate_catalog.js     # writes ~/.claude/PRESET_CATALOG.md (all 62 presets, ~8,600 tokens)
```

This builds a single Markdown catalog - grouped by size tier, one entry per preset with its
description, "Use when", strengths/limits, token range, and estimated cost, all pulled straight
from the same HTML the other two scripts read. Unlike skills and commands there is nothing to
hand-tune per entry, so this one always does a full rewrite; re-run it any time after pulling a
new version.

The catalog on its own doesn't do anything - Claude Code needs a short routing instruction in your
own `~/.claude/CLAUDE.md` telling it to consult `~/.claude/PRESET_CATALOG.md` when a task looks
like it needs a multi-agent team. The full design - token budget, catalog structure, decision
guide - is documented in [`docs/ROUTING_SYSTEM.md`](docs/ROUTING_SYSTEM.md); copy the routing
snippet from there into your `CLAUDE.md` once the catalog exists. If you only need explicit
`/preset-name` commands, you can skip this section entirely - step 3 above is already everything
you need.

## Updating after a new version of this repo

```bash
git pull
node generate_skills.js --all
node generate_commands.js --all
```

`--all` is safe to run after every update: it always keeps your hand-edited `effort:` values, and
it re-syncs everything else (prompts, model assignments, new agents/presets) to match the latest
HTML. Compare against `VERSIONS.md` and the README's version table if you want to know what
actually changed before regenerating.

## Adding your own agent to the catalog

This repo's own `AGENT_META` table (inside `generate_skills.js`) is the mapping from an agent ID to
its phase and allowed tools - it has to know about an agent before it can generate a skill file for
it. The short version:

1. Add the agent's definition to the HTML (`AGENT_EDU_PL` object in `v41/AGENT_TEAMS_CONFIGURATOR_v41.html`)
2. Add its ID to `AGENT_META` in `generate_skills.js` with a phase and tool list
3. Run `node generate_skills.js` - it will create just the new skill file, nothing else
4. Add the agent to any preset(s) it belongs to (`PR` object in the HTML)
5. Run `node generate_commands.js` to update the affected command files with the new skill reference

Full field-by-field format: [`docs/SKILLS_ARCHITECTURE.md`](docs/SKILLS_ARCHITECTURE.md).

## Troubleshooting

- **`/preset-name` doesn't show up in Claude Code** - confirm the file exists at
  `~/.claude/commands/<preset-name>.md`. If it's missing, re-run `node generate_commands.js` and
  check its printed coverage report for a mismatch.
- **A preset runs but an agent behaves unexpectedly** - open its skill file directly
  (`~/.claude/skills/<agent-id>.md`) and read the prompt; it's plain Markdown, safe to read or
  hand-edit. If you edit it by hand, `--all` regeneration will preserve your `effort:` value but
  will overwrite the prompt body itself the next time you run it with `--all`.
- **Scripts fail with a "cannot find HTML" error** - they read from
  `v41/AGENT_TEAMS_CONFIGURATOR_v41.html` relative to the repo root; run them from inside the
  cloned repo, not from an arbitrary working directory.
- **You want the old v32 catalog instead** - the generator scripts are pinned to v41 by design
  (`HTML_PATH` at the top of each file); point that constant at
  `v32/AGENT_TEAMS_CONFIGURATOR_v32.html` if you specifically need the smaller 35-agent /
  42-preset set, but note the two catalogs are not designed to be mixed.
