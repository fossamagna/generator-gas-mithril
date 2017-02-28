'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

module.exports = yeoman.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the grand ' + chalk.red('generator-gas-mithril') + ' generator!'
    ));

    var prompts = [
      {
        name: 'appName',
        message: 'What do you want to name your app?',
        default: this.appname.replace(/\s/g, '-'),
        filter: function (val) {
          return _s.slugify(val);
        }
      },
      {
        name: 'githubUsername',
        message: 'What is your GitHub username?',
        store: true,
        validate: function (val) {
          return val.length > 0 ? true : 'You have to provide a username';
        }
      }
    ];

    this.prompt(prompts).then(function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('**'),
      this.destinationPath(),
      {
        appName: this.props.appName,
        githubUsername: this.props.githubUsername,
        name: this.user.git.name(),
        email: this.user.git.email()
      }
    );
    this.fs.move(
      this.destinationPath('_package.json'),
      this.destinationPath('package.json')
    );
    this.fs.move(
      this.destinationPath('_babelrc'),
      this.destinationPath('.babelrc')
    );
    this.fs.move(
      this.destinationPath('_gitignore'),
      this.destinationPath('.gitignore')
    );
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});
