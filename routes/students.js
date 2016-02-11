var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("getting multimedia page");
    res.locals.title = "Students - Digital Urban Studies";
    res.render('students');
});

module.exports = router;