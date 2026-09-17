# Good: updating docs/product/

## Trigger

User: «обнови документацию в docs/product/»

## Flow

1. Read `.cursor/rules/product/screens.mdc` and the router config in `src/2_pages`.
2. Find that a new screen «Отчёты» exists in the router but is missing from `docs/product/screens.md`.
3. Confirm the role guard (regular access) before writing.
4. Delegate the edit to the `documenter` subagent (`subagent_type: "documenter"`) — pass: stale file `docs/product/screens.md`, add «Отчёты» with Простой access. The subagent writes in Russian and edits only `docs/product/**`:

```md
## Общие экраны

1. **Лендинг** — обзорная страница с общей информацией. Доступ: публичный (без аутентификации).
2. **Задачи перезагрузки продаж вендингов** — CRUD задач перезагрузки данных продаж. Доступ: Простой.
   ...
3. **Отчёты** — просмотров отчётов по компенсации. Доступ: Простой.
```

5. Report: «Добавил экран "Отчёты" в docs/product/screens.md (Простой). Остальное актуально.»

- Verified against the router and role guard before writing.
- Delegated the write to the `documenter` subagent; kept Russian; reused glossary terms (Простой).
- Edited only `docs/product/`, not the product rules.
