#!/bin/sh
# TDD helper: run vitest in watch mode for a single test file, picking the
# matching config by extension. Run from the project root.
#
# Usage:
#   sh .cursor/skills/tdd/scripts/tdd.sh <test-path> [--int]
#
# Config selection:
#   *.test.tsx  → vitest.unit.browser.config.ts (component behavior)
#   *.test.ts   → vitest.unit.node.config.ts (pure logic)
#   --int       → vitest.int.browser.config.ts (integration)
#
# Exit codes: non-zero on argument/config errors; vitest owns the rest.

set -eu

[ -f package.json ] || { echo "tdd.sh: package.json not found. Run from the project root." >&2; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo "tdd.sh: pnpm not found in PATH." >&2; exit 1; }

if [ "$#" -lt 1 ]; then
  echo "tdd.sh: usage: sh .cursor/skills/tdd/scripts/tdd.sh <test-path> [--int]" >&2
  exit 1
fi

config=""
path=""
int=0
for arg in "$@"; do
  case "$arg" in
    --int) int=1 ;;
    *) path="$arg" ;;
  esac
done

if [ -z "$path" ]; then
  echo "tdd.sh: no test path provided." >&2
  exit 1
fi

if [ "$int" -eq 1 ]; then
  config="vitest.int.browser.config.ts"
else
  case "$path" in
    *.tsx) config="vitest.unit.browser.config.ts" ;;
    *.ts) config="vitest.unit.node.config.ts" ;;
    *) echo "tdd.sh: can't pick a vitest config for '$path' (expected .ts/.tsx). Pass --int for integration." >&2; exit 1 ;;
  esac
fi

echo "→ vitest watch: $path (--config $config)"
exec pnpm exec vitest watch "$path" --config "$config"
