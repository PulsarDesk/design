<p align="center">
  <a href="https://pulsardesk.com"><img src=".github/assets/hero.png" alt="Pulsar Design: how Pulsar looks and feels" width="100%"></a>
</p>

<p align="center">Colors, fonts, components and screen designs for every Pulsar app and the website. 🎨</p>

<p align="center">
  <a href="https://github.com/PulsarDesk/design/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/PulsarDesk/design/ci.yml?branch=main&style=flat-square&label=CI" alt="CI"></a>
  <a href="https://github.com/PulsarDesk/design/stargazers"><img src="https://img.shields.io/github/stars/PulsarDesk/design?style=flat-square&color=13B3D4" alt="Stars"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-GPLv3-5B57E0?style=flat-square" alt="License: GPLv3"></a>
</p>

<p align="center">
  <b>Looking for the app?</b> 👉 <a href="https://github.com/PulsarDesk/pulsar-desktop"><b>Pulsar Desktop</b></a> (Windows, macOS, Linux) · <a href="https://github.com/PulsarDesk/pulsar-mobile"><b>Pulsar Mobile</b></a> (Android)
</p>

---

## 🚀 Project Status
The design source for Pulsar. The apps and the website copy their colors and spacing from here, so a change starts
in this repository.

- [`project/assets/tokens.css`](project/assets/tokens.css) - colors, fonts, spacing (the one source of truth)
- [`project/`](project/) - screen designs as HTML prototypes (open them in a browser)
- [`ds-react/`](ds-react/) - the same components as a React package

Look: light theme first, electric indigo accent, cyan for game mode. Fonts: Space Grotesk, Hanken Grotesk,
JetBrains Mono. Logo: concentric pulse rings.

---

## 📦 Other Pulsar Repositories
- [**pulsar-desktop**](https://github.com/PulsarDesk/pulsar-desktop) - Pulsar for Windows, macOS and Linux
- [**pulsar-mobile**](https://github.com/PulsarDesk/pulsar-mobile) - Pulsar for Android
- [**web**](https://github.com/PulsarDesk/web) - The [pulsardesk.com](https://pulsardesk.com) website

---

## 🐞 Reporting a bug
Something looks wrong in an app? Report it in the app's repository
([desktop](https://github.com/PulsarDesk/pulsar-desktop/issues/new/choose) or
[mobile](https://github.com/PulsarDesk/pulsar-mobile/issues/new/choose)) with a screenshot. Open an issue here for
problems in the design files themselves.

---

## 🤝 Contributing
Everyone can open [issues](https://github.com/PulsarDesk/design/issues) and pull requests. Irrelevant or abusive
issues may be closed or removed. Commits follow [Conventional Commits](https://www.conventionalcommits.org).

### Development Guide
```bash
git clone https://github.com/PulsarDesk/design.git
cd design/ds-react
bun install
bun run build
```

The designs came from a Claude Design handoff; notes for coding agents are in [HANDOFF.md](HANDOFF.md).

---

## 📄 License
Pulsar is licensed under **GNU GPLv3 or later** (GPL-3.0-or-later). See the [LICENSE](LICENSE) file for details.
