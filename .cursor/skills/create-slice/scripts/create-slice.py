#!/usr/bin/env python3
"""Scaffold an FSD slice with role-based segments only.

Creates src/<n>_<layer>/<slice>/ with index.ts and the requested segments,
each with an index.ts barrel. Refuses abstract, role-less segment names.

Usage:
    python3 .cursor/skills/create-slice/scripts/create-slice.py <layer-alias> <slice-name> [segment...]

    layer-alias: app | pages | widgets | modules | core | shared | global
segment:     ui | model | lib | api | config | constants

Exit codes:
    0 — slice created
    1 — bad usage / unknown layer / abstract segment / slice already exists
"""

from __future__ import annotations

import sys
from pathlib import Path

LAYER_FOLDERS = {
    "app": "1_app",
    "pages": "2_pages",
    "widgets": "3_widgets",
    "modules": "4_modules",
    "core": "5_core",
    "shared": "6_shared",
    "global": "7_global",
}

CANONICAL_SEGMENTS = ("ui", "model", "lib", "api", "config", "constants")

INDEX_TS_HEADER = (
    "// Public API of this slice. Re-export only what consumers in higher layers need.\n"
    "// Keep internals private; don't re-export every file.\n"
)

SEGMENT_INDEX_TS_HEADER = "// Barrel for this segment. Re-export its public surface.\n"


def hint_for(name: str) -> str:
    table = {
        "hooks": "hooks -> ui (UI hooks) or model (business hooks)",
        "hook": "hooks -> ui (UI hooks) or model (business hooks)",
        "components": "components -> ui",
        "component": "components -> ui",
        "utils": "utils -> lib",
        "util": "utils -> lib",
        "helpers": "helpers -> lib",
        "helper": "helpers -> lib",
        "services": "services -> api (network) or model (business)",
        "service": "services -> api (network) or model (business)",
        "store": "store -> model",
        "stores": "store -> model",
        "types": "types -> a *.types.ts file inside the owning segment (usually model), not a segment",
        "type": "types -> a *.types.ts file inside the owning segment (usually model), not a segment",
        "providers": "providers -> ui (slice) or the 1_app layer (app-wide)",
        "provider": "providers -> ui (slice) or the 1_app layer (app-wide)",
        "hocs": "hocs -> ui",
        "hoc": "hocs -> ui",
    }
    if name in table:
        return table[name]
    return f"{name} is not a canonical segment; use one of: {' '.join(CANONICAL_SEGMENTS)}"


def die(msg: str, code: int = 1) -> None:
    print(f"create-slice.py: {msg}", file=sys.stderr)
    sys.exit(code)


def main(argv: list[str]) -> int:
    if not Path("package.json").is_file():
        die("package.json not found. Run from the project root.")

    if len(argv) < 2:
        print(
            "create-slice.py: usage: python3 .cursor/skills/create-slice/scripts/create-slice.py "
            "<layer-alias> <slice-name> [segment...]",
            file=sys.stderr,
        )
        print("  layer-alias: app | pages | widgets | modules | core | shared | global", file=sys.stderr)
        print("  segment:     ui | model | lib | api | config | constants", file=sys.stderr)
        return 1

    layer_alias = argv[0]
    slice_name = argv[1]
    requested = argv[2:]

    folder = LAYER_FOLDERS.get(layer_alias)
    if folder is None:
        die(
            f"unknown layer alias '{layer_alias}'. "
            f"Use one of: {' '.join(LAYER_FOLDERS.keys())}."
        )

    segments: list[str] = []
    for seg in requested:
        if seg not in CANONICAL_SEGMENTS:
            die(f"refusing abstract segment '{seg}'. {hint_for(seg)}.")
        segments.append(seg)

    slice_dir = Path("src") / folder / slice_name
    if slice_dir.exists():
        die(f"'{slice_dir}' already exists. Aborting to avoid clobbering.")

    slice_dir.mkdir(parents=True)
    (slice_dir / "index.ts").write_text(INDEX_TS_HEADER, encoding="utf-8")

    for seg in segments:
        seg_dir = slice_dir / seg
        seg_dir.mkdir()
        (seg_dir / "index.ts").write_text(SEGMENT_INDEX_TS_HEADER, encoding="utf-8")

    print(f"\u2713 Created {slice_dir}")
    for seg in segments:
        print(f"  \u2514\u2500\u2500 {seg}/")
    print(f"Add re-exports to {slice_dir}/index.ts as you fill the segments.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
