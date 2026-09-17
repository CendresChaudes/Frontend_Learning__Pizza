# Good examples — `create-skill`

## 1. Required structure, minimal skill (no scripts)

```text
.cursor/skills/format-date/
├── SKILL.md
└── examples/
    ├── good.md
    └── bad.md
```

`SKILL.md` frontmatter — third person, WHAT + WHEN + trigger terms:

```yaml
---
name: format-date
description: >-
  Format dates for display using the project's helpers. Use when rendering or
  parsing dates in UI. Triggers: format date, display date, parse ISO date.
---
```

Body links to examples instead of inlining them.

## 2. Skill with an executable helper

```text
.cursor/skills/verify/
├── SKILL.md
├── examples/
│   ├── good.md
│   └── bad.md
└── scripts/
    └── verify.py
```

`SKILL.md` references the script with a relative link and the run command — the script body is **not** inlined:

```sh
python3 .cursor/skills/verify/scripts/verify.py <paths>
```

The script header documents behavior and exit codes.

## 3. `examples/bad.md` pairs each anti-pattern with the fix

Each bad item states the wrong pattern, a one-line reason, and points at the good counterpart. Example shape:

- **Wrong:** inline the script body in `SKILL.md`.
- **Why:** duplicates the script and drifts from it.
- **Fix:** link to `scripts/foo.py` with the run command instead.
