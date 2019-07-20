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

var connect = require('connect');
// var serveStatic = require('serve-static');
var openInEditor = require('open-in-editor-connect');

gulp.task('styles', function() {
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
  autoprefixer()
 ]))
 .on('error', (error) => console.log(error.toString()))
 .pipe(sourcemaps.write('./maps'))
 .pipe(gulp.dest('../'+settings.localDirectory))
});

gulp.task('sync', function () {
 return gulp.src('../'+settings.localDirectory+'style.css')
		.pipe(sftp({
   host: 'sidewaysdesign.com',
   user: 'zippy',
   pass: 'Side44Side',
   remotePath: '/home/zippy/sidewaysdesign.com/partners/yellow/css/'
		}));
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
  proxy: settings.urlToPreview,

  // port: 8080,

  // Tunnel the Browsersync server through a random Public URL
  // tunnel: true,

  // Attempt to use the URL "http://my-private-site.localtunnel.me"
  // tunnel: "ppress",

  // Inject CSS changes
  injectChanges: true

 });
 // browserSync.init({
 //  notify: false,
 //  proxy: settings.urlToPreview,
 //  ghostMode: false
 // });

 gulp.watch('../**/*.php', function() {
  browserSync.reload();
 });
 gulp.watch(['./css/*.css', './css/modules/*.css', './css/base/*.css'], ['waitForStyles']);
 gulp.watch(['./js/modules/*.js', './js/*.js'], ['waitForScripts']);
});

gulp.task('waitForStyles', ['styles','sync'], function() {
 console.log('../'+settings.localDirectory+'style.css');
 // return gulp.src('../style.css')
 return gulp.src('../'+settings.localDirectory+'style.css')
 .pipe(browserSync.stream());
});

gulp.task('waitForScripts', ['scripts'], function() {
 browserSync.reload();
});

var app = connect();
app.use(openInEditor('.', {
 editor: { name: 'atom' }
}));
// // app.use(serveStatic('.'));
app.listen(3001);
