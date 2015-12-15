var express = require('express');
var router = express.Router();
var passport = require('passport');

var users = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("login request");
    res.render('login', { title: 'Express' });
});

router.post('/',
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: 'Invalid username or password.' }),
    function(req, res) {
        console.log('login occured: ', req.user);
        res.locals.user = req.user;
        res.locals.title = "Login - Digital Urban Studies";
        res.redirect('/index');
    });

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/home');
});

//facebook login

router.get('/facebook',
    passport.authenticate('facebook'),
    function(req, res){
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
    });


var options = {
    successRedirect: '/home',
    failureRedirect: '/login'
};

router.get('/facebook/callback', passport.authenticate('facebook', options));

//router.get('/facebook/callback',
//    passport.authenticate('facebook', { failureRedirect: '/login' }),
//    function(req, res) {
//        console.log("facebook login successful");
//        res.redirect('/home');
//    });

module.exports = router;
