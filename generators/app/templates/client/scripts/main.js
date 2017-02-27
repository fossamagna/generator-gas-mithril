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
    return <div class="row">
            <form class="form-inline">
              <div class="form-group">
                <input type="text" class="form-control" id="message"
                  placeholder="Echo Message"
                  onchange={m.withAttr('value', ctl.message)} value={ctl.message()}/>
              </div>{' '}
              <button type="button" class="btn btn-default" onclick={ctl.handleAuthClick}>Echo</button>
            </form>
            <p>{ctl.result()}</p>
           </div>;
  }
};

/* global document */
m.route(document.getElementById('root'), '/', {
  '/': app
});
