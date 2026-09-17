#!/usr/bin/env python3
"""Verification gate: run static checks for the changed scope.

Runs tsc (whole project), then eslint, prettier, and cspell on the passed
paths. Pass the changed files/dirs as arguments. Run from the project root.

Covers step 1 (static checks) of the verify checklist. Tests (step 2) and
re-reading the diff (step 3) are not scriptable here -- see SKILL.md.

Usage:
    python3 .cursor/skills/verify/scripts/verify.py <path> [path...]

Exit codes:
    0 — all checks passed
    1 — no paths provided / not run from project root
    2 — type-check (tsc) failed
    3 — lint (eslint) failed
    4 — format (prettier) failed
    5 — spell (cspell) failed
"""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

LINTABLE_SUFFIXES = (".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".md", ".mdc")


def die(msg: str, code: int = 1) -> None:
    print(f"verify.py: {msg}", file=sys.stderr)
    sys.exit(code)


def run(cmd: list[str]) -> int:
    return subprocess.run(cmd).returncode


def main(argv: list[str]) -> int:
    if not argv:
        die("no paths provided. Pass the changed files/dirs as arguments.")
    if not Path("package.json").is_file():
        die("package.json not found. Run from the project root.")
    if shutil.which("pnpm") is None:
        die("pnpm not found in PATH.")

    print("\u2192 Type-check (tsc -p tsconfig.app.json --noEmit)\u2026")
    if run(["pnpm", "exec", "tsc", "-p", "tsconfig.app.json", "--noEmit"]) != 0:
        die("type-check failed.", code=2)

    lintable = [f for f in argv if f.endswith(LINTABLE_SUFFIXES)]
    if lintable:
        print("\u2192 Lint (eslint --quiet)\u2026")
        if run(["pnpm", "exec", "eslint", "--quiet", *lintable]) != 0:
            die("lint failed.", code=3)

    print("\u2192 Format check (prettier --check --ignore-unknown)\u2026")
    if run(["pnpm", "exec", "prettier", "--check", "--ignore-unknown", *argv]) != 0:
        die("format check failed.", code=4)

    print("\u2192 Spell check (cspell)\u2026")
    if run(["pnpm", "exec", "cspell", *argv]) != 0:
        die("spell check failed.", code=5)

    print("\u2713 Static checks passed. Next: run the relevant tests (SKILL.md step 2) and re-read your diff (step 3).")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
