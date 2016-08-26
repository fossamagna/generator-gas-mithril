if (process.env.NODE_ENV === 'local') {
  const config = require('gas-rest-config');
  const Client = require('gas-api-run').default;
  const client = new Client(config[process.env.NODE_ENV]);
  global.init = client.init.bind(client);
  module.exports = client;
} else {
  const Client = require('gas-run').default;
  module.exports = new Client();
}
