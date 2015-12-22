/* global gapi */
class Client {
  constructor(options) {
    this.clientId = options.clientId;
    this.scopes = options.scopes;
    this.scriptId = options.scriptId;
  }

  run(name, args) {
    const token = gapi.auth.getToken();
    if (token && token.expires_at - new Date().getTime() / 1000 >= 60) {
      return this.callScriptFunction(name, args);
    }
    return new Promise((resolve, reject) => {
      this.checkAuth(Boolean(token), authResult => {
        if (authResult && !authResult.error) {
          this.callScriptFunction(name, args)
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
        } else {
          reject(authResult.error);
        }
      });
    });
  }

  callScriptFunction(name, args) {
    const scriptId = this.scriptId;

    // Create an execution request object.
    var request = {
      function: name,
      parameters: args,
      devMode: true
    };

    // Make the API request.
    var op = gapi.client.request({
      root: 'https://script.googleapis.com',
      path: 'v1/scripts/' + scriptId + ':run',
      method: 'POST',
      body: request
    });

    return new Promise((resolve, reject) => {
      op.execute(resp => {
        if (resp.error) {
          // The API encountered a problem before the script
          // started executing.
          reject(JSON.stringify(resp, null, 2));
        } else {
          resolve(resp.response.result);
          // The structure of the result will depend upon what the Apps
          // Script function returns. Here, the function returns an Apps
          // Script Object with String keys and values, and so the result
          // is treated as a JavaScript object (folderSet).
        }
      });
    });
  }

  /**
   * Initiate auth flow in response to user clicking authorize button.
   *
   * @param {Function} handleAuthResult
   */
  checkAuth(immediate, handleAuthResult) {
    const promise = new Promise((resolve, reject) => {
      gapi.auth.authorize(
        /* eslint-disable camelcase */
        {client_id: this.clientId, scope: this.scopes, immediate: immediate},
        /* eslint-enable camelcase */
        authResult => {
          if (authResult && !authResult.error) {
            reject(authResult);
          } else {
            resolve(authResult);
          }
        });
    });
    if (!(typeof handleAuthResult === 'function')) {
      return promise;
    }
    promise
    .then(handleAuthResult).catch(handleAuthResult);
  }

  init() {
    gapi.auth.authorize(
      /* eslint-disable camelcase */
      {
        client_id: this.clientId,
        scope: this.scopes.join(' '),
        immediate: true
      },
      /* eslint-enable camelcase */
      authResult => {
        console.log(authResult);
      });
  }
}

module.exports = Client;
