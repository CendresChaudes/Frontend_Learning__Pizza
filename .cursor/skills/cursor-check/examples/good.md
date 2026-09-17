# Good: cursor-check output

## Trigger

User: «проверь текущее состояние файлов .cursor»

## Report

```
## Rules
- .cursor/rules/management/docs.mdc — OK
- .cursor/rules/product/screens.mdc — OK

## Skills
- .cursor/skills/docs-ru/SKILL.md — OK (name, description, examples/good.md, examples/bad.md present)
- .cursor/skills/docs-update/SKILL.md — OK (disable-model-invocation: true)
- .cursor/skills/cursor-check/SKILL.md — OK

## Hooks
- .cursor/hooks.json — parses, references post-work-verify.py (exists, executable)

## Cross-refs
- "check:tests:all" referenced in .cursor/rules/stack/testing.mdc:17 — exists in package.json:29 ✓

## Итог: 0 проблем / всё в порядке
```

- Read-only: nothing was edited.
- Findings grouped by section with paths and line numbers.
- One-line summary at the end.
