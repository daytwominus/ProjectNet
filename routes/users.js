var express = require('express');
var router = express.Router();
var users = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
  //users.addUser({"id":"123xy"});
  //res.send('respond with a resource');

});

router.get('/:displayName', function(req, res, next) {
  users.findUser({displayName : req.params.displayName}, function(err, user){
    if (err)
      res.send(err);
    res.json(user);
  });
});


module.exports = router;
