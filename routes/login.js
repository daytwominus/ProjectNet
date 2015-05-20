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
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
        res.redirect('/')});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;
