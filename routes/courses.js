var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("getting courses page");
    res.locals.title = "Courses - Digital Urban Studies";
    res.render('courses');
});

module.exports = router;