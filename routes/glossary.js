var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("getting glossary page");
    res.locals.title = "Glossary - Digital Urban Studies";
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.render('glossary');
});

module.exports = router;
