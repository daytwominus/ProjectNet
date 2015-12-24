var express = require('express');
var router = express.Router();
var sections = require("../models/section");
var http = require("http");
var request = require('request');
var searchHelper = require('../helpers/search');

router.get('/', function(req, res, next) {
    console.log("getting search page");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.render('search');

});

router.get('/:q', function(req, res, next) {
    console.log("getting search page", req.params['q']);

    searchHelper.getSearchResults(req.params['q'], function(err, data){
        res.locals.title = req.params['q'] + " Search - Digital Urban Studies";
        res.locals.items = data;

        //res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        //res.header("Pragma", "no-cache");
        //res.header("Expires", 0);
        res.render('search');
    });
});

module.exports = router;
