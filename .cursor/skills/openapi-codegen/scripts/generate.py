#!/usr/bin/env python3
"""Single entrypoint for generating clients/types/mocks from openapi.json via Kubb.

Runs `pnpm run generate`, then type-checks the project (tsconfig.app.json).
Don't call `kubb generate` directly -- use this script to always get the
post type-check and consistent behavior.

Usage (from the project root):
    python3 .cursor/skills/openapi-codegen/scripts/generate.py

Exit codes:
    0 — generation and type-check succeeded
    1 — missing required files / not run from the project root
    2 — Kubb generation error
    3 — type-check error (tsc)
"""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

REQUIRED_FILES = ("package.json", "kubb.config.ts", "openapi.json")


def die(msg: str, code: int = 1) -> None:
    print(f"generate.py: {msg}", file=sys.stderr)
    sys.exit(code)


def run(cmd: list[str]) -> int:
    return subprocess.run(cmd).returncode


def main() -> int:
    for f in REQUIRED_FILES:
        if not Path(f).is_file():
            die(f"file '{f}' not found. Run the script from the project root.")

    if shutil.which("pnpm") is None:
        die("pnpm not found in PATH. Install pnpm or activate the right environment.")

    print("\u2192 Generating code from openapi.json (Kubb)\u2026")
    # `pnpm run generate` itself invokes postGenerate hooks from kubb.config.ts
    # (including scripts/ts-no-check-kubb.py -- applying @ts-nocheck).
    if run(["pnpm", "run", "generate"]) != 0:
        die("Kubb generation error.", code=2)

    print("\u2192 Type-checking (tsc -p tsconfig.app.json --noEmit)\u2026")
    if run(["pnpm", "exec", "tsc", "-p", "tsconfig.app.json", "--noEmit"]) != 0:
        die("type-check failed. Fix generated code or wrappers.", code=3)

    print("\u2713 Done: generated/ updated, types are green.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
