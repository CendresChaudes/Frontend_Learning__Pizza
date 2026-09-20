---
name: openapi-codegen
description: >-
  Generate and consume code from an OpenAPI spec via Kubb: types, zod schemas,
  fetch clients, React Query hooks, MSW and faker mocks. Use when adding or
  changing an API endpoint, updating openapi.json, generating
  clients/types/mocks, or wrapping generated code in hand-written adapters.
  Triggers: OpenAPI, Kubb, generated/, pnpm run generate, add API method,
  update endpoint, mock API, tanstack hook from spec, zod schema from spec.
---

# OpenAPI Codegen (Kubb)

## When to apply

Apply automatically for tasks involving generation or consumption of code from `openapi.json`:

- add / change / remove an API endpoint;
- update `openapi.json` or `kubb.config.ts`;
- generate types, zod schemas, fetch clients, React Query hooks, MSW and faker mocks;
- wrap generated code in hand-written adapters in `~modules` / `~shared`;
- use generated hooks/clients in components and modules.

## `generated/` contracts

- **Read-only.** `generated/` is produced entirely by Kubb from `openapi.json`. Never edit files inside it manually — change `openapi.json` and/or `kubb.config.ts` and regenerate.
- **`@ts-nocheck`.** All `generated/**/*.ts` are not type-checked. Don't expect a type error in generated code to surface via `tsc`.
- **Don't import generated code into runtime directly.** Types — only via `import type`; hooks/clients/mocks — only through hand-written wrappers in `~modules` / `~shared`. Importing from `generated/` into `~modules` / `~widgets` / `~pages` breaks the import flow (see `eslint-plugin-boundaries`).
- **Grouped by tag.** Kubb groups output by `tag` into `*Service` directories (`http/`, `mocks/`, `msw/`, `tanstack/`, `types/`, `zod/`). New endpoints land in an existing or new group automatically.

## Workflow

### 1. Edit the source

Make changes only in `openapi.json` (contract) and/or `kubb.config.ts` (plugins, paths, banners). Don't touch `generated/`.

### 2. Confirm regeneration

Regeneration rewrites the whole `generated/` tree — it's a heavy operation. **Always** get explicit user approval before running. Never run generation silently, even when it seems implied.

### 3. Run generation

Use the single entrypoint — it runs `pnpm run generate` and immediately type-checks the project:

```sh
python3 .cursor/skills/openapi-codegen/scripts/generate.py
```

Don't call `kubb generate` directly: bypassing the script loses the post type-check. The script returns a non-zero code on generation errors (2) or type errors (3) — don't consider the task done until you see `✓ Done`.

### 4. Wrap in an adapter

Generated code is a port, not the app's public API. Wrap it with hand-written adapters:

- **`~modules/<Module>/data`** — API class (`*.api.ts`) for a domain module: wrap generated clients, map DTO → domain type, expose `Mutation`/`Query`. Etalon: `src/4_modules/Auth/data/Otp.api.ts`.
- **`~shared/api`** — cross-cutting infrastructure: base fetcher, interceptors, auth, when not covered by the generated client.
- **`~shared/lib`** — wrap zod schemas from `generated/zod` into domain validators with narrow types; don't pull raw generated schemas into forms.

The adapter is the only place where "don't import from `generated/`" is knowingly violated. Everything higher in the import flow works only with the adapter.

### 5. Verify

The script already type-checks (`tsc -p tsconfig.app.json --noEmit`). For the rest of the gate (lint, format, spell, tests, diff re-read), run the `verify` skill on the changed files.

## Examples

- Correct application — see [`examples/good.md`](examples/good.md).
- Anti-patterns — see [`examples/bad.md`](examples/bad.md).
