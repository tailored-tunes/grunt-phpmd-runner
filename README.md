# grunt-phpmd-runner

> A phpmd runner that works

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-phpmd-runner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-phpmd-runner');
```

## The "phpmd-runner" task

### Overview
In your project's Gruntfile, add a section named `phpmd-runner` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'phpmd-runner': {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
});
```

phpmd currently doesn't support individual files to deal with.
`grunt-phpmd-runner` bridges that gap... sort of.

### Example configuration

```js
grunt.initConfig({
  'phpmd-runner': {
    options: {
      phpmd: 'vendor/bin/phpmd',
      reportFormat: 'xml',
      reportFile: 'reports/md.xml'
      rulesets: [
        'cleancode',
        'codesize',
        'controversial',
        'design',
        'naming',
        'unusedcode'
      ],
      strict: true
    },
    files: '**/*.php'
  }
});
```

### A watch config that runs phpmd on the files that have changed
```js
grunt.initConfig({
  watch: {
    php: {
      files: '**/*.php',
      tasks: [
        'phpmd-runner'
      ],
      options: {
        spawn: false
      }
    }
  },
  'phpmd-runner': {
    options: {
      phpmd: 'vendor/bin/phpmd'
    },
    files: '**.*.php'
  }
});

grunt.event.on('watch', function (action, filepath) {
  if (grunt.file.isMatch(grunt.config('watch.php.files'), filepath)) {
    grunt.config('phpmd-runner.files', [filepath]);
  }
});
```

### Options

The options more or less mimic `phpmd`'s configuration parameters.

### options.phpmd
Type: `string`

The location of the `phpmd` binary

### options.reportFormat
Type: `string`

Valid values are: `xml`, `text`, `html`

### options.reportFile
Type: `string`

Where you want the report to be saved

### options.rulesets
Type: `Array`

A collection of rulesets to apply.

### options.minimumPriority
Type: `string`

Equivalent of:
`--minimumpriority: rule priority threshold; rules with lower priority than this will not be used`

### options.suffixes
Type: `string` or `Array`

> You can use an array version, it will be converted to the comma separated string phpmd needs

Equivalent of:
`--suffixes: comma-separated string of valid source code filename extensions`

```js
options: {
  suffixes: [
    '.php',
    '.inc'
  ]
}
```

### options.exclude
Type: `string` or `Array`

> You can use an array version, it will be converted to the comma separated string phpmd needs

Equivalent of:
`--exclude: comma-separated string of patterns that are used to ignore directories`


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 0.1.4 - Fixed proper logging and quitting on error
* 0.1.3 - added watch config
* 0.1.2 - no duplicate output
* 0.1.0 - basic functionality
