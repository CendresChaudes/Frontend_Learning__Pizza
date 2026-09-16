# Bad examples — `testing`

## ❌ Test the implementation, not the behavior

```ts
it('calls parseISO then format', () => {
  const spy = vi.spyOn(dateFns, 'parseISO');
  formatDate('2026-09-09');
  expect(spy).toHaveBeenCalled();
});
```

Why: this breaks on every refactor and re-asserts the library. Assert the output (`toBe('09.09.2026')`), not which internal functions ran.

## ❌ Mock an internal module

```ts
vi.mock('~/5_entities/user/api/user', () => ({ useUser: () => ({ data: stub }) }));
```

Why: mocks at the wrong layer couple the test to the module graph and hide real wiring. Mock HTTP with MSW at the network boundary; keep internals real.

## ❌ Wrong config for the scope

Running `vitest.unit.browser.config.ts` for a pure `.ts` util (or `unit.node` for a `.tsx` component).

Why: the configs wire different environments (node vs browser). Pure logic doesn't need the browser; components don't work in node. Pick by scope — pure `.ts` → unit.node, `.tsx` behavior → unit.browser, component+deps → int.browser.

## ❌ Test `generated/` code

Adding tests for a generated tanstack hook or zod schema.

Why: `generated/` is output, not source. If a generated client is wrong, fix `openapi.json`/`kubb.config.ts` and regenerate. Test the hand-written wrapper, not the generated code.

## ❌ Shared mutable setup with order dependence

```ts
let shared: User;
beforeAll(() => { shared = makeUser(); });
it('test A', () => { shared.name = 'x'; ... });
it('test B', () => { /* relies on shared.name === 'x' */ });
```

Why: a failing test cascades into false failures and order changes break unrelated tests. Each test sets up its own state, runs, and cleans up.

## ❌ Re-asserting the framework

```ts
it('renders a button', () => {
  expect(screen.getByRole('button').tagName).toBe('BUTTON');
});
```

Why: Mantine/React already guarantees that. Assert _your_ component's behavior — what the button does on click, what label it shows under which props — not that the framework rendered a `<button>`.
