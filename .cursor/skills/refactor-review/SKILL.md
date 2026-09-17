---
name: refactor-review
description: >-
  Launch the refactor subagent to review code in src/ for refactoring
  opportunities. Explicit slash command (/refactor-review); does not
  auto-load. Also triggers on: refactor review, review src for refactoring.
disable-model-invocation: true
---

# refactor-review

Launch the `refactor` subagent to review the current code in `src/` and report refactoring opportunities. Explicit slash command (`/refactor-review`); does not auto-load.

## When to apply

Invoke with `/refactor-review` when you want a refactoring review of `src/` — i.e. «оцени текущий код в src».

## How to run

Launch the `refactor` subagent via the Task tool (`subagent_type: "refactor"`). The subagent does not see chat history, so pass full context in the prompt:

- Goal: **review only, do not edit**. Produce a report, not a diff.
- Scope: `src/` (the FSD layers: `1_app` … `7_global`).
- Reference the project's refactoring rules: `.cursor/rules/engineering/refactoring.mdc` (boy-scout rule, separate refactor from features, safe mechanical moves, don't refactor without a reason, keep local, preserve public APIs, verify after each step).
- Reference the architecture rules: `.cursor/rules/architecture/general.mdc` and `layers.mdc` (import flow, slice boundaries, segment rules).

## Prompt template for the subagent

```
You are assessing the codebase for refactoring opportunities. READ-ONLY: do not edit any files.

Scope: src/ (FSD layers 1_app … 7_global).

Rules to apply (read them first):
- .cursor/rules/engineering/refactoring.mdc
- .cursor/rules/architecture/general.mdc
- .cursor/rules/architecture/layers.mdc

Find concrete, actionable refactoring opportunities that:
- block a real change, are actively buggy, or are unreadable enough to slow the next person (not "I don't like it");
- stay local to a slice/segment where possible;
- preserve public APIs (slice index.ts contracts);
- are safe and mechanical (rename/extract/move), not behavior changes.

For each finding report:
- file path and line range;
- what's wrong and why it matters;
- proposed refactor (mechanical step);
- risk (low/medium/high) and whether it should be its own step/PR.

Group by layer. End with a prioritized list (do the risky/uncertain ones first to fail fast). Do not edit anything.
```

## How to report back

- Summarize the subagent's findings grouped by layer.
- Surface a prioritized shortlist (high-value, low-risk first; risky/uncertain first to fail fast per `task-decomposition`).
- Don't apply any refactor — this command reviews only. Offer to launch the `refactor` subagent again (in edit mode) or the `implementer` for approved steps as a follow-up.

## Scope

- Read-only review. Don't edit `src/` or any file as part of this command.
- Don't run builds, tests, linters, or package managers.

## Examples

- Correct review output — see [`examples/good.md`](examples/good.md).
- Anti-patterns — see [`examples/bad.md`](examples/bad.md).
