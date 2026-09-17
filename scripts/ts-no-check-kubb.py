#!/usr/bin/env python3
"""Prepends `// @ts-nocheck` to every TypeScript file under `generated/.kubb/`.

Why: Kubb copies the shared client runtime (`client.ts`, `serializers.ts`,
`standard_schema.ts`) into `generated/.kubb/` verbatim from its own templates
via `ctx.injectFile({ copy })`. That path bypasses the `output.banner`
resolver, so neither the global `output.banner` nor a plugin's
`output.banner` is applied to these files. Plugin-emitted files (zod, http,
msw, hooks, types, mocks) already get `// @ts-nocheck` via per-plugin
`output.banner`; this script closes the gap for `.kubb/` so the whole
`generated/` tree is skipped by TypeScript's type checker while staying
importable (export types still resolve for consumers in `src/`).
"""

from __future__ import annotations

import sys
from pathlib import Path

DIR = Path("generated/.kubb")
DIRECTIVE = "// @ts-nocheck"


def main() -> int:
    if not DIR.is_dir():
        print(f"directory {DIR} not found, nothing to do")
        return 0

    touched: list[Path] = []
    for file in sorted(DIR.rglob("*.ts")):
        if not file.is_file():
            continue
        first_line = file.read_text(encoding="utf-8").splitlines()[0] if file.stat().st_size else ""
        if first_line == DIRECTIVE:
            continue

        # `@ts-nocheck` is only honored by TS when it sits at the top of the file.
        original = file.read_text(encoding="utf-8")
        file.write_text(f"{DIRECTIVE}\n\n{original}", encoding="utf-8")
        touched.append(file)
        print(f"+ {file}")

    if not touched:
        print("all .kubb files already carry @ts-nocheck")
    else:
        print(f"added @ts-nocheck to {len(touched)} file(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
