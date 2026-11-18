# README artwork

Source for the banners and illustrations at the top of every Pulsar README (`.github/assets/*.png` in each repo,
`profile/assets/*.png` in the org `.github` repo). Built from the brand tokens: dark space background, electric
indigo + cyan, Space Grotesk / Hanken Grotesk / JetBrains Mono, pulse-ring logo.

| Section id | Used as |
|---|---|
| `hero-org` | `.github` → `profile/assets/hero.png` |
| `hero-desktop` | `pulsar-desktop` → `.github/assets/hero.png` |
| `hero-mobile` | `pulsar-mobile` → `.github/assets/hero.png` |
| `hero-relay` | `relay` → `.github/assets/hero.png` |
| `hero-core`, `hero-proto`, `hero-web`, `hero-design` | `.github/assets/hero.png` in that repo |
| `steps` | `steps.png` (desktop, mobile, org profile) |
| `stats` | `stats.png` (desktop, org profile) |

## Regenerate

1. Put the app screenshots the banners embed into `img/` (git-ignored):
   - from `pulsar-desktop/docs/screenshots/`: `connect-dark.png`, `gaming-light.png`
   - from `pulsar-mobile/docs/screenshots/`: `connect.png`, `game-mode.png`, `my-device.png`, renamed with an
     `m-` prefix (`m-connect.png`, ...)
2. From a folder with Playwright installed (e.g. `website/`): `node ../design/readme-assets/render.mjs [id ...]`
3. Copy `out/<id>.png` to the paths above.

The desktop screenshots come from the browser mock of the UI (`bun run dev` in `pulsar-desktop`, 1280×800 at 2×,
English, light and dark theme).
