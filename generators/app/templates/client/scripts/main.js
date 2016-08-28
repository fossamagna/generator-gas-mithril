'use strict';

const m = require('mithril');
const request = require('./gas-mithril-request');

const app = {
  controller: function () {
    const ctl = this;
    this.message = m.prop('');
    this.result = m.prop();
    this.handleAuthClick = () => {
      request('echo', ctl.message()).then(message => {
        ctl.result(message);
      }).catch(e => {
        ctl.result(e);
      });
    };
  },
  view: ctl => {
    return <div>
            <button type="button" onclick={ctl.handleAuthClick}>Echo</button>
            <input type="text" onchange={m.withAttr('value', ctl.message)} value={ctl.message()}></input>
            <p>{ctl.result()}</p>
           </div>;
  }
};

/* global document */
m.route(document.getElementById('root'), '/', {
  '/': app
});
