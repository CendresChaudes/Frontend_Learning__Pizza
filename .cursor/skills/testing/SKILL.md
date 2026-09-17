---
name: testing
description: >-
  Write and run tests for .ts/.tsx — pick the right vitest config by scope,
  test behavior not implementation, mock at the network boundary with MSW,
  colocate tests next to source, and never test generated code. Use when
  adding or updating tests for a module or feature, or when fixing a broken
  test. Triggers: write tests, add tests, add test, update tests, test
  coverage, fix broken test, strengthen tests.
---

# Testing

## When to apply

Apply when adding or updating tests for hand-written `.ts`/`.tsx` code: a new module, changed behavior, missing coverage around a bugfix, or a broken test to repair. Don't apply to `generated/` (read-only — fix `openapi.json`/`kubb.config.ts` and regenerate) or to trivial pass-through code that has no behavior to assert.

## Principle

Test **behavior from the outside**, not implementation. A test asserts what the code does for given inputs — output, side effects, rendered DOM, network calls at the boundary — never which internal functions it called. Implementation-coupled tests break on every refactor and re-assert the framework.

## Test levels & configs

Pick the config by **scope**, not habit. The project ships three vitest configs plus Playwright for e2e:

| Scope                     | Config / command                                                  | Use for                                                                              |
| ------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| pure `.ts` logic          | `vitest.unit.node.config.ts` (`pnpm run check:tests:unit:ts`)     | utils, selectors, validators, zod schemas in `~shared/lib` and feature `lib`/`model` |
| `.tsx` component behavior | `vitest.unit.browser.config.ts` (`pnpm run check:tests:unit:tsx`) | components via `vitest-browser-react` — render, interact, assert DOM                 |
| integration               | `vitest.int.browser.config.ts` (`pnpm run check:tests:int:tsx`)   | component + its real dependencies (stores, query cache, routers)                     |
| e2e critical flows        | `playwright.config.ts` (`pnpm run check:tests:e2e`)               | login, core journeys only — slow and brittle, don't e2e every component              |

Run a single file with the matching config instead of the whole suite:

```sh
pnpm exec vitest run <path> --config <matching-config>
```

## What to test

- **Pure logic** — utils, formatters, selectors, reducers, zod validators: assert input → output for the meaningful cases, including edge/empty/error inputs.
- **Component behavior** — render with props, interact (click, type), assert what's on screen and the side effects that matter (callbacks fired, navigation, toasts). Don't assert that the framework rendered.
- **Hooks/stores** — assert observable state transitions and computed derivations, not that a setter was called.
- **API hooks** — test against MSW handlers at the network boundary; assert the hook's output states (loading/success/error) and cache effects.

## What NOT to test

- **`generated/`** — output, not source. If a generated client/schema is wrong, fix the OpenAPI/Kubb config and regenerate. Test the hand-written wrapper, not the generated code.
- **The framework** — don't re-assert that Mantine renders a button or that React reconciles. Assert _your_ component's behavior.
- **Trivial getters/setters and pass-throughs** — no behavior to assert; tests add noise.
- **Private internals** — if you need to test a private function, it's probably worth extracting to a tested pure helper in `~shared/lib` or the feature `lib`.

## Mocking

- **Mock at the boundary, not the inside.** Mock the network with MSW, or the outermost dependency/port. Never `vi.mock` an internal module — it couples the test to the module graph and hides real wiring.
- **MSW handlers** live in `~msw`; keep them aligned with the OpenAPI spec and zod schemas. Prefer `@kubb/plugin-msw` output over hand-rolled handlers.
- **Don't mock what you don't own.** If a third-party is flaky, wrap it behind a port you own and mock the port.
- **State per test** — each test sets up its own MSW handlers / render / store, runs, and cleans up. No shared mutable setup, no `beforeAll` with side effects, no order-dependent tests.

## Placement

- Colocate tests with the source: `foo.test.ts` next to `foo.ts`, `Bar.test.tsx` next to `Bar.tsx`. The build excludes `src/**/__tests__`; don't create a parallel `tests/` tree that drifts from the source.
- One concern per test; a test fails for one clear reason. Use `describe`/`it` to structure, not to bundle unrelated checks.

## Running

- For a tight red-green loop on one file, use the `tdd` skill's script (watch mode, config auto-selected by extension):
  ```sh
  python3 .cursor/skills/tdd/scripts/tdd.py <test-path> [--int]
  ```
- For the pre-done verification gate (static checks + narrow tests + re-read diff), use the `verify` skill — testing is one step of it, not a replacement.

## Rules

- **Behavior, not implementation.** Assert output and observable effects, not which internals ran.
- **Right config for the scope.** Pure `.ts` → unit.node; `.tsx` behavior → unit.browser; component+deps → int.browser. Don't reach for e2e unless it's a critical flow.
- **Mock at the boundary.** MSW for HTTP; never mock internal modules.
- **Colocate tests.** `*.test.ts`/`*.test.tsx` next to the source.
- **Don't test `generated/`.** Fix the spec and regenerate; test the wrapper.
- **Independent and readable.** Each test sets up, runs, cleans up. No shared mutable state, no order dependence.
- **Don't chase coverage.** Test the risky, complex, often-changed code. Skip trivial boilerplate.
- **Verify before done.** Run the `verify` skill before reporting tests complete.

## Examples

- Correct tests — see [`examples/good.md`](examples/good.md).
- Anti-patterns — see [`examples/bad.md`](examples/bad.md).
