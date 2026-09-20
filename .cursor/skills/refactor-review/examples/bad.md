# Bad: refactor-review anti-patterns

## ❌ The subagent edits files

```sh
# refactor subagent rewrote src/4_modules/Auth/model/Otp.interactor.ts during review
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
- src/4_modules/Auth/presentation/CreateOtpForm.component.tsx:14-19 — submit try/catch only `console.error`; blocks testing. Risk: low. Proposed: surface the error on the view-model.
```

## ❌ Cosmetic "I don't like it" suggestions

```md
- Rename `useGetUser` to `useFetchUser` — reads nicer.
```

Why: `refactoring.mdc` forbids refactors without a reason. Style preferences aren't actionable.

**Use instead**: only flag code that blocks a real change, is buggy, or unreadable enough to slow the next person.
