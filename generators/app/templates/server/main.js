'use strict';

/* global HtmlService */
global.doGet = function () {
  return HtmlService.createHtmlOutputFromFile('index')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
};

global.echo = require('./echo');
