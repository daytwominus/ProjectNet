var posts = require("../models/post");
var users = require("../models/user");
var permissions = require("../helpers/user-permissions");
var waterfall = require('async-waterfall');

module.exports = {
    getSearchResults: function(q, done){
        var ret = [];
        waterfall([
            function(callback){
                posts.findPostsUniversal({"data" : {$regex : ".*" + q + ".*"}}, function(err, data){
                    for(var i = 0; i < data.length; ++i){
                        var item = {type:'post', "data":data[i]};
                        ret.push(item);
                    }
                    callback(null);
                })
            },
            function(callback){
                users.findUsersUniversal({"name" : {$regex : ".*" + q + ".*"}}, function(err, data){
                    for(var i = 0; i < data.length; ++i){
                        var d = data[i].toObject({ getters: true, virtuals: false });
                        delete d["password"];
                        var item = {type:'user', "data":d};
                        ret.push(item);
                    }
                    callback(null);
                })
            }
        ], function (err, result) {
            done(err, ret);
        });
    }
}