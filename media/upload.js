// https://www.npmjs.com/package/jquery-file-upload-middleware
// https://github.com/aguidrevitch/jquery-file-upload-middleware/tree/master/examples
var express = require('express'),
    http = require('http'),
    upload = require('jquery-file-upload-middleware');

var swig = require('swig');

// configuration
var dirs = require('../config/config').directors;
var resizeConf = require('../config/config').resizeVersion;

module.exports = function (app){

    // set template engine
    app.engine('html', swig.renderFile);
    swig.setDefaults({
        cache: false   // default 'memory'
    });

    // jquery-file-upload helper
    app.use('/upload/default', function (req, res, next) {
        upload.fileHandler({
            tmpDir: dirs.temp,
            uploadDir: __dirname + dirs.default,
            uploadUrl: dirs.default_url,
            imageVersions: resizeConf.default
        })(req, res, next);
    });

    app.use('/upload/location', upload.fileHandler({
        tmpDir: dirs.temp,
        uploadDir: __dirname + dirs.location,
        uploadUrl: dirs.location_url,
        imageVersions: resizeConf.location
    }));

    app.use('/upload/location/list', function (req, res, next) {
        upload.fileManager({
            uploadDir: function () {
                return __dirname + dirs.location;
            },
            uploadUrl: function () {
                return dirs.location_url;
            }
        }).getFiles(function (files) {
            res.json(files);
        });
    });

    // bind event
    upload.on('end', function (fileInfo) {
        // insert file info
        console.log("files upload complete");
        console.log(fileInfo);
    });

    upload.on('delete', function (fileName) {
        // remove file info
        console.log("files remove complete");
        console.log(fileName);
    });

    upload.on('error', function (e) {
        console.log(e.message);
    });
}
