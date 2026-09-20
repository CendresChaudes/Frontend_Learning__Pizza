---
description: Create a flat slice (component + view-model + CSS + index.ts, or a page) in the attached directory.
---

# Create slice

Command for scaffolding a **flat slice** in the **attached directory**. The directory is the only required input.

For a **segmented module** (`presentation`/`model`/`data`/`domain`, etalon Auth), follow [`.cursor/skills/create-slice/SKILL.md`](../skills/create-slice/SKILL.md) instead — this command does not create segment folders.

## Skills (required, first)

When this command and the create-slice skill disagree on **module** structure, **the skill wins**. For widgets and pages, this command wins (flat etalons).

1. [`.cursor/skills/create-slice/SKILL.md`](../skills/create-slice/SKILL.md) — examples: [`examples/good.md`](../skills/create-slice/examples/good.md), [`examples/bad.md`](../skills/create-slice/examples/bad.md).

## Context (required)

The user attaches the **target directory** with `@` (e.g. `@src/3_widgets/Header`, `@src/2_pages/Auth`).

1. Read the directory path from context — do **not** ask for layer or slice name when the directory is attached.
2. `<dir-name>` = the **basename** of that directory (`Auth`, `Header`).
3. All files are created **inside** that directory.

If no directory is attached, ask the user to attach it with `@` and stop.

## File suffix

| Location              | Component                  | View-model         | CSS module                   | Public API |
| --------------------- | -------------------------- | ------------------ | ---------------------------- | ---------- |
| Inside `src/2_pages/` | `<dir-name>.page.tsx`      | none               | `<dir-name>.page.m.css`      | `index.ts` |
| Any other layer       | `<dir-name>.component.tsx` | `<dir-name>.vm.ts` | `<dir-name>.component.m.css` | `index.ts` |

Do not create segment folders (`presentation/`, `ui/`, `model/`, …). Do not overwrite non-empty files.

## Naming

- **Component name** in `.tsx`:
  - Non-page: PascalCase from `<dir-name>` (`Header` → `Header`). Inner function is `<Name>Component`; export is `observer(<Name>Component)` as `<Name>`.
  - Page (`src/2_pages/`): PascalCase plus `Page` (`Auth` → `AuthPage`). Do not double the suffix if the name already ends with `Page`.
- **View-model:** class `<Name>ViewModel` in `<Name>.vm.ts`.
- **`index.ts`:** re-export the component from the `.tsx` stem (no extension).

---

## Etalon — frozen Header / Auth.page (do not re-read living files)

Templates below are frozen copies of:

- Widget: `src/3_widgets/Header` — `observer` + `useViewModel` + `*.vm.ts`.
- Page: `src/2_pages/Auth` — composition only, no view-model.

Do **not** open those files to copy them at runtime; use the templates in this command.

---

## Template — widget (`<dir-name>.component.tsx` + `.vm.ts`)

```text
<dir-name>/
├── <dir-name>.component.tsx
├── <dir-name>.vm.ts
├── <dir-name>.component.m.css
└── index.ts
```

**`<dir-name>.component.tsx`** (example: `Header`)

```tsx
import { observer } from 'mobx-react-lite';
import { useViewModel } from '~shared/lib';
import styles from './Header.component.m.css';
import { HeaderViewModel } from './Header.vm';

function HeaderComponent(): ReactJSX {
  const viewModel = useViewModel(() => new HeaderViewModel());

  return <div className={styles.root}>{viewModel.title}</div>;
}

const Header = observer(HeaderComponent);

export { Header };
```

**`<dir-name>.vm.ts`** (example: `Header`)

```ts
import { computed, makeObservable } from 'mobx';

export class HeaderViewModel {
  @computed
  public get title(): string {
    return '';
  }

  constructor() {
    makeObservable(this, undefined, {
      autoBind: true,
    });
  }
}
```

Replace `Header` / paths with the derived names. Drop unused `@computed` members rather than leaving placeholders if the VM has nothing to expose yet — keep `makeObservable`.

**`<dir-name>.component.m.css`**

```css
.root {
  /* Заглушка */
}
```

**`index.ts`**

```ts
export { Header } from './Header.component';
```

---

## Template — `@src/2_pages/<dir-name>` (page)

No view-model. File names use `.page.tsx` / `.page.m.css`. The **component** is PascalCase + `Page`.

**`<dir-name>.page.tsx`** (example: dir `Auth` → `AuthPage`)

```tsx
import styles from './Auth.page.m.css';

function AuthPage(): ReactJSX {
  return <div className={styles.root} />;
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

Replace `Auth` / `AuthPage` / paths with the derived names. Compose widgets/modules inside the page; do not put interactors or API classes here.

---

## Rules

- Widgets follow the Header template (VM + observer). Pages follow the Auth.page template (composition only).
- Import styles from `./<dir-name>.page.m.css` (pages) or `./<dir-name>.component.m.css` (components).
- Use design tokens from `:root` when adding styles.
- Respect FSD boundaries (`.cursor/rules/architecture/`).
- Do not wire routing or update consumers unless the user asked.

## After creating

Do **not** run type-check, lint, format, stylelint, tests, or the `verify` skill. Do not propose those commands. Stop after writing the files.
