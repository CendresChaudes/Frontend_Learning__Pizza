---
name: create-slice
description: >-
  Scaffold and structure an FSD slice in a numbered layer with role-based
  segments only. Allow the canonical segments (ui, model, lib, api, config,
  constants) and forbid abstract role-less ones (hooks, components, utils,
  helpers, services, store, types, providers). Use when creating a new slice
  or segment in any layer (app, pages, widgets, modules, core, shared, global).
  Triggers: create slice, new module, new widget, new page, add segment,
  scaffold slice, FSD slice.
---

# Create Slice

## When to apply

Apply automatically when creating a new slice or segment in any layer (`1_app` … `7_global`), or when adding a segment to an existing slice. Don't apply to `generated/`.

## Allowed segments (role-based)

A segment name must describe a **role**, not a code shape. Only these are canonical:

- `ui` — the slice's UI: components and the hooks that drive them. A hook lives here when it's tied to rendering this slice's UI.
- `model` — business logic and domain state: MobX stores, selectors, domain types, business rules. The `domain` segment (a `model` subtype) imports nothing.
- `lib` — infrastructure helpers local to the slice: pure functions, formatting, mappers that are not business logic.
- `api` — network boundary for the slice: query keys, hooks wrapping generated clients, DTO → domain mapping. (Typically `~modules`.)
- `config` — the slice's configuration values.
- `constants` — the slice's constants (`constants.ts`).

## Forbidden segments (abstract, role-less)

Do not create segments named after code shapes — they don't answer "what role does this play?". Map them to a canonical segment instead:

- `hooks` → `ui` (UI hooks) or `model` (business hooks). A hook is an implementation detail, not a role.
- `components` → `ui` (that's what `ui` is).
- `utils` / `helpers` → `lib`.
- `services` → `api` (network) or `model` (business), or the `core` layer for app-wide services.
- `store` / `stores` → `model`.
- `types` → not a segment. Types live in the segment that owns them, by ownership — a domain type in `model`, a UI props type in `ui`, an API DTO/mapping type in `api`. One type per file (`User.types.ts`, `UserProfileProps.types.ts`). Exception: a complex type decomposed into smaller helper types stays together in one file — the helper types are implementation detail of the complex one, not separate exports.
- `providers` → `ui` for a slice, or the `app` layer for app-wide providers.
- `hocs` → `ui`.

If you believe a new segment name is genuinely needed, justify it in the reply and check `eslint-plugin-boundaries` first — the canonical set is enforced by convention.

## Structure

```text
src/<n>_<layer>/<slice-name>/   # kebab-case slice
├── index.ts                    # public API — re-export only what consumers need
├── ui/
├── model/
├── lib/
└── …                           # only the segments this slice actually needs
```

Create only the segments the slice uses — don't pre-create all six. An empty segment rots.

## `index.ts` contract

The slice's `index.ts` is its public API. Re-export only what consumers in higher layers need; keep internals private. Don't re-export every file — export named, stable surface. Renaming or removing an exported name is a breaking change that requires updating consumers in the same edit.

## Import flow

Respect the layer flow (`global → shared → core → modules → widgets → pages → app`), enforced by `eslint-plugin-boundaries`. No cross-imports within the same slice layer; no imports against the flow. The `domain` segment imports nothing.

## Scaffold

Create the slice skeleton (validates the layer and segments, refuses abstract ones):

```sh
python3 .cursor/skills/create-slice/scripts/create-slice.py <layer-alias> <slice-name> [segment...]
```

`<layer-alias>` is one of `app pages widgets modules core shared global`. Example:

```sh
python3 .cursor/skills/create-slice/scripts/create-slice.py modules user-profile ui model api
```

## Examples

- Correct slices — see [`examples/good.md`](examples/good.md).
- Forbidden abstract segments — see [`examples/bad.md`](examples/bad.md).
