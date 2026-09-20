# Good examples — `create-command`

## 1. Self-contained scaffold (no skill)

`.cursor/commands/format-label.md` — user attaches the target directory with `@`. Names are derived from the basename. Stop after writing.

````markdown
---
description: Create a label helper file in the attached directory.
---

# Format label

Command for scaffolding a **label helper** in the **attached directory**. The directory is the only required input.

## Context (required)

The user attaches the **target directory** with `@` (e.g. `@src/6_shared/lib`).

1. Read the directory path from context — do **not** ask for a name when the directory is attached.
2. `<dir-name>` = the **basename** of that directory.
3. All files are created **inside** that directory.

If no directory is attached, ask the user to attach it with `@` and stop.

## Etalon — `rfc` snippet (not an existing file)

Do **not** read a living helper to copy structure. That file may not exist.

Map `$TM_FILENAME_BASE` → PascalCase from `<dir-name>`. Keep the snippet's code shape.

## Template

```text
<dir-name>/
└── formatLabel.ts
```

**`formatLabel.ts`** (example: dir `price`)

```ts
function formatLabel(value: string): string {
  return value.trim();
}

export { formatLabel };
```

Replace `formatLabel` / paths with the derived names.

## After creating

Do **not** run type-check, lint, format, tests, or the `verify` skill. Do not propose those commands. Stop after writing the files.
````

Etalon, full template, derive-don't-ask, explicit stop — same shape as `/create-slice`.

## 2. Thin wrapper around skills

`.cursor/commands/docs-refresh.md` — slash entry; skills own the methodology.

```markdown
---
description: Refresh docs/product/ to match product rules and the codebase.
---

# docs-refresh

Command for auditing and updating `docs/product/` so it matches the current product rules and codebase.

## Skills (required, first)

Before comparing or editing, **read both skills** and follow them.

1. [`.cursor/skills/docs-update/SKILL.md`](../skills/docs-update/SKILL.md)
2. [`.cursor/skills/docs-ru/SKILL.md`](../skills/docs-ru/SKILL.md)

When those skills and this command disagree, **the skills win**.

## Context (optional)

If the user attaches a `docs/product/` file or names one, limit the audit to that file.

## Process

Follow `docs-update` exactly: compare → identify stale → verify against the code → delegate edits to `documenter` → report.

## Scope

Edit only `docs/product/**` (and `docs/README.md` for index sync). Do **not** edit `.cursor/rules/product/*` or `docs/app/**`.

## After updating

Do **not** run the `verify` skill. Propose `prettier` / `cspell` on `docs/product/` only if the documenter did not already; do not run them unless asked.
```

The command does not repeat the skill body — it links and adds invocation-only details (context, scope, stop).

## 3. Filename = slash name; opening starts with `Command for`

| File                               | Invoked as      | Frontmatter                                                                                                        | Opening after H1                                                          |
| ---------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `.cursor/commands/create-slice.md` | `/create-slice` | `description: Create a flat slice (component + view-model + CSS + index.ts, or a page) in the attached directory.` | `Command for scaffolding a **flat slice** in the **attached directory**.` |

Optional `name` in frontmatter, if present, matches the file stem (`create-slice`).
