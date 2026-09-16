---
name: docs-ru
description: >-
  Maintain Russian-language content in the docs/ folder. Use when creating or
  editing files under docs/, or writing or updating product and user
  documentation. Triggers: docs/, write docs, update documentation, product docs, user guide.
---

# docs-ru

Enforce that all prose under `docs/` is written in Russian. `docs/` is the human-facing product and user documentation (see `management/docs`).

## When to apply

Apply when creating or editing any file under `docs/`, or when producing product/user documentation that belongs in `docs/`.

## Rules

- All prose in `docs/**` is Russian. Identifiers, file paths, commands, code blocks, and configuration keys stay in their original form (e.g. `package.json`, `check:tests:all`, `.browserslistrc`).
- Write for a human reader, not the agent: use full sentences and expand context; avoid the telegraphic rule style of `product/*`.
- Don't invent synonyms for glossary terms (vending, cash register) — use them verbatim.
- Keep `docs/README.md` as the index; link new files from it.
- `docs/` content is documentation, not an agent artifact — Russian is correct here despite `management/general`'s "English only" rule.

## Examples

- Correct Russian docs content — see [`examples/good.md`](examples/good.md).
- Anti-patterns — see [`examples/bad.md`](examples/bad.md).
