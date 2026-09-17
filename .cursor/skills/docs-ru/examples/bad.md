# Bad: docs content anti-patterns

## ❌ English prose in docs/product/

```md
# Screens

1. **Employee lookup** — search employees by pass or personnel number. Access: regular.
```

Why: `docs/product/` prose must be Russian. This belongs in the English `product/*` rules, not `docs/product/`.

**Use instead** (good counterpart):

```md
# Экраны

1. **Поиск сотрудников** — поиск сотрудников по номеру пропуска или табельному номеру (только поиск). Доступ: Простой.
```

## ❌ Translating identifiers and commands

```md
Запустите `проверка_тестов_все` для запуска всех тестов.
```

Why: commands and script names stay in their original form.

**Use instead**:

```md
Запустите `check:tests:all` для запуска всех тестов.
```

## ❌ Copying the agent rule style verbatim

```md
# Roles

Two roles: Простой and Админ. Простой — read + ops. Админ — + CRUD vending/cash/users.
```

Why: `docs/product/` is for humans — write full sentences, not telegraphic agent guidance.

**Use instead**:

```md
# Роли

В приложении две роли: **Простой** (обычная) и **Админ**.

- **Простой** — оператор: доступ на чтение и повседневные операции в рамках своих прав.
- **Админ** — всё, что может Простой, плюс полный CRUD для вендингов, касс и управления пользователями.
```
