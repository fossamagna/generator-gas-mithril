# <%= appName %>

Google Apps Script Web Application with [Browserify](http://browserify.org) + [Babel](https://babeljs.io/) + [Mithril](http://mithril.js.org/).

# For Local Development

For Apps Script local development, You need to use Drive API to export a Apps Script Project on Google Drive. This project will be use [gas-manager](https://github.com/soundTricker/gas-manager) for import Apps Script Project.

gas-project.json:
```json
{
  "src": {
    "fileId": "<YOUR_SCRIPT_ID>",
    "files": {
      "Code": {
        "path": "dist/bundle.js",
        "type": "server_js"
      },
      "index": {
        "path": "dist/index.html",
        "type": "html"
      }
    }
  }
}
```

Please see [gas-manager](https://github.com/soundTricker/gas-manager#cli) and [Importing and Exporting Projects Page](https://developers.google.com/apps-script/import-export) for details.

# Local Development

```sh
$ npm run dev
```

* Client JavaScript files will be recompiled by [watchify](https://github.com/substack/watchify).
* Local Http Server will be launched and serve client HTML, CSS and JavaScript.

**Note** : In local development mode, Client JavaScript use [Execution API](https://developers.google.com/apps-script/guides/rest/api) to invoke Apps Script. Before you execute `npm run dev` command, you should be edit configuration file as gas-rest-config.json in your project root directory.

### Example
gas-rest-config.json :
```json
{
  "local": {
    "clientId": "<YOUR_CLIENT_ID>",
    "scopes": ["https://www.googleapis.com/auth/spreadsheets"],
    "scriptId": "<YOUR_SCRIPT_ID_FOR_DEVELOPMENT>"
  }
}
```

# Deploy

```sh
$ npm run deploy
```

* Client javascript files will be compiled by Browserify.
* HTML, CSS, JavaScript files will be inline to a single HTML file.
* Server JavaScript files will be compiled by Browserify and [gasify](https://www.npmjs.com/package/gasify).
* Sync compiled bundle.js to Google Apps Script Project in Google Drive by  gas-manager.
