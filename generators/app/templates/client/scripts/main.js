'use strict';

const m = require('mithril');
const prop = require('mithril/stream');
const request = require('./gas-mithril-request').request;

const app = {
  oninit: function (vnode) {
    vnode.state.message = prop('');
    vnode.state.result = prop();
  },
  handleAuthClick: function () {
    const state = this;
    request('echo', state.message()).then(message => {
      state.result(message);
    }).catch(e => {
      state.result(e);
    });
  },
  view: vnode => {
    const ctl = vnode.state;
    return <div class="row">
            <form class="form-inline">
              <div class="form-group">
                <input type="text" class="form-control" id="message"
                  placeholder="Echo Message"
                  onchange={m.withAttr('value', ctl.message)} value={ctl.message()}/>
              </div>{' '}
              <button type="button" class="btn btn-default" onclick={ctl.handleAuthClick.bind(ctl)}>Echo</button>
            </form>
            <p>{ctl.result()}</p>
           </div>;
  }
};

/* global document */
m.route(document.getElementById('root'), '/', {
  '/': app
});
