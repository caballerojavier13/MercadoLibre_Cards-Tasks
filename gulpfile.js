var gulp = require('gulp');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var rm = require( 'gulp-rm' );
var jshint = require('gulp-jshint');

gulp.task('default', ['fonts', 'styles', 'scripts', 'images', 'htmls'], function() {});

var htmls = [
'index.html'
];

var scripts = [
//'bower_components/jquery/dist/jquery.min.js',
'bower_components/materialize/dist/js/materialize.min.js',
'bower_components/linkifyjs/linkify.min.js',
'bower_components/linkifyjs/linkify-jquery.min.js',
'bower_components/moment/min/moment.m',
'src/js/**/*'
];

var styles = [
'bower_components/materialize/dist/css/materialize.min.css',
'src/css/**/*'
]

var fonts = [
'src/fonts/**/*',
'bower_components/materialize/dist/fonts/**/*'
];

var images = [
'src/images/**/*',
];

gulp.task('clean', function () {
	return gulp.src('./dist/**/*')
	.pipe( rm());
});

gulp.task('fonts', function() {
	gulp.src(fonts)
	.pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('images', function() {
	gulp.src(images)
	.pipe(gulp.dest('./dist/images/'));
});

gulp.task('scripts', function() {
	gulp.src(scripts)
	.pipe(gulp.dest('./dist/js/'));
});


gulp.task('styles', function() {
	gulp.src(styles)
	.pipe(concat('style.css'))
	.pipe(autoprefix('last 2 versions'))
	.pipe(minifyCSS())
	.pipe(gulp.dest('./dist/css/'));
});

gulp.task('htmls', function() {
	gulp.src(htmls)
	.pipe(gulp.dest('./dist/'));
});

gulp.task('hint', function() {
	return gulp.src('./src/js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('gulp-jshint-html-reporter', {
		filename: __dirname + '/jshint-output.html',
		createMissingFolders : false  
	}));
});

//var watcher = gulp.watch('src/css/**/*', ['fonts', 'styles']);

//var watcher = gulp.watch('src/js/**/*', ['scripts']);

//var watcher = gulp.watch('./src/*.*', ['clean', 'fonts', 'styles', 'scripts', 'htmls']);

//var watcher = gulp.watch('./index.html', ['clean', 'fonts', 'styles', 'scripts', 'htmls']);

/*watcher.on('change', function(event) {
	console.log('File ' + event.path + ' was ' + event.type);
});*/
