var express = require('express');
var router = express.Router();
var libItems = require("../models/libItem");


router.get('/', function(req, res, next) {
    console.log("getting library page");

    res.render('library');

});

router.get('/items', function(req, res, next) {
    libItems.findLibItemsUniversal({}, function(err, user){
        if (err)
            res.send(err);
        res.json(user);
    });
});

module.exports = router;
