var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: '../public/upload/avatars'});
var uploadLib = multer({ dest: '../public/upload/libitems'});
var fs = require('fs');
var users = require("../models/user");
var posts = require("../models/post");
var libItems = require("../models/libItem");


router.get('/profile', function(req, res, next) {
    users.findUserById(req.user["_id"], function(err, u){
        res.send(u);
    });
});

router.post('/profile', function(req, res, next) {
    console.log("saving profile !!>>" + JSON.stringify(req.body));
    var u = req.body;
    var tempImageUrl = u["tempImageUrl"];
    if(tempImageUrl)
    {
        u["imageUrl"] = tempImageUrl;
    }

    //console.log(ON.stringify(u));
    users.updateUser(u, function(err, data){
        console.log('saved: ', JSON.stringify(data));
        res.sendStatus(200);
    });
});

require('./rest/rest-posts')(router);
require('./rest/rest-libitems')(router);

var cpUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);

router.post('/avatar', cpUpload, function (req, res, next) {
    console.log('avatar upladed', JSON.stringify(req["files"]));

    var path = req.files['file'][0]['path'].substring(9);
    var newPath = path + ".jpg";
    var base = __dirname + "/../public/";
    fs.rename(base + path, base + newPath, function (err) {
        if (err) throw err;
        console.log('avatar path: ' + newPath);
        res.send(newPath);
    });
});


var cpUploadLib = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
router.post('/libItemFile', cpUploadLib, function(req, res, next) {
    console.log('lib item uploaded: ', JSON.stringify(req["files"]));
    var path = req.files['file'][0]['path'].substring(9);
    console.log('lib item path: ' + path);
    res.send(path);
});

router.post('/libItemPreview', cpUploadLib, function(req, res, next) {
    console.log('lib item preview uploaded: ', JSON.stringify(req["files"]));

    var path = req.files['file'][0]['path'].substring(9);
    var newPath = path + ".jpg";
    var base = __dirname + "/../public/";
    fs.rename(base + path, base + newPath, function (err) {
        if (err) throw err;
        console.log('lib item preview path: ' + newPath);
        res.send(newPath);
    });
});

module.exports = router;
