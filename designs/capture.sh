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
#   public/assets/favicons/favicon.png            (192x192)
#   public/assets/favicons/apple-touch-icon.png   (180x180)
#   public/assets/favicons/logo-512.png           (512x512, used by JSON-LD logo + webmanifest)
#   public/favicon.ico                            (32x32, for legacy /favicon.ico requests)
#   public/assets/social/og-image.jpg             (1200x630, publisher default)
#   public/assets/social/og-image-maintainer.jpg  (1200x630)

set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DESIGNS="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$DESIGNS/.." && pwd)"
OUT_FAVICONS="$ROOT/public/assets/favicons"
OUT_SOCIAL="$ROOT/public/assets/social"
TMP="$(mktemp -d -t ube-favicons.XXXXXX)"
PORT=8765

cleanup() {
  if [[ -n "${SERVER_PID:-}" ]]; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
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

# Favicon renders at 512x512 logical; 4x DPR gives us 2048x2048 to downsample
# cleanly to 192 (browser tab / Android home) and 180 (apple-touch-icon).
# Social preview captures at native 1200x630.
shoot favicon                  512  512  4
shoot social-preview-maintainer 1200 630  1
shoot social-preview-publisher 1200 630  1

mkdir -p "$OUT_FAVICONS" "$OUT_SOCIAL"
sips -s format png -z 192 192 "$TMP/favicon.png" --out "$OUT_FAVICONS/favicon.png"           >/dev/null
sips -s format png -z 180 180 "$TMP/favicon.png" --out "$OUT_FAVICONS/apple-touch-icon.png"  >/dev/null
sips -s format png -z 512 512 "$TMP/favicon.png" --out "$OUT_FAVICONS/logo-512.png"          >/dev/null
# Legacy /favicon.ico — macOS sips can write .ico natively from a PNG; older
# bookmark managers, RSS readers, and some embed previews still ask for it.
sips -s format png -z 32 32 "$TMP/favicon.png" --out "$TMP/favicon-32.png"                   >/dev/null
sips -s format ico "$TMP/favicon-32.png" --out "$ROOT/public/favicon.ico"                    >/dev/null
sips -s format jpeg -s formatOptions 90 "$TMP/social-preview-publisher.png" --out "$OUT_SOCIAL/og-image.jpg" >/dev/null
sips -s format jpeg -s formatOptions 90 "$TMP/social-preview-maintainer.png" --out "$OUT_SOCIAL/og-image-maintainer.jpg" >/dev/null

echo "✓ regenerated favicons/{favicon,apple-touch-icon,logo-512}.png + favicon.ico + social/{og-image,og-image-maintainer}.jpg"
