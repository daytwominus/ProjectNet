var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("requesting upload page");
    res.render('upload', { title: 'Upload' });
});

router.post('/', function (req, res) {
    console.log('\n===============================================\n');
    console.log(req.body);
    res.send(req.body);
});

module.exports = router;