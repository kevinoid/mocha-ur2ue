mocha-ur2ue
===========

[![Build Status: Linux](https://img.shields.io/travis/kevinoid/mocha-ur2ue/master.svg?style=flat&label=build+on+linux)](https://travis-ci.org/kevinoid/mocha-ur2ue)
[![Build Status: Windows](https://img.shields.io/appveyor/ci/kevinoid/mocha-ur2ue/master.svg?style=flat&label=build+on+windows)](https://ci.appveyor.com/project/kevinoid/mocha-ur2ue)
[![Coverage](https://img.shields.io/codecov/c/github/kevinoid/mocha-ur2ue.svg?style=flat)](https://codecov.io/github/kevinoid/mocha-ur2ue?branch=master)
[![Dependency Status](https://img.shields.io/david/kevinoid/mocha-ur2ue.svg?style=flat)](https://david-dm.org/kevinoid/mocha-ur2ue)
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
