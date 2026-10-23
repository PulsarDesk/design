<p align="center">
  <img width="120" height="120" src="https://raw.githubusercontent.com/PulsarDesk/.github/main/profile/logo.svg" alt="Pulsar logo">
</p>

<h1 align="center">Pulsar Design</h1>

<p align="center">
  Colors, fonts, components and screen designs for every Pulsar app and the website. 🎨
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2026?style=for-the-badge" alt="Maintained">
  <a href="https://github.com/PulsarDesk/design/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/PulsarDesk/design/ci.yml?branch=main&style=for-the-badge&label=CI" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/PulsarDesk/design?style=for-the-badge" alt="License"></a>
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
