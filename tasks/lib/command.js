'use strict';

module.exports = function () {
	var internals = [];

	return {
		append: function (key, value) {
			internals.push(key);
			if (value) {
				internals.push(value);
			}
		},
		toString: function () {
			return internals.join(' ');
		}
	};
};

