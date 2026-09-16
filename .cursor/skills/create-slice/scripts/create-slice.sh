#!/bin/sh
# Scaffold an FSD slice with role-based segments only.
# Creates src/<n>_<layer>/<slice>/ with index.ts and the requested segments,
# each with an index.ts barrel. Refuses abstract, role-less segment names.
#
# Usage:
#   sh .cursor/skills/create-slice/scripts/create-slice.sh <layer-alias> <slice-name> [segment...]
#
# layer-alias: app | pages | widgets | features | entities | core | shared | global
# segment:     ui | model | lib | api | config | constants
#
# Exit codes:
#   0 — slice created
#   1 — bad usage / unknown layer / abstract segment / slice already exists

set -eu

[ -f package.json ] || { echo "create-slice.sh: package.json not found. Run from the project root." >&2; exit 1; }

if [ "$#" -lt 2 ]; then
  echo "create-slice.sh: usage: sh .cursor/skills/create-slice/scripts/create-slice.sh <layer-alias> <slice-name> [segment...]" >&2
  echo "  layer-alias: app | pages | widgets | features | entities | core | shared | global" >&2
  echo "  segment:     ui | model | lib | api | config | constants" >&2
  exit 1
fi

layer_alias="$1"
slice="$2"
shift 2

# Map layer alias -> numbered folder.
case "$layer_alias" in
  app) folder="1_app" ;;
  pages) folder="2_pages" ;;
  widgets) folder="3_widgets" ;;
  features) folder="4_features" ;;
  entities) folder="5_entities" ;;
  core) folder="6_core" ;;
  shared) folder="7_shared" ;;
  global) folder="8_global" ;;
  *) echo "create-slice.sh: unknown layer alias '$layer_alias'. Use one of: app pages widgets features entities core shared global." >&2; exit 1 ;;
esac

# Canonical segments only. Anything else is an abstract, role-less name.
canonical="ui model lib api config constants"

# Abstract names -> the canonical segment they belong to.
hint_for() {
  case "$1" in
    hooks | hook) echo "hooks -> ui (UI hooks) or model (business hooks)" ;;
    components | component) echo "components -> ui" ;;
    utils | util) echo "utils -> lib" ;;
    helpers | helper) echo "helpers -> lib" ;;
    services | service) echo "services -> api (network) or model (business)" ;;
    store | stores) echo "store -> model" ;;
    types | type) echo "types -> a *.types.ts file inside the owning segment (usually model), not a segment" ;;
    providers | provider) echo "providers -> ui (slice) or the 1_app layer (app-wide)" ;;
    hocs | hoc) echo "hocs -> ui" ;;
    *) echo "$1 is not a canonical segment; use one of: ui model lib api config constants" ;;
  esac
}

segments=""
for seg in "$@"; do
  ok=0
  for c in $canonical; do
    if [ "$seg" = "$c" ]; then ok=1; break; fi
  done
  if [ "$ok" -eq 0 ]; then
    echo "create-slice.sh: refusing abstract segment '$seg'. $(hint_for "$seg")." >&2
    exit 1
  fi
  segments="$segments $seg"
done

slice_dir="src/$folder/$slice"
if [ -e "$slice_dir" ]; then
  echo "create-slice.sh: '$slice_dir' already exists. Aborting to avoid clobbering." >&2
  exit 1
fi

mkdir -p "$slice_dir"

# Root index.ts — the slice's public API. Consumers import from here.
cat >"$slice_dir/index.ts" <<'EOF'
// Public API of this slice. Re-export only what consumers in higher layers need.
// Keep internals private; don't re-export every file.
EOF

# Each requested segment gets a directory + barrel index.ts.
for seg in $segments; do
  seg_dir="$slice_dir/$seg"
  mkdir -p "$seg_dir"
  cat >"$seg_dir/index.ts" <<'EOF'
// Barrel for this segment. Re-export its public surface.
EOF
done

echo "✓ Created $slice_dir"
for seg in $segments; do
  echo "  └── $seg/"
done
echo "Add re-exports to $slice_dir/index.ts as you fill the segments."
