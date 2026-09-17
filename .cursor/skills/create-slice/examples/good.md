# Good examples — `create-slice`

## 1. Feature slice with the segments it actually needs

```sh
python3 .cursor/skills/create-slice/scripts/create-slice.py features user-profile ui model api
```

Result:

```text
src/4_features/user-profile/
├── index.ts        # public API: re-export useUserProfile, UserProfile, …
├── ui/             # UserProfile.tsx + its UI hooks
├── model/          # MobX store, selectors, domain types
└── api/            # query keys, hook wrapping the generated client, DTO mapping
```

Only three segments — the slice uses `ui`, `model`, `api`. No empty `config`/`constants`/`lib` rotting unused.

## 2. Entity slice — data + types, no UI

```sh
python3 .cursor/skills/create-slice/scripts/create-slice.py entities user model api
```

An entity has no UI of its own; `ui` is correctly absent. `model` holds the domain type and selectors, `api` wraps the generated client.

## 3. Shared UI-kit slice

```sh
python3 .cursor/skills/create-slice/scripts/create-slice.py shared button ui
```

A pure presentational slice needs only `ui`. One segment, one role.

## 4. `index.ts` exports a stable surface

`src/4_features/user-profile/index.ts`:

```ts
export { UserProfile } from './ui/UserProfile';
export { useUserProfile } from './model/useUserProfile';
export type { UserProfileProps } from './ui/UserProfile';
```

Consumers import `~features/user-profile`, never `~features/user-profile/ui/UserProfile`. Internals (mappers, internal hooks) stay private.
