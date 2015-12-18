var posts = require("../../models/post");

module.exports = function(router){
    router.get('/posts', function(req, res, next) {
        console.log('current user ', JSON.stringify(req.user));

        var params = req.query;

        console.log("requesting posts. params: ", params);

        if(params.getAll){
            posts.getAll(function(err, data){
                if (err)
                    res.send(err);
                else {
                    res.json(data);
                }
            });
            return;
        }

        posts.findPostsUniversal(params, function(err, data){
            if (err)
                res.send(err);
            else {
                res.json(data);
            }
        });
    });

    router.post('/posts', function(req, res, next) {
        console.log('current user ', JSON.stringify(req.user));
        var p = req.body;
        if(!p.user){
            console.log('setting user id to post, uid=', req.user._id);
            p.userId = req.user._id;
        }
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