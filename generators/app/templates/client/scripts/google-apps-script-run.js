/* global google */
class Client {
  run(name, args) {
    return new Promise((resolve, reject) => {
      google.script.run
      .withSuccessHandler(result => {
        resolve(result);
      })
      .withFailureHandler(error => {
        reject(error);
      })[name](args);
    });
  }
}

module.exports = Client;
