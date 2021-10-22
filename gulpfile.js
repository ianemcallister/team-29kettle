/*
*   GULP FILE
*/

//  NOTIFY PROGRESS
//  DEFINE DEPENDENCIES
var gulp 	          = require('gulp');                  
var less            = require('gulp-less');				
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var rename          = require('gulp-rename');
var cleanCSS        = require('gulp-clean-css');
var del             = require('del');
var ngAnnotate      = require('gulp-ng-annotate');
//var babel           = require('gulp-babel');

//  LOCAL VARIABLES
var paths = {
    styles: {
      src: [
        'public/styles/**/*.less', 
        'public/styles/**/*.css',
        'node_modules/angularjs-datepicker/dist/angular-datepicker.css'
      ],
      dest: 'dist/assets/styles/'
    },
    libraries: {
      src: [
        'node_modules/angular/angular.js',
        'node_modules/angular-route/angular-route.js',
        'node_modules/angular-sanitize/angular-sanitize.js',
        'node_modules/angularjs-datepicker/dist/angular-datepicker.js',
      ],
      dest: 'dist/assets/scripts/'
    },
    scripts: {
      src: 'public/scripts/**/*.js',
      dest: 'dist/assets/scripts/'
    },
    views: {
        src: "public/views/**/*.htm",
        dest: "dist/assets/views"
    },
    index: {
        src: 'public/**/index.html',
        dest: 'dist/'
    }
  };

/*
*   CLEAN FUNCTION
*/
function clean() {
    return del([ 'dist' ]);
};

/*
*   STYLES FUNCTION
*/
function styles() {
    return gulp.src(paths.styles.src)
      .pipe(less())
      .pipe(cleanCSS())
      // pass in options to the stream
      .pipe(concat('main.min.css'))
      /*.pipe(rename({
        basename: 'main',
        suffix: '.min'
      }))*/
      .pipe(gulp.dest(paths.styles.dest));
};

/*
*   SCRIPTS FUNCTION
*/
function lib() {
  return gulp.src(paths.libraries.src, { sourcemaps: true })
      .pipe(ngAnnotate())
      .pipe(uglify())  
      .pipe(concat('lib.min.js'))
      .pipe(gulp.dest(paths.libraries.dest));
}


/*
*   SCRIPTS FUNCTION
*/
function scripts() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
//      .pipe(babel())
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(concat('main.min.js'))
      .pipe(gulp.dest(paths.scripts.dest));
};

/*
*   VIEWS FUNCTION
*/
function views() {
    return gulp.src(paths.views.src)
        .pipe(gulp.dest(paths.views.dest));
};


/*
*   INDEX FUNCTION
*/
function index() {
    return gulp.src(paths.index.src)
        .pipe(gulp.dest(paths.index.dest));
};


/*
*   WATCH FUNCTION
*/
function watch() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.views.src, views);
    gulp.watch(paths.index.src, index);
}

//  EXECUTE
var build = gulp.series(clean, gulp.parallel(styles, lib, scripts, views, index));

//  EXPORT
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;