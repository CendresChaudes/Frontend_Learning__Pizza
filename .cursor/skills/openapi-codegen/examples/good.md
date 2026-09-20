# Good examples — `openapi-codegen`

## 1. Add an endpoint, end to end

User: «Add a `POST /otps/otp` endpoint.»

```sh
# 1. Edit the contract (not generated/)
#    add the path + schema to openapi.json under components/schemas
# 2. Get explicit confirmation, then run the single entrypoint from the project root:
python3 .cursor/skills/openapi-codegen/scripts/generate.py
# → ✓ Done: generated/ updated, types are green.
```

## 2. Wrap generated code in a `data/` API class

`src/4_modules/Auth/data/Otp.api.ts` — the only place that imports from `generated/` (or `HttpClient` until a generated client exists):

```ts
import { Mutation } from 'mobx-tanstack-query';
import { queryClient } from '~core/api';
import { HttpClient } from '~shared/api';
import type { IPhone } from '../domain/Phone.interface';

export class OtpApi {
  public readonly createOtpMutation: Mutation<void, IPhone>;

  constructor(abortSignal: AbortSignal) {
    this.createOtpMutation = new Mutation({
      queryClient,
      abortSignal,
      mutationKey: ['otp'],
      mutationFn: async (phone: IPhone, { signal }) => {
        await HttpClient.post('/otps/otp', phone, { signal });
      },
    });
  }

  public async createOtp(phone: IPhone): Promise<void> {
    await this.createOtpMutation.mutate(phone);
  }
}
```

Presentation never imports this file. The interactor in `model/` is the only consumer.

## 3. Type-only import from `generated/`

```ts
import type { CreateOtpDto } from '~generated/types/OtpService';
```

Runtime imports stay in the adapter; types cross the boundary via `import type`.
