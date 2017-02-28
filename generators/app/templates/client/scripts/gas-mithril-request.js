'use strict';

const m = require('mithril');
const client = require('./gas-client');

let oncompletion = m.redraw;

function setCompletionCallback(callback) {
  oncompletion = callback;
}

function finalizer() {
  let count = 0;
  function complete() {
    if (--count === 0 && typeof oncompletion === "function") {
      oncompletion();
    }
  }

  return function finalize(promise) {
    const then = promise.then;
    promise.then = function() {
      count++;
      const next = then.apply(promise, arguments);
      next.then(complete, function(e) {
        complete();
        if (count === 0) {
          throw e;
        }
      });
      return finalize(next);
    }
    return promise;
  }
}

function request(...args) {
  const finalize = finalizer();
  return finalize(client.run(...args));
}

module.exports = {request, setCompletionCallback}
