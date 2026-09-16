#!/bin/sh
# Post-work verification hook (Cursor "stop" event).
# Verifies ONLY the agent's changed files (not the whole repo):
#   - eslint --fix, prettier -w, stylelint --fix on changed source files
#   - pnpm run check:tests:fast (unit + int, no e2e) when .ts/.tsx changed
# On failure, returns a followup_message so the agent addresses it.

set -u

input=$(cat)
status=$(printf '%s' "$input" | jq -r '.status // empty')
loop_count=$(printf '%s' "$input" | jq -r '.loop_count // 0')

case "$status" in
  completed) ;;
  *) printf '{}'; exit 0 ;;
esac

if [ "$loop_count" -ge 3 ]; then
  printf '{}'
  exit 0
fi

# Changed files: unstaged + staged vs HEAD + untracked, excluding deletions.
all_changed=$(git diff --name-only --diff-filter=d HEAD 2>/dev/null; git ls-files --others --exclude-standard 2>/dev/null)

# Filter helper: existing files matching a regex. Newline-separated output.
filter_changed() {
  while IFS= read -r f; do
    [ -f "$f" ] || continue
    printf '%s\n' "$f" | grep -qE "$1" && printf '%s\n' "$f"
  done
}

# Run a command on changed files matching a regex.
# Sets global OUT to combined stdout+stderr; returns the command's exit code.
# Skips (OUT="", return 0) when no matching files.
run_filtered() {
  regex="$1"; shift
  files=$(printf '%s\n' "$all_changed" | filter_changed "$regex")
  if [ -z "$files" ]; then
    OUT=""
    return 0
  fi
  OUT=$(printf '%s\n' "$files" | tr '\n' '\0' | xargs -0 "$@" 2>&1)
  return $?
}

msg=""

# 1) eslint --fix on changed JS/TS files.
run_filtered '\.(ts|tsx|js|mjs|cjs)$' pnpm exec eslint --quiet --fix
if [ $? -ne 0 ]; then
  msg="eslint --fix failed on changed files:

$(printf '%s' "$OUT" | tail -n 40)

Fix the lint errors in the files you changed, then stop."
fi

# 2) prettier -w on changed source files.
if [ -z "$msg" ]; then
  run_filtered '\.(ts|tsx|js|mjs|cjs|css|md|mdx|json|html|yaml|yml)$' pnpm exec prettier -w --log-level warn
  if [ $? -ne 0 ]; then
    msg="prettier -w failed on changed files:

$(printf '%s' "$OUT" | tail -n 40)

Resolve the formatting errors in the files you changed, then stop."
  fi
fi

# 3) stylelint --fix on changed CSS files.
if [ -z "$msg" ]; then
  run_filtered '\.css$' pnpm exec stylelint --fix --quiet
  if [ $? -ne 0 ]; then
    msg="stylelint --fix failed on changed files:

$(printf '%s' "$OUT" | tail -n 40)

Resolve the style errors in the files you changed, then stop."
  fi
fi

# 4) Unit + integration tests (check:tests:fast — no e2e, since e2e auto-starts a dev server, too heavy for a stop hook) — only when .ts/.tsx changed.
ts_changed=$(printf '%s\n' "$all_changed" | filter_changed '\.(ts|tsx)$' | head -n1)
if [ -z "$msg" ] && [ -n "$ts_changed" ]; then
  OUT=$(pnpm run check:tests:fast 2>&1)
  if [ $? -ne 0 ]; then
    msg="check:tests:fast failed. Tail of output:

$(printf '%s' "$OUT" | tail -n 40)

Fix the failing tests at the root cause, then stop."
  fi
fi

if [ -n "$msg" ]; then
  jq -n --arg m "$msg" '{followup_message: $m}'
else
  printf '{}'
fi
exit 0
