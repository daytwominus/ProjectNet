var posts = require("../../models/post");
var users = require("../../models/user");
var permissions = require("../../helpers/user-permissions");
var searchHelper = require('../../helpers/search');

module.exports = function(router){
    router.get('/search/:q', function(req, res, next) {
        console.log('searching ', req.params['q']);

        searchHelper.getSearchResults(req.params['q'], function(err, data){
            res.send(data);
        });
    });
};