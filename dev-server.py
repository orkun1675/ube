#!/usr/bin/env python3
# Dev server for the Ube landing page.
#
# Mirrors Astro's behavior: public/ is mounted at /, so static assets
# resolve at the same URL in dev as they do in the built dist/ output.
# Requests are tried against the project root first, then fall back to
# public/. PORT is read from the env (set by .claude/launch.json autoPort).

import os
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import unquote

ROOT = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(ROOT, "public")
os.chdir(ROOT)


class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        rooted = super().translate_path(path)
        if os.path.exists(rooted):
            return rooted
        clean = path.split("?", 1)[0].split("#", 1)[0]
        return os.path.join(PUBLIC, unquote(clean).lstrip("/"))


if __name__ == "__main__":
    port = os.environ.get("PORT")
    if not port:
        raise SystemExit("PORT not set by autoPort")
    HTTPServer(("", int(port)), Handler).serve_forever()
