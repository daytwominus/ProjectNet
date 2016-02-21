var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var users = require('./user');
var helpers = require("../helpers/utils");

var PostSchema   = new Schema({
    provider: String,
    id: String,//A unique identifier for the user, as generated by the service provider.
    data: String,
    categories: [String],
    userId: String,
    showOnMain : Boolean,
    showInImportant : Boolean,
    isDeleted: Boolean,
    sections: [Schema.Types.ObjectId],
    description: String,
    creationDate: String
});

var Post = mongoose.model('post', PostSchema);

var addCreationDate = function(x){
    for(var i = 0; i < x.length; ++i){
        var date = x[i]._id.getTimestamp();

        x[i].creationDate = date.getFullYear()+'/' + (date.getMonth()+1) + '/'+date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
    }
}

var findUniversal = function(params, callback) {
    console.log("trying to find posts: " + JSON.stringify(params));

    Post.find(params)
        .or({isDeleted : {$exists: false}}, {isDeleted : {$exists: true, $eq:true}})
        .sort({_id: -1}).exec(function(err, x){
            addCreationDate(x);
            console.log("posts: " + JSON.stringify(x));
            callback(err, x);
    });
};

function processJsonNode(key,value) {
    console.log('>>>', key + " : "+value);
}

var getAllPosts = function(callback) {
    console.log('getting all posts');
    Post.find({})
        .sort({isDeleted: 1, _id: -1}).exec(function(err, x){
            var ret = [];
            helpers.asyncLoop(x.length, function(loop){
                    var i = loop.iteration();
                    var p = x[i];
                    users.findUserById(p["userId"], function(err, data){
                        if(data){
                            p = p.toObject({ getters: true, virtuals: false });
                            p['user'] = data;
                        }

                        ret.push(p);
                        loop.next();
                    });
                },
                function(){
                    //console.log("!!!!!!!>>", ret);
                    addCreationDate(ret);
                    console.log("all posts: " + JSON.stringify(ret));

                    callback(err, ret);
                });
        });
};

var savePostRoutine = function (p, callback){
    console.log("saving post: " + JSON.stringify(p));

    if(p["_id"]){
        console.log('id is not null (' + p._id + "); updating.")
        Post.findOneAndUpdate({"_id": p._id.toObjectId()}, p).exec();
    }
    else{
        console.log('creating new post ' + JSON.stringify(p));
        var x = new Post();
        for (var key in p) {
            x[key] = p[key];}
        x.save(function (err) {
            if (err)
                console.log('error saving post');
            console.log("post saved: " + JSON.stringify(x));
            callback(err, x);
        });
    }
};

module.exports = {
    findPostsUniversal : findUniversal,
    getAll:getAllPosts,
    findPostsWithSection : function(sectId, callback) {
        console.log("trying to find posts for section id=" + JSON.stringify(sectId));

        Post.find({sections: sectId}).or({isDeleted : {$exists: false}}, {isDeleted : {$exists: true, $eq:true}}).sort('-_id').exec(function(err, x){
            console.log("posts for section " + sectId + ': ' + JSON.stringify(x));
            callback(err, x);
        });
    },
    findPostsForUserName : function(username, callback) {
        console.log("trying to find posts for user with name=" + JSON.stringify(username));
        users.findUsersUniversal({"name":username}, function(err, data){
            if(!data || data.length==0){
                callback(err, []);
                return;
            }
            var id = data[0]["_id"];
            console.log('now getting posts with userId=', id);
            Post.find({'userId': id}).or({isDeleted : {$exists: false}}, {isDeleted : {$exists: true, $eq:true}}).sort('-_id').exec(function(err, x){
                console.log("posts for user " + username + ': ' + JSON.stringify(x));
                callback(err, x);
            });
        });


    },
    savePost: savePostRoutine,
    deletePost: function (p, callback){
        console.log("deleting post forever: " + JSON.stringify(p));
        //p.isDeleted = 1;
        //savePostRoutine(p);
        Post.findOneAndRemove({"_id": p._id.toObjectId()}).exec();
        callback();
    }
}

