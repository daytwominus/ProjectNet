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
};