var express = require('express');
var router = express.Router();
var multer  = require('multer');
var s3 = require('multer-s3');
var posts = require("../models/post");
var libItems = require("../models/libItem");
var permissions = require("../helpers/user-permissions");

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
    console.log('uploading item: ');
    console.log('uploading item ', req.file.key);
    var path = 'https://s3.amazonaws.com/digitalurbanstudiesbucket/'+req.file.key;
    console.log('item uploaded ', path);

    res.send({
        uploaded : 1,
        fileName : req.file.key,
        url : path
    });
});

router.post('/uploadAndReturnHtml', upload.single('upload'), function(req, res, next) {

    console.log('uploading item: ');
    console.log('uploading item ', req.file.key);
    var path = 'https://s3.amazonaws.com/digitalurbanstudiesbucket/'+req.file.key;
    console.log('item uploaded ', path);

    html = "";
    html += "<script type='text/javascript'>";
    html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
    html += "    var url     = \"" + path + "\";";
    html += "    var message = \"Uploaded file successfully\";";
    html += "";
    html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
    html += "</script>";

    res.send(html);

    //res.send(html);
});

router.get('/permissions', function(req, res, next) {
    console.log('getting permissions for user ', JSON.stringify(req.user));

    var ret = permissions.getPermissions(req.user);
    console.log('permissions : ', JSON.stringify(ret));

    res.send(ret);
});

module.exports = router;
