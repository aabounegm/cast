<a href="https://stats.uptimerobot.com/NnXDYFZ5zq"><img align="right" alt="Uptime" src="./.github/assets/uptime.svg" /></a><a href="https://cast-iu.pages.dev"><img align="right" alt="Live demo" src="./.github/assets/live-demo.svg" /></a>
<img alt="Cast, a podcast listening progressive web app" src="./.github/assets/banner-light.svg#gh-light-mode-only" />
<img alt="Cast, a podcast listening progressive web app" src="./.github/assets/banner-dark.svg#gh-dark-mode-only" />

[![Run tests on `main` push](https://github.com/aabounegm/cast/actions/workflows/unit-test-main.yml/badge.svg)](https://github.com/aabounegm/cast/actions/workflows/unit-test-main.yml)
[![Uptime Robot ratio (7 days)](https://img.shields.io/uptimerobot/ratio/7/m790750732-019a64d92e80fde508817b7c)](https://stats.uptimerobot.com/NnXDYFZ5zq)

## Features

- 📱 Listen to podcasts from any web browser
- ⬇️ Download podcasts to listen offline
- 📄 Read the transcript when listening is not an option
- ❤️ Save your favorite podcasts for quick access
- ☁️ Sync your favorites and listening history with a GitHub account

<details>
  <summary><strong>Screenshots</strong></summary>
  <table>
    <tbody>
      <tr>
        <td><img alt="Podcast Gallery screen" src="./.github/assets/podcast-gallery.webp" /></td>
        <td><img alt="Podcast Episodes screen" src="./.github/assets/podcast-episodes.webp" /></td>
        <td><img alt="Now Playing screen" src="./.github/assets/now-playing.webp" /></td>
      </tr>
    </tbody>
  </table>
</details>

## Quality assurance

The quality of this application and its codebase is secured with these awesome tools:

- [x] [Feature Sliced Design](https://feature-sliced.design) dictates code structure
- [x] [ESLint](https://eslint.org) and [Prettier](https://prettier.io) enforce code style and help catch bugs early on
- [x] [TypeScript](https://www.typescriptlang.org/) provides strict type safety
- [x] [Husky](https://typicode.github.io/husky) installs Git hooks to run static checkers before each commit
- [ ] [Jest](https://jestjs.io/) helps to test each unit in isolation
- [x] [Cypress](https://www.cypress.io/) helps to the application end-to-end
- [ ] [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) continously measures application performance
- [x] [GitHub Actions](https://github.com/features/actions) run each pull request against a CI pipeline
- [x] [Cloudflare Pages](https://pages.cloudflare.com/) automatically deploy code for `main` and pull requests
- [x] [UptimeRobot](https://uptimerobot.com/) ensures the app is up and running
- [ ] OWASP Web Security Checklist ensures the application's security

## Running locally

Run it like any other Node.js app, first the dependencies, then the `dev` script:

```bash
pnpm install
pnpm dev
```

## Meet the team

<table>
  <thead>
    <th><a href="https://github.com/aabounegm">@aabounegm</a></th>
    <th><a href="https://github.com/alkaitagi">@alkaitagi</a></th>
    <th><a href="https://github.com/illright">@illright</a></th>
    <th><a href="https://github.com/khaledismaeel">@khaledismaeel</a></th>
    <th><a href="https://github.com/VanishMax">@VanishMax</a></th>
  </thead>
  <tbody align="center"><tr>
    <td><img alt="GitHub user aabounegm" src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/11016151?s=64&mask=circle&mbg=transparent&output=png" /></td>
    <td><img alt="GitHub user alkaitagi" src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/32439229?s=64&mask=circle&mbg=transparent&output=png" /></td>
    <td><img alt="GitHub user illright" src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/15035286?s=64&mask=circle&mbg=transparent&output=png" /></td>
    <td><img alt="GitHub user khaledismaeel" src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/62155849?s=64&mask=circle&mbg=transparent&output=png" /></td>
    <td><img alt="GitHub user VanishMax" src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/29180358?s=64&mask=circle&mbg=transparent&output=png" /></td>
  </tr><!--
  <tr>
    <td>CI / CD</td>
    <td>Podcast player</td>
    <td>Design</td>
    <td>Backend</td>
    <td>Podcast player</td>
  </tr>--></tbody>
</table>

## License

The source code of this project is distributed under the terms of the MIT license. [Click here](https://choosealicense.com/licenses/mit/) to learn what that means.
