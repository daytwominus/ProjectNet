var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("getting profile page");

    res.render('profile');
});


module.exports = router;
