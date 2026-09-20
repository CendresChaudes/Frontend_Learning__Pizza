# Bad examples — `openapi-codegen`

## ❌ Edit a generated file by hand

```ts
// generated/tanstack/UserService/useGetUserQuery.ts  ← READ-ONLY
// hand-tweaking this file is wasted work — it's overwritten on next generate
```

Why: `generated/` is produced by Kubb. Fix `openapi.json`/`kubb.config.ts` and regenerate.

## ❌ Import a generated hook directly in a feature

```ts
// src/4_modules/Auth/presentation/CreateOtpForm.component.tsx
import { useGetOtpQuery } from '~generated/tanstack/OtpService'; // wrong
```

Why: breaks the import flow (`eslint-plugin-boundaries`). Go through an adapter in `~modules`/`~shared`.

## ❌ Run `kubb generate` directly

```sh
pnpm exec kubb generate
```

Why: bypasses `scripts/generate.py`, so the post type-check (`tsc --noEmit`) is lost. Use the entrypoint script.

## ❌ Store generated types in a MobX store

```ts
class UserStore {
  user: UserDto | null = null; // server state mirrored into an observable
}
```

Why: server state lives in TanStack Query (via `mobx-tanstack-query`); the cache is the single source of truth.

## ❌ Regenerate without confirmation

Silently running `python3 .cursor/skills/openapi-codegen/scripts/generate.py` because «it seemed needed».

Why: regeneration rewrites the whole `generated/` tree and may affect others' work — always get explicit user approval first.
