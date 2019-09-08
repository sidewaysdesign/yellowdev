var gulp = require('gulp'),
settings = require('./settings'),
webpack = require('webpack'),
browserSync = require('browser-sync').create(),
postcss = require('gulp-postcss'),
rgba = require('postcss-hexrgba'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
colorFunctions = require('postcss-color-function'),
resolveMath = require('postcss-math'),
extend = require('postcss-extend');
atRoot = require('postcss-atroot'),
sourcemaps = require('gulp-sourcemaps');
// includeMedia = require('include-media');
const message = require('gulp-message');
const sftp = require('gulp-sftp');
const postcssPresetEnv = require('postcss-preset-env');


// const server = require('gulp-webserver');

var connect = require('connect');
// var serveStatic = require('serve-static');
var openInEditor = require('open-in-editor-connect');

gulp.task('stylesx', function() {
 message.warn('processing styles');
 return gulp.src('./css/style.css')
 .pipe(sourcemaps.init())
 .pipe(postcss([
  cssImport,
  mixins,
  cssvars,
  extend,
  resolveMath,
  nested,
  atRoot,
  rgba,
  colorFunctions,
  // postcssPresetEnv(),
  autoprefixer()
 ]))
 .on('error', (error) => console.log(error.toString()))
 .pipe(sourcemaps.write('./maps'))
 .pipe(gulp.dest('../'+settings.localDirectory))
 .pipe(browserSync.stream({match: '**/*.css'}))
 // .pipe(sftp({
 //  host: 'sidewaysdesign.com',
 //  user: 'zippy',
 //  pass: 'Side44Side',
 //  remotePath: '/home/zippy/sidewaysdesign.com/partners/yellow/css/'
 // }))
});

gulp.task('default', ['server']);
gulp.task('server', function() {
 gulp.src('../')	// <-- your app folder
 .pipe(server({
  livereload: true,
  open: true,
  port: 6000	// set a port to avoid conflicts with other local apps
 }));
});


gulp.task('sync', function () {
 return gulp.src('../'+settings.localDirectory+'style.css')
 .pipe(sftp({
  host: 'sidewaysdesign.com',
  user: 'zippy',
  pass: 'Side44Side',
  remotePath: '/home/zippy/sidewaysdesign.com/partners/yellow/'
 }))
 ;
});

gulp.task('scripts', function(callback) {
 webpack(require('./webpack.config.js'), function(err, stats) {
  if (err) { console.log(err.toString()); }
  console.log(stats.toString());
  callback();
 });
});

gulp.task('watch', function() {
 var files = [
  '**/*.php',
  '**/*.{png,jpg,gif}'
 ];
 browserSync.init(files, {

  // Read here http://www.browsersync.io/docs/options/
  watch: true,
  injectChanges: true,
  server: {
   baseDir: "../"
  },
  notify: false,
  ghostMode: false,

 });

 gulp.watch(['./css/*.css', './css/modules/*.css', './css/base/*.css'], ['waitForStyles']);
 gulp.watch(['./js/modules/*.js', './js/*.js'], ['waitForScripts']);
});

gulp.task('waitForStyles', ['stylesx'], function() {
 return gulp.src('../'+settings.localDirectory+'style.css');
});

gulp.watch("../*.css").on('change', browserSync.reload);
