if (process.env.NODE_ENV === 'local') {
  const config = require('gas-rest-config');
  const Client = require('./google-apps-script-rest-client');
  module.exports = new Client(config);
} else {
  const Client = require('./google-apps-script-run');
  module.exports = new Client();
}
