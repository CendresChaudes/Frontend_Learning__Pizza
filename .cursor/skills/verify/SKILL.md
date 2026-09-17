---
name: verify
description: >-
  Verification gate before declaring a task done. Run the narrow type-check,
  lint, format, spell, and relevant tests for the changed scope, then re-read
  the own diff. Use before reporting a change as complete, after any edit that
  touches types, imports, styles, or logic. Triggers: done, ready, finished,
  verify, check before commit, pre-commit checks, is it safe to commit.
---

# Verify Before Done

## When to apply

Apply automatically as the last step before reporting a task as complete — after any edit that touches types, imports, styles, tests, or logic. Don't claim success without running the checks below.

## Principle

Run the **narrow scope** that covers the change. Never run the dev server, full build, or the entire test suite as a side effect — they're slow and noisy. Propose long commands to the user instead of running them silently.

## Checklist

Track progress mentally or in a todo list:

1. Static checks (type-check + lint + format + spell)
2. Relevant tests (narrow scope)
3. Re-read the own diff

### 1. Static checks

Run the single entrypoint from the project root, passing the changed files/dirs:

```sh
python3 .cursor/skills/verify/scripts/verify.py <changed-files-or-paths>
```

It runs `tsc -p tsconfig.app.json --noEmit`, then `eslint --quiet`, `prettier --check --ignore-unknown`, and `cspell` on the passed paths. Exit codes: `0` — success, `1` — no paths / not from root, `2` — tsc, `3` — eslint, `4` — prettier, `5` — cspell. Don't consider the task done until it returns `0`.

For CSS-only changes, also run `pnpm exec stylelint "<changed-css>"` (stylelint is not in the script — it's CSS-specific).

### 2. Relevant tests (narrow scope)

Only if you changed a module that has tests, or added behavior worth testing. Pick the matching config — don't run the whole suite:

- pure logic (`~shared/lib`, module `lib`/`model`) → `pnpm run check:tests:unit:ts`
- component behavior (`vitest-browser-react`) → `pnpm run check:tests:unit:tsx`
- integration (component + dependencies) → `pnpm run check:tests:int:tsx`
- a single file → `pnpm exec vitest run <path> --config <matching-config>`

Don't add tests just to hit a number; don't test generated code.

### 3. Re-read the own diff

Open each changed file and read it as a reviewer would. Catch leftover debug logs, dead imports, half-applied edits, commented-out code, and stale comments that contradict the new behavior **before** reporting done.

## Approval gates

Package managers, `generated/` regeneration, and git mutations require explicit user approval — see `management/verification.mdc`. When unsure whether a command is safe, ask. Reporting format lives in `management/reporting.mdc`.

## Examples

- Correct application — see [`examples/good.md`](examples/good.md).
- Anti-patterns — see [`examples/bad.md`](examples/bad.md).
