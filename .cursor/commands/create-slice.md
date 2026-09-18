---
description: [C] — Create component file, CSS module, and `index.ts` in the attached directory.
---

# Create slice

Scaffold a **minimal flat slice** in the **attached directory**. The directory is the only required input.

## Context (required)

The user attaches the **target directory** with `@` (e.g. `@src/2_pages/Auth`).

1. Read the directory path from context — do **not** ask for layer or slice name when the directory is attached.
2. `<dir-name>` = the **basename** of that directory (`Auth`, `Header`, `user-profile`, …).
3. All files are created **inside** that directory.

If no directory is attached, ask the user to attach it with `@` and stop.

## Component file suffix

| Location              | Component file             | CSS module                   | Public API |
| --------------------- | -------------------------- | ---------------------------- | ---------- |
| Inside `src/2_pages/` | `<dir-name>.page.tsx`      | `<dir-name>.page.m.css`      | `index.ts` |
| Any other layer       | `<dir-name>.component.tsx` | `<dir-name>.component.m.css` | `index.ts` |

The CSS module stem matches the component file: `.page.tsx` → `.page.m.css`, `.component.tsx` → `.component.m.css`.

Do not create segment folders (`ui/`, `model/`, …). Do not overwrite non-empty files.

## Naming

- **Component name** in `.tsx`:
  - Non-page: PascalCase from `<dir-name>` (`auth` → `Auth`, `user-profile` → `UserProfile`).
  - Page (`src/2_pages/`): the same PascalCase plus the `Page` suffix (`auth` → `AuthPage`, `user-profile` → `UserProfilePage`). Do not double the suffix if the name already ends with `Page`.
- **`index.ts`:** re-export the component from the `.tsx` stem (no extension):
  - Pages: `export { AuthPage } from './Auth.page';`
  - Components: `export { UserProfile } from './UserProfile.component';`

---

## Etalon — `rfc` snippet (not an existing slice)

Do **not** read Header or any other slice to copy structure. That slice may not exist.

The component body comes from the user snippet `rfc` ("Create React functional component template"):

```tsx
import styles from './$TM_FILENAME_BASE.m.css';

type TProperties = Readonly<{ example: string }>;

function $TM_FILENAME_BASE(properties: TProperties): ReactJSX {
  const { example } = properties;

  return <div className={styles.root}>$1</div>;
}

export { $TM_FILENAME_BASE };
```

Map snippet tokens to this project's files:

| Snippet                                 | Scaffold                                                                |
| --------------------------------------- | ----------------------------------------------------------------------- |
| `$TM_FILENAME_BASE` (function / export) | PascalCase from `<dir-name>`; pages append `Page` (`Auth` → `AuthPage`) |
| `./$TM_FILENAME_BASE.m.css`             | `./<dir-name>.component.m.css` or, for pages, `./<dir-name>.page.m.css` |
| `$1`                                    | `{example}`                                                             |

Keep the snippet's code shape: `TProperties`, `properties` argument, `ReactJSX` return, named export. Scaffold props are the placeholder `example: string`.

---

## Template — non-page (`<dir-name>.component.tsx`)

```text
<dir-name>/
├── <dir-name>.component.tsx
├── <dir-name>.component.m.css
└── index.ts
```

**`<dir-name>.component.tsx`** (example: `UserProfile`)

```tsx
import styles from './UserProfile.component.m.css';

type TProperties = Readonly<{ example: string }>;

function UserProfile(properties: TProperties): ReactJSX {
  const { example } = properties;

  return <div className={styles.root}>{example}</div>;
}

export { UserProfile };
```

Replace `UserProfile` / paths with the derived names. If the slice has real props, replace `example` in `TProperties` and the destructure.

**`<dir-name>.component.m.css`**

```css
.root {
  /* Заглушка */
}
```

**`index.ts`**

```ts
export { UserProfile } from './UserProfile.component';
```

---

## Template — `@src/2_pages/<dir-name>` (page)

Same `rfc` shape. File names use `.page.tsx` / `.page.m.css`. The **component** is PascalCase + `Page`.

**`<dir-name>.page.tsx`** (example: dir `Auth` → `AuthPage`)

```tsx
import styles from './Auth.page.m.css';

type TProperties = Readonly<{ example: string }>;

function AuthPage(properties: TProperties): ReactJSX {
  const { example } = properties;

  return <div className={styles.root}>{example}</div>;
}

export { AuthPage };
```

**`<dir-name>.page.m.css`**

```css
.root {
  /* Заглушка */
}
```

**`index.ts`**

```ts
export { AuthPage } from './Auth.page';
```

Replace `Auth` / `AuthPage` / paths with the derived names.

---

## Rules

- Component body follows the `rfc` snippet, not any existing slice.
- Import styles from `./<dir-name>.page.m.css` (pages) or `./<dir-name>.component.m.css` (components).
- Use design tokens from `:root` when adding styles.
- Respect FSD boundaries (`.cursor/rules/architecture/`).
- Do not wire routing or update consumers unless the user asked.

## After creating

Do **not** run type-check, lint, format, stylelint, tests, or the `verify` skill. Do not propose those commands. Stop after writing the files.
