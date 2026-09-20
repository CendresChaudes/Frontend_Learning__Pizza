# Good examples — `create-slice`

## 1. Module slice — Auth shape

```sh
python3 .cursor/skills/create-slice/scripts/create-slice.py modules Auth presentation model data domain
```

Result:

```text
src/4_modules/Auth/
├── index.ts              # public API: re-export AuthWizard
├── presentation/         # AuthWizard.component.tsx, AuthWizard.vm.ts, CreateOtpForm.*
├── model/                # Otp.interactor.ts, Phone.schema.ts
├── data/                 # Otp.api.ts
└── domain/               # Phone.interface.ts
```

No empty `lib`/`config`/`constants`. No segment barrels — `index.ts` re-exports from presentation:

```ts
export { AuthWizard } from './presentation/AuthWizard.component';
```

Consumers import `~modules/Auth`, never `~modules/Auth/presentation/AuthWizard.component`.

## 2. Flat widget — Header shape

Do **not** run the segment script. Use `/create-slice` on `@src/3_widgets/Header` (or create the files by hand):

```text
src/3_widgets/Header/
├── index.ts
├── Header.component.tsx
├── Header.vm.ts
└── Header.component.m.css
```

`index.ts`:

```ts
export { Header } from './Header.component';
```

## 3. Flat page — Auth page shape

```text
src/2_pages/Auth/
├── index.ts
├── Auth.page.tsx
├── Auth.page.m.css
└── Auth.page.skeleton.tsx   # optional
```

The page only composes widgets/modules. No view-model, no `presentation/` folder.

## 4. Module without UI

```sh
python3 .cursor/skills/create-slice/scripts/create-slice.py modules Session model data domain
```

A domain module with no presentation of its own; `presentation` is correctly absent.
