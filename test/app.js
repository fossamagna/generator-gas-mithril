'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-gas-mithril:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({appName: 'awesaomeApp'})
      .withPrompts({githubUsername: 'foo'})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      'gas-rest-config.json',
      '.gitignore',
      '.babelrc',
      'README.md',
      'server.js',
      'client/index.html',
      'client/scripts/main.js',
      'client/scripts/gas-client.js',
      'client/scripts/google-apps-script-run.js',
      'client/scripts/google-apps-script-rest-client.js',
      'server/echo.js',
      'server/main.js'
    ]);
  });
});
