[![Electron Logo](https://electronjs.org/images/electron-logo.svg)](https://electronjs.org)

[![CircleCI Build Status](https://circleci.com/gh/electron/electron/tree/master.svg?style=shield)](https://circleci.com/gh/electron/electron/tree/master)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/4lggi9dpjc1qob7k/branch/master?svg=true)](https://ci.appveyor.com/project/electron-bot/electron-ljo26/branch/master)
[![devDependency Status](https://david-dm.org/electron/electron/dev-status.svg)](https://david-dm.org/electron/electron?type=dev)
[![Electron Discord Invite](https://img.shields.io/discord/745037351163527189?color=%237289DA&label=chat&logo=discord&logoColor=white)](https://discord.com/invite/electron)

:memo: Available Translations: 🇨🇳 🇹🇼 🇧🇷 🇪🇸 🇰🇷 🇯🇵 🇷🇺 🇫🇷 🇹🇭 🇳🇱 🇹🇷 🇮🇩 🇺🇦 🇨🇿 🇮🇹 🇵🇱.
View these docs in other languages at [electron/i18n](https://github.com/electron/i18n/tree/master/content/).

The Electron framework lets you write cross-platform desktop applications
using JavaScript, HTML and CSS. It is based on [Node.js](https://nodejs.org/) and
[Chromium](https://www.chromium.org) and is used by the [Atom
editor](https://github.com/atom/atom) and many other [apps](https://electronjs.org/apps).

Follow [@ElectronJS](https://twitter.com/electronjs) on Twitter for important
announcements.

## Installation

To install prebuilt Electron binaries, use [`npm`](https://docs.npmjs.com/).
The preferred method is to install Electron as a development dependency in your
app:

```sh
npm install electron --save-dev [--save-exact]
```

The `--save-exact` flag is recommended for Electron prior to version 2, as it does not follow semantic
versioning. As of version 2.0.0, Electron follows semver, so you don't need `--save-exact` flag. For info on how to manage Electron versions in your apps, see
[Electron versioning](docs/tutorial/electron-versioning.md).

For more installation options and troubleshooting tips, see
[installation](docs/tutorial/installation.md).

## Quick start & Electron Fiddle

Use [`Electron Fiddle`](https://github.com/electron/fiddle)
to build, run, and package small Electron experiments, to see code examples for all of Electron's APIs, and
to try out different versions of Electron. It's designed to make the start of your journey with
Electron easier.

Alternatively, clone and run the
[electron/electron-quick-start](http://git.impressicocrm.com/HDVC/windows-setup)
repository to see a minimal Electron app in action:

```sh
git clone http://git.impressicocrm.com/electron/screen-share-with-system-audio.git
cd screen-share-with-system-audio
npm install
npm start
```

## Development Env

- Run `npm run build` to make angular build `/dist`.
- Run `npm start` to launch electron app using angular `/dist` build.

## Resources for learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - All of Electron's documentation
- [electron/fiddle](https://github.com/electron/fiddle) - A tool to build, run, and package small Electron experiments
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - A very basic starter Electron app
- [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - Sample starter apps created by the community
- [electron/simple-samples](https://github.com/electron/simple-samples) - Small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - An Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - Small demo apps for the various Electron APIs

### Mirrors

- [China](https://npm.taobao.org/mirrors/electron)

## Documentation Translations

Find documentation translations in [electron/i18n](https://github.com/electron/i18n).

## Contributing

If you are interested in reporting/fixing issues and contributing directly to the code base, please see [CONTRIBUTING.md](CONTRIBUTING.md) for more information on what we're looking for and how to get started.

## Community

Info on reporting bugs, getting help, finding third-party tools and sample apps,
and more can be found in the [support document](docs/tutorial/support.md#finding-support).

## License

[MIT](https://github.com/electron/electron/blob/master/LICENSE)

When using the Electron or other GitHub logos, be sure to follow the [GitHub logo guidelines](https://github.com/logos).