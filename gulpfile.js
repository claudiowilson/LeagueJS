/*global require*/

(function () {
	'use strict';

	const gulp = require('gulp'),
		jshint = require('gulp-jshint'),
		mocha = require('gulp-mocha'),
		istanbul = require('gulp-istanbul'),
		isparta = require('isparta'),
		clean = require('gulp-clean'),
		exec = require('gulp-exec'),
		plato = require('plato');

	gulp.task('lint', function () {
		gulp.src(['./lib/**/*', './test/**/*.test.js', './gulpfile.js'])
			.pipe(jshint('.jshintrc'))
			.pipe(jshint.reporter('default'));
	});

	gulp.task('istanbul', function () {
		return gulp.src(['./lib/**/*.js'])
			.pipe(istanbul({
				instrumenter: isparta.Instrumenter,
				includeUntested: true
			}))
			.pipe(istanbul.hookRequire());
	});

	gulp.task('test', function () {
		gulp.src('./test/**/*.test.js').pipe(mocha({
			reporter: 'spec',
			bail: false,
			ui: 'bdd'
		}));
	});

	// TODO: currently (2017/28/25) broken for es6 on node 5+ see https://github.com/SBoudrias/gulp-istanbul/issues/100
	gulp.task('test-coverage', ['istanbul'], function () {
		return gulp.src('./test/**/*.test.js')
			.pipe(mocha({
				reporter: 'dot',
				bail: false,
				ui: 'bdd'
			}))
			.pipe(istanbul.writeReports())
			.pipe(exec('echo Coverage has been calculated. See coverage directory for details.'));
	});

	gulp.task('code-report', function () {
		return plato.inspect('./lib/**/*.js', './report', {}, () => [
			exec('echo The code report has been generated. See report directory for details.')
		]);
	});

	gulp.task('reports', ['test-coverage', 'code-report']);

	gulp.task('clean-reports', function () {
		gulp.src(['./coverage', './report'], {
			read: false
		})
			.pipe(clean({
				force: true
			}));
		gulp.src('').pipe(exec('echo Coverage ^& Report directories has been removed'));
	});

	gulp.task('dev', function () {
		gulp.run('lint', 'test');
		gulp.watch(['./lib/**/*', './test/**/*'], function () {
			gulp.run('lint', 'test');
		});
	});

	// gulp.task('prod', function () {
	//     if (gulp.env.major) {
	//         gulp.run('lint', 'test');
	//         gulp.src('./package.json')
	//             .pipe(mversion('major'))
	//             .pipe(gulp.dest('./'));
	//     } else if (gulp.env.minor) {
	//         gulp.run('lint', 'test');
	//         gulp.src('./package.json')
	//             .pipe(mversion('minor'))
	//             .pipe(gulp.dest('./'));
	//     } else if (gulp.env.patch) {
	//         gulp.run('lint', 'test');
	//         gulp.src('./package.json')
	//             .pipe(mversion('patch'))
	//             .pipe(gulp.dest('./'));
	//     }
	// });
}());