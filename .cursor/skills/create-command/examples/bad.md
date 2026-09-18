# Bad examples — `create-command`

## ❌ Skill directory under `.cursor/commands/`

```text
.cursor/commands/create-slice/
├── SKILL.md
└── examples/
```

Why: a command is one `.md` file. `SKILL.md` + `examples/` belong in `.cursor/skills/<name>/`.

**Use instead**: `.cursor/commands/create-slice.md`.

## ❌ Description without `[C] —`

```yaml
---
description: Create component files in the attached directory.
---
```

Why: skills also appear in the slash picker. `[C] —` marks this as a command.

**Use instead**: `description: [C] — Create component files in the attached directory.`

## ❌ Asking for what `@` already gives

User attached `@src/3_widgets/Header`. The command asks: "Which layer? What is the slice name?"

Why: the directory is attached — basename `Header` and layer `3_widgets` are already known. Asking stalls the command.

**Use instead**: derive `<dir-name>` from the path; if nothing is attached, ask to attach with `@` and stop.

## ❌ Copying a living file as the etalon

"Read `src/3_widgets/Header/` and copy its structure."

Why: that slice may not exist, and it is not the source of truth. The etalon is a named snippet/template.

**Use instead**: an `## Etalon` section that maps snippet tokens to this project's files.

## ❌ Duplicating a skill body in the command

The command pastes the full `docs-update` skill (process, examples, language rules).

Why: the copy drifts. Progressive disclosure: link the skill; when they disagree, the skill wins.

**Use instead**: `## Skills (required, first)` with relative links, then only invocation details (context, scope, stop).

## ❌ Same name, different job

`.cursor/commands/format-label.md` scaffolds a helper file; `.cursor/skills/format-label/` teaches display formatting in UI.

Why: `/format-label` and the `format-label` skill then fight. A shared name must be the same job (command invokes that skill).

**Use instead**: distinct names, or make the command a thin wrapper around the skill.

## ❌ No stop condition

The command writes files and then runs `verify`, lint, and the test suite.

Why: scaffold commands stop after writing (see `/create-slice`). Side-effect runs are prohibited unless the command's After section says otherwise — and even then, propose long commands; don't run them silently.

**Use instead**: `## After creating` — do not run or propose type-check, lint, format, tests, or `verify`.

## ❌ Non-English command prose

Command instructions written in Russian.

Why: commands are agent artifacts — English (per `management/general.mdc`). Identifiers, paths, and commands stay in their original form. Product-language strings belong only inside generated templates (e.g. a Russian CSS comment).

## ❌ Inlining a script in the command file

```sh
python3 - <<'PY'
print("scaffold")
PY
```

Why: scripts under `.cursor/` are `.py` files in a skill's `scripts/`, not inlined in the command. The inlined copy drifts.

**Use instead**: `python3 .cursor/skills/<skill>/scripts/foo.py` with behavior/exit codes in the script header.
