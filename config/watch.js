'use strict';

module.exports = function () {
	return {
		style: {
			files: [
				'config/.eslintrc'
			],
			tasks: [
				'eslint'
			],
			options: {
				reload: true
			}
		},
		configFiles: {
			files: [
				'Gruntfile.js',
				'config/**/*.js'
			],
			tasks: [
				'eslint'
			],
			options: {
				reload: true
			}
		},
		src: {
			files: [
				'!node_modules/**',
				'tasks/**/*'
			],
			tasks: [
				'eslint'
			],
			options: {
				spawn: false
			}
		}
	};
};
