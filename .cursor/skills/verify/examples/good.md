# Good examples — `verify`

## 1. After editing types and a hook

Run the static-check entrypoint on the changed scope, then the matching test config:

```sh
python3 .cursor/skills/verify/scripts/verify.py src/5_entities/user/api/user.ts
pnpm exec vitest run src/5_entities/user/api/user.test.ts --config vitest.unit.browser.config.ts
```

Then re-read the diff before reporting done.

## 2. Honest report when a check wasn't run

> Done: wrapped `useGetUser` in `~entities/user/api`. Static checks are green. I did **not** run the integration tests — propose `pnpm run check:tests:int:tsx` if you want them.

Why: a silent unverified "done" is worse than an honest "ready, please run X".

## 3. Narrow test scope by config

- Pure logic (`~shared/lib/formatDate.ts`) → `pnpm run check:tests:unit:ts`.
- Component behavior (`UserProfile.tsx`) → `pnpm run check:tests:unit:tsx`.
- Integration (component + query) → `pnpm run check:tests:int:tsx`.
