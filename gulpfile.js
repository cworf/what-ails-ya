const gulp = require('gulp'),
	del = require('del'),
	lib = require('bower-files') ({
		  "overrides":{
		    "bootstrap" : {
		      "main": [
		        "less/bootstrap.less",
		        "dist/css/bootstrap.css",
		        "dist/js/bootstrap.js"
		      ]
		    }
		  }
	  }),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	babelify = require('babelify')
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	browserSync = require('browser-sync').create();



gulp.task('clean', function(){
	del(['tmp', 'dist']);
});

gulp.task('copyHTML', function(){
	gulp.src('dev/index.html')
		.pipe(gulp.dest('./dist'));
});
gulp.task('copyCSS', ['copyHTML'], function(){
	gulp.src('dev/css/master.css')
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('bowerCSS', ['copyCSS'], function () {
	gulp.src(lib.ext('css').files) //grab css
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('bowerJS', ['bowerCSS'], function(){
	gulp.src(lib.ext('js').files) //grab js
	.pipe(concat('vendor.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));
});


//optomize output for all browsers (concat, browserify, babelify, then minify)

gulp.task('concat', ['bowerJS'], function(){
	gulp.src(['dev/js/interface.js', 'dev/js/logic.js'])
		.pipe(concat('concat.js'))
		.pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concat'], function() {
	browserify({ entries: ['./tmp/concat.js']})
		.transform(babelify.configure({
			presets: ["es2015"]
		}))
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./dist/js'))
});

gulp.task('minify', ['jsBrowserify'], function() {
        return gulp.src('/js/app.js')
          .pipe(uglify())
          .pipe(gulp.dest('./build/js'));
});

gulp.task('default', function(){
	gulp.start('minify');
	browserSync.reload();
})

gulp.task('serve', function() {
    browserSync.init({
    	server: {
        	baseDir: "./dist",
            index: "index.html"
        }
	});

    gulp.watch(['dev/*/*.*', 'dev/index.html'], ['default']);

});
