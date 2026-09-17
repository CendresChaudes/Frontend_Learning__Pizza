# Bad: docs-update anti-patterns

## ❌ Fabricating without checking the code

```md
Added screen «Отчёты» to docs/product/screens.md with admin access.
```

Why: the access level was guessed. It must be read from the router/role guard, not assumed.

**Use instead**: read the route's role guard, confirm «Простой» access, then write the entry.

## ❌ Editing the product rules instead of docs/

```sh
# "fixing" the rule to match stale docs
.cursor/rules/product/screens.mdc   # added "Отчёты" here
```

Why: this command updates `docs/`, not the source-of-truth rules. If a rule is wrong, stop and tell the user.

**Use instead**: update `docs/product/screens.md` to match the (correct) rule and codebase.

## ❌ Writing docs content in English

```md
## Common screens

8. **Reports** — view compensation reports. Access: regular.
```

Why: `docs/product/` prose is Russian only (enforced by `docs-ru`).

**Use instead**:

```md
## Общие экраны

8. **Отчёты** — просмотр отчётов по компенсации. Доступ: Простой.
```
