var users = require("../../models/user");

module.exports = function(router){
    router.get('/users', function(req, res, next) {
        users.findUsersUniversal({}, function(err, data){
            console.log("requesting users");
            if (err)
                res.send(err);
            else {
                res.json(data);
            }
        });
    });
    router.get('/users/:id', function(req, res, next) {
        console.log('getting user for id ' + req.params['id']);
        users.findUserById(req.params['id'], function(err, data){
            res.send(data);
        });
    });

    router.post('/users', function(req, res, next) {
        console.log("saving profile !!>>" + JSON.stringify(req.body));
        var u = req.body;
        var tempImageUrl = u["tempImageUrl"];
        if(tempImageUrl)
        {
            u["imageUrl"] = tempImageUrl;
        }

        //console.log(ON.stringify(u));
        users.updateUser(u, function(err, data){
            console.log('saved: ', JSON.stringify(data));
            res.sendStatus(200);
        });
    });
};