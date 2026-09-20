#!/usr/bin/env python3
"""Scaffold an FSD slice with role-based segments (Auth etalon for modules).

Creates src/<n>_<layer>/<Slice>/ with index.ts and the requested segment
directories. No segment barrels — files are imported by path.
Refuses abstract / obsolete segment names. Widgets/pages are flat.

Usage:
    python3 .cursor/skills/create-slice/scripts/create-slice.py <layer-alias> <SliceName> [segment...]

    layer-alias: app | pages | widgets | modules | core | shared | global
    SliceName:   PascalCase for pages/widgets/modules (Auth, Header)
    segment:     modules → presentation model data domain [lib config constants]
                 app/core/shared → ui lib config constants api types
                 pages/widgets → none (use /create-slice)

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

PASCAL_SLICE_LAYERS = frozenset({"pages", "widgets", "modules"})
FLAT_SLICE_LAYERS = frozenset({"pages", "widgets"})

MODULE_SEGMENTS = (
    "presentation",
    "model",
    "data",
    "domain",
    "lib",
    "config",
    "constants",
)

# app / core / shared / global — not Auth-shaped; keep the infra segment names.
INFRA_SEGMENTS = ("ui", "lib", "config", "constants", "api", "types")

INDEX_TS_HEADER = (
    "// Public API of this slice. Re-export only what consumers in higher layers need.\n"
    "// Keep internals private; don't re-export every file.\n"
)


def allowed_segments(layer_alias: str) -> tuple[str, ...]:
    if layer_alias == "modules":
        return MODULE_SEGMENTS
    if layer_alias in FLAT_SLICE_LAYERS:
        return ()
    return INFRA_SEGMENTS


def hint_for(name: str, layer_alias: str) -> str:
    allowed = allowed_segments(layer_alias)
    table = {
        "ui": "ui -> presentation" if layer_alias == "modules" else "ui is valid on app/core/shared",
        "api": "api -> data" if layer_alias == "modules" else "api is valid on core/shared",
        "hooks": "hooks -> presentation (*.vm.ts / component) or model (interactor)",
        "hook": "hooks -> presentation (*.vm.ts / component) or model (interactor)",
        "components": "components -> presentation (*.component.tsx)",
        "component": "components -> presentation (*.component.tsx)",
        "utils": "utils -> lib",
        "util": "utils -> lib",
        "helpers": "helpers -> lib",
        "helper": "helpers -> lib",
        "services": "services -> data (*.api.ts) or model (*.interactor.ts)",
        "service": "services -> data (*.api.ts) or model (*.interactor.ts)",
        "store": "store -> model (*.interactor.ts) and/or presentation *.vm.ts",
        "stores": "store -> model (*.interactor.ts) and/or presentation *.vm.ts",
        "types": "types -> domain/*.interface.ts or model/*.schema.ts, not a module segment",
        "type": "types -> domain/*.interface.ts or model/*.schema.ts, not a module segment",
        "providers": "providers -> the 1_app layer (app-wide), not a module segment",
        "provider": "providers -> the 1_app layer (app-wide), not a module segment",
        "hocs": "hocs -> presentation",
        "hoc": "hocs -> presentation",
        "presentation": "presentation is a module segment (etalon Auth), not used on shared/core",
        "data": "data is a module segment (etalon Auth), not used on shared/core",
        "domain": "domain is a module segment (etalon Auth), not used on shared/core",
        "model": "model is a module segment (etalon Auth)",
    }
    if name in table:
        return table[name]
    allowed_list = " ".join(allowed) if allowed else "(none — this layer is flat)"
    return f"{name} is not a canonical segment for {layer_alias}; use one of: {allowed_list}"


def is_pascal_case(name: str) -> bool:
    if not name or "-" in name or "_" in name:
        return False
    return name[0].isupper() and name.isalnum()


def die(msg: str, code: int = 1) -> None:
    print(f"create-slice.py: {msg}", file=sys.stderr)
    sys.exit(code)


def main(argv: list[str]) -> int:
    if not Path("package.json").is_file():
        die("package.json not found. Run from the project root.")

    if len(argv) < 2:
        print(
            "create-slice.py: usage: python3 .cursor/skills/create-slice/scripts/create-slice.py "
            "<layer-alias> <SliceName> [segment...]",
            file=sys.stderr,
        )
        print("  layer-alias: app | pages | widgets | modules | core | shared | global", file=sys.stderr)
        print("  SliceName:   PascalCase for pages/widgets/modules (Auth, Header)", file=sys.stderr)
        print("  segment:     modules → presentation model data domain [lib config constants]", file=sys.stderr)
        print("               app/core/shared → ui lib config constants api types", file=sys.stderr)
        print("               pages/widgets → none (flat; use /create-slice)", file=sys.stderr)
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

    if layer_alias in PASCAL_SLICE_LAYERS and not is_pascal_case(slice_name):
        die(
            f"slice name '{slice_name}' must be PascalCase (Auth, Header), not kebab-case."
        )

    if layer_alias in FLAT_SLICE_LAYERS and requested:
        die(
            f"{layer_alias} slices are flat (etalon Header / Auth.page). "
            "Do not pass segments; use /create-slice on the attached directory."
        )

    allowed = allowed_segments(layer_alias)
    segments: list[str] = []
    for seg in requested:
        if seg not in allowed:
            die(f"refusing abstract segment '{seg}'. {hint_for(seg, layer_alias)}.")
        segments.append(seg)

    slice_dir = Path("src") / folder / slice_name
    if slice_dir.exists():
        die(f"'{slice_dir}' already exists. Aborting to avoid clobbering.")

    slice_dir.mkdir(parents=True)
    (slice_dir / "index.ts").write_text(INDEX_TS_HEADER, encoding="utf-8")

    for seg in segments:
        (slice_dir / seg).mkdir()

    print(f"\u2713 Created {slice_dir}")
    for seg in segments:
        print(f"  \u2514\u2500\u2500 {seg}/")
    print(f"Add re-exports to {slice_dir}/index.ts as you fill the segments.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
