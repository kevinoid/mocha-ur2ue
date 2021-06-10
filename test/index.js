/**
 * @copyright Copyright 2020 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 */

'use strict';

const assert = require('assert');
const { execFile } = require('child_process');
const path = require('path');

const hookPath = path.join(__dirname, '..', 'index.js');
const mochaPath = require.resolve('mocha/bin/mocha');
const passTest = path.join(__dirname, 'fixtures', 'pass.js');
const unhandledTest = path.join(__dirname, 'fixtures', 'unhandled.js');

function runMocha(...args) {
  // TODO [engine:node@>=12.6]: Use util.promisify(child_process.execFile)
  // https://github.com/nodejs/node/pull/28325 in nodejs/node@dd5e07f9b4
  return new Promise((resolve, reject) => {
    // Note: Can't exec "mocha" on Windows without "shell: true", which causes
    // perf and quoting issues, due to execFile not using %PATHEXT% which would
    // include .cmd in search path, necessary to resolve mocha to mocha.cmd.
    // See https://github.com/nodejs/node/issues/6671
    const proc = execFile(
      process.execPath,
      [mochaPath, '-R', 'json', ...args],
      (err, stdout, stderr) => {
        if (err) {
          err.stdout = stdout;
          err.stderr = stderr;
          reject(err);
        } else {
          resolve({ stdout, stderr });
        }
      },
    );
    proc.stdin.end();
  });
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
