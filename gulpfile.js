const { src, dest, watch, series } = require("gulp"),
  sass = require('gulp-sass')(require('sass')),
  rename = require("gulp-rename"),
  cache = require("gulp-cache"),
  imagemin = require("gulp-imagemin"),
  uglify = require("gulp-uglify-es").default,
  browserSync = require("browser-sync").create();

function style() {
  return src("./app/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("./app/css"))
    .pipe(browserSync.stream());
}

function uglifyJS() {
  return src(["./app/js/*.js", "!./app/js/*.min.js"])
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("./app/js"))
    .pipe(browserSync.stream());
}

function images() {
  return src("./app/images/*")
    .pipe(
      cache(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 75, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ]),
        { name: "images" }
      )
    )
    .pipe(dest("./dist/images"));
}

function clearCache() {
  return cache.clearAll();
}

function watching() {
  browserSync.init({
    server: {
      baseDir: "./app/",
    },
  });

  watch("./app/scss/**/*.scss", style);
  watch(["./app/js/*.js", "!./app/js/*.min.js"], uglifyJS);
  watch("./app/*html").on("change", browserSync.reload);
}

exports.style = style;
exports.images = images;
exports.clearCache = clearCache;
exports.default = watching;
exports.build = series(clearCache, images, () => {
  return src(["./app/*html", "./app/css/*.min.css", "./app/js/*.min.js"], {
    base: "./app",
  }).pipe(dest("./dist/"));
});
