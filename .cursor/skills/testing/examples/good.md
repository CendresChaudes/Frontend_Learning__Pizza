# Good examples — `testing`

## 1. Pure `.ts` logic — assert input → output

`src/7_shared/lib/formatDate.test.ts`:

```ts
import { describe, expect, it } from 'vitest';

import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats an ISO date as DD.MM.YYYY', () => {
    expect(formatDate('2026-09-09T00:00:00Z')).toBe('09.09.2026');
  });

  it('returns null for empty input', () => {
    expect(formatDate('')).toBeNull();
  });
});
```

Run with the node config (pure logic):

```sh
pnpm exec vitest run src/7_shared/lib/formatDate.test.ts --config vitest.unit.node.config.ts
```

## 2. `.tsx` component — behavior, not implementation

`src/4_features/user-profile/ui/UserProfile.test.tsx`:

```tsx
import { render, screen } from 'vitest-browser-react';
import { userEvent } from '@vitest/browser/playwright';

import { UserProfile } from './UserProfile';

it('shows the full name and fires onEdit on click', async () => {
  const onEdit = vi.fn();
  render(
    <UserProfile
      user={{ id: '1', fullName: 'Ada Lovelace' }}
      onEdit={onEdit}
    />,
  );
  await expect.element(screen.getByText('Ada Lovelace')).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /edit/i }));
  expect(onEdit).toHaveBeenCalledWith('1');
});
```

Run with the browser config (component behavior):

```sh
pnpm exec vitest run src/4_features/user-profile/ui/UserProfile.test.tsx --config vitest.unit.browser.config.ts
```

## 3. API hook against MSW at the boundary

```ts
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/users/:id', () =>
    HttpResponse.json({ id: '1', fullName: 'Ada Lovelace' }),
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('exposes loading then success', async () => {
  const { result } = renderHook(() => useUser('1'), { wrapper: QueryProvider });
  expect(result.current.isLoading).toBe(true);
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data?.fullName).toBe('Ada Lovelace');
});
```

The hook's internals stay real; only the network boundary is mocked.

## 4. Integration — component + real dependencies

`src/3_widgets/dashboard/ui/Dashboard.test.tsx` rendered with a real query client and router, asserting the composed behavior (not the internals of each piece). Run with `vitest.int.browser.config.ts`.
