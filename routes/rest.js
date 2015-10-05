var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'upload/'});
var fs = require('fs');


router.get('/profile', function(req, res, next) {

    res.send(
        req.user
    );
});

router.post('/profile', function(req, res, next) {
    console.log(req.body);
    res.send(200);
});

var cpUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
router.post('/uploadAvatar', cpUpload, function (req, res, next) {
    console.log('!!!', req.files);
    // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
    //
    // e.g.
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
    //
    // req.body will contain the text fields, if there were any
})

module.exports = router;
