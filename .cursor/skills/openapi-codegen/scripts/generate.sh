#!/bin/sh
# Single entrypoint for generating clients/types/mocks from openapi.json via Kubb.
# Runs `pnpm run generate`, then type-checks the project (tsconfig.app.json).
# Don't call `kubb generate` directly — use this script to always get the
# post type-check and consistent behavior.
#
# Usage (from the project root):
#   sh .cursor/skills/openapi-codegen/scripts/generate.sh
#
# Exit codes:
#   0 — generation and type-check succeeded
#   1 — missing required files / not run from the project root
#   2 — Kubb generation error
#   3 — type-check error (tsc)

set -eu

# Require run from the project root: package.json and kubb.config.ts must be present.
for f in package.json kubb.config.ts openapi.json; do
  if [ ! -f "$f" ]; then
    echo "generate.sh: file '$f' not found. Run the script from the project root." >&2
    exit 1
  fi
done

# pnpm may be missing from PATH in some environments — check upfront.
if ! command -v pnpm >/dev/null 2>&1; then
  echo "generate.sh: pnpm not found in PATH. Install pnpm or activate the right environment." >&2
  exit 1
fi

echo "→ Generating code from openapi.json (Kubb)…"
# `pnpm run generate` itself invokes postGenerate hooks from kubb.config.ts
# (including scripts/ts-nocheck-kubb.sh — applying @ts-nocheck).
if ! pnpm run generate; then
  echo "generate.sh: Kubb generation error." >&2
  exit 2
fi

echo "→ Type-checking (tsc -p tsconfig.app.json --noEmit)…"
if ! pnpm exec tsc -p tsconfig.app.json --noEmit; then
  echo "generate.sh: type-check failed. Fix generated code or wrappers." >&2
  exit 3
fi

echo "✓ Done: generated/ updated, types are green."
