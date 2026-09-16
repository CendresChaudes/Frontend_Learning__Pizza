#!/bin/sh
# Prepends `// @ts-nocheck` to every TypeScript file under `generated/.kubb/`.
#
# Why: Kubb copies the shared client runtime (`client.ts`, `serializers.ts`,
# `standardSchema.ts`) into `generated/.kubb/` verbatim from its own templates
# via `ctx.injectFile({ copy })`. That path bypasses the `output.banner`
# resolver, so neither the global `output.banner` nor a plugin's
# `output.banner` is applied to these files. Plugin-emitted files (zod, http,
# msw, hooks, types, mocks) already get `// @ts-nocheck` via per-plugin
# `output.banner`; this script closes the gap for `.kubb/` so the whole
# `generated/` tree is skipped by TypeScript's type checker while staying
# importable (export types still resolve for consumers in `src/`).

set -eu

DIR='generated/.kubb'
DIRECTIVE='// @ts-nocheck'

if [ ! -d "$DIR" ]; then
  echo "directory $DIR not found, nothing to do"
  exit 0
fi

# Collect touched paths here so the count survives the `while` loop, which
# otherwise runs in a pipeline sub shell and loses its increments.
touched_log=$(mktemp -t ts_nocheck.XXXXXX)
trap 'rm -f "$touched_log"' EXIT

# One `.ts` file per line, null-delimited to survive odd names.
find "$DIR" -type f -name '*.ts' -print0 | while IFS= read -r -d '' file; do
  first_line=$(head -n 1 "$file" 2>/dev/null || true)
  if [ "$first_line" = "$DIRECTIVE" ]; then
    continue
  fi

  # `@ts-nocheck` is only honored by TS when it sits at the top of the file.
  tmp="${file}.nocheck.tmp"
  {
    printf '%s\n\n' "$DIRECTIVE"
    cat "$file"
  } > "$tmp"
  mv "$tmp" "$file"
  echo "$file" >> "$touched_log"
  echo "+ $file"
done

touched=$(wc -l < "$touched_log" | tr -d ' ')
if [ "$touched" -eq 0 ]; then
  echo "all .kubb files already carry @ts-nocheck"
else
  echo "added @ts-nocheck to $touched file(s)"
fi
