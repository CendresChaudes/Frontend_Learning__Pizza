---
description: [C] — Refresh docs/product/ to match product rules and the codebase.
---

# docs-update

Audit and update `docs/product/` so it matches the current product rules and codebase. `docs/app/` is out of scope — regenerate it via `pnpm run docs`.

## Skills (required, first)

Before comparing or editing, **read both skills** and follow them. Do not improvise language or process from memory.

1. [`.cursor/skills/docs-update/SKILL.md`](../skills/docs-update/SKILL.md) — what to compare, what is stale, when to stop, how to delegate, what to report. Examples: [`examples/good.md`](../skills/docs-update/examples/good.md), [`examples/bad.md`](../skills/docs-update/examples/bad.md).
2. [`.cursor/skills/docs-ru/SKILL.md`](../skills/docs-ru/SKILL.md) — Russian prose in `docs/product/**`; identifiers, paths, and commands stay verbatim. Examples: [`examples/good.md`](../skills/docs-ru/examples/good.md), [`examples/bad.md`](../skills/docs-ru/examples/bad.md).

When those skills and this command disagree, **the skills win**.

## Context (optional)

If the user attaches a `docs/product/` file or names one, limit the audit to that file (still check `docs/README.md` if the file is added or removed).

If nothing is attached, audit **all** of `docs/product/`.

## Process

Follow `docs-update` exactly:

1. **Compare** each in-scope `docs/product/*.md` against its source of truth:
   - `product-description.md`, `glossary.md`, `roles.md`, `screens.md`, `nfr.md` ↔ `.cursor/rules/product/*`.
   - `screens.md` ↔ actual routes/screens (`src/2_pages`, router config, role guards).
2. **Identify** stale files: out-of-date content, missing or removed screens, renamed concepts, changed roles/NFR.
3. **Verify before writing** — don't fabricate. If unsure, read the code first (routes, role guards, `package.json` scripts).
4. **Delegate** edits to the `documenter` subagent (`subagent_type: "documenter"`). Pass the list of stale files and what changed. The subagent owns `docs/product/` and writes under `docs-ru`.
5. **Report** what changed and what was already up to date.

If nothing is stale, say so and stop — do not rewrite for style.

## Scope

- Edit only `docs/product/**` (and `docs/README.md` for index sync).
- Do **not** edit `.cursor/rules/product/*`, source code, or `docs/app/**`.
- If the product rules themselves are wrong, stop and tell the user — don't "fix" the rules to match stale docs.

## After updating

Do **not** run type-check, lint, tests, or the `verify` skill. Propose `prettier` / `cspell` on `docs/product/` only if the documenter did not already; do not run them unless asked.
