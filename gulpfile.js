'user strict';

var gulp = require('gulp');
var connect = require('gulp-connect'); // runs a local dev server
var open = require('gulp-open'); // open a url in a web broser)
var browserify = require('browserify'); // bundles js
var reactify = require('reactify');  // transform react jsx to js
var source = require('vinyl-source-stream');  // user conventional text streams for gulp
var concat = require('gulp-concat');
var lint = require('gulp-eslint');

var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    mainJs: './src/main.js',
    dist: './dist',
    images: './src/images/*',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ]
  }
}

// start a local development server
gulp.task('connect', function(){
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true,
  })
});

gulp.task('open', ['connect'], function(){
  gulp.src('dist/index.html')
      .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('lint', function() {
 return gulp.src(config.paths.js)
            .pipe(lint({configFile: 'eslint.config.json'}))
            .pipe(lint.format());
});

gulp.task('html', function(){
  gulp.src(config.paths.html)
      .pipe(gulp.dest(config.paths.dist))
      .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
  gulp.watch(config.paths.css, ['css']);
})

gulp.task('css', function(){
  gulp.src(config.paths.css)
      .pipe(concat('bundle.css'))
      .pipe(gulp.dest(config.paths.dist + '/css')); 
})

gulp.task('images', function(){
  gulp.src(config.paths.images)
      .pipe(gulp.dest(config.paths.dist + '/images'))
      .pipe(connect.reload());

  // publish favicon
  gulp.src('./src/favicon.ico')
      .pipe(gulp.dest(config.paths.dist));
})

gulp.task('js', function() {
  browserify(config.paths.mainJs)
      .transform(reactify)
      .bundle()
      .on('error', console.error.bind(console))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(config.paths.dist + '/scripts'))
      .pipe(connect.reload());
})

gulp.task('default', ['html', 'open', 'watch', 'js', 'css', 'lint', 'images'], function(){});
