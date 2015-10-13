
var posts = require("../../models/post");


module.exports = function(router){
    router.get('/posts', function(req, res, next) {
        posts.findPostsUniversal({}, function(err, data){
            console.log("requesting posts");
            if (err)
                res.send(err);
            else {
                for (var i = 0; i < data.length; i++) {
                    //if(data.previewUrl)
                    //    data.previewUrl = "/public/images/defaultLibItem"
                }
                res.json(data);
            }
        });
    });

    router.post('/posts', function(req, res, next) {
        var p = req.body.data;
        console.log("submitting post" + p);
        var x = {};
        x.data = p;

        posts.addNewPost(x, function(err, data){
            console.log('saved: ', JSON.stringify(data));
            res.sendStatus(200);
        });
    });

};