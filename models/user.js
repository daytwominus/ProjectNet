var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
String.prototype.toObjectId = function() {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};

// http://mongoosejs.com/docs/schematypes.html
var UserSchema   = new Schema({
    provider: String,
    id: String,//A unique identifier for the user, as generated by the service provider.
    displayName: String,
    name: String,
    email: String,
    photos: [{
        value: String// The URL of the image.
    }],
    roles: [],
    isActive: Number,
    isDeleted: Number,
    imageUrl: String,
    password: String
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

var findUsersUniversal = function(params, callback){
    console.log("trying to find user: " + JSON.stringify(params));
    var res = User.find(params, function(err, x){
        var ret = [];
        for (i = 0; i < x.length; i++) {
            u = x[i];
            if(!u["isDeleted"] || u["isDeleted"] == 0)
                ret.push(u);
        }

        console.log("Users: " + JSON.stringify(ret));
        callback(err, ret);
    });
};

var updateUserRoutine = function(u, cb){
    console.log("updating user ", u, 'id=' + u['_id']);
    var id = u['_id'];
    delete u["_id"];

    User.findByIdAndUpdate(id, { $set: u}, function (err, tank) {
        console.log(err, tank);
        cb(err, tank);
    });
};

module.exports = {
    findUsersUniversal : findUsersUniversal,
    findUserById: function(id, done){
        console.log("userById " + id);
        User.collection.findOne({_id: id.toObjectId()}, function(err, data){
            console.log("user: " + JSON.stringify(data));
            done(err, data);
        });
    },
    findUserByIdAndActive: function(id, done){
        console.log("findUserByIdAndActive");
        findUserUniversal({"id": id, isActive: 1}, done);
    },
    findUserByLoginOrEmail: function(name, done){
        console.log("findUserByLoginOrEmail: " + name);
        findUserUniversal({"email": name}, function(err, data){
            if(!data){
                findUserUniversal({"name": name}, function(err, data){
                    done(err, data);
                });
            }
            else{
                done(err, data);
            }
        });
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
                done(err, null);
            }
        });
    },

    updateUser: updateUserRoutine,

    deleteUser: function(id, cb){
        console.log("deleting user ", id);
        var u = {
            "_id" : id,
            "isDeleted" : 1};
        updateUserRoutine(u, function(){});
    }
}