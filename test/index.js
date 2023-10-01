/**
 * @copyright Copyright 2020 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 */

'use strict';

const assert = require('node:assert');
const { execFile } = require('node:child_process');
const path = require('node:path');
const { promisify } = require('node:util');

const hookPath = path.join(__dirname, '..', 'index.js');
const mochaPath = require.resolve('mocha/bin/mocha');
const passTest = path.join(__dirname, 'fixtures', 'pass.js');
const unhandledTest = path.join(__dirname, 'fixtures', 'unhandled.js');

const execFileP = promisify(execFile);

function runMocha(...args) {
  // Note: Can't exec "mocha" on Windows without "shell: true", which causes
  // perf and quoting issues, due to execFile not using %PATHEXT% which would
  // include .cmd in search path, necessary to resolve mocha to mocha.cmd.
  // See https://github.com/nodejs/node/issues/6671
  const promise = execFileP(
    process.execPath,
    [mochaPath, '-R', 'json', ...args],
  );
  promise.child.stdin.end();
  return promise;
}

function badPass(result) {
  assert.fail('Test run did not fail as expected.');
}

function defineTests(...args) {
  it(
    'tests with unhandled rejections pass without hook',
    () => runMocha(...args, unhandledTest),
  );

  it(
    'tests without unhandled rejections still pass with hook',
    () => runMocha(...args, '--require', hookPath, passTest),
  );

  it(
    'tests with unhandled rejections fail with hook',
    () => runMocha(...args, '--require', hookPath, unhandledTest)
      .then(
        badPass,
        (errMocha) => {
          const report = JSON.parse(errMocha.stdout);
          const { err } = report.failures[0];
          assert.strictEqual(err.message, 'banana');
          assert.strictEqual(err.name, 'FruitError');
          assert.strictEqual(err.uncaught, true);
        },
      ),
  );
}

describe('mocha', () => {
  describe('default', () => defineTests());
  describe('--parallel', () => defineTests('--parallel'));
});
