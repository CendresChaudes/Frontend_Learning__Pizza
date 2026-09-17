# Good examples — `openapi-codegen`

## 1. Add an endpoint, end to end

User: «Add a `GET /api/users/:id` endpoint.»

```sh
# 1. Edit the contract (not generated/)
#    add the path + schema to openapi.json under components/schemas
# 2. Get explicit confirmation, then run the single entrypoint from the project root:
python3 .cursor/skills/openapi-codegen/scripts/generate.py
# → ✓ Done: generated/ updated, types are green.
```

## 2. Wrap a generated hook in a module adapter

`src/4_modules/user/api/user.ts` — the only place that imports from `generated/`:

```ts
import type { UserDto } from '~generated/types/UserService';
import { useGetUserQuery } from '~generated/tanstack/UserService';

import type { User } from '../model/types';

const mapUser = (dto: UserDto): User => ({
  id: dto.id,
  fullName: `${dto.firstName} ${dto.lastName}`,
});

export function useUser(id: User['id']) {
  const query = useGetUserQuery({ id });
  return {
    ...query,
    data: query.data ? mapUser(query.data) : undefined,
  };
}
```

Components in `~widgets` import `useUser` from the module, never the generated hook.

## 3. Type-only import from `generated/`

```ts
import type { UserDto } from '~generated/types/UserService';
```

Runtime imports stay in the adapter; types cross the boundary via `import type`.
