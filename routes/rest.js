var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: '../public/upload/avatars'});
var fs = require('fs');
var users = require("../models/user");
var libItems = require("../models/libItem");


router.get('/profile', function(req, res, next) {
    users.findUserById(req.user["_id"], function(err, u){
        res.send(u);
    });
});

router.post('/profile', function(req, res, next) {
    console.log("!!>>" + JSON.stringify(req.body));
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

var cpUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);

router.post('/avatar', cpUpload, function (req, res, next) {
    console.log('!!!', JSON.stringify(req["files"]));
    console.log('!!!', JSON.stringify(req["user"]));
    var path = req.files['file'][0]['path'].substring(9);

    res.send(path);

});

router.post('/libItemFile', cpUpload, function(req, res, next) {
    console.log('lib item uploaded: ', JSON.stringify(req["files"]));
    var path = req.files['file'][0]['path'].substring(9);
    console.log('lib item path: ' + path);
    res.send(path);
});

router.post('/libItemPreview', cpUpload, function(req, res, next) {
    console.log('lib item preview uploaded: ', JSON.stringify(req["files"]));
    var path = req.files['file'][0]['path'].substring(9);
    console.log('lib item preview path: ' + path);
    res.send(path);
});

module.exports = router;
