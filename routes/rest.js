var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: '../public/upload/avatars'});
var fs = require('fs');
var users = require("../models/user");


router.get('/profile', function(req, res, next) {
    res.send(
        req.user
    );
});

router.post('/profile', function(req, res, next) {
    console.log("!!>>" + JSON.stringify(req.body));
    res.send(200);
});

var cpUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
router.post('/uploadAvatar', cpUpload, function (req, res, next) {
    console.log('!!!', JSON.stringify(req["files"]));
    console.log('!!!', JSON.stringify(req["user"]));
    if(!req.user['photos'])
        req.user['photos'] = [];
    var path = req.files['file'][0]['path'].substring(9);
    //req.user['photos'].push({value: path});
    //req.user['imageUrl'] = path;
    //res.locals.user = req.user;
    req.user["tempImage"] = path;

    users.updateUser(req.user, function(err, data){
        console.log('saved: ', JSON.stringify(data));
        res.locals.user = data;
        res.sendStatus(200);
    });
})

module.exports = router;
