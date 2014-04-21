/*global require*/

(function () {
    'use strict';

    var gulp = require('gulp'),
        jshint = require('gulp-jshint'),
        mocha = require('gulp-mocha'),
        istanbul = require('gulp-istanbul'),
        clean = require('gulp-clean'),
        exec = require('gulp-exec'),
        plato = require('gulp-plato');

    gulp.task('lint', function () {
        gulp.src(['./lib/*', './test/*', './gulpfile.js'])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'));
    });

    gulp.task('istanbul', function (callback) {
        gulp.src('./lib/*.js')
            .pipe(istanbul())
            .on('end', callback);
    });

    gulp.task('test', function () {
        gulp.src('./test/*.js').pipe(mocha({
            reporter: 'spec',
            bail: true,
            ui: 'bdd'
        }));
    });

    gulp.task('test-coverage', function () {
        gulp.run('istanbul', function () {
            gulp.src('./test/*.js')
                .pipe(mocha())
                .pipe(istanbul.writeReports())
                .pipe(exec('echo Coverage has been calculated. See coverage directory for details.'));
        });
    });

    gulp.task('code-report', function () {
        gulp.src('./lib/*.js')
            .pipe(plato('./report'))
            .pipe(exec('echo The code report has been generated. See report directory for details.'));
    });

    gulp.task('reports', function () {
        gulp.run('test-coverage', 'code-report');
    });

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
        gulp.watch(['./lib/*', './test/*'], function () {
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