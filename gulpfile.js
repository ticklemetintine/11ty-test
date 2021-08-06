var gulp        = require("gulp"),
    less        = require("gulp-less"),
    concat      = require("gulp-concat"),
    uglify      = require("gulp-uglify"),
    cleanCSS    = require("gulp-cleancss"),
    maps        = require("gulp-sourcemaps"),
    cachebust   = require("gulp-cache-bust"),
    panini      = require("panini"),
    compress    = require("compression"),
    browserSync = require("browser-sync").create(),
    fs = require("fs");

var htmlhintJunitReporter = require("gulp-htmlhint-junit-reporter");
var htmlhint = require("gulp-htmlhint");
var eslint = require("gulp-eslint");

var htmlHintRules = {
    "tagname-lowercase": true,
    "attr-lowercase": true,
    "doctype-html5": true,
    "spec-char-escape": false,
    "doctype-first": false,
    "id-class-value": true,
    "style-disabled": false,
    "inline-style-disabled": true,
    "inline-script-disabled": false, // turn off inline script hint
    "space-tab-mixed-disabled": "space",
    "id-class-ad-disabled": true,
    "href-abs-or-rel": false,
    "attr-unsafe-chars": true,
    "head-script-disabled": false
};

gulp.task("htmlhint", function() {
    return gulp.src("./web/**/*.html")
        .pipe(htmlhint(htmlHintRules))
        .pipe(gulp.dest("target/reports/"))
        .pipe(htmlhint.reporter(htmlhintJunitReporter("target/reports/junit-htmlhint.xml")));
});

gulp.task("jshint", function() {
    return gulp.src([
        "./src/main/js/**/*.js",
        "!./src/main/js/min/*.js",
        "!./src/main/js/vendors/*.js",
        "!./src/main/js/scripts.js",
    ])
        .pipe(eslint({"configFile": "conf/eslintrc.json", "fix": true}))
        .pipe(eslint.results(results => {
            // Called once for all ESLint results.
            console.log(`Total Results: ${results.length}`);
            console.log(`Total Warnings: ${results.warningCount}`);
            console.log(`Total Errors: ${results.errorCount}`);
        }))
        .pipe(eslint.format())
        .pipe(gulp.dest("target/fixes"))
        .pipe(eslint.format("junit", fs.createWriteStream("target/reports/junit-jshint.xml")))
});

