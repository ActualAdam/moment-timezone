"use strict";

var path = require('path'),
	exec = require('child_process').exec;

module.exports = function (grunt) {
	grunt.registerTask('data-mysql', '9. Transform tz data to MySQL format.', function (version) {
		version = version || 'latest';

    var src = path.resolve('temp/zic', version),
			dest  = path.resolve('data/mysql', version),
      mysqlUtil = path.resolve('tasks/mysql_tzinfo_to_sql'),
      done = this.async();

		grunt.file.mkdir(dest);

		exec(mysqlUtil + ' ' + src + ' >' + path.resolve(dest, version + '.sql'), function (err) {
			if (err) { throw err; }
			grunt.log.ok('Completed MySQL transform ' + version);
      done();
		});
	});
};
