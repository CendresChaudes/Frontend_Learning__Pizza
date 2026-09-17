# Bad: cursor-check anti-patterns

## ❌ Editing files during the audit

```sh
chmod +x .cursor/hooks/post-work-verify.py   # "fixing" while checking
```

Why: this command reports state only — read-only. Don't mutate files as part of `/cursor-check`.

**Use instead**: report «`.cursor/hooks/post-work-verify.py` не исполняемый» and offer to fix as a follow-up.

## ❌ Vague findings without location

```md
- Some skills are missing examples.
- A hook script might not be executable.
```

Why: no file path or line — the user can't act on it.

**Use instead**:

```md
- .cursor/skills/foo/SKILL.md — missing examples/good.md (required by create-skill)
- .cursor/hooks/post-work-verify.py — not executable (chmod -x)
```

## ❌ Running builds/tests/package managers

```sh
pnpm install   # "to verify hooks.json"
```

Why: side-effect runs are prohibited (per `stack/general`). The audit inspects files only.

**Use instead**: parse `hooks.json` with a read; don't invoke package managers.
