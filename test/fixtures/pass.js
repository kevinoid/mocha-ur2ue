/**
 * @copyright Copyright 2020 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 */

'use strict';

/* global setTimeout:false */

it('passes synchronously', () => {});
it('passes asynchronously', (cb) => setTimeout(cb, 0));
it('passes resolved Promise', () => Promise.resolve());
it(
  'passes delayed Promise',
  () => new Promise((resolve) => { setTimeout(resolve, 0); }),
);
