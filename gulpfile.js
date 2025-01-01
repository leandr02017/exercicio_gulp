const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");

function compilaJavaScript() {
  return gulp
    .src("./source/scripts/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/scripts"));
}

function compilaImage() {
  return gulp
    .src("./source/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./build/images"));
}

function compilaSass() {
  return gulp
    .src("./source/style/main.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./build/style"));
}

exports.javaScript = compilaJavaScript;

exports.default = function () {
  gulp.watch(
    "./source/styles/*.scss",
    { ignoreInitial: false },
    gulp.series(compilaSass)
  );
  gulp.watch(
    "./source/styles/*.js",
    { ignoreInitial: false },
    gulp.series(compilaJavaScript)
  );
  gulp.watch(
    "./source/styles/*",
    { ignoreInitial: false },
    gulp.series(compilaImage)
  );
};
