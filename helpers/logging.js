
var express = require('express');
var fs = require('fs');
var morgan = require('morgan')

module.exports = function (app) {
    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

    // setup the logger
    app.use(morgan('combined', {stream: accessLogStream}));
}