---
name: docs-update
description: >-
  Refresh the docs/product/ folder to match the current product rules and
  codebase. Explicit slash command (/docs-update); does not auto-load. Also
  triggers on: update docs, refresh docs.
disable-model-invocation: true
---

# docs-update

Audit and update `docs/product/` so it matches the current product rules and codebase. This is an explicit slash command (`/docs-update`); it does not auto-load. The command delegates the actual edits to the `documenter` subagent, which owns product documentation and writes in Russian (`docs-ru`); `management/docs` defines when to update. `docs/app/` (generated code documentation) is out of scope — regenerate it via `pnpm run docs`.

## When to apply

Invoke with `/docs-update` when you want to refresh product documentation — i.e. «обнови документацию в docs/product/».

## Process

1. **Compare** each `docs/product/*.md` against its source of truth:
   - `docs/product/product-description.md`, `glossary.md`, `roles.md`, `screens.md`, `nfr.md` ↔ `.cursor/rules/product/*`.
   - `docs/product/screens.md` ↔ the actual routes/screens in the codebase (`src/2_pages`, router config, role guards).
2. **Identify** stale files: out-of-date content, missing or removed screens, renamed concepts, changed roles/NFR.
3. **Verify before writing** — don't fabricate. If unsure whether something changed, read the code (routes, role guards, `package.json` scripts) first.
4. **Delegate** the edits to the `documenter` subagent (`subagent_type: "documenter"`) — pass the list of stale files and what changed. The subagent writes in Russian and edits only `docs/product/**` (and `docs/README.md` for index sync).
5. **Report** what changed and what was already up to date.

## Scope

- Edit only `docs/product/**` (and `docs/README.md` for index sync). Don't edit `.cursor/rules/product/*`, source code, or `docs/app/**` as part of this command.
- If the product rules themselves are wrong, stop and tell the user — don't "fix" the rules to match stale docs.

## Examples

- Correct update flow — see [`examples/good.md`](examples/good.md).
- Anti-patterns — see [`examples/bad.md`](examples/bad.md).
