/*
    -------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  ------------------------
    ----------  /01-udemy/  -------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  ----------
    ----------  /gulpfile.js  -----------------------------------
    -------------------------------------------------------------
*/

// ⚡ -----  Versión con módulos ES + exclusiones  -----


import gulp from "gulp";
import terser from "gulp-terser";
import cleanCSS from "gulp-clean-css";
import htmlmin from "gulp-htmlmin";
import { deleteAsync } from "del";



// 📌  -----  Carpetas/archivos a excluir en TODAS las tareas  -----
const EXCLUDES = [
    "!node_modules/**",
    "!dist/**",
    "!src/types/**",
    "!gulpfile.js",
    "!jsconfig.json",
];



// 🧹  -----  Limpiar carpeta dist  -----
export function clean() {

    return deleteAsync(["dist"]);

}



//  -----  Minificar JS sin cambiar el nombre  -----
export function minifyAllJs() {

    return gulp
        .src(["**/*.js", ...EXCLUDES], { base: "." })
        .pipe(terser())
        .pipe(gulp.dest("dist"));

}



//  -----  Minificar CSS sin cambiar el nombre  -----
export function minifyAllCss() {

    return gulp
        .src(["**/*.css", ...EXCLUDES], { base: "." })
        .pipe(cleanCSS())
        .pipe(gulp.dest("dist"));

}



//  -----  Minificar y copiar HTML  -----
export function minifyHtml() {

    return gulp
        .src(["**/*.html", ...EXCLUDES], { base: "." })
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest("dist"));

}



//  -----  Build de producción (limpia primero)  -----
export const build = gulp.series(
    clean,
    gulp.parallel(
        minifyAllJs,
        minifyAllCss,
        minifyHtml
    )

);



//  -----  Tarea por defecto  -----
export default build;
