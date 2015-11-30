var express = require('express');
var router = express.Router();
var users = require("../models/user");

router.get('/', function(req, res, next) {
  console.log("getting users page");
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  res.render('users/users');

});

router.get('/:displayName', function(req, res, next) {
  users.findUser({displayName : req.params.displayName}, function(err, user){
    if (err)
      res.send(err);
    res.json(user);
  });
});


module.exports = router;
