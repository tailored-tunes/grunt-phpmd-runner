'use strict';

module.exports = function () {
	return {
		tatu: {
			'pre-commit': 'eslint',
			'post-merge': {
				command: 'npm install'
			}
		}
	};
};
