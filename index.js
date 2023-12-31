/**
 * Mocha helper to convert unhandled rejections into unhandled exceptions.
 * Workaround for https://github.com/mochajs/mocha/issues/2640
 * Based on https://github.com/mochajs/mocha/issues/1926#issuecomment-180842722
 *
 * @copyright Copyright 2016-2020 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 * @module mocha-ur2ue
 */

'use strict';

// Allow using console, process, and window global variables, when present
/* global console: false, process:false, window:false */

// Allow logging to console to notify user that they may miss rejections.
/* eslint-disable no-console */

exports.mochaHooks =
function mochaHooks() {
  if (typeof process !== 'undefined') {
    process.on('unhandledRejection', (reason) => {
      throw reason;
    });
  } else if (typeof window !== 'undefined') {
    // Note: This event may be emitted natively or by promise libraries
    // (e.g. bluebird and when.js)
    if (typeof window.addEventListener === 'function') {
      window.addEventListener('unhandledrejection', (evt) => {
        throw evt.detail.reason;
      });
    } else {
      const oldOHR = window.onunhandledrejection;
      window.onunhandledrejection = function(evt, ...args) {
        if (typeof oldOHR === 'function') { oldOHR.apply(this, args); }
        throw evt.detail.reason;
      };
    }
  } else if (typeof console !== 'undefined'
      && typeof (console.error || console.log) === 'function') {
    (console.error || console.log)(
      'mocha-ur2ue Warning: Unable to listen for unhandledrejection event.'
      + '  Unhandled rejections will be ignored.',
    );
  }

  // No need to run beforeAll/beforeEach.
  return {};
};
