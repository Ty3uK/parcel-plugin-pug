<p align="center">
    <img alt="parcel-plugin-pug" src="https://raw.githubusercontent.com/Ty3uK/parcel-plugin-pug/master/.assets/logo.png" width="512">
</p>

[![Travis CI Build Status](https://travis-ci.org/Ty3uK/parcel-plugin-pug.svg?branch=master)](https://travis-ci.org/Ty3uK/parcel-plugin-pug)
[![Appveyor Build status](https://ci.appveyor.com/api/projects/status/kjnr9wm0d0r29677?svg=true)](https://ci.appveyor.com/project/Ty3uK/parcel-plugin-pug)
[![Dependencies](https://david-dm.org/Ty3uK/parcel-plugin-pug.svg?branch=master)](https://david-dm.org/Ty3uK/parcel-plugin-pug)
[![npm package](https://img.shields.io/npm/v/parcel-plugin-pug.svg)](https://www.npmjs.com/package/parcel-plugin-pug)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# parcel-plugin-pug

[Pug template](https://github.com/pugjs/pug) support for [Parcel bundler](https://github.com/parcel-bundler/parcel)

## Features

- Supports `.pug` and `.jade` template files
- Correctly handles include and extends statements
- Supports Pug filters
- Resolves all assets inside template files

## Coming features

- [x] Support HMR when changing template includes
- [ ] Fix duplicated pug error messages
- [ ] Fix variables with URL in mixins

## Installation
`yarn add parcel-plugin-pug`

or

`npm install parcel-plugin-pug`

## Getting error?

If you getting error like that

```bash
parcel src/content.pug
⏳  Building...
Server running at http://localhost:1234
🚨  Cannot find module 'parcel-bundler/src/Asset'
```

you need to install `parcel-bundler` by running `npm install -D parcel-bundler` or `yarn add parcel-bundler` in your project folder, because plugin uses `parcel-bundler` as peerDependency.
