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

router.get('/:name', function(req, res, next) {
  console.log('getting page for user ', req.params['name']);
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  res.render('userpage');
});


module.exports = router;
