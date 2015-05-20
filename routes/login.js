var express = require('express');
var router = express.Router();
var passport = require('passport');

var users = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("login request");
    users.addUser({displayName : "testName"});
    res.render('login', { title: 'Express' });
});

router.post('/',function(){
        console.log("posted");
        passport.authenticate('local', { successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true })
    }
);

module.exports = router;
