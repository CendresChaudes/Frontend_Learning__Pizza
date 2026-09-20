# Good examples — `testing`

## 1. Pure `.ts` logic — assert input → output

`src/6_shared/lib/formatDate.test.ts`:

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
pnpm exec vitest run src/6_shared/lib/formatDate.test.ts --config vitest.unit.node.config.ts
```

## 2. `.tsx` component — behavior, not implementation

`src/4_modules/Auth/presentation/CreateOtpForm.component.test.tsx`:

```tsx
import { render, screen } from 'vitest-browser-react';
import { userEvent } from '@vitest/browser/playwright';

import { CreateOtpForm } from './CreateOtpForm.component';

it('submits the phone number from the form', async () => {
  render(<CreateOtpForm />);
  await userEvent.type(screen.getByRole('textbox'), '+79991234567');
  await userEvent.click(screen.getByRole('button', { name: /продолжить/i }));
  await expect
    .element(screen.getByRole('button', { name: /отправка/i }))
    .toBeInTheDocument();
});
```

Run with the browser config (component behavior):

```sh
pnpm exec vitest run src/4_modules/Auth/presentation/CreateOtpForm.component.test.tsx --config vitest.unit.browser.config.ts
```

## 3. API class against MSW at the boundary

```ts
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.post('/otps/otp', () => HttpResponse.json(null, { status: 204 })),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('resolves createOtp on 204', async () => {
  const api = new OtpApi(new AbortController().signal);
  await expect(api.createOtp({ phone: '+79991234567' })).resolves.toBeUndefined();
});
```

The API class stays real; only the network boundary is mocked. Colocate next to `data/Otp.api.ts`.

## 4. Integration — widget + real routing

`src/3_widgets/Header/Header.component.test.tsx` rendered with the real `CAppRouting`, asserting the title for the opened route (not the internals of `HeaderViewModel`). Run with `vitest.int.browser.config.ts`.
