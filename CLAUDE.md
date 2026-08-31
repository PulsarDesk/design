# Pulsar design system

Design source of truth for all Pulsar surfaces. See the umbrella `../CLAUDE.md`
for the product and brand rules.

- `project/assets/tokens.css` — **THE canonical design tokens** (Claude Design
  handoff). Every other repo (website, desktop UI) ports from here; sync back
  any change.
- `project/*.html` + `project/app/*.jsx` — prototypes from the handoff bundle
  (desktop app screens, website pages). Reference, not production code.
- `ds-react/` — hand-built React component package of the DS (own build via
  `build.mjs`, bun).
- Synced to claude.ai/design; re-sync via `/design-sync`.

Brand: light theme first, electric indigo accent + cyan for gaming; fonts
Space Grotesk / Hanken Grotesk / JetBrains Mono; logo = concentric pulse rings.

CI builds ds-react; releases via semantic-release (tags only).
