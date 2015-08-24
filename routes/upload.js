/**
 * Created by s on 20.06.2015.
 */
var express = require('express');
var router = express.Router()
    , fs = require('fs')
    , exec = require('child_process').exec
    , util = require('util')
    , Files = {};

var app = require('../app');

var dirs = require('../config/config').directors;
console.log('dirs config:' + JSON.stringify(dirs));

router.get('/', function(req, res, next) {
    console.log("requesting upload page");
    res.render('upload', { title: 'Upload' });
});

router.post('/', function(req, res) {
    console.log('starting upload');
    var tempPath = './temp/' + req.filename;
    var targetPath = './uploads/' + req.filename;
    fs.rename(tempPath, targetPath, function(err) {
        if(err) {
            //res.send("Error found to upload file "+err);
            var msg = "Error found to upload file "+err;
            var type="error";
        } else {
            //res.send("<b>File uploaded to "+targetPath+" ("+req.files.uploadfile.size +" bytes)</b>");
            var fileSize = req.files.uploadfile.size/1024;
            var msg = "File uploaded to "+targetPath+" ("+(fileSize.toFixed(2)) +" kb)";
            var type="success";
            res.send(req.filename);
        }
    });
});

module.exports = router;
