var express = require('express');
var router = express.Router();
var users = require("../models/user");
var posts = require("../models/post");

router.get('/', function(req, res, next) {
  console.log("getting users page");

  res.render('users/users');

});

router.get('/:name', function(req, res, next) {
  console.log('getting page for user ', req.params['name']);

  var u =  req.params['name'];
  posts.findPostsForUserName(u, function(err, data){
    console.log('posts for ' + u + ' received');
    res.locals.posts = data;
    res.locals.username = u;
    res.render('userpage');
  });
});


module.exports = router;
