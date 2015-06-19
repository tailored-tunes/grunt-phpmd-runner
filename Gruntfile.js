'use strict';

module.exports = function (grunt) {

	var options = {
			configDir: 'config',
			reportsDir: 'reports',
			jsFiles: [
				'Gruntfile.js',
				'tasks/**/*.js',
				'config/**/*.js'
			]
		},
		configs = require('load-grunt-configs')(grunt, options);

	require('load-grunt-tasks')(grunt);
	grunt.loadTasks('tasks');
	grunt.initConfig(configs);

	grunt.registerTask('default', ['eslint']);

};
