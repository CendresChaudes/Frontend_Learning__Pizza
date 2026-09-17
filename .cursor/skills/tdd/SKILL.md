---
name: tdd
description: >-
  Drive implementation of .ts/.tsx logic and components with Test-Driven
  Development: write the test first (red), implement the minimum to pass
  (green), then refactor. Use when building or changing pure logic, hooks,
  components, validators, or selectors in .ts/.tsx files. Triggers: TDD,
  test-driven, write a test first, red-green-refactor, implement with tests,
  add a feature via tests, cover before implementing.
---

# TDD (.ts/.tsx)

## When to apply

Apply automatically when implementing or changing `.ts`/`.tsx` logic or components: pure functions, hooks, selectors, validators, zod schemas, UI-kit components. Don't apply to `generated/` (read-only, not tested) or to trivial pass-through code.

## Principle

Red → Green → Refactor. The test is the spec: write it first, watch it fail for the **right reason**, implement the minimum to make it pass, then refactor with tests staying green. Never write the implementation first and bolt tests on after.

## Stack

- **Vitest** with three configs — pick by scope, not by habit:
  - `vitest.unit.node.config.ts` — pure `.ts` logic (utils, selectors, validators in `~shared/lib`, module `lib`/`model`).
  - `vitest.unit.browser.config.ts` — `.tsx` component behavior via `vitest-browser-react`.
  - `vitest.int.browser.config.ts` — integration (component + dependencies).
- **MSW** for HTTP — mock at the network boundary, never internal modules.
- **zod** schemas are tested by asserting parse/infer behavior, not schema shape.

## Workflow

### 1. Red — write the test first

Create the test colocated with the source (`foo.test.ts` next to `foo.ts`; `__tests__` is excluded from the build). Write the smallest test that captures the next slice of behavior. Run it and confirm it fails for the right reason (assertion failure), not a typo/import error.

### 2. Run the test

```sh
python3 .cursor/skills/tdd/scripts/tdd.py <test-path> [--int]
```

The script picks the vitest config by extension (`.tsx` → unit.browser, `.ts` → unit.node) or `--int` for integration, and starts watch mode.

### 3. Green — implement the minimum

Write the smallest implementation that turns the test green. No extra behavior, no speculative generality. If the test reveals a missing type, fix the type alongside.

### 4. Refactor

With tests green, clean up: extract duplication, rename for clarity, tighten types. Re-run after each change — tests must stay green. One refactor at a time; don't bundle a refactor with new behavior.

### 5. Stop when the spec is covered

Add the next test for the next slice. Repeat until behavior is fully specified. Don't add tests that re-assert the framework or chase coverage.

## Rules

- **Test first, always.** The failing test is the spec — see the Principle above.
- **Test behavior, not implementation.** Assert what the code does from the outside, not which internal functions it called. Implementation-coupled tests break on every refactor.
- **Mock at the boundary.** Use MSW for HTTP; don't mock internal modules. Don't mock what you don't own.
- **Colocate tests.** `*.test.ts`/`*.test.tsx` next to the source; the build excludes `src/**/__tests__`.
- **Don't test `generated/`.** Fix `openapi.json`/`kubb.config.ts` and regenerate; tests live around hand-written wrappers.
- **Keep the cycle tight.** One failing test → one minimal change → green → refactor. Don't write five tests then implement all at once — you lose the feedback loop.
- **Verify before done.** Run the `verify` skill before reporting complete.

## Examples

- Correct application — see [`examples/good.md`](examples/good.md).
- Anti-patterns — see [`examples/bad.md`](examples/bad.md).
