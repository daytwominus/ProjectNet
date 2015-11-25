var express = require('express');
var router = express.Router();
var multer  = require('multer');
var s3 = require('multer-s3');
var posts = require("../models/post");
var libItems = require("../models/libItem");

//!!!var accessKeyId =  process.env.AWS_ACCESS_KEY || "xxxxxx";
//!!!var secretAccessKey = process.env.AWS_SECRET_KEY || "+xxxxxx+B+xxxxxxx";
// http://stackoverflow.com/questions/17930204/simple-file-upload-to-s3-using-aws-sdk-and-node-express

require('./rest/rest-posts')(router);
require('./rest/rest-libitems')(router);
require('./rest/rest-users')(router);

//var cpUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
//var cpUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);

var bucketSecret = process.env.S3_BUCKET_SECRET;
var bucketAccessKey = process.env.S3_ACCESS_KEY;
console.log('s3 data: ', bucketSecret, bucketAccessKey);

var upload = multer({
    storage: s3({
        dirname: 'public/uploads',
        bucket: 'digitalurbanstudiesbucket',
        secretAccessKey: bucketSecret,
        accessKeyId: bucketAccessKey,
        region: 'us-east-1',
        filename: function (req, file, cb) {
            cb(null, Date.now()+file.originalname);
        }
    })
});

router.post('/upload', upload.single('file'), function(req, res, next) {
    var path = 'https://s3.amazonaws.com/digitalurbanstudiesbucket/'+req.file.key;
    console.log('item uploaded ', path);
    res.send(path);
});

router.post('/uploadForEditor', upload.single('upload'), function(req, res, next) {

    console.log('uploading item ', req.file.key);
    var path = 'https://s3.amazonaws.com/digitalurbanstudiesbucket/'+req.file.key;
    console.log('item uploaded ', path);

    res.send({
        uploaded : 1,
        fileName : req.file.key,
        url : path
    });
});

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
