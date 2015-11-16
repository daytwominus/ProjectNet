var users = require("../../models/user");

module.exports = function(router){
    router.get('/users', function(req, res, next) {
        posts.findPostsUniversal({}, function(err, data){
            console.log("requesting users");
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
};