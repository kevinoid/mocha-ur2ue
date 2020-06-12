/**
 * @copyright Copyright 2020 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 */

'use strict';

it('causes unhandled rejection', () => {
  // Reject with a recognizable Error name and message to find in output
  const err = new Error('banana');
  err.name = 'FruitError';
  // eslint-disable-next-line promise/catch-or-return
  Promise.reject(err);
});
