---
name: docs-ru
description: >-
  Maintain Russian-language content in the docs/ folder. Use when creating or
  editing files under docs/, or writing or updating product and user
  documentation. Triggers: docs/, write docs, update documentation, product docs, user guide.
---

# docs-ru

Enforce that all prose under `docs/product/` is written in Russian. `docs/product/` is the human-facing product and user documentation (see `management/docs`). `docs/app/` holds generated code documentation and is exempt from this rule.

## When to apply

Apply when creating or editing any file under `docs/product/`, or when producing product/user documentation that belongs in `docs/product/`. Do not apply to `docs/app/` — it is generator output (e.g. TypeDoc) and follows the generator's language.

## Rules

- All prose in `docs/product/**` is Russian. Identifiers, file paths, commands, code blocks, and configuration keys stay in their original form (e.g. `package.json`, `check:tests:all`, `.browserslistrc`).
- Write for a human reader, not the agent: use full sentences and expand context; avoid the telegraphic rule style of `product/*`.
- Don't invent synonyms for glossary terms (vending, cash register) — use them verbatim.
- Keep `docs/README.md` as the index; link new files from it. Group links by directory (`docs/product/`, `docs/app/`).
- `docs/product/` content is documentation, not an agent artifact — Russian is correct here despite `management/general`'s "English only" rule. `docs/app/` is exempt.

## Examples

- Correct Russian docs content — see [`examples/good.md`](examples/good.md).
- Anti-patterns — see [`examples/bad.md`](examples/bad.md).
