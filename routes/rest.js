var express = require('express');
var router = express.Router();
var multer  = require('multer');
var s3 = require('multer-s3');
//var upload = multer({ dest: '../public/upload/avatars'});
//var uploadLib = multer({ dest: '../public/upload/libitems'});
var fs = require('fs');
var users = require("../models/user");
var posts = require("../models/post");
var libItems = require("../models/libItem");

//!!!var accessKeyId =  process.env.AWS_ACCESS_KEY || "xxxxxx";
//!!!var secretAccessKey = process.env.AWS_SECRET_KEY || "+xxxxxx+B+xxxxxxx";
// http://stackoverflow.com/questions/17930204/simple-file-upload-to-s3-using-aws-sdk-and-node-express

router.get('/profile', function(req, res, next) {
    console.log('getting profile for user ' + req['user']);
    if(req['user'] == null || req.user["_id"] == null)
        res.send({message:'bad request'});
    return;
    users.findUserById(req.user["_id"], function(err, u){

        res.send(u);
    });
});

router.get('/profile/:id', function(req, res, next) {
    console.log('getting profile for id ' + req.params['id']);

    res.send(200);
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
require('./rest/rest-users')(router);

//var cpUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
//var cpUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);

var upload = multer({
    storage: s3({
        dirname: 'public/uploads',
        bucket: 'digitalurbanstudiesbucket',
        secretAccessKey: 'POwa5yHO970gZIjkbeKe65OrDeVhSvoHzAwFEMYq',
        accessKeyId: 'AKIAITRHA6VICVYBTEXQ',
        region: 'us-east-1',
        filename: function (req, file, cb) {
            cb(null, Date.now()+file.originalname);
        }
    })
});

//router.post('/avatar', upload.array('photos', 3), function (req, res, next) {
router.post('/avatar', upload.single('file'), function (req, res, next) {
    console.log('avatar uploded');
    console.log(req);
    res.send('https://s3.amazonaws.com/digitalurbanstudiesbucket/'+req.file.key);

    //var path = req.files['file'][0]['path'].substring(9);
    //var newPath = path + ".jpg";
    //var base = __dirname + "/../public/";
    //fs.rename(base + path, base + newPath, function (err) {
    //    if (err) throw err;
    //    console.log('avatar path: ' + newPath);
    //    res.send(newPath);
    //});
});
//
//
//var cpUploadLib = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
//router.post('/libItemFile', cpUploadLib, function(req, res, next) {
//    console.log('lib item uploaded: ', JSON.stringify(req["files"]));
//    var path = req.files['file'][0]['path'].substring(9);
//    console.log('lib item path: ' + path);
//    res.send(path);
//});
//
//router.post('/libItemPreview', cpUploadLib, function(req, res, next) {
//    console.log('lib item preview uploaded: ', JSON.stringify(req["files"]));
//
//    var path = req.files['file'][0]['path'].substring(9);
//    var newPath = path + ".jpg";
//    var base = __dirname + "/../public/";
//    fs.rename(base + path, base + newPath, function (err) {
//        if (err) throw err;
//        console.log('lib item preview path: ' + newPath);
//        res.send(newPath);
//    });
//});

module.exports = router;
