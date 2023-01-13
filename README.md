mocha-ur2ue
===========

[![Build Status](https://img.shields.io/github/actions/workflow/status/kevinoid/mocha-ur2ue/node.js.yml?branch=main&style=flat&label=build)](https://github.com/kevinoid/mocha-ur2ue/actions?query=branch%3Amain)
[![Dependency Status](https://img.shields.io/librariesio/release/npm/mocha-ur2ue.svg?style=flat)](https://libraries.io/npm/mocha-ur2ue)
[![Supported Node Version](https://img.shields.io/node/v/mocha-ur2ue.svg?style=flat)](https://www.npmjs.com/package/mocha-ur2ue)
[![Version on NPM](https://img.shields.io/npm/v/mocha-ur2ue.svg?style=flat)](https://www.npmjs.com/package/mocha-ur2ue)

A [Mocha](https://mochajs.org/) [root hook
plugin](https://mochajs.org/#root-hook-plugins) to convert
[`unhandledrejection`
events](https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event)
to unhandled exceptions so that they will cause test failures.  This works
around a long-standing issue
([mochajs/mocha#1926](https://github.com/mochajs/mocha/issues/1926) and
[mochajs/mocha#2640](https://github.com/mochajs/mocha/issues/2640)) that
unhandled rejections do not cause test failure in Mocha.

## Introductory Example

```sh
npm install --save-dev mocha mocha-ur2ue
mocha --require mocha-ur2ue --recursive tests
```


## Node.js Alternatives

On Node.js v10.17 and later, the behavior of this module can be accomplished
by invoking Node.js with
[`--unhandled-rejections=throw`](https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode):

```sh
node --unhandled-rejections=throw node_modules/mocha/bin/mocha --recursive test
```

or by setting `NODE_OPTIONS=--unhandled-rejections=throw` in the environment:

```sh
NODE_OPTIONS=--unhandled-rejections=throw mocha --recursive test
```

`--unhandled-rejections=throw` became the default in Node.js v15, making this
module unnecessary with v15 and later.


## Installation

[This package](https://www.npmjs.com/package/mocha-ur2ue) can be
installed using [npm](https://www.npmjs.com/), either globally or locally, by
running:

```sh
npm install mocha-ur2ue
```

## Contributing

Contributions are appreciated.  Contributors agree to abide by the [Contributor
Covenant Code of
Conduct](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html).
If this is your first time contributing to a Free and Open Source Software
project, consider reading [How to Contribute to Open
Source](https://opensource.guide/how-to-contribute/)
in the Open Source Guides.

If the desired change is large, complex, backwards-incompatible, can have
significantly differing implementations, or may not be in scope for this
project, opening an issue before writing the code can avoid frustration and
save a lot of time and effort.

## License

This project is available under the terms of the [MIT License](LICENSE.txt).
See the [summary at TLDRLegal](https://tldrlegal.com/license/mit-license).
