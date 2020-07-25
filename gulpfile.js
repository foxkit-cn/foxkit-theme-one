'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const header = require('gulp-header');
const rename = require('gulp-rename');

// css 文件的横幅
const banner = "/*! <%= data.title %> <%= data.version %> | <%= data.copyright %> | <%= data.license %> License */\n";

// 任务：编译所有 less 文件
function compile(cb) {
  gulp.src('less/theme.less', {base: __dirname})
    .pipe(less({compress: true, relativeUrls: true}))
    .pipe(header(banner, {data: require('./composer.json')}))
    .pipe(rename(file => {
      // 编译的 less 文件应存储在 css/ 文件夹中，而不是 less/ 文件夹中
      file.dirname = file.dirname.replace('less', 'css');
    }))
    .pipe(gulp.dest(__dirname));
  cb();
}

exports.default = gulp.series(compile);
