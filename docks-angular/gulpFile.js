"use strict";
var typedocks = require('typedock')
var gulp = require('gulp')
var path = require("path")

gulp.task(`docks`, [], (cb) => {
    let td = new typedocks({
        outputDirectory: path.resolve(__dirname, `docks`),
        sourceDirectory: path.resolve(__dirname, `src`)
    })

    td.generate()
        .then(docs => {
            console.log(`docs`)
            return cb()
        })
        .catch(err => {
            console.log(`err`)
            return cb()
        })
})

gulp.task("default", [
    "docks"
], function () { });