var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("getting media page");

    res.render('media');
});


module.exports = router;