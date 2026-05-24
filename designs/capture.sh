#!/usr/bin/env bash
# Render the design HTMLs in this directory into the final PNGs under
# public/assets/. Self-contained: spins up an ephemeral HTTP server so
# Google Fonts load with a proper origin (file:// triggers CORS warnings
# that suppress font loading in headless Chrome).
#
# Requires macOS (uses /Applications/Google Chrome + sips). Run from
# anywhere — paths are resolved relative to this script.
#
# Why we kill Chrome instead of waiting for it:
# headless Chrome on macOS writes the screenshot within a second or two
# (--virtual-time-budget=4000) but does not exit on its own — it lingers
# with GCM / task_policy errors. We wait for the .png to appear, then
# kill the process and move on. Don't pipe its stderr into a `| tail`
# style consumer either, since the pipe stays open until Chrome dies.
#
# Output:
#   public/assets/favicons/favicon-light.png      (192x192)
#   public/assets/favicons/favicon-dark.png       (192x192)
#   public/assets/favicons/apple-touch-icon.png   (180x180, dark variant)
#   public/assets/social/og-image.png             (1200x630)

set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DESIGNS="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$DESIGNS/.." && pwd)"
OUT_FAVICONS="$ROOT/public/assets/favicons"
OUT_SOCIAL="$ROOT/public/assets/social"
TMP="$(mktemp -d -t ube-favicons.XXXXXX)"
PORT=8765

cleanup() {
  [[ -n "${SERVER_PID:-}" ]] && kill "$SERVER_PID" 2>/dev/null || true
  rm -rf "$TMP"
}
trap cleanup EXIT

# Ephemeral static server rooted at project root so /designs/*.html resolves
(cd "$ROOT" && python3 -m http.server "$PORT" >/dev/null 2>&1) &
SERVER_PID=$!

# Wait for the server to start accepting connections
for _ in {1..30}; do
  curl -s -o /dev/null "http://localhost:$PORT/" && break
  sleep 0.1
done

shoot() {
  local name=$1 w=$2 h=$3 scale=$4
  local out="$TMP/$name.png"
  "$CHROME" \
    --headless=new --disable-gpu --hide-scrollbars --no-sandbox \
    --force-device-scale-factor="$scale" \
    --default-background-color=00000000 \
    --window-size="$w,$h" \
    --virtual-time-budget=4000 \
    --user-data-dir="$TMP/cdp-$name" \
    --screenshot="$out" \
    "http://localhost:$PORT/designs/$name.html" >/dev/null 2>&1 &
  local pid=$!
  # Poll for the screenshot to land, up to 20s
  for _ in {1..200}; do
    [[ -s "$out" ]] && break
    sleep 0.1
  done
  kill -9 "$pid" 2>/dev/null || true
  wait "$pid" 2>/dev/null || true
  [[ -s "$out" ]] || { echo "✗ $name: screenshot not produced" >&2; return 1; }
}

# Favicons render at 512x512 logical; 4x DPR gives us 2048x2048 to downsample
# cleanly to 192 (browser tab / Android home) and 180 (apple-touch-icon).
# Social preview captures at native 1200x630.
shoot favicon-dark   512  512  4
shoot favicon-light  512  512  4
shoot social-preview 1200 630  1

mkdir -p "$OUT_FAVICONS" "$OUT_SOCIAL"
sips -s format png -z 192 192 "$TMP/favicon-dark.png"  --out "$OUT_FAVICONS/favicon-dark.png"      >/dev/null
sips -s format png -z 192 192 "$TMP/favicon-light.png" --out "$OUT_FAVICONS/favicon-light.png"     >/dev/null
sips -s format png -z 180 180 "$TMP/favicon-dark.png"  --out "$OUT_FAVICONS/apple-touch-icon.png"  >/dev/null
cp "$TMP/social-preview.png" "$OUT_SOCIAL/og-image.png"

echo "✓ regenerated favicons/{favicon-light,favicon-dark,apple-touch-icon}.png + social/og-image.png"
