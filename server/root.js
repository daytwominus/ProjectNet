var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var node_static = require('node-static');

var port = process.env.PORT || 3000;

// ROUTES FOR OUR API
// =============================================================================

{
    var router = express.Router();

    // middleware to use for all requests
    router.use(function(req, res, next) {
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });

    router.get('/', function(req, res) {
        res.json({ message: 'api works!' });
    });


    app.use('/api', router);
}


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);