# Bad examples — `create-slice`

## ❌ `hooks` segment

```sh
sh .cursor/skills/create-slice/scripts/create-slice.sh features user-profile hooks
# create-slice.sh: refusing abstract segment 'hooks'. hooks -> ui (UI hooks) or model (business hooks).
```

Why: a hook is an implementation detail, not a role. A UI hook belongs in `ui` next to its component; a business hook belongs in `model`.

## ❌ `components` segment

```text
src/4_features/user-profile/components/UserProfile.tsx
```

Why: `components` describes a code shape, not a role. That's exactly what `ui` is — use `ui/`.

## ❌ `utils` / `helpers` segment

```text
src/4_features/user-profile/utils/formatDate.ts
```

Why: `utils` is role-less. Pure helpers local to the slice go in `lib`; app-wide pure helpers go in `~shared/lib`.

## ❌ `store` segment

```text
src/4_features/user-profile/store/UserProfileStore.ts
```

Why: business state and its rules live in `model`. `store` names the mechanism, not the role.

## ❌ `types` segment

```text
src/5_entities/user/types/User.ts
```

Why: a type is a file, not a segment. Put `User` in the segment that owns it by ownership — e.g. `model/User.types.ts` for a domain type, `ui/UserProfileProps.types.ts` for UI props. One type per file; the toolchain matches `*.types.ts` by suffix, not by a `types/` folder. A complex type decomposed into smaller helper types stays in one file (the helpers are its implementation detail).

## ❌ Pre-creating all six segments

```sh
sh .cursor/skills/create-slice/scripts/create-slice.sh features user-profile ui model lib api config constants
```

Why: empty segments rot. Create only the segments the slice uses; add more later when a real need appears.
