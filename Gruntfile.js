'use strict';

module.exports = function(grunt) {

  // measures the time each task takes
  require('time-grunt')(grunt);

  var options = {
    pkg: grunt.file.readJSON('package.json'),
    config: {
      config: grunt.file.readJSON('config/config.json'),
      credentials: grunt.file.readJSON('config/credentials.json')
    },
    // [MEMO]node-visualforceタスクがgrunt−のprefixで始まらないため、自動ロードされない
    loadGruntTasks: {
     pattern: ['grunt-*', '@*/grunt-*', 'node-visualforce']
   }
  };

  // load tasks
  require('load-grunt-config')(grunt, options);

};
