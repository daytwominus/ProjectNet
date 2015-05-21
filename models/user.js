var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// http://mongoosejs.com/docs/schematypes.html
var UserSchema   = new Schema({
    provider: String,
    id: String,//A unique identifier for the user, as generated by the service provider.
    displayName: String,
    name: {
        familyName: String,
        givenName: String,
        middleName: String
    },
    emails: [{
        value: String,
        type: String
    }],
    photos: [{
        value: String// The URL of the image.
    }],
    roles: [{
        value: String// The URL of the image.
    }],
    isActive: Number
});

var User = mongoose.model('User', UserSchema);

var findUserUniversal = function(params, callback){
    console.log("trying to find user: " + JSON.stringify(params));
    User.collection.findOne(params, function(err, res){
        if(err) {
            console.log("error!");
            callback(err);
        }
        else {
            console.log("found user: " + JSON.stringify(res));
            callback(null, res);
        }
    })
}

module.exports.findUserUniversal = findUserUniversal;

module.exports = {
    findUserById: function(id, done){
        console.log("userById");
        findUserUniversal({"id": id}, done);
    },
    findUserByIdAndActive: function(id, done){
        console.log("findUserByIdAndActive");
        findUserUniversal({"id": id, isActive: 1}, done);
    },
    findUserByName: function(name, done){
        console.log("userByName");
        findUserUniversal({"displayName": name}, done);
    },
    addUser: function(params, done){
        console.log("creating user:" + JSON.stringify(params));
        findUserUniversal({"displayName": params["displayName"], "id":params["id"]}, function(err, res){
            if(err){}
            else {
                if(res == null) {
                    var user = new User();
                    for (var key in params) {
                        user[key] = params[key];
                    }

                    user.save(function (err) {
                        if (err)
                            console.log('error saving user');
                        console.log("user saved: " + JSON.stringify(user));
                    });
                }
                else
                    console.log("already exists");
            }
        });
    }
}