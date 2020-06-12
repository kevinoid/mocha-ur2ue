/**
 * Mocha helper to convert unhandled rejections into unhandled exceptions.
 * See: https://github.com/mochajs/mocha/issues/1926
 *
 * @copyright Copyright 2016 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 */

'use strict';

// Allow using window global if it is not undefined
/* global window:false */

// Allow logging to console to notify user that they may miss rejections.
/* eslint-disable no-console */

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
