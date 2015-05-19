/**
 * Created by sergeypanasyuk on 5/19/2015.
 */

var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('hello world');
});

app.listen(3000);