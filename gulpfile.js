var helen = require('gulp')

// 定义拷贝
function copyIndex(){
    return helen.src('./src/index.html').pipe(helen.dest('./dist/'))
}
function copyHtml(){
    return helen.src('./src/html/**/*.html').pipe(helen.dest('./dist/html/'))
}
function copyImgs(){
    return helen.src('./src/resource/imgs/**/*.{jpg,gif,png,jpeg}').pipe(helen.dest('./dist/resource/imgs/'))
}
helen.task('copyImg',copyImgs)
function copyLib(){
    return helen.src('./src/lib/**').pipe(helen.dest('./dist/lib/'))
}
helen.task('copyLib',copyLib)
// 拷贝合并
var copyAll = helen.parallel(copyIndex,copyHtml,copyImgs)
// 拷贝php
function copyPhp(){
    return helen.src('./src/php/**/*.php').pipe(helen.dest('./dist/php/'))
}


// 编译sass
var sass = require('gulp-sass')
function sass2css(){
    return helen.src('./src/style/**/*.scss').pipe(sass({outputStyle:'expanded'})).pipe(helen.dest('./dist/style/'))
}

// 连接压缩JS
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
function cartjs (){
    return helen.src('./src/script/cart/**/*.js').pipe(concat('cart.js')).pipe(uglify()).pipe(helen.dest('./dist/script/cart/'))
}
function registerjs (){
    return helen.src('./src/script/register/**/*.js').pipe(concat('register.js')).pipe(uglify()).pipe(helen.dest('./dist/script/register/'))
}
function goodsjs (){
    return helen.src('./src/script/goods/**/*.js').pipe(concat('goods.js')).pipe(uglify()).pipe(helen.dest('./dist/script/goods/'))
}
function detailsjs (){
    return helen.src('./src/script/details/**/*.js').pipe(concat('details.js')).pipe(uglify()).pipe(helen.dest('./dist/script/details/'))
}
function homejs (){
    return helen.src('./src/script/home/**/*.js').pipe(concat('index.js')).pipe(uglify()).pipe(helen.dest('./dist/script/home/'))
}
function loginjs (){
    return helen.src('./src/script/login/**/*.js').pipe(concat('login.js')).pipe(uglify()).pipe(helen.dest('./dist/script/login/'))
}
// 连接压缩JS合并
var jsAll = helen.parallel(cartjs,detailsjs,homejs,loginjs,registerjs,goodsjs) 

// 生成精灵图
var smith = require('gulp.spritesmith')
function sprite(){
    return helen.src('./src/resource/icons/**/*.png').pipe(smith({imgName:'sprite.png',cssName:'sprite.css'})).pipe(helen.dest('./dist/resource/icons/'))
}



// gulp监听改变
function watch(){
    helen.watch('./src/index.html',copyIndex)
    helen.watch('./src/html/**/*.html',copyHtml)
    helen.watch('./src/resource/imgs/**/*.{jpg,gif,png,jpeg}',copyImgs)
    helen.watch('./src/style/**/*.scss',sass2css)
    helen.watch('./src/script/cart/**/*.js',cartjs)
    helen.watch('./src/script/details/**/*.js',detailsjs)
    helen.watch('./src/script/home/**/*.js',homejs)
    helen.watch('./src/script/login/**/*.js',loginjs)
    helen.watch('./src/script/register/**/*.js',registerjs)
    helen.watch('./src/script/goods/**/*.js',goodsjs)
    helen.watch('./src/resource/icons/**/*.png',sprite)
    helen.watch('./src/lib/**',copyLib)
    helen.watch('./src/php/**/*.php',copyPhp)
}
helen.task('watch',watch)