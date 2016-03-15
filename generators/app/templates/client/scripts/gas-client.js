if (process.env.NODE_ENV === 'local') {
  const config = require('gas-rest-config');
  const Client = require('./google-apps-script-rest-client');
  const client = new Client(config[process.env.NODE_ENV]);
  global.init = client.init.bind(client);
  module.exports = client;
} else {
  const Client = require('./google-apps-script-run');
  module.exports = new Client();
}
