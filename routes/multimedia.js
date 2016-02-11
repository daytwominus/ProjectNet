var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("getting multimedia page");
    res.locals.title = "Multimedia - Digital Urban Studies";
    res.render('multimedia');
});

module.exports = router;