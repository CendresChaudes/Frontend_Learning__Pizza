# Bad examples — `create-skill`

## ❌ Missing `examples/good.md` or `examples/bad.md`

A skill with only `SKILL.md`.

Why: both example files are required — `good.md` shows correct application, `bad.md` shows anti-patterns. Scaffold them even if short.

## ❌ Inline a script body in `SKILL.md`

```sh
#!/bin/sh
set -eu
pnpm run generate
```

Why: the script drifts from its inlined copy. Put it in `scripts/foo.sh` and link with the run command; keep behavior/exit codes in the script header.

## ❌ Non-English skill content

`SKILL.md` or examples written in Russian.

Why: skills are written in English (per `management/general.mdc`). Identifiers, paths, and commands stay in their original form; prose is English.

## ❌ Duplicate content between `SKILL.md` and `examples/`

The full example repeated in `SKILL.md` and again in `examples/good.md`.

Why: progressive disclosure means link, don't copy. Put essentials in `SKILL.md`, concrete examples in `examples/`.

## ❌ Overloaded `SKILL.md`

One `SKILL.md` covering codegen, testing, and forms.

Why: one concern per skill. Split into separate skills instead of overloading a single file.

## ❌ Skill name with uppercase or trailing hyphen

`.cursor/skills/FormatDate/` or `.cursor/skills/format-date-/`

Why: `name` is lowercase, hyphens, max 64 chars, no leading/trailing hyphen. The directory matches the `name`.
