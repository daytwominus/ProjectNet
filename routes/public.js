//var express = require('express');
//var router = express.Router();
//var fs = require('fs');
//
//
//router.get('/:filename', function(req, res, next) {
//    console.log("requesting script");
//    fs.readFile('../public/' + req.params.filename, function (err, html) {
//        if (err) {
//            throw err;
//        }
//        res.write(html);
//        res.end();
//    });
//});
//
//module.exports = router;