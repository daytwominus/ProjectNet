var express = require('express');
var router = express.Router();
var libItems = require("../models/libItem");


router.get('/', function(req, res, next) {
    console.log("getting library page");

    res.render('library');

});

router.get('/items', function(req, res, next) {
    libItems.findLibItemsUniversal({}, function(err, data){
        if (err)
            res.send(err);
        else {
            for (var i = 0; i < data.length; i++) {
                //if(data.previewUrl)
                //    data.previewUrl = "/public/images/defaultLibItem"
            }
            res.json(data);
        }
    });
});

router.post('/libItems', function(req, res, next) {
    console.log("posting new lib item: "  + JSON.stringify(req.body));
    libItems.addNewLibItem(req.body, function(err, data){
        if(err)
            res = "error "+ err;
        else
            res.send();
    });
    res.send("OK");
});

module.exports = router;
