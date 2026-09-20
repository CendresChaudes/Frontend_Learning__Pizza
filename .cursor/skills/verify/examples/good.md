# Good examples — `verify`

## 1. After editing types and a hook

Run the static-check entrypoint on the changed scope, then the matching test config:

```sh
python3 .cursor/skills/verify/scripts/verify.py src/4_modules/Auth/data/Otp.api.ts
pnpm exec vitest run src/4_modules/Auth/data/Otp.api.test.ts --config vitest.unit.node.config.ts
```

Then re-read the diff before reporting done.

## 2. Honest report when a check wasn't run

> Done: wrapped OTP create in `~modules/Auth/data`. Static checks are green. I did **not** run the integration tests — propose `pnpm run check:tests:int:tsx` if you want them.

Why: a silent unverified "done" is worse than an honest "ready, please run X".

## 3. Narrow test scope by config

- Pure logic (`~shared/lib/formatDate.ts`) → `pnpm run check:tests:unit:ts`.
- Component behavior (`CreateOtpForm.component.tsx`) → `pnpm run check:tests:unit:tsx`.
- Integration (component + query) → `pnpm run check:tests:int:tsx`.
