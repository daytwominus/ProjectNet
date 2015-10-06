var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'public/upload/avatars'});
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
    console.log('!!!', JSON.stringify(req.files));
    console.log('!!!', JSON.stringify(req.user));

    req.user['photos'] = [{value: req.files['file'][0]['path'].substring(6)}];
    req.user['ImageUrl'] = req.files['file'][0]['path'];
    users.updateUser(req.user, function(err, data){
        console.log('saved: ', JSON.stringify(data));
        res.locals.user = data;
    });
})

module.exports = router;
