'use strict'

const m = require('mithril');
const client = require('./gas-client');

module.exports = (...args) => {
  m.startComputation();
  const deferred = m.deferred();
  client.run(...args)
  .then(value => {
    deferred.resolve(value);
    m.endComputation();
  }).catch(e => {
    deferred.reject(e);
    m.endComputation();
  });
  return deferred.promise;
}
