var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("getting home page");

    prepareParams(req, function(forJade){
        res.locals.currentUser = req.user;
        res.render('home', forJade);
    });
});

function prepareParams(req, cb){
    var params = {};
    var displayName;
    if(req.user != null) {
        displayName = req.user['displayName'];

        //console.log()
        if('photos' in req.user &&
            req.user['photos'].count != 0)
            params['avatarURL'] = req.user['photos'][0]['value'];
    }
    else
        displayName = 'Error! No logined user';

    params['username'] = displayName;

    cb(params);
}

module.exports = router;