gulp.task("csshint", function() {
    return gulp.src("web/assets/css/**/*.css")
        .pipe(htmlhint())
        .pipe(htmlhint.reporter(htmlhintJunitReporter("target/reports/junit-csshint.xml")));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task("panini", function() {
    return gulp.src("./src/main/panini/pages/**/*.{html,hbs,handlebars}")
        .pipe(panini({
            root     : "./src/main/panini/pages",
            layouts  : "./src/main/panini/layouts",
            partials : "./src/main/panini/partials",
            helpers  : "./src/main/panini/helpers",
            data     : "./src/main/panini/data",
        }))
        .pipe(gulp.dest("./web/"));
});

gulp.task("paniniRefresh", function(done) {
    panini.refresh();
    done();
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task("styles", function() {
    return gulp.src("./src/main/less/all.less")
    .pipe(less())
    .pipe(cleanCSS({compatibility: "ie8"}))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("./web/web-resources/wealthbanking/css/banking/wealth-solutions/sustainable-investing/css"))
    .pipe(gulp.dest("./web/web-resources/privilegebanking/css/banking/wealth-solutions/sustainable-investing/css"))
    .pipe(gulp.dest("./web/web-resources/privilegereserve/css/banking/wealth-solutions/sustainable-investing/css"))
    .pipe(browserSync.stream());
});

gulp.task("stylesResponsive", function() {
    return gulp.src("./src/main/less/responsive.less")
    .pipe(less())
    .pipe(cleanCSS({compatibility: "ie8"}))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("./web/web-resources/wealthbanking/css/banking/wealth-solutions/sustainable-investing/css"))
    .pipe(gulp.dest("./web/web-resources/privilegebanking/css/banking/wealth-solutions/sustainable-investing/css"))
    .pipe(gulp.dest("./web/web-resources/privilegereserve/css/banking/wealth-solutions/sustainable-investing/css"))
    .pipe(browserSync.stream());
});

gulp.task("scriptsCommon", function() {
    return gulp.src([
        "./src/main/scripts/utils/*.js",
        "./src/main/scripts/components/*.js",
        "./src/main/scripts/scripts.js",
    ])
        .pipe(maps.init(""))
        .pipe(concat("scripts.min.js"))
        // .pipe(uglify())
        .pipe(maps.write("./"))
        .pipe(gulp.dest("./web/web-resources/wealthbanking/js/banking/wealth-solutions/sustainable-investing/js/min"))
        .pipe(gulp.dest("./web/web-resources/privilegebanking/js/banking/wealth-solutions/sustainable-investing/js/min"))
        .pipe(gulp.dest("./web/web-resources/privilegereserve/js/banking/wealth-solutions/sustainable-investing/js/min"))
        .pipe(browserSync.stream());
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// gulp.task("imageMin", function() {
//     return gulp.src([
//         "./src/main/images/**/*",
//         "!./src/main/images/articles/4-things-you-need/*",
//         "!./src/main/images/articles/advantages-you-enjoy-when-you-start-investing-from-a-young-age/*",
//     ])
//         .pipe(imagemin([
//             imagemin.mozjpeg({quality: 80, progressive: true}),
//             imagemin.optipng({optimizationLevel: 5}),
//             imagemin.svgo({
//                 plugins: [
//                     {removeViewBox: true},
//                     {cleanupIDs: false}
//                 ]
//             })
//         ]))
//         .pipe(gulp.dest("./web/personal/wealth/content-hub/assets/images"))
// });

// gulp.task("imageWebp", function() {
//     return gulp.src([
//         "./src/main/images/**/*.{jpg,png}",
//         "!./src/main/images/articles/4-things-you-need/*",
//         "!./src/main/images/articles/advantages-you-enjoy-when-you-start-investing-from-a-young-age/*",
//     ])
//         .pipe(imagemin([
//             webp({
//                 quality: 80
//             })
//         ]))
//         .pipe(extReplace(".webp"))
//         .pipe(gulp.dest("./web/personal/wealth/content-hub/assets/images"))
// });

////////////////////////////////////////////////////////////////////////////////////////////////////
// gulp.task("clean", function() {
//     return del([
//         "./web/personal/wealth/content-hub/assets/images",
//         "./web/personal/wealth/content-hub/css",
//         "./web/personal/wealth/content-hub/insure",
//         "./web/personal/wealth/content-hub/invest",
//         "./web/personal/wealth/content-hub/plan",
//         "./web/personal/wealth/content-hub/*.html"]);
// });

gulp.task("cacheBust", function() {
    return gulp.src([
        "./web/**/*.html",
        "!./web/META-INF/**",
        "!./web/WEB-INF/**"    
    ])
        .pipe(cachebust({
            type: "timestamp"
        }))
        .pipe(gulp.dest("./web"));
});

gulp.task("browserSync", function(done) {
    browserSync.init({
        files: "./web/wealthbanking/banking/wealth-solutions/sustainable-investing/index.html",
        server: "./web",
        middleware: function(req,res,next){
            var gzip = compress();
            gzip(req,res,next);
        }
    });
    done();
});

gulp.task("watch", function(done){
    gulp.watch("./src/main/panini/**/*.{html,hbs,handlebars}", gulp.series(["paniniRefresh", "panini"]));
    gulp.watch("./src/main/less/**/*.less", gulp.series("styles", "stylesResponsive"));
    gulp.watch([
        "./src/main/scripts/utils/*.js",
        "./src/main/scripts/components/*.js",
        "./src/main/scripts/scripts.js",
    ], gulp.series("scriptsCommon"));

    done();
});

/////////////////////////////////////////////////////////////////////
// build
/////////////////////////////////////////////////////////////////////
gulp.task("development", gulp.series([
    gulp.parallel(["panini", "styles", "stylesResponsive", "scriptsCommon"]),
    "browserSync",
    "watch",
]));

gulp.task("default", gulp.series([
    gulp.parallel(["panini", "styles", "stylesResponsive", "scriptsCommon"]),
]));

gulp.task("build", gulp.series([
    gulp.parallel(["panini", "styles", "stylesResponsive", "scriptsCommon"]),
    "cacheBust",
]));

gulp.task("hints", gulp.series(["htmlhint", "jshint", "csshint"]));

// gulp development (development)
// gulp hints       (lints)
// gulp build       (production final)