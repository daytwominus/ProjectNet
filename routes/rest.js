var express = require('express');
var router = express.Router();

router.get('/profile', function(req, res, next) {

    res.send(
        req.user
    );
});

router.post('/profile', function(req, res, next) {
    console.log(req.body);
    res.send(200);
});

module.exports = router;
