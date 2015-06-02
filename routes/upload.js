var express = require('express');
var router = express.Router();

var express = require('express'),
    http = require('http'),
    upload = require('jquery-file-upload-middleware');

var swig = require('swig');

var dirs = require('../config/config').directors;
var resizeConf = require('../config/config').resizeVersion;
console.log('dirs config:' + JSON.stringify(dirs));

router.get('/', function(req, res, next) {
    console.log("requesting upload page");
    res.render('upload', { title: 'Upload' });
});

//jquery-file-upload helper
router.use('/default', function (req, res, next) {
    upload.fileHandler({
        tmpDir: dirs.temp,
        uploadDir: __dirname + dirs.default,
        uploadUrl: dirs.default_url,
        imageVersions: resizeConf.default
    })(req, res, next);
});

router.use('/location', upload.fileHandler({
    tmpDir: dirs.temp,
    uploadDir: __dirname + dirs.location,
    uploadUrl: dirs.location_url,
    imageVersions: resizeConf.location
}));

router.use('/location/list', function (req, res, next) {
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

router.post('/', function (req, res) {
    console.log('\n===============================================\n');
    console.log(req.body);
    res.send(req.body);
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


module.exports = router;