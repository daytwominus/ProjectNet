var express = require('express');
var router = express.Router();
var posts = require("../models/post");

router.get('/:id', function(req, res, next) {

    console.log('getting page for post ', req.params['id']);
    posts.findPostsUniversal({"_id":req.params['id']}, function(err, data){
        if(data.length != 0){
            res.locals.post = data[0];
        }
        else
            res.locals.post = {"data":"not found"};

        res.render('post');
    });
});

router.get('/', function(req, res, next) {
    console.log("getting profile page");

    res.render('posts');
});


module.exports = router;
