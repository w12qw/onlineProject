/* 
    gulp-scss
    gulp-minify-css
    gulp-rename
*/

const gulp = require("gulp");
const scss = require("gulp-sass");
const minify = require("gulp-minify-css");
const rename = require("gulp-rename");
const minifyCSS = require("gulp-minify-css");

/* 将scss文件进行编译压缩 */
gulp.task("scs",function(){
    return gulp.src("css/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index-min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

/* 批量处理 */
gulp.task("scsAll",function(){
    return gulp.src("css/*.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

/* js的压缩 */
gulp.task("scripts",function(){
    return gulp.src(["js/*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

/* 处理HTML */
gulp.task("copy-html",function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
})

/* 处理静态数据 */
gulp.task("data",function(){
    return gulp.src(["data/*.json","!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

/* 处理图片 */
gulp.task("images",function(){
    return gulp.src("img/**/*")
    .pipe(gulp.dest("dist/img"))
    .pipe(connect.reload());
})

/* 一次性处理多个任务 */
/* 4版本用gulp.parallel 或者gulp.series
   3版本的第二个参数可以写成数组
*/
gulp.task("build",gulp.parallel("scs","scripts","scsAll","images","data","copy-html",function(){
    console.log("执行完毕");
}))

/* 实行监听
4.0版本watch第二个参数不是一个数组了  可以使用gulp.series或者gulp.parallel
*/
gulp.task("watch",function(){
    gulp.watch("css/index.scss",gulp.series("scs")),
    gulp.watch("css/*.scss",gulp.series("scsAll")),
    gulp.watch(["js/*.js","!gulpfile.js"],gulp.series("scripts")),
    gulp.watch("*.html",gulp.series("copy-html")),
    gulp.watch(["data/*.json","!package.json"],gulp.series("data")),
    gulp.watch("img/**/*",gulp.series("images"))
})

/* 启动一个服务器 */
const connect = require("gulp-connect");
gulp.task("server",function(){
    connect.server({
        root : "dist",
        port : "8887",
        livereload : true
    })
})

/* 启动一个默认的任务 同时启动监听和服务器 */
gulp.task("default",gulp.parallel("watch","server"));