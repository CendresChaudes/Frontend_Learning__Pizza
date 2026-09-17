# Bad examples — `tdd`

## ❌ Implementation first, tests after

Write `formatDate.ts`, then add `formatDate.test.ts` to "cover" it.

Why: TDD's value is the failing test driving the design. Bolting tests on after just re-asserts what you already wrote — it catches typos, not missing behavior.

## ❌ Test the implementation, not the behavior

```ts
it('calls parseISO then format', () => {
  const spy = vi.spyOn(dateFns, 'parseISO');
  formatDate('2026-09-09');
  expect(spy).toHaveBeenCalled();
});
```

Why: this breaks on every refactor and re-asserts the library. Assert the output (`toBe('09.09.2026')`), not which internal functions ran.

## ❌ Mock internal modules

```ts
vi.mock('~modules/user/api/user', () => ({ useUser: () => ({ data: stub }) }));
```

Why: mocks at the wrong layer couple the test to the module graph. Mock HTTP with MSW at the network boundary; keep internals real.

## ❌ Write five tests, then implement all at once

Draft 5 failing tests, then write the whole module to satisfy them.

Why: you lose the red→green feedback loop and can't tell which change broke which test. One failing test → one minimal change → green → next test.

## ❌ Test `generated/` code

Adding tests for a generated tanstack hook or zod schema.

Why: `generated/` is output, not source. If a generated client is wrong, fix `openapi.json`/`kubb.config.ts` and regenerate. Test the hand-written wrapper, not the generated code.
