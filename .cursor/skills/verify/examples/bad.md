# Bad examples — `verify`

## ❌ Claim "done" without type-checking

> Done, added the hook.

Why: a type change isn't done until `tsc -p tsconfig.app.json --noEmit` is green. Don't claim success you didn't verify.

## ❌ Run the whole suite as a side effect

```sh
pnpm run check:all   # slow, noisy, unprompted
pnpm run start:dev   # dev server as a side effect
```

Why: `check:all`, `build`, `start:dev` are long and noisy. Run the narrow scope that covers the change; propose long commands to the user instead.

## ❌ Run a package manager without approval

```sh
pnpm install     # changes the lockfile, may hit the internal registry
pnpm add zod      # adding a dep unprompted
```

Why: installs change the lockfile and can hit the internal registry — always get explicit confirmation first.

## ❌ Regenerate `generated/` without approval

```sh
sh .cursor/skills/openapi-codegen/scripts/generate.sh   # silently
```

Why: regeneration rewrites a large tree — use the `openapi-codegen` skill and get explicit confirmation.

## ❌ Add tests just to hit a number

Writing trivial tests for a getter/setter to push coverage to 100%.

Why: test the risky, complex, often-changed code; skip trivial framework boilerplate. Don't chase coverage.
