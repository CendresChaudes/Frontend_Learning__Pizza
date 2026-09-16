#!/bin/sh
# Verification gate: run static checks for the changed scope.
# Runs tsc (whole project), then eslint, prettier, and cspell on the passed
# paths. Pass the changed files/dirs as arguments. Run from the project root.
#
# Covers step 1 (static checks) of the verify checklist. Tests (step 2) and
# re-reading the diff (step 3) are not scriptable here — see SKILL.md.
#
# Usage:
#   sh .cursor/skills/verify/scripts/verify.sh <path> [path...]
#
# Exit codes:
#   0 — all checks passed
#   1 — no paths provided / not run from project root
#   2 — type-check (tsc) failed
#   3 — lint (eslint) failed
#   4 — format (prettier) failed
#   5 — spell (cspell) failed

set -eu

if [ "$#" -eq 0 ]; then
  echo "verify.sh: no paths provided. Pass the changed files/dirs as arguments." >&2
  exit 1
fi

[ -f package.json ] || { echo "verify.sh: package.json not found. Run from the project root." >&2; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo "verify.sh: pnpm not found in PATH." >&2; exit 1; }

echo "→ Type-check (tsc -p tsconfig.app.json --noEmit)…"
if ! pnpm exec tsc -p tsconfig.app.json --noEmit; then
  echo "verify.sh: type-check failed." >&2
  exit 2
fi

# Collect files eslint can parse (skip .sh/.css/.json etc. with no eslint parser).
# The project uses no spaces in paths.
lintable=""
for f in "$@"; do
  case "$f" in
    *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs|*.md|*.mdc) lintable="$lintable $f" ;;
  esac
done
lintable="${lintable# }"

if [ -n "$lintable" ]; then
  echo "→ Lint (eslint --quiet)…"
  # shellcheck disable=SC2086 — intentional word splitting
  if ! pnpm exec eslint --quiet $lintable; then
    echo "verify.sh: lint failed." >&2
    exit 3
  fi
fi

echo "→ Format check (prettier --check --ignore-unknown)…"
if ! pnpm exec prettier --check --ignore-unknown "$@"; then
  echo "verify.sh: format check failed." >&2
  exit 4
fi

echo "→ Spell check (cspell)…"
if ! pnpm exec cspell "$@"; then
  echo "verify.sh: spell check failed." >&2
  exit 5
fi

echo "✓ Static checks passed. Next: run the relevant tests (SKILL.md step 2) and re-read your diff (step 3)."
