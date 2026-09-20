# Good: refactor-review output

## Trigger

User: «оцени текущий код в src»

## Flow

1. Launch the `refactor` subagent (`subagent_type: "refactor"`) with the read-only review prompt from `SKILL.md`.
2. The subagent reads the refactoring + architecture rules, scans `src/`, and returns findings.
3. Summarize grouped by layer, with a prioritized shortlist.

## Report

```
## 4_modules
- src/4_modules/Auth/model/Otp.interactor.ts:8-10 — public `_otpApi` leaks the data layer.
  Why: blocks treating the interactor as the only port; unreadable. Proposed: make `_otpApi` private.
  Risk: low (mechanical rename, public API of the slice is still AuthWizard).
- src/4_modules/Auth/presentation/CreateOtpForm.component.tsx:14-19 — submit try/catch only `console.error`.
  Why: slows down the next person; errors never reach the UI. Proposed: surface the error on the view-model.
  Risk: low.

## Приоритет
1. private _otpApi (4_modules/Auth) — low risk, restores the port
2. surface submit error (4_modules/Auth) — low risk, improves UX
```

- Read-only: nothing edited.
- Each finding has path, line range, why, proposed step, risk.
- Prioritized shortlist at the end; risky/uncertain first.
- Offers to apply approved steps as a follow-up, doesn't apply them itself.
