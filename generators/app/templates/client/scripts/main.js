'use strict';

const m = require('mithril');
const client = require('./gas-client');

const app = {
  controller: function () {
    const ctl = this;
    this.message = m.prop('');
    this.result = m.prop();
    this.handleAuthClick = () => {
      m.startComputation();
      client
      .run('echo', ctl.message())
      .then(message => {
        ctl.result(message);
        m.endComputation();
      })
      .catch(e => {
        ctl.result(e);
        m.endComputation();
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
