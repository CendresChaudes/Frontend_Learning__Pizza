---
name: create-slice
description: >-
  Scaffold and structure an FSD slice in a numbered layer. Modules use
  presentation/model/data/domain (etalon Auth); widgets stay flat with
  component + view-model (etalon Header); pages use .page.tsx. Use when
  creating a new slice or segment in any layer. Triggers: create slice, new
  module, new widget, new page, add segment, scaffold slice, FSD slice.
---

# Create Slice

## When to apply

Apply automatically when creating a new slice or segment in any layer (`1_app` … `7_global`), or when adding a segment to an existing slice. Don't apply to `generated/`.

Etalons in code: `src/4_modules/Auth` (module), `src/3_widgets/Header` (widget), `src/2_pages/Auth` (page). Copy those shapes.

## Slice directory

PascalCase, matching the export (`Auth`, `Header`, `NotFoundError`) — not kebab-case.

## Allowed segments (modules)

A segment name must describe a **role**. Canonical set for `~modules` (etalon Auth):

- `presentation` — `*.component.tsx`, `*.component.m.css`, `*.vm.ts`.
- `model` — `*.interactor.ts`, `*.schema.ts`.
- `data` — `*.api.ts` (HTTP + `mobx-tanstack-query`).
- `domain` — `*.interface.ts`; imports nothing.
- `lib` / `config` / `constants` — only when the slice needs them.

No segment barrels — files are imported by path. Slice `index.ts` re-exports the presentation entry.

`~shared` / `~core` / `~app` keep infra names (`ui`, `lib`, `api`, `config`, `constants`) — do not rename those to `presentation`/`data`.

## Flat widgets and pages (no segment folders)

- **Widget** — etalon Header: `<Name>.component.tsx`, `<Name>.vm.ts`, `<Name>.component.m.css`, `index.ts` at the slice root. `/create-slice` scaffolds this.
- **Page** — etalon `Auth.page.tsx`: `<Name>.page.tsx`, `<Name>.page.m.css`, `index.ts`. Composition only; no view-model.

Add `presentation/`/`model/` to a widget only when it outgrows one component + VM.

## Forbidden names

Do not create segments named after a code shape. Map them:

- `ui` / `components` / `hooks` / `hocs` → `presentation` on **modules** (or a flat `*.component.tsx` on a widget). `~shared` / `~app` keep `ui`.
- `api` / `services` → `data` (network) or `model` (interactor) on **modules**. `~core` / `~shared` keep `api`.
- `utils` / `helpers` → `lib`.
- `store` / `stores` → `model` (`*.interactor.ts`) and/or `*.vm.ts` in presentation.
- `types` → not a segment. Domain type → `domain/*.interface.ts`; form types → `model/*.schema.ts`.
- `providers` → `1_app` for app-wide; don't add a `providers/` segment inside a module.

## Intra-slice imports

```
presentation → model → data
                 ↘     ↙
                  domain
```

`domain` imports nothing. `presentation` does not import `data`. Layer flow: `architecture/general`.

## Scaffold (module segments)

```sh
python3 .cursor/skills/create-slice/scripts/create-slice.py <layer-alias> <SliceName> [segment...]
```

`<layer-alias>`: `app pages widgets modules core shared global`. Example (Auth-shaped module):

```sh
python3 .cursor/skills/create-slice/scripts/create-slice.py modules Auth presentation model data domain
```

For a flat widget or page, use `/create-slice` on the attached directory instead of this script.

## Examples

- Correct slices — see [`examples/good.md`](examples/good.md).
- Forbidden names — see [`examples/bad.md`](examples/bad.md).
