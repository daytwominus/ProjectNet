var express = require('express');
var router = express.Router();
var libItems = require("../models/libItem");

router.get('/', function(req, res, next) {
    console.log("getting library page");

    res.render('library');

});



module.exports = router;
