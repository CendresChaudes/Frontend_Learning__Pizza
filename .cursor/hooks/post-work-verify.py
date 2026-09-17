#!/usr/bin/env python3
"""Post-work verification hook (Cursor "stop" event).

Verifies ONLY the agent's changed files (not the whole repo):
  - eslint --fix, prettier -w, stylelint --fix on changed source files
  - pnpm run check:tests:fast (unit + int, no e2e) when .ts/.tsx changed
On failure, emits a JSON object with a followup_message so the agent addresses it.

Input: the Cursor stop-event payload on stdin (JSON).
Output: JSON on stdout -- `{}` on success/no-op, `{"followup_message": ...}` on failure.
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

LOOP_LIMIT = 3

ESLINT_RE = re.compile(r"\.(ts|tsx|js|mjs|cjs)$")
PRETTIER_RE = re.compile(r"\.(ts|tsx|js|mjs|cjs|css|md|mdx|json|html|yaml|yml)$")
STYLELINT_RE = re.compile(r"\.css$")
TS_RE = re.compile(r"\.(ts|tsx)$")


def emit(obj: dict) -> None:
    json.dump(obj, sys.stdout)
    sys.stdout.write("\n")


def changed_files() -> list[str]:
    """Unstaged + staged vs HEAD + untracked, excluding deletions."""
    files: list[str] = []
    diff = subprocess.run(
        ["git", "diff", "--name-only", "--diff-filter=d", "HEAD"],
        capture_output=True,
        text=True,
    )
    if diff.returncode == 0:
        files.extend(line for line in diff.stdout.splitlines() if line)
    untracked = subprocess.run(
        ["git", "ls-files", "--others", "--exclude-standard"],
        capture_output=True,
        text=True,
    )
    if untracked.returncode == 0:
        files.extend(line for line in untracked.stdout.splitlines() if line)
    seen: set[str] = set()
    unique: list[str] = []
    for f in files:
        if f not in seen:
            seen.add(f)
            unique.append(f)
    return unique


def filter_existing(files: list[str], pattern: re.Pattern) -> list[str]:
    return [f for f in files if Path(f).is_file() and pattern.search(f)]


def run(cmd: list[str]) -> tuple[int, str]:
    proc = subprocess.run(cmd, capture_output=True, text=True)
    combined = (proc.stdout or "") + (proc.stderr or "")
    return proc.returncode, combined


def tail(text: str, n: int = 40) -> str:
    return "\n".join(text.splitlines()[-n:])


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        emit({})
        return 0

    if payload.get("status") != "completed":
        emit({})
        return 0

    if int(payload.get("loop_count") or 0) >= LOOP_LIMIT:
        emit({})
        return 0

    all_changed = changed_files()
    msg = ""

    # 1) eslint --fix on changed JS/TS files.
    eslint_files = filter_existing(all_changed, ESLINT_RE)
    if eslint_files:
        code, out = run(["pnpm", "exec", "eslint", "--quiet", "--fix", *eslint_files])
        if code != 0:
            msg = (
                "eslint --fix failed on changed files:\n\n"
                f"{tail(out)}\n\n"
                "Fix the lint errors in the files you changed, then stop."
            )

    # 2) prettier -w on changed source files.
    if not msg:
        prettier_files = filter_existing(all_changed, PRETTIER_RE)
        if prettier_files:
            code, out = run(["pnpm", "exec", "prettier", "-w", "--log-level", "warn", *prettier_files])
            if code != 0:
                msg = (
                    "prettier -w failed on changed files:\n\n"
                    f"{tail(out)}\n\n"
                    "Resolve the formatting errors in the files you changed, then stop."
                )

    # 3) stylelint --fix on changed CSS files.
    if not msg:
        stylelint_files = filter_existing(all_changed, STYLELINT_RE)
        if stylelint_files:
            code, out = run(["pnpm", "exec", "stylelint", "--fix", "--quiet", *stylelint_files])
            if code != 0:
                msg = (
                    "stylelint --fix failed on changed files:\n\n"
                    f"{tail(out)}\n\n"
                    "Resolve the style errors in the files you changed, then stop."
                )

    # 4) Unit + integration tests (no e2e -- too heavy for a stop hook) when .ts/.tsx changed.
    if not msg and any(TS_RE.search(f) for f in all_changed if f):
        code, out = run(["pnpm", "run", "check:tests:fast"])
        if code != 0:
            msg = (
                "check:tests:fast failed. Tail of output:\n\n"
                f"{tail(out)}\n\n"
                "Fix the failing tests at the root cause, then stop."
            )

    if msg:
        emit({"followup_message": msg})
    else:
        emit({})
    return 0


if __name__ == "__main__":
    sys.exit(main())
