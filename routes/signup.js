var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.locals.title = "Signup";
    console.log("signup request");
    res.render('./users/signup');
});

router.post('/',
    function(req, res) {
        console.log('user came for registration ', req.user);
        res.redirect('/home');
    });

module.exports = router;