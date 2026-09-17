---
name: cursor-check
description: >-
  Audit the current state of the .cursor/ configuration — rules, skills,
  hooks, agents. Explicit slash command (/cursor-check); does not auto-load.
  Also triggers on: check cursor config, audit .cursor.
disable-model-invocation: true
---

# cursor-check

Audit the `.cursor/` directory and report its current state. Explicit slash command (`/cursor-check`); does not auto-load.

## When to apply

Invoke with `/cursor-check` when you want a health check of the Cursor configuration — i.e. «проверь текущее состояние файлов .cursor».

## What to check

### Rules — `.cursor/rules/**/*.mdc`

- Frontmatter present and valid: `description` (required), `alwaysApply` (boolean), `globs` (string when set).
- No two rules with overlapping `alwaysApply: true` + same `globs` causing duplicate injection.
- Referenced paths (links like `[x](./y.mdc)`) resolve to existing files.

### Skills — `.cursor/skills/*/SKILL.md`

- Required frontmatter: `name` (lowercase, hyphens, ≤64 chars) and `description` (≤1024 chars).
- Required files present: `examples/good.md`, `examples/bad.md`.
- `scripts/` (if any) contains only `.py` files (per `management/general`); no inlined script bodies in `SKILL.md`.
- Prose in English (per `create-skill`); identifiers/paths/commands in original form.

### Hooks — `.cursor/hooks.json` + `.cursor/hooks/*.py`

- `hooks.json` parses as valid JSON and references only existing scripts.
- Hook scripts are `.py` (Python 3), present, and executable.

### Agents — `.cursor/agents/*` (if present)

- Each agent file parses; referenced tools/paths exist.

### Cross-references

- Script/identifier names mentioned in `.cursor/rules/**` or `.cursor/skills/**` (e.g. `check:tests:all`) exist in `package.json` or the referenced source — catches the stale-reference class of bugs.

## How to report

- Group findings by section (Rules / Skills / Hooks / Agents / Cross-refs).
- For each issue: file path, line if known, what's wrong, suggested fix.
- End with a one-line summary: «N проблем / всё в порядке».
- Don't fix anything — this command reports state only. Offer to fix as a follow-up.

## Scope

- Read-only: inspect `.cursor/**` and `package.json`. Don't edit files as part of this command.
- Don't run dev server, builds, tests, or package managers.

## Examples

- Correct audit output — see [`examples/good.md`](examples/good.md).
- Anti-patterns — see [`examples/bad.md`](examples/bad.md).
