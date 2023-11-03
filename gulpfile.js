import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import csso from "postcss-csso";
import rename from "gulp-rename";
import autoprefixer from "autoprefixer";
import squoosh from "gulp-libsquoosh";
import svgo from "gulp-svgmin";
import browser from "browser-sync";
import htmlmin from "gulp-htmlmin";
import terser from "gulp-terser";

// Styles

const styles = () => {
  return gulp
    .src("source/sass/style.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(browser.stream());
};

const copyStyles = () => {
  return gulp
    .src("source/sass/style.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(browser.stream());
};

// HTML

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};

// Scripts

const scripts = () => {
  return gulp.src("source/js/*.js").pipe(terser()).pipe(gulp.dest("build/js"));
};

// Images

const optimizeImages = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}")
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"));
};

export const copyImages = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}").pipe(gulp.dest("build/img"));
};

// WebP

export const createWebP = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}")
    .pipe(squoosh({ webp: {} }))
    .pipe(gulp.dest("build/img"));
};

// SVG

const svg = () => {
  return gulp
    .src(["source/img/icons/*.sgv", "!source/img/sprite/*.svg"])
    .pipe(svgo())
    .pipe(gulp.dest("build/img"));
};

const sprite = () => {
  gulp.src("source/img/sprite/*.svg")
  .pipe()
  .pipe(gulp.dest("build/img"));
};

// Copy

const copy = (done) => {
  gulp
    .src(["source/fonts/*.{woff2,woff}", "source/*.ico"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
  done();
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/*.html").on("change", browser.reload);
};

export default gulp.series(
  html,
  copyStyles,
  copyImages,
  scripts,
  server,
  watcher
);
