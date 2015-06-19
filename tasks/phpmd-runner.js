'use strict';

var _ = require('lodash'),
	Command = require('./lib/command'),
	extendPlugin = require('extend-grunt-plugin');

module.exports = function (grunt) {

	grunt.registerMultiTask('phpmd-runner', 'A phpmd runner that works', function () {
		var options = this.options({
				phpmd: 'phpmd',
				reportFormat: 'text',
				rulesets: [
					'cleancode',
					'codesize',
					'controversial',
					'design',
					'naming',
					'unusedcode'
				]
			}),
			workFiles = [],
			addValueToCommand = function (cmd, opts, optsKey, phpmdSetting) {
				var val = '';

				if (opts.hasOwnProperty(optsKey)) {
					val = opts[optsKey];

					if (_.isArray(opts[optsKey])) {
						val = opts[optsKey].join(',');
					}

					cmd.append(phpmdSetting, val || '');
				}
			},
			addFlagToCommand = function (cmd, opts, flag, flagValue) {
				if (opts.hasOwnProperty(flag) && flag === true) {
					cmd.append(flagValue);
				}
			},
			command = function (opts, files) {
				var cmd = new Command(),
					toExecute;

				cmd.append(opts.phpmd);
				cmd.append(files.join(','));
				cmd.append(opts.reportFormat);
				cmd.append(opts.rulesets.join(','));
				addValueToCommand(cmd, opts, 'minimumPriority', '--minimumpriority');
				addValueToCommand(cmd, opts, 'reportFile', '--reportfile');
				addValueToCommand(cmd, opts, 'suffixes', '--suffixes');
				addValueToCommand(cmd, opts, 'exclude', '--exclude');
				addFlagToCommand(cmd, opts, 'strict', '--strict');

				_.forEach(opts.extraParameters, function (extraParam) {
					cmd.append(extraParam);
				});

				toExecute = cmd.toString();
				return toExecute;
			},
			log = function (error, stdout, stderr, cb) {
				if (error) {
					grunt.log.error(stdout);
					throw grunt.util.error('Error executing phpmd', stdout);
				} else {
					grunt.log.ok(stdout);
				}
				return cb();
			},
			opt = {};

		this.files.forEach(function (target) {

			target.src.forEach(function (fpath) {
				workFiles.push(fpath);
			});

		});

		if (!_.isEmpty(workFiles)) {
			opt['shell.phpmd-runner'] = {
				options: {
					callback: log,
					stderr: false,
					stdout: false
				},
				command: command(options, workFiles)
			};

			extendPlugin(grunt, require('grunt-shell/tasks/shell'), opt);
			grunt.task.run('shell:phpmd-runner');

		} else {
			grunt.log.warn('No files matched the pattern');
		}

	});

};
