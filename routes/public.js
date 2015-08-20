//var express = require('express');
//var router = express.Router();
//var fs = require('fs');
//
//router.get('/styles/:filename', function(req, res, next) {
//    console.log("requesting style");
//    fs.readFile('../public/styles/' + req.params.filename, function (err, html) {
//        if (err) {
//            throw err;
//        }
//        res.write(html);
//        res.end();
//    });
//});
//
//router.get('/scripts/:filename', function(req, res, next) {
//    console.log("requesting script");
//    fs.readFile('../public/scripts/' + req.params.filename, function (err, html) {
//        if (err) {
//            throw err;
//        }
//        res.write(html);
//        res.end();
//    });
//});
//
//
//module.exports = router;