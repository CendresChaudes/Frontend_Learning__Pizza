---
name: create-command
description: >-
  Author Cursor slash commands as markdown files in `.cursor/commands/`.
  Enforce kebab-case filename (= `/name`), `[C] —` description frontmatter,
  `@` context with derive-don't-ask, an etalon plus full templates, skill
  links when a skill owns the methodology, and an explicit stop condition.
  Use when creating or editing a command, adding a slash command, or
  scaffolding `.cursor/commands/*.md`. Triggers: create command, slash
  command, .cursor/commands, author command, custom command.
---

# Create Command

## When to apply

Apply automatically when creating or editing a slash command under `.cursor/commands/`, or when the user asks for a custom `/command`.

## Command vs skill

| Use              | When                                                                                                                         |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Command only** | One-shot user-invoked procedure that needs chat context (`@` path, extra text after `/name`). Templates live in the command. |
| **Skill only**   | Reusable methodology the agent should apply from ambient context (no explicit `/`).                                          |
| **Both**         | Slash entry + reusable methodology. The command is a thin wrapper; the skill owns the details.                               |

A command and a skill that share a name must be the **same job** (the command invokes that skill). If they do different jobs, pick distinct names.

If the methodology is reusable, create the skill first (see [`create-skill`](../create-skill/SKILL.md)), then the command as a wrapper.

## Required structure

A command is **one markdown file**. Filename stem = slash name (`create-slice.md` → `/create-slice`).

```text
.cursor/commands/<command-name>.md
```

Do **not** create a directory, `SKILL.md`, or `examples/` under `.cursor/commands/` — those belong to skills.

- kebab-case stem, lowercase, hyphens, no leading/trailing hyphen.
- YAML frontmatter with `description` (required). Optional `name` must match the file stem.
- Body in English (per `management/general.mdc`); identifiers, paths, and commands stay in their original form. Generated product code inside templates may follow product language (e.g. a Russian CSS comment).
- Concise: the agent is already smart. Concrete templates over prose. Body under 500 lines; link to skills instead of copying them.

## Frontmatter

```yaml
---
description: [C] — One-line what the command does.
---
```

- Prefix **`[C] — `** so the command is recognizable in the slash picker (skills also appear there).
- One line: WHAT it produces, not WHEN (WHEN is the `/` invocation).
- Do not set `disable-model-invocation` — that field is for skills. Commands are already explicit slash invocations.

## Body

Use this section order. Skip a section only when it does not apply.

1. **Title + opening** — what it produces and the only required input.
2. **`## Skills (required, first)`** — when a skill owns the methodology. Link `SKILL.md` and its examples. State: when this command and those skills disagree, **the skills win**.
3. **`## Context`** — required vs optional. How to read `@` attachments and trailing text after `/name`. Derive names from the attached path; do **not** ask for what the path already gives. If required context is missing, ask the user to attach it with `@` and **stop**.
4. **Decision table / naming** — variants (e.g. page vs component file suffix) in a table, not a paragraph.
5. **`## Etalon`** — named source template (snippet, spec), **not** a living file that may not exist. Map snippet tokens to this project's files. Keep the template's code shape.
6. **`## Template`** — full file tree plus full file contents with concrete names, then "replace with the derived names". Do not overwrite non-empty files unless the command says so.
7. **`## Process`** — numbered steps for a workflow (audit, update), not a scaffold.
8. **`## Rules` / `## Scope`** — what to touch, what not to touch, which boundaries apply.
9. **`## After …`** — required stop condition. Default for a scaffold: write the files and stop; do **not** run or propose type-check, lint, format, tests, or the `verify` skill. A workflow command may propose `prettier` / `cspell` if the writer did not already; still do not run them unless asked.

Executable helpers do not belong in the command file. Put `.py` scripts in the related skill's `scripts/` and call them from there (`python3 .cursor/skills/<skill>/scripts/foo.py`).

## Rules

- One concern per command; split instead of overloading a single file.
- Don't duplicate a skill's body in the command — link, don't copy.
- Don't copy structure from a living slice/file as the etalon; that file may not exist.
- Don't ask for values the attached path already gives. Missing required `@` context → ask to attach and stop; don't invent a path.
- Any script under `.cursor/` is `.py` (Python 3) — no `.js` / `.ts` / `.sh`.

## Examples

- Correct commands — see [`examples/good.md`](examples/good.md).
- Anti-patterns — see [`examples/bad.md`](examples/bad.md).
