var users = require("../../models/user");
//var passport = require('passport');
var permissions = require("../../helpers/user-permissions");

module.exports = function(router){
    router.get('/users', function(req, res, next) {
        if(!req.user) {
            res.sendStatus(401);
            return;
        }
        if(!permissions.getPermissions(req.user).isAdmin){
            res.sendStatus(401);
            return;
        }

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

    router.delete('/users/:id', function(req, res, next) {
        console.log('deleting user with id ' + req.params['id']);
        users.deleteUser(req.params['id'], function(err, data){
            res.send(data);
        });
    });

    router.get('/user', function(req, res, next) {
        console.log('getting user for id ', JSON.stringify(req.user));
        if(!req.user) {
            res.sendStatus(204);
            return;
        }
        users.findUserById(req.user._id, function(err, data){
            res.send(data);
        });
    });

    router.post('/users', function(req, res, next) {
        console.log("creating user !!>>" + JSON.stringify(req.body));
        var u = req.body;
        var tempImageUrl = u["tempImageUrl"];
        if(tempImageUrl)
        {
            u["imageUrl"] = tempImageUrl;
        }

        users.addUser(u, function(err, data){
            if(err){
                console.log('error while adding user:', err);
                res.send(406);
            }
            else{
                console.log('user added:', data);
                res.sendStatus(200);
            }
        });
    });

    router.put('/users/:id', function(req, res, next) {
        console.log("updating user" + JSON.stringify(req.body));
        var u = req.body;
        var tempImageUrl = u["tempImageUrl"];
        if(tempImageUrl)
        {
            u["imageUrl"] = tempImageUrl;
        }

        users.updateUser(u, function(err, data){
            res.sendStatus(200);
        });
    });
};