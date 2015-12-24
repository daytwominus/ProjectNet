var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("getting home page");
    res.locals.title = "Home - Digital Urban Studies";
    //res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    //res.header("Pragma", "no-cache");
    //res.header("Expires", 0);
    res.render('home');
});

module.exports = router;