# Ube landing — CLAUDE.md

## Purpose
Landing page at [ube.dev](https://ube.dev) whose sole job is to **measure interest in Ube**. The product itself doesn't exist yet — this site is a demand probe. Background essays live at `../ube-app/app_distribution_essay.md` (Publisher) and `../ube-app/app_maintenance_essay.md` (Maintainer). The Request Access modal's "Which product matters more to you?" radio (Maintainer vs Publisher) is the key signal we're collecting.

## Working alongside other agents
Other Claude Code sessions may be running in this repo in parallel.
- Treat uncommitted working-tree changes as possibly belonging to another agent.
- Don't reuse another agent's preview server. `preview_start` silently attaches to an existing instance with the same name. Call `preview_list` to see which slots are in use, then pick an unused one from the `dev-a` … `dev-f` pool in [.claude/launch.json](.claude/launch.json).
- If there are no slots available, STOP.

## Build / run
- **Dev server:** use the `preview_*` tools with the `dev` config in [.claude/launch.json](.claude/launch.json).
- **Prod build:** `npm run build` → [build.mjs](build.mjs) (esbuild) concatenates JSX files, minifies, rewrites `index.html` to use React production builds, drops Babel. GitHub Actions deploys `dist/` to Pages on push to `main`.

## File layout
```
index.html          # dev entry; <script type="text/babel"> tags
app.jsx             # App root, tweak defaults, mount
components.jsx      # Nav, Hero, Problems, HowItWorks, Benefits, FAQ, FinalCTA, Footer, RequestAccessModal
mockups.jsx         # in-page product mockups
assets.jsx          # logos, icons
tweaks-panel.jsx    # dev-only design tweak overlay
styles.css          # tokens + components + mockups
build.mjs           # prod build
maintainer/         # /maintainer/ redirects to /
```

JSX load order matters — `tweaks-panel → assets → mockups → components → app`. If you add a new `.jsx` file, update **both** `index.html` script tags and `JSX_FILES` in `build.mjs`.

## Things to know before editing
- **The Request Access form is a stub.** `components.jsx:1085` simulates success with `setTimeout` — nothing is sent anywhere. If interest needs to actually be captured, wire this up (Formspree, a Worker, etc.) — it's the highest-leverage missing piece given the project's goal.
- **Tweaks panel persists into source.** `app.jsx` has `EDITMODE-BEGIN/END` markers around `TWEAK_DEFAULTS`; the in-page tweaks panel writes back to that block. Don't reformat that region by hand.
- **Two-product positioning is intentional.** Hero currently leans Maintainer, but the modal surfaces both — preserve both signals unless explicitly narrowing focus.
- **Amplitude is gated to production.** [index.html](index.html) loads Amplitude's Unified Script and initializes it, but only when `location.hostname` is `ube.dev` or a subdomain. On `localhost` the snippet stub installs but `init` is skipped, so no events or replays fire. Escape hatch for local verification: append `?amplitude=1` to the URL. **Only test Amplitude locally if explicitly asked.**
- No test suite, no linter config, no TypeScript. Don't add tooling unless asked.
