const gulp = require('gulp');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const coffee = require('gulp-coffee');
const data = require('gulp-data');
const concat = require('gulp-concat');
const spritesmith = require('gulp.spritesmith');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const fs = require('fs');

gulp.task('serve', ['pug', 'stylus', 'coffee', 'copy'], () => {
	browserSync.init({
			server: {
				baseDir: "./build/"
			}
	});


	gulp.watch('src/assets/', ['copy']);
	gulp.watch('src/**/*.styl', ['stylus']);
	gulp.watch('src/**/*.pug', ['pug']);
	gulp.watch('src/data/*.json', ['pug', 'stylus']);
	//gulp.watch('srs/assets/img/icon/*.*', ['sprite']);
	gulp.watch('src/**/*.coffee', ['coffee']);
	gulp.watch('build/**/*.*').on('change', browserSync.reload);
});


// PUG
gulp.task('pug', () => {
	return gulp.src('src/*.pug')
	.pipe(data( ()=> {
		return JSON.parse(fs.readFileSync('./src/data/data.json'));
	}))
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('build'));
});

// STYLUS
gulp.task('stylus', () => {
	return gulp.src('src/assets/*.styl')
	.pipe(stylus())
	.pipe(autoprefixer())
	.pipe(csso())
	.pipe(gulp.dest('build/css/'));
});

// COFFEE
gulp.task('coffee', () => {
	return gulp.src('src/**/*.coffee')
	.pipe(coffee())
	.pipe(babel())
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('build/js/'));
});

// COPY
gulp.task('copy', () => {
	gulp.src('src/assets/font/**/*')
		.pipe(gulp.dest('build/font'));
	gulp.src('src/assets/img/**/*')
		.pipe(gulp.dest('build/img'));
	gulp.src('src/assets/vendor/**/*')
		.pipe(gulp.dest('build/vendor'));
	gulp.src('src/assets/server-file/**')
		.pipe(gulp.dest('build'));
});

// SPRITE

gulp.task('sprite', () => {
	var spriteData = gulp.src('src/assets/img/icon/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.css'
	}));
	return spriteData.pipe(gulp.dest('build/vendor/sprite'));
});

gulp.task('default', ['serve']);