# Good examples — `tdd`

## 1. Pure `.ts` logic — red first

`src/6_shared/lib/formatDate.test.ts` (created before `formatDate.ts`):

```ts
import { describe, expect, it } from 'vitest';

import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats an ISO date as DD.MM.YYYY', () => {
    expect(formatDate('2026-09-09T00:00:00Z')).toBe('09.09.2026');
  });
});
```

Run it, see it fail for the right reason (assertion, not import error):

```sh
python3 .cursor/skills/tdd/scripts/tdd.py src/6_shared/lib/formatDate.test.ts
```

Then write the minimum `formatDate.ts` to turn it green, and refactor with the test staying green.

## 2. `.tsx` component — behavior, not implementation

`src/4_modules/Auth/presentation/CreateOtpForm.component.test.tsx`:

```tsx
import { render, screen } from 'vitest-browser-react';

import { CreateOtpForm } from './CreateOtpForm.component';

it('shows the continue button', async () => {
  render(<CreateOtpForm />);
  await expect
    .element(screen.getByRole('button', { name: /продолжить/i }))
    .toBeInTheDocument();
});
```

Run with the browser config (auto-selected by `.tsx`):

```sh
python3 .cursor/skills/tdd/scripts/tdd.py src/4_modules/Auth/presentation/CreateOtpForm.component.test.tsx
```

## 3. HTTP via MSW at the boundary

Test `OtpApi` against MSW, not a mocked internal client:

```ts
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.post('/otps/otp', () => HttpResponse.json(null, { status: 204 })),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

The API class stays real; only the network boundary is mocked.
