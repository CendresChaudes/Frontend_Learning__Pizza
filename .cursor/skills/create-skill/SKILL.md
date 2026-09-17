---
name: create-skill
description: >-
  Author Cursor Agent Skills with the required file structure and contents.
  Enforce SKILL.md frontmatter (name, description), required examples/good.md
  and examples/bad.md, scripts/ for executable helpers, English, progressive
  disclosure, no inlined script bodies. Use when creating a new skill, editing a
  SKILL.md, adding examples, or scaffolding a skill directory. Triggers: create
  skill, author SKILL.md, skill structure, add examples, scaffold skill.
---

# Create Skill

## When to apply

Apply automatically when creating a new skill, editing a `SKILL.md`, adding examples, or scaffolding a skill directory under `.cursor/skills/`.

## Required structure

A skill lives in `.cursor/skills/<skill-name>/` and consists of at least these files:

```text
.cursor/skills/<skill-name>/
├── SKILL.md
├── examples/
│   ├── good.md
│   └── bad.md
└── scripts/
    └── *.py
```

- `SKILL.md` — required. Frontmatter: `name` (lowercase, hyphens, max 64 chars) and `description` (max 1024 chars, third person, includes WHAT + WHEN + trigger terms). Omit `disable-model-invocation` only when the agent should auto-invoke from ambient context. Body under 500 lines, in English. Put essentials here; link to `examples/` and `scripts/` (progressive disclosure, one level deep) instead of inlining them.
- `examples/good.md` — required. Concrete examples of the skill applied correctly: real inputs/outputs, commands, or code the agent should produce. Positive patterns only.
- `examples/bad.md` — required. Anti-examples: what not to do, each with a one-line reason it's wrong. Pair each bad example with the good counterpart it should become.
- `scripts/` — only when the skill needs executable helpers. Scripts are `.py` (Python 3), executable, and live under `scripts/` — never inline script bodies in `SKILL.md`. Reference them from `SKILL.md` with a relative link (`scripts/foo.py`) and the run command (`python3 .cursor/skills/<skill>/scripts/foo.py`); keep script behavior and exit codes documented in the script header.

## Rules

- Skills, examples, and scripts are written in English (per `management/general.mdc`); identifiers, paths, and commands stay in their original form.
- Any script under `.cursor/` must be a `.py` Python 3 script — no `.js`/`.ts`/`.sh` (per `management/general.mdc`).
- One concern per skill; split instead of overloading a single `SKILL.md`.
- Don't duplicate content across `SKILL.md` and `examples/` — link, don't copy.
- Verify a new skill with `cspell`, `prettier --check`, and `eslint --quiet` on the touched files before reporting done (per the `verify` skill).

## Examples

- Correct skill structure — see [`examples/good.md`](examples/good.md).
- Anti-patterns — see [`examples/bad.md`](examples/bad.md).
