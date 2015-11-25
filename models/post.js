var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema   = new Schema({
    provider: String,
    id: String,//A unique identifier for the user, as generated by the service provider.
    data: String,
    categories: [String]
});

var Post = mongoose.model('post', PostSchema);

var findUniversal = function(params, callback) {
    console.log("trying to find posts: " + JSON.stringify(params));
    //params["sort"] = {_id:-1};
    Post.find(params).sort('-_id').exec(function(err, x){
        console.log("posts: " + JSON.stringify(x));
        callback(err, x);
    });
};

module.exports = {
    findPostsUniversal : findUniversal,
    savePost: function (p, callback){
        console.log("saving post: " + JSON.stringify(p));

        if(p["_id"]){
            console.log('post with id ' + p._id + " exists; updating.")
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
    },
    deletePost: function (p, callback){
        console.log("deleting post: " + JSON.stringify(p));
        Post.findOneAndRemove({"_id": p._id.toObjectId()}).exec();
        callback();
    }
}

