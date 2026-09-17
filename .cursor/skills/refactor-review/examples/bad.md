# Bad: refactor-review anti-patterns

## ❌ The subagent edits files

```sh
# refactor subagent rewrote src/4_modules/user/model/mapper.ts during review
```

Why: this command is a read-only review. The `refactor` subagent must be told explicitly: do not edit.

**Use instead**: pass the read-only constraint in the subagent prompt; collect findings only. Apply approved steps in a separate follow-up.

## ❌ Vague findings without location or risk

```md
- The login feature is messy and could be cleaner.
- Some entities have duplication.
```

Why: no path, line range, or risk — not actionable, and violates "don't refactor without a reason".

**Use instead**:

```md
- src/4_modules/login/ui/LoginForm.tsx:80-120 — inline validation mixed with UI; blocks testing. Risk: low. Proposed: extract validateLogin into lib.
```

## ❌ Cosmetic "I don't like it" suggestions

```md
- Rename `useGetUser` to `useFetchUser` — reads nicer.
```

Why: `refactoring.mdc` forbids refactors without a reason. Style preferences aren't actionable.

**Use instead**: only flag code that blocks a real change, is buggy, or unreadable enough to slow the next person.
