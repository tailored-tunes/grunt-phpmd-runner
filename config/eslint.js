'use strict';

module.exports = function (grunt, options) {

	var files = [
		{
			src: options.jsFiles
		}
	];

	return {
		base: {
			options: {
				configFile: '<%= configDir %>/.eslintrc',
				format: 'stylish'
			},
			files: files
		},
		jenkins: {
			options: {
				configFile: '<%= configDir %>/.eslintrc',
				format: 'checkstyle',
				outputFile: '<%= reportsDir %>/checkstyle.xml'
			},
			files: files
		}
	};
};
