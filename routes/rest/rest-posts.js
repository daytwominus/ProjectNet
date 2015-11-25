var posts = require("../../models/post");

module.exports = function(router){
    router.get('/posts', function(req, res, next) {
        var params = req.query;

        posts.findPostsUniversal(params, function(err, data){
            console.log("requesting posts. params: ", params);
            if (err)
                res.send(err);
            else {
                res.json(data);
            }
        });
    });

    router.post('/posts', function(req, res, next) {
        var p = req.body;
        console.log("submitting post", p);

        posts.savePost(p, function(err, data){
            console.log('saved: ', JSON.stringify(data));
            res.sendStatus(200);
        });
    });

    router.delete('/posts/:id', function(req, res, next) {
        console.log("deleting post by id" + JSON.stringify(req.params['id']));

        posts.deletePost({"_id":req.params['id']}, function(err, data){
            console.log('deleted: ');
            res.sendStatus(200);
        });
    });
};