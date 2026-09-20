# Bad examples — `create-slice`

## ❌ `ui` or `components` segment

```text
src/4_modules/Auth/ui/AuthWizard.tsx
src/4_modules/Auth/components/AuthWizard.tsx
```

Why: the etalon is `presentation/` with `*.component.tsx`. `ui`/`components` are the old/wrong names.

```sh
python3 .cursor/skills/create-slice/scripts/create-slice.py modules Auth ui
# create-slice.py: refusing abstract segment 'ui'. ui -> presentation
```

## ❌ `api` segment / kebab-case slice

```sh
python3 .cursor/skills/create-slice/scripts/create-slice.py modules user-profile api
```

Why: slice directories are PascalCase (`Auth`, not `user-profile`). Network code lives in `data/` (`Otp.api.ts`), not `api/`.

## ❌ View-model in `model/`

```text
src/4_modules/Auth/model/AuthWizard.vm.ts
```

Why: `*.vm.ts` sits next to the component in `presentation/` (or at the widget root). `model/` holds interactors and schemas.

## ❌ Presentation importing `data/`

```ts
// presentation/CreateOtpForm.component.tsx
import { OtpApi } from '../data/Otp.api';
```

Why: intra-slice flow is `presentation → model → data`. The component talks to the view-model; the VM talks to the interactor.

## ❌ Segment barrels

```text
src/4_modules/Auth/presentation/index.ts
src/4_modules/Auth/model/index.ts
```

Why: Auth has none. Import files by path; only the slice `index.ts` is a public API.

## ❌ Segment folders on a simple widget

```text
src/3_widgets/Header/presentation/Header.component.tsx
```

Why: Header is flat — component + VM + CSS at the slice root. Don't add `presentation/` until the widget outgrows that.

## ❌ Pre-creating unused segments

```sh
python3 .cursor/skills/create-slice/scripts/create-slice.py modules Auth presentation model data domain lib config constants
```

Why: empty segments rot. Create only what the slice uses.
