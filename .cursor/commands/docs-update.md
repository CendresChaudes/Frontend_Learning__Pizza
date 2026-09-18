---
description: Refresh docs/product/ to match product rules and the codebase.
---

# Docs update

Command for auditing and updating `docs/product/` so it matches the current product rules and codebase. `docs/app/` is out of scope — regenerate it via `pnpm run docs`.

## Skills (required, first)

Before comparing or editing, **read both skills** and follow them.

1. [`.cursor/skills/docs-update/SKILL.md`](../skills/docs-update/SKILL.md) — examples: [`examples/good.md`](../skills/docs-update/examples/good.md), [`examples/bad.md`](../skills/docs-update/examples/bad.md).
2. [`.cursor/skills/docs-ru/SKILL.md`](../skills/docs-ru/SKILL.md) — examples: [`examples/good.md`](../skills/docs-ru/examples/good.md), [`examples/bad.md`](../skills/docs-ru/examples/bad.md).

When those skills and this command disagree, **the skills win**.

## Context (optional)

If the user attaches a `docs/product/` file or names one, limit the audit to that file (still check `docs/README.md` if the file is added or removed).

If nothing is attached, audit **all** of `docs/product/`.

## Process

Follow `docs-update` exactly: compare → identify stale → verify against the code → delegate edits to `documenter` → report.

If nothing is stale, say so and stop — do not rewrite for style.

## Scope

Edit only `docs/product/**` (and `docs/README.md` for index sync). Do **not** edit `.cursor/rules/product/*`, source code, or `docs/app/**`. If the product rules themselves are wrong, stop and tell the user — don't "fix" the rules to match stale docs.

## After updating

Do **not** run type-check, lint, tests, or the `verify` skill. Propose `prettier` / `cspell` on `docs/product/` only if the documenter did not already; do not run them unless asked.
