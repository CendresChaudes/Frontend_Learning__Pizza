# Good: refactor-review output

## Trigger

User: «оцени текущий код в src»

## Flow

1. Launch the `refactor` subagent (`subagent_type: "refactor"`) with the read-only review prompt from `SKILL.md`.
2. The subagent reads the refactoring + architecture rules, scans `src/`, and returns findings.
3. Summarize grouped by layer, with a prioritized shortlist.

## Report

```
## 5_entities
- src/5_entities/user/model/mapper.ts:12-40 — DTO→domain mapping duplicated in 2 callers.
  Why: blocks adding a 3rd consumer; unreadable. Proposed: extract `toUserDomain(dto)` into `model/domain`.
  Risk: low (mechanical extract, public API preserved via index.ts).

## 4_features
- src/4_features/login/ui/LoginForm.tsx:80-120 — inline validation logic mixed with UI.
  Why: slows down the next person; hard to test. Proposed: extract `validateLogin` into `lib`.
  Risk: low.

## Приоритет
1. extract toUserDomain (5_entities/user) — low risk, unblocks consumers
2. extract validateLogin (4_features/login) — low risk, improves testability
```

- Read-only: nothing edited.
- Each finding has path, line range, why, proposed step, risk.
- Prioritized shortlist at the end; risky/uncertain first.
- Offers to apply approved steps as a follow-up, doesn't apply them itself.
