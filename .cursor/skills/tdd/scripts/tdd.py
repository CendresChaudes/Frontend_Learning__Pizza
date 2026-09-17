#!/usr/bin/env python3
"""TDD helper: run vitest in watch mode for a single test file.

Picks the matching vitest config by extension. Run from the project root.

Usage:
    python3 .cursor/skills/tdd/scripts/tdd.py <test-path> [--int]

Config selection:
    *.test.tsx  -> vitest.unit.browser.config.ts (component behavior)
    *.test.ts   -> vitest.unit.node.config.ts (pure logic)
    --int       -> vitest.int.browser.config.ts (integration)

Exit codes: non-zero on argument/config errors; vitest owns the rest.
"""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path


def die(msg: str, code: int = 1) -> None:
    print(f"tdd.py: {msg}", file=sys.stderr)
    sys.exit(code)


def main(argv: list[str]) -> int:
    if not Path("package.json").is_file():
        die("package.json not found. Run from the project root.")
    if shutil.which("pnpm") is None:
        die("pnpm not found in PATH.")

    if not argv:
        print("tdd.py: usage: python3 .cursor/skills/tdd/scripts/tdd.py <test-path> [--int]", file=sys.stderr)
        return 1

    test_path: str | None = None
    is_int = False
    for arg in argv:
        if arg == "--int":
            is_int = True
        else:
            test_path = arg

    if test_path is None:
        die("no test path provided.")

    if is_int:
        config = "vitest.int.browser.config.ts"
    elif test_path.endswith(".tsx"):
        config = "vitest.unit.browser.config.ts"
    elif test_path.endswith(".ts"):
        config = "vitest.unit.node.config.ts"
    else:
        die(f"can't pick a vitest config for '{test_path}' (expected .ts/.tsx). Pass --int for integration.")

    print(f"\u2192 vitest watch: {test_path} (--config {config})")
    # `exec` semantics: replace this process with vitest so signals/codes propagate.
    result = subprocess.run(
        ["pnpm", "exec", "vitest", "watch", test_path, "--config", config],
        env=None,
    )
    return result.returncode


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